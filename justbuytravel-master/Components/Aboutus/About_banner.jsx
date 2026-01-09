import React from 'react'
import Trust_Guide_Section from './Trust_Guide_Section'
import AboutDetail from './AboutDetail'

export default function About_banner() {
    return (
        <>
            <section className='about_section padding_bottom relative'>
                <div className="container">
                    <div className="row justify-center">
                        <div className="col-lg-12">
                            <div className="banner_box">
                                <div className="title text-center">
                                    <h2 className='capitalize'>
                                        Your Trusted  <span> Travel Partner</span>
                                    </h2>
                                    <h5 className='capitalize'>
                                        <strong className='g_color'> JustBuyTravel</strong> Your Easy Way to Book Flights and Hotels
                                    </h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <AboutDetail />

            <Trust_Guide_Section />
        </>
    )
}
