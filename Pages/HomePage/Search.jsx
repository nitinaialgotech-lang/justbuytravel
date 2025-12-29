"use client";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import { FaHotel, FaUser } from "react-icons/fa";
import { MdFlight } from "react-icons/md";
import { FaCar } from "react-icons/fa6";
import { GrBike } from "react-icons/gr";
import { CiSearch } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { searching, Setactive } from "@/app/Redux/Reducer";
import { useQuery } from "@tanstack/react-query";
import { SearchLocation } from "@/app/Route/endpoints";
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
    const [searchContent, setSearchContent] = useState(""); // For the search input
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

    // ***************************************************************************************
    const doSearch = useCallback(async (locOverride) => {
        try {
            const params = new URLSearchParams({
                location: locOverride || location,
                adults: adults.toString(),
                num: "100"
            });
            if (checkin) params.append("checkin", checkin);
            if (checkout) params.append("checkout", checkout);
            const res = await fetch(`${API_BASE}/api/hotels/search?${params.toString()}`)
            const json = await res.json();
            if (!json.success) {
                throw new Error(json.message || "Failed to fetch hotels");
            }
        } catch (err) {
            console.error("doSearch error:", err);
        }
    }, [location, adults, checkin, checkout, API_BASE]);

    // Geolocation effect: Run once on mount
    useEffect(() => {
        // Check localStorage for a cached location first
        const cachedLocation = localStorage.getItem("search");
        if (cachedLocation) {
            setSearchContent(cachedLocation); // Pre-fill input with cached value
            setLocation(cachedLocation);

        }
        // *****************************************************************************************************************
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                console.log(`Current location: ${latitude}, ${longitude}`);
                const cityName = await reverseGeocode(latitude, longitude);
                if (cityName) {
                    setLocation(cityName);
                    setSearchContent(cityName); // Auto-fill the search input
                    console.log(`Location resolved to: ${cityName}`);
                    localStorage.setItem("search", cityName);

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
                setLocation("New York");
                setSearchContent("New York");
                doSearch("New York");
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

    return (
        <>
            <section className="Search_section pb-[70px] md:pb-[20px]  sm:pb-[20px] xs:pb-[20px] md-pb">
                <div className="container">
                    <div className="search_container">
                        <div className="search_container_box bg-white rounded-2xl pb-4 w-full">
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
                                            onChange={(e) => setSearchContent(e.target.value)}
                                            className="block w-full bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:outline-none focus:ring-0 placeholder:text-body"
                                            placeholder="Places to go, things to do, hotels..."
                                        />
                                        <button
                                            type="submit"

                                            className="absolute top-2 end-3 bg-brand hover:bg-brand-strong box-border border border-transparent shadow-xs font-medium leading-5 text-xs px-3 focus:outline-none button_bg2"
                                        >
                                            Search
                                        </button>
                                    </div>
                                </form>
                            </div>



                            {/* ********************************** on mobile vooiw show form  */}
                            <div className="mobile_search_box  d-block d-lg-none">
                                <div className="mobole_boxs relative">
                                    <div className="absolute inset-y-0 start-0 flex items-center ps-4 pointer-events-none icon_search">
                                        <CiSearch />
                                    </div>
                                    <form action="">
                                        <input
                                            type="text"
                                            // value={searchContent}
                                            onChange={(e) => setSearchContent(e.target.value)}
                                            className="block w-full bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:outline-none focus:ring-0 placeholder:text-body"
                                            placeholder="Places to go, things to do, hotels..."
                                        />
                                    </form>
                                </div>

                                <button type="submit"

                                    className="  z-10 mt-2  bg-brand hover:bg-brand-strong box-border border border-transparent shadow-xs font-medium leading-5 text-xs px-3 focus:outline-none button_bg2 w-full w-100">Search</button>

                            </div>


                        </div>
                    </div>
                </div>
            </section>
        </>


    );
}