"use client"
import React from 'react'
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from 'react-icons/md';
export default function DubaiBookingTips() {
    const [secondActive, setSecondActive] = useState(true);
    const card = [
        {
            img: "/justbuytravel_next/demo/innerpages/dubai/d_img.webp"
        },
        {
            img: "/justbuytravel_next/demo/innerpages/dubai/d_img2.jpg"
        },
        {
            img: "/justbuytravel_next/demo/innerpages/dubai/d_img3.webp"
        },
        {
            img: "/justbuytravel_next/demo/innerpages/dubai/d_img4.webp"
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
                                            <img src="/justbuytravel_next/demo/innerpages/dubai/d_img.webp" alt="" />
                                        </div>

                                    </div>
                                    <div className="col-lg-6">
                                        <div className="hotel_tips_img">
                                            <img src="/justbuytravel_next/demo/innerpages/dubai/d_img2.jpg" alt="" />
                                        </div>
                                    </div>
                                    <div className="col-lg-6  mt-4">
                                        <div className="hotel_tips_img">
                                            <img src="/justbuytravel_next/demo/innerpages/dubai/d_img3.webp" alt="" />
                                        </div>
                                    </div>
                                    <div className="col-lg-6 mt-4 ">
                                        <div className="hotel_tips_img">
                                            <img src="/justbuytravel_next/demo/innerpages/dubai/d_img4.webp" alt="" />
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
                                        Hotels in Dubai – Find the Best Place to Stay
                                    </h2>
                                </div>

                            </div>
                        </div>
                        {/* ********************* content >>>>>>>>>>> */}
                        <div className="col-lg-12">
                            <div className="hotel_tips_content">
                                <p>
                                    Finding the <span className='g_color font-semibold'> best hotels in Dubai </span> does not have to be difficult. With many options available online, travelers can  <span className='g_color font-semibold'> compare  prices, locations, and reviews before they book hotels in Dubai.</span> This helps you save time and avoid paying more than needed.
                                </p>
                                <p>If you are planning your trip in advance, you may find great rates on <span className='g_color font-semibold'> 5 star hotels in Dubai </span> as well as comfortable budget hotels in Dubai. Travelers booking closer to their travel date can also find last minute hotel deals in Dubai, especially during off-peak seasons.

                                </p>
                                <p>
                                    Dubai hotel booking online allows you to explore different areas of the city with ease. From the busy streets near Downtown to the relaxed atmosphere of<span className='g_color font-semibold'>Dubai Marina, </span> each area offers a unique stay experience. Reading guest reviews and comparing hotel features can help you choose the best place to stay in Dubai.

                                </p>

                                <p>
                                    With the right planning, you can <span className='g_color font-semibold'>enjoy a comfortable stay, stay within your budget, </span> and make the most of your time in this vibrant city.

                                </p>

                            </div>
                        </div>
                    </div>
                </div>
            </section >

        </>
    )
}
