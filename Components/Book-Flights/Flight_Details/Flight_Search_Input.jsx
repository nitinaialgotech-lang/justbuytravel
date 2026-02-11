 "use client"
import React, { useState } from "react";
import { VscArrowSwap } from "react-icons/vsc";
import { BiRadioCircle } from "react-icons/bi";
import { IoLocationSharp } from "react-icons/io5";
import { SlCalender } from "react-icons/sl";
import { FaUser } from "react-icons/fa";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";
import "react-day-picker/dist/style.css";
import { useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { setSearchFlight } from "@/Components/Redux/Reducer";
import { Flight_AutoCompletion } from "@/app/Route/endpoints";
import { useRouter } from "next/navigation";

export default function Flight_Search_Input() {
  const dispatch = useDispatch();
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [range, setRange] = useState();
  const [open, setOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [typed,setType] = useState("")
  const [showToDropdown, setShowToDropdown] = useState(false);

  const q = from;
  const qTo = to;

  const formatted =
    range?.from && range?.to
      ? `${format(range.from, "EEE, MMM d")} - ${format(
          range.to,
          "EEE, MMM d"
        )}`
      : "";

  // Fetch autocomplete results for departure airport
  const { data: autoCompleteData, isLoading } = useQuery({
    queryKey: ["flight_autoComplete", q],
    queryFn: () => Flight_AutoCompletion(q),
    enabled: !!q && q.trim().length > 1,
    staleTime: 30000,
  });

  const autoDropdownData = autoCompleteData?.data?.suggestions || [];

  // Fetch autocomplete results for destination airport
  const { data: autoCompleteToData, isLoading: isLoadingTo } = useQuery({
    queryKey: ["flight_autoComplete_to", qTo],
    queryFn: () => Flight_AutoCompletion(qTo),
    enabled: !!qTo && qTo.trim().length > 1,
    staleTime: 30000,
  });
  // INSERT_YOUR_CODE
  // INSERT_YOUR_CODE
  // Show/hide trip type dropdown state
  const [showTripTypeDropdown, setShowTripTypeDropdown] = useState(false);
  // Track selected trip type: 'oneway', 'roundtrip', or 'multicity'
  const [tripType, setTripType] = useState("oneway");
  const router = useRouter();


  const autoToDropdownData = autoCompleteToData?.data?.suggestions || [];

  const handleSearch = () => {
    dispatch(
      setSearchFlight({
        startfrom: from,
        endto: to,
        startDate: range?.from,
        endDate: range?.to,
        type:typed
      })
    );
    router.push("/flight-details");
  };
  const whatType = [
    {
      id:"2",
      name:"One Way"
    },
    {
      id:"1",
      name:"Round Trip"
    },
    {
      id:"3",
      name:"Multi-city"
    },
  ]

  return (
    <section className="flight_detail_section padding_bottom">
      <div className="container mx-auto ">
        <div className="flight_chart_box_input bg-white rounded-2xl shadow-md border border-gray-100  space-y-5">
          <div className="row m-0 ">
            <div className="header_input_head space-y-4">
              <div className="header_title m-0">
                <div className="content flex flex-wrap items-center gap-3 md:gap-5">
                  <div className="item flex items-center gap-2">
                    <div className="relative">
                      <button
                        type="button"
                        className="flex items-center gap-2 px-3 py-1 rounded bg-neutral-100 hover:bg-neutral-200 transition"
                        onClick={() => setShowTripTypeDropdown((v) => !v)}
                        aria-haspopup="listbox"
                        aria-expanded={showTripTypeDropdown}
                      >
                        <VscArrowSwap />
                        <span>
                          {tripType === "One Way"
                            ? "One Way"
                            : tripType === "Round Trip"
                            ? "Round Trip"
                            : "Multi-city"}
                        </span>
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      {showTripTypeDropdown && (
                        <ul
                          className="absolute z-10 left-0 mt-1 w-full p-0 rounded shadow bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                          tabIndex={-1}
                          role="listbox"
                        >

                          {
                            whatType?.map((item) => {
                              return (
                             
                                  <li
                            className={`ps-3 py-2 cursor-pointer hover:bg-neutral-100 ${
                              tripType === item?.name ? "font-medium g_color" : ""
                            }`}
                            onClick={() => {
                              setTripType(item?.name);
                              setShowTripTypeDropdown(false);
                              setType(item?.id)
                            }}
                            role="option"
                            aria-selected={tripType === item?.name}
                          >
                           {item?.name}
                          </li>
                             
                              )
                            })
                          }
                        




                  
                        </ul>
                      )}
                    </div>
                  </div>
                  {/* ************ */}
                  <div className="item flex items-center gap-2">
                    <span>
                      <FaUser />
                    </span>
                    <span>1</span>
                  </div>
                  {/* ************ */}
                  <div className="item">
                    <span></span>
                    <span>Economy (included basic) </span>
                  </div>
                  {/* ************ */}
                </div>
              </div>

              <div className="header_input_item flex flex-col md:flex-row gap-3 md:gap-4">
                {/* From input with autocomplete */}
                <div className="header_input_1 relative flex flex-1 gap-2">
                  <div className="header_input relative h-12">
                    <div className="icon  absolute inset-y-0 start-3 flex items-center  pointer-events-none icon_search">
                      <BiRadioCircle />
                    </div>
                    <input
                      type="text"
                      name="from"
                      id="from"
                      placeholder="Paris CDG"
                      className="block w-full  bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:outline-none focus:ring-0 placeholder:text-body ps-10 capitalize"
                      value={from}
                      onChange={(e) => {
                        const value = e.target.value;
                        setFrom(value);
                        if (value.trim().length > 1) {
                          setShowDropdown(true);
                        } else {
                          setShowDropdown(false);
                        }
                      }}
                      onFocus={() => {
                        if (from.trim().length > 1 && autoDropdownData.length) {
                          setShowDropdown(true);
                        }
                      }}
                      onBlur={() => {
                        // small delay so click/mousedown on an item still works
                        setTimeout(() => setShowDropdown(false), 150);
                      }}
                      aria-label="Departure airport"
                    />
               {/* *********************** auto dropdown data *********************** */}
                    {showDropdown && (
                      <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-xl max-h-96 overflow-y-auto">
                        {isLoading ? (
                          <div className="px-4 py-3 text-center text-gray-500 text-sm">
                            Loading airports...
                          </div>
                        ) : autoDropdownData.length > 0 ? (
                          autoDropdownData.map((suggestion, index) => {
                            const primaryAirport =
                              Array.isArray(suggestion.airports) &&
                              suggestion.airports.length > 0
                                ? suggestion.airports[0]
                                : null;

                            return (
                              <button
                                key={suggestion.id || index}
                                type="button"
                                onMouseDown={(e) => {
                                  e.preventDefault();
                                  setShowDropdown(false);
                                  setFrom(suggestion?.airports?.[0]?.id || "");
                                }}
                                className="w-full text-left px-4 py-2 hover:bg-gray-50 cursor-pointer"
                              >
                                <div className="text-sm font-medium text-gray-900">
                                  <strong>{suggestion?.airports?.[0]?.id} - </strong>{suggestion?.airports?.[0]?.name}
                                </div>
                               
                                  <div className="text-xs text-gray-500">
                                    City {suggestion?.airports?.[0]?.city}
                                  </div>
                              
                              </button>
                            );
                          })
                        ) : from.trim().length > 1 ? (
                          <div className="px-4 py-3 text-center text-gray-500 text-sm">
                            No airports found for "{from}"
                          </div>
                        ) : null}
                      </div>
                    )}
                  </div>

                  {/* Swap icon */}
                  <div className="arrow absolute flex items-center justify-center inset-y-0 left-1/2 -translate-x-1/2">
                    <VscArrowSwap />
                  </div>

                  {/* To input (plain text) */}
                  <div className="header_input relative ">
                    <div className="icon absolute inset-y-0 start-3 flex items-center  pointer-events-none icon_search">
                      <IoLocationSharp />
                    </div>
                    <input
                      type="text"
                      name="to"
                      id="to"
                      className="block w-full h-full bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:outline-none focus:ring-0 placeholder:text-body ps-10 capitalize"
                      onChange={(e) => {
                        const value = e.target.value;
                        setTo(value);
                        if (value.trim().length > 1) {
                          setShowToDropdown(true);
                        } else {
                          setShowToDropdown(false);
                        }
                      }}
                      placeholder="Austria AUS"
                      value={to}
                      aria-label="Destination airport"
                      onFocus={() => {
                        if (to.trim().length > 1 && autoToDropdownData.length) {
                          setShowToDropdown(true);
                        }
                      }}
                      onBlur={() => {
                        setTimeout(() => setShowToDropdown(false), 150);
                      }}
                    />
                    {/* *********************** auto dropdown data for destination *********************** */}
                    {showToDropdown && (
                      <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-xl max-h-96 overflow-y-auto">
                        {isLoadingTo ? (
                          <div className="px-4 py-3 text-center text-gray-500 text-sm">
                            Loading airports...
                          </div>
                        ) : autoToDropdownData.length > 0 ? (
                          autoToDropdownData.map((suggestion, index) => {
                            const primaryAirport =
                              Array.isArray(suggestion.airports) &&
                              suggestion.airports.length > 0
                                ? suggestion.airports[0]
                                : null;

                            return (
                              <button
                                key={suggestion.id || index}
                                type="button"
                                onMouseDown={(e) => {
                                  e.preventDefault();
                                 setTo(suggestion?.airports?.[0]?.id || "");
                                  setShowToDropdown(false);
                                }}
                                className="w-full text-left px-4 py-2 hover:bg-gray-50 cursor-pointer"
                              >
                                <div className="text-sm font-medium text-gray-900">
                                  <strong>{primaryAirport?.id} - </strong>
                                  {primaryAirport?.name}
                                </div>
                               
                                  <div className="text-xs text-gray-500">
                                    City {primaryAirport?.city}
                                  </div>
                      
                              </button>
                            );
                          })
                        ) : to.trim().length > 1 ? (
                          <div className="px-4 py-3 text-center text-gray-500 text-sm">
                            No airports found for "{to}"
                          </div>
                        ) : null}
                      </div>
                    )}
                  </div>
                </div>

                {/* Date range picker */}
                <div className="header_input relative h-12 ">
                  <div className="icon icon absolute inset-y-0 start-3 flex items-center  pointer-events-none icon_search">
                    <SlCalender />
                  </div>
                  <input
                    type="text"
                    readOnly
                    onClick={() => setOpen(!open)}
                    name="dates"
                    id="dates"
                    className="block w-full h-full bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:outline-none focus:ring-0 placeholder:text-body ps-10 capitalize"
                    placeholder={formatted || "Select departure & return"}
                  />
                  {open && (
                    <div className="absolute z-50 mt-2 bg-white shadow-xl rounded-lg p-4">
                      <DayPicker
                        mode="range"
                        selected={range}
                        onSelect={setRange}
                        numberOfMonths={1}
                        disabled={{ before: new Date() }}
                      />
                    </div>
                  )}
                </div>

                <button
                  className="bsolute top-2 end-3 bg-brand hover:bg-brand-strong box-border border border-transparent shadow-xs font-medium leading-5 text-xs focus:outline-none button_bg2 text-white rounded search_full_button_padding"
                  onClick={handleSearch}
                >
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
