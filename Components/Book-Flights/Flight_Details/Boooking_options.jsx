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
import { VscArrowSwap } from "react-icons/vsc";
import { Accordion } from "react-bootstrap";

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
  { name: "Kiwi.com", priceUsd: 251, priceEur: 220, subtitle: null, color: "text-blue-600" },
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

export default function Boooking_options({ airlineName = "British Airways",
  airlineLogo = BRITISH_AIRWAYS_LOGO,

  onContinue,
}) {
  const [hideAirlineOptions, setHideAirlineOptions] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const showLogo = airlineLogo && !logoError;
  const [showText, setShowText] = useState(false)
  const [activeKey, setActiveKey] = useState(null);

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
  const { data: BookingOptions } = useQuery({
    queryKey: ["bookingoptions", departure_id,
      outbound_date,
      return_date,
      arrival_id,
      departure_token],
    queryFn: () => GetSerpBookingOptions({
      departure_id,
      outbound_date,
      return_date,
      arrival_id,
      departure_token
    }),
    enabled: !!departure_id && !!arrival_id && !!outbound_date,
  })

  console.log(BookingOptions, "bbbbbbbbbbbbbbbboookingnnnnnnnnnnnnnnn");
  return (
    <section className="booking-options py-4">
      <div className="container">
        <div className="row justify-center">
          <div className="col-lg-12">
            <div className="bg-white rounded card_rounded border border-gray-200  overflow-hidden">
              {/* Section header */}
              <div className="px-4 md:px-6 pt-5 pb-3 border-b border-gray-100 padding_md">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="left_detail">

                    <h2 className="text-lg md:text-xl font-semibold text-gray-900 flex gap-2 items-center capitalize ">
                      <span>Chandigargh </span> <span className="swip"><VscArrowSwap /></span> <span>delhi</span>
                    </h2>
                    {/* ******************* */}
                    <div className="departure_time space-y-1">
                      {/* <div className="flex flex-wrap items-center gap-2 text-xs md:text-sm">
                                  <span className="font-semibold text-gray-900">
                                    
                                    <span className="text-gray-400">→</span>{" "}
                                 
                                  </span>
                                  <span className="hidden md:inline text-gray-400">
                                  
                                  </span>
                                  <span className="text-gray-600 capitalize">
                                   
                               
                                  </span>
                                </div> */}
                      <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500 mt-1 text">
                        <span className="inline-flex items-center px-2 py-0.5 rounded bg-emerald-50 text-gray-700 card_rounded border-emerald-100">
                          RoundTrip
                        </span>

                        <span className="inline-flex items-center px-2 py-0.5 rounded bg-gray-50 text-gray-700 card_rounded border-gray-200 sky_yellow">
                          Ecomnomy
                        </span>


                        <span className="inline-flex items-center px-2 py-0.5 rounded bg-emerald-50  card_rounded border-emerald-100 sky_green text-gray-700">
                          1 Passenger
                        </span>

                      </div>
                    </div>
                  </div>
                  <div
                    type="button"
                    className=" text-sm text-gray-500  hover:text-gray-700 transition-colors"
                  >
                    <h2 className="m-0 p-0 text-black">$999</h2>
                    <p className="m-0">Lowest total price</p>

                  </div>
                </div>
              </div>

              {/* British Airways block */}

              <div className="book_fligh">
                <div className="selected_flight">

                  <div className="px-4 md:px-6 py-4 flight_book">
                    <div
                      className="flex flex-wrap tap items-center justify-between gap-3  pb-3 border-b border-gray-100"
                      role="group"
                      aria-label="Book with British Airways"
                    >
                      <div className="flex tap-content items-center gap-3">
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
                          <p className="m-0 d-block d-lg-none">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-600 ">
                          Airline
                        </span>
                          </p>
                        </span>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-600 dis_no">
                          Airline
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setHideAirlineOptions((v) => !v)}
                        className="inline-flex items-center gap-1.5 text-sm text-gray-600 hover:text-gray-900 transition-colors book_top_btn"
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

                    {hideAirlineOptions && (
                      <>
                        {/* Fare columns */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-gray-200 rounded-lg overflow-hidden mb-4">
                          {fareOptions.map((fare, idx) => (
                            <div
                              key={fare.name}
                              className={`bg-white p-4 md:p-5 flex flex-col ${idx < fareOptions.length - 1
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
                  <div className="accordian_section px-5  py-5">
                    <Accordion onSelect={(eventKey) =>
                      setActiveKey(eventKey === activeKey ? null : eventKey)
                    }>
                      <Accordion.Item eventKey="0">
                        <Accordion.Header className="" onClick={() => setShowText(true)}>
                          <div className="acor_header ">
                            {
                              activeKey !== "0" ?

                                <div className="items flex  justify-between">
                                  <div className="img">
                                    <img src="/flights/places/6E.png" width={30} height={30} alt="" />
                                  </div>
                                  {/* ****** */}
                                  <div className="time acot-tit dis_txt">
                                    <span>Sun, Feb 15
                                      2:30 PM –
                                      5:20 PM</span>
                                    <p>indogo</p>
                                  </div>
                                  {/* ************* */}
                                  <div className="hout_tm acot-tit tt-c dis_no">
                                    <span> 2 hr 50 min</span>
                                    <p>IXC - GOI</p>
                                  </div>
                                  {/* ********* */}
                                  <div className="stops acot-tit tt-c dis_no">
                                    <span>nonstop</span>
                                  </div>
                                  {/* ******** weight */}
                                  <div className="weigth acot-tit tt-c dis_no">
                                    <span>
                                      118 kg CO2e</span>
                                    <p>
                                      +15% emission
                                    </p>
                                  </div>
                                </div> :

                                <div className="items flex  justify-between">
                                  <div className="img">
                                    <img src="/flights/places/6E.png" width={30} height={30} alt="" />
                                  </div>
                                  {/* ****** */}
                                  <div className="time acot-tit ">
                                    <h2 className="m-0">Departing flight
                                      Sun, Feb 15</h2>
                                    <p className=" m-0 ">indogo</p>
                                  </div>
                                  {/* ************* */}

                                  {/* ******** weight */}
                                  <div className="weigth acot-tit dis_no">
                                    <span>
                                      118 kg CO2e</span>
                                    <p>
                                      +15% emission
                                    </p>
                                  </div>
                                </div>
                            }



                          </div>


                        </Accordion.Header>
                        <Accordion.Body className="acor_p ">
                          {/* Horizontal timing line **********************************/}
                          <div
                            className="row items-center border_custom rounded px-3 py-3  md:px-4 md:py-4 bg-white  transition-all duration-200 cursor-pointer md-p1 pad-0 border-no  "

                          >
                            <div className="col-lg-10 mt-3 flex gap-2 justify-between md-p0 md-flex">
                              <div
                                className="flex flex-col gap-3 w-full rounded-xl bg-gray-50 px-3 py-3 mb-2"

                              >
                                {/* Top row: times & line */}
                                <div className="flex items-center justify-between gap-3">
                                  {/* Left time */}
                                  <div className="text-left">
                                    <div className="text-base font-semibold text-gray-900">
                                      4:30 PM
                                    </div>
                                    <div className="text-xs text-gray-600 text">
                                    Del- fab 12
                                    </div>
                                  </div>

                                  {/* Center line with stops & duration */}
                                  <div className="flex-1 flex flex-col items-center">
                                    <div className="flex items-center w-full max-w-xs justify-between">
                                      <span className="inline-block w-4 h-4 rounded-full card_rounded border-gray-400 bg-white" />
                                      <div className="flex-1 h-px bg-gray-300 mx-1" />
                                      <span className="inline-flex  items-center px-2 py-0.5 rounded   text-[11px] text-gray-700 color flex justify-center items-center shadow-sm text stop_span">
                                        1 stop
                                      </span>
                                      <div className="flex-1 h-px bg-gray-300 mx-1" />
                                      <span className="inline-block w-4 h-4 rounded-full card_rounded border-gray-400 bg-white" />
                                    </div>

                                    <div className="mt-1 text-xs text-black text-center text">
                                      3hr
                                    </div>

                                  </div>

                                  {/* Right time */}
                                  <div className="text-right">
                                    <div className="text-base font-semibold text-gray-900">
                                      5:55 PM
                                    </div>
                                    <div className="text-xs text-gray-600 text">
                                    Del- fab 12
                                    </div>
                                  </div>
                                </div>

                                {/* Airline label under line for mobile / small */}

                              </div>

                            </div>
                            {/* ************************************* */}
                            <div className="col-lg-2 mt-3 p-0">
                              <div className="side_content space-y-1 text-sm text-gray-600 text-left md:text-right">
                                <p className="p-0 m-0">
                                  Below average legroom (29 in)
                                </p>
                                <p className="p-0 m-0">In-seat USB outlet</p>
                                <p className="p-0 m-0">
                                  Carbon emissions estimate: 63 kg
                                </p>
                              </div>
                            </div>
                          </div>
                        </Accordion.Body>
                      </Accordion.Item>
                      <Accordion.Item eventKey="1">
                        <Accordion.Header>
                          <div className="acor_header ">
                            {
                             activeKey !== "1" ?

                                <div className="items flex  justify-between">
                                  <div className="img">
                                    <img src="/flights/places/6E.png" width={30} height={30} alt="" />
                                  </div>
                                  {/* ****** */}
                                  <div className="time acot-tit dis_txt">
                                    <span>Sun, Feb 15
                                      2:30 PM –
                                      5:20 PM</span>
                                    <p>indogo</p>
                                  </div>
                                  {/* ************* */}
                                  <div className="hout_tm acot-tit tt-c dis_no">
                                    <span>2 hr 50 min</span>
                                    <p>IXC - GOI</p>
                                  </div>
                                  {/* ********* */}
                                  <div className="stops acot-tit  tt-c dis_no">
                                    <span>nonstop</span>
                                  </div>
                                  {/* ******** weight */}
                                  <div className="weigth acot-tit tt-c dis_no">
                                    <span>
                                      118 kg CO2e</span>
                                    <p>
                                      +15% emission
                                    </p>
                                  </div>
                                </div> :

                                <div className="items flex  justify-between">
                                  <div className="img">
                                    <img src="/flights/places/6E.png" width={30} height={30} alt="" />
                                  </div>
                                  {/* ****** */}
                                  <div className="time acot-tit">
                                    <h2 className="m-0">Departing flight
                                      Sun, Feb 15</h2>
                                    <p className=" m-0">indogo</p>
                                  </div>
                                  {/* ************* */}
                                  {/* ******** weight */}
                                  <div className="weigth acot-tit dis_no">
                                    <span>
                                      118 kg CO2e</span>
                                    <p>
                                      +15% emission
                                    </p>
                                  </div>
                                </div>
                            }



                          </div>

                        </Accordion.Header>
                        <Accordion.Body className="acor_p">
                          {/* Horizontal timing line **********************************/}
                          <div
                            className="row items-center border_custom rounded px-3 py-3   md:px-4 md:py-4 bg-white  transition-all duration-200 cursor-pointer md-p1 pad-0 border-no"

                          >
                            <div className="col-lg-10 mt-3 flex gap-2 justify-between md-p0 md-flex">
                              <div
                                className="flex flex-col gap-3 w-full rounded-xl bg-gray-50 px-3 py-3 mb-2"

                              >
                                {/* Top row: times & line */}
                                <div className="flex items-center justify-between gap-3">
                                  {/* Left time */}
                                  <div className="text-left">
                                    <div className="text-base font-semibold text-gray-900">
                                      4:30 PM
                                    </div>
                                    <div className="text-xs text-gray-600 text">
                                     Del- fab 12
                                    </div>
                                  </div>

                                  {/* Center line with stops & duration */}
                                  <div className="flex-1 flex flex-col items-center">
                                    <div className="flex items-center w-full max-w-xs justify-between">
                                      <span className="inline-block w-4 h-4 rounded-full card_rounded border-gray-400 bg-white" />
                                      <div className="flex-1 h-px bg-gray-300 mx-1" />
                                      <span className="inline-flex  items-center px-2 py-0.5 rounded   text-[11px] text-gray-700 color flex justify-center items-center shadow-sm text stop_span">
                                        1 stop
                                      </span>
                                      <div className="flex-1 h-px bg-gray-300 mx-1" />
                                      <span className="inline-block w-4 h-4 rounded-full card_rounded border-gray-400 bg-white" />
                                    </div>

                                    <div className="mt-1 text-xs text-black text-center text">
                                      3hr
                                    </div>

                                  </div>

                                  {/* Right time */}
                                  <div className="text-right">
                                    <div className="text-base font-semibold text-gray-900">
                                      5:55 PM
                                    </div>
                                    <div className="text-xs text-gray-600 text">
                                    Del- fab 12
                                    </div>
                                  </div>
                                </div>

                                {/* Airline label under line for mobile / small */}

                              </div>

                            </div>
                            {/* ************************************* */}
                            <div className="col-lg-2 mt-3 p-0">
                              <div className="side_content space-y-1 text-sm text-gray-600 text-left md:text-right">
                                <p className="p-0 m-0">
                                  Below average legroom (29 in)
                                </p>
                                <p className="p-0 m-0">In-seat USB outlet</p>
                                <p className="p-0 m-0">
                                  Carbon emissions estimate: 63 kg
                                </p>
                              </div>
                            </div>
                          </div>
                        </Accordion.Body>
                      </Accordion.Item>
                    </Accordion>
                  </div>


                  {/* ****************************************** */}



                  <div className="price_list border-t border-gray-100">
                    {otherAirlines.map((provider, idx) => (
                      <div
                        key={provider.name}
                        className={`flex flex-wrap items-center justify-between gap-3  price_box ${idx < otherAirlines.length - 1
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
                          <div className="pt-text">
                            <p className="font-medium text-gray-900 m-0">
                              Book with {provider.name}
                            </p>
                            {provider.subtitle && (
                              <p className="text-xs text-gray-500 m-0">
                                {provider.subtitle}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-3 shrink-0">
                          <div className="text-right pt_rice">
                            <span className="text-lg font-semibold text-gray-900  m-0">
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
                            className="button_bg2  rounded text-sm font-semibold whitespace-nowrap mt-1 button_flight2 "
                          >
                            Continue
                          </button>
                        </div>
                      </div>
                    ))}


                  </div>
                </div>

              </div>




            </div>
          </div>
        </div>








        {/* **************************** */}
        {/* Flight Card */}


      </div>
    </section>
  );
}
