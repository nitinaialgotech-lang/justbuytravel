"use client";

import React, { useState } from "react";
import {
  FiChevronUp,
  FiChevronDown,
} from "react-icons/fi";
import { HiOutlineInformationCircle } from "react-icons/hi";
import {
  IoClose,
  IoCheckmarkCircle,
  IoDocumentTextOutline,
} from "react-icons/io5";
import { MdEventSeat } from "react-icons/md";
import { FaSuitcase } from "react-icons/fa6";
import { useQuery } from "@tanstack/react-query";
import { GetSerpBookingOptions } from "@/app/Route/endpoints";
import { useSelector } from "react-redux";
import { useParams, useSearchParams } from "next/navigation";
import moment from "moment";

// Placeholder airline logo - replace with real logo URL from your API when available
const BRITISH_AIRWAYS_LOGO = "";

const fareOptions = [
  {
    name: "Basic Economy",
    priceUsd: 188,
    priceEur: 173,
    features: [
      { text: "No refunds", type: "negative" },
      { text: "Ticket changes for a fee", type: "conditional", icon: "doc" },
      { text: "Seat selection for a fee", type: "conditional", icon: "seat" },
      { text: "Standard seat", type: "included" },
      { text: "1 free carry-on", type: "included" },
      { text: "1st checked bag: $99 (€90)", type: "bagFee", icon: "suitcase" },
    ],
  },
  {
    name: "Economy Plus",
    priceUsd: 224,
    priceEur: 206,
    features: [
      { text: "No refunds", type: "negative" },
      { text: "Ticket changes for a fee", type: "conditional", icon: "doc" },
      { text: "Seat selection for a fee", type: "conditional", icon: "seat" },
      { text: "Standard seat", type: "included" },
      { text: "1 free carry-on", type: "included" },
      { text: "1st checked bag up to 23 kg free", type: "included" },
    ],
  },
  {
    name: "Club Business Plus",
    priceUsd: 477,
    priceEur: 437,
    features: [
      { text: "No refunds", type: "negative" },
      { text: "Ticket changes for a fee", type: "conditional", icon: "doc" },
      { text: "Seat selection for a fee", type: "conditional", icon: "seat" },
      { text: "Premium seat", type: "included" },
      { text: "1 free carry-on", type: "included" },
      { text: "1st checked bag up to 32 kg free", type: "included" },
    ],
  },
];

const otherAirlines = [
  { name: "BudgetAir", priceUsd: 232, priceEur: 213, subtitle: null, color: "text-emerald-600" },
  { name: "Airpaz", priceUsd: 236, priceEur: 216, subtitle: null, color: "text-red-600" },
  { name: "Martigo", priceUsd: 240, priceEur: 220, subtitle: null, color: "text-pink-600" },
  { name: "Kiwi.com", priceUsd: 251, priceEur: null, subtitle: "Separate tickets booked together", color: "text-blue-600" },
];

function FeatureIcon({ type, icon }) {
  if (type === "negative")
    return <IoClose className="shrink-0 w-5 h-5 text-red-500" aria-hidden />;
  if (type === "included")
    return <IoCheckmarkCircle className="shrink-0 w-5 h-5 text-emerald-500" aria-hidden />;
  if (icon === "doc")
    return <IoDocumentTextOutline className="shrink-0 w-5 h-5 text-gray-500" aria-hidden />;
  if (icon === "seat")
    return <MdEventSeat className="shrink-0 w-5 h-5 text-gray-500" aria-hidden />;
  if (icon === "suitcase")
    return <FaSuitcase className="shrink-0 w-5 h-5 text-gray-500" aria-hidden />;
  return null;
}

