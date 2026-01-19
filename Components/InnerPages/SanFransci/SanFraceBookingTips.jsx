"use client"
import React from 'react'
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from 'react-icons/md';
export default function SanFraceBookingTips() {
    const [secondActive, setSecondActive] = useState(true);
    const card = [
        {
            img: "/justbuytravel_next/demo/innerpages/australia/as4.webp"
        },
        {
            img: "/justbuytravel_next/demo/innerpages/australia/as1.webp"
        },
        {
            img: "/justbuytravel_next/demo/innerpages/australia/as2.webp"
        },
        {
            img: "/justbuytravel_next/demo/innerpages/australia/as3.webp"
        },
    ]
    return (
        <>
            <section className='hotel_booking_tips_section padding_bottom padding_top bg_grey'>
                <div className="container">
                    <div className="row items-center">
                        {/* ******  image */}
                        <div className="col-lg-6">
                            <div className="container d-none d-lg-block">


                                <div className="row ">
                                    <div className="col-lg-6">
                                        <div className="hotel_tips_img">
                                            <img src="/justbuytravel_next/demo/innerpages/australia/as4.webp" alt="" />
                                        </div>

                                    </div>
                                    <div className="col-lg-6">
                                        <div className="hotel_tips_img">
                                            <img src="/justbuytravel_next/demo/innerpages/australia/as1.webp" alt="" />
                                        </div>
                                    </div>
                                    <div className="col-lg-6  mt-4">
                                        <div className="hotel_tips_img">
                                            <img src="/justbuytravel_next/demo/innerpages/australia/as2.webp" alt="" />
                                        </div>
                                    </div>
                                    <div className="col-lg-6 mt-4 ">
                                        <div className="hotel_tips_img">
                                            <img src="/justbuytravel_next/demo/innerpages/australia/as3.webp" alt="" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* **************** on mobile view show  */}
                            <div className="container">

                                <div className="row d-block d-lg-none relative">
                                    <Swiper
                                        slidesPerView={3}
                                        spaceBetween={15}
                                        // pagination={{ clickable: true }}
                                        navigation={{
                                            prevEl: "#booking_tips_prev",
                                            nextEl: "#booking_tips_next",
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
                                                return (
                                                    <>

                                                        <SwiperSlide key={i}>

                                                            <div className="col-lg-6">
                                                                <div className="hotel_tips_img">
                                                                    <img src={item?.img} alt="" />
                                                                </div>

                                                            </div>
                                                        </SwiperSlide>
                                                    </>
                                                )
                                            })
                                        }
                                    </Swiper>
                                    <div className="button_swiper2 button_swiper_3 absolute ">
                                        <div className="buttons_icon relative">
                                            <button
                                                id="booking_tips_prev"
                                                aria-label="Previous"
                                                className={`absolute ${secondActive ? "d-none pointer-events-none" : ""
                                                    }`}
                                            >
                                                <MdOutlineKeyboardArrowLeft size={30} />
                                            </button>

                                            <button
                                                id="booking_tips_next"
                                                aria-label="Next"
                                                className="absolute"
                                            >
                                                <MdOutlineKeyboardArrowRight size={30} />
                                            </button>
                                        </div>
                                    </div>
                                    {/* ******** end ..... */}

                                </div>
                            </div>

                        </div>
                        {/* ************ title */}
                        <div className="col-lg-6 ">
                            <div className="hotel_tips_title">
                                <div className="tips_title">
                                    <h2>
                                        Hotel Reservations San Francisco - As Smooth As a Cable Car Ride
                                    </h2>
                                </div>

                            </div>
                        </div>
                        {/* ********************* content >>>>>>>>>>> */}
                        <div className="col-lg-12">
                            <div className="hotel_tips_content">
                                <p>
                                    No stress. No long forms. Just a few clicks and you can compare rooms, check real guest reviews and confirm your hotel reservations in San Francisco instantly. Whether it’s a boutique hotel in Hayes Valley or a budget friendly option near the airport, we connect you to stays that suit both your vibe and your wallet.

                                </p>



                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
