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
                                        Hotels in Dubai – Unlock Exclusive Deals & Save Over 50% on Luxury Stays!
                                    </h2>
                                </div>

                            </div>
                        </div>
                        {/* ********************* content >>>>>>>>>>> */}
                        <div className="col-lg-12">
                            <div className="hotel_tips_content">
                                <p>
                                    <span className='g_color font-semibold'> Hotels in Dubai </span> offer the perfect mix of luxury, comfort, and convenience. Whether you’re looking for<span className='g_color font-semibold'> good hotels in Dubai </span>or extravagant <span className='g_color font-semibold'>Dubai hotels 5 star</span> , you’ll find world-class accommodations to suit every need. From stunning<span className='g_color font-semibold'> five-star hotels in Dubai</span> to stylish <span className='g_color font-semibold'> hotels in Dubai downtown</span>, there’s something for every traveler.
                                </p>
                                <p>
                                    For a lavish stay, choose <span className='g_color font-semibold'> five-star hotels in Dubai </span> with premium amenities and breathtaking views. If you prefer a central location,<span className='g_color font-semibold'> hotels in Dubai downtown</span> keep you close to top attractions. No matter your preference,<span className='g_color font-semibold'> good hotels in Dubai </span>ensure a memorable stay!
                                </p>

                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}
