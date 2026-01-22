import React from 'react'
import { RiCheckboxCircleLine } from 'react-icons/ri'

export default function ViewPriceDetail({ PriceRate }) {
    const hotelPrice = PriceRate?.data?.raw?.result?.rates;

    console.log();
    const bookingImg = [
        {
            name: "Booking.com",
            img: "/justbuytravel_next/demo/logo/hoteldetail/Booking_com.png"
        },
        {
            name: "expedia.com/",
            img: "/justbuytravel_next/demo/logo/hoteldetail/expedia_logo.svg"
        },
        {
            name: "traveloka.com/",
            img: "/justbuytravel_next/demo/logo/hoteldetail/travelok.svg"
        },
        {
            name: "Trip.com",
            img: "/justbuytravel_next/demo/logo/hoteldetail/tripcom.webp"
        },
    ]
    const imgdata = bookingImg?.map((item) => item)
    return (
        <>
            <section className='padding_bottom'>
                <div className="container">
                    <div className="row matrix_fix">
                        <div className="col-lg-12">
                            <div className="content_box_detail view_price_detial_content rounded-2xl border border-gray-300 bg_grey2">
                                <div className="view_price_title">
                                    <h4>View prices for your travel dates</h4>
                                </div>

                                {hotelPrice
                                    ?.filter(item => bookingImg.some(img => img.name === item.name)) // Only matched hotels
                                    .map((item, i) => {
                                        // Get the matched image
                                        const matchedImg = bookingImg.find(img => img.name === item.name);

                                        return (
                                            <div className="view_price_box" key={i}>
                                                <div className="price_box">
                                                    <div className="row items-center">

                                                        {/* Logo column */}
                                                        <div className="col-lg-4">
                                                            <div className="price_box_item">
                                                                <div className="icon text-center flex">
                                                                    <img
                                                                        src={matchedImg.img}
                                                                        alt={item.name}
                                                                        width={120}
                                                                        height={120}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {/* Price column */}
                                                        <div className="col-lg-4">
                                                            <div className="price_box_price flex justify-center">
                                                                <h4>${item.rate}</h4>
                                                            </div>
                                                        </div>

                                                        {/* Button column */}
                                                        <div className="col-lg-4">
                                                            <div className="price_box_button price_view_detail flex justify-end">
                                                                <button className="hotel_detail_button text-white">
                                                                    view details
                                                                </button>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}


                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
