"use client"
import React, { useState } from "react";
import HotelDetailContent from "./HotelDetail/HotelDetailContent";

export default function SearchSidebar({ prices_hotel }) {
    const data = [
        {
            liname: "Air Conditioning",
            nmber: "06",
        },
        {
            liname: "Air Conditioning",
            nmber: "06",
        },
        {
            liname: "Air Conditioning",
            nmber: "06",
        },
        {
            liname: "Air Conditioning",
            nmber: "06",
        },
        {
            liname: "Air Conditioning",
            nmber: "06",
        },
        {
            liname: "Air Conditioning",
            nmber: "06",
        },
        {
            liname: "Air Conditioning",
            nmber: "06",
        },
        {
            liname: "Air Conditioning",
            nmber: "06",
        },
        {
            liname: "Air Conditioning",
            nmber: "06",
        },
        {
            liname: "Air Conditioning",
            nmber: "06",
        },
        {
            liname: "Air Conditioning",
            nmber: "06",
        },
        {
            liname: "Air Conditioning",
            nmber: "06",
        },
        {
            liname: "Air Conditioning",
            nmber: "06",
        },
        {
            liname: "Air Conditioning",
            nmber: "06",
        },
    ];
    const [show, setshow] = useState(false)
    const visible = show ? data.length : 5;
    console.log(visible, data?.length, "ppkpkpkp");

    return (
        <>
            <div className="package-sidebar-area my-5 pt-4 pb-10">
                <div className="sidebar-wrapper">
                    <div className="title-area">
                        <h5 className="m-0">Get Detals</h5>
                        <span id="clear-filters" className="rounded-2xl">10% off</span>
                    </div>
                    {/* ********************************* */}
                    <div className="single-widgets">
                        {/* ***************************** */}

                        {/* ******************************************* */}
                        <div className="checkbox-container two hotel-category">
                            <HotelDetailContent prices={prices_hotel} />
                        </div>
                    </div>


                </div>
            </div>
        </>
    );
}
