"use client";
import React, { useState } from "react";
import { DayPicker } from "react-day-picker";
import { CiSearch } from "react-icons/ci";
import { SlCalender } from "react-icons/sl";
import { BiRadioCircle } from "react-icons/bi";
import { IoLocationSharp } from "react-icons/io5";
import { VscArrowSwap } from "react-icons/vsc";
import { FiChevronDown, FiUsers } from "react-icons/fi";
import Link from "next/link";
import "../../style/search.scss"
import SideBar from "./SideBar";
export default function ViewHotelPage() {
    const [open, setOpen] = useState(false);
    const [showClassDropdown, setShowClassDropdown] = useState(false);
    const [travelClass, setTravelClass] = useState("Economy");
    const economy = [
        {
            eco_name: "Economy",
            id: "1",
        },
        {
            eco_name: "Premium Economy",
            id: "2",
        },
        {
            eco_name: "Business Class",
            id: "3",
        },
        {
            eco_name: "First Class",
            id: "4",
        },
    ];
    return (
        <section className="viewhotel_section">
            <div className="container">
                <div className="row">
                    {/* * *************************************************** */}
                    <div className="col-lg-4">
                        <SideBar />


                    </div>
                    {/* * *************************************************** */}
                    <div className="col-lg-8">
                        <div className="sidebar_section">
                            <div className="hotel-grid-top-area  w-full">
                                <div className="search_box_input d-none d-lg-block w-full ">
                                    <form className="mx-auto flex justify-between gap-2">
                                        <div className="header_input_1  relative flex flex-1 gap-2">

                                            {/* Leaving From */}
                                            <div className="header_input header_inpu relative h-12">
                                                <div className="icon absolute inset-y-0 start-3 flex items-center pointer-events-none icon_search">
                                                    <BiRadioCircle />
                                                </div>
                                                <input
                                                    type="text"
                                                    placeholder="Search"
                                                    className="block w-full bg-neutral-secondary-medium border-default-medium text-heading text-sm rounded-base focus:outline-none focus:ring-0 placeholder:text-body ps-10 capitalize"
                                                />
                                            </div>
                                        </div>
                                        {/* Calendar */}
                                        <div className="header_input relative h-12">
                                            <div className="icon absolute inset-y-0 start-3 flex items-center pointer-events-none">
                                                <SlCalender />
                                            </div>
                                            <input
                                                type="text"
                                                readOnly
                                                onClick={() => setOpen(true)}
                                                className="block w-full bg-neutral-secondary-medium text-sm rounded-base ps-10 cursor-pointer focus:outline-none focus:ring-0"
                                                placeholder="Select departure date"
                                            />
                                            {open && (
                                                <div className="absolute z-50 mt-2 bg-white shadow-xl rounded-lg p-4">
                                                    <DayPicker
                                                        mode="single"
                                                        disabled={{ before: new Date() }}
                                                    />
                                                </div>
                                            )}
                                        </div>
                                        {/* From / To Section */}
                                        {/* Calendar */}
                                        <div className="header_input relative h-12">
                                            <div className="icon absolute inset-y-0 start-3 flex items-center pointer-events-none">
                                                <SlCalender />
                                            </div>
                                            <input
                                                type="text"
                                                readOnly
                                                onClick={() => setOpen(true)}
                                                className="block w-full bg-neutral-secondary-medium text-sm rounded-base ps-10 cursor-pointer focus:outline-none focus:ring-0"
                                                placeholder="Select departure date"
                                            />
                                            {open && (
                                                <div className="absolute z-50 mt-2 bg-white shadow-xl rounded-lg p-4">
                                                    <DayPicker
                                                        mode="single"
                                                        disabled={{ before: new Date() }}
                                                    />
                                                </div>
                                            )}
                                        </div>
                                        {/* From / To Section */}

                                        {/* *********** */}
                                        <div className="flex items-center gap-2 px-4 py-2 text-sm bg-white border border-gray-200 rounded-lg">
                                            <div className="item relative ">
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setShowClassDropdown((prev) => !prev);
                                                    }}
                                                    className="flex items-center gap-1.5 cursor-pointer bg-transparent border-0 p-0 text-inherit"
                                                >
                                                    <span className="whitespace-nowrap">{travelClass}</span>
                                                    <FiChevronDown
                                                        className={`shrink-0 transition-transform duration-300 ease-out ${showClassDropdown ? "rotate-180" : "rotate-0"
                                                            }`}
                                                        size={18}
                                                    />
                                                </button>

                                                {showClassDropdown && (
                                                    <div className="absolute left-0 top-10 z-20 px-3  pt-1 pb-4 bg-white border border-gray-200 rounded-lg shadow-xl transition-all duration-300 ease-out origin-top">
                                                        {economy?.map((item, index) => (
                                                            <div className="flex flex-col width-btn border-b border-gray-200 py-2">
                                                                <button
                                                                    key={index}
                                                                    type="button"
                                                                    onClick={() => {
                                                                        setTravelClass(item?.eco_name);

                                                                        setShowClassDropdown(false);

                                                                    }}
                                                                    className="text-left text-eco  rounded-md  transition"
                                                                >
                                                                    {item?.eco_name}
                                                                </button>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                    </form>
                                </div>
                            </div>
                        </div>
                        {/* ***************************************** hotel page ********************************** */}
                        <div className="list-grid-product-wrap">
                            <div className="row" id="sidebar_filter_hotel">
                                <div className="col-lg-6 item wow animate fadeInDown">
                                    <div className="hotel-card">
                                        <div className="hotel-img-wrap">
                                            <a href="#" className="hotel-img">
                                                <img
                                                    src={"/cruise/cruide6.jpg"}
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

                                                        </ul>
                                                    </div>
                                                    <span className="total">reviews  </span>
                                                </div>
                                            </div>
                                            <h5>
                                                Raffles Hotels & Resorts
                                            </h5>
                                            <div className="btn-and-price-area">
                                                <Link
                                                    href={``}
                                                    className="primary-btn1 text-white"
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

                                                    </span>
                                                </div>{" "}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}