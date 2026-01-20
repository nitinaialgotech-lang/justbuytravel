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
export default function SearchContentBox() {
    // ********************************
    const searchQuery = useSearchParams();

    const lat = searchQuery.get("lat");
    const long = searchQuery.get("long")

    const { data, isLoading } = useQuery({
        queryKey: ["gethotels", lat, long],
        queryFn: () => nearbyPlaces(lat, long)
    })
    console.log(lat, long, data, "latlong data.config......................................kokkokokok");
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
        setVisibleCount(itemPerPage);
    }, [hotelData]);
    return (
        <>
            {/* ********************** recomand section show    */}
            <HotelSearchRecomand lat={lat} long={long} />

            {/* *************** swimmer effect ***************** */}




            {/* ********************* end of swimmer effect ********* */}


            {/* **************************************** near buy location xxxxxxxxxxxxxxxxxxxxx */}
            <HotelSearchNearByLocation lat={lat} long={long} />
            {/* ******************************* iconic plaeces xxxxxxxxxxxxxxxxxxxxxxxxxx */}
            <HotelSearchIconicPlaces lat={lat} long={long} />
        </>
    );
}