export default function Boooking_options({airlineName = "British Airways",
  airlineLogo = BRITISH_AIRWAYS_LOGO,
  selectedFlights = [],
  onContinue,
}) {
  const [hideAirlineOptions, setHideAirlineOptions] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const showLogo = airlineLogo && !logoError;

  // **************************** api fo booking
const departure_id = useSelector((state) => state.user.SearchFlight.startfrom);
const start_date = useSelector((state) => state.user.SearchFlight.startDate);
const back_date = useSelector((state) => state.user.SearchFlight.endDate);
const arrival_id = useSelector((state) => state.user.SearchFlight.endto);
//   ***********
const outbound_date = moment(start_date).format("YYYY-MM-DD");
const return_date = moment(back_date).format("YYYY-MM-DD");
const getData = useSearchParams()
const departure_token = getData.get("_tok")
const {data:BookingOptions} = useQuery({
  queryKey:["bookingoptions",departure_id,
      outbound_date,
      return_date,
      arrival_id,
      departure_token],
  queryFn:() => GetSerpBookingOptions({
    departure_id,
      outbound_date,
      return_date,
      arrival_id,
      departure_token
  }),
  enabled: !!departure_id && !!arrival_id && !!outbound_date,
})

console.log(BookingOptions,"bbbbbbbbbbbbbbbboookingnnnnnnnnnnnnnnn");



  return (
    <section className="booking-options py-4">
      <div className="container">
        <div className="row justify-center">
          <div className="col-lg-12">
            <div className="bg-white rounded card_rounded border border-gray-200 shadow-sm overflow-hidden">
              {/* Section header */}
              <div className="px-4 md:px-6 pt-5 pb-3 border-b border-gray-100">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h2 className="text-lg md:text-xl font-semibold text-gray-900">
                    Booking options
                  </h2>
                  <button
                    type="button"
                    className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    <span>How options are ranked</span>
                    <HiOutlineInformationCircle className="w-4 h-4 shrink-0" aria-hidden />
                  </button>
                </div>
              </div>

              {/* British Airways block */}
              <div className="px-4 md:px-6 py-4">
                <div
                  className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-gray-100"
                  role="group"
                  aria-label="Book with British Airways"
                >
                  <div className="flex items-center gap-3">
                    {showLogo ? (
                      <img
                        src={airlineLogo}
                        alt={airlineName}
                        className="w-10 h-10 object-contain bg-white rounded"
                        onError={() => setLogoError(true)}
                      />
                    ) : (
                      <div
                        className="w-10 h-10 rounded bg-gray-100 flex items-center justify-center text-sm font-bold text-gray-600"
                        aria-hidden
                      >
                        {airlineName
                          .split(" ")
                          .map((w) => w[0])
                          .join("")
                          .slice(0, 2)}
                      </div>
                    )}
                    <span className="font-medium text-gray-900">
                      Book with {airlineName}
                    </span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                      Airline
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setHideAirlineOptions((v) => !v)}
                    className="inline-flex items-center gap-1.5 text-sm text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    {hideAirlineOptions ? (
                      <>
                        <FiChevronDown className="w-4 h-4" aria-hidden />
                        Show options
                      </>
                    ) : (
                      <>
                        <FiChevronUp className="w-4 h-4" aria-hidden />
                        Hide options
                      </>
                    )}
                  </button>
                </div>

                {!hideAirlineOptions && (
                  <>
                    {/* Fare columns */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-gray-200 rounded-lg overflow-hidden mb-4">
                      {fareOptions.map((fare, idx) => (
                        <div
                          key={fare.name}
                          className={`bg-white p-4 md:p-5 flex flex-col ${
                            idx < fareOptions.length - 1
                              ? "md:border-r border-gray-200"
                              : ""
                          }`}
                        >
                          <h3 className="text-base font-semibold text-gray-900 mb-2">
                            {fare.name}
                          </h3>
                          <div className="mb-4">
                            <span className="text-2xl md:text-3xl font-bold text-gray-900">
                              ${fare.priceUsd}
                            </span>
                            <span className="block text-sm text-gray-500">
                              €{fare.priceEur}
                            </span>
                          </div>
                          <ul className="space-y-2.5 mb-6 flex-1">
                            {fare.features.map((f, i) => (
                              <li
                                key={i}
                                className="flex items-start gap-2 text-sm text-gray-700"
                              >
                                <FeatureIcon type={f.type} icon={f.icon} />
                                <span>{f.text}</span>
                              </li>
                            ))}
                          </ul>
                          <button
                            type="button"
                            onClick={() => onContinue?.({ fare, provider: airlineName })}
                            className="button_bg2 w-full py-2.5 rounded-lg text-sm font-semibold mt-auto"
                          >
                            Continue
                          </button>
                        </div>
                      ))}
                    </div>

                    <p className="text-xs text-gray-500 leading-relaxed">
                      Fare and baggage fees apply to your entire trip. Bag fees
                      may be higher at the airport.{" "}
                      <a
                        href="#"
                        className="text-blue-600 hover:underline"
                      >
                        {airlineName} bag policy
                      </a>{" "}
                      For non-refundable fare options, taxes may be refundable.
                    </p>
                  </>
                )}
              </div>

              {/* Other airlines list */}
              <div className="px-4 md:px-6 py-4 border-t border-gray-100">
                {otherAirlines.map((provider, idx) => (
                  <div
                    key={provider.name}
                    className={`flex flex-wrap items-center justify-between gap-3 py-4 ${
                      idx < otherAirlines.length - 1
                        ? "border-b border-gray-100"
                        : ""
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span
                        className={`flex items-center justify-center w-10 h-10 rounded-lg bg-gray-100 font-semibold text-lg ${provider.color}`}
                        aria-hidden
                      >
                        {provider.name.charAt(0)}
                      </span>
                      <div>
                        <p className="font-medium text-gray-900">
                          Book with {provider.name}
                        </p>
                        {provider.subtitle && (
                          <p className="text-xs text-gray-500 mt-0.5">
                            {provider.subtitle}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <div className="text-right">
                        <span className="text-lg font-semibold text-gray-900">
                          ${provider.priceUsd}
                        </span>
                        {provider.priceEur != null && (
                          <span className="block text-xs text-gray-500">
                            €{provider.priceEur}
                          </span>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => onContinue?.({ provider: provider.name, priceUsd: provider.priceUsd })}
                        className="px-4 py-2 rounded-lg text-sm font-semibold border-2 border-blue-500 text-blue-600 hover:bg-blue-50 transition-colors"
                      >
                        Continue
                      </button>
                    </div>
                  </div>
                ))}

                <p className="text-xs text-gray-500 pt-2 leading-relaxed">
                  Prices include required taxes + fees for 1 adult. Optional
                  charges and{" "}
                  <a href="#" className="text-blue-600 hover:underline">
                    bag fees
                  </a>{" "}
                  may apply.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
