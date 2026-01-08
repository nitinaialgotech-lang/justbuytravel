"use client";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import { FaHotel, FaUser } from "react-icons/fa";
import { MdFlight } from "react-icons/md";
import { FaCar } from "react-icons/fa6";
import { GrBike } from "react-icons/gr";
import { CiSearch } from "react-icons/ci";
import { useQuery } from "@tanstack/react-query";
import { Dropdown_Get, Get_cityName, SearchLocation } from "@/app/Route/endpoints";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import DestinationSection from "./DestinationSection/DestinationSection";
import RecomendSection from "./RecommendedSection/RecomendSection";
import GetOfferSection from "./GetOfferSection/GetOfferSection";
import ExperienceExploreSection from "./ExpereinceExploreSection/ExperienceExploreSection";
import Footer from "@/component/Footer";

export default function Search() {
    const [location, setLocation] = useState(""); // For storing resolved location
    const [isLoadingLocation, setIsLoadingLocation] = useState(true); // Loading state for geolocation
    const [searchContent, setSearchContent] = useState("");
    const adults = 1; // Example: Replace with actual value
    const checkin = null; // Example: Replace with actual value
    const checkout = null; // Example: Replace with actual value
    const API_BASE = process.env.NEXT_PUBLIC_API_BASE; // Example: Replace with actual API base

    const reverseGeocode = useCallback(async (lat, lng) => {
        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1`,
                {
                    headers: {
                        "User-Agent": "JustBuyTravel/1.0 (contact@justbuytravel.com)"
                    }
                }
            );

            const data = await response.json();

            console.log(data, "data of reverse unicode ");


            if (!data?.address) return null;

            const address = data.address;

            const city =
                address.city ||
                address.town ||
                address.village ||
                address.suburb ||
                address.neighbourhood ||
                address.borough ||
                address.municipality ||
                address.county ||
                address.state;

            return city || null;
        } catch (error) {
            console.error("Reverse geocoding error:", error);
            return null;
        }
    }, []);
    // **********************************
    const [cityName, setCityName] = useState("")
    // ***************************************************************************************
    const doSearch = useCallback(async (locOverride) => {
        try {
            // Check if API_BASE is configured - if not, skip this background search
            // The main search functionality uses SearchLocation from endpoints.js which works fine
            if (!API_BASE) {
                console.log("API_BASE is not configured, skipping background search");
                return;
            }

            const params = new URLSearchParams({
                location: locOverride || location,
                adults: adults.toString(),
                num: "100"
            });
            if (checkin) params.append("checkin", checkin);
            if (checkout) params.append("checkout", checkout);

            const apiUrl = `${API_BASE}/hotels.php?location=${params.toString()}`;
            console.log("Fetching from:", apiUrl);

            const res = await fetch(apiUrl)
            console.log(res, "response >>>>>");

            // Check if response is OK
            if (!res.ok) {
                const errorText = await res.text();
                console.error("HTTP error response:", errorText.substring(0, 200));
                throw new Error(`HTTP error! status: ${res.status}`);
            }

            // Read response as text first to check if it's HTML
            const responseText = await res.text();

            // Check if response is HTML (error page)
            if (responseText.trim().startsWith('<!DOCTYPE') || responseText.trim().startsWith('<html')) {
                console.error("Server returned HTML instead of JSON:", responseText.substring(0, 200));
                throw new Error("Server returned HTML error page instead of JSON");
            }

            // Try to parse as JSON
            let json;
            try {
                json = JSON.parse(responseText);
            } catch (parseError) {
                console.error("Failed to parse JSON response:", responseText.substring(0, 500));
                throw new Error(`Invalid JSON response: ${parseError.message}`);
            }

            if (!json.success) {
                throw new Error(json.message || "Failed to fetch hotels");
            }
        } catch (err) {
            console.error("doSearch error:", err);
        }
    }, [location, adults, checkin, checkout, API_BASE]);


    console.log(location, "....................>>>>>>>>>>>>>>>>>>>>>>pk");

    // Geolocation effect: Run once on mount
    useEffect(() => {
        // *****************************************************************************************************************
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                console.log(`Current location: ${latitude}, ${longitude}`);
                const cityName = await reverseGeocode(latitude, longitude);
                console.log(cityName, "....cityname");

                if (cityName) {
                    setLocation(cityName);
                    setSearchContent(cityName); // Auto-fill the search input
                    console.log(`Location resolved to: ${cityName}`);

                    await doSearch(cityName);
                } else {
                    const coordLocation = `${latitude.toFixed(2)}, ${longitude.toFixed(2)}`;
                    setLocation(coordLocation);
                    setSearchContent(coordLocation); // Fallback to coords in input
                    await doSearch(coordLocation);
                }
                setIsLoadingLocation(false);
            },
            (err) => {
                setLocation(" ");    /**************** change from nreew york  */
                setSearchContent(" ");
                doSearch(" ");
                setIsLoadingLocation(false);
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 60000,
            }
        );
    }, [reverseGeocode, doSearch]); // Dependencies: Add if needed
    // **************************************************************************************

    console.log(location, "locationnn.....");

    // ********************************************************************************************************************
    const router = useRouter();
    const searchParams = useSearchParams();
    const query = searchParams.get("query") || "";

    useEffect(() => {
        setSearchContent(query);
    }, [query]);

    const handleSearch = () => {
        if (!searchContent.trim()) return;
        router.push(`/search?query=${encodeURIComponent(searchContent)}`);
    };
    // *********************************************** dropdown >>>>>>>>>...........................
    /********************* */
    const [searchDropdown, setDropdown] = useState("")
    const [showDropdown, setShowDropdown] = useState(false);
    /********************* */
    const handleInputChange = (e) => {
        const value = e.target.value;
        setSearchContent(value);
        setShowDropdown(value.length > 0);
    };
    /********************* */
    const { data } = useQuery({
        queryKey: ["dropdown", searchContent],
        queryFn: () => Dropdown_Get(searchContent)
    })
    /********************* */
    console.log(searchContent, "....................", data?.data);
    // const { data: GetSearch_data } = useQuery({
    //     queryKey: ["getdata", cityName],
    //     queryFn: () => Get_cityName(cityName)
    // })


    return (
        <>
            <section className="Search_section pb-3  padding_bottom">
                <div className="container">
                    <div className="search_container ">
                        <div className="search_container_box  rounded-2xl pb-4 w-full">
                            <div className="search_tab ps-5 pe-5 pt-4 pb-4">
                                <div className="tab_link flex justify-between">
                                    <ul className="flex items-center gap-3 p-0">
                                        <li>
                                            <Link href={""} className="button_bg text-white">
                                                search all
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href={""}>
                                                <FaHotel /> hotels
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href={""}>
                                                <MdFlight /> flights
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href={""}>
                                                <FaCar /> Things to do
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href={""}>
                                                <GrBike /> Restaurant
                                            </Link>
                                        </li>
                                    </ul>
                                    <div className="help_info">
                                        <p className="flex items-center gap-2">
                                            <FaUser /> need some help ?
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="search_box_input d-none d-lg-block">
                                <form
                                    className="px-15 mx-auto"
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        handleSearch();
                                    }}
                                >
                                    <div className="relative search_box">
                                        <div className="absolute inset-y-0 start-0 flex items-center ps-4 pointer-events-none icon_search">
                                            <CiSearch />
                                        </div>
                                        <input
                                            type="text"
                                            // value={searchContent}
                                            onChange={handleInputChange}
                                            onFocus={() => setShowDropdown(true)}
                                            className="block w-full bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:outline-none focus:ring-0 placeholder:text-body "
                                            placeholder="Places to go, things to do, hotels..."
                                        />
                                        {/* *********************************** */}
                                        {/* Dropdown moved inside relative container so absolute positioning works */}
                                        {showDropdown && data?.data?.suggestions?.length > 0 && (
                                            <ul className="absolute left-0 right-0 z-50 mt-12 bg-white border border-default-medium rounded-base shadow-md max-h-60 overflow-auto">
                                                {data?.data?.suggestions?.map((item, index) => (
                                                    <li
                                                        key={index}
                                                        onClick={() => {
                                                            setSearchContent(item?.name);
                                                            setShowDropdown(false);
                                                            setCityName(item?.name)
                                                        }}
                                                        className="px-4 py-2 text-sm cursor-pointer hover:bg-neutral-secondary-medium"
                                                    >
                                                        <Link href={`/search?city=${item?.name}&full_address=${item?.full_address}`}>
                                                            {item?.name}</Link>
                                                    </li>

                                                ))}
                                            </ul>
                                        )}
                                        {/* *********************************** */}

                                        <button
                                            type="submit"

                                            className="absolute top-2 end-3 bg-brand hover:bg-brand-strong box-border border border-transparent shadow-xs font-medium leading-5 text-xs  focus:outline-none button_bg2 search_full_button_padding"
                                        >
                                            Search
                                        </button>
                                    </div>
                                </form>
                            </div>
                            {/* Dropdown */}

                            {/* **************************************** edning */}


                            {/* ********************************** on mobile vooiw show form  */}
                            <div className="mobile_search_box  d-block d-lg-none">
                                <div className="mobole_boxs relative">
                                    <form onSubmit={(e) => {
                                        e.preventDefault();
                                        handleSearch();
                                    }}>
                                        <input
                                            type="text"
                                            // value={location}
                                            onChange={handleInputChange}
                                            onFocus={() => setShowDropdown(true)}
                                            className="block relative w-full bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:outline-none focus:ring-0 placeholder:text-body"
                                            placeholder="Places to go, things to do, hotels..."
                                        />
                                        {showDropdown && data?.data?.suggestions?.length > 0 && (
                                            <ul className="absolute left-0 right-0 z-50 mt-12 bg-white border border-default-medium rounded-base shadow-md max-h-60 overflow-auto">
                                                {data?.data?.suggestions.map((item, index) => (
                                                    <li
                                                        key={index}
                                                        onClick={() => {
                                                            setSearchContent(item?.name);
                                                            setShowDropdown(false);
                                                            setCityName(item?.name)
                                                        }}
                                                        className="px-4 py-2 text-sm cursor-pointer hover:bg-neutral-secondary-medium"
                                                    >
                                                        {item?.name}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                        <div className="absolute start-0 flex items-center ps-4 pointer-events-none icon_search">
                                            <CiSearch />
                                        </div>
                                        <button type="submit"

                                            className="  z-10 mt-2  bg-brand hover:bg-brand-strong box-border border border-transparent shadow-xs font-medium leading-5 text-xs  focus:outline-none button_bg2 w-full w-100 ">Search</button>
                                    </form>
                                </div>


                            </div>


                        </div>
                    </div>
                </div>
            </section>
        </>


    );
}