import { NextResponse } from "next/server";
import { getJson } from "serpapi";

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
      engine = "google_flights",
      departure_id = "",
      arrival_id = "",
      outbound_date = "",
      return_date = "",
      booking_token: rawBookingToken = "",
      departure_token = "",
      currency = "USD",
      hl = "en",
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

    // Normalize booking token: may come directly, or we may need to
    // derive it from a departure_token via an extra SerpAPI call.
    let booking_token = rawBookingToken;

    // If no booking_token but we have a departure_token, do a flights
    // search with departure_token to obtain a booking_token.
    let intermediateResults = null;
    if (!booking_token && departure_token) {
      const flightsParams = {
        engine,
        departure_id,
        arrival_id,
        outbound_date,
        currency,
        hl,
        api_key: SERP_API_KEY,
        departure_token,
      };
      if (return_date) {
        flightsParams.return_date = return_date;
      }

      intermediateResults = await getJson(flightsParams);

      const bestFlights =
        intermediateResults?.best_flights ||
        intermediateResults?.flights?.best_flights ||
        [];

      booking_token = bestFlights[0]?.booking_token || "";

      if (!booking_token) {
        return NextResponse.json(
          {
            error:
              "Unable to derive booking_token from departure_token; Google Flights returned no suitable flights.",
            departure_id,
            arrival_id,
            outbound_date,
            return_date: return_date || null,
          },
          { status: 400, headers: corsHeaders }
        );
      }
    }

    const serpParams = {
      engine,
      departure_id,
      arrival_id,
      outbound_date,
      currency,
      hl,
      api_key: SERP_API_KEY,
      booking_token,
    };

    if (return_date) {
      serpParams.return_date = return_date;
    }

    const results = await getJson(serpParams);

    return NextResponse.json(
      {
        departure_id,
        arrival_id,
        outbound_date,
        return_date: return_date || null,
        booking_token: booking_token || null,
        departure_token: departure_token || null,
        currency,
        hl,
        intermediate_results: intermediateResults,
        results,
      },
      { status: 200, headers: corsHeaders }
    );
  } catch (err) {
    console.error("SerpAPI /api/flights/booking error:", err);

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
