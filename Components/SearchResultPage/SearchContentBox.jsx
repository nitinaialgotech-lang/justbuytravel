"use client";
import React, { useEffect, useState } from "react";
import "../../style/searchresult.css";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { GetAccommodationDetails, nearbyPlaces, SearchLocation } from "@/app/Route/endpoints";
import ReactPaginate from "react-paginate";
import { useRouter } from "next/navigation";
import Link from "next/link";
import HotelSearchRecomand from "./HotelSearchRecomand";
import HotelSearchNearByLocation from "./HotelSearchNearByLocation";
import HotelSearchIconicPlaces from "./HotelSearchIconicPlaces";

const ShimmerCard = () => (
    <div className="card_col">
        <div className="recommend_card_box card_rounded shadow margin_lr margin_md-lr">
            <div className="card_box ">
                <div
                    className="card_box_img card_rounded relative overflow-hidden shimmer-container"
                    style={{ minHeight: "250px", backgroundColor: "#e5e7eb" }}
                >
                    <div className="shimmer"></div>
                    <div className="rated_msg absolute top-5 flex justify-between items-center left-5 right-5">
                        <div
                            className="msg shimmer-text"
                            style={{ width: "80px", height: "20px", borderRadius: "4px" }}
                        ></div>
                        <div
                            className="msg_icon shimmer-icon"
                            style={{ width: "20px", height: "20px", borderRadius: "50%" }}
                        ></div>
                    </div>
                </div>
                <div className="card_box_detail px-4 py-5 card_rounded flex flex-col z-1 gap-2 relative">
                    <div
                        className="shimmer-text"
                        style={{ width: "80%", height: "24px", borderRadius: "4px", marginBottom: "8px" }}
                    ></div>
                    <div className="time flex items-center gap-3 relative">
                        <div className="icon flex items-center gap-1">
                            <div className="shimmer-icon" style={{ width: "16px", height: "16px", borderRadius: "4px" }}></div>
                            <div className="shimmer-text" style={{ width: "100px", height: "16px", borderRadius: "4px" }}></div>
                        </div>
                        <div className="guest flex items-center gap-1">
                            <div className="shimmer-icon" style={{ width: "16px", height: "16px", borderRadius: "4px" }}></div>
                            <div className="shimmer-text" style={{ width: "80px", height: "16px", borderRadius: "4px" }}></div>
                        </div>
                    </div>
                    <div className="price_book flex mt-3 justify-between items-center">
                        <div className="shimmer-text" style={{ width: "120px", height: "24px", borderRadius: "4px" }}></div>
                        <div className="shimmer-button" style={{ width: "100px", height: "36px", borderRadius: "9999px" }}></div>
                    </div>
                    <div className="rating_list absolute flex items-center gap-1 right-10 shadow">
                        <div className="shimmer-icon" style={{ width: "16px", height: "16px", borderRadius: "4px" }}></div>
                        <div className="shimmer-text" style={{ width: "30px", height: "16px", borderRadius: "4px" }}></div>
                        <div className="shimmer-text" style={{ width: "80px", height: "16px", borderRadius: "4px" }}></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);
export default function SearchContentBox() {
    // ********************************
    const searchQuery = useSearchParams();

    const lat = searchQuery.get("lat");
    const long = searchQuery.get("long");
    const name = searchQuery.get("name");

    const { data, isLoading } = useQuery({
        queryKey: ["gethotels", lat, long],
        queryFn: () => nearbyPlaces(lat, long)
    })
    console.log(lat, long, data, "latlong data.config......................................kokkokokok", name);
    const hotelData = data?.data?.places;

    console.log(hotelData, "?????????????????????????????????????????");

    // const searchQuery = useSearchParams();

    // const search = searchQuery.get("city");
    // const address = searchQuery.get("full_address");

    // const { data, isLoading } = useQuery({
    //     queryKey: ["hotels", search, address],
    //     queryFn: async () => SearchLocation(search, address)
    // })

    // console.log(data?.data?.hotels, "hotel detail ,,,,,,,,,,,,,,,,,,,", data);

    // const hotels = data?.data?.hotels?.map((item) => item?.items);

    // console.log(hotels, "............");

    // const location_code = data?.data?.hotels?.map((item) => item?.location_code);
    // ************************************** swimmer effect **************

    // ************************************* on load more button show 
    const itemPerPage = 6;
    const [visibleCount, setVisibleCount] = useState(itemPerPage);
    useEffect(() => {
        const id = requestAnimationFrame(() => setVisibleCount(itemPerPage));
        return () => cancelAnimationFrame(id);
    }, [hotelData]);
    return (
        <>
            {/* ********************** recomand section show    */}
            <HotelSearchRecomand lat={lat} long={long} name={name} />

            {/* *************** swimmer effect ***************** */}




            {/* ********************* end of swimmer effect ********* */}


            {/* **************************************** near buy location xxxxxxxxxxxxxxxxxxxxx */}
            <HotelSearchNearByLocation lat={lat} long={long} />
            {/* ******************************* iconic plaeces xxxxxxxxxxxxxxxxxxxxxxxxxx */}
            <HotelSearchIconicPlaces lat={lat} long={long} />
        </>
    );
}
