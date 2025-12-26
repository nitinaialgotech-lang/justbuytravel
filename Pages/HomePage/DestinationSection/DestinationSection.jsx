import React from 'react'

export default function
    () {
    return (
        <>
            <section className='destination_section  pb-20 container '>
                <div className="destination_title section_title mb-10">
                    <h2 className='mb-0'>
                        Trending Destinations
                    </h2>
                    <h5 >
                        Whatever you're into, we’ve got it
                    </h5>
                </div>
                {/* ************** */}
                <div className="container_fluid">
                    {/* ******************** */}
                    <div className="row">
                        {/* ****************** col-lg-4 */}
                        <div className="col-12 col-lg-3 col-md-6">
                            <div className="destination_box">
                                <div className="destination_img  ">
                                    <img src="/home/destination/food.webp" className='rounded-3xl' alt="" />
                                    <div className="destination_name">
                                        <h5>
                                            food
                                        </h5>
                                    </div>
                                </div>

                            </div>

                        </div>
                        {/* ******************** */}
                        {/* ****************** col-lg-4 */}
                        <div className="col-12 col-lg-3 col-md-6">
                            <div className="destination_box">
                                <div className="destination_img  ">
                                    <img src="/home/destination/outdoor.webp" className='rounded-3xl' alt="" />
                                    <div className="destination_name">
                                        <h5>
                                            outdoors
                                        </h5>
                                    </div>
                                </div>
                            </div>

                        </div>
                        {/* ******************** */}
                        {/* ****************** col-lg-4 */}
                        <div className="col-12 col-lg-3 col-md-6">
                            <div className="destination_box">
                                <div className="destination_img  ">
                                    <img src="/home/destination/culture.webp" className='rounded-3xl' alt="" />
                                    <div className="destination_name">
                                        <h5>
                                            culture
                                        </h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* ******************** */}
                        {/* ****************** col-lg-4 */}
                        <div className="col-12 col-lg-3 col-md-6">
                            <div className="destination_box">
                                <div className="destination_img  ">
                                    <img src="/home/destination/water.jpg" className='rounded-3xl' alt="" />
                                    <div className="destination_name">
                                        <h5>
                                            water
                                        </h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* ******************** */}
                    </div>
                </div>

            </section>

        </>
    )
}
