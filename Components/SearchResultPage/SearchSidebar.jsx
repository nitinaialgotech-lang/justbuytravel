"use client"
import React, { useState } from "react";
import HotelDetailContent from "./HotelDetail/HotelDetailContent";

export default function SearchSidebar({ prices_hotel, load, title_url }) {
    console.log(prices_hotel, "oooooo");

    const price = prices_hotel?.flat(1)
    console.log(price, "popopopo");
    const title_url_data = title_url?.split("/")[0];
    console.log(title_url_data, "title_url_data");
    return (
        <>
            <div className=" my-5  pb-10  package-sidebar-area card_md_margin">
                <div className="sidebar-wrapper">
                    <div className="title-area">
                        <h5 className="m-0">Get Detals</h5>
                        <span id="clear-filters" className="rounded">10% off</span>
                    </div>
                    {/* ********************************* */}
                    <div className="single-widgets">
                        {/* ***************************** */}

                        {/* ******************************************* */}
                        <div className="checkbox-container two hotel-category">
                            <HotelDetailContent prices={price} load={load} title_url={title_url_data} />
                        </div>
                    </div>


                </div>
            </div>
        </>
    );
}
