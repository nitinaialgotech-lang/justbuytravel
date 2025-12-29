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


    const card = [
        {
            title: " Snowboarding 30% Off – All Winter Spots!",
            banner: "/home/offer/offer_banner1.webp",
            back_img: "/home/offer/offer-banner-img-shape.png",
            option1: "Safe & Verified Equipment",
            option2: "Breathtaking Views"
        },
        {
            title: " Snowboarding 30% Off – All Winter Spots!",
            banner: "/home/offer/offer_banner2.webp",
            back_img: "/home/offer/offer-banner-img-shape.png",
            option1: "Safe & Verified Equipment",
            option2: "Breathtaking Views"
        },
        {
            title: " Snowboarding 30% Off – All Winter Spots!",
            banner: "/home/offer/offer_banner3.webp",
            back_img: "/home/offer/offer-banner-img-shape.png",
            option2: "Breathtaking Views",
            option1: "Safe & Verified Equipment",
        }
    ]
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

                                    pagination={{ clickable: true }}
                                    autoplay={{
                                        delay: 4000,
                                        disableOnInteraction: false,
                                    }}
                                    speed={600}              // smoother slide speed
                                    resistanceRatio={0.85}   // less snap-back
                                    watchSlidesProgress={true}
                                    modules={[EffectFade, Autoplay]}
                                    className="offer_swiper"
                                >
                                    {/* Slide 1****************************************************************************************** */}
                                    {
                                        card?.map((item) => {
                                            return (
                                                <>


                                                    <SwiperSlide>
                                                        <div
                                                            className="grid grid-cols-2 h-full  items-center swiper_item relative"
                                                            id="swiper_item"
                                                        >
                                                            {/* LEFT TEXT */}
                                                            <div className="px-16 slide-text flex flex-col gap-2">
                                                                <div className="text">
                                                                    <h2 className=" mb-4">
                                                                        {
                                                                            item?.title
                                                                        }

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
                                                                        <span>{item?.option1}</span>
                                                                    </p>
                                                                    <p className="flex gap-2 items-center">
                                                                        <span>
                                                                            <FaCheck />
                                                                        </span>{" "}
                                                                        <span>
                                                                            {
                                                                                item?.option2
                                                                            }
                                                                        </span>
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
                                                                        src={item?.banner}
                                                                        className="w-full object-cover"
                                                                        alt=""
                                                                    />
                                                                </div>

                                                                <img className="d-none d-lg-block"
                                                                    src={item?.back_img}
                                                                    alt=""
                                                                />
                                                            </div>
                                                        </div>
                                                    </SwiperSlide>
                                                </>
                                            )
                                        })
                                    }
                                    {/* Slide 1****************************************************************************************** */}

                                </Swiper>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
