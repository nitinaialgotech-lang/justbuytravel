"use client";
import React, { useEffect, useState, useMemo } from "react";
import "../../../style/searchresult.css";
import HotelDetailContent from "./HotelDetailContent";
import { useQuery } from "@tanstack/react-query";
import { GetHotel_Detail, HotelDetail, searchHotelDetail, GetSerpHotelDetail, GetAiModal } from "@/app/Route/endpoints";
import { useParams, useSearchParams, usePathname } from "next/navigation";
import AboutHotelDetail from "./AboutHotelDetail";
import SerpAiModalContent from "./SerpAiModalContent";
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
import HotelAllReview from "./HotelAllReview";
import PopularHotelAroundWorld from "./PopularHotelAroundWorld";
import HotelSearchNearByLocation from "../HotelSearchNearByLocation";
import HotelSearchIconicPlaces from "../HotelSearchIconicPlaces";
import HotelSerpDataSection from "./HotelSerpDataSection";
import { FaQ } from "react-icons/fa6";
import FaqSection from "@/Components/HomePage/Faq/FaqSection";
import GalleryModal from "./GalleryModal";
import { MdOutlineKeyboardArrowLeft, MdExpandMore, MdExpandLess } from "react-icons/md";
import { LuBedDouble, LuBedSingle, LuBed, LuHotel, LuHouse, LuWaves, LuTreePalm } from "react-icons/lu";
import { useCurrency } from "@/context/CurrencyContext";
import { getHotelIdFromSlug, createHotelSlug } from "@/app/utils/seo";
import { saveRecentlyViewedProperty } from "@/app/utils/recentlyViewed";
import { getAssetPath } from "@/app/utils/assetPath";
import { AFFILIATE_BASES } from "@/lib/affiliateBases";
import { buildAffiliateLinkWithSubId } from "@/lib/tpLink";
import { format, differenceInDays } from "date-fns";
import { SlCalender } from "react-icons/sl";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function SearchHotelDetail() {
    const { formatPrice, currency } = useCurrency();
    const search_detail = useSearchParams();
    const params = useParams();
    const [galleryOpen, setGalleryOpen] = useState(false);
    const [galleryInitialIndex, setGalleryInitialIndex] = useState(0);
    const slugParam = params?.hotel || params?.slug;
    const codeFromSlug = getHotelIdFromSlug(slugParam);
    const codeFromQuery =
        search_detail.get("hotel") ||
        search_detail.get("id") ||
        search_detail.get("code");
    const code = codeFromQuery || codeFromSlug;
    // const cityhotel = search_detail.get("city");

    // Date state for pricing - default to 3 and 4 days from today
    const getDefaultCheckin = () => {
        const date = new Date();
        date.setDate(date.getDate() + 3);
        return date.toISOString().split('T')[0];
    };
    const getDefaultCheckout = () => {
        const date = new Date();
        date.setDate(date.getDate() + 4);
        return date.toISOString().split('T')[0];
    };

    const [searchCheckin, setSearchCheckin] = useState(() => getDefaultCheckin());
    const [searchCheckout, setSearchCheckout] = useState(() => getDefaultCheckout());
    const [expandedPartners, setExpandedPartners] = useState(new Set());
    const [calendarOpen, setCalendarOpen] = useState(false);
    const datePickerWrapperRef = useRef(null);
    const [monthsShown, setMonthsShown] = useState(2);
    const [isMobileView, setIsMobileView] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            const mobile = window.innerWidth < 768;
            setMonthsShown(mobile ? 1 : 2);
            setIsMobileView(mobile);
        };
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    const startDate = searchCheckin ? new Date(searchCheckin) : null;
    const endDate = searchCheckout ? new Date(searchCheckout) : null;

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (calendarOpen && datePickerWrapperRef.current && !datePickerWrapperRef.current.contains(e.target)) {
                setCalendarOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [calendarOpen]);

    const handleRangeChange = ([start, end]) => {
        if (start) setSearchCheckin(format(start, "yyyy-MM-dd"));
        if (end) {
            setSearchCheckout(format(end, "yyyy-MM-dd"));
        } else {
            // User has only selected check-in; clear checkout until they pick it
            setSearchCheckout("");
        }
    };

    const dateRange = {
        from: searchCheckin ? new Date(searchCheckin) : undefined,
        to: searchCheckout ? new Date(searchCheckout) : undefined,
    };
    const nightsCount = dateRange?.from && dateRange?.to
        ? Math.max(1, differenceInDays(dateRange.to, dateRange.from))
        : null;

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

    // Save to recently viewed when hotel loads (lodging only)
    useEffect(() => {
        if (!HotelDetail || !code || !isHotelLodging) return;
        const name = (HotelDetail?.displayName?.text ?? HotelDetail?.displayName ?? HotelDetail?.name ?? "").toString().trim();
        if (!name) return;
        const slug = createHotelSlug(name, code);
        saveRecentlyViewedProperty({
            id: code,
            name,
            slug,
            address: (HotelDetail?.formattedAddress?.text ?? HotelDetail?.formattedAddress ?? "").toString().trim() || undefined,
        });
    }, [HotelDetail, code, isHotelLodging]);

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

    // ********************************************************** SerpAPI hotel details (only for lodging / hotel detail page)
    // Currency excluded from queryKey – details (address, amenities, reviews) must not refetch when currency changes.
    // Prices are fetched in USD and converted client-side via formatPrice.
    const { data: serpHotelData, isLoading: isSerpPriceLoading } = useQuery({
        queryKey: ["serpHotelDetail", locationName, searchCheckin, searchCheckout],
        queryFn: () => GetSerpHotelDetail(locationName, searchCheckin, searchCheckout, 2, "USD"),
        enabled: Boolean(locationName) && isHotelLodging && Boolean(searchCheckin) && Boolean(searchCheckout),
        retry: 1,
        staleTime: 5 * 60 * 1000,
        gcTime: 5 * 60 * 1000,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
    });
    const isSerpPriceBusy = isSerpPriceLoading;
    const apiResponse = serpHotelData?.data;
    const serpHotelDetail = apiResponse?.raw ?? apiResponse?.details ?? apiResponse?.property;
    const rawPrices = serpHotelDetail?.featured_prices || serpHotelDetail?.prices || [];

    // Gallery images: prefer Google Places photos, fallback to SerpAPI images
    const galleryImages = useMemo(() => {
        const googlePhotos = HotelDetail?.photos;
        if (Array.isArray(googlePhotos) && googlePhotos.length > 0) {
            return googlePhotos.map((p) => ({ type: "google", name: p?.name })).filter((p) => p.name);
        }
        const serpImages = serpHotelDetail?.images || apiResponse?.details?.images;
        if (Array.isArray(serpImages) && serpImages.length > 0) {
            return serpImages.map((img) => {
                const url = typeof img === "string" ? img : img?.original_image || img?.original || img?.url || img?.thumbnail;
                return url ? { type: "url", url } : null;
            }).filter(Boolean);
        }
        return [];
    }, [HotelDetail?.photos, serpHotelDetail?.images, apiResponse?.details?.images]);
    const hasPriceData = Array.isArray(rawPrices) && rawPrices.length > 0;
    const propertyNotFound = apiResponse?.found === false && !hasPriceData;

    // Only show OTAs with affiliate accounts: Booking.com, Expedia, Trip.com
    const AFFILIATE_PARTNERS = ["Booking", "Expedia", "Trip"];

    const normalizePartnerSource = (source) => {
        if (!source) return "";
        const value = source.toString().toLowerCase();
        // Exact matches only – avoid false positives (e.g. "Hotel Booking Zone", "Cleartrip.com", "MakeMyTrip.com")
        if (value.includes("booking.com")) return "Booking";
        if (value.includes("expedia")) return "Expedia";
        if (value.includes("trip.com") && !value.includes("cleartrip") && !value.includes("makemytrip")) return "Trip";
        return null;
    };

    // Merge featured_prices and prices – if an OTA is missing from featured_prices, pick it from prices
    const filteredPartnerPrices = useMemo(() => {
        const featured = Array.isArray(serpHotelDetail?.featured_prices) ? serpHotelDetail.featured_prices : [];
        const prices = Array.isArray(serpHotelDetail?.prices) ? serpHotelDetail.prices : [];
        const allItems = [...featured, ...prices]
            .map((item) => {
                const normalizedSource = normalizePartnerSource(item?.source);
                const hasDeal = Boolean(
                    (Array.isArray(item?.discount_remarks) && item.discount_remarks.length > 0) ||
                    item?.original_rate_per_night?.lowest != null ||
                    item?.original_total_rate?.lowest != null
                );
                return { ...item, normalizedSource: normalizedSource || item?.source || "Other", hasDeal };
            })
            .filter((item) => AFFILIATE_PARTNERS.includes(item.normalizedSource));

        // Deduplicate by OTA: prefer featured_prices, then first from prices
        const seen = new Set();
        const deduped = allItems.filter((item) => {
            const key = item.normalizedSource;
            if (seen.has(key)) return false;
            seen.add(key);
            return true;
        });

        // Sort: deals first (hasDeal), then by lowest price
        return deduped.sort((a, b) => {
            if (a.hasDeal && !b.hasDeal) return -1;
            if (!a.hasDeal && b.hasDeal) return 1;
            const getNum = (x) => {
                const t = x.total_rate?.lowest ?? x.rate_per_night?.lowest;
                return typeof t === "number" ? t : parseFloat(String(t || "").replace(/[^0-9.]/g, "")) || Infinity;
            };
            return getNum(a) - getNum(b);
        });
    }, [serpHotelDetail?.featured_prices, serpHotelDetail?.prices]);

    // Best price for top: prefer SerpAPI (matches deal section), fallback to PriceData; show provider from API
    const { displayBestPrice, displayBestProvider, bestDealIndex } = useMemo(() => {
        if (filteredPartnerPrices.length > 0) {
            const nights = nightsCount || 1;
            let best = null;
            let bestIdx = -1;
            let minTotal = Infinity;
            for (let i = 0; i < filteredPartnerPrices.length; i++) {
                const item = filteredPartnerPrices[i];
                let total = item.total_rate?.lowest;
                if (total == null) {
                    const perNight = item.rate_per_night?.lowest;
                    total = perNight != null ? perNight * nights : null;
                }
                const num = typeof total === "number" ? total : (total ? parseFloat(String(total).replace(/[^0-9.]/g, "")) : null);
                if (num != null && num > 0 && num < minTotal) {
                    minTotal = num;
                    best = item;
                    bestIdx = i;
                }
            }
            if (best) {
                const provider = best.source || best.normalizedSource || null;
                return {
                    displayBestPrice: minTotal,
                    displayBestProvider: provider || "Best price",
                    bestDealIndex: bestIdx,
                };
            }
        }
        return {
            displayBestPrice: null,
            displayBestProvider: "Best price",
            bestDealIndex: -1,
        };
    }, [filteredPartnerPrices, nightsCount]);

    const aiModalQuery = [locationName, locationAddress].filter(Boolean).join(" ");
    const { data: aimodal } = useQuery({
        queryKey: ["aimodal", aiModalQuery],
        queryFn: () => GetAiModal("About " + aiModalQuery),
        enabled: Boolean(aiModalQuery),
        retry: 1,
    });

    const PARTNER_LOGOS = {
        Booking: getAssetPath("/logo/hoteldetail/Booking.com_logo.svg.png"),
        Expedia: getAssetPath("/logo/hoteldetail/expedia_logo.svg"),
        Trip: getAssetPath("/logo/hoteldetail/tripcom.webp"),
    };

    // Full address string reused for affiliate / search URLs
    const fullAddress = [locationName, locationAddress].filter(Boolean).join(", ").trim() || locationName || locationAddress || "";

    const pathname = usePathname() || "/";

    const buildAffiliateLink = (affiliateBase, hotelUrl) => {
        if (!hotelUrl) return null;
        if (!affiliateBase) return hotelUrl;
        return buildAffiliateLinkWithSubId(affiliateBase, hotelUrl, {
            page: pathname,
            placement: "serp_deal",
        });
    };

    // SerpAPI prices are fetched in USD; parse and convert to selected currency for display
    const formatSerpPrice = (priceValue) => {
        if (priceValue == null) return null;
        if (typeof priceValue === "number") return formatPrice(priceValue);
        if (typeof priceValue === "string") {
            const num = parseFloat(priceValue.replace(/[^0-9.]/g, ""));
            return Number.isNaN(num) ? priceValue : formatPrice(num);
        }
        return priceValue;
    };

    const hotelsMatch = useMemo(() => {
        const serpName = (serpHotelDetail?.name || "").toLowerCase().trim();
        const ourName = (locationName || "").toLowerCase().trim();
        if (!serpName || !ourName) return false;
        const ourKey = ourName.split(/[,.]/)[0]?.trim() || ourName;
        const serpKey = serpName.split(/[,.]/)[0]?.trim() || serpName;
        return serpName.includes(ourKey) || ourName.includes(serpKey) || serpKey.includes(ourKey) || ourKey.includes(serpKey);
    }, [serpHotelDetail?.name, locationName]);

    // Ensure direct link domain matches the displayed partner (e.g. Trip.com row must go to trip.com, not makemytrip)
    const directLinkMatchesSource = (url, source) => {
        if (!url || typeof url !== "string") return false;
        const lower = url.toLowerCase();
        if (source === "Booking") return lower.includes("booking.com");
        if (source === "Expedia") return lower.includes("expedia");
        if (source === "Trip") return lower.includes("trip.com") && !lower.includes("makemytrip") && !lower.includes("cleartrip");
        return false;
    };

    const buildPartnerHotelUrl = (item, normalizedSource, checkin, checkout) => {
        const searchTerm = (locationName || fullAddress || "").trim();
        if (!searchTerm) return null;

        const directLink = item?.deep_link || item?.booking_url || item?.url || item?.link;
        const hasValidDirectLink = directLink && typeof directLink === "string" && (directLink.startsWith("http://") || directLink.startsWith("https://"));
        const linkMatchesPartner = hasValidDirectLink && directLinkMatchesSource(directLink, normalizedSource);

        if (hotelsMatch && linkMatchesPartner) {
            return directLink;
        }

        const encodedHotel = encodeURIComponent(searchTerm);
        console.log("searchTerm", searchTerm);

        // Booking.com: "ss" supports free-text hotel name search – works correctly
        if (normalizedSource === "Booking") {
            return `https://www.booking.com/searchresults.html?ss=${encodedHotel}&checkin=${checkin}&checkout=${checkout}`;
        }
        if (normalizedSource === "Expedia") {
            const isIndia = (locationAddress || locationName || "").toLowerCase().includes("india");
            const expediaHost = isIndia ? "www.expedia.co.in" : "www.expedia.com";
            // hotelName filters results to the specific property; destination provides city/region
            const hotelName = (locationName || searchTerm).split(",")[0]?.trim() || searchTerm;
            const encodedHotelName = encodeURIComponent(hotelName);
            return `https://${expediaHost}/Hotel-Search?destination=${encodedHotel}&hotelName=${encodedHotelName}&startDate=${checkin}&endDate=${checkout}&adults=2&rooms=1`;
        }
        if (normalizedSource === "Trip") {
            // Trip.com: use same full search string as Booking.com (ss) for consistency
            const isIndia = (locationAddress || locationName || "").toLowerCase().includes("india");
            const tripLocale = isIndia ? "en-in" : "en-US";
            const tripCurr = isIndia ? "INR" : currency;
            return `https://www.trip.com/hotels/detail/?cityEnName=1&destName=${encodedHotel}&searchWord=${encodedHotel}&searchType=H&checkin=${checkin}&checkout=${checkout}&crn=1&adult=2&curr=${encodeURIComponent(tripCurr)}&locale=${tripLocale}&old=1`;
        }

        // Fallback: general Google search (for unknown sources)
        return `https://www.google.com/search?q=hotel+${encodedHotel}+${encodeURIComponent(item?.source || "")}`;
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

    const handleSearchDates = async (checkin, checkout) => {
        setSearchCheckin(checkin);
        setSearchCheckout(checkout);
    };

    const getRoomIcon = (roomName, fallbackIndex) => {
        const name = (roomName || "").toLowerCase();
        if (name.includes("king") || name.includes("queen") || name.includes("double")) return LuBedDouble;
        if (name.includes("single") || name.includes("twin")) return LuBedSingle;
        if (name.includes("suite") || name.includes("deluxe") || name.includes("premium")) return LuHotel;
        if (name.includes("villa") || name.includes("apartment")) return LuHouse;
        if (name.includes("ocean") || name.includes("sea") || name.includes("beach") || name.includes("coastal")) return LuWaves;
        if (name.includes("pool") || name.includes("swim")) return LuWaves;
        if (name.includes("garden") || name.includes("resort") || name.includes("holiday")) return LuTreePalm;
        const icons = [LuBedDouble, LuBedSingle, LuBed, LuHotel, LuHouse, LuWaves];
        return icons[fallbackIndex % icons.length];
    };

    const togglePartnerExpand = (partnerIndex) => {
        setExpandedPartners((prev) => {
            const next = new Set(prev);
            if (next.has(partnerIndex)) next.delete(partnerIndex);
            else next.add(partnerIndex);
            return next;
        });
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
                                                    {isSerpPriceBusy && !displayBestPrice && searchCheckout ? (
                                                        <>
                                                            <div className="shimmer-container shimmer-90x28 mb-2" style={{ width: 80 }}>
                                                                <div className="shimmer" />
                                                            </div>
                                                            <div className="shimmer-container shimmer-80x16">
                                                                <div className="shimmer" />
                                                            </div>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <h4 className="m-0">
                                                                {displayBestPrice != null ? formatPrice(displayBestPrice) : "—"}
                                                            </h4>
                                                            <p className="m-0">{displayBestProvider}</p>
                                                        </>
                                                    )}
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

                                        ) : galleryImages.length > 0 ? (
                                            <div className="row ">
                                                <div className="col-lg-8 p-1">
                                                    <div className="image_head side_image_head">
                                                        <img
                                                            className="cursor-pointer"
                                                            src={galleryImages[0]?.type === "google"
                                                                ? `/api/get-photo?name=${encodeURIComponent(galleryImages[0].name)}&maxWidthPx=2400`
                                                                : galleryImages[0]?.url}
                                                            alt={locationName || "Hotel"}
                                                            onClick={() => { setGalleryInitialIndex(0); setGalleryOpen(true); }}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="col-lg-4">
                                                    <div className="row">
                                                        {galleryImages.slice(1, 4).map((item, index) => (
                                                            <div className="col-lg-12 p-1" key={index}>
                                                                <div className="image_head">
                                                                    <img
                                                                        className="cursor-pointer"
                                                                        onClick={() => { setGalleryInitialIndex(index + 1); setGalleryOpen(true); }}
                                                                        src={item?.type === "google"
                                                                            ? `/api/get-photo?name=${encodeURIComponent(item.name)}&maxWidthPx=300`
                                                                            : item?.url}
                                                                        alt={`${locationName || "Hotel"} - ${index + 2}`}
                                                                    />
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="row">
                                                <div className="col-12 p-1">
                                                    <div className="image_head side_image_head d-flex align-items-center justify-content-center bg-light" style={{ minHeight: 200 }}>
                                                        <span className="text-muted">No images available</span>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Gallery modal */}
                                <GalleryModal
                                    isOpen={galleryOpen}
                                    onClose={() => setGalleryOpen(false)}
                                    images={galleryImages}
                                    hotelName={HotelDetail?.displayName?.text || locationName}
                                    initialIndex={galleryInitialIndex}
                                    onViewDeals={isHotelLodging ? handleScrollToPrice : undefined}
                                />



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
                                    ) : galleryImages.length > 0 ? (
                                        <Swiper
                                            spaceBetween={30}
                                            effect="fade"
                                            navigation
                                            modules={[Navigation, Pagination, EffectFade]}
                                            className="mySwiper"
                                        >
                                            {galleryImages.map((item, index) => (
                                                <SwiperSlide key={index}>
                                                    <div
                                                        className="banner_img mobile_banner cursor-pointer"
                                                        onClick={() => { setGalleryInitialIndex(index); setGalleryOpen(true); }}
                                                        role="button"
                                                        tabIndex={0}
                                                    >
                                                        <img
                                                            src={item?.type === "google"
                                                                ? `/api/get-photo?name=${encodeURIComponent(item.name)}&maxWidthPx=1200`
                                                                : item?.url}
                                                            width="100%"
                                                            className="card_rounded"
                                                            alt={`${locationName || "Hotel"} - ${index + 1}`}
                                                        />
                                                    </div>
                                                </SwiperSlide>
                                            ))}
                                        </Swiper>
                                    ) : (
                                        <div className="slider d-flex align-items-center justify-content-center bg-light" style={{ minHeight: 200 }}>
                                            <span className="text-muted">No images available</span>
                                        </div>
                                    )}
                                </div>

                                {/* ******************** end ******* */}
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* ************** Main detail content below gallery: description, amenities & pricing ************** */}
            {isHotelLodging ? (
                <> <section className="detail_page_padding">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">

                                <div className="content_box_detail" id="price_section" ref={priceSectionRef}>
                                    <h3 className="serp_sub_title">View prices for your travel dates</h3>
                                    <p className="serp_google_reviews_text">Prices shown are based on available data and may not always be accurate. Final prices are confirmed at the time of booking.</p>

                                    {filteredPartnerPrices.some((p) => p.hasDeal) && (
                                        <div className="ta_deals_summary">
                                            <span className="ta_deals_summary_icon">🏷️</span>
                                            <span>Deals available for your dates — compare prices below</span>
                                        </div>
                                    )}

                                    {/* Premium date picker – separate inputs + beautiful calendar */}
                                    <div className="ta_dates_section mb-4" ref={datePickerWrapperRef}>
                                        <div
                                            className={`ta_dates_card ${calendarOpen ? "ta_dates_card_open" : ""}`}
                                            onClick={() => setCalendarOpen(!calendarOpen)}
                                            role="button"
                                            tabIndex={0}
                                            onKeyDown={(e) => e.key === "Enter" && setCalendarOpen(!calendarOpen)}
                                        >
                                            <div className="ta_dates_row">
                                                <div className="ta_date_field ta_date_checkin">
                                                    <span className="ta_date_label">Check-in</span>
                                                    <span className="ta_date_value">
                                                        {dateRange?.from ? format(dateRange.from, isMobileView ? "MMM d" : "EEE, MMM d") : "Select"}
                                                    </span>
                                                </div>
                                                <div className="ta_dates_divider">
                                                    <span className="ta_nights_badge">{nightsCount ? `${nightsCount} night${nightsCount > 1 ? "s" : ""}` : "—"}</span>
                                                </div>
                                                <div className="ta_date_field ta_date_checkout">
                                                    <span className="ta_date_label">Check-out</span>
                                                    <span className="ta_date_value">
                                                        {dateRange?.to ? format(dateRange.to, isMobileView ? "MMM d" : "EEE, MMM d") : "Select"}
                                                    </span>
                                                </div>
                                                <div className="ta_calendar_icon">
                                                    <SlCalender className="ta_calendar_svg" />
                                                </div>
                                            </div>
                                        </div>
                                        {calendarOpen && (
                                            <div className="ta_premium_calendar_wrapper">
                                                <DatePicker
                                                    selected={startDate}
                                                    onChange={handleRangeChange}
                                                    startDate={startDate}
                                                    endDate={endDate}
                                                    selectsRange
                                                    minDate={new Date()}
                                                    monthsShown={monthsShown}
                                                    inline
                                                    calendarClassName="ta_premium_calendar"
                                                    showDisabledMonthNavigation={false}
                                                    renderCustomHeader={({ monthDate, decreaseMonth, increaseMonth, prevMonthButtonDisabled, nextMonthButtonDisabled }) => (
                                                        <div className="ta_calendar_header">
                                                            <button
                                                                type="button"
                                                                className="ta_calendar_nav ta_calendar_nav_prev"
                                                                onClick={decreaseMonth}
                                                                disabled={prevMonthButtonDisabled}
                                                                aria-label="Previous month"
                                                            >
                                                                ‹
                                                            </button>
                                                            <span className="ta_calendar_month_title">
                                                                {format(monthDate, "MMMM yyyy")}
                                                            </span>
                                                            <button
                                                                type="button"
                                                                className="ta_calendar_nav ta_calendar_nav_next"
                                                                onClick={increaseMonth}
                                                                disabled={nextMonthButtonDisabled}
                                                                aria-label="Next month"
                                                            >
                                                                ›
                                                            </button>
                                                        </div>
                                                    )}
                                                />
                                                <div className="ta_calendar_footer">
                                                    {searchCheckin && !searchCheckout && (
                                                        <span className="ta_calendar_hint">Select your check-out date</span>
                                                    )}
                                                    <button
                                                        type="button"
                                                        className="ta_calendar_apply_btn"
                                                        onClick={() => setCalendarOpen(false)}
                                                    >
                                                        Apply dates
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    <div className="ta_price_comparison">
                                        {!searchCheckout ? (
                                            <div className="ta_price_empty">
                                                <img
                                                    src={getAssetPath("/price_img/price-icon1.png")}
                                                    alt=""
                                                    className="ta_price_empty_img"
                                                />
                                                <h5 className="ta_price_empty_title">Select check-out date to view prices</h5>
                                                <p className="ta_price_empty_text">Choose your check-out date in the calendar above to see available prices from our partners.</p>
                                            </div>
                                        ) : isSerpPriceBusy ? (
                                            <div className="ta_price_shimmer">
                                                {[1, 2, 3, 4].map((i) => (
                                                    <div key={i} className="ta_price_row ta_price_shimmer_row">
                                                        <div className="ta_price_partner">
                                                            <div className="ta_price_logo shimmer-container shimmer-min-100">
                                                                <div className="shimmer" />
                                                            </div>
                                                            <div className="ta_price_partner_info">
                                                                <div className="shimmer-container shimmer-80x16" style={{ marginBottom: 6 }}>
                                                                    <div className="shimmer" />
                                                                </div>
                                                                <div className="shimmer-container shimmer-120x14">
                                                                    <div className="shimmer" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="ta_price_mid">
                                                            <div className="shimmer-container shimmer-60x20">
                                                                <div className="shimmer" />
                                                            </div>
                                                        </div>
                                                        <div className="ta_price_cta">
                                                            <div className="shimmer-container shimmer-90x36">
                                                                <div className="shimmer" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : propertyNotFound ? (
                                            <div className="ta_price_empty">
                                                <img
                                                    src={getAssetPath("/price_img/price-icon2.png")}
                                                    alt=""
                                                    className="ta_price_empty_img"
                                                />
                                                <h5 className="ta_price_empty_title">This property has no prices</h5>
                                                <p className="ta_price_empty_text">We couldn&apos;t find any pricing for this property. Try searching for a different hotel.</p>
                                            </div>
                                        ) : filteredPartnerPrices.length === 0 ? (
                                            <div className="ta_price_empty justify-content-center align-items-center">
                                                
                                                <h5 className="ta_price_empty_title">No prices for these dates</h5>
                                                <p className="ta_price_empty_text">We couldn&apos;t find any prices for your selected dates. Try changing your check-in or check-out dates.</p>
                                            </div>
                                        ) : (
                                        <>
                                        {filteredPartnerPrices.flatMap((item, partnerIndex) => {
                                                const hotelUrl = buildPartnerHotelUrl(
                                                    item,
                                                    item.normalizedSource,
                                                    searchCheckin,
                                                    searchCheckout
                                                );
                                                const affiliateBase = AFFILIATE_BASES[item.normalizedSource];
                                                const finalLink = buildAffiliateLink(affiliateBase, hotelUrl);
                                                const remarks = item.remarks || [];
                                                const discountRemarks = item.discount_remarks || [];
                                                const isOfficial = item.official === true;
                                                const nights = nightsCount || 1;
                                                const rooms = item.rooms && item.rooms.length > 0
                                                    ? item.rooms
                                                    : [{ name: null, rate_per_night: item.rate_per_night, total_rate: item.total_rate }];
                                                const hasMultipleRooms = rooms.length > 1;
                                                const isExpanded = expandedPartners.has(partnerIndex);
                                                const hiddenCount = rooms.length;

                                                const mainPricePerNight = item.rate_per_night?.lowest;
                                                const mainPriceTotal = item.total_rate?.lowest;
                                                const mainBeforeTaxes = item.rate_per_night?.before_taxes_fees;

                                                return [
                                                    /* First row: partner + normal/aggregate price */
                                                    <div key={`${partnerIndex}-main`} className={`ta_price_row ${item.hasDeal ? "ta_price_row_deal" : ""} ${partnerIndex === bestDealIndex && item.hasDeal ? "ta_price_row_best_deal" : ""}`}>
                                                        <div className="ta_price_partner">
                                                            <div className="ta_price_logo">
                                                                <img
                                                                    src={PARTNER_LOGOS[item.normalizedSource] || item.logo}
                                                                    alt={item.source}
                                                                />
                                                            </div>
                                                            <div className="ta_price_partner_info">
                                                                <div className="ta_price_badges">
                                                                    {partnerIndex === bestDealIndex && item.hasDeal && (
                                                                        <span className="ta_deal_badge ta_deal_badge_best">Best deal</span>
                                                                    )}
                                                                    {item.hasDeal && partnerIndex !== bestDealIndex && (
                                                                        <span className="ta_deal_badge">Deal</span>
                                                                    )}
                                                                </div>
                                                                {(remarks.length > 0 || discountRemarks.length > 0) && (
                                                                    <div className="ta_price_remarks">
                                                                        {discountRemarks.map((r, i) => (
                                                                            <span key={`disc-${i}`} className="ta_remark ta_discount">{r}</span>
                                                                        ))}
                                                                        {remarks.map((r, i) => (
                                                                            <span key={`rem-${i}`} className="ta_remark">{r}</span>
                                                                        ))}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                        <div className="ta_price_mid">
                                                            {mainPricePerNight || mainPriceTotal ? (
                                                                <div className="ta_price_details">
                                                                    {item.original_rate_per_night?.lowest != null && mainPricePerNight && (
                                                                        <span className="ta_price_original">
                                                                            {formatSerpPrice(item.original_rate_per_night.lowest)}/night
                                                                        </span>
                                                                    )}
                                                                    {mainPricePerNight && (
                                                                        <span className="ta_price_primary">
                                                                            <span className="ta_price_amount">{formatSerpPrice(mainPricePerNight)}</span>
                                                                            <span className="ta_price_unit">/night</span>
                                                                        </span>
                                                                    )}
                                                                    {mainPriceTotal && nights > 1 && (
                                                                        <span className="ta_price_total">
                                                                            {item.original_total_rate?.lowest != null && (
                                                                                <span className="ta_price_original_inline">{formatSerpPrice(item.original_total_rate.lowest)} </span>
                                                                            )}
                                                                            {formatSerpPrice(mainPriceTotal)} total
                                                                        </span>
                                                                    )}
                                                                    {mainBeforeTaxes && mainBeforeTaxes !== mainPricePerNight && (
                                                                        <span className="ta_price_before_taxes">Before taxes & fees: {formatSerpPrice(mainBeforeTaxes)}/night</span>
                                                                    )}
                                                                </div>
                                                            ) : (
                                                                <span className="ta_price_na">—</span>
                                                            )}
                                                        </div>
                                                        <div className="ta_price_cta">
                                                            {finalLink ? (
                                                                <a
                                                                    href={finalLink}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="ta_view_deal_btn"
                                                                >
                                                                    View deal
                                                                </a>
                                                            ) : (
                                                                <button type="button" className="ta_view_deal_btn" disabled>
                                                                    View deal
                                                                </button>
                                                            )}
                                                        </div>
                                                    </div>,
                                                    /* Room type rows - collapsible with animation */
                                                    hasMultipleRooms && (
                                                        <div
                                                            key={`${partnerIndex}-rooms`}
                                                            className={`ta_rooms_collapsible ${isExpanded ? "ta_rooms_expanded" : ""}`}
                                                        >
                                                            <div className="ta_rooms_inner">
                                                                {rooms.map((room, roomIndex) => {
                                                                    const roomPricePerNight = room.rate_per_night?.lowest;
                                                                    const roomPriceTotal = room.total_rate?.lowest;
                                                                    const beforeTaxes = room.rate_per_night?.before_taxes_fees;
                                                                    const RoomIcon = getRoomIcon(room.name, roomIndex);

                                                                    return (
                                                                        <div key={`${partnerIndex}-${roomIndex}`} className="ta_price_row ta_price_row_sub">
                                                                <div className="ta_price_partner">
                                                                    <div className="ta_price_logo ta_room_icon_wrapper">
                                                                        <RoomIcon className="ta_room_icon" aria-hidden="true" />
                                                                    </div>
                                                                    <div className="ta_price_partner_info">
                                                                        {room.name && <span className="ta_room_name">{room.name}</span>}
                                                                    </div>
                                                                </div>
                                                                <div className="ta_price_mid">
                                                                    {roomPricePerNight || roomPriceTotal ? (
                                                                        <div className="ta_price_details">
                                                                            {roomPricePerNight && (
                                                                                <span className="ta_price_primary">
                                                                                    <span className="ta_price_amount">{formatSerpPrice(roomPricePerNight)}</span>
                                                                                    <span className="ta_price_unit">/night</span>
                                                                                </span>
                                                                            )}
                                                                            {roomPriceTotal && nights > 1 && (
                                                                                <span className="ta_price_total">{formatSerpPrice(roomPriceTotal)} total</span>
                                                                            )}
                                                                            {beforeTaxes && beforeTaxes !== roomPricePerNight && (
                                                                                <span className="ta_price_before_taxes">Before taxes & fees: {formatSerpPrice(beforeTaxes)}/night</span>
                                                                            )}
                                                                        </div>
                                                                    ) : (
                                                                        <span className="ta_price_na">—</span>
                                                                    )}
                                                                </div>
                                                                <div className="ta_price_cta">
                                                                    {finalLink ? (
                                                                        <a
                                                                            href={finalLink}
                                                                            target="_blank"
                                                                            rel="noopener noreferrer"
                                                                            className="ta_view_deal_btn"
                                                                        >
                                                                            View deal
                                                                        </a>
                                                                    ) : (
                                                                        <button type="button" className="ta_view_deal_btn" disabled>
                                                                            View deal
                                                                        </button>
                                                                    )}
                                                                </div>
                                                            </div>
                                                                    );
                                                                })}
                                                            </div>
                                                        </div>
                                                    ),
                                                    hasMultipleRooms && (
                                                        <div
                                                            key={`${partnerIndex}-toggle`}
                                                            className={`ta_price_row ta_price_toggle_row ${isExpanded ? "ta_toggle_expanded" : ""}`}
                                                            role="button"
                                                            tabIndex={0}
                                                            onClick={() => togglePartnerExpand(partnerIndex)}
                                                            onKeyDown={(e) => e.key === "Enter" && togglePartnerExpand(partnerIndex)}
                                                        >
                                                            <div className="ta_price_partner">
                                                                <div className="ta_price_logo">
                                                                    <span className="ta_logo_placeholder" aria-hidden="true" />
                                                                </div>
                                                                <div className="ta_price_partner_info">
                                                                    <button type="button" className="ta_toggle_btn">
                                                                        {isExpanded ? (
                                                                            <>
                                                                                <MdExpandLess className="ta_toggle_icon" />
                                                                                Show less
                                                                            </>
                                                                        ) : (
                                                                            <>
                                                                                <MdExpandMore className="ta_toggle_icon" />
                                                                                Show {hiddenCount} room type{hiddenCount > 1 ? "s" : ""}
                                                                            </>
                                                                        )}
                                                                    </button>
                                                                </div>
                                                            </div>
                                                            <div className="ta_price_mid" />
                                                            <div className="ta_price_cta" />
                                                        </div>
                                                    ),
                                                ].filter(Boolean);
                                            })}
                                        </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Hotel data from SerpAPI: address, amenities, nearby places, reviews – hide only on initial load, not when refetching (e.g. currency change) */}
                <HotelSerpDataSection data={serpHotelDetail} isLoading={isSerpPriceLoading} googleReviews={userReviews} />
                </>
            ) : (
                <>
                    <div className="container">
                        <div className="row matrix_fix">
                            <div className="col-lg-8">
                                <div className="content_box_detail rounded-2xl border border-gray-300 bg-white">
                                    {aimodal?.data && (
                                        <div className="px-3 pb-3">
                                            <h4 className="mb-3 fw-semibold">About this place</h4>
                                            <SerpAiModalContent data={aimodal.data} />
                                        </div>
                                    )}
                                    <HotelFacilities hotelAmenties={combinedAmenities} load={isLoading} />
                                </div>
                            </div>
                            <div className="col-lg-4">

                            </div>
                        </div>
                    </div>
                </>
            )}
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
