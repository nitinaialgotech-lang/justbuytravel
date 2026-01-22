"use client";
import { IconicPlaces, nearbyPlaces, Restro } from "@/app/Route/endpoints";
import { useQuery } from "@tanstack/react-query";
import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { getAssetPath } from "@/app/utils/assetPath";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { FaRegHeart } from "react-icons/fa";
import { IoStar } from "react-icons/io5";
import { IoStarHalf } from "react-icons/io5";
import { IoStarOutline } from "react-icons/io5";
import {
    MdOutlineKeyboardArrowLeft,
    MdOutlineKeyboardArrowRight,
} from "react-icons/md";
// import required modules
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import ExpediaBanner from "./Banner";
export default function ExperienceExploreSection() {
    const fallbackIconicCards = [
        {
            img: "/justbuytravel_next/demo/iconic/iconic.jpg",
            content: "Half-Day Railway Market and Floating Market Tour in Thailand",
        },
        {
            img: "/justbuytravel_next/demo/iconic/iconic4.jpg",
            content: "Half-Day Railway Market and Floating Market Tour in Thailand",
        },
        {
            img: "/justbuytravel_next/demo/iconic/iconic6.jpg",
            content: "Half-Day Railway Market and Floating Market Tour in Thailand",
        },
        {
            img: "/justbuytravel_next/demo/iconic/iconic7.jpg",
            content: "Half-Day Railway Market and Floating Market Tour in Thailand",
        },
    ];

    const NearCard = [
        {
            img: "/justbuytravel_next/demo/near/near.jpg",
            content: "Half-Day Railway Market and Floating Market Tour in Thailand",
            info: (
                <>
                    Price Start From <span>₹4500</span>
                </>
            ),
            star: [
                <IoStar />,
                <IoStar />,
                <IoStar />,
                <IoStarHalf />,
                <IoStarOutline />,
            ],
        },
        {
            img: "/justbuytravel_next/demo/near/near1.jpg",
            content: "Half-Day Railway Market and Floating Market Tour in Thailand",
            info: (
                <>
                    Price Start From <span>₹4500</span>
                </>
            ),
            star: [
                <IoStar />,
                <IoStar />,
                <IoStar />,
                <IoStarHalf />,
                <IoStarOutline />,
            ],
        },
        {
            img: "/justbuytravel_next/demo/near/near2.jpg",
            content: "Half-Day Railway Market and Floating Market Tour in Thailand",
            info: (
                <>
                    Price Start From <span>₹4500</span>
                </>
            ),
            star: [
                <IoStar />,
                <IoStar />,
                <IoStar />,
                <IoStarHalf />,
                <IoStarOutline />,
            ],
        },
        {
            img: "/justbuytravel_next/demo/near/near3.jpg",
            content: "Half-Day Railway Market and Floating Market Tour in Thailand",
            info: (
                <>
                    Price Start From <span>₹4500</span>
                </>
            ),
            star: [
                <IoStar />,
                <IoStar />,
                <IoStar />,
                <IoStarHalf />,
                <IoStarOutline />,
            ],
        },
    ];

    const [isBeginning, setIsBeginning] = useState(true);
    const [secondActive, setSecondActive] = useState(true);
    const [nearbyActive, setNearbyActive] = useState(true);
    const [coords, setCoords] = useState({ lat: null, lng: null });
    const [locationError, setLocationError] = useState(null);

    useEffect(() => {
        if (typeof window === "undefined" || !navigator?.geolocation) {
            setLocationError("Geolocation is not supported");
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (pos) => {
                setCoords({
                    lat: pos.coords.latitude,
                    lng: pos.coords.longitude,
                });
            },
            (err) => {
                console.error("Geolocation error", err);
                setLocationError(err.message || "Unable to fetch location");
            }
        );
    }, []);

    // Helper to render Bootstrap-style star rating icons from numeric rating
    const renderBootstrapStars = (rating) => {
        const stars = [];
        const value = Number(rating) || 0;
        const maxStars = 5;
        const fullStars = Math.floor(value);
        const hasHalfStar = value - fullStars >= 0.5;

        for (let i = 0; i < Math.min(fullStars, maxStars); i++) {
            stars.push(<i key={`full-${i}`} className="bi bi-star-fill"></i>);
        }

        if (hasHalfStar && stars.length < maxStars) {
            stars.push(<i key="half" className="bi bi-star-half"></i>);
        }

        while (stars.length < maxStars) {
            stars.push(<i key={`empty-${stars.length}`} className="bi bi-star"></i>);
        }

        return stars;
    };
    /***********************xxxxxxxxxxx................ nearby placess api  */
    const { data: nearbyRestaurantsData } = useQuery({
        queryKey: ["restaurantsNearby", coords.lat, coords.lng],
        queryFn: () => Restro(coords.lat, coords.lng),
        enabled: coords.lat !== null && coords.lng !== null,
    });
    const nearbyPlaceslist = nearbyRestaurantsData?.data?.places ?? [];
    // ************************************* iconic places apis 
    const { data: iconicPlacesData } = useQuery({
        queryKey: ["iconicPlacesNearby", coords.lat, coords.lng],
        queryFn: () => IconicPlaces(coords.lat, coords.lng),
        enabled: coords.lat !== null && coords.lng !== null,
    });
    const iconicPlacesList = iconicPlacesData?.data?.places ?? [];

    return (
        <>
            <section className="experience_explore_section padding_bottom">
                <div className="container">
                    <div className="row">
                        <div className="explore_section section_title m">
                            <h2 className="mb-0">Near By Loactions</h2>
                            <h5>Explore nearby destinations and hidden gems</h5>
                        </div>
                    </div>

                    {/*8888888888888888888888888888888888888888888888888888888888888888888888888xxxxxxxx======================************************************************** mobile view display
           */}
                    <div className="container relative">
                        <div className="row ">
                            <Swiper
                                slidesPerView={3}
                                spaceBetween={15}
                                // pagination={{ clickable: true }}
                                navigation={{
                                    prevEl: "#custom_prev",
                                    nextEl: "#custom_next",
                                }}
                                loop={true}
                                // autoplay={{
                                //     delay: 3100,
                                //     disableOnInteraction: false,
                                // }}
                                modules={[Pagination, Navigation]}
                                onSwiper={(swiper) => setIsBeginning(swiper.isBeginning)}
                                onSlideChange={(swiper) => setIsBeginning(swiper.isBeginning)}
                                breakpoints={{
                                    320: {
                                        slidesPerView: 1.5,
                                        spaceBetween: 15,
                                    },
                                    375: {
                                        slidesPerView: 1.5,
                                        spaceBetween: 15,
                                    },
                                    425: {
                                        slidesPerView: 1.5,
                                        spaceBetween: 15,
                                    },
                                    640: {
                                        slidesPerView: 1, // mobile
                                        spaceBetween: 20,
                                    },
                                    768: {
                                        slidesPerView: 2, // tablet
                                        spaceBetween: 20,
                                    },
                                    1024: {
                                        slidesPerView: 4, // desktop (optional)
                                        spaceBetween: 20,
                                    },
                                }}
                                className="mySwiper relative"
                            >
                                {nearbyPlaceslist?.map((item, i) => {
                                    return (
                                        <SwiperSlide key={i}>
                                            <div className="experience_explore_section">
                                                <div className="card relative border-0">
                                                    <img
                                                        src={
                                                            item?.photos?.[0]?.name
                                                                ? `https://justbuygear.com/justbuytravel-api/get-photo.php?name=${item.photos[0].name}`
                                                                : "/no-image.jpg"
                                                        }
                                                        className="card-img-top card_rounded"
                                                        alt="Place"
                                                    />
                                                    <div className="card-body ps-0 flex justify-between">
                                                        <div className="card_detail">
                                                            <h5 className="card-title m-0">
                                                                {item?.displayName?.text}
                                                            </h5>
                                                            <div className="rating flex align-items-center gap-1">
                                                                {renderBootstrapStars(item?.rating)}
                                                                <span className="ms-1">{item?.rating}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                    );
                                })}
                            </Swiper>
                            <div className="button_swiper2 absolute ">
                                <div className="buttons_icon relative">
                                    <button
                                        id="custom_prev"
                                        aria-label="Previous"
                                        className={`absolute ${isBeginning ? "d-none pointer-events-none" : ""
                                            }`}
                                    >
                                        <MdOutlineKeyboardArrowLeft size={30} />
                                    </button>

                                    <button
                                        id="custom_next"
                                        aria-label="Next"
                                        className="absolute"
                                    >
                                        <MdOutlineKeyboardArrowRight size={30} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ********************************************************************************************************************** section two big cities .........>>>>>>>>>>>>>>>>>> */}

            <div className="container padding_bottom">
                <div className="explore_section section_title ">
                    <h2 className="mb-0">Iconic Places</h2>
                    <h5>Where history, culture, and beauty come together</h5>
                </div>
                {/* *******************************************  show on deskltop >>>>>>>>>>>>>>>>>>>>>> */}

                {/* ************************************************************  show on mobile  */}
                <div className="container">
                    <div className="row  relative">
                        <Swiper
                            slidesPerView={3}
                            spaceBetween={15}
                            // pagination={{ clickable: true }}
                            navigation={{
                                prevEl: "#experience_prev",
                                nextEl: "#experience_next",
                            }}
                            loop={true}
                            // autoplay={{
                            //     delay: 3000,
                            //     disableOnInteraction: false,
                            // }}
                            onSwiper={(swiper) => setSecondActive(swiper.isBeginning)}
                            onSlideChange={(swiper) => setSecondActive(swiper.isBeginning)}
                            breakpoints={{
                                320: {
                                    slidesPerView: 1.5,
                                },
                                375: {
                                    slidesPerView: 1.5,
                                },
                                425: {
                                    slidesPerView: 1.5,
                                },

                                768: {
                                    slidesPerView: 1,
                                },
                                992: {
                                    slidesPerView: 4,
                                    spaceBetween: 24,
                                },
                            }}
                            modules={[Pagination, Navigation]}
                            className="mySwiper relative"
                        >
                            {(iconicPlacesList.length
                                ? iconicPlacesList
                                : fallbackIconicCards
                            ).map((item, i) => {
                                const title =
                                    item?.displayName?.text || item?.content || "Place";
                                const imgName = item?.photos?.[0]?.name;
                                return (
                                    <SwiperSlide key={i}>
                                        <div className="experience_explore_section ">
                                            <div className="card  relative border-0 ">
                                                <img
                                                    src={
                                                        imgName
                                                            ? `https://justbuygear.com/justbuytravel-api/get-photo.php?name=${imgName}`
                                                            : item?.img || "/no-image.jpg"
                                                    }
                                                    className=" card_rounded "
                                                    alt={title}
                                                />
                                                <div className="heart_icon absolute top-2 right-4">
                                                    <span>
                                                        <FaRegHeart />
                                                    </span>
                                                </div>
                                                <div className="card-body ps-0 flex justify-between ">
                                                    <div className="card_detail">
                                                        <h5 className="card-title m-0">{title}</h5>
                                                        <div className="rating flex align-items-center gap-1">
                                                            {item?.rating
                                                                ? renderBootstrapStars(item?.rating)
                                                                : renderBootstrapStars(4)}
                                                            {item?.rating && (
                                                                <span className="ms-1">{item?.rating}</span>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                );
                            })}
                        </Swiper>
                        <div className="button_swiper2 absolute ">
                            <div className="buttons_icon relative">
                                <button
                                    id="experience_prev"
                                    aria-label="Previous"
                                    className={`absolute ${secondActive ? "d-none pointer-events-none" : ""
                                        }`}
                                >
                                    <MdOutlineKeyboardArrowLeft size={30} />
                                </button>

                                <button
                                    id="experience_next"
                                    aria-label="Next"
                                    className="absolute"
                                >
                                    <MdOutlineKeyboardArrowRight size={30} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
