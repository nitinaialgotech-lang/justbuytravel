"use client";
import React, { useEffect, useState, useMemo } from "react";
import "../../../style/searchresult.css";
import HotelDetailContent from "./HotelDetailContent";
import { useQuery } from "@tanstack/react-query";
import { GetHotel_Detail, HotelCheckInCheckOut, HotelDetail, searchHotelDetail, searchHotelName, GetSerpHotelDetail } from "@/app/Route/endpoints";
import { useParams, useSearchParams } from "next/navigation";
import AboutHotelDetail from "./AboutHotelDetail";
import NearByHotel from "./NearByHotel";
import HotelLocation from "./HotelLocation";
import Footer from "@/component/Footer";
import HotelFacilities from "./HotelFacilities";
import ImageGallery from "./ImageGallery";
import { IoShareOutline } from "react-icons/io5";
// Swiper React components
import { useRef } from "react";
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
import HotelSearchIconicPlaces from "../HotelSearchIconicPlaces";
import { FaQ } from "react-icons/fa6";
import FaqSection from "@/Components/HomePage/Faq/FaqSection";
import 'reactjs-popup/dist/index.css';
import Popup from "reactjs-popup";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { useCurrency } from "@/context/CurrencyContext";
import { getHotelIdFromSlug } from "@/app/utils/seo";
import { getAssetPath } from "@/app/utils/assetPath";

