"use client"
import React, { useEffect, useState } from "react";
import { VscArrowSwap } from "react-icons/vsc";
import { BiRadioCircle } from "react-icons/bi";
import { IoLocationSharp } from "react-icons/io5";
import { SlCalender } from "react-icons/sl";
import { FaUser } from "react-icons/fa";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";
import "react-day-picker/dist/style.css";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { resetSearchFlight, setSearchFlight } from "@/Components/Redux/Reducer";
import { Flight_AutoCompletion } from "@/app/Route/endpoints";
import { usePathname, useRouter } from "next/navigation";
import { useRef } from "react";
import { FiChevronDown } from "react-icons/fi";
// **************************************************************
export default function Flight_Search_Input() {
  const dispatch = useDispatch();
  const [from, setFrom] = useState("");
  const router = useRouter();
  const [to, setTo] = useState("");
  const [range, setRange] = useState();
  const [open, setOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [typed, setType] = useState("1")
  const [showToDropdown, setShowToDropdown] = useState(false);
  // ****************
  const [showPassengerDropdown, setShowPassengerDropdown] = useState(false);
const [passengerCount, setPassengerCount] = useState(1);
const passengerRef = useRef(null);
  // ************************************
  const q = from;
  const qTo = to;
  const [showClassDropdown, setShowClassDropdown] = useState(false);
  const [travelClass, setTravelClass] = useState("Economy (included basic)");
  const [travelId, setTravelClassId] = useState("1");
  // *******************************
  const departure_id = useSelector(state => state.user.SearchFlight.startfrom);
  const start_date = useSelector(state => state.user.SearchFlight.startDate);
  const back_date = useSelector(state => state.user.SearchFlight.endDate);
  const arrival_id = useSelector(state => state.user.SearchFlight.endto);

  const pathname = usePathname()
  // *********************
  const handlePassengerToggle = () => {
    setShowPassengerDropdown((prev) => !prev);
    setShowClassDropdown(false);
  };


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
  // ***************** unset redux

  useEffect(() => {
    if (pathname === "/flight") {
      dispatch(resetSearchFlight());
    }
  }, [pathname]);

  const autoToDropdownData = autoCompleteToData?.data?.suggestions || [];

  const handleSearch = () => {
    dispatch(
      setSearchFlight({
        startfrom: from,
        endto: to,
        startDate: range?.from,
        endDate: range?.to,
        type: typed,
        travelClass: travelId,
        passen_count: passengerCount
      })
    );
    router.push("/flight-details");
  };
  const whatType = [
    {
      id: "2",
      name: "One Way"
    },
    {
      id: "1",
      name: "Round Trip"
    },
    {
      id: "3",
      name: "Multi-city"
    },
  ]
  const economy = [
    {

      eco_name: "Economy (included basic)",
      id: "1",
    },
    {
      eco_name: "Premium Economy",
      id: "2",

    },
    {
      eco_name: "Business Class",
      id: "3"
    },
    {
      eco_name: "First Class",
      id: "4"
    }
  ]
  console.log(travelClass, "..................");
  // **************************************************************************
  const UpdateFlight_Detail = () => {
    dispatch(
      setSearchFlight({
        startfrom: departure_id,
        endto: arrival_id,
        startDate: start_date,
        endDate: back_date,
        type: typed,
        travelClass: travelId,
        passen_count: passengerCount
      })
    );
  }
// ******************************************
useEffect(() => {
  const handleClickOutside = (event) => {
    if (passengerRef.current && !passengerRef.current.contains(event.target)) {
      setShowPassengerDropdown(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);
  return () => document.removeEventListener("mousedown", handleClickOutside);
}, []);

  return (
    <section className={`flight_detail_section  ${pathname !== "/" ? "padding_bottom" : " padding_t20"}`}>
      <div className="container mx-auto ">
        <div className={`flight_chart_box_input bg-white rounded ${pathname !== "/" ? "shadow-md" : " "}  border border-gray-100  space-y-5`}>
          <div className="row m-0 ">
            <div className="header_input_head space-y-4">
              <div className="header_title m-0">
                <div className="content flex flex-wrap items-center gap-3 md:gap-5">
                  <div className="item flex items-center gap-2">
                    {/* <div className="relative">
                      <span>
                        <VscArrowSwap />
                      </span>
                    </div> */}
                    {/* *****************************************************************   typexxxxxxxxxxxxxxxx */}
                    <div className="type_item flex gap-3">
                      {
                        whatType?.map((item) => {
                          return (

                            <div className="type" key={item?.id}>
                              <label className="flex items-center cursor-pointer">
                                <input
                                  type="radio"
                                  name="tripType"
                                  value={item.id}
                                  checked={typed === item.id}
                                  onChange={(e) => setType(e.target.value)}
                                  onClick={() => {
                                    if (pathname == "/flight-details") {
                                      UpdateFlight_Detail()
                                    }
                                  }}
                                />
                                <span>{item?.name}</span>
                              </label>
                            </div>
                          )
                        })
                      }
                    </div>
                  </div>
                  {/* *****************************************************************   passenger xxxxxxxxxxxxxxxxx */}
                  



                  {/* *****************************************************************   Class Type*/}
                  <div className="item relative">
                    <span
                      className="cursor-pointer select-none"
                      onClick={() => { setShowClassDropdown((prev) => !prev), setShowPassengerDropdown(false) }}
                    >
                      {travelClass}
                    </span>

                    {/* Dropdown */}
                    <div
                      className={`
      absolute left-0 top-10 z-20 min-w-[220px] bg-white border border-gray-200 
      rounded-lg shadow-xl transition-all duration-200 ease-in-out
      ${showClassDropdown
                          ? "opacity-100 visible translate-y-0"
                          : "opacity-0 invisible -translate-y-2"}
    `}
                      onMouseLeave={() => setShowClassDropdown(false)}
                    >
                      <div className="flex flex-col p-3">
                        {economy?.map((item, index) => {
                          return (
                            <button
                              key={index}
                              type="button"
                              onClick={() => {
                                setTravelClass(item?.eco_name);
                                setTravelClassId(item?.id)
                                setShowClassDropdown(false);
                                if (pathname == "/flight-details") {
                                  UpdateFlight_Detail()
                                }
                              }}
                              className="text-left px-3 py-2 rounded-md hover:bg-gray-100 transition"
                            >
                              {item?.eco_name}
                            </button>
                          )
                        }

                        )}
                      </div>
                    </div>
                  </div>

                  {/* ************ */}
                </div>
              </div>
              {/* *****************************************************************   intput m,,,,,,,,,,,, */}
              <div className="header_input_item flex flex-col md:flex-row gap-3 md:gap-4">
                {/* From input with autocomplete */}
                <div className="header_input_1 relative flex flex-1 gap-2">
                  <div className="header_input relative h-12">
                    <div className="icon   absolute inset-y-0 start-3 flex items-center  pointer-events-none icon_search ">
                      <BiRadioCircle />
                    </div>
                    <input
                      type="text"
                      name="from"
                      id="from"
                      placeholder="Leaving From"
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
                      aria-label="Leaving From"
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
                      placeholder="Going to"
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

                

                {/* *********************** Dateeeeeeeeeeeeeeeeeeee *********************** */}
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
                    className="block w-full h-full bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:outline-none focus:ring-0 placeholder:text-body ps-10 capitalize cursor-pointer"
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
                {/* *********************** adultsssssssssssssssssssssss *********************** */}
                <div className="header_input relative h-12" ref={passengerRef}>
                  {/* Input Trigger */}
                  
                    <div className="icon icon absolute inset-y-0 start-3 flex items-center  pointer-events-none icon_search">
                    <FaUser />
                  </div>
                    <input
                      type="text"
                      readOnly
                      onClick={() => setShowPassengerDropdown((prev) => !prev)}
                      value={`${passengerCount} Adult${passengerCount > 1 ? "s" : ""}`}
                      className="block w-full cursor-pointer h-full bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:outline-none focus:ring-0 placeholder:text-body ps-10 capitalize"
                    />

                    {/* Arrow Icon */}
                    <FiChevronDown
                      className={`absolute right-3 top-1/2 -translate-y-1/2 transition-transform duration-300 ${showPassengerDropdown ? "rotate-180" : "rotate-0"
                        }`}
                      size={18}
                    />
                 

                  {/*........................................ Dropdown ........................................ */}
                  <div
                    className={`absolute left-0 mt-2 w-full bg-white border border-gray-200 
    rounded-xl shadow-2xl transition-all duration-300 ease-out origin-top z-50
    ${showPassengerDropdown
                        ? "opacity-100 scale-100 translate-y-0"
                        : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                      }`}
                  >
                    <div className="px-4 py-3 flex items-center justify-between">
                      <span className="text-sm text-gray-600">Adults</span>

                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() =>
                            setPassengerCount((c) => Math.max(1, c - 1))
                          }
                          className="w-8 h-8 rounded-full border border-gray-300 
          flex items-center justify-center bg-gray-100 hover:bg-gray-200 transition"
                        >
                          –
                        </button>

                        <span className="min-w-[20px] text-center font-medium">
                          {passengerCount}
                        </span>

                        <button
                          type="button"
                          onClick={() => setPassengerCount((c) => c + 1)}
                          className="w-8 h-8 rounded-full border border-gray-300 
          flex items-center justify-center bg-gray-100 hover:bg-gray-200 transition"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="px-4 pb-4">
                      <button
                        onClick={() => setShowPassengerDropdown(false)}
                        className="w-full bg-brand text-white rounded-lg py-2 text-sm font-medium hover:opacity-90 transition button_bg2"
                      >
                        Done
                      </button>
                    </div>
                  </div>
                </div>
                {/* *********************** >>>>>>>>>>>>>>>>>> *********************** */}
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
