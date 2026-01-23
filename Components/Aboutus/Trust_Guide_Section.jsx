"use client"
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const card = [
    {
        img: "/justbuytravel_next/demo/aboutus/booking.webp"
    },
    {
        img: "/justbuytravel_next/demo/aboutus/Expida.webp"
    },
    // {
    //     img: "/demo/aboutus/google.png"
    // },
    // {
    //     img: "/demo/aboutus/hotellook.png"
    // },
    // {
    //     img: "/demo/aboutus/skyscanner.png"
    // },
    // {
    //     img: "/demo/aboutus/tripadviser.png"
    // }
]



export default function Trust_Guide_Section() {


    const route = usePathname();
    return (
        <section className={`trust_guide_section ${route == "/aboutus/" ? "" : "bg_grey"}  padding_top padding_bottom`}>
            <div className="container">
                <div className="row justify-center">
                    <div className="col-lg-12">
                        {/* title */}
                        <div className="section_title trust_guide_content">
                            <h2>
                                Your Trusted Guide to the Best Travel Sites
                            </h2>
                            <p>
                                Looking for the best hotel booking websites to compare? Just Buy Travel helps you research and compare popular hotel platforms side by side, so you can choose the right option confidently.
                            </p>
                            <p>
                                Searching for flight comparison websites? We feature trusted travel platforms that allow travelers to explore routes, prices, and options before booking.
                            </p>
                            <p>
                                Just Buy Travel is a travel research and comparison platform designed to help users explore hotels, flights, holiday packages, and cruises using trusted third-party travel websites.
                            </p>
                        </div>
                        <div className="booking_platform relative ">
                            {/* ******************* */}
                            <Swiper
                                slidesPerView={4}
                                spaceBetween={30}
                                loop={true}
                                autoplay={{
                                    delay: 3000,
                                    disableOnInteraction: false
                                }}
                                breakpoints={{
                                    320: {
                                        slidesPerView: 1

                                    },
                                    375: {
                                        slidesPerView: 1

                                    },
                                    425: {
                                        slidesPerView: 2

                                    },

                                    768: {
                                        slidesPerView: 3,
                                    },
                                    992: {
                                        slidesPerView: 4,
                                        spaceBetween: 24,
                                    },
                                }}
                                modules={[Pagination, Autoplay]}
                                className="trust_section_swiper"
                            >
                                {/* ******************* */}
                                {
                                    card?.map((item) => {
                                        return (

                                            <SwiperSlide>
                                                <div className="platform_img pb-4 pt-3">
                                                    <img src={item?.img} alt="" />
                                                </div>
                                            </SwiperSlide>


                                        )
                                    })
                                }
                            </Swiper>
                            {/* ******************* */}
                            <div className="plane_icon ">
                                <img src="/aboutus/shadow-plane.webp" alt="" />
                            </div>
                            <button type="submit"
                                className="z-10 mt-2  bg-brand hover:bg-brand-strong box-border border border-transparent shadow-xs font-medium leading-5 text-xs  focus:outline-none button_bg2  text-light " onClick={() => navigate.push("/my-favorite-travel-resources")}>Click Here To Descover Them All!</button>
                        </div>


                    </div>
                </div>
            </div>

        </section >
    )
}
