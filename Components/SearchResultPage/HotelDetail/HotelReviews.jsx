import moment from 'moment';
import React from 'react'

export default function HotelReviews({ reviews }) {
    console.log(reviews);

    return (
        <>
            <section className='review_section'>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            {
                                reviews?.map((item) => {
                                    return (
                                        <>

                                            <div className="review_box_section">
                                                <div className="review_head flex items-center gap-2">
                                                    <div className="usr_img">
                                                        <img src={item?.authorAttribution?.photoUri} width={40} height={40} alt="" />

                                                    </div>
                                                    <div className="user_info">
                                                        <p className='m-0'>{item?.authorAttribution?.displayName}   <span>wrote a review {moment(item?.publishTime).format("DD MMM YYYY hh:mm A")}</span></p>
                                                    </div>
                                                </div>
                                                {/* ************* */}
                                                <div className="content">
                                                    <p>
                                                        {item?.text?.text}
                                                    </p>
                                                </div>

                                            </div>
                                            <hr></hr>
                                        </>
                                    )

                                })
                            }
                        </div>
                        <div className="col-lg-4"></div>
                    </div>
                </div>

            </section>

        </>
    )
}
