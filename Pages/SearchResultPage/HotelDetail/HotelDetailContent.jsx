import React from 'react'
import { IoCheckmarkOutline } from "react-icons/io5";

export default function HotelDetailContent({ prices }) {
    console.log(prices);
    return (
        <>
            <div className="section_hoitel_detail_content ">
                <div className="container">
                    <div className="price_card rounded-2xl ">
                        <div className="row">
                            <div className="col-lg-12">
                                {/* ********************** */}
                                <div className="hotel_price_detail">

                                    {/* ************************************** */}
                                    {
                                        prices?.map((item, i) => {


                                            if (item?.source === "Expedia.com" || item?.source === "Booking.com") {
                                                return (


                                                    <>


                                                        <div className="hotel_price_card flex items-center justify-between  border-t-1 border-gray-300">
                                                            {/* ********************* */}
                                                            <div className="booking_icon">
                                                                <img src={item?.source === "Expedia.com" ? "/logo/hoteldetail/expedia_logo.svg" : "/logo/hoteldetail/Booking_Com.png"} alt="" />
                                                            </div>
                                                            {/* ********************* */}

                                                            {/* ************************* */}
                                                            <div className="bookign_price">
                                                                <h4 className='m-0'>
                                                                    {item?.total_rate?.lowest}
                                                                </h4>
                                                            </div>
                                                            {/* ********************** */}
                                                            <div className="viewdetail">
                                                                <button className=''>
                                                                    view detail
                                                                </button>
                                                            </div>

                                                        </div>


                                                    </>
                                                )
                                            }
                                        })
                                    }
                                    {/* ********************************************* */}

                                    {/* **************************************************************** */}

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
