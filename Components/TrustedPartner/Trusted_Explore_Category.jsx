"use client";
import React, { useState } from "react";

export default function Trusted_Explore_Category() {
    const [categoryType, setCategoryType] = useState("hotel");
    const [active, setActive] = useState(true);

    const hotel = [
        {
            img: "/justbuytravel_next/demo/TrustedPartner/hotel/Hotel-new-york-justbuy-travel.png",
            title: "Hotel In New York"
        },
        {
            img: "/justbuytravel_next/demo/TrustedPartner/hotel/Hotel-dubai-justbuy-travel.webp",
            title: "Hotel In Dubai"
        },
        {
            img: "/justbuytravel_next/demo/TrustedPartner/hotel/Hotel-aus-justbuy-travel.png",
            title: "Hotel In Australia"
        },
        {
            img: "/justbuytravel_next/demo/TrustedPartner/hotel/flight-london-justbuytravel.png",
            title: "Hotel In London"
        },
    ]


    const flight = [
        {
            img: "/justbuytravel_next/demo/TrustedPartner/flight/flight-london-justbuytravel.png",
            title: "Flight In London"
        },
        {
            img: "/justbuytravel_next/demo/TrustedPartner/flight/flight-paris-justbuytravel.webp",
            title: "Flight In Paris"
        },
        {
            img: "/justbuytravel_next/demo/TrustedPartner/hotel/Hotel-new-york-justbuy-travel.png",
            title: "Flight In New York"
        },
        {
            img: "/justbuytravel_next/demo/TrustedPartner/flight/Hotel-dubai-justbuy-travel.webp",
            title: "Flight In Dubai"
        },

    ]
    return (
        <>
            <section className="padding_bottom padding_top">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="explore_title text-center">
                                <div className="section_title title">
                                    <h2 className="m-0">Explore By Category</h2>
                                    <h3 className="color_bl">Book Flights & Hotels Online, Discover Destinations Aligned with Your Travel Style</h3>
                                </div>
                                {/* ******************* */}
                                <div className="explore_cat_button flex justify-center gap-10">
                                    <div className="display_button flex gap-1 bg-amber-100 p-2 rounded">
                                        <button
                                            className={`button_bg2   ${categoryType == "hotel" ? "bg-color-green" : "bg-color-black g_color"}`}
                                            type="button"
                                            onClick={() => {
                                                setCategoryType("hotel"), setActive(false);
                                            }}
                                        >
                                            Hotel
                                        </button>
                                        <button
                                            className={`button_bg2   ${categoryType == "flight" ? "bg-color-green" : "bg-color-black g_color"}`}
                                            type="button"
                                            onClick={() => {
                                                setCategoryType("flight"), setActive(true);
                                            }}
                                        >
                                            Flight
                                        </button>
                                    </div>
                                </div>

                                {/* ********************* show on click  */}
                                <div className="row">
                                    {
                                        categoryType == "hotel" ? hotel?.map((item) => {
                                            return (
                                                <>

                                                    <div className="col-lg-3 col-md-6 col-6 p-0">
                                                        <div className="explore_content  flex justify-center">
                                                            <div className="content_icon flex flex-col text-center border_right w-full items-center">
                                                                <img
                                                                    src={item?.img}
                                                                    alt=""
                                                                    width={100}
                                                                />
                                                                <h3>{item?.title}</h3>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </>
                                            )
                                        }) : flight?.map((item) => {
                                            return (
                                                <>
                                                    <div className="col-lg-3 col-md-6 col-6 p-0">
                                                        <div className="explore_content  flex justify-center">
                                                            <div className="content_icon flex flex-col text-center border_right w-full items-center">
                                                                <img
                                                                    src={item?.img}
                                                                    alt=""
                                                                    width={100}
                                                                />
                                                                <h3>{item?.title}</h3>
                                                            </div>
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
                </div>
            </section>
        </>
    );
}
