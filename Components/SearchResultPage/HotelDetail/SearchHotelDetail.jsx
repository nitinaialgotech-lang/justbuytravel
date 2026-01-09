
"use client"
import React, { useEffect, useState } from 'react'
import "../../../style/searchresult.css"
import HotelDetailContent from './HotelDetailContent'
import { useQuery } from '@tanstack/react-query'
import { HotelDetail } from '@/app/Route/endpoints'
import { useSearchParams } from 'next/navigation'
import AboutHotelDetail from './AboutHotelDetail';
import NearByHotel from './NearByHotel';
import HotelLocation from './HotelLocation';
import SearchSidebar from '../SearchSidebar'
import Footer from '@/component/Footer'
import HotelFacilities from './HotelFacilities'
import ImageGallery from './ImageGallery'

// Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { EffectFade, Navigation, Pagination } from 'swiper/modules'
import Blogs from '@/Components/HomePage/Blog/Blogs'

export default function SearchHotelDetail() {

    const search_detail = useSearchParams();

    const code = search_detail.get("code");
    const hotel_id = search_detail.get("id");

    const { data } = useQuery({
        queryKey: ["hoteldetail", hotel_id, code],
        queryFn: () => HotelDetail(hotel_id, code)
    })



    const about_hotel = data?.data?.data?.slice(0, 1)?.map((item) => item);
    const location = data?.data?.data?.slice(0, 1)?.map((item) => item?.location);
    console.log(data, "hote_deytqa>...............................");

    console.log(about_hotel?.slice(0, 1)?.map((item) => item?.about), "pkpkpkpkkpkpkpkpkpkpkpkpk");
    const hotel = about_hotel?.slice(0, 1)?.map((item) => item?.location)
    /****************************  send atat */
    //  price 
    const price = about_hotel?.slice(0, 1)?.map((item) => item?.prices?.items)

    // imgaesd 
    // ******* reviews
    const review = about_hotel?.slice(0, 1)?.map((item) => item?.reviews)
    const images = about_hotel?.slice(0, 1)?.map((item) => item?.overview_images);
    // tritle
    const title = about_hotel?.slice(0, 1)?.map((item) => item?.title)
    // grid images 
    const grid_img = images?.flat(1).map((item) => item);


    const lat = location?.map((item) => item?.latitude);
    const long = location?.map((item) => item?.longitude);

    console.log(review, "reviwwwwwww");
    // ***************************** imunitiexs
    const amenities = about_hotel?.slice(0, 1)?.map((item) => item?.about);
    console.log(amenities, ";;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;");
    // ************************ descriptionsss

    const description = amenities?.map((item) => item?.description)
    const sub_desc = amenities?.map((item) => item?.sub_descriptions);
    console.log(description, "des", sub_desc);

    return (
        <>
            <section className='hoteldetail '>
                <div className="container">
                    <div className="row">

                        <div className="col-lg-12">
                            <div className="hoteldetail_banner pt-5">
                                <div className="content">
                                    <p className='m-0'>
                                        ☆
                                        ☆
                                        ☆
                                        ☆
                                        ☆
                                        {review?.map((item) => item?.value)} Review ( based on {review?.map((item) => item?.votes_count)} reviews )
                                    </p>
                                    <h2 className='pb-4'>
                                        {title}
                                    </h2>
                                </div>
                                {/* Image Gallery */}
                                <div className="banner_img d-none d-lg-block">
                                    <div className="row px-3">
                                        <div className="col-lg-6 p-1">
                                            <div className="image_head">
                                                <img src={images?.map((item) => item[0])} alt="" />
                                            </div>



                                        </div>
                                        <div className="col-lg-6">
                                            <div className="row">
                                                {
                                                    grid_img?.slice(1, 5)?.map((item) => {
                                                        return (
                                                            <>
                                                                <div className="col-lg-6 p-1">
                                                                    <div className="image_head">

                                                                        <img src={item} alt="" />
                                                                    </div>
                                                                </div>
                                                            </>
                                                        )
                                                    })
                                                }


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
                                            {
                                                grid_img?.map((item) => {

                                                    return (

                                                        <>

                                                            <SwiperSlide>
                                                                <div className="banner_img ">
                                                                    <img src={item} alt="" width={"100%"} className='card_rounded' />
                                                                </div>
                                                            </SwiperSlide>

                                                        </>

                                                    )
                                                })
                                            }




                                        </Swiper>
                                    </div>
                                </div>

                            </div>



                        </div>
                    </div>
                </div>
            </section >




            {/* ************************************* on mobile view shoqw section */}


            {/* ******************************************************** */}
            <div className="container">


                <div className="row matrix_fix">
                    <div className="col-lg-7 ">

                        <div className=" my-5 content_box_detail  rounded-2xl border border-gray-300">


                            <AboutHotelDetail detail={description} sub_desc={sub_desc} />


                            <HotelFacilities amenities={amenities} />

                            {/* <NearByHotel places={near_by_places} /> */}


                            <HotelLocation lat={lat} long={long} />



                        </div>
                    </div>
                    <div className="col-lg-5 order-first order-lg-last">
                        <SearchSidebar prices_hotel={price} />

                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}
