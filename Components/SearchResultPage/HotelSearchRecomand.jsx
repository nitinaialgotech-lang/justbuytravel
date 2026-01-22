"use client"
import React from 'react'
import { useState } from "react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { useQuery } from "@tanstack/react-query";
import { nearbyPlaces } from "@/app/Route/endpoints";
import {
    MdOutlineKeyboardArrowLeft,
    MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import { useRouter } from 'next/navigation';


// *************************************************************
export default function HotelSearchRecomand({ lat, long, name }) {
    /************************* ustate contetn *** */
    const [Active, setActive] = useState(true);
    /*********************** end stte ****** */
    const { data: nearbyPlacesData, isLoading } = useQuery({
        queryKey: ["lodgingnearby", lat, long],
        queryFn: () => nearbyPlaces(lat, long),
    });
    const nearbyPlace = nearbyPlacesData?.data?.places;

    /***************** end of api calls ************* */
    /************************ shimmer effetct *****************/
    const ShimmerCard = () => {
        return (
            <div className="card_col">
                <div className="recommend_card_box card_rounded recomand_card_shadow margin_lr">
                    <div className="card_box">
                        {/* IMAGE */}
                        <div
                            className="card_box_img card_rounded relative overflow-hidden shimmer-bg"
                            style={{ minHeight: "250px" }}
                        />

                        {/* DETAILS */}
                        <div className="card_box_detail card_rounded relative">
                            {/* TITLE */}
                            <div
                                className="shimmer-bg shimmer-rounded"
                                style={{ width: "75%", height: "18px" }}
                            />

                            {/* SPACING */}
                            <div style={{ height: "10px" }} />

                            {/* RATING + BUTTON */}
                            <div className="price_book flex justify-between items-center">
                                {/* RATING */}
                                <div className="flex gap-1 items-center">
                                    <div
                                        className="shimmer-bg shimmer-rounded"
                                        style={{ width: "60px", height: "14px" }}
                                    />
                                    <div
                                        className="shimmer-bg shimmer-rounded"
                                        style={{ width: "40px", height: "14px" }}
                                    />
                                </div>

                                {/* BUTTON */}
                                <div
                                    className="shimmer-bg shimmer-rounded"
                                    style={{ width: "90px", height: "28px" }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
    /*********************** end of shimmer effect ************* */
    // *****************************************************************************************
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
    const router = useRouter();
    const viewDetail = (id) => {
        router.push(`/hoteldetail?hotel=${id}`);
    };
    // *************************  view al hotels 
    const viewAllHotels = () => {
        router.push(`/view-all-hotels?lat=${lat}&long=${long}&name=${name}`)
    }
    return (
        <>
            {/* ********************* style start ****** */}
            <style
                dangerouslySetInnerHTML={{
                    __html: `
                @keyframes shimmer {
                    0% {
                        background-position: -1000px 0;
                    }
                    100% {
                        background-position: 1000px 0;
                    }
                }
               .shimmer-bg {
  background: linear-gradient(
    90deg,
    #e5e7eb 0%,
    #f3f4f6 50%,
    #e5e7eb 100%
  );
  background-size: 1000px 100%;
  animation: shimmer 1.6s infinite linear;
}

.shimmer-rounded {
  border-radius: 8px;
}

            `,
                }}
            />
            {/* ************************ style end of shimmer */}
            {/* ******************** section start ********************** */}
            <section className="recomend_section container  padding_bottom">
                <div className="section_title relative flex items-center justify-between ">
                    <span>
                        <h2 className="mb-0">Recommended For You</h2>
                        <h5>Handpicked experiences tailored to your interests</h5>
                    </span>
                    <span className='font-semibold g_color'>
                        <button className='button_bg2 me-2 mt-2' onClick={() => viewAllHotels()}>view all</button>
                    </span>

                </div>
                {/* **************************** recomend carsd cord box */}
                <div className="container">
                    <div className="row relative">
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
                            modules={[Navigation, Autoplay, Pagination]}
                            className="mySwiper"
                            // navigation={true}
                            onSwiper={(swiper) => setActive(swiper.isBeginning)}
                            onSlideChange={(swiper) => setActive(swiper.isBeginning)}
                            autoplay={{
                                delay: 3000,
                                disableOnInteraction: false,
                            }}
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
                            loop={!isLoading}
                            id="swiper_sldie"
                        >
                            {isLoading
                                ? Array.from({ length: 4 }).map((_, i) => (
                                    <SwiperSlide key={`shimmer-${i}`}>
                                        <ShimmerCard />
                                    </SwiperSlide>
                                ))
                                : nearbyPlace?.map((item, i) => {
                                    const image = item?.photos
                                        ?.slice(0, 1)
                                        ?.map((item) => item?.name);
                                    const truncateText = (text, maxLength = 20) => {
                                        if (!text) return "";
                                        return text.length > maxLength
                                        ? text.slice(0, maxLength) + "..."
                                        : text;
                                };
                                return (
                                        <>
                                            <SwiperSlide key={i}>
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
                                                                    src={`https://justbuygear.com/justbuytravel-api/get-photo.php?name=${image}`}
                                                                    className="card_rounded w-full h-full object-cover"
                                                                    alt={"Hotel image"}
                                                                />
                                                            </div>
                                                            {/* *** */}
                                                            <div className="card_box_detail card_rounded flex flex-col z-1  relative">
                                                                <h4 className="m-0 capitalize">
                                                                    {item?.displayName?.text}
                                                                </h4>
                                                                {/* ****** */}

                                                                {/* ****************** */}

                                                                {/* ******* */}
                                                                <div className="price_book flex justify-between items-center">
                                                                    <div className="rating flex align-items-center gap-1">
                                                                        {renderBootstrapStars(item?.rating)}
                                                                        <span className="ms-1">
                                                                            {item?.rating} ({item?.userRatingCount})
                                                                        </span>
                                                                    </div>
                                                                    <button type='button' className="button_bg2  rounded-full bg-color-green color_bl recomend_btn" onClick={() => viewDetail(item?.id)}>
                                                                        View Detail
                                                                    </button>
                                                                </div>
                                                                {/* *************** rating_list */}
                                                            </div>
                                                        </div>
                                                        {/* *********** */}
                                                    </div>
                                                    {/* *********** */}
                                                </div>
                                            </SwiperSlide>
                                        </>
                                    );
                                })}
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
