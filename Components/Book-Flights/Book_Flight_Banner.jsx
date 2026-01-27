import React from 'react'
import Search_flight_section from './Search_flight_section'
import "../../style/responsive.css"
import Search from '../HomePage/Search'
export default function Book_Flight_Banner() {
    return (
        <>
            <section className='book-flight-section page_banner_section d-none d-lg-block padding_top_0_md'>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="book-flight-title ">
                                <div className="banner_box home_banner">
                                    <div className="title text-center">
                                        <h1 className='capitalize'>
                                            Quick Flights Booking with <span> Trusted Guidance</span>
                                        </h1>
                                        {/* <h5 className='capitalize'>
                                        JustBuyTravel explored <strong className='g_color'> hundreds of Flights </strong>  so you can book with <strong className='g_color'> clarity, ease, and confidence .</strong>Your Easy Way to Book Flights and Hotels
                                    </h5> */}
                                    </div>
                                </div>
                            </div>




                        </div>
                    </div>
                </div>

            </section>
            <Search />
        </>
    )
}
