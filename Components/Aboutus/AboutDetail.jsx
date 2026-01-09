import React from 'react'

export default function AboutDetail() {
    return (
        <section className='padding_bottom bg_grey pt-5'>
            <div className="container">
                <div className="row justify-center">
                    <div className="col-lg-5">
                        <div className="about_img">
                            <img src="/justbuytravel_next/demo/aboutus/aboutImg.webp" alt="" />
                        </div>

                    </div>
                    <div className="col-lg-5">
                        <div className="about_content">
                            <div className="section_title">
                                <h2>
                                    At JustBuyTravel
                                </h2>

                                <p>
                                    This site is dedicated to helping you find the best value flights and hotels from around the globe. We know that booking accommodation and flights online isn’t easy, but we believe it should be. Having to trawl through a hundred websites looking at a thousand ‘deals’ can be overwhelming and complicated.
                                </p>
                                <p>
                                    At the end of the day, you just want to know you’ve booked the hotel that’s right for you – at the best possible price. We saw the opportunity to do something about this. Since then we’ve been working hard to find you the best hotel deals.
                                </p>
                            </div>
                            <div className="button">
                                <button className='button_bg2  rounded-full bg-color-green color_bl'>
                                    Read More
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
