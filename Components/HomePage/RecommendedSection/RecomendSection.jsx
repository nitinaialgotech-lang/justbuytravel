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
export default function RecomendSection() {
    const [search, setSearch] = useState("");
    const [locationName, setLocationName] = useState("");
    const [locationError, setLocationError] = useState("");
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
    useEffect(() => {
        const getCurrentLocation = () => {
            if (!navigator.geolocation) {
                setLocationError("Geolocation is not supported by your browser");
                // Fallback to URL params if geolocation not available
                const params = new URLSearchParams(window.location.search);
                const query = params.get("query") || "";
                setSearch(query);
                return;
            }

            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;
                    
                    try {
                        // Use reverse geocoding to get location name from coordinates
                        const response = await fetch(
                            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10&addressdetails=1`
                        );
                        const data = await response.json();
                        
                        // Extract city or location name
                        const city = data.address?.city || 
                                   data.address?.town || 
                                   data.address?.village || 
                                   data.address?.county || 
                                   data.address?.state || 
                                   data.display_name?.split(',')[0] || 
                                   "";
                        
                        if (city) {
                            setLocationName(city);
                            setSearch(city);
                        } else {
                            // Fallback to URL params if location name not found
                            const params = new URLSearchParams(window.location.search);
                            const query = params.get("query") || "";
                            setSearch(query);
                        }
                    } catch (error) {
                        console.error("Error getting location name:", error);
                        setLocationError("Could not determine location name");
                        // Fallback to URL params
                        const params = new URLSearchParams(window.location.search);
                        const query = params.get("query") || "";
                        setSearch(query);
                    }
                },
                (error) => {
                    console.error("Geolocation error:", error);
                    setLocationError("Could not get your location. Please enable location access.");
                    // Fallback to URL params if geolocation fails
                    const params = new URLSearchParams(window.location.search);
                    const query = params.get("query") || "";
                    setSearch(query);
                },
                {
                    enableHighAccuracy: true,
                    timeout: 10000,
                    maximumAge: 0
                }
            );
        };

        getCurrentLocation();
    }, []);

    const { data } = useQuery({
        queryKey: ["hotels ", search],
        queryFn: async () => await SearchLocation(search),
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

    return (
        <>
            <section className='recomend_section container  pb-20'>
                <div className="section_title relative pb-10 pt-10">
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
                        modules={[Autoplay, Navigation, Pagination]}
                        className="mySwiper"
                        // navigation={true}
                        autoplay={{
                            delay: 3000, // 3 seconds
                            disableOnInteraction: false, // continue autoplay after user interaction
                        }}
                        breakpoints={{
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
                                        <div className="recommend_card_box   rounded-3xl shadow margin_lr ">
                                            {/* *********** */}
                                            <div className="card_box pe-">
                                                <div className="card_box_img rounded-3xl relative overflow-hidden" style={{ minHeight: '250px', backgroundColor: '#f3f4f6' }}>
                                                    {imageErrors[itemId] ? (
                                                        <div className="w-full h-full flex items-center justify-center bg-gray-200 rounded-3xl">
                                                            <span className="text-gray-400 text-sm">Image not available</span>
                                                        </div>
                                                    ) : (
                                                        <img 
                                                            src={imageUrl} 
                                                            className='rounded-3xl w-full h-full object-cover' 
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
                                                <div className="card_box_detail px-4 py-5 rounded-4xl flex flex-col z-1 gap-2 relative">
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
                                                        <button className='rounded-full'>
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
