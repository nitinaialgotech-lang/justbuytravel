import Link from 'next/link'
import React from 'react'
import { getAssetPath } from "@/app/utils/assetPath"
import AboutExperience from './AboutExperience'
import AboutTrailer_photos from './AboutTrailer_photos'
import AboutBitMore_section from './AboutBitMore_section'

export default function AboutDetail() {
    return (
        <>
            <section className='padding_bottom bg_grey '>
                <div className="container">
                    <div className="col-lg-12">
                        <div className="detail_about text-center">
                            {/* ********** */}
                            <div className="about_content">
                                <p>
                                    <strong>JustBuyTravel is a premier digital travel platform</strong>  dedicated to helping travelers <strong>explore the world for less.</strong>  By offering exceptional value deals across a vast global network of <strong>hotels,</strong>  holiday properties, <strong>flights,</strong> and curated activities, we make dream vacations a reality. Whether through our website, JustBuyTravel ensures a seamless experience with <strong>24/7 dedicated customer support.</strong>  Committed to leveraging modern technology, our team is focused on making every journey easier, more <strong>affordable,</strong>  and completely <strong>hassle-free.</strong>
                                </p>
                            </div>
                            {/* ************ */}
                            <div className="break_point flex justify-center">
                                <div className="icon">
                                    <img src={getAssetPath("/aboutus/Vector.png")} alt="" />
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

                </div>
            </section>
            <AboutBitMore_section />
            <AboutExperience />
            <AboutTrailer_photos />
        </>
    )
}
