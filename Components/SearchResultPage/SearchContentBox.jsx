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
import { useSelector } from "react-redux";


export default function SearchContentBox() {
    // ********************************
    // const searchQuery = useSearchParams();


    // const lat = searchQuery.get("lat");
    // const long = searchQuery.get("long");
    // const name = searchQuery.get("name");
    // ********************************************************
    const lat = useSelector((state) => state?.user?.SearchDetail?.lat)
    const long = useSelector((state) => state?.user?.SearchDetail?.long)


    // const { data, isLoading } = useQuery({
    //     queryKey: ["gethotels", lat, long],
    //     queryFn: () => nearbyPlaces(lat, long)
    // })
    // const hotelData = data?.data?.places;
    // ************************************** swimmer effect **************

    // ************************************* on load more button show 
    // const itemPerPage = 6;
    // const [visibleCount, setVisibleCount] = useState(itemPerPage);
    // useEffect(() => {
    //     const id = requestAnimationFrame(() => setVisibleCount(itemPerPage));
    //     return () => cancelAnimationFrame(id);
    // }, [hotelData]);
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
