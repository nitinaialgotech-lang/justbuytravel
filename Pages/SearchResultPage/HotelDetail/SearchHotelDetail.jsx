
"use client"
import React from 'react'
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
export default function SearchHotelDetail() {

    const searchid = useSearchParams();
    const search = searchid.get("query");
    // ********************
    const { data } = useQuery({

        queryKey: ["hotels", search],
        queryFn: () => HotelDetail(search)
    })

    console.log(data?.data?.data, "deatils");


    // ********************

    // ********************

    // ********************
    const hotel = data?.data?.data?.full_data;
    const description = hotel?.description;

    const lat = hotel?.gps_coordinates?.latitude;
    const long = hotel?.gps_coordinates?.longitude;
    const near_by_places = hotel?.nearby_places;
    const prices = hotel?.prices;
    const name = hotel?.name




    console.log(data, "datat..........<><>><>");

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
                                        {hotel?.name}
                                    </h2>
                                </div>
                                {/* ************** */}
                                <div className="banner_img">

                                    <div className="row">
                                        {
                                            hotel?.images?.slice(0, 1)?.map((item, it) => {

                                                return (
                                                    <>



                                                        {/* ********************** */}
                                                        <div className="col-12 col-lg-6" key={it} >
                                                            <div className="hotel_img" >
                                                                <img src={`${item?.thumbnail}`} className='rounded-2xl' alt="" />
                                                            </div>
                                                        </div>

                                                    </>


                                                )





                                            })
                                        }


                                        {/* ***************************** */}
                                        <div className="col-lg-6">
                                            <div className="row">
                                                {
                                                    hotel?.images?.slice(1, 5)?.map((item, i) => {

                                                        return (


                                                            <>



                                                                <div className={`col-lg-6 ${i >= 2 ? "mt-3" : ""}`} key={i}>
                                                                    <div className="hotel_img">
                                                                        <img src={`${item?.thumbnail}`} className='rounded-2xl' alt="" />
                                                                    </div>
                                                                </div>

                                                            </>
                                                        )








                                                    })

                                                }

                                                {/* ****************** */}



                                            </div>
                                        </div>
                                        {/* ************************ */}
                                    </div>
                                </div>

                            </div>



                        </div>
                    </div>
                </div>
            </section >
            <div className="container">


                <div className="row matrix_fix">
                    <div className="col-lg-8 pt-4">

                        <div className="content_box_detail my-5   rounded-2xl border border-gray-300">


                            <AboutHotelDetail detail={description} name={name} />


                            <HotelFacilities />

                            <NearByHotel places={near_by_places} />

                            <HotelLocation lat={lat} long={long} />
                        </div>
                    </div>
                    {/* ***************************** */}
                    <div className="col-lg-4">
                        <SearchSidebar prices_hotel={prices} />

                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}
