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
      booking_token = "",
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

    const serpParams = {
      engine,
      departure_id,
      arrival_id,
      outbound_date,
      currency,
      hl,
      api_key: SERP_API_KEY,
    };

    if (return_date) {
      serpParams.return_date = return_date;
    }
    if (booking_token) {
      serpParams.booking_token = booking_token;
    }

    const results = await getJson(serpParams);

    return NextResponse.json(
      {
        departure_id,
        arrival_id,
        outbound_date,
        return_date: return_date || null,
        booking_token: booking_token || null,
        currency,
        hl,
        results,
      },
      { status: 200, headers: corsHeaders }
    );
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("SerpAPI /api/serp-bookingoptions error:", err);

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
