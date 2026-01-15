"use client";
import React, { useEffect, useState } from "react";
import "../../../style/searchresult.css";
import HotelDetailContent from "./HotelDetailContent";
import { useQuery } from "@tanstack/react-query";
import { HotelDetail } from "@/app/Route/endpoints";
import { useSearchParams } from "next/navigation";
import AboutHotelDetail from "./AboutHotelDetail";
import NearByHotel from "./NearByHotel";
import HotelLocation from "./HotelLocation";
import SearchSidebar from "../SearchSidebar";
import Footer from "@/component/Footer";
import HotelFacilities from "./HotelFacilities";
import ImageGallery from "./ImageGallery";

// Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { EffectFade, Navigation, Pagination } from "swiper/modules";
import Blogs from "@/Components/HomePage/Blog/Blogs";

export default function SearchHotelDetail() {
    const search_detail = useSearchParams();

    const code = search_detail.get("code");
    const hotel_id = search_detail.get("id");

    const { data, isLoading } = useQuery({
        queryKey: ["hoteldetail", hotel_id, code],
        queryFn: () => HotelDetail(hotel_id, code),
    });



    const about_hotel = data?.data?.data?.slice(0, 1)?.map((item) => item);
    const location = data?.data?.data?.slice(0, 1)?.map((item) => item?.location);
    console.log(data, "hote_deytqa>...............................");

    console.log(
        about_hotel?.slice(0, 1)?.map((item) => item?.about),
        "pkpkpkpkkpkpkpkpkpkpkpkpk"
    );
    const hotel = about_hotel?.slice(0, 1)?.map((item) => item?.location);
    /****************************  send atat */
    //  price
    const price = about_hotel?.slice(0, 1)?.map((item) => item?.prices?.items);

    // imgaesd
    // ******* reviews
    const review = about_hotel?.slice(0, 1)?.map((item) => item?.reviews);
    const images = about_hotel?.slice(0, 1)?.map((item) => item?.overview_images);
    // tritle
    const title = about_hotel?.slice(0, 1)?.map((item) => item?.title);
    // grid images
    const grid_img = images?.flat(1)?.filter(Boolean)?.filter((item) => item) || [];

    const lat = location?.map((item) => item?.latitude);
    const long = location?.map((item) => item?.longitude);

    console.log(review, "reviwwwwwww");
    // ***************************** imunitiexs
    const amenities = about_hotel?.slice(0, 1)?.map((item) => item?.about);
    console.log(amenities, ";;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;");
    // ************************ descriptionsss

    const description = amenities?.map((item) => item?.description);
    const sub_desc = amenities?.map((item) => item?.sub_descriptions);
    console.log(description, "des", sub_desc);

    // ****************************************************************************************************************
    const ShimmerCard = () => (
        <div className="hoteldetail_banner pt-5">

            <div className="content">
                <p className="m-0 flex gap-2">
                    <span className="shimmer-text" style={{ width: "120px", height: "20px" }}></span>
                    <span className="shimmer-text" style={{ width: "80px", height: "20px" }}></span>
                </p>
                <h2 className="pb-4">
                    <span className="shimmer-text" style={{ width: "60%", height: "40px", borderRadius: "4px" }}></span>
                </h2>
            </div>


            <div className="banner_img d-none d-lg-block">
                <div className="row px-3">
                    <div className="col-lg-6 p-1">
                        <div className="image_head shimmer-container" style={{ minHeight: "250px" }}>
                            <div className="shimmer"></div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="row">
                            {Array.from({ length: 4 }).map((_, i) => (
                                <div className="col-lg-6 p-1" key={i}>
                                    <div className="image_head shimmer-container" style={{ minHeight: "120px" }}>
                                        <div className="shimmer"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>


            <div className="hotel_detail_slider d-block d-lg-none">
                <div className="slider">
                    <div className="shimmer-container" style={{ width: "100%", height: "200px", marginBottom: "10px" }}>
                        <div className="shimmer"></div>
                    </div>
                    <div className="shimmer-container" style={{ width: "100%", height: "200px", marginBottom: "10px" }}>
                        <div className="shimmer"></div>
                    </div>
                </div>
            </div>
        </div>
    )
    /************************************************************************** */
    return (
        <>

            <style dangerouslySetInnerHTML={{
                __html: `
        @keyframes shimmer {
          0% {
            background-position: -1000px 0;
          }
          100% {
            background-position: 1000px 0;
          }
        }
        .shimmer-container {
          position: relative;
          overflow: hidden;
          border-radius: 12px;
          background-color: #e5e7eb;
        }
        .shimmer {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            #e5e7eb 0%,
            #f3f4f6 50%,
            #e5e7eb 100%
          );
          background-size: 1000px 100%;
          animation: shimmer 2s infinite;
        }
        .shimmer-text {
          display: inline-block;
          border-radius: 4px;
          background-color: #e5e7eb;
          position: relative;
          overflow: hidden;
        }
      ` }} />



            <section className="hoteldetail ">
                <div className="container">
                    <div className="row">
                        {
                            isLoading ?
                                <ShimmerCard /> :

                                <div className="col-lg-12">
                                    <div className="hoteldetail_banner pt-5">
                                        <div className="content">
                                                <span className="rating-stars" style={{ marginRight: 6 }}>
                                                    {(() => {
                                                        // Assume first review object for star rendering, fallback to 0
                                                        const rating = review?.[0]?.value || 0;
                                                        const fullStars = Math.floor(rating);
                                                        const hasHalfStar = rating - fullStars >= 0.5 && rating - fullStars < 1;
                                                        return Array.from({ length: 5 }).map((_, idx) => (
                                                            <span key={idx}>
                                                                {idx < fullStars ? (
                                                                    <i className="bi bi-star-fill"></i>
                                                                ) : idx === fullStars && hasHalfStar ? (
                                                                    <i className="bi bi-star-half"></i>
                                                                ) : (
                                                                    <i className="bi bi-star"></i>
                                                                )}
                                                            </span>
                                                        ));
                                                    })()}
                                                </span>
                                                {review?.[0]?.value ? review[0].value : 0} Review ( based on {review?.[0]?.votes_count || 0} reviews )
                                            <h2 className="pb-4">{title}</h2>
                                        </div>
                                        {/* Image Gallery */}
                                        <div className="banner_img d-none d-lg-block">
                                            <div className="row px-3">
                                                <div className="col-lg-6 p-1">
                                                    <div className="image_head">
                                                        <img src={images?.[0]?.[0] || ''} alt="" />
                                                    </div>
                                                </div>
                                                <div className="col-lg-6">
                                                    <div className="row">
                                                        {grid_img?.slice(1, 5)?.filter(Boolean)?.map((item, index) => {
                                                            return (
                                                                <div className="col-lg-6 p-1" key={index}>
                                                                    <div className="image_head">
                                                                        <img src={item || ''} alt="" />
                                                                    </div>
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* **********************************    on  mobiloe view show cslider  */}
                                        <div className="hotel_detail_slider d-block d-lg-none">
                                            <div className="slider">
                                                <Swiper
                                                    spaceBetween={30}
                                                    effect="fade"
                                                    navigation
                                                    modules={[Navigation, Pagination, EffectFade]}
                                                    className="mySwiper"
                                                    style={{ width: "100%", height: "100%" }}
                                                >
                                                    {grid_img?.filter(Boolean)?.map((item, index) => {
                                                        return (
                                                            <SwiperSlide key={index}>
                                                                <div className="banner_img ">
                                                                    <img
                                                                        src={item || ''}
                                                                        alt=""
                                                                        width={"100%"}
                                                                        className="card_rounded"
                                                                    />
                                                                </div>
                                                            </SwiperSlide>
                                                        );
                                                    })}
                                                </Swiper>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                        }
                    </div>
                </div>
            </section>

            {/* ************************************* on mobile view shoqw section */}

            {/* ******************************************************** */}
            <div className="container">
                <div className="row matrix_fix">
                    <div className="col-lg-7 ">
                        <div className=" my-5 content_box_detail  rounded-2xl border border-gray-300">
                            <AboutHotelDetail
                                detail={description}
                                sub_desc={sub_desc}
                                load={isLoading}
                            />

                            <HotelFacilities amenities={amenities} load={isLoading} />

                            {/* <NearByHotel places={near_by_places} /> */}

                            <HotelLocation lat={lat} long={long} load={isLoading} />
                        </div>
                    </div>
                    <div className="col-lg-5 order-first order-lg-last">
                        <SearchSidebar prices_hotel={price} load={isLoading} title_url={title?.[0]} />
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
