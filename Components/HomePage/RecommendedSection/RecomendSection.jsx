'use client';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect } from 'react'
import { FaUserAlt } from 'react-icons/fa';
import { IoTime } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import { useQuery } from '@tanstack/react-query';
import { SearchLocation } from '@/app/Route/endpoints';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { getAssetPath } from '@/app/utils/assetPath';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import Link from 'next/link';
export default function RecomendSection() {
    const [search, setSearch] = useState("");
    const [locationName, setLocationName] = useState("");
    const [locationError, setLocationError] = useState("");
    const [locationFetching, setLocationFetching] = useState(true);
    const [imageErrors, setImageErrors] = useState({});

    // Helper function to get the best available image URL
    // Priority: image_proxy > image > placeholder
    const getImageUrl = (item) => {
        // First try image_proxy (avoids CORS issues)
        if (item?.image_proxy && item.image_proxy.trim() !== '') {
            return item.image_proxy;
        }

        // Fallback to image
        if (item?.image && item.image.trim() !== '') {
            return item.image;
        }

        // If no image available, use placeholder
        return 'https://via.placeholder.com/400x300/f3f4f6/9ca3af?text=No+Image';
    };

    // Handle image load error with fallback chain
    const handleImageError = (itemId, item, e) => {
        const currentSrc = e.target.src;

        // If we tried image_proxy and it failed, try the original image
        if (currentSrc === item?.image_proxy && item?.image) {
            e.target.src = item.image;
            return;
        }

        // If both failed, show placeholder
        setImageErrors(prev => ({ ...prev, [itemId]: true }));
        e.target.src = 'https://via.placeholder.com/400x300/f3f4f6/9ca3af?text=Image+Not+Available';
        e.target.onerror = null; // Prevent infinite loop
    };

    // Get user's current location


    const reverseGeocode = async (lat, lng) => {
        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=10&addressdetails=1`,
                { headers: { "User-Agent": "JustBuyTravel/1.0" } }
            );
            const data = await response.json();
            if (data && data.address) {
                const city = data.address.city || data.address.town || data.address.village;
                if (city) return city;
                return data.address.municipality || data.address.county || "Unknown Location";
            }
            return "Unknown Location";
        } catch (error) {
            console.error("Reverse geocoding error:", error);
            return "Unknown Location";
        }
    };

    const doSearch = async (query) => {
        try {
            const results = await SearchLocation(query);
            console.log("Search results:", results);
        } catch (err) {
            console.error("Search error:", err);
        }
    };

    useEffect(() => {
        const options = { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 };

        if (typeof navigator === "undefined" || !navigator?.geolocation) {
            console.warn("Geolocation not available");
            setLocationError("Geolocation not available in this browser");
            // IP fallback
            (async () => {
                try {
                    const resp = await fetch("https://ipapi.co/json/");
                    if (resp.ok) {
                        const ipData = await resp.json();
                        const ipCity = ipData?.city;
                        if (ipCity) {
                            setSearch(ipCity + (ipData.region ? `, ${ipData.region}` : ""));
                            setLocationName(ipCity);
                        } else if (ipData?.latitude && ipData?.longitude) {
                            setSearch(`${ipData.latitude.toFixed(5)}, ${ipData.longitude.toFixed(5)}`);
                            setLocationName(`${ipData.latitude.toFixed(5)}, ${ipData.longitude.toFixed(5)}`);
                        } else {
                            setSearch("New York");
                        }
                    } else {
                        setSearch("New York");
                    }
                } catch (e) {
                    console.warn("IP fallback failed:", e.message || e);
                    setSearch("New York");
                } finally {
                    setLocationFetching(false);
                }
            })();

            return;
        }

        const success = async (position) => {
            const { latitude, longitude } = position.coords;
            console.log(`Current location: ${latitude}, ${longitude}`);

            try {
                const cityName = await reverseGeocode(latitude, longitude);
                if (cityName && cityName !== "Unknown Location") {
                    setSearch(cityName);
                    setLocationName(cityName);
                } else {
                    const coordLocation = `${latitude.toFixed(5)}, ${longitude.toFixed(5)}`;
                    setSearch(coordLocation);
                    setLocationName(coordLocation);
                }
            } catch (e) {
                console.warn("Reverse geocode failed, using coordinates", e);
                setSearch(`${latitude.toFixed(5)}, ${longitude.toFixed(5)}`);
                setLocationName(`${latitude.toFixed(5)}, ${longitude.toFixed(5)}`);
            }

            setLocationFetching(false);
        };

        const errorHandler = async (err) => {
            console.error("Geolocation error:", err);
            setLocationError(err?.message || "Geolocation error");

            // Try simple IP fallback
            try {
                const resp = await fetch("https://ipapi.co/json/");
                if (resp.ok) {
                    const ipData = await resp.json();
                    const ipCity = ipData?.city;
                    if (ipCity) {
                        setSearch(ipCity + (ipData.region ? `, ${ipData.region}` : ""));
                        setLocationName(ipCity);
                    } else if (ipData?.latitude && ipData?.longitude) {
                        setSearch(`${ipData.latitude.toFixed(5)}, ${ipData.longitude.toFixed(5)}`);
                        setLocationName(`${ipData.latitude.toFixed(5)}, ${ipData.longitude.toFixed(5)}`);
                    } else {
                        setSearch("New York");
                    }
                } else {
                    setSearch("New York");
                }
            } catch (e) {
                console.warn("IP fallback failed:", e.message || e);
                setSearch("New York");
            } finally {
                setLocationFetching(false);
            }
        };

        navigator.geolocation.getCurrentPosition(success, errorHandler, options);
    }, []);


    const { data, isLoading, error } = useQuery({
        queryKey: ["hotels", search],
        queryFn: () => SearchLocation(search),
        enabled: !!search // Only run query when search is available
    })
    const hotels = data?.hotels;
    console.log(data, ".........pkpk");

    // Debug: Log image URLs to help identify issues
    useEffect(() => {
        if (hotels) {
            hotels.forEach((hotel, index) => {
                console.log(`Hotel ${index + 1} (${hotel?.name || 'Unknown'}):`, {
                    image_proxy: hotel?.image_proxy || 'N/A',
                    image: hotel?.image || 'N/A',
                    using: getImageUrl(hotel)
                });
            });
        }
    }, [hotels]);

    console.log(hotels, "......................>>>> hotels");

    return (
        <>
            <section className='recomend_section container  padding_bottom'>
                <div className="section_title relative ">
                    <h2 className='mb-0'>
                        Recommended For You
                    </h2>
                    <h5 >
                        The best booking platform you can trust
                    </h5>

                    <div className="title_icon absolute right-5   ">
                        <img src={getAssetPath("/home/destination/icon_plane.png")} alt="Travel plane icon" />
                    </div>
                </div>
                {/* **************************** recomend carsd cord box */}

                <div className="row">
                    <Swiper
                        slidesPerView={3}
                        spaceBetween={30}
                        pagination={{
                            clickable: true,
                        }}
                        modules={[Navigation, Pagination]}
                        className="mySwiper"
                        // navigation={true}
                        // autoplay={{
                        //     delay: 3000, 
                        //     disableOnInteraction: false, 
                        // }}
                        breakpoints={{
                            320: {
                                slidesPerView: 1,
                                spaceBetween: 30

                            },
                            375: {
                                slidesPerView: 1,
                                spaceBetween: 30

                            },
                            425: {
                                slidesPerView: 1,
                                spaceBetween: 30

                            },
                            640: {
                                slidesPerView: 1, // mobile
                            },
                            768: {
                                slidesPerView: 2, // tablet
                            },
                            1024: {
                                slidesPerView: 3, // desktop (optional)
                            },
                        }}
                        loop={true}
                        id='swiper_sldie'
                    >
                        {
                            hotels?.slice(0, 6)?.map((item, i) => {
                                let titlecontent = item.name
                                if (titlecontent?.length > 3) {
                                    titlecontent += "..."
                                }
                                const itemId = item?.property_token || item?.data_id || i;
                                const imageUrl = getImageUrl(item);
                                // Get price from price_per_night or total_price
                                const price = item?.price_per_night?.extracted_price ||
                                    item?.price_per_night?.price?.replace('$', '') ||
                                    item?.total_price?.extracted_price ||
                                    item?.total_price?.price?.replace('$', '') ||
                                    '0';

                                return (

                                    <SwiperSlide key={itemId}> <div className="card_col " key={i} >
                                        {/* *********** */}
                                        <div className="recommend_card_box   card_rounded shadow margin_lr margin_md-lr ">
                                            {/* *********** */}
                                            <div className="card_box pe-">
                                                <div className="card_box_img card_rounded relative overflow-hidden" style={{ minHeight: '250px', backgroundColor: '#f3f4f6' }}>
                                                    {imageErrors[itemId] ? (
                                                        <div className="w-full h-full flex items-center justify-center bg-gray-200 card_rounded">
                                                            <span className="text-gray-400 text-sm">Image not available</span>
                                                        </div>
                                                    ) : (
                                                        <img
                                                            src={imageUrl}
                                                            className='card_rounded w-full h-full object-cover'
                                                            alt={item?.name || 'Hotel image'}
                                                            onError={(e) => handleImageError(itemId, item, e)}
                                                            onLoad={() => {
                                                                // Remove error state if image loads successfully
                                                                if (imageErrors[itemId]) {
                                                                    setImageErrors(prev => {
                                                                        const newErrors = { ...prev };
                                                                        delete newErrors[itemId];
                                                                        return newErrors;
                                                                    });
                                                                }
                                                            }}
                                                            loading="lazy"
                                                        />
                                                    )}
                                                    {/* ********************* */}
                                                    <div className="rated_msg absolute top-5 flex  justify-between items-center left-5 right-5">
                                                        <div className="msg">
                                                            <p className='m-0'>Top rated</p>
                                                        </div>
                                                        <div className="msg_icon">
                                                            <FaRegHeart />
                                                        </div>
                                                    </div>
                                                    {/* ********************* */}
                                                </div>
                                                {/* *** */}
                                                <div className="card_box_detail px-4 py-5 card_rounded flex flex-col z-1 gap-2 relative">
                                                    <h4 className='m-0 capitalize'>
                                                        {item?.name}
                                                    </h4>
                                                    {/* ****** */}
                                                    <div className="time flex items-center gap-3 relative">
                                                        <div className="icon flex items-center gap-1">
                                                            <span><IoTime /></span>
                                                            <span><p className='m-0'>2 Days 3 Nights</p></span>
                                                        </div>
                                                        <div className="guest flex items-center gap-1">
                                                            <span><FaUserAlt /></span>
                                                            <span><p className='m-0'>4 -5 guest</p></span>
                                                        </div>
                                                    </div>
                                                    {/* ******* */}
                                                    <div className="price_book flex mt-3 justify-between items-center">
                                                        <h5 className='m-0'>
                                                            ${price}.00 <span>/ person</span>
                                                        </h5>
                                                        <button className='button_bg2  rounded-full bg-color-green color_bl'>
                                                            Book Now
                                                        </button>

                                                    </div>
                                                    {/* *************** rating_list */}
                                                    <div className="rating_list absolute flex items-center gap-1 right-10 shadow">
                                                        <span className='w-5'><FontAwesomeIcon icon={faStar} /></span>
                                                        <span><p className='m-0'>{item?.rating}</p></span>
                                                        <span><p className='m-0'>({item?.reviews} reviews)</p></span>
                                                    </div>

                                                </div>
                                            </div>
                                            {/* *********** */}
                                        </div>
                                        {/* *********** */}
                                    </div>
                                    </SwiperSlide>
                                )
                            })

                        }
                    </Swiper>
                </div>
            </section>
        </>
    )
}
