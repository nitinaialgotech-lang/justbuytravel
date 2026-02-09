"use client";
import Link from "next/link";
import React, { useEffect, useState, useRef } from "react";
import { FaHotel, FaUser } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { useQuery } from "@tanstack/react-query";
import { Dropdown_Get, Get_cityName, RestaurantApi, searchHotel, SearchLocation } from "@/app/Route/endpoints";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { FiSearch } from "react-icons/fi";
import { autoComplete, searchText } from '@/app/Route/endpoints';
import Search_flight_section from "../Book-Flights/Search_flight_section";
import HotelIcon, { FlightIcon } from "@/component/icons";
import { MdOutlineRestaurantMenu } from "react-icons/md";
import { useDispatch } from "react-redux";
import { nameCity, setLat, setLong, SetSelectAll } from "../Redux/Reducer";
import { getPlacePhotoUrl } from "@/app/utils/assetPath";
import { createHotelSlug } from "@/app/utils/seo";
export default function Search() {

    // **************************************************************************************
    // ********************************************************************************************************************
    const router = useRouter();
    const pathname = usePathname();
    const isBookFlightsPage = pathname?.includes("flights") ?? false;
    const isBookHotelsPage = pathname?.includes("hotels") ?? false;
    const searchParams = useSearchParams();
    const query = searchParams.get("query") || "";
    const [showDropdown, setShowDropdown] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [imageErrors, setImageErrors] = useState({});
    const [imageLoading, setImageLoading] = useState({});
    const dropdownRef = useRef(null);
    const inputRef = useRef(null);
    const [searchAll, setSearchAll] = useState(!isBookHotelsPage);
    const [searchType, setSearchType] = useState(isBookHotelsPage ? "hotels" : "all");
    const [searchContent, setSearchContent] = useState("");
    const [activeTab, setActiveTab] = useState(isBookHotelsPage ? "hotels" : "all");
    const [textContent, setContenttext] = useState(isBookHotelsPage ? "Search hotels by name or city" : "");
    const dispatch = useDispatch();
    useEffect(() => {
        setSearchContent(query);
    }, [query]);
    //    ******************************************* on crefresh local value change // 
    const reset = () => {
        setActiveTab("all");
        setSearchType("all");
        setSearchAll(true);
        setSearchContent("");
        setContenttext("Search places and hotels");
    }

    const route = useRouter();
    useEffect(() => {
        window.addEventListener("reset-search", reset);
        return () => window.removeEventListener("reset-search", reset);
    }, []);


    console.log(route, "............");


    // const handleSearch = () => {
    //     if (!searchContent.trim()) return;
    //     router.push(`/search?query=${encodeURIComponent(searchContent)}`);
    // };


    // ********************************

    useEffect(() => {
        if (isBookFlightsPage) {
            setActiveTab("flights");
            setSearchAll(false);
            setSearchType("flights");
            dispatch(SetSelectAll("flights"));
        } else if (isBookHotelsPage) {
            setContenttext("Search hotels by name or city");
            setSearchType("hotels");
            setActiveTab("hotels");
            setSearchAll(false);
            dispatch(SetSelectAll("hotels"));
        }
    }, [pathname]);



    /********************* *********************************************************************************/



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
            if (searchType == "all" || activeTab == "all") {
                return searchText(searchContent)
            }
            else if (searchType == "hotels" || activeTab == "hotels") {
                return searchHotel(searchContent)
            }
            else if (searchType == "restaurants" || activeTab == "restaurants") {
                return RestaurantApi(searchContent)
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
            const name = place?.displayName?.text || place?.name || '';
            ViewHotels(id, name);
        }
    };




    const handleKeyDown = (e) => {
        const places =
            autoCompleteData?.data?.places || autoCompleteData?.places || [];

        if (e.key === "ArrowDown") {
            e.preventDefault();
            setSelectedIndex((prev) =>
                prev < places.length - 1 ? prev + 1 : prev
            );
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        }

        // else if (e.key === 'Enter' && selectedIndex >= 0) {
        //     e.preventDefault();
        //     handleSelectPlace(places[selectedIndex])
        // } 
        if (e.key === 'Enter') {
            if (selectedIndex >= 0) {
                // Select highlighted item
                e.preventDefault();
                handleSelectPlace(places[selectedIndex]);
                setShowDropdown(false);
            }
        }
        else if (e.key === 'Escape') {
            setShowDropdown(false);
        }
    };

    // Extract places from response - handle both direct response and nested data
    const places = autoCompleteData?.data?.places || autoCompleteData?.places || [];
    const cityName = places?.map((item) => item?.displayName?.text) || "undefined";
    const city_id = places?.map((item) => item?.id) || "undefined";
    // (**************************** mrouter )

    // const viewSearchAll = (lat, long) => {
    //     route?.push(`/search?lat=${lat}&long=${long}&name=${cityName}`)
    // }

    const viewSearchAll = (lat, long) => {
        dispatch(setLat(lat));
        dispatch(setLong(long));
        dispatch(nameCity(cityName));
        router.push(`/search?${cityName}-${city_id}`);
    };
    // **************************** hotel search

    const ViewHotels = (id, name) => {
        if (!id) return;
        const slug = createHotelSlug(name || '', id);
        router.push(`/${slug}`);
    };
    // *********************************

    const handleSearchTypeChange = (type) => {
        setSearchType(type);
        // localStorage.setItem("searchType", searchType);
    };


    console.log(pathname, places, "..............");



    return (
        <>
            <section className={`Search_section  ${isBookFlightsPage ? "padding_topf50 padding_b70" : "padding_bottom"} `}>
                <div className="container">
                    <div className={`${isBookHotelsPage ? 'searchhotelcontainer' : "search_container "}`}>
                        <div className="search_container_box  rounded-2xl  w-full">
                            {
                                !isBookFlightsPage && !isBookHotelsPage ? (

                                    <div className="search_tab">
                                        <div className="tab_link flex justify-between items-center">
                                            <ul className="flex items-center p-0">
                                                <li>
                                                    <Link
                                                        href={""}
                                                        className={`${activeTab == "all" ? "g_color" : ""} justify-center items-center`}
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            setActiveTab("all");
                                                            setSearchAll(true);
                                                            setContenttext("Search places and hotels");
                                                            handleSearchTypeChange("all");
                                                            dispatch(SetSelectAll("all"))


                                                        }}
                                                    >
                                                        <span>
                                                            {" "}
                                                            <FiSearch />
                                                        </span>{" "}
                                                        <span>searchAll </span>
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link
                                                        href={""}
                                                        className={`${activeTab == "flights" ? "g_color" : ""} justify-center items-center`}
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            setActiveTab("flights");
                                                            handleSearchTypeChange("flights");
                                                            dispatch(SetSelectAll("flights"))

                                                        }}
                                                    >
                                                        <span className="hover_icon">
                                                            <FlightIcon color={`${activeTab == "flights" ? "#12c081" : "#1D1F27"} `} />
                                                        </span>{" "}
                                                        <span>
                                                            flights
                                                        </span>
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link
                                                        href={""}
                                                        className={`${activeTab == "hotels" ? "g_color" : ""} justify-center items-center`}
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            setActiveTab("hotels");
                                                            setSearchAll(false);
                                                            setContenttext("Search hotels by name or city");
                                                            handleSearchTypeChange("hotels");
                                                            dispatch(SetSelectAll("hotels"))


                                                        }}
                                                    >
                                                        <span className="hover_icon">
                                                            <HotelIcon color={`${activeTab == "hotels" ? "#12c081" : "#1D1F27"} `} /></span>{" "}
                                                        <span>
                                                            hotels
                                                        </span>
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link
                                                        href={""}
                                                        className={`${activeTab === "restaurants" ? "g_color" : ""} justify-center items-center`}
                                                        onClick={(e) => {
                                                            setActiveTab("restaurants");
                                                            setSearchAll(false);
                                                            handleSearchTypeChange("restaurants");
                                                            setContenttext("Search restaurants or cuisine");
                                                            dispatch(SetSelectAll("restaurants"))
                                                        }}
                                                    >
                                                        <span>
                                                            <MdOutlineRestaurantMenu /></span>{" "}
                                                        <span>
                                                            <p className="m-0">
                                                                Restaurants
                                                            </p>
                                                        </span>
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
                                ) : " "
                            }
                            {/* ********************* search input xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx */}
                            <div className="search_box_input d-none d-lg-block">
                                {searchType === "flights" || isBookFlightsPage ? (
                                    <Search_flight_section />
                                ) : (

                                    <form
                                        className="mx-auto"
                                        onSubmit={(e) => {
                                            e.preventDefault();
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
                                                placeholder={
                                                    textContent ||
                                                    "Search places and hotels"
                                                }
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
                                                            const displayImage = getPlacePhotoUrl(place) || (photoUrl && !hasImageError ? photoUrl : 'https://via.placeholder.com/120x120/f3f4f6/9ca3af?text=Hotel');

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
                                                                                src={displayImage}
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
                                                                        <svg
                                                                            className="w-5 h-5 text-gray-400"
                                                                            fill="none"
                                                                            stroke="currentColor"
                                                                            viewBox="0 0 24 24"
                                                                        >
                                                                            <path
                                                                                strokeLinecap="round"
                                                                                strokeLinejoin="round"
                                                                                strokeWidth={2}
                                                                                d="M9 5l7 7-7 7"
                                                                            />
                                                                        </svg>
                                                                    </div>
                                                                </div>
                                                            );
                                                        })
                                                    ) : searchContent.length > 0 ? (
                                                        <div className="px-4 py-6 text-center text-gray-500 text-sm">
                                                            <svg
                                                                className="w-12 h-12 mx-auto mb-2 text-gray-300"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                viewBox="0 0 24 24"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth={2}
                                                                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                                />
                                                            </svg>
                                                            No hotels found for "{searchContent}"
                                                        </div>
                                                    ) : null}
                                                </div>
                                            )}
                                        </div>
                                    </form>

                                )}
                            </div>
                            {/* **************************************** edning */}

                            {/*xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx **********************************xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx on mobile vooiw show form  */}
                            <div className={`${searchType === "flights" || isBookFlightsPage ? "p-0" : ""}mobile_search_box  d-block d-lg-none`}>
                                {
                                    searchType === "flights" || isBookFlightsPage ? (
                                        <Search_flight_section />
                                    ) : (
                                        <div className="mobole_boxs relative">
                                            <form
                                                onSubmit={(e) => {
                                                    e.preventDefault();
                                                    const trimmed = searchContent.trim();
                                                    if (trimmed.length === 0) return;
                                                    // Add your search navigation logic here
                                                }}
                                            >
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
                                                    placeholder={textContent ||
                                                        "Search places and hotels"}
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
                                                                const displayImage = getPlacePhotoUrl(place) || (photoUrl && !hasImageError ? photoUrl : "https://via.placeholder.com/120x120/f3f4f6/9ca3af?text=Hotel");

                                                                return (
                                                                    <div
                                                                        key={placeId}
                                                                        onClick={() => handleSelectPlace(place)}
                                                                        onMouseEnter={() => setSelectedIndex(index)}
                                                                        className={`flex items-center gap-3 px-3 py-2 cursor-pointer transition-all duration-200 ${selectedIndex === index
                                                                            ? "bg-blue-50 border-l-4 border-blue-500"
                                                                            : "hover:bg-gray-50 border-l-4 border-transparent "
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
                                                                                    src={displayImage}
                                                                                    alt={place.displayName?.text || "Hotel"}
                                                                                    className={`w-full h-full object-cover transition-opacity duration-200 ${imageLoading[placeId]
                                                                                        ? "opacity-0"
                                                                                        : "opacity-100"
                                                                                        }`}
                                                                                    onLoadStart={() =>
                                                                                        handleImageLoadStart(placeId)
                                                                                    }
                                                                                    onLoad={() => handleImageLoad(placeId)}
                                                                                    onError={(e) =>
                                                                                        handleImageError(placeId, e)
                                                                                    }
                                                                                    loading="lazy"
                                                                                />
                                                                            </div>
                                                                        </div>

                                                                        {/* Hotel Info */}
                                                                        <div className="flex-1 min-w-0">
                                                                            <div className="font-semibold text-gray-900 text-sm mb-1 truncate">
                                                                                {place.displayName?.text || "Hotel"}
                                                                            </div>
                                                                            {place.formattedAddress && (
                                                                                <div className="text-gray-600 text-xs mb-2 line-clamp-1">
                                                                                    {place.formattedAddress}
                                                                                </div>
                                                                            )}
                                                                            {place.rating && (
                                                                                <div className="flex items-center gap-2">
                                                                                    <div className="flex items-center gap-1">
                                                                                        <svg
                                                                                            className="w-4 h-4 text-yellow-400 fill-current"
                                                                                            viewBox="0 0 20 20"
                                                                                        >
                                                                                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                                                                                        </svg>
                                                                                        <span className="text-gray-800 text-xs font-medium">
                                                                                            {place.rating.toFixed(1)}
                                                                                        </span>
                                                                                    </div>
                                                                                    {place.userRatingCount && (
                                                                                        <span className="text-gray-500 text-xs">
                                                                                            (
                                                                                            {place.userRatingCount.toLocaleString()}{" "}
                                                                                            reviews)
                                                                                        </span>
                                                                                    )}
                                                                                    {place.priceLevel !== undefined && (
                                                                                        <span className="text-gray-500 text-xs ml-2">
                                                                                            {place.priceLevel === 0
                                                                                                ? "Free"
                                                                                                : "$".repeat(place.priceLevel)}
                                                                                        </span>
                                                                                    )}
                                                                                </div>
                                                                            )}
                                                                        </div>

                                                                        {/* Arrow Icon */}
                                                                        <div className="flex-shrink-0">
                                                                            <svg
                                                                                className="w-5 h-5 text-gray-400"
                                                                                fill="none"
                                                                                stroke="currentColor"
                                                                                viewBox="0 0 24 24"
                                                                            >
                                                                                <path
                                                                                    strokeLinecap="round"
                                                                                    strokeLinejoin="round"
                                                                                    strokeWidth={2}
                                                                                    d="M9 5l7 7-7 7"
                                                                                />
                                                                            </svg>
                                                                        </div>
                                                                    </div>
                                                                );
                                                            })
                                                        ) : searchContent.length > 0 ? (
                                                            <div className="px-4 py-6 text-center text-gray-500 text-sm">
                                                                <svg
                                                                    className="w-12 h-12 mx-auto mb-2 text-gray-300"
                                                                    fill="none"
                                                                    stroke="currentColor"
                                                                    viewBox="0 0 24 24"
                                                                >
                                                                    <path
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        strokeWidth={2}
                                                                        d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                                    />
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
                                                <button
                                                    type="submit"
                                                    className="  z-10 mt-2  bg-brand hover:bg-brand-strong box-border border border-transparent shadow-xs font-medium leading-5 text-xs  focus:outline-none button_bg2 w-full w-100  search_padding "
                                                >
                                                    Search
                                                </button>
                                            </form>
                                        </div>
                                    )
                                }
                            </div>


                        </div>
                    </div>
                </div>
            </section >
        </>


    );
}