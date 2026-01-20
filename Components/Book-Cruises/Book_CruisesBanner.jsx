import React from 'react'
import Find_CruisesSection from './Find_CruisesSection'

export default function Book_CruisesBanner() {
    return (
        <>
            <section className='about_section page_banner_section relative'>
                <div className="container">
                    <div className="row justify-center">
                        <div className="col-lg-12">
                            <div className="banner_box">
                                <div className="title text-center">
                                    <h2 className='capitalize'>
                                        Quick Cruise Booking with Trusted  <span>Guidance</span>
                                    </h2>
                                    {/* <h5 className='capitalize'>
                                        <strong className='g_color'> JustBuyTravel</strong> Your Easy Way to Book Flights and Hotels
                                    </h5> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Find_CruisesSection />

        </>
    )
}
