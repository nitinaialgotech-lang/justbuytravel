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

                                                    <table className='table m-0'>
                                                        <tbody>
                                                            <tr className=' border-none '>
                                                                <td className='border-0 text-left align-middle'>
                                                                    {/* <div className="booking_icon flex items-center"> */}
                                                                    {/* <img src={getAssetPath(item?.source === "Expedia.com" ? "/logo/hoteldetail/expedia_logo.svg" : "/logo/hoteldetail/Booking_Com.png")} alt={`${item?.source} booking logo - Compare hotel prices`} /> */}

                                                                    <h6 className='m-0'>{item?.title}</h6>
                                                                    {/* </div> */}
                                                                </td>

                                                                <td className='border-0 text-center align-middle'>
                                                                    {/* ************************* */}
                                                                    {/* <div className="bookign_price"> */}
                                                                    <h6 className='m-0'>
                                                                        {item?.price}
                                                                    </h6>
                                                                    {/* </div> */}
                                                                    {/* ********************** */}
                                                                </td>

                                                                <td className='border-0 text-right align-middle'>
                                                                    {/* <div className="hotel_viewdetail"> */}
                                                                    <button className='button_bg bg-color-green color_bl'>
                                                                        view detail
                                                                    </button>
                                                                    {/* </div> */}
                                                                </td>

                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                    {/* ********************* */}

                                                    {/* ********************* */}




                                                </div>
                                            )
                                            git
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