export default function SearchHotelDetail() {
    const { formatPrice, currency } = useCurrency();
    const search_detail = useSearchParams();
    const params = useParams();
    const [open, setOpen] = useState(false);
    const slugParam = params?.hotel || params?.slug;
    const codeFromSlug = getHotelIdFromSlug(slugParam);
    const codeFromQuery =
        search_detail.get("hotel") ||
        search_detail.get("id") ||
        search_detail.get("code");
    const code = codeFromQuery || codeFromSlug;
    // const cityhotel = search_detail.get("city");

    // Date state for pricing - default to today and 7 days later
    const getTodayDate = () => new Date().toISOString().split('T')[0];
    const getSevenDaysLater = () => {
        const date = new Date();
        date.setDate(date.getDate() + 1);
        return date.toISOString().split('T')[0];
    };

    const [searchCheckin, setSearchCheckin] = useState(getTodayDate());
    const [searchCheckout, setSearchCheckout] = useState(getSevenDaysLater());

    // ****************************************************************************************************************
    const ShimmerCard = () => (
        <div className="hoteldetail_banner pt-5">

            <div className="content">
                <p className="m-0 flex gap-2">
                    <span className="shimmer-text shimmer-text-120x20"></span>
                    <span className="shimmer-text shimmer-text-80x20"></span>
                </p>
                <h2 className="pb-4">
                    <span className="shimmer-text shimmer-text-60p-40"></span>
                </h2>
            </div>


            <div className="banner_img d-none d-lg-block">
                <div className="row px-3">
                    <div className="col-lg-6 p-1">
                        <div className="image_head shimmer-container shimmer-min-250">
                            <div className="shimmer"></div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="row">
                            {Array.from({ length: 4 }).map((_, i) => (
                                <div className="col-lg-6 p-1" key={i}>
                                    <div className="image_head shimmer-container shimmer-min-120">
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
                    <div className="shimmer-container shimmer-mobile-card">
                        <div className="shimmer"></div>
                    </div>
                    <div className="shimmer-container shimmer-mobile-card">
                        <div className="shimmer"></div>
                    </div>
                </div>
            </div>
        </div>
    )
    /************************************************************************** */
    const { data, isLoading } = useQuery({
        queryKey: ["gethoteldetail", code],
        queryFn: () => GetHotel_Detail(code),
        enabled: Boolean(code),
        retry: 1,
    })
    const HotelDetail = data?.data;
    const oneImage = HotelDetail?.photos?.slice(0, 1)?.map((item) => item?.name) || '';
    const longitude = HotelDetail?.location?.longitude;
    const latitude = HotelDetail?.location?.latitude;
    const itemrating = HotelDetail?.rating;
    const ratingCount = HotelDetail?.userRatingCount;
    const userReviews = HotelDetail?.reviews;
    // ****************************************** to fetch the detail of hotel api >>>>>>>>>>>>>>>>>>>>>>>>
    const locationName = (HotelDetail?.displayName?.text ?? HotelDetail?.displayName ?? "").toString().trim();
    const locationAddress = (HotelDetail?.formattedAddress?.text ?? HotelDetail?.formattedAddress ?? "").toString().trim();
    const isHotelLodging = Array.isArray(HotelDetail?.types)
        ? HotelDetail.types.includes("lodging")
        : false;

    // ****************************************** derive hotel amenities from Google Places amenityOptions
    const hotelAmenties = useMemo(() => {
        const rawOptions = HotelDetail?.amenityOptions;
        if (!Array.isArray(rawOptions) || rawOptions.length === 0) return [];

        const labels = rawOptions
            .map((opt) => {
                if (!opt) return null;

                // Prefer any human-readable text Google provides
                const rawName =
                    opt.displayName?.text ||
                    opt.localizedText ||
                    opt.amenityType ||
                    opt.type ||
                    opt.category ||
                    null;

                if (!rawName) return null;

                const label = rawName
                    .toString()
                    .replace(/_/g, " ")
                    .replace(/\s+/g, " ")
                    .trim()
                    .toLowerCase()
                    .replace(/\b\w/g, (c) => c.toUpperCase());

                return label || null;
            })
            .filter(Boolean);

        // Deduplicate while preserving order
        return Array.from(new Set(labels));
    }, [HotelDetail]);

    // ********************************************************** Fetch hotel key for pricing (testing.php – hotels only, not nearby restaurants/iconic places)
    const { data: hoteldata } = useQuery({
        queryKey: ["hoteldata", locationName, isHotelLodging],
        queryFn: () => searchHotelName(locationName, locationAddress),
        enabled: Boolean(locationName) && isHotelLodging,
        retry: 1,
    })
    console.log(data, "hoteldataaaa");
    const hotelKey = hoteldata?.data?.xotelo?.hotel_key;

    // ********************************************************** price data
    const { data: PriceData, isLoading: isPriceLoading, isFetching: isPriceFetching } = useQuery({
        queryKey: ["pricedata", hotelKey, searchCheckin, searchCheckout, currency],
        queryFn: () => {
            return HotelCheckInCheckOut(hotelKey, searchCheckin, searchCheckout, currency);
        },
        // Only run when we actually have a resolved hotel key
        // and both check-in and check-out dates.
        enabled: Boolean(hotelKey && searchCheckin && searchCheckout),
        retry: 1,
        cacheTime: 0, // Don't cache results
        staleTime: 0, // Always consider data stale
        refetchOnMount: true,
        refetchOnWindowFocus: false,
    })
    const rate = PriceData?.data?.raw?.result?.rates;

    // Best price from API (lowest total in USD). rates[].rate is per-night number; support rate.amount if API varies.
    const { bestPriceUsd, bestProvider } = useMemo(() => {
        const rates = rate || [];
        if (rates.length === 0) return { bestPriceUsd: null, bestProvider: null };
        const nights = Math.max(1, Math.ceil((new Date(searchCheckout) - new Date(searchCheckin)) / (1000 * 60 * 60 * 24)));
        let minTotal = Infinity;
        let provider = null;
        for (const r of rates) {
            const rateNum = typeof r?.rate === "number" ? r.rate : r?.rate?.amount;
            const total = (Number(rateNum) || 0) * nights + (Number(r?.tax) || 0);
            if (total < minTotal && total > 0) {
                minTotal = total;
                provider = r?.name ?? null;
            }
        }
        return { bestPriceUsd: minTotal === Infinity ? null : minTotal, bestProvider: provider };
    }, [rate, searchCheckin, searchCheckout]);

    // ********************************************************** SerpAPI hotel details (only for lodging / hotel detail page)
    const { data: serpHotelData } = useQuery({
        queryKey: ["serpHotelDetail", locationName, searchCheckin, searchCheckout, currency],
        queryFn: () => GetSerpHotelDetail(locationName, searchCheckin, searchCheckout, 2, currency),
        enabled: Boolean(locationName) && isHotelLodging,
        retry: 1,
    });
    const serpHotelDetail = serpHotelData?.data.raw;
    console.log(serpHotelDetail, "serpHotelDetail");

    // ****************************************** Normalize & map partner logos (Booking, Expedia, Hotels, Trip only)
    const normalizePartnerSource = (source) => {
        if (!source) return "";
        const value = source.toString().toLowerCase();

        if (value.includes("booking")) return "Booking";
        if (value.includes("expedia")) return "Expedia";
        if (value.includes("hotel")) return "Hotels";
        if (value.includes("trip")) return "Trip";

        return source;
    };

    const PARTNER_LOGOS = {
        Booking: getAssetPath("/logo/hoteldetail/Booking.com_logo.svg.png"),
        Expedia: getAssetPath("/logo/hoteldetail/expedia_logo.svg"),
        Hotels: getAssetPath("/logo/hoteldetail/hotelsdotcom-logo.jpg"),
        Trip: getAssetPath("/logo/hoteldetail/tripcom.webp"),
    };

    // Inspect full SerpAPI response in the browser devtools console
    useEffect(() => {
        if (serpHotelDetail) {
            // eslint-disable-next-line no-console
            console.log("SerpAPI hotel detail (serpHotelDetail):", serpHotelDetail);
        }
    }, [serpHotelDetail]);

    // ****************************************** Derive human-friendly description (prefer SerpAPI, fallback to Google Places)
    const hotelDescription = useMemo(() => {
        const serpDetails = serpHotelDetail?.description;
        return (
            serpDetails ||
            (locationAddress ? `About ${locationName} – ${locationAddress}` : "") ||
            ""
        );
    }, [serpHotelDetail?.description, locationAddress, locationName]);

    // ****************************************** Merge amenities from Google Places & SerpAPI
    const serpAmenities = useMemo(() => {
        const raw =
            serpHotelDetail?.amenities || [];
        if (!Array.isArray(raw)) return [];

        const labels = raw
            .map((item) => {
                if (!item) return null;
                const name =
                    (typeof item === "string" ? item : item.name || item.title || item.type) ||
                    null;
                if (!name) return null;
                const label = name
                    .toString()
                    .replace(/_/g, " ")
                    .replace(/\s+/g, " ")
                    .trim()
                    .toLowerCase()
                    .replace(/\b\w/g, (c) => c.toUpperCase());
                return label || null;
            })
            .filter(Boolean);

        return Array.from(new Set(labels));
    }, [serpHotelDetail]);

    const combinedAmenities = useMemo(() => {
        const base = Array.isArray(hotelAmenties) ? hotelAmenties : [];
        const extra = Array.isArray(serpAmenities) ? serpAmenities : [];
        return Array.from(new Set([...base, ...extra]));
    }, [hotelAmenties, serpAmenities]);

    // Handler for date search from ViewPriceDetail component
    const handleSearchDates = async (checkin, checkout) => {
        // Update state – this will automatically trigger the
        // pricing query once a valid hotelKey is available.
        setSearchCheckin(checkin);
        setSearchCheckout(checkout);
    };

    // ********************************** auto scroll 
    const priceSectionRef = useRef(null);
    const [mounted, setMounted] = useState(false);
    const slowScrollTo = (targetY, duration = 1200) => {
        const startY = window.pageYOffset;
        const distance = targetY - startY;
        let startTime = null;

        const easeInOutCubic = (t) =>
            t < 0.5
                ? 4 * t * t * t
                : 1 - Math.pow(-2 * t + 2, 3) / 2;

        const animation = (currentTime) => {
            if (!startTime) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);
            const ease = easeInOutCubic(progress);

            window.scrollTo(0, startY + distance * ease);

            if (timeElapsed < duration) {
                requestAnimationFrame(animation);
            }
        };

        requestAnimationFrame(animation);
    };
    // *************************************
    const handleScrollToPrice = () => {
        if (!priceSectionRef.current) return;
        setTimeout(() => {
            priceSectionRef.current?.classList.add("pulse");
        }, 1500);

        const headerOffset = 80; // sticky header height
        const elementPosition =
            priceSectionRef.current.getBoundingClientRect().top +
            window.pageYOffset;

        slowScrollTo(elementPosition - headerOffset, 1500); // 👈 slower = bigger number
    };

    useEffect(() => {
        setMounted(true);
    }, []);
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
                                        {/* ****************** mobile show modall */}
                                        <div className="mobile_title d-block d-lg-none ">
                                            <div className="mobile_top_bar flex justify-between items-center">
                                                <div className="back">
                                                    <MdOutlineKeyboardArrowLeft />
                                                </div>
                                                <div className="mobile_share_icon">
                                                    <div className="icon flex gap-2 items-center ">
                                                        <span>
                                                            <img src={getAssetPath("/hoteldetail/export.svg")} width={18} alt="" />
                                                        </span>
                                                        <span className="text-black">
                                                            share
                                                        </span>
                                                    </div>
                                                </div>

                                            </div>


                                        </div>
                                        {/* ******************** end mobile view */}
                                        <div className="title flex items-center justify-between">
                                            <h2 className="m-0 hotel_botom_margin ">{HotelDetail?.displayName?.text}</h2>
                                            <div className="icon flex gap-2 items-center d-none d-lg-block">
                                                <span>
                                                    <img src={getAssetPath("/hoteldetail/export.svg")} width={18} alt="" />
                                                </span>
                                                <span className="">
                                                    share
                                                </span>
                                            </div>

                                        </div>

                                    </div>
                                    <div className="hotel_contact_info flex items-center justify-between">
                                        <div className="hotel_contact_link hotel_botom_margin ">
                                            <p className="m-0"><span className="rating-stars">
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
                                            <ul className="flex p-0 m-0 hotel_botom_margin">
                                                <li>
                                                    <span><img src={getAssetPath("/hoteldetail/global.svg")} width={20} alt="" /></span>
                                                    <span><Link href={""}>visit hotel website</Link></span>
                                                </li>
                                                {/* ******* */}
                                                <li>
                                                    <span>
                                                        <img src={getAssetPath("/hoteldetail/location-minus.svg")} width={20} alt="" />
                                                    </span>
                                                    <span>
                                                        <Link href={""}>view location</Link>
                                                    </span>
                                                </li>
                                                {/* ************ */}

                                            </ul>

                                        </div>
                                        {/* ***************** price section – hotels only, hidden for iconic places & nearby restaurants */}
                                        {isHotelLodging && (
                                            <div className="price_hotel flex  gap-3">
                                                <div className="price">
                                                    <h4 className="m-0">
                                                        {bestPriceUsd != null ? formatPrice(bestPriceUsd) : "—"}
                                                    </h4>
                                                    <p className="m-0">{bestProvider || "Best price"}</p>
                                                </div>
                                                <div className="price_view_detail">
                                                    <button className="hotel_detail_button text-white" onClick={handleScrollToPrice}>
                                                        View Deals
                                                    </button>
                                                </div>
                                            </div>
                                        )}
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
                                                    <div className="image_head shimmer-container shimmer-min-410">
                                                        <div className="shimmer" />
                                                    </div>
                                                </div>
                                                <div className="col-lg-6">
                                                    <div className="row">
                                                        {Array.from({ length: 4 }).map((_, i) => (
                                                            <div className="col-lg-6 p-1" key={i}>
                                                                <div className="image_head shimmer-container shimmer-min-200">
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
                                                            className="cursor-pointer"
                                                            src={`/api/get-photo?name=${oneImage}&maxWidthPx=2400`}
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
                                                                        className="cursor-pointer"
                                                                        onClick={() => setOpen(true)}
                                                                        src={`/api/get-photo?name=${item?.name}&maxWidthPx=300`}
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
                                <Popup open={open} onClose={() => setOpen(false)} className="popup-content-full">

                                    <div className="container">
                                        <div className="row ">
                                            <div className="col-lg-12">
                                                <div className="popup_header">
                                                    <div className="header">

                                                        <div className="header-content   ">
                                                            <div className="content_p flex justify-between w-full items-center">
                                                                <div className="title">
                                                                    <h2 className="m-0">{HotelDetail?.displayName?.text}</h2>
                                                                    <p className="m-0"><span className="rating-stars">
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
                                                                {isHotelLodging ? (
                                                                    <div className="price_hotel flex items-center gap-3">
                                                                        <div className="price">
                                                                            <h4 className="m-0">
                                                                                {bestPriceUsd != null ? formatPrice(bestPriceUsd) : "—"}
                                                                            </h4>
                                                                            <p className="m-0">{bestProvider || "Best price"}</p>
                                                                        </div>
                                                                        <div className="price_view_detail">
                                                                            <button className="hotel_detail_button text-white" onClick={() => { handleScrollToPrice(); setOpen(false); }}>
                                                                                View details
                                                                            </button>
                                                                        </div>
                                                                        <div className="popup_header_close ">
                                                                            <img src={getAssetPath("/popup/add.png")} className="cursor-pointer" alt="" onClick={() => setOpen(false)} />
                                                                        </div>
                                                                    </div>
                                                                ) : (
                                                                    <div className="popup_header_close ">
                                                                        <img src={getAssetPath("/popup/add.png")} className="cursor-pointer" alt="" onClick={() => setOpen(false)} />
                                                                    </div>
                                                                )}
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
                                                                        <img src={getAssetPath("/popup/popupbanner.png")} width={300} height={250} alt="" onClick={() => setOpen(false)} />
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
                                                                                    className="shimmer-container shimmer-slide-220"
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
                                                                                            src={`/api/get-photo?name=${item?.name}&maxWidthPx=1200`}
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
                                                    className="shimmer-container shimmer-slide-220"
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
                                                            src={`/api/get-photo?name=${item?.name}&maxWidthPx=1200`}
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

            {/* ************** Main detail content below gallery: description, amenities & pricing ************** */}
            <section className="detail_page_padding">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">

                            <div className="content_box_detail">
                                <h4 className="mb-4">View prices for your travel dates</h4>

                                {/* Inline date controls for SERP partner prices */}
                                <div className="row g-3 mb-4">
                                    <div className="col-md-4 col-6">
                                        <label htmlFor="serp-checkin" className="form-label text-sm">
                                            Check-in
                                        </label>
                                        <input
                                            id="serp-checkin"
                                            type="date"
                                            className="form-control"
                                            value={searchCheckin}
                                            min={getTodayDate()}
                                            onChange={(e) => setSearchCheckin(e.target.value)}
                                        />
                                    </div>
                                    <div className="col-md-4 col-6">
                                        <label htmlFor="serp-checkout" className="form-label text-sm">
                                            Check-out
                                        </label>
                                        <input
                                            id="serp-checkout"
                                            type="date"
                                            className="form-control"
                                            value={searchCheckout}
                                            min={searchCheckin || getTodayDate()}
                                            onChange={(e) => setSearchCheckout(e.target.value)}
                                        />
                                    </div>
                                    <div className="col-md-4 col-12 d-flex align-items-end">
                                        <button
                                            type="button"
                                            className="hotel_detail_button hotel_mobile_button text-white w-100"
                                            onClick={() => handleSearchDates(searchCheckin, searchCheckout)}
                                        >
                                            Change dates
                                        </button>
                                    </div>
                                </div>

                                <div className="price_wrapper">
                                    {serpHotelDetail?.featured_prices
                                        ?.map((item) => {
                                            const normalizedSource = normalizePartnerSource(item?.source);

                                            if (!["Booking", "Expedia", "Hotels", "Trip"].includes(normalizedSource)) {
                                                return null;
                                            }

                                            return {
                                                ...item,
                                                normalizedSource,
                                            };
                                        })
                                        .filter(Boolean)
                                        .map((item, index) => (
                                            <div
                                                key={index}
                                                className="flex items-center gap-2 mb-3 partners_logo justify-between"
                                            >
                                                <div className="p_logo">
                                                    <img
                                                        src={PARTNER_LOGOS[item.normalizedSource]}
                                                        alt={item.normalizedSource}
                                                    />
                                                </div>
                                                <div className="p_name">
                                                    <span className="text-sm">{item.source}</span>
                                                </div>
                                                <div className="price_rate">
                                                    <span className="text-sm">{item.rate_per_night.lowest}/night</span>
                                                    <button className="btn hotel_detail_button hotel_mobile_button text-white view-price-search-button">View Details</button>
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row matrix_fix">
                        <div className="col-lg-8">
                            <div className="content_box_detail rounded-2xl border border-gray-300 bg-white">
                                <AboutHotelDetail detail={hotelDescription} load={isLoading} />
                                <HotelFacilities hotelAmenties={combinedAmenities} load={isLoading} />
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div
                                ref={mounted ? priceSectionRef : null}
                                className={mounted ? "price-section" : undefined}
                            >
                                <ViewPriceDetail
                                    PriceRate={PriceData}
                                    hotelName={locationName}
                                    hotelAddress={locationAddress}
                                    hotelData={hoteldata?.data}
                                    onSearchDates={handleSearchDates}
                                    isLoadingPrices={isPriceLoading || isPriceFetching}
                                    showPricing={isHotelLodging}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <HotelAllReview reviews={userReviews} />
            <HotelLocation lat={latitude} long={longitude} load={isLoading} />
            <PopularHotelAroundWorld lat={latitude} long={longitude} />
            <HotelSearchNearByLocation
                lat={latitude}
                long={longitude}
                locationName={locationName}
                excludePlaceId={code}
            />
            <HotelSearchIconicPlaces
                lat={latitude}
                long={longitude}
                locationName={locationName}
            />
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
