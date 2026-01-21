"use client"
import { TopHotelAroundWorld } from '@/app/Route/endpoints'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useState } from "react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import {
    MdOutlineKeyboardArrowLeft,
    MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import "swiper/css/pagination";
export default function Find_CruisesSection() {
    const [Active, setActive] = useState(true);
    const image = [
        {
            img: "/justbuytravel_next/demo/cruise/cruise1.webp",
            name: "australia"
        },
        {
            img: "/justbuytravel_next/demo/cruise/cruise2.webp",
            name: "Croatia"
        },
        {
            img: "/justbuytravel_next/demo/cruise/cruise3.webp",
            name: "Montenegro"
        },
        {
            img: "/justbuytravel_next/demo/cruise/cruise4.webp",
            name: "Great Britain"
        },
        {
            img: "/justbuytravel_next/demo/cruise/cruise5.jpg",
            name: "Hvar Croatia"
        },
        {
            img: "/justbuytravel_next/demo/cruise/cruide6.jpg",
            name: "dubai"
        },
    ]
    return (
        <>
            <section className='find_cruisessection padding_bottom'>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="explore_section section_title ">
                                <h2 className="mb-0">Find Cruises by Region</h2>
                                <h5>Let our experts guide you every step of the way in booking the perfect Cruise!</h5>
                            </div>
                        </div>
                    </div>
                    {/* ************************ */}
                    <div className=" relative">
                        <Swiper
                            slidesPerView={4}
                            spaceBetween={5}
                            navigation={{
                                prevEl: "#recomand_prev",
                                nextEl: "#recomand_next",
                            }}
                            // pagination={{
                            //     clickable: true,
                            // }}
                            modules={[Navigation, Pagination]}
                            className="mySwiper"
                            // navigation={true}
                            onSwiper={(swiper) => setActive(swiper.isBeginning)}
                            onSlideChange={(swiper) => setActive(swiper.isBeginning)}
                            // autoplay={{
                            //     delay: 3000,
                            //     disableOnInteraction: false,
                            // }}
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

                            id="swiper_sldie"
                        >

                            <>
                                {
                                    image?.map((item) => {
                                        return (
                                            <>
                                                <SwiperSlide >
                                                    <div className="card_col">
                                                        <div
                                                            className="recommend_card_box   card_rounded  recomand_card_shadow  
                                                        "
                                                        >
                                                            <div className="card_box pe-">
                                                                <div
                                                                    className="card_box_img card_rounded relative overflow-hidden"
                                                                    style={{
                                                                        minHeight: "250px",
                                                                        backgroundColor: "#f3f4f6",
                                                                    }}
                                                                >
                                                                    <img
                                                                        src={item?.img}
                                                                        className="card_rounded w-full h-full object-cover"
                                                                        alt={"Hotel image"}
                                                                    />
                                                                </div>
                                                                {/* *** */}
                                                                <div className="card_box_detail card_rounded flex flex-col z-1 find_cruise_detail  relative">
                                                                    <h4 className="m-0 capitalize">
                                                                        {item?.name}
                                                                    </h4>
                                                                    {/* ****** */}

                                                                    {/* ****************** */}

                                                                    {/* ******* */}


                                                                    {/* *************** rating_list */}
                                                                </div>
                                                            </div>
                                                            {/* *********** */}
                                                        </div>
                                                        {/* *********** */}
                                                    </div>
                                                </SwiperSlide>
                                            </>
                                        )
                                    })
                                }
                            </>

                        </Swiper>
                        {/*xxxxxxxx */}
                        <div className="button_swiper2 absolute ">
                            <div className="buttons_icon relative">
                                <button
                                    id="recomand_prev"
                                    aria-label="Previous"
                                    className={`absolute ${Active ? "d-none pointer-events-none" : ""
                                        }`}
                                >
                                    <MdOutlineKeyboardArrowLeft size={30} />
                                </button>

                                <button
                                    id="recomand_next"
                                    aria-label="Next"
                                    className="absolute"
                                >
                                    <MdOutlineKeyboardArrowRight size={30} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
