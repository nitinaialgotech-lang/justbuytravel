import React from 'react'

export default function AboutHotelDetail({ detail, name }) {
    return (
        <>
            <div className="section_about_hotel_detail py-3 ">
                <div className="container">
                    <div className="about_hotel rounded-2xl p-4 ">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="about_hotel_detail">
                                    <h3 className='pb-2'>
                                        About {name}
                                    </h3>
                                    <p>
                                        {detail}
                                    </p>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>


        </>
    )
}
