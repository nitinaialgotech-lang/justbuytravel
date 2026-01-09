import React from 'react'

export default function AboutHotelDetail({ detail, sub_desc }) {
    console.log(detail, "kkkkkkkkkkllll",);

    const sub = sub_desc?.flat(1)
    return (
        <>
            <div className="section_about_hotel_detail ">
                <div className="container">
                    <div className="about_hotel rounded-2xl ">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="about_hotel_detail">
                                    <h3 className=''>
                                        {detail}
                                    </h3>
                                    {
                                        sub?.map((item) => {
                                            return (
                                                <>
                                                    <p>
                                                        {item}
                                                    </p>

                                                </>
                                            )
                                        })
                                    }


                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>


        </>
    )
}
