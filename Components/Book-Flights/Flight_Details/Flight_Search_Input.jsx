"use client"
import React, { useState } from 'react'
import { VscArrowSwap } from "react-icons/vsc";
import { BiRadioCircle } from "react-icons/bi";
import { IoLocationSharp } from "react-icons/io5";
import { SlCalender } from "react-icons/sl";
import { FaUser } from "react-icons/fa";
import { DayPicker } from 'react-day-picker';
import { format } from "date-fns";
import "react-day-picker/dist/style.css";
import { useDispatch } from 'react-redux';
import { setEndDate, setFromName, setSearchFlight, setStartDate, setToName } from '@/Components/Redux/Reducer';


export default function Flight_Search_Input() {
    const dispatch = useDispatch()
    const [range, setRange] = useState();
    const [open, setOpen] = useState(false);
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");

    const formatted =
        range?.from && range?.to
            ? `${format(range.from, "EEE, MMM d")} - ${format(
                range.to,
                "EEE, MMM d"
            )}`
            : "";
    console.log(range, "llllll");
    // **************************
    // Fetch autocomplete results
    const { data: autoCompleteData, isLoading } = useQuery({
        queryKey: ["flight_autoComplete", searchContent, searchType, activeTab, showDefaultOnFocus],
        queryFn: () => Flight_AutoCompletion(search_name),
        // Enable when the user has typed OR when we've asked to show defaults on focus
        enabled: searchContent.length > 0 || showDefaultOnFocus,
        staleTime: 30000, // Cache for 30 seconds
    });
    // *****************************
    const SetsearchDetail = () => {
        dispatch(
            setSearchFlight({
                startfrom: from,
                endto: to,
                startDate: range?.from,
                endDate: range?.to,
            })
        );
    }
    return (
        <section className='flight_detail_section padding_bottom'>
            <div className="container mx-auto ">
                <div className="flight_chart_box_input bg-white rounded-2xl shadow-md border border-gray-100  space-y-5">
                    <div className="row m-0 ">
                        <div className="header_input_head space-y-4">
                            <div className="header_title m-0">
                                <div className="content flex flex-wrap items-center gap-3 md:gap-5">
                                    <div className="item flex items-center gap-2">
                                        <span><VscArrowSwap /></span>
                                        <span>one way</span>
                                    </div>
                                    {/* ************ */}
                                    <div className="item flex items-center gap-2">
                                        <span><FaUser /></span>
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
                                <div className="header_input_1 relative flex flex-1 gap-2">
                                    <div className="header_input relative h-12">
                                        <div className="icon  absolute inset-y-0 start-3 flex items-center  pointer-events-none icon_search">
                                            <BiRadioCircle />
                                        </div>
                                        <input type="text" name='ss' id='ss' placeholder='Paris CDG' className='block w-full h-full bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:outline-none focus:ring-0 placeholder:text-body ps-10 capitalize' onChange={(e) => setFrom(e.target.value)}
                                            value={from}
                                            onFocus={() => {
                                                // When focusing with an empty input, trigger default
                                                // suggestions so the user immediately sees data.
                                                if (!searchContent.trim()) {
                                                    setShowDefaultOnFocus(true);
                                                }
                                                if (places.length > 0) setShowDropdown(true);
                                            }}
                                            aria-label="Destination airport" />

                                    </div>
                                    {/* ******** */}
                                    <div className="arrow absolute flex items-center justify-center inset-y-0 left-1/2 -translate-x-1/2">
                                        <VscArrowSwap />
                                    </div>
                                    <div className="header_input relative h-12">

                                        <div className="icon absolute inset-y-0 start-3 flex items-center  pointer-events-none icon_search">
                                            <IoLocationSharp />
                                        </div>
                                        <input type="text" name='dd' id='pp' className='block w-full h-full bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:outline-none focus:ring-0 placeholder:text-body ps-10 capitalize' onChange={(e) => setTo(e.target.value)} placeholder='Autria AUS' value={to} aria-label="Destination airport" />

                                    </div>
                                </div>
                                {/* ********* */}
                                <div className="header_input relative h-12 flex-1 ">

                                    <div className="icon icon absolute inset-y-0 start-3 flex items-center  pointer-events-none icon_search">
                                        <SlCalender />
                                    </div>
                                    <input type="text" readOnly
                                        onClick={() => setOpen(!open)} name='oo' id='ll' className='block w-full h-full bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:outline-none focus:ring-0 placeholder:text-body ps-10 capitalize' placeholder={formatted || "Select departure & return"} />
                                    {/* ************************************************* */}
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
                                <button className='bsolute top-2 end-3 bg-brand hover:bg-brand-strong box-border border border-transparent shadow-xs font-medium leading-5 text-xs focus:outline-none button_bg2 text-white rounded search_full_button_padding' onClick={() => SetsearchDetail()}>Search</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section >
    )
}
