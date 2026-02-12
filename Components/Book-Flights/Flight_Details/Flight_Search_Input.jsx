"use client"
import React, { useState, useEffect } from 'react'
import { VscArrowSwap } from "react-icons/vsc";
import { BiRadioCircle } from "react-icons/bi";
import { IoLocationSharp } from "react-icons/io5";
import { SlCalender } from "react-icons/sl";
import { FaUser } from "react-icons/fa";
import { MdLocationCity } from "react-icons/md";
import { MdPublic } from "react-icons/md";
import { DayPicker } from 'react-day-picker';
import { format } from "date-fns";
import "react-day-picker/dist/style.css";
import { useQuery } from '@tanstack/react-query';

import { useDispatch } from 'react-redux';
import { setEndDate, setFromName, setSearchFlight, setStartDate, setToName } from '@/Components/Redux/Reducer';
import { Flight_AutoCompletion } from '@/app/Route/endpoints';

// Debounce value for fast typing without spamming API
function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
        const t = setTimeout(() => setDebouncedValue(value), delay);
        return () => clearTimeout(t);
    }, [value, delay]);
    return debouncedValue;
}


export default function Flight_Search_Input() {
    const dispatch = useDispatch()
    const [range, setRange] = useState();
    const [open, setOpen] = useState(false);
    const [showDropdown, setShowDropdown] = useState({ from: false, to: false });
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [focusedField, setFocusedField] = useState("from"); // "from" | "to" - which input is active for autocomplete
    const [searchType, setSearchType] = useState("flight");
    const [activeTab, setActiveTab] = useState("flight");
    const formatted =
        range?.from && range?.to
            ? `${format(range.from, "EEE, MMM d")} - ${format(
                range.to,
                "EEE, MMM d"
            )}`
            : "";
    // **************************
    // Debounced search – avoids API spam on fast typing
    const searchQuery = focusedField === "from" ? from : to;
    const debouncedQuery = useDebounce(searchQuery.trim(), 220);

    const { data: autoCompleteData, isLoading } = useQuery({
        queryKey: ["flight_autoComplete", debouncedQuery, focusedField],
        queryFn: () => Flight_AutoCompletion(debouncedQuery),
        enabled: debouncedQuery.length > 0,
        staleTime: 60000, // Cache 1 min for faster repeat searches
    });
    const suggestions = autoCompleteData?.data?.suggestions ?? [];

    const SuggestionItem = ({ s, onSelect }) => {
        const isCity = s.type === "city";
        const Icon = isCity ? MdLocationCity : MdPublic;
        const label = s.airports?.length ? `${s.name} (${s.airports[0]?.id ?? s.id})` : s.name;
        return (
            <li
                className="flex items-start gap-3 px-4 py-3 hover:bg-slate-50 active:bg-slate-100 cursor-pointer transition-colors border-b border-slate-100 last:border-0"
                onMouseDown={(e) => { e.preventDefault(); onSelect(label); }}
            >
                <span className="mt-0.5 shrink-0 text-slate-400"><Icon className="size-4" /></span>
                <div className="min-w-0 flex-1">
                    <div className="font-medium text-slate-800">{s.name}</div>
                    {s.description && <div className="text-xs text-slate-500 mt-0.5">{s.description}</div>}
                    {s.airports?.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-2">
                            {s.airports.map((a) => (
                                <span key={a.id} className="inline-flex items-center px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-xs font-medium">
                                    {a.name} ({a.id})
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            </li>
        );
    };

    const DropdownContent = ({ setValue, close }) => (
        <div className="absolute top-full left-0 right-0 mt-1 z-50 bg-white rounded-xl border border-slate-200 shadow-xl overflow-hidden">
            {isLoading ? (
                <div className="px-4 py-6 flex flex-col items-center justify-center gap-3">
                    <div className="w-8 h-8 border-2 border-slate-200 border-t-brand rounded-full animate-spin" />
                    <span className="text-sm text-slate-500">Searching destinations...</span>
                </div>
            ) : suggestions.length > 0 ? (
                <ul className="max-h-72 overflow-auto py-1">
                    {suggestions.map((s) => (
                        <SuggestionItem key={s.id || s.position} s={s} onSelect={(label) => { setValue(label); close(); }} />
                    ))}
                </ul>
            ) : null}
        </div>
    );
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
                                        <input type="text" name='ss' id='ss' placeholder='Paris CDG' className='block w-full h-full bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:outline-none focus:ring-0 placeholder:text-body ps-10 capitalize' onChange={(e) => {
                                                setFrom(e.target.value);
                                                setShowDropdown((s) => ({ ...s, from: true }));
                                            }}
                                            value={from}
                                            onFocus={() => {
                                                setFocusedField("from");
                                                setShowDropdown((s) => ({ ...s, from: true, to: false }));
                                            }}
                                            onBlur={() => setTimeout(() => setShowDropdown((s) => ({ ...s, from: false })), 150)}
                                            aria-label="Departure airport" />
                                        {showDropdown.from && focusedField === "from" && (
                                            <DropdownContent
                                                setValue={setFrom}
                                                close={() => setShowDropdown((x) => ({ ...x, from: false }))}
                                            />
                                        )}
                                    </div>
                                    {/* ******** */}
                                    <div className="arrow absolute flex items-center justify-center inset-y-0 left-1/2 -translate-x-1/2">
                                        <VscArrowSwap />
                                    </div>
                                    <div className="header_input relative h-12">
                                        <div className="icon absolute inset-y-0 start-3 flex items-center  pointer-events-none icon_search">
                                            <IoLocationSharp />
                                        </div>
                                        <input type="text" name='dd' id='pp' className='block w-full h-full bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:outline-none focus:ring-0 placeholder:text-body ps-10 capitalize' onChange={(e) => {
                                                setTo(e.target.value);
                                                setShowDropdown((s) => ({ ...s, to: true }));
                                            }}
                                            value={to}
                                            onFocus={() => {
                                                setFocusedField("to");
                                                setShowDropdown((s) => ({ ...s, to: true, from: false }));
                                            }}
                                            onBlur={() => setTimeout(() => setShowDropdown((s) => ({ ...s, to: false })), 150)}
                                            placeholder='Austria AUS' aria-label="Destination airport" />
                                        {showDropdown.to && focusedField === "to" && (
                                            <DropdownContent
                                                setValue={setTo}
                                                close={() => setShowDropdown((x) => ({ ...x, to: false }))}
                                            />
                                        )}
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
