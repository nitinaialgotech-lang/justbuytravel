"use client";
import React, { useEffect, useState } from "react";
import "../../style/searchresult.css";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { SearchLocation } from "@/app/Route/endpoints";
import ReactPaginate from "react-paginate";

import { useRouter } from "next/navigation";
import Link from "next/link";
export default function SearchContentBox() {
    // ********************************

    const searchQuery = useSearchParams();

    const search = searchQuery.get("city");
    const address = searchQuery.get("full_address");

    const { data, isLoading } = useQuery({
        queryKey: ["hotels", search, address],
        queryFn: async () => SearchLocation(search, address)
    })

    console.log(data?.data?.hotels, "hotel detail ,,,,,,,,,,,,,,,,,,,", data);

    const hotels = data?.data?.hotels?.map((item) => item?.items);

    console.log(hotels, "............");

    const location_code = data?.data?.hotels?.map((item) => item?.location_code);
    // ************************************** swimmer effect **************
    const ShimmerCard = () => (
        <div className="card_col">
            <div className="recommend_card_box card_rounded shadow margin_lr margin_md-lr">
                <div className="card_box ">
                    <div className="card_box_img card_rounded relative overflow-hidden shimmer-container" style={{ minHeight: '250px', backgroundColor: '#e5e7eb' }}>
                        <div className="shimmer"></div>
                        <div className="rated_msg absolute top-5 flex justify-between items-center left-5 right-5">
                            <div className="msg shimmer-text" style={{ width: '80px', height: '20px', borderRadius: '4px' }}></div>
                            <div className="msg_icon shimmer-icon" style={{ width: '20px', height: '20px', borderRadius: '50%' }}></div>
                        </div>
                    </div>
                    <div className="card_box_detail px-4 py-5 card_rounded flex flex-col z-1 gap-2 relative">
                        <div className="shimmer-text" style={{ width: '80%', height: '24px', borderRadius: '4px', marginBottom: '8px' }}></div>
                        <div className="time flex items-center gap-3 relative">
                            <div className="icon flex items-center gap-1">
                                <div className="shimmer-icon" style={{ width: '16px', height: '16px', borderRadius: '4px' }}></div>
                                <div className="shimmer-text" style={{ width: '100px', height: '16px', borderRadius: '4px' }}></div>
                            </div>
                            <div className="guest flex items-center gap-1">
                                <div className="shimmer-icon" style={{ width: '16px', height: '16px', borderRadius: '4px' }}></div>
                                <div className="shimmer-text" style={{ width: '80px', height: '16px', borderRadius: '4px' }}></div>
                            </div>
                        </div>
                        <div className="price_book flex mt-3 justify-between items-center">
                            <div className="shimmer-text" style={{ width: '120px', height: '24px', borderRadius: '4px' }}></div>
                            <div className="shimmer-button" style={{ width: '100px', height: '36px', borderRadius: '9999px' }}></div>
                        </div>
                        <div className="rating_list absolute flex items-center gap-1 right-10 shadow">
                            <div className="shimmer-icon" style={{ width: '16px', height: '16px', borderRadius: '4px' }}></div>
                            <div className="shimmer-text" style={{ width: '30px', height: '16px', borderRadius: '4px' }}></div>
                            <div className="shimmer-text" style={{ width: '80px', height: '16px', borderRadius: '4px' }}></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <>

            {/* *************** swimmer effect ***************** */}
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
                .shimmer-text,
                .shimmer-icon,
                .shimmer-button {
                    background: linear-gradient(
                        90deg,
                        #e5e7eb 0%,
                        #f3f4f6 50%,
                        #e5e7eb 100%
                    );
                    background-size: 1000px 100%;
                    animation: shimmer 2s infinite;
                }
            `
            }} />



            {/* ********************* end of swimmer effect ********* */}


            <div className="list-grid-product-wrap">
                <div id="sidebar_filter_hotel" className="row gy-md-5 gy-4">
                    {/* ***************************** */}

                    {

                        isLoading ? Array.from({ length: 9 }).map((_, i) => (

                            <div
                                className="col-md-4 item wow animate fadeInDown"
                                data-wow-delay="200ms"
                                data-wow-duration="1500ms"
                                key={`shimmer-${i}`}>

                                <ShimmerCard />
                            </div>)) :


                            hotels?.[0]?.map((item, i) => {



                                return (
                                    <>
                                        <div
                                            className="col-md-4 item wow animate fadeInDown"
                                            data-wow-delay="200ms"
                                            data-wow-duration="1500ms"
                                            key={i}
                                        >
                                            <div className="hotel-card">
                                                <div className="hotel-img-wrap">
                                                    <a href="#" className="hotel-img">
                                                        <img
                                                            src={item?.overview_images?.slice(0, 1)?.map((item) => item)}
                                                            className="rounded-3xl w-full h-full object-cover"
                                                            loading="lazy"
                                                        />
                                                    </a>
                                                    {/* <div className="batch">
                                                        <span>Sale on!</span>
                                                    </div> */}
                                                </div>
                                                <div className="hotel-content">
                                                    <div className="rating-area">
                                                        <div className="rating-text">
                                                            <div className="rating-stars">
                                                                <ul>
                                                                    {(() => {
                                                                        const rating = item?.reviews?.value || 0;
                                                                        const fullStars = Math.floor(rating);
                                                                        const hasHalfStar = rating - fullStars >= 0.5 && rating - fullStars < 1;
                                                                        return Array.from({ length: 5 }).map((_, idx) => (
                                                                            <li key={idx}>
                                                                                {idx < fullStars ? (
                                                                                    <i className="bi bi-star-fill"></i>
                                                                                ) : idx === fullStars && hasHalfStar ? (
                                                                                    <i className="bi bi-star-half"></i>
                                                                                ) : (
                                                                                    <i className="bi bi-star"></i>
                                                                                )}
                                                                            </li>
                                                                        ));
                                                                    })()}
                                                                </ul>
                                                            </div>
                                                            <span className="total">reviews  {item?.reviews?.value} ({item?.reviews?.votes_count})</span>
                                                        </div>
                                                    </div>
                                                    <h5>
                                                        <a href="#">{item?.title}   </a>
                                                    </h5>

                                                    {/* <ul className="hotel-feature-list">


                                                    <li>
                                                        <svg
                                                            width="14"
                                                            height="14"
                                                            viewBox="0 0 14 14"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <rect
                                                                x="0.5"
                                                                y="0.5"
                                                                width="13"
                                                                height="13"
                                                                rx="6.5"
                                                            ></rect>
                                                            <path d="M10.6947 5.45777L6.24644 9.90841C6.17556 9.97689 6.08572 10.0124 5.99596 10.0124C5.9494 10.0125 5.90328 10.0033 5.86027 9.98548C5.81727 9.96763 5.77822 9.94144 5.7454 9.90841L3.3038 7.46681C3.16436 7.32969 3.16436 7.10521 3.3038 6.96577L4.16652 6.10065C4.29892 5.96833 4.53524 5.96833 4.66764 6.10065L5.99596 7.42897L9.33092 4.09161C9.36377 4.05868 9.40278 4.03255 9.44573 4.01471C9.48868 3.99686 9.53473 3.98766 9.58124 3.98761C9.67572 3.98761 9.76556 4.02545 9.83172 4.09161L10.6944 4.95681C10.8341 5.09625 10.8341 5.32073 10.6947 5.45777Z"></path>
                                                        </svg>
                                                    
                                                    </li>
                                                </ul> */}
                                                    <div className="cancellation">
                                                        <svg
                                                            width="14"
                                                            height="14"
                                                            viewBox="0 0 14 14"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <rect width="14" height="14" rx="7"></rect>
                                                            <path d="M10.6947 5.45777L6.24644 9.90841C6.17556 9.97689 6.08572 10.0124 5.99596 10.0124C5.9494 10.0125 5.90328 10.0033 5.86027 9.98548C5.81727 9.96763 5.77822 9.94144 5.7454 9.90841L3.3038 7.46681C3.16436 7.32969 3.16436 7.10521 3.3038 6.96577L4.16652 6.10065C4.29892 5.96833 4.53524 5.96833 4.66764 6.10065L5.99596 7.42897L9.33092 4.09161C9.36377 4.05868 9.40278 4.03255 9.44573 4.01471C9.48868 3.99686 9.53473 3.98766 9.58124 3.98761C9.67572 3.98761 9.76556 4.02545 9.83172 4.09161L10.6944 4.95681C10.8341 5.09625 10.8341 5.32073 10.6947 5.45777Z"></path>
                                                        </svg>
                                                        <span>Free Cancellation Policy</span>
                                                    </div>
                                                    <div className="btn-and-price-area">
                                                        <Link
                                                            href={`/hoteldetail?code=${location_code}&id=${item?.hotel_identifier}`}
                                                            className="primary-btn1"
                                                        // onClick={() =>
                                                        //     viewDetail(item?.hotel_identifier, item)
                                                        // }
                                                        >
                                                            <span>
                                                                Book Now{" "}
                                                                <svg
                                                                    width="10"
                                                                    height="10"
                                                                    viewBox="0 0 10 10"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                >
                                                                    <path d="M9.73535 1.14746C9.57033 1.97255 9.32924 3.26406 9.24902 4.66797C9.16817 6.08312 9.25559 7.5453 9.70214 8.73633C9.84754 9.12406 9.65129 9.55659 9.26367 9.70215C8.9001 9.83849 8.4969 9.67455 8.32812 9.33398L8.29785 9.26367L8.19921 8.98438C7.73487 7.5758 7.67054 5.98959 7.75097 4.58203C7.77875 4.09598 7.82525 3.62422 7.87988 3.17969L1.53027 9.53027C1.23738 9.82317 0.762615 9.82317 0.469722 9.53027C0.176829 9.23738 0.176829 8.76262 0.469722 8.46973L6.83593 2.10254C6.3319 2.16472 5.79596 2.21841 5.25 2.24902C3.8302 2.32862 2.2474 2.26906 0.958003 1.79102L0.704097 1.68945L0.635738 1.65527C0.303274 1.47099 0.157578 1.06102 0.310542 0.704102C0.463655 0.347333 0.860941 0.170391 1.22363 0.28418L1.29589 0.310547L1.48828 0.387695C2.47399 0.751207 3.79966 0.827571 5.16601 0.750977C6.60111 0.670504 7.97842 0.428235 8.86132 0.262695L9.95312 0.0585938L9.73535 1.14746Z"></path>
                                                                </svg>
                                                            </span>
                                                            <span>
                                                                Book Now{" "}
                                                                <svg
                                                                    width="10"
                                                                    height="10"
                                                                    viewBox="0 0 10 10"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                >
                                                                    <path d="M9.73535 1.14746C9.57033 1.97255 9.32924 3.26406 9.24902 4.66797C9.16817 6.08312 9.25559 7.5453 9.70214 8.73633C9.84754 9.12406 9.65129 9.55659 9.26367 9.70215C8.9001 9.83849 8.4969 9.67455 8.32812 9.33398L8.29785 9.26367L8.19921 8.98438C7.73487 7.5758 7.67054 5.98959 7.75097 4.58203C7.77875 4.09598 7.82525 3.62422 7.87988 3.17969L1.53027 9.53027C1.23738 9.82317 0.762615 9.82317 0.469722 9.53027C0.176829 9.23738 0.176829 8.76262 0.469722 8.46973L6.83593 2.10254C6.3319 2.16472 5.79596 2.21841 5.25 2.24902C3.8302 2.32862 2.2474 2.26906 0.958003 1.79102L0.704097 1.68945L0.635738 1.65527C0.303274 1.47099 0.157578 1.06102 0.310542 0.704102C0.463655 0.347333 0.860941 0.170391 1.22363 0.28418L1.29589 0.310547L1.48828 0.387695C2.47399 0.751207 3.79966 0.827571 5.16601 0.750977C6.60111 0.670504 7.97842 0.428235 8.86132 0.262695L9.95312 0.0585938L9.73535 1.14746Z"></path>
                                                                </svg>
                                                            </span>
                                                        </Link>
                                                        <div className="price-area">
                                                            <h6>Starting From</h6>
                                                            <span>
                                                                {(() => {
                                                                    // Map of many popular currencies, but fallback to the 3-letter code if needed
                                                                    const currencySymbols = {
                                                                        "AED": "د.إ",
                                                                        "AFN": "؋",
                                                                        "ALL": "L",
                                                                        "AMD": "֏",
                                                                        "ANG": "ƒ",
                                                                        "AOA": "Kz",
                                                                        "ARS": "$",
                                                                        "AUD": "$",
                                                                        "AWG": "ƒ",
                                                                        "AZN": "₼",
                                                                        "BAM": "КМ",
                                                                        "BBD": "$",
                                                                        "BDT": "৳",
                                                                        "BGN": "лв",
                                                                        "BHD": ".د.ب",
                                                                        "BIF": "FBu",
                                                                        "BMD": "$",
                                                                        "BND": "$",
                                                                        "BOB": "Bs.",
                                                                        "BRL": "R$",
                                                                        "BSD": "$",
                                                                        "BTN": "Nu.",
                                                                        "BWP": "P",
                                                                        "BYN": "Br",
                                                                        "BZD": "$",
                                                                        "CAD": "$",
                                                                        "CDF": "FC",
                                                                        "CHF": "Fr",
                                                                        "CLP": "$",
                                                                        "CNY": "¥",
                                                                        "COP": "$",
                                                                        "CRC": "₡",
                                                                        "CUC": "$",
                                                                        "CUP": "$",
                                                                        "CVE": "$",
                                                                        "CZK": "Kč",
                                                                        "DJF": "Fdj",
                                                                        "DKK": "kr",
                                                                        "DOP": "RD$",
                                                                        "DZD": "دج",
                                                                        "EGP": "£",
                                                                        "ERN": "Nfk",
                                                                        "ETB": "Br",
                                                                        "EUR": "€",
                                                                        "FJD": "$",
                                                                        "FKP": "£",
                                                                        "FOK": "kr",
                                                                        "GBP": "£",
                                                                        "GEL": "₾",
                                                                        "GGP": "£",
                                                                        "GHS": "₵",
                                                                        "GIP": "£",
                                                                        "GMD": "D",
                                                                        "GNF": "FG",
                                                                        "GTQ": "Q",
                                                                        "GYD": "$",
                                                                        "HKD": "$",
                                                                        "HNL": "L",
                                                                        "HRK": "kn",
                                                                        "HTG": "G",
                                                                        "HUF": "Ft",
                                                                        "IDR": "Rp",
                                                                        "ILS": "₪",
                                                                        "IMP": "£",
                                                                        "INR": "₹",
                                                                        "IQD": "ع.د",
                                                                        "IRR": "﷼",
                                                                        "ISK": "kr",
                                                                        "JMD": "J$",
                                                                        "JOD": "د.ا",
                                                                        "JPY": "¥",
                                                                        "KES": "KSh",
                                                                        "KGS": "лв",
                                                                        "KHR": "៛",
                                                                        "KID": "$",
                                                                        "KMF": "CF",
                                                                        "KRW": "₩",
                                                                        "KWD": "د.ك",
                                                                        "KYD": "$",
                                                                        "KZT": "₸",
                                                                        "LAK": "₭",
                                                                        "LBP": "ل.ل",
                                                                        "LKR": "₨",
                                                                        "LRD": "$",
                                                                        "LSL": "L",
                                                                        "LYD": "ل.د",
                                                                        "MAD": "د.م.",
                                                                        "MDL": "L",
                                                                        "MGA": "Ar",
                                                                        "MKD": "ден",
                                                                        "MMK": "K",
                                                                        "MNT": "₮",
                                                                        "MOP": "P",
                                                                        "MRU": "UM",
                                                                        "MUR": "₨",
                                                                        "MVR": "Rf",
                                                                        "MWK": "MK",
                                                                        "MXN": "$",
                                                                        "MYR": "RM",
                                                                        "MZN": "MT",
                                                                        "NAD": "$",
                                                                        "NGN": "₦",
                                                                        "NIO": "C$",
                                                                        "NOK": "kr",
                                                                        "NPR": "₨",
                                                                        "NZD": "$",
                                                                        "OMR": "ر.ع.",
                                                                        "PAB": "B/.",
                                                                        "PEN": "S/",
                                                                        "PGK": "K",
                                                                        "PHP": "₱",
                                                                        "PKR": "₨",
                                                                        "PLN": "zł",
                                                                        "PYG": "₲",
                                                                        "QAR": "ر.ق",
                                                                        "RON": "lei",
                                                                        "RSD": "дин",
                                                                        "RUB": "₽",
                                                                        "RWF": "FRw",
                                                                        "SAR": "ر.س",
                                                                        "SBD": "$",
                                                                        "SCR": "₨",
                                                                        "SDG": "ج.س.",
                                                                        "SEK": "kr",
                                                                        "SGD": "$",
                                                                        "SHP": "£",
                                                                        "SLE": "Le",
                                                                        "SOS": "Sh",
                                                                        "SRD": "$",
                                                                        "SSP": "£",
                                                                        "STN": "Db",
                                                                        "SYP": "£",
                                                                        "SZL": "E",
                                                                        "THB": "฿",
                                                                        "TJS": "ЅМ",
                                                                        "TMT": "m",
                                                                        "TND": "د.ت",
                                                                        "TOP": "T$",
                                                                        "TRY": "₺",
                                                                        "TTD": "$",
                                                                        "TVD": "$",
                                                                        "TWD": "NT$",
                                                                        "TZS": "Sh",
                                                                        "UAH": "₴",
                                                                        "UGX": "USh",
                                                                        "USD": "$",
                                                                        "UYU": "$U",
                                                                        "UZS": "soʻm",
                                                                        "VES": "Bs.S",
                                                                        "VND": "₫",
                                                                        "VUV": "Vt",
                                                                        "WST": "T",
                                                                        "XAF": "FCFA",
                                                                        "XCD": "$",
                                                                        "XOF": "F CFA",
                                                                        "XPF": "₣",
                                                                        "YER": "﷼",
                                                                        "ZAR": "R",
                                                                        "ZMW": "ZK",
                                                                        "ZWL": "$"
                                                                    };
                                                                    const code = item?.prices?.currency;
                                                                    return (currencySymbols[code] || code || "") + (item?.prices?.price ?? "");
                                                                })()}
                                                            </span>
                                                        </div>{" "}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                );




                            })}

                    {/* *********************************************************************** */}

                    {/* ************************************* */}

                    {/* ***************************************************************************** pagination >>>>>>>>>>>>>>>>>>> */}
                    <div className="pagination_wrapper text-center flex justify-center mb-10">
                        <button className=" px-3 py-2 rounded bg-color-green  text-black font-semibold">
                            Load More
                        </button>
                    </div>
                </div>
            </div>{" "}
        </>
    );
}
