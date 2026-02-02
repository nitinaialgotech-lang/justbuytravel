import React from 'react'

export default function AboutExperience() {
    return (
        <>
            <section className='padding_top padding_bottom'>
                <div className="container">
                    <div className="row">
                        <div className="about_section_title text-center">
                            <h2>
                                A Trusted Voice in The Conversation between Travelers andexperience
                            </h2>
                            <p>
                                we sitat theintersectionof people-powered travel guidanceand the businessesthat bringthe experienceto life.
                            </p>
                        </div>
                        <div className="col-lg-12">
                            <div className="experience_section">
                                <div className="about_experience_items">

                                    <div className="about_experience_box sky_lighblue ">
                                        <h4 className='m-0 p-0'>
                                            Consumer
                                        </h4>
                                    </div>
                                    {/* *********************arrow icon ....... */}
                                    <div className="about_experience_arrow d-none d-lg-block ">
                                        <img src="/logo/left_arrow.png" alt="" />
                                    </div>
                                    {/* *******************  Arrow icon  */}
                                    <div className="about_experience_box about_experience_img sky_lighblue ">

                                    </div>
                                    {/* ****************************** arrow icon  */}
                                    <div className="about_experience_arrow d-none d-lg-block  ">
                                        <img src="/logo/right_arrow.png" alt="" />
                                    </div>
                                    {/* ****************************** arrow icon  */}
                                    <div className="about_experience_box sky_lighblue ">
                                        <h4 className='m-0 p-0'>
                                            Consumer
                                        </h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
