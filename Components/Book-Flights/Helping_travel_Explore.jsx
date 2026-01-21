"use client"
import React, { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";
import 'swiper/css/pagination';
import Trusted_Favourite_Companies from '../TrustedPartner/Trusted&Favourite_Companies';
import Blogs from '../HomePage/Blog/Blogs';
import Footer from '@/component/Footer';


export default function Helping_travel_Explore() {
    const [isAtBeginning, setIsAtBeginning] = useState(true)
    const card = [
        {
            img: "/justbuytravel_next/demo/travelexplore/london-bridge.webp",
            title: "Autralia to singapur"
        },
        {
            img: "/justbuytravel_next/demo/travelexplore/singapore-garden.webp",
            title: "Autralia to singapur"
        },
        {
            img: "/justbuytravel_next/demo/travelexplore/london-bridge.webp",
            title: "Autralia to singapur"
        },
        {
            img: "/justbuytravel_next/demo/travelexplore/singapore-garden.webp",
            title: "Autralia to singapur"
        },
        {
            img: "/justbuytravel_next/demo/travelexplore/london-bridge.webp",
            title: "Autralia to singapur"
        },
        {
            img: "/justbuytravel_next/demo/travelexplore/london-bridge.webp",
            title: "Autralia to singapur"
        },
        {
            img: "/justbuytravel_next/demo/travelexplore/london-bridge.webp",
            title: "Autralia to singapur"
        },
    ]
    return (
        <>
            <section className='helping_travel_section padding_top padding_bottom'>
                <div className="container">
                    <div className="row">
                        <div className="helping_travel_section_title">

                            <div className="section_title">
                                <h2>
                                    Plan Smart, Travel Easy
                                </h2>
                                <h3>
                                    Helping travelers explore more while spending less — that’s our goal.
                                </h3>
                            </div>
                        </div>
                        {/* *****************  ection slider i */}
                        <div className="travel_section_box relative">
                            <Swiper
                                slidesPerView={4}
                                spaceBetween={20}
                                navigation={{
                                    prevEl: "#helping_swiper-btn-prev",
                                    nextEl: "#helping_swiper-btn-next",
                                }}
                                modules={[Pagination, Navigation]}
                                onSwiper={(swiper) => setIsAtBeginning(swiper.isBeginning)}
                                onSlideChange={(swiper) => setIsAtBeginning(swiper.isBeginning)}
                                loop={true}

                                breakpoints={{
                                    320: {
                                        slidesPerView: 1

                                    },
                                    375: {
                                        slidesPerView: 1

                                    },
                                    425: {
                                        slidesPerView: 1

                                    },

                                    768: {
                                        slidesPerView: 1,
                                    },
                                    992: {
                                        slidesPerView: 4,
                                        spaceBetween: 24,
                                    },
                                }}


                                className="mySwiper relative"
                            >
                                {
                                    card?.map((item, i) => {
                                        return (
                                            <SwiperSlide key={i} className='relative'>
                                                <div className="travel_explore_card relative">
                                                    <div className="travel_explore_img">
                                                        <img src={item?.img} alt="" />
                                                    </div>
                                                    <div className="travel_explore_body ">
                                                        <h4 className='m-0'>
                                                            {item?.title}
                                                        </h4>
                                                        <button className='button_bg2'>
                                                            Book Flights
                                                        </button>

                                                    </div>
                                                </div>
                                            </SwiperSlide>
                                        )
                                    })
                                }
                            </Swiper>
                            <div className="button_swiper absolute ">
                                <div className="buttons_icon relative">
                                    <button id='helping_swiper-btn-prev' aria-label="Previous" className={`absolute ${isAtBeginning ? 'opacity-50 pointer-events-none' : ''}`}>
                                        <MdOutlineKeyboardArrowLeft size={30} />
                                    </button>

                                    <button id='helping_swiper-btn-next' aria-label="Next" className='absolute'>
                                        <MdOutlineKeyboardArrowRight size={30} />
                                    </button>
                                </div>
                            </div>
                            {/* ****************************** */}
                        </div>
                    </div>
                </div>

            </section>


            <Trusted_Favourite_Companies />

            <Blogs />


            <Footer />


        </>
    )
}
