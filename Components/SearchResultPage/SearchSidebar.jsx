"use client"
import React, { useState } from "react";
import HotelDetailContent from "./HotelDetail/HotelDetailContent";

export default function SearchSidebar({ prices_hotel }) {

    return (
        <>
            <div className=" my-5 pt-4 pb-10  package-sidebar-area card_md_margin">
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
