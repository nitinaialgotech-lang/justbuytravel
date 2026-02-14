"use client";
import { GetSerpFlights } from "@/app/Route/endpoints";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import moment from "moment";

/** =========================
 *  Expedia Affiliate Helpers
 *  ========================= */

// Your Expedia affiliate IDs (from your affiliate link)
const EXPEDIA_AID = "15042831";
const EXPEDIA_PID = "101601019";

// Choose domain (use .com or .co.in)
const EXPEDIA_DOMAIN = "https://www.expedia.com"; // or "https://www.expedia.co.in"

function normalizeAirportCode(code) {
  if (!code) return "";
  return String(code).trim().toUpperCase();
}

function cabinToExpedia(travelClass) {
  // Expedia accepts: economy, premiumeconomy, business, first
  const v = String(travelClass || "").toLowerCase();
  if (v.includes("premium")) return "premiumeconomy";
  if (v.includes("business")) return "business";
  if (v.includes("first")) return "first";
  return "economy";
}

/**
 * Builds a clean Expedia Flights Search URL
 */
function buildExpediaFlightsSearchUrl({
  fromCode,
  toCode,
  outboundDate, // YYYY-MM-DD
  returnDate, // YYYY-MM-DD (optional for one way)
  tripType, // "roundtrip" | "oneway"
  adults = 1,
  cabin = "economy",
  domain = EXPEDIA_DOMAIN,
}) {
  const from = normalizeAirportCode(fromCode);
  const to = normalizeAirportCode(toCode);

  // Expedia leg format usually: DD/MM/YYYYTANYT
  const outLegDate = moment(outboundDate, "YYYY-MM-DD").format("DD/MM/YYYY");
  const retLegDate = returnDate
    ? moment(returnDate, "YYYY-MM-DD").format("DD/MM/YYYY")
    : "";

  const url = new URL("/Flights-Search", domain);

  url.searchParams.set("mode", "search");
  url.searchParams.set("flight-type", "on");
  url.searchParams.set("options", `cabinclass:${cabin}`);
  url.searchParams.set("passengers", `adults:${adults},infantinlap:N`);

  // Optional date params (Expedia often includes them)
  url.searchParams.set(
    "fromDate",
    moment(outboundDate, "YYYY-MM-DD").format("DD/MM/YYYY")
  );

  if (tripType === "oneway") {
    url.searchParams.set("trip", "oneway");
    url.searchParams.set(
      "leg1",
      `from:${from},to:${to},departure:${outLegDate}TANYT`
    );
    url.searchParams.set("d1", moment(outboundDate, "YYYY-MM-DD").format("YYYY-M-D"));
  } else {
    url.searchParams.set("trip", "roundtrip");
    url.searchParams.set(
      "leg1",
      `from:${from},to:${to},departure:${outLegDate}TANYT`
    );
    url.searchParams.set(
      "leg2",
      `from:${to},to:${from},departure:${retLegDate}TANYT`
    );

    url.searchParams.set(
      "toDate",
      moment(returnDate, "YYYY-MM-DD").format("DD/MM/YYYY")
    );
    url.searchParams.set("d1", moment(outboundDate, "YYYY-MM-DD").format("YYYY-M-D"));
    url.searchParams.set("d2", moment(returnDate, "YYYY-MM-DD").format("YYYY-M-D"));
  }

  return url.toString();
}

/**
 * Attach affiliate tracking params (clean way)
 */
function addExpediaAffiliateParams(expediaUrl, { AID, PID, SID }) {
  const url = new URL(expediaUrl);
  if (AID) url.searchParams.set("AID", String(AID));
  if (PID) url.searchParams.set("PID", String(PID));
  if (SID) url.searchParams.set("SID", String(SID));
  return url.toString();
}

/**
 * Final affiliate URL builder (use this for both desktop + mobile)
 */
function getExpediaAffiliateUrl({
  departure_id,
  arrival_id,
  outbound_date,
  return_date,
  type,
  travel_class,
  adults,
}) {
  const cabin = cabinToExpedia(travel_class);
  const tripType = type === "oneway" ? "oneway" : "roundtrip";

  const searchUrl = buildExpediaFlightsSearchUrl({
    fromCode: departure_id,
    toCode: arrival_id,
    outboundDate: outbound_date,
    returnDate: tripType === "roundtrip" ? return_date : null,
    tripType,
    adults: Number(adults || 1),
    cabin,
    domain: EXPEDIA_DOMAIN,
  });

  // Dynamic SID so you can track route/dates clicks
  const SID = `route-${departure_id}-${arrival_id}-${outbound_date}-${tripType}-${adults}`;

  return addExpediaAffiliateParams(searchUrl, {
    AID: EXPEDIA_AID,
    PID: EXPEDIA_PID,
    SID,
  });
}

