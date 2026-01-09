'use client';
import React, { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import { IoIosArrowDropleftCircle, IoIosArrowDroprightCircle } from "react-icons/io";
import { FaCircleArrowRight } from "react-icons/fa6";
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";
// import required modules
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { getAssetPath } from '../../../app/utils/assetPath';

const card = [
    {
        name: "food",
        img: "/justbuytravel_next/demo/home/destination/food.webp"
    },
    {
        name: "outdoors",
        img: "/justbuytravel_next/demo/home/destination/outdoor.webp"
    },
    {
        name: "culture",
        img: "/justbuytravel_next/demo/home/destination/culture.webp"
    },
    {
        name: "water",
        img: "/justbuytravel_next/demo/home/destination/water.jpg"
    }
]
// ****************

export default function DestinationSection() {
    const [isDestinationActive, setDestinationActive] = useState(true);
    return (
        <>
            <section className='destination_section container  padding_bottom '>
                <div className="destination_title section_title ">
                    <h2 className='mb-0'>
                        Trending Destinations
                    </h2>
                    <h5 >
                        The hottest places capturing travelers’ attention
                    </h5>
                </div>
                {/* ************** */}
                <div className="container">
                    {/* ******************** */}
                    <div className=' d-none d-lg-block'>
                        <div className="row ">
                            {
                                card?.map((item, k) => {
                                    return (
                                        <div className="col-12 col-lg-3 " key={k}>
                                            <div className="destination_box">
                                                <div className="destination_img  ">
                                                    <img src={item?.img} className='card_rounded' alt={`${item?.name || 'Destination'} travel destination image`} />
                                                    <div className="destination_name">
                                                        <h5>
                                                            {item?.name}
                                                        </h5>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }


                        </div>
                    </div>
                    {/* ************************************************ onscroll the page scroller    */}
                    <div className='d-block d-lg-none'>
                        <div className="row relative">
                            <Swiper
                                slidesPerView={3}
                                spaceBetween={15}

                                navigation={{
                                    prevEl: "#destination_prev",
                                    nextEl: "#destination_next",
                                }}
                                loop={true}
                                autoplay={{
                                    delay: 3000,
                                    disableOnInteraction: false,
                                }}
                                modules={[Pagination, Navigation]}
                                onSwiper={(swiper) => setDestinationActive(swiper.isBeginning)}
                                onSlideChange={(swiper) => setDestinationActive(swiper.isBeginning)}

                                breakpoints={{
                                    320: {
                                        slidesPerView: 1.5

                                    },
                                    375: {
                                        slidesPerView: 1.5

                                    },
                                    425: {
                                        slidesPerView: 1.5

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

                                            <>
                                                <SwiperSlide key={i}>
                                                    <div className="destination_box">
                                                        <div className="destination_img  ">
                                                            <img src={item?.img} className='card_rounded' alt={`${item?.name || 'Destination'} travel destination image`} />
                                                            <div className="destination_name">
                                                                <h5>
                                                                    {item?.name}
                                                                </h5>
                                                            </div>
                                                        </div>
                                                    </div>



                                                </SwiperSlide>
                                                {/* ********************** */}
                                            </>
                                        )

                                    })
                                }
                            </Swiper>
                            <div className="button_swiper absolute ">
                                <div className="buttons_icon relative">

                                    <button id='destination_prev' className={`absolute ${isDestinationActive ? 'd-none pointer-events-none' : ''}`}>
                                        <MdOutlineKeyboardArrowLeft size={30} />
                                    </button>


                                    <button id='destination_next' className='absolute'>
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
