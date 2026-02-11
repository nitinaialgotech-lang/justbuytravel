import { NextResponse } from "next/server";
import { getJson } from "serpapi";

// Use Node.js runtime (serpapi uses Node APIs); ensures route is registered
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SERP_API_KEY = process.env.SERPAPI_API_KEY;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
  "Content-Type": "application/json; charset=utf-8",
};

export async function OPTIONS() {
  return new NextResponse(null, { status: 200, headers: corsHeaders });
}

export async function GET(req) {
  return handleRequest(req);
}

export async function POST(req) {
  return handleRequest(req);
}

async function handleRequest(req) {
  try {
    if (!SERP_API_KEY) {
      return NextResponse.json(
        { error: "Missing SERPAPI_API_KEY" },
        { status: 500, headers: corsHeaders }
      );
    }

    const url = new URL(req.url);
    let body = {};

    if (req.method === "POST") {
      body = await req.json().catch(() => ({}));
    }

    const data = { ...Object.fromEntries(url.searchParams), ...body };

    const {
      departure_id = "",
      arrival_id = "",
      outbound_date = "",
      return_date = "",
      adults = 1,
      children = 0,
      currency = "USD",
      country = "us",
      language = "en",
      travel_class = "ECONOMY",
    } = data;

    if (!departure_id || !arrival_id || !outbound_date) {
      return NextResponse.json(
        {
          error:
            "Parameters departure_id, arrival_id and outbound_date are required",
        },
        { status: 400, headers: corsHeaders }
      );
    }

    // Directly call SerpAPI Google Flights engine.
    // See: https://serpapi.com/google-flights-api
    const flights = await getJson({
      engine: "google_flights",
      departure_id,
      arrival_id,
      outbound_date,
      return_date: return_date || undefined,
      adults: adults ? Number(adults) : undefined,
      children: children ? Number(children) : undefined,
      currency,
      hl: language,
      gl: country,
      travel_class,
      api_key: SERP_API_KEY,
    });

    return NextResponse.json(
      {
        departure_id,
        arrival_id,
        outbound_date,
        return_date: return_date || null,
        adults: Number(adults) || 1,
        children: Number(children) || 0,
        currency,
        travel_class,
        flights,
      },
      { status: 200, headers: corsHeaders }
    );
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("SerpAPI /api/serp-flight error:", err);

    const status = err?.response?.status || 500;
    const respData =
      err?.response?.data ??
      err?.responseBody ??
      null;

    const debug =
      status === 500 && !respData
        ? {
          name: err?.name || null,
          message: err?.message || null,
          stack: err?.stack || null,
          toString: err ? String(err) : null,
        }
        : null;

    return NextResponse.json(
      {
        error: err?.message || "Unexpected error from SerpAPI",
        status,
        serpapi_error: respData,
        debug,
      },
      { status, headers: corsHeaders }
    );
  }
}

