"use client";
import React, { useEffect, useState } from "react";
import "../../../style/searchresult.css";
import HotelDetailContent from "./HotelDetailContent";
import { useQuery } from "@tanstack/react-query";
import { GetAccommodationDetails, GetHotel_Detail, HotelCheckInCheckOut, HotelDetail, searchHotelDetail, searchHotelName } from "@/app/Route/endpoints";
import { useSearchParams } from "next/navigation";
import AboutHotelDetail from "./AboutHotelDetail";
import NearByHotel from "./NearByHotel";
import HotelLocation from "./HotelLocation";
import SearchSidebar from "../SearchSidebar";
import Footer from "@/component/Footer";
import HotelFacilities from "./HotelFacilities";
import ImageGallery from "./ImageGallery";
import { IoShareOutline } from "react-icons/io5";
// Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { IoLocationOutline } from "react-icons/io5";
// Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { EffectFade, Navigation, Pagination } from "swiper/modules";
import Blogs from "@/Components/HomePage/Blog/Blogs";
import Header from "@/component/Header";
import HotelReviews from "./HotelReviews";
import { TbWorld } from "react-icons/tb";
import Link from "next/link";
import { PiPhoneLight } from "react-icons/pi";
import ViewPriceDetail from "./ViewPriceDetail";
import HotelAllReview from "./HotelAllReview";
import PopularHotelAroundWorld from "./PopularHotelAroundWorld";
import HotelSearchNearByLocation from "../HotelSearchNearByLocation";
import { FaQ } from "react-icons/fa6";
import FaqSection from "@/Components/HomePage/Faq/FaqSection";
import 'reactjs-popup/dist/index.css';
import Popup from "reactjs-popup";
export default function SearchHotelDetail() {
    const search_detail = useSearchParams();
    const [open, setOpen] = useState(false);
    const code = search_detail.get("hotel");
    const namehotel = search_detail.get("name");
    // const cityhotel = search_detail.get("city");

    const { data: hoteldata } = useQuery({
        queryKey: ["hoteldata", namehotel],
        queryFn: () => searchHotelName(namehotel)
    })
    console.log("code,,,,,,,,,,,,,,,,,", hoteldata?.data?.xotelo?.hotel_key, "ookkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk",);
    const hotelKey = hoteldata?.data?.xotelo?.hotel_key;
    // ********************************************************** price data
    const { data: PriceData } = useQuery({
        queryKey: ["pricedata", hotelKey],
        queryFn: () => HotelCheckInCheckOut(hotelKey)
    })
    console.log("price,,,,,,,,,,,,,,,,,,,,", PriceData);
    const rate = PriceData?.data?.raw?.result?.rates
    console.log(rate, "reatewwwwwwwwwwwwwwww");

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
    const { data, isLoading } = useQuery({
        queryKey: ["gethoteldetail"],
        queryFn: () => GetHotel_Detail(code),

    })
    console.log(data?.data, "data hotel detail ,........... chart ");
    const HotelDetail = data?.data;
    const oneImage = HotelDetail?.photos?.slice(0, 1)?.map((item) => item?.name) || '';
    const longitude = HotelDetail?.location?.longitude;
    const latitude = HotelDetail?.location?.latitude;
    const itemrating = HotelDetail?.rating
    const ratingCount = HotelDetail?.userRatingCount
    const userReviews = HotelDetail?.reviews
    // ****************************************** to fetch the detail of hotel api >>>>>>>>>>>>>>>>>>>>>>>>
    const locationName = (HotelDetail?.displayName?.text ?? HotelDetail?.displayName ?? "").toString().trim();
    const locationAddress = (HotelDetail?.formattedAddress?.text ?? HotelDetail?.formattedAddress ?? "").toString().trim();

    const { data: accommodationData, } = useQuery({
        queryKey: ["getaccommodationprice", locationName, locationAddress],
        queryFn: ({ queryKey }) => {
            const [name, address] = queryKey;
            return GetAccommodationDetails(name, address);
        },
        enabled: Boolean(locationName) && Boolean(locationAddress),
        retry: 0,
    })
    console.log(accommodationData, "accommodation data ,........... ooooooooooooooo ", locationName, locationAddress);

    // *****************************detail of apis
    const hotelDescription = accommodationData?.data?.data?.description;


    const hotelAmenties = accommodationData?.data?.data?.amenities;
    const hotelPricing = accommodationData?.data?.data?.otaPricing;
    console.log(hotelDescription, "hoteldetail?>>>>>>>>>>>>>>>>>>>>>>>>>", hotelAmenties, hotelPricing);


    return (
        <>
            <Header />


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
                        <div className="col-lg-12">
                            <div className="hoteldetail_banner">
                                {/* ********************** header content  */}
                                <div className="content padding_top  ">
                                    <div className="content_p">
                                        <div className="title flex items-center justify-between">
                                            <h2 className="m-0">{HotelDetail?.displayName?.text}</h2>
                                            <div className="icon flex gap-2 items-center pe-5">
                                                <span>
                                                    <img src="/justbuytravel_next/demo/hoteldetail/export.svg" width={18} alt="" />
                                                </span>
                                                <span>
                                                    share
                                                </span>
                                            </div>

                                        </div>

                                    </div>
                                    <div className="hotel_contact_info flex items-center justify-between">
                                        <div className="hotel_contact_link">
                                            <p className="m-0"><span className="rating-stars" style={{ marginRight: 6 }}>
                                                {(() => {
                                                    // Assume first review object for star rendering, fallback to 0
                                                    const rating = itemrating || 0;
                                                    const fullStars = Math.floor(rating);
                                                    const hasHalfStar = rating - fullStars >= 0.5 && rating - fullStars < 1;
                                                    return Array.from({ length: 5 }).map((_, idx) => (
                                                        <span key={idx}>
                                                            {idx < fullStars ? (
                                                                <i className="bi bi-star-fill g_color"></i>
                                                            ) : idx === fullStars && hasHalfStar ? (
                                                                <i className="bi bi-star-half g_color"></i>
                                                            ) : (
                                                                <i className="bi bi-star g_color"></i>
                                                            )}
                                                        </span>
                                                    ));
                                                })()}
                                            </span>
                                                {HotelDetail?.rating} ({ratingCount} reviews )</p>
                                            <ul className="flex p-0 m-0">
                                                <li>
                                                    <span><img src="/justbuytravel_next/demo/hoteldetail/global.svg" width={20} alt="" /></span>
                                                    <span><Link href={""}>visit hotel website</Link></span>
                                                </li>
                                                {/* ******* */}
                                                <li>
                                                    <span>
                                                        <img src="/justbuytravel_next/demo/hoteldetail/location-minus.svg" width={20} alt="" />
                                                    </span>
                                                    <span>
                                                        <Link href={""}>view location</Link>
                                                    </span>
                                                </li>
                                                {/* ************ */}

                                            </ul>

                                        </div>
                                        {/* ***************** */}
                                        <div className="price_hotel flex  gap-3">
                                            <div className="price">
                                                <h4 className="m-0">
                                                    33,457
                                                </h4>
                                                <p className="m-0">hotels.com</p>
                                            </div>
                                            <div className="price_view_detail">
                                                <button className="hotel_detail_button text-white">
                                                    view details
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* **************** end ************ */}

                                {/* Image Gallery */}

                                {/* ******************* desktop view wwwwwwwwwwwwwwwwwwwwww */}
                                <div className="banner_img d-none d-lg-block ">
                                    <div className="container">
                                        {isLoading ? (

                                            <div className="row">
                                                <div className="col-lg-6 p-1">
                                                    <div className="image_head shimmer-container" style={{ minHeight: 410 }}>
                                                        <div className="shimmer" />
                                                    </div>
                                                </div>
                                                <div className="col-lg-6">
                                                    <div className="row">
                                                        {Array.from({ length: 4 }).map((_, i) => (
                                                            <div className="col-lg-6 p-1" key={i}>
                                                                <div className="image_head shimmer-container" style={{ minHeight: 200 }}>
                                                                    <div className="shimmer" />
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>

                                        ) : (
                                            <div className="row ">
                                                <div className="col-lg-8 p-1">
                                                    <div className="image_head side_image_head">
                                                        <img
                                                            style={{ cursor: "pointer" }}
                                                            src={`https://justbuygear.com/justbuytravel-api/get-photo.php?name=${oneImage}`}
                                                            alt="" onClick={() => setOpen(true)}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="col-lg-4">
                                                    <div className="row">
                                                        {HotelDetail?.photos?.slice(1, 4).map((item, index) => (
                                                            <div className="col-lg-12 p-1" key={index}>
                                                                <div className="image_head">
                                                                    <img
                                                                        style={{ cursor: "pointer" }}
                                                                        onClick={() => setOpen(true)}
                                                                        src={`https://justbuygear.com/justbuytravel-api/get-photo.php?name=${item?.name}`}
                                                                        alt=""
                                                                    />
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* ****************************************** popup show >>>>>>>>>>>>>>> */}
                                <Popup open={open} onClose={() => setOpen(false)} contentStyle={{ width: "100%" }}  >

                                    <div className="container">
                                        <div className="row ">
                                            <div className="col-lg-12">
                                                <div className="popup_header">
                                                    <div className="header">

                                                        <div className="header-content   ">
                                                            <div className="content_p flex justify-between w-full items-center">
                                                                <div className="title">
                                                                    <h2 className="m-0">{HotelDetail?.displayName?.text}</h2>
                                                                    <p className="m-0"><span className="rating-stars" style={{ marginRight: 6 }}>
                                                                        {(() => {
                                                                            // Assume first review object for star rendering, fallback to 0
                                                                            const rating = itemrating || 0;
                                                                            const fullStars = Math.floor(rating);
                                                                            const hasHalfStar = rating - fullStars >= 0.5 && rating - fullStars < 1;
                                                                            return Array.from({ length: 5 }).map((_, idx) => (
                                                                                <span key={idx}>
                                                                                    {idx < fullStars ? (
                                                                                        <i className="bi bi-star-fill g_color"></i>
                                                                                    ) : idx === fullStars && hasHalfStar ? (
                                                                                        <i className="bi bi-star-half g_color"></i>
                                                                                    ) : (
                                                                                        <i className="bi bi-star g_color"></i>
                                                                                    )}
                                                                                </span>
                                                                            ));
                                                                        })()}
                                                                    </span>
                                                                        {HotelDetail?.rating} ({ratingCount} reviews )</p>

                                                                </div>
                                                                <div className="price_hotel flex items-center gap-3">
                                                                    <div className="price">
                                                                        <h4 className="m-0">
                                                                            33,457
                                                                        </h4>
                                                                        <p className="m-0">hotels.com</p>
                                                                    </div>
                                                                    <div className="price_view_detail">
                                                                        <button className="hotel_detail_button text-white">
                                                                            view details
                                                                        </button>
                                                                    </div>
                                                                    <div className="popup_header_close ">
                                                                        <img src="/justbuytravel_next/demo/popup/add.png" style={{ cursor: "pointer" }} alt="" onClick={() => setOpen(false)} />
                                                                    </div>
                                                                </div>
                                                                {/* ************ */}

                                                            </div>

                                                        </div>
                                                        <hr className="m-0"></hr>
                                                    </div>
                                                    {/* ********************************************** */}
                                                    <div className="row popup_padding">
                                                        <div className="col-lg-3">
                                                            <div className="popup_sidebar">
                                                                <div className="item">
                                                                    <div className="content_item flex flex-col gap-5">
                                                                        {/* ***** */}
                                                                        <div className="button">
                                                                            <button className="text-capitalize">
                                                                                back to album
                                                                            </button>
                                                                        </div>
                                                                        {/* ***** */}
                                                                        <h3 className="m-0">
                                                                            Management
                                                                        </h3>
                                                                        <div className="content_detail">
                                                                            <p className="m-0">
                                                                                Deluxe King Park View
                                                                            </p>
                                                                            <p className="m-0">
                                                                                Posted: October 2024
                                                                            </p>
                                                                        </div>
                                                                        <Link href={""}>
                                                                            View hotel websites
                                                                        </Link>

                                                                    </div>
                                                                    {/* ********** */}
                                                                    <div className="popup_banner" onClick={() => setOpen(false)} >
                                                                        <img src="/justbuytravel_next/demo/popup/popupbanner.png" width={300} height={250} alt="" onClick={() => setOpen(false)} />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {/* ****************** */}
                                                        <div className="col-lg-9">
                                                            <div className="popupsidebar">
                                                                <div className="hotel_detail_slider popup_slider_item ">
                                                                    {isLoading ? (
                                                                        <div className="slider">
                                                                            {Array.from({ length: 1 }).map((_, i) => (
                                                                                <div
                                                                                    key={i}
                                                                                    className="shimmer-container"
                                                                                    style={{ height: 220, marginBottom: 10 }}
                                                                                >
                                                                                    <div className="shimmer" />
                                                                                </div>
                                                                            ))}
                                                                        </div>
                                                                    ) : (
                                                                        <Swiper
                                                                            spaceBetween={30}
                                                                            effect="fade"
                                                                            navigation
                                                                            modules={[Navigation, Pagination, EffectFade]}
                                                                            className="mySwiper"
                                                                        >
                                                                            {HotelDetail?.photos?.map((item, index) => (
                                                                                <SwiperSlide key={index}>
                                                                                    <div className="banner_img mobile_banner popup_slider_img ">
                                                                                        <img
                                                                                            src={`https://justbuygear.com/justbuytravel-api/get-photo.php?name=${item?.name}`}
                                                                                            width="100%"
                                                                                            className="card_rounded"
                                                                                        />
                                                                                    </div>
                                                                                </SwiperSlide>
                                                                            ))}
                                                                        </Swiper>
                                                                    )}
                                                                </div>

                                                            </div>

                                                        </div>
                                                    </div>

                                                </div>
                                            </div>



                                        </div>
                                    </div>


                                </Popup>



                                {/* ********************** mobile viewwwwwwwwwwwwwwwwwwwww  */}
                                <div className="hotel_detail_slider d-block d-lg-none">
                                    {isLoading ? (
                                        <div className="slider">
                                            {Array.from({ length: 1 }).map((_, i) => (
                                                <div
                                                    key={i}
                                                    className="shimmer-container"
                                                    style={{ height: 220, marginBottom: 10 }}
                                                >
                                                    <div className="shimmer" />
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <Swiper
                                            spaceBetween={30}
                                            effect="fade"
                                            navigation
                                            modules={[Navigation, Pagination, EffectFade]}
                                            className="mySwiper"
                                        >
                                            {HotelDetail?.photos?.map((item, index) => (
                                                <SwiperSlide key={index}>
                                                    <div className="banner_img mobile_banner ">
                                                        <img
                                                            src={`https://justbuygear.com/justbuytravel-api/get-photo.php?name=${item?.name}`}
                                                            width="100%"
                                                            className="card_rounded"
                                                        />
                                                    </div>
                                                </SwiperSlide>
                                            ))}
                                        </Swiper>
                                    )}
                                </div>

                                {/* ******************** end ******* */}
                            </div>
                        </div>

                    </div>
                </div>
            </section>
            {/* ******************* */}

            <ViewPriceDetail PriceRate={PriceData} />
            <HotelAllReview reviews={userReviews} />
            <HotelLocation lat={latitude} long={longitude} load={isLoading} />
            <PopularHotelAroundWorld lat={latitude} long={longitude} />
            <HotelSearchNearByLocation lat={latitude} long={longitude} />
            <Blogs />
            <FaqSection />
            {/* ************************************* on mobile view shoqw section */}

            {/* ******************************************************** */}
            {/* <div className="container">
                <div className="row matrix_fix">
                    <div className="col-lg-12 ">
                        <div className=" content_box_detail  rounded-2xl border border-gray-300">
                            <AboutHotelDetail detail={hotelDescription} load={isLoading} />

                            <HotelFacilities hotelAmenties={hotelAmenties} load={isLoading} />
                            <HotelReviews reviews={userReviews} />

                            <NearByHotel places={near_by_places} />

                            <HotelLocation lat={latitude} long={longitude} load={isLoading} />
                        </div>
                    </div>
                    <div className="col-lg-5 order-first order-lg-last">
                        <SearchSidebar hotelPricing={hotelPricing} load={isLoading} />
                    </div>
                </div>
            </div> */}
            <Footer />
        </>
    );
}
