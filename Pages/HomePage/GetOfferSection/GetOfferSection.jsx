"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FaCheck } from "react-icons/fa";
import { TiArrowUp } from "react-icons/ti";
export default function GetOfferSection() {
    return (
        <>
            <section className="GetOfferSection pb-20">
                <div className="container">
                    <div className="row justify-center">
                        <div className="col-md-12">
                            <div className="offer_banner_wrapper rounded-3xl bg-color-green">
                                <Swiper
                                    spaceBetween={30}
                                    effect="fade"
                                    navigation
                                    pagination={{ clickable: true }}
                                    autoplay={{
                                        delay: 4000,
                                        disableOnInteraction: false,
                                    }}
                                    modules={[EffectFade, Autoplay]}
                                    className=""
                                >
                                    {/* Slide 1****************************************************************************************** */}
                                    <SwiperSlide>
                                        <div
                                            className="grid grid-cols-2 h-full  items-center swiper_item relative"
                                            id="swiper_item"
                                        >
                                            {/* LEFT TEXT */}
                                            <div className="px-16 slide-text flex flex-col gap-2">
                                                <div className="text">
                                                    <h2 className=" mb-4">
                                                        Snowboarding 30% Off – All Winter Spots!
                                                    </h2>
                                                    {/* <p className="text-gray-600">
                                                        Discover beautiful places and amazing landscapes.
                                                    </p> */}
                                                </div>
                                                {/* ***** */}
                                                <div className="text_point flex gap-3 items-center">
                                                    <p className="flex gap-2 items-center">
                                                        <span>
                                                            <FaCheck />
                                                        </span>{" "}
                                                        <span>Safe & Verified Equipment</span>
                                                    </p>
                                                    <p className="flex gap-2 items-center">
                                                        <span>
                                                            <FaCheck />
                                                        </span>{" "}
                                                        <span>Breathtaking Views</span>
                                                    </p>
                                                </div>
                                                {/* ***** */}
                                                <div className="text_button mt-4">
                                                    <button className="flex items-center  ">
                                                        <span>view all activities </span>{" "}
                                                        <span>
                                                            <TiArrowUp />
                                                        </span>
                                                    </button>
                                                </div>
                                            </div>

                                            {/* RIGHT IMAGE>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */}
                                            <div className="banner_image relative ">
                                                <div className="swiper_inner_img">
                                                    <img
                                                        src="/home/offer/offer_banner1.webp"
                                                        className="w-full object-cover"
                                                        alt=""
                                                    />
                                                </div>

                                                <img
                                                    src="/home/offer/offer-banner-img-shape.png"
                                                    alt=""
                                                />
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                    {/* Slide 1****************************************************************************************** */}
                                    <SwiperSlide>
                                        <div
                                            className="grid grid-cols-2 h-full  items-center swiper_item relative"
                                            id="swiper_item"
                                        >
                                            {/* LEFT TEXT */}
                                            <div className="px-16 slide-text flex flex-col gap-2">
                                                <div className="text">
                                                    <h2 className=" mb-4">
                                                        Snowboarding 30% Off – All Winter Spots!
                                                    </h2>
                                                    {/* <p className="text-gray-600">
                                                        Discover beautiful places and amazing landscapes.
                                                    </p> */}
                                                </div>
                                                {/* ***** */}
                                                <div className="text_point flex gap-3 items-center">
                                                    <p className="flex gap-2 items-center">
                                                        <span>
                                                            <FaCheck />
                                                        </span>{" "}
                                                        <span>Safe & Verified Equipment</span>
                                                    </p>
                                                    <p className="flex gap-2 items-center">
                                                        <span>
                                                            <FaCheck />
                                                        </span>{" "}
                                                        <span>Breathtaking Views</span>
                                                    </p>
                                                </div>
                                                {/* ***** */}
                                                <div className="text_button mt-4">
                                                    <button className="flex items-center  ">
                                                        <span>view all activities </span>{" "}
                                                        <span>
                                                            <TiArrowUp />
                                                        </span>
                                                    </button>
                                                </div>
                                            </div>

                                            {/* RIGHT IMAGE>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */}
                                            <div className="banner_image relative ">
                                                <div className="swiper_inner_img">
                                                    <img
                                                        src="/home/offer/offer_banner2.webp"
                                                        className="w-full object-cover"
                                                        alt=""
                                                    />
                                                </div>

                                                <img
                                                    src="/home/offer/offer-banner-img-shape.png"
                                                    alt=""
                                                />
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                    {/* Slide 1****************************************************************************************** */}
                                    <SwiperSlide>
                                        <div
                                            className="grid grid-cols-2 h-full  items-center swiper_item relative"
                                            id="swiper_item"
                                        >
                                            {/* LEFT TEXT */}
                                            <div className="px-16 slide-text flex flex-col gap-2">
                                                <div className="text">
                                                    <h2 className=" mb-4">
                                                        Snowboarding 30% Off – All Winter Spots!
                                                    </h2>
                                                    {/* <p className="text-gray-600">
                                                        Discover beautiful places and amazing landscapes.
                                                    </p> */}
                                                </div>
                                                {/* ***** */}
                                                <div className="text_point flex gap-3 items-center">
                                                    <p className="flex gap-2 items-center">
                                                        <span>
                                                            <FaCheck />
                                                        </span>{" "}
                                                        <span>Safe & Verified Equipment</span>
                                                    </p>
                                                    <p className="flex gap-2 items-center">
                                                        <span>
                                                            <FaCheck />
                                                        </span>{" "}
                                                        <span>Breathtaking Views</span>
                                                    </p>
                                                </div>
                                                {/* ***** */}
                                                <div className="text_button mt-4">
                                                    <button className="flex items-center  ">
                                                        <span>view all activities </span>{" "}
                                                        <span>
                                                            <TiArrowUp />
                                                        </span>
                                                    </button>
                                                </div>
                                            </div>

                                            {/* RIGHT IMAGE>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */}
                                            <div className="banner_image relative ">
                                                <div className="swiper_inner_img">
                                                    <img
                                                        src="/home/offer/offer_banner3.webp"
                                                        className="w-full object-cover"
                                                        alt=""
                                                    />
                                                </div>

                                                <img
                                                    src="/home/offer/offer-banner-img-shape.png"
                                                    alt=""
                                                />
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                </Swiper>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
