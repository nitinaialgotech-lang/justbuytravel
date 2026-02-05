import { NextResponse } from "next/server";

/* ---------------------------
   CONFIG
---------------------------- */
const GOOGLE_API_KEY = process.env.GOOGLE_PLACES_API_KEY;
const GOOGLE_URL = "https://places.googleapis.com/v1/places:searchText";
const CACHE_TTL = 24 * 60 * 60 * 1000; // 24h

/* ---------------------------
   SIMPLE IN-MEMORY CACHE
   (works well on Vercel / Node)
---------------------------- */
const cache = new Map();

function getCache(key) {
  const item = cache.get(key);
  if (!item) return null;
  if (Date.now() > item.expires) {
    cache.delete(key);
    return null;
  }
  return item.data;
}

function setCache(key, data) {
  cache.set(key, {
    expires: Date.now() + CACHE_TTL,
    data,
  });
}

/* ---------------------------
   ALLOWED TYPES
---------------------------- */
const ALLOWED_TYPES = [
  "lodging",
  "restaurant",
  "tourist_attraction",
  "museum",
  "park",
  "shopping_mall",
];

/* ---------------------------
   TOP CITIES
---------------------------- */
const TOP_CITIES = [
  { city: "Paris", lat: 48.8566, lng: 2.3522 },
  { city: "Dubai", lat: 25.2048, lng: 55.2708 },
  { city: "New York", lat: 40.7128, lng: -74.006 },
  { city: "London", lat: 51.5074, lng: -0.1278 },
  { city: "Tokyo", lat: 35.6762, lng: 139.6503 },
  { city: "Singapore", lat: 1.3521, lng: 103.8198 },
  { city: "Bangkok", lat: 13.7563, lng: 100.5018 },
  { city: "Rome", lat: 41.9028, lng: 12.4964 },
];

/* ---------------------------
   CORS
---------------------------- */
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

/* ---------------------------
   OPTIONS
---------------------------- */
export async function OPTIONS() {
  return new NextResponse(null, { status: 200, headers: corsHeaders });
}

/* ---------------------------
   GET / POST
---------------------------- */
export async function GET(req) {
  return handleRequest(req);
}

export async function POST(req) {
  return handleRequest(req);
}

/* ---------------------------
   MAIN HANDLER
---------------------------- */
async function handleRequest(req) {
  if (!GOOGLE_API_KEY) {
    return NextResponse.json(
      { error: "Missing GOOGLE_PLACES_API_KEY" },
      { status: 500, headers: corsHeaders }
    );
  }

  const url = new URL(req.url);
  const body =
    req.method === "POST" ? await req.json().catch(() => ({})) : {};

  const includedType =
    body.includedType || url.searchParams.get("includedType") || "lodging";

  const maxResultCount = Number(
    body.maxResultCount || url.searchParams.get("maxResultCount") || 10
  );

  if (!ALLOWED_TYPES.includes(includedType)) {
    return NextResponse.json(
      { error: "Invalid includedType", allowedTypes: ALLOWED_TYPES },
      { status: 400, headers: corsHeaders }
    );
  }

  const cacheKey = `top-${includedType}`;
  const cached = getCache(cacheKey);
  if (cached) {
    return NextResponse.json(
      { includedType, count: cached.length, results: cached },
      { headers: { ...corsHeaders, "X-Cache": "HIT" } }
    );
  }

  const results = [];

  for (const city of TOP_CITIES) {
    const payload = {
      textQuery: `Best ${includedType}`,
      // Google Places Text Search v1 expects includedTypes: string[]
      includedTypes: [includedType],
      maxResultCount,
      languageCode: "en",
      locationBias: {
        circle: {
          center: {
            latitude: city.lat,
            longitude: city.lng,
          },
          radius: 50000,
        },
      },
    };

    const response = await fetch(GOOGLE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": GOOGLE_API_KEY,
        "X-Goog-FieldMask":
          "places.id,places.displayName,places.formattedAddress,places.rating,places.userRatingCount,places.location,places.photos",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) continue;

    const data = await response.json();
    if (!data.places) continue;

    for (const place of data.places) {
      const rating = place.rating || 0;
      const reviews = place.userRatingCount || 0;

      if (rating < 4.2 || reviews < 100) continue;

      const score = rating * Math.log(reviews + 1);

      results.push({
        id: place.id,
        name: place.displayName?.text || "",
        address: place.formattedAddress || "",
        rating,
        reviews,
        score: Number(score.toFixed(2)),
        city: city.city,
        location: place.location || null,
        photos: place.photos || [],
      });
    }
  }

  results.sort((a, b) => b.score - a.score);
  const topResults = results.slice(0, 10);

  setCache(cacheKey, topResults);

  return NextResponse.json(
    {
      includedType,
      count: topResults.length,
      results: topResults,
    },
    { headers: { ...corsHeaders, "X-Cache": "MISS" } }
  );
}

