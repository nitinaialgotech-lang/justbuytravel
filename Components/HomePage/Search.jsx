"use client";
import Link from "next/link";
import React, { useCallback, useEffect, useState, useRef, use, act } from "react";
import { FaHotel, FaUser } from "react-icons/fa";
import { MdFlight } from "react-icons/md";
import { FaCar } from "react-icons/fa6";
import { GrBike } from "react-icons/gr";
import { CiSearch } from "react-icons/ci";
import { useQuery } from "@tanstack/react-query";
import { Dropdown_Get, Get_cityName, RestaurantApi, searchHotel, SearchLocation } from "@/app/Route/endpoints";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import DestinationSection from "./DestinationSection/DestinationSection";
import RecomendSection from "./RecommendedSection/RecomendSection";
import GetOfferSection from "./GetOfferSection/GetOfferSection";
import ExperienceExploreSection from "./ExpereinceExploreSection/ExperienceExploreSection";
import Footer from "@/component/Footer";
import { FiSearch } from "react-icons/fi";
import { autoComplete, searchText } from '@/app/Route/endpoints';
import Search_flight_section from "../Book-Flights/Search_flight_section";
export default function Search() {
    // const reverseGeocode = useCallback(async (lat, lng) => {
    //     try {
    //         const response = await fetch(
    //             `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1`,
    //             {
    //                 headers: {
    //                     "User-Agent": "JustBuyTravel/1.0 (contact@justbuytravel.com)"
    //                 }
    //             }
    //         );

    //         const data = await response.json();

    //         console.log(data, "data of reverse unicode ");


    //         if (!data?.address) return null;

    //         const address = data.address;

    //         const city =
    //             address.city ||
    //             address.town ||
    //             address.village ||
    //             address.suburb ||
    //             address.neighbourhood ||
    //             address.borough ||
    //             address.municipality ||
    //             address.county ||
    //             address.state;

    //         return city || null;
    //     } catch (error) {
    //         console.error("Reverse geocoding error:", error);
    //         return null;
    //     }
    // }, []);
    // **********************************
    // ***************************************************************************************
    // const doSearch = useCallback(async (locOverride) => {
    //     try {
    //         if (!API_BASE) {
    //             console.log("API_BASE is not configured, skipping background search");
    //             return;
    //         }

    //         const params = new URLSearchParams({
    //             location: locOverride || location,
    //             adults: adults.toString(),
    //             num: "100"
    //         });
    //         if (checkin) params.append("checkin", checkin);
    //         if (checkout) params.append("checkout", checkout);

    //         const apiUrl = `${API_BASE}/hotels.php?location=${params.toString()}`;
    //         console.log("Fetching from:", apiUrl);

    //         const res = await fetch(apiUrl)
    //         console.log(res, "response >>>>>");

    //         // Check if response is OK
    //         if (!res.ok) {
    //             const errorText = await res.text();
    //             console.error("HTTP error response:", errorText.substring(0, 200));
    //             throw new Error(`HTTP error! status: ${res.status}`);
    //         }

    //         // Read response as text first to check if it's HTML
    //         const responseText = await res.text();

    //         // Check if response is HTML (error page)
    //         if (responseText.trim().startsWith('<!DOCTYPE') || responseText.trim().startsWith('<html')) {
    //             console.error("Server returned HTML instead of JSON:", responseText.substring(0, 200));
    //             throw new Error("Server returned HTML error page instead of JSON");
    //         }

    //         // Try to parse as JSON
    //         let json;
    //         try {
    //             json = JSON.parse(responseText);
    //         } catch (parseError) {
    //             console.error("Failed to parse JSON response:", responseText.substring(0, 500));
    //             throw new Error(`Invalid JSON response: ${parseError.message}`);
    //         }

    //         if (!json.success) {
    //             throw new Error(json.message || "Failed to fetch hotels");
    //         }
    //     } catch (err) {
    //         console.error("doSearch error:", err);
    //     }
    // }, [location, adults, checkin, checkout, API_BASE]);
    // Geolocation effect: Run once on mount
    // useEffect(() => {
    //     // *****************************************************************************************************************
    //     navigator.geolocation.getCurrentPosition(
    //         async (position) => {
    //             const { latitude, longitude } = position.coords;
    //             console.log(`Current location: ${latitude}, ${longitude}`);
    //             const cityName = await reverseGeocode(latitude, longitude);
    //             console.log(cityName, "....cityname");

    //             if (cityName) {
    //                 setLocation(cityName);
    //                 setSearchContent(cityName); // Auto-fill the search input
    //                 console.log(`Location resolved to: ${cityName}`);

    //                 await doSearch(cityName);
    //             } else {
    //                 const coordLocation = `${latitude.toFixed(2)}, ${longitude.toFixed(2)}`;
    //                 setLocation(coordLocation);
    //                 setSearchContent(coordLocation); // Fallback to coords in input
    //                 await doSearch(coordLocation);
    //             }
    //             setIsLoadingLocation(false);
    //         },
    //         (err) => {
    //             setLocation(" ");    /**************** change from nreew york  */
    //             setSearchContent(" ");
    //             doSearch(" ");
    //             setIsLoadingLocation(false);
    //         },
    //         {
    //             enableHighAccuracy: true,
    //             timeout: 10000,
    //             maximumAge: 60000,
    //         }
    //     );
    // }, [reverseGeocode, doSearch]); 
    // **************************************************************************************
    // ********************************************************************************************************************
    const router = useRouter();
    const searchParams = useSearchParams();
    const query = searchParams.get("query") || "";
    useEffect(() => {
        setSearchContent(query);
    }, [query]);

    const route = useRouter();
    // const handleSearch = () => {
    //     if (!searchContent.trim()) return;
    //     router.push(`/search?query=${encodeURIComponent(searchContent)}`);
    // };
    // *********************************************** dropdown >>>>>>>>>...........................



    /*********************xxxxxxxxxxxxxxxxxxxxxxxx  search or hotels button**************************  */
    const [searchAll, setSearchAll] = useState(true);
    const [activeTab, setActiveTab] = useState("all");
    const [searchType, setSearchType] = useState("all");
    const [searchUserType, setSearchUserType] = useState("");
    const pathname = usePathname();

    // ********************************

    useEffect(() => {
        if (typeof window === "undefined") return;
        const stored = window.localStorage.getItem("searchType");
        if (stored) {
            setSearchType(stored);
        }
    }, []);

    useEffect(() => {
        if (pathname == "/") {
            setActiveTab("all");
            setSearchAll(true);
            setContenttext("place to go, things to do, hotels...");
            setSearchType("all");
            if (typeof window !== "undefined") {
                window.localStorage.setItem("searchType", "all");
            }
        }

        else if (pathname == "/book-flights/") {
            setActiveTab("flights");
            setSearchAll(false);
            setContenttext("Flight, Travel ..");
            setSearchType("flights");
            if (typeof window !== "undefined") {
                window.localStorage.setItem("searchType", "flights");
            }
        }

        else if (pathname == "/book-hotels/") {
            setActiveTab("hotels");
            setSearchAll(false);
            setContenttext("hotel name or destination");
            setSearchType("hotels");
            if (typeof window !== "undefined") {
                window.localStorage.setItem("searchType", "hotels");
            }
        }

        // else if (pathname == "/book-packages/") {
        //     setActiveTab("Packages");
        //     setSearchAll(false);
        //     setContenttext("attraction, activity or destination");
        //     setSearchType("Packages");
        //     if (typeof window !== "undefined") {
        //         window.localStorage.setItem("searchType", "Packages");
        //     }
        // }
    }, [pathname]);



    /********************* *********************************************************************************/

    /*********************xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx */
    const [searchContent, setSearchContent] = useState("");
    const [textContent, setContenttext] = useState("");
    const [showDropdown, setShowDropdown] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [imageErrors, setImageErrors] = useState({});
    const [imageLoading, setImageLoading] = useState({});
    const dropdownRef = useRef(null);
    const inputRef = useRef(null);

    // Helper function to get photo URL from Google Places API response
    const getPhotoUrl = (place) => {
        if (!place?.photos || place.photos.length === 0) {
            return null;
        }

        const photo = place.photos[0];

        // Try different possible paths for photo URL
        // 1. Direct URI field
        if (photo.uri) {
            return photo.uri;
        }

        // 2. Direct URL field
        if (photo.url) {
            return photo.url;
        }

        // 3. Check authorAttributions for photoUri (some API versions)
        if (photo.authorAttributions && photo.authorAttributions.length > 0) {
            if (photo.authorAttributions[0].photoUri) {
                return photo.authorAttributions[0].photoUri;
            }
        }

        // 4. If photo has name, we need to construct URL via backend
        // For Google Places API v1, photo.name needs to be converted to URL
        // This should be handled by backend, but if name exists, return null to use placeholder
        if (photo.name) {
            // You might want to create a backend endpoint like: /photo.php?name={photo.name}
            // For now, return null to show placeholder
            return null;
        }

        return null;
    };

    // Handle image load start
    const handleImageLoadStart = (placeId) => {
        setImageLoading(prev => ({ ...prev, [placeId]: true }));
    };

    // Handle image load success
    const handleImageLoad = (placeId) => {
        setImageLoading(prev => ({ ...prev, [placeId]: false }));
        setImageErrors(prev => {
            const newErrors = { ...prev };
            delete newErrors[placeId];
            return newErrors;
        });
    };

    // Handle image load error
    const handleImageError = (placeId, e) => {
        setImageLoading(prev => ({ ...prev, [placeId]: false }));
        setImageErrors(prev => ({ ...prev, [placeId]: true }));
        e.target.src = 'https://via.placeholder.com/120x120/f3f4f6/9ca3af?text=Hotel';
        e.target.onerror = null; // Prevent infinite loop
    };

    // Fetch autocomplete results
    const { data: autoCompleteData, isLoading } = useQuery({
        queryKey: ["autoComplete", searchContent, searchAll],
        queryFn: () => {
            if (searchUserType === "searchall" && activeTab === "all") {
                searchText(searchContent)
            }
            else if (searchUserType === "hotel" && activeTab === "hotels") {
                searchHotel(searchContent)
            }
            else if (searchUserType === "restaurant" && activeTab === "restaurants") {
                RestaurantApi()
            }

        },

        enabled: searchContent.length > 0,
        staleTime: 30000, // Cache for 30 seconds
    });

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target) &&
                inputRef.current &&
                !inputRef.current.contains(event.target)
            ) {
                setShowDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Show dropdown when there are results
    useEffect(() => {
        const places = autoCompleteData?.data?.places || [];
        if (places.length > 0 && searchContent.length > 0) {
            setShowDropdown(true);
        } else {
            setShowDropdown(false);
        }
    }, [autoCompleteData, searchContent]);

    const handleInputChange = (e) => {
        const value = e.target.value;
        setSearchContent(value);
        setShowDropdown(value.length > 0);
        setSelectedIndex(-1);
    };

    const handleSelectPlace = (place) => {

        setSearchContent(place.displayName?.text || place.formattedAddress || "");
        setShowDropdown(false);
        const lat =
            place?.location?.latitude || " "

        const long =
            place?.location?.longitude || " "
        const id = place?.id
        // You can add navigation or search logic here
        // ************************************** searching hortel or search alll
        if (searchAll) {

            viewSearchAll(lat, long)
        }
        else {
            ViewHotels(id)
        }
    };




    const handleKeyDown = (e) => {

        const places = autoCompleteData?.data?.places || autoCompleteData?.places || [];

        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setSelectedIndex((prev) =>
                prev < places.length - 1 ? prev + 1 : prev
            );
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        } else if (e.key === 'Enter' && selectedIndex >= 0) {
            e.preventDefault();
            // handleSelectPlace(places[selectedIndex])


        } else if (e.key === 'Escape') {
            setShowDropdown(false);
        }
    };

    // Extract places from response - handle both direct response and nested data
    const places = autoCompleteData?.data?.places || autoCompleteData?.places || [];
    const cityName = places?.map((item) => item?.displayName?.text)
    // (**************************** mrouter )

    const viewSearchAll = (lat, long) => {
        route?.push(`/search?lat=${lat}&long=${long}&name=${cityName}`)
    }
    // **************************** hotel search

    const ViewHotels = (id) => {
        router.push(`/hoteldetail?hotel=${id}`);
    }

    return (
        <>
            <section className="Search_section padding_bottom">
                <div className="container">
                    <div className="search_container ">
                        <div className="search_container_box  rounded-2xl  w-full">
                            <div className="search_tab">
                                <div className="tab_link flex justify-between items-center">
                                    <ul className="flex items-center p-0">
                                        <li>
                                            <Link href={"/"} className={`${activeTab === "all" ? "g_color" : ""} cursor-pointer`} onClick={(e) => { setSearchAll(true); }}>
                                                <span> <FiSearch /></span> <span>search all</span>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href={"/book-flights"} className={`${activeTab === "flights" ? "g_color" : ""} cursor-pointer`} >
                                                <img className='icon_link' src="/justbuytravel_next/demo/header_icon/icon_flight.webp" alt="" /> flights
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href={"/book-hotels"} className={`${activeTab === "hotels" ? "g_color" : ""} cursor-pointer`} onClick={(e) => { setSearchAll(false); }}>
                                                <img className='icon_link' src="/justbuytravel_next/demo/header_icon/icon_hotel.webp" alt="" /> hotels
                                            </Link>
                                        </li>
                                        {/* 
                                        <li>
                                            <Link href={"/book-packages"} className={`${activeTab === "Packages" ? "g_color" : ""} cursor-pointer`} >
                                                <img className='icon_link' src="/justbuytravel_next/demo/header_icon/package-1.webp" alt="" /> Packages
                                            </Link>
                                        </li> */}
                                        <li>
                                            <Link href={""}>
                                                <img src="/justbuytravel_next/demo/header_icon/restaurant_icon.svg" alt="" /> Restaurants
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
                            {/* ********************* search input xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx */}

                            <div className="search_box_input d-none d-lg-block">

                                {
                                    searchType === "flights" ? (
                                        <Search_flight_section />
                                    ) : (
                                        <>
                                            <form
                                                className="mx-auto"
                                                onSubmit={(e) => {

                                                    const trimmed = searchContent.trim();
                                                    if (trimmed.length === 0) return;
                                                    // Add your search navigation logic here
                                                }}
                                            >
                                                <div className="relative search_box">
                                                    <div className="absolute inset-y-0 start-0 flex items-center ps-4 pointer-events-none icon_search">
                                                        <CiSearch />
                                                    </div>
                                                    <input
                                                        ref={inputRef}
                                                        type="text"
                                                        value={searchContent}
                                                        onChange={handleInputChange}
                                                        onKeyDown={handleKeyDown}
                                                        onFocus={() => {
                                                            if (places.length > 0) setShowDropdown(true);
                                                        }}
                                                        className="block w-full bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:outline-none focus:ring-0 placeholder:text-body ps-12 capitalize"
                                                        placeholder={textContent || "Search for places, hotels, activities..."}
                                                    />
                                                    <button
                                                        type="submit"
                                                        className="absolute top-2 end-3 bg-brand hover:bg-brand-strong box-border border border-transparent shadow-xs font-medium leading-5 text-xs focus:outline-none button_bg2 text-white rounded search_full_button_padding "
                                                    >
                                                        Search
                                                    </button>

                                                    {/* ********************************* seachinf dropdown xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx */}
                                                    {/* Autocomplete Dropdown */}
                                                    {showDropdown && (
                                                        <div
                                                            ref={dropdownRef}
                                                            className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-xl max-h-96 overflow-y-auto"
                                                        >
                                                            {isLoading ? (
                                                                <div className="px-4 py-6 text-center text-gray-500 text-sm">
                                                                    <div className="inline-block animate-spin rounded-full h-5 w-5 border-b-2 border-gray-900 mr-2"></div>
                                                                    Loading hotels...
                                                                </div>
                                                            ) : places.length > 0 ? (
                                                                places.map((place, index) => {
                                                                    const placeId = place.id || `place-${index}`;

                                                                    const photoUrl = getPhotoUrl(place);
                                                                    const hasImageError = imageErrors[placeId];
                                                                    const displayImage = photoUrl && !hasImageError ? photoUrl : 'https://via.placeholder.com/120x120/f3f4f6/9ca3af?text=Hotel';
                                                                    const image = place?.photos?.slice(0, 1)?.map((item) => item?.name);



                                                                    return (
                                                                        <div
                                                                            key={placeId}
                                                                            // onClick={() => handleSelectPlace(place)}
                                                                            onMouseEnter={() => setSelectedIndex(index)}
                                                                            onMouseDown={(e) => {
                                                                                e.preventDefault();
                                                                                handleSelectPlace(place);
                                                                            }}
                                                                            className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-all duration-200 ${selectedIndex === index
                                                                                ? 'bg-blue-50 border-l-4 border-blue-500'
                                                                                : 'hover:bg-gray-50 border-l-4 border-transparent'
                                                                                }`}
                                                                        >
                                                                            {/* Hotel Image */}
                                                                            <div className="flex-shrink-0">
                                                                                <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center relative">
                                                                                    {imageLoading[placeId] && (
                                                                                        <div className="absolute inset-0 flex items-center justify-center">
                                                                                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
                                                                                        </div>
                                                                                    )}
                                                                                    <img
                                                                                        src={`https://justbuygear.com/justbuytravel-api/get-photo.php?name=${image}`}
                                                                                        alt={place.displayName?.text || 'Hotel'}
                                                                                        className={`w-full h-full object-cover transition-opacity duration-200 ${imageLoading[placeId] ? 'opacity-0' : 'opacity-100'
                                                                                            }`}
                                                                                        onLoadStart={() => handleImageLoadStart(placeId)}
                                                                                        onLoad={() => handleImageLoad(placeId)}
                                                                                        onError={(e) => handleImageError(placeId, e)}
                                                                                        loading="lazy"

                                                                                    />
                                                                                </div>
                                                                            </div>

                                                                            {/* Hotel Info */}

                                                                            <div className="flex-1 min-w-0" >
                                                                                <div className="font-semibold text-gray-900 text-sm mb-1 truncate" >
                                                                                    {place.displayName?.text || 'Hotel'}
                                                                                </div>
                                                                                {place.formattedAddress && (
                                                                                    <div className="text-gray-600 text-xs mb-2 line-clamp-1">
                                                                                        {place.formattedAddress}
                                                                                    </div>
                                                                                )}
                                                                                {place.rating && (
                                                                                    <div className="flex items-center gap-2">
                                                                                        <div className="flex items-center gap-1">
                                                                                            <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                                                                                                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                                                                                            </svg>
                                                                                            <span className="text-gray-800 text-xs font-medium">
                                                                                                {place.rating.toFixed(1)}
                                                                                            </span>
                                                                                        </div>
                                                                                        {place.userRatingCount && (
                                                                                            <span className="text-gray-500 text-xs">
                                                                                                ({place.userRatingCount.toLocaleString()} reviews)
                                                                                            </span>
                                                                                        )}
                                                                                        {place.priceLevel !== undefined && (
                                                                                            <span className="text-gray-500 text-xs ml-2">
                                                                                                {place.priceLevel === 0 ? 'Free' : '$'.repeat(place.priceLevel)}
                                                                                            </span>
                                                                                        )}
                                                                                    </div>
                                                                                )}
                                                                            </div>

                                                                            {/* Arrow Icon */}
                                                                            <div className="flex-shrink-0">
                                                                                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                                                </svg>
                                                                            </div>
                                                                        </div>
                                                                    );
                                                                })
                                                            ) : searchContent.length > 0 ? (
                                                                <div className="px-4 py-6 text-center text-gray-500 text-sm">
                                                                    <svg className="w-12 h-12 mx-auto mb-2 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                                    </svg>
                                                                    No hotels found for "{searchContent}"
                                                                </div>
                                                            ) : null}
                                                        </div>
                                                    )}
                                                </div>
                                            </form>
                                        </>
                                    )
                                }

                            </div>








                            {/* **************************************** edning */}

                            {/*xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx **********************************xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx on mobile vooiw show form  */}
                            <div className="mobile_search_box  d-block d-lg-none">
                                <div className="mobole_boxs relative">
                                    <form onSubmit={(e) => {
                                        e.preventDefault();
                                        const trimmed = searchContent.trim();
                                        if (trimmed.length === 0) return;
                                        // Add your search navigation logic here
                                    }}>
                                        <input
                                            type="text"
                                            ref={inputRef}

                                            value={searchContent}
                                            onChange={handleInputChange}
                                            onKeyDown={handleKeyDown}
                                            onFocus={() => {
                                                if (places.length > 0) setShowDropdown(true);
                                            }}
                                            className="block relative w-full bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:outline-none focus:ring-0 placeholder:text-body"
                                            placeholder="Places to go, things to do, hotels..."
                                        />

                                        {/* **************** */}
                                        {showDropdown && (
                                            <div
                                                ref={dropdownRef}
                                                className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-xl max-h-96 overflow-y-auto"
                                            >
                                                {isLoading ? (
                                                    <div className="px-4 py-6 text-center text-gray-500 text-sm">
                                                        <div className="inline-block animate-spin rounded-full h-5 w-5 border-b-2 border-gray-900 mr-2"></div>
                                                        Loading hotels...
                                                    </div>
                                                ) : places.length > 0 ? (
                                                    places.map((place, index) => {
                                                        const placeId = place.id || `place-${index}`;

                                                        const photoUrl = getPhotoUrl(place);
                                                        const hasImageError = imageErrors[placeId];
                                                        const displayImage = photoUrl && !hasImageError ? photoUrl : 'https://via.placeholder.com/120x120/f3f4f6/9ca3af?text=Hotel';
                                                        const image = place?.photos?.slice(0, 1)?.map((item) => item?.name);



                                                        return (
                                                            <div
                                                                key={placeId}
                                                                onClick={() => handleSelectPlace(place)}
                                                                onMouseEnter={() => setSelectedIndex(index)}
                                                                className={`flex items-center gap-3 px-3 py-2 cursor-pointer transition-all duration-200 ${selectedIndex === index
                                                                    ? 'bg-blue-50 border-l-4 border-blue-500'
                                                                    : 'hover:bg-gray-50 border-l-4 border-transparent '
                                                                    }`}
                                                            >
                                                                {/* Hotel Image */}
                                                                <div className="flex-shrink-0">
                                                                    <div className="w-15 h-15 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center relative">
                                                                        {imageLoading[placeId] && (
                                                                            <div className="absolute inset-0 flex items-center justify-center">
                                                                                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
                                                                            </div>
                                                                        )}
                                                                        <img
                                                                            src={`https://justbuygear.com/justbuytravel-api/get-photo.php?name=${image}`}
                                                                            alt={place.displayName?.text || 'Hotel'}
                                                                            className={`w-full h-full object-cover transition-opacity duration-200 ${imageLoading[placeId] ? 'opacity-0' : 'opacity-100'
                                                                                }`}

                                                                            onLoadStart={() => handleImageLoadStart(placeId)}
                                                                            onLoad={() => handleImageLoad(placeId)}
                                                                            onError={(e) => handleImageError(placeId, e)}
                                                                            loading="lazy"
                                                                        />
                                                                    </div>
                                                                </div>

                                                                {/* Hotel Info */}
                                                                <div className="flex-1 min-w-0">
                                                                    <div className="font-semibold text-gray-900 text-sm mb-1 truncate">
                                                                        {place.displayName?.text || 'Hotel'}
                                                                    </div>
                                                                    {place.formattedAddress && (
                                                                        <div className="text-gray-600 text-xs mb-2 line-clamp-1">
                                                                            {place.formattedAddress}
                                                                        </div>
                                                                    )}
                                                                    {place.rating && (
                                                                        <div className="flex items-center gap-2">
                                                                            <div className="flex items-center gap-1">
                                                                                <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                                                                                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                                                                                </svg>
                                                                                <span className="text-gray-800 text-xs font-medium">
                                                                                    {place.rating.toFixed(1)}
                                                                                </span>
                                                                            </div>
                                                                            {place.userRatingCount && (
                                                                                <span className="text-gray-500 text-xs">
                                                                                    ({place.userRatingCount.toLocaleString()} reviews)
                                                                                </span>
                                                                            )}
                                                                            {place.priceLevel !== undefined && (
                                                                                <span className="text-gray-500 text-xs ml-2">
                                                                                    {place.priceLevel === 0 ? 'Free' : '$'.repeat(place.priceLevel)}
                                                                                </span>
                                                                            )}
                                                                        </div>
                                                                    )}
                                                                </div>

                                                                {/* Arrow Icon */}
                                                                <div className="flex-shrink-0">
                                                                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                                    </svg>
                                                                </div>
                                                            </div>
                                                        );
                                                    })
                                                ) : searchContent.length > 0 ? (
                                                    <div className="px-4 py-6 text-center text-gray-500 text-sm">
                                                        <svg className="w-12 h-12 mx-auto mb-2 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                        </svg>
                                                        No hotels found for "{searchContent}"
                                                    </div>
                                                ) : null}
                                            </div>
                                        )}
                                        {/* *************************************************** mdropdown */}






                                        <div className="absolute start-0 flex items-center ps-4 pointer-events-none icon_search">
                                            <CiSearch />
                                        </div>
                                        <button type="submit"

                                            className="  z-10 mt-2  bg-brand hover:bg-brand-strong box-border border border-transparent shadow-xs font-medium leading-5 text-xs  focus:outline-none button_bg2 w-full w-100  search_padding ">Search</button>
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