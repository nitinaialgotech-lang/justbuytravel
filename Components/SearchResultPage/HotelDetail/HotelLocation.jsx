import Footer from '@/component/Footer'
import React from 'react'

export default function HotelLocation({ lat, long }) {
    return (
        <>
            <section className='padding_bottom'>
                <div className="container">
                    <div className="nearbyhotels rounded-2xl ">


                        <div className="row">
                            <div className="col-lg-12">
                                <div className="nearby_hotel_heading about_hotel_detail ">
                                    <h3>
                                        Location
                                    </h3>
                                </div>
                                {/* *********************** */}
                                <div className="hotel_map">
                                    <iframe src={`https://www.google.com/maps?q=${lat},${long}&hl=en&z=15&output=embed`} width="100%" height="450" className='rounded-2xl' allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}
