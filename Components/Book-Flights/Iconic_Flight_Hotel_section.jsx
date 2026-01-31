"use client"
import { IconicPlaces, TouristAttraction, TouristAttractionApi } from "@/app/Route/endpoints";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { FaRegHeart } from "react-icons/fa";
import {
    MdOutlineKeyboardArrowLeft,
    MdOutlineKeyboardArrowRight,
} from "react-icons/md";
// import required modules
import { Navigation, Pagination } from "swiper/modules";
/****************************** start function >>>>>>>>>>>> >>>>>>>>>>>>>>>>>>>>>>>>>>>>*/
export default function Iconic_Flight_Hotel_section() {
    /************ state start ******** */
    const [secondActive, setSecondActive] = useState(true);
    // ****************** state end *****
    const card = [
        {
            title: "Overwater Villas in the Maldives: The Ultimate Hotels to Book in 2025		",
            name: " Bankok",
            img: "/justbuytravel_next/demo/flights/places/new/bankok.jpg",
            date: "Feb 2 - Mar 27 · Round-trip"
        },
        {
            title: "Overwater Villas in the Maldives: The Ultimate Hotels to Book in 2025		",
            img: "/justbuytravel_next/demo/flights/places/new/kathmandu1.jpg",
            name: " Kathmandu",
            date: "Feb 2 - Mar 27 · Round-trip"
        },
        {
            title: "Overwater Villas in the Maldives: The Ultimate Hotels to Book in 2025",
            img: "/justbuytravel_next/demo/flights/places/new/london.jpg",
            name: " london",
            date: "Feb 2 - Mar 27 · Round-trip"
        },
        {
            title: "Overwater Villas in the Maldives: The Ultimate Hotels to Book in 2025		",
            img: "/justbuytravel_next/demo/flights/places/new/melbourne.jpg",
            name: " melbourne",
            date: "Feb 2 - Mar 27 · Round-trip"
        },
        {
            title: "Overwater Villas in the Maldives: The Ultimate Hotels to Book in 2025		",
            img: "/justbuytravel_next/demo/flights/places/new/sydney.jpg",
            name: " sydney",
            date: "Feb 2 - Mar 27 · Round-trip"
        },
        {
            title: "Overwater Villas in the Maldives: The Ultimate Hotels to Book in 2025		",
            img: "/justbuytravel_next/demo/flights/places/new/toronto1.jpg",
            name: " tornto",
            date: "Feb 2 - Mar 27 · Round-trip"
        },
    ]
    /************************************ */
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
    // ****************************** apis 
    const { data: touristAttraction } = useQuery({
        queryKey: ["touristattraction"],
        queryFn: () => TouristAttractionApi()
    })
    const TouristAttraction = touristAttraction?.data;

    return (
        <>
            <section className=" padding_bottom ">
                <div className="container ">
                    <div className="explore_section section_title ">
                        <h2 className="mb-0 capitalize">Popular flights near you</h2>
                        <p>Explore breathtaking locations rich in history, culture, and natural beauty.</p>
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
                                {
                                    card?.map((item, i) => {
                                        const title = item?.name || "Place";

                                        return (
                                            <SwiperSlide key={i}>
                                                <div className="experience_explore_section ">
                                                    <div className="card  relative border-0 ">
                                                        <img
                                                            src={
                                                                item?.img || "/no-image.jpg"
                                                            }
                                                            className=" card_rounded "
                                                            alt={title}
                                                        />
                                                        {/* <div className="heart_icon absolute top-2 right-4">
                                                        <span>
                                                            <FaRegHeart />
                                                        </span>
                                                    </div> */}
                                                        <div className="card-body ps-0 flex justify-between ">
                                                            <div className="card_detail hotel_card_detail">
                                                                <h5 className="card-title m-0 capitalize">{title}</h5>
                                                                <p className="m-0 p-0">{item?.date}</p>

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
            </section>

        </>
    )
}
