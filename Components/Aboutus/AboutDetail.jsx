import Link from 'next/link'
import React from 'react'

export default function AboutDetail() {
    return (
        <section className='padding_bottom bg_grey '>
            <div className="container">
                {/* <div className="row justify-center">
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
                </div> */}

                <div className="col-lg-12">
                    <div className="detail_about text-center">
                        {/* ********** */}
                        <div className="about_content">
                            <p>
                                JustBuyTravel is a premier digital travel platform dedicated to helping travelers explore the world for less. By offering exceptional value deals across a vast global network of hotels, holiday properties, flights, and curated activities, we make dream vacations a reality. Whether through our website, JustBuyTravel ensures a seamless experience with 24/7 dedicated customer support. Committed to leveraging modern technology, our team is focused on making every journey easier, more affordable, and completely hassle-free.
                            </p>
                        </div>
                        {/* ************ */}
                        <div className="break_point flex justify-center">
                            <div className="icon">
                                <img src="/justbuytravel_next/demo/aboutus/vector.png" alt="" />
                            </div>
                        </div>
                        {/* ********** */}
                        <div className="about_review_section">
                            <div className="head_line section_title">
                                <h2>
                                    Globally recognised and growing every day
                                </h2>
                            </div>
                            <div className="box_content ">
                                <div className="row">
                                    {/* ************************* */}
                                    <div className="col-lg-6">
                                        <div className="box_content_box sky_blue">
                                            <div className="content">
                                                <h2 className='p-0 m-0'>
                                                    24/7
                                                </h2>
                                                <p>
                                                    Customer Support
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    {/* ************************* */}
                                    <div className="col-lg-6">
                                        <div className="box_content_box sky_yellow mrt-20">
                                            <div className="content">
                                                <h2 className='p-0 m-0'>
                                                    1M+
                                                </h2>
                                                <p>
                                                    Real traveler reviews
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    {/* ************************* */}
                                    <div className="col-lg-6 mt-4">
                                        <div className="box_content_box sky_green">
                                            <div className="content">
                                                <h2 className='p-0 m-0'>
                                                    100+
                                                </h2>
                                                <p>
                                                    Countries with accommodation
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    {/* ************************* */}
                                    <div className="col-lg-6 mt-4">
                                        <div className="box_content_box sky_red">
                                            <div className="content">
                                                <h2 className='p-0 m-0'>
                                                    1k+
                                                </h2>
                                                <p>
                                                    Hotels and homes worldwide
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    {/* ************************* */}
                                </div>

                            </div>

                        </div>
                    </div>
                </div>
                {/* ********************************* a bit more about us ..................... */}

                <div className="bitmore_section padding_top">

                    <div className="section_title">
                        <h2 className='m-0 p-0'>
                            A bit more about us...
                        </h2>
                    </div>

                    <div className="row">
                        <div className="col-lg-5">
                            <div className="bit_content relative">
                                <img src="bit1.png" alt="" className='relative' />
                                <div className="content absolute ">
                                    <p className=''>
                                        What exactly does Justbuytravel offer?
                                    </p>
                                    <h2>
                                        Flights, and more at affordable prices
                                    </h2>
                                    <Link href={""}>Check Now</Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-7">



                            <div className="bit_content relative right_h mrt-20">
                                <img src="bit2.png" alt="" className='relative' />
                                <div className="content absolute ">

                                    <h2>
                                        Book a memreable moment with your travel buddy!
                                    </h2>
                                    <Link href={""}>Check Now</Link>
                                </div>
                            </div>

                            {/* ************* */}


                            <div className="bit_content relative right_h mt-4">
                                <img src="bit3.png" alt="" className='relative' />
                                <div className="content absolute bottom-7">

                                    <h2>
                                        Luxury hotels at affordable prices
                                    </h2>
                                    <Link href={""}>Check Now</Link>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
            </div>
        </section>
    )
}
