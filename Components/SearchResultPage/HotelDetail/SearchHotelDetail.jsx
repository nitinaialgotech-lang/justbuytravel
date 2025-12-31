
"use client"
import React, { useEffect, useState } from 'react'
import "../../../style/searchresult.css"
import HotelDetailContent from './HotelDetailContent'
import { useQuery } from '@tanstack/react-query'
import { HotelDetail } from '@/app/Route/endpoints'
import { useSearchParams } from 'next/navigation'
import AboutHotelDetail from './AboutHotelDetail';
import NearByHotel from './NearByHotel';
import HotelLocation from './HotelLocation';
import SearchSidebar from '../SearchSidebar'
import Footer from '@/component/Footer'
import HotelFacilities from './HotelFacilities'
import ImageGallery from './ImageGallery'
export default function SearchHotelDetail() {

    const searchid = useSearchParams();
    const propertyToken = searchid.get("property_token");
    
    // Get passed data from sessionStorage
    const [passedData, setPassedData] = useState(null);
    
    useEffect(() => {
        if (propertyToken && typeof window !== 'undefined') {
            const stored = sessionStorage.getItem(`hotel_${propertyToken}`);
            if (stored) {
                try {
                    const parsed = JSON.parse(stored);
                    setPassedData(parsed);
                    // Clean up after reading
                    sessionStorage.removeItem(`hotel_${propertyToken}`);
                } catch (e) {
                    console.error('Error parsing stored data:', e);
                }
            }
        }
    }, [propertyToken]);
    
    // ********************
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["hotels", propertyToken],
        queryFn: () => HotelDetail(propertyToken),
        enabled: !!propertyToken, // Only run query when property_token exists
    })

    // console.log("Full API response:", data);
    // console.log("Property token:", propertyToken);

    // ********************
    // Try different possible data structures
    const hotel = data?.data?.data?.full_data ||
        data?.data?.full_data ||
        data?.full_data ||
        data?.data ||
        data;

    const description = hotel?.property?.description;
    const lat = hotel?.property?.additional_data?.gps_coordinates?.latitude;
    const long = hotel?.property?.additional_data?.gps_coordinates?.longitude;
    const near_by_places = hotel?.property?.additional_data?.nearby_places;
    const prices = hotel?.property?.additional_data?.all_offers;
    const name = hotel?.property?.name;
    console.log("prices", prices);
    
    // Use passed images_full first, then API data, fallback to empty array
    const images = hotel?.property?.images_proxy || [];
    
    // Use passed amenities first, then API data, fallback to empty array
    const amenities = passedData?.amenities || hotel?.property?.amenities || [];
    
    console.log("images", images);
    console.log("amenities", amenities);
    
    // Show loading state
    if (isLoading) {
        return (
            <div className="container py-5">
                <div className="text-center">
                    <p>Loading hotel details...</p>
                </div>
            </div>
        );
    }

    // Show error state
    if (isError) {
        return (
            <div className="container py-5">
                <div className="text-center">
                    <p className="text-danger">Error loading hotel details: {error?.message || "Unknown error"}</p>
                    <p className="text-muted">Property Token: {propertyToken}</p>
                </div>
            </div>
        );
    }

    // Show message if no data
    if (!hotel?.property || !name) {
        return (
            <div className="container py-5">
                <div className="text-center">
                    <p>No hotel data found for property token: {propertyToken}</p>
                    <pre className="text-left mt-3" style={{ fontSize: '12px', overflow: 'auto', maxHeight: '400px' }}>
                        {JSON.stringify(data, null, 2)}
                    </pre>
                </div>
            </div>
        );
    }

    return (
        <>
            <section className='hoteldetail'>
                <div className="container">
                    <div className="row">

                        <div className="col-lg-12">
                            <div className="hoteldetail_banner pt-5">
                                <div className="content">
                                    <p className='m-0'>
                                        ☆
                                        ☆
                                        ☆
                                        ☆
                                        ☆
                                        0 Review ( based on 0 reviews )
                                    </p>
                                    <h2 className='pb-4'>
                                        {hotel?.property?.name}
                                    </h2>
                                </div>
                                {/* Image Gallery */}
                                <div className="banner_img">
                                    <ImageGallery images={images} hotelName={name} />
                                </div>

                            </div>



                        </div>
                    </div>
                </div>
            </section >
            <div className="container">


                <div className="row matrix_fix">
                    <div className="col-lg-7 pt-4">

                        <div className="content_box_detail my-5   rounded-2xl border border-gray-300">


                            <AboutHotelDetail detail={description} name={name} />


                            <HotelFacilities amenities={amenities} />

                            <NearByHotel places={near_by_places} />

                            <HotelLocation lat={lat} long={long} />
                        </div>
                    </div>
                    {/* ***************************** */}
                    <div className="col-lg-5">
                        <SearchSidebar prices_hotel={prices} />

                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}