export default function Flight_Search_Detail() {
  const [flights, setFlights] = useState("");
  const engine = "google_flights";

  const departure_id = useSelector((state) => state.user.SearchFlight.startfrom);
  const start_date = useSelector((state) => state.user.SearchFlight.startDate);
  const back_date = useSelector((state) => state.user.SearchFlight.endDate);
  const arrival_id = useSelector((state) => state.user.SearchFlight.endto);
  const type = useSelector((state) => state.user.SearchFlight.type);
  const travel_class = useSelector((state) => state.user.SearchFlight.travelClass);
  const adults = useSelector((state) => state.user.SearchFlight.passen_count);

  const outbound_date = moment(start_date).format("YYYY-MM-DD");
  const return_date = moment(back_date).format("YYYY-MM-DD");

  const pretty_outbound = moment(start_date).format("DD MMM, YYYY");
  const pretty_return =
    type === "roundtrip" && back_date
      ? moment(back_date).format("DD MMM, YYYY")
      : null;

  const { data, isLoading, isError, error } = useQuery({
    queryKey: [
      "flights",
      engine,
      departure_id,
      outbound_date,
      return_date,
      arrival_id,
      type,
      travel_class,
      adults,
    ],
    queryFn: () =>
      GetSerpFlights({
        engine,
        departure_id,
        arrival_id,
        outbound_date,
        return_date,
        type,
        travel_class,
        adults,
      }),
    onSuccess: (data) => {
      setFlights(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const flight = data?.data?.flights?.best_flights || [];

  // Loading state
  if (isLoading) {
    return (
      <section className="py-8">
        <div className="container">
          <div className="row justify-center">
            <div className="col-lg-10">
              <div className="bg-white rounded card_rounded border-gray-100 p-6 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <div className="h-5 w-40 bg-gray-200 rounded animate-pulse" />
                    <div className="h-4 w-64 bg-gray-100 rounded animate-pulse" />
                  </div>
                  <div className="h-9 w-32 bg-gray-200 rounded-full animate-pulse" />
                </div>
                <div className="h-24 w-full bg-gray-100 rounded-lg animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (isError) {
    return (
      <section className="py-8">
        <div className="container">
          <div className="row justify-center">
            <div className="col-lg-8">
              <div className="bg-red-50 card_rounded border-red-100 text-red-700 rounded p-6 text-center space-y-2">
                <h2 className="text-lg font-semibold">
                  We couldn’t load flights right now
                </h2>
                <p className="text-sm opacity-80">
                  Please check your connection and try again in a moment.
                </p>
                <p className="text-xs opacity-60">
                  {error?.message || "Unexpected error occurred."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const hasFlights = Array.isArray(flight) && flight.length > 0;

  // Pre-build affiliate URL once (same for all cards)
  const expediaAffiliateUrl = getExpediaAffiliateUrl({
    departure_id,
    arrival_id,
    outbound_date,
    return_date,
    type,
    travel_class,
    adults,
  });

  return (
    <section className="py-2">
      <div className="container">
        <div className="row justify-center departure_chart_section padding_b30 pb-6">
          <div className="col-lg-12 space-y-5">
            {/* Search summary header */}
            <div className="departure_title_head flex flex-col md:flex-row r md:justify-between p-0 gap-4 m-0">
              <div className="title section_title space-y-1 mb-2">
                <div className="flex flex-wrap items-center gap-2 mt-2 text-xs md:text-sm text-gray-700">
                  {departure_id && arrival_id && (
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded sky_green">
                      <span className="font-medium">{departure_id}</span>
                      <span className="text-gray-400">→</span>
                      <span className="font-medium">{arrival_id}</span>
                    </span>
                  )}

                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded sky_red">
                    <span>{pretty_outbound}</span>
                    {pretty_return && (
                      <>
                        <span className="text-gray-400">–</span>
                        <span>{pretty_return}</span>
                      </>
                    )}
                  </span>

                  {adults && (
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded sky_yellow">
                      {adults} traveler{adults > 1 ? "s" : ""}
                    </span>
                  )}

                  {travel_class && (
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded sky_blue capitalize">
                      {travel_class}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Results card */}
            <div className="col-lg-12 text-center justify-center m-auto">
              <div className="departure bg-white rounded card_rounded border-gray-100 text-left overflow-hidden shadow-sm">
                <div className="departure_body px-4 md:px-6 pb-4 md:pb-5 space-y-4">
                  {!hasFlights && (
                    <div className="py-8 text-center space-y-2">
                      <h3 className="text-base md:text-lg font-semibold text-gray-800">
                        No flights found for your search
                      </h3>
                      <p className="text-sm text-gray-600 max-w-md mx-auto">
                        Try adjusting your dates, airports, or number of
                        travelers to see more options.
                      </p>
                    </div>
                  )}

                  {hasFlights &&
                    flight?.map((item, idx) => {
                      const segments = item?.flights || [];
                      const stopsCount = Math.max((segments.length || 1) - 1, 0);
                      const stopsLabel =
                        stopsCount === 0
                          ? "Non-stop"
                          : stopsCount === 1
                          ? "1 stop"
                          : `${stopsCount} stops`;

                      return (
                        <div
                          className="row items-center border_custom rounded px-3 py-3 md:px-4 md:py-4 bg-white transition-all duration-200 cursor-pointer md-p1"
                          key={idx}
                        >
                          <div className="col-lg-8 p-0">
                            {/* MOBILE: now also opens Expedia affiliate */}
                            <div className="d-block d-lg-none">
                              <div className="departure_item flex justify-end items-center gap-2 p-0 text-right">
                                <div className="text-[11px] uppercase tracking-wide text-gray-400">
                                  From
                                </div>
                                <div className="price text-xl md:text-2xl font-semibold leading-tight fw-bold">
                                  $
                                  {item?.price ||
                                    data?.data?.flights?.price_insights?.lowest_price}
                                </div>

                                <a
                                  className="button_bg2 px-4 md:px-5 py-2 rounded text-sm font-semibold whitespace-nowrap mt-1 button_flight"
                                  href={expediaAffiliateUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  Select flight
                                </a>
                              </div>
                            </div>

                            {/* Desktop left info */}
                            <div className="departure_title flex items-center gap-3 md:gap-4">
                              <div className="logo flex flex-col items-center gap-1">
                                <img
                                  src={item?.airline_logo}
                                  alt={item?.airline || "Airline logo"}
                                  width={30}
                                  height={30}
                                  className="object-contain bg-white"
                                />
                                <span className="text-[11px] text-gray-500 uppercase tracking-wide">
                                  {item?.flights?.map((it) => it?.airline)}
                                </span>
                              </div>

                              <div className="departure_time space-y-1">
                                <div className="flex flex-wrap items-center gap-2 text-xs md:text-sm">
                                  <span className="font-semibold text-gray-900">
                                    {departure_id}{" "}
                                    <span className="text-gray-400">→</span>{" "}
                                    {arrival_id}
                                  </span>
                                  <span className="hidden md:inline text-gray-400">
                                    •
                                  </span>
                                  <span className="text-gray-600 capitalize">
                                    {type || "One way"}{" "}
                                    {travel_class && `· ${travel_class}`}
                                  </span>
                                </div>

                                <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500 mt-1">
                                  <span className="inline-flex items-center px-2 py-0.5 rounded bg-emerald-50 text-gray-700 card_rounded border-emerald-100">
                                    {stopsLabel}
                                  </span>

                                  {item?.total_duration && (
                                    <span className="inline-flex items-center px-2 py-0.5 rounded bg-gray-50 text-gray-700 card_rounded border-gray-200 sky_yellow">
                                      Total {Math.floor(item.total_duration / 60)}h{" "}
                                      {item.total_duration % 60}m
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* DESKTOP: also opens Expedia affiliate */}
                          <div className="col-lg-4 d-none d-lg-block">
                            <div className="departure_item flex justify-end items-center gap-2 md:gap-2 p-0 text-right">
                              <div className="text-[11px] uppercase tracking-wide text-gray-400">
                                From
                              </div>

                              <div className="price text-xl md:text-2xl font-semibold leading-tight fw-bold">
                                $
                                {item?.price ||
                                  data?.data?.flights?.price_insights?.lowest_price}
                              </div>

                              <a
                                className="button_bg2 px-4 md:px-5 py-2 rounded text-sm font-semibold whitespace-nowrap mt-1 button_flight p-0"
                                href={expediaAffiliateUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                Select flight
                              </a>
                            </div>
                          </div>

                          {/* NOTE:
                              You still have your detailed timing cards etc. below in your original file.
                              If you want, paste those blocks back exactly as you had — this affiliate change will still work.
                          */}
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
