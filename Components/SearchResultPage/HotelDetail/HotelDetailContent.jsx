import React from 'react'
import { IoCheckmarkOutline } from "react-icons/io5";
import { getAssetPath } from '@/app/utils/assetPath';

export default function HotelDetailContent({ prices }) {
    console.log(prices, "pricesssssssssssssssssssssssssssssssssssssss");
    return (
        <>
            <div className="section_hoitel_detail_content ">
                <div className="container">
                    <div className="price_card rounded-2xl ">
                        <div className="row">
                            <div className="col-lg-12">
                                {/* ********************** */}
                                <div className="hotel_price_detail">

                                    {
                                        prices?.map((item, i) => {



                                            return (

                                                <div className="hotel_price_card flex items-center justify-between  border-t-1 border-gray-300" key={i}>
                                                    {/* ********************* */}
                                                    <div className="booking_icon">
                                                        {/* <img src={getAssetPath(item?.source === "Expedia.com" ? "/logo/hoteldetail/expedia_logo.svg" : "/logo/hoteldetail/Booking_Com.png")} alt={`${item?.source} booking logo - Compare hotel prices`} /> */}

                                                        <h2>{item?.title}</h2>
                                                    </div>
                                                    {/* ********************* */}

                                                    {/* ************************* */}
                                                    <div className="bookign_price">
                                                        <h6 className='m-0'>
                                                            {item?.price}
                                                        </h6>
                                                    </div>
                                                    {/* ********************** */}
                                                    <div className="viewdetail">
                                                        <button className=''>
                                                            view detail
                                                        </button>
                                                    </div>

                                                </div>


                                            )

                                        })
                                    }

                                </div>
                                {/* ************************ */}

                            </div>
                            {/* ****************************************** */}
                        </div>
                    </div>
                </div>

            </div >



        </>
    )
}
