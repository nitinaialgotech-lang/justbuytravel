"use client"
import { renderBootstrapStars } from '@/component/renderBootstrapStars'
import moment from 'moment'
import Link from 'next/link'
import React, { useState } from 'react'

export default function HotelAllReview({ reviews }) {
    const [expandedIndex, setExpandedIndex] = useState(null);
    const [showAll, setShowAll] = useState(false);
    // *****************
    const visibleReviews = showAll ? reviews : reviews?.slice(0, 3);
    return (
        <>
            <section className='trailer_review_section padding_bottom'>
                <div className="container">
                    <div className="row">
                        <div className="section_title">
                            <h2 className='m-0'>
                                Trailers Reviews
                            </h2>
                            <h5>
                                Voices of satisfaction from our premium community.
                            </h5>
                        </div>
                        {/* ******************** */}



                        <div className="col-lg-9">
                            {
                                visibleReviews?.map((item, index) => {
                                    const text = item?.text?.text || "";
                                    const words = text.split(" ");
                                    const isLongText = words.length > 50;

                                    const isExpanded = expandedIndex === index;
                                    const displayedText = isExpanded
                                        ? text
                                        : words.slice(0, 50).join(" ");
                                    return (
                                        <>



                                            <div className="review_box_section mb-3">
                                                <div className="review_head flex justify-between ">
                                                    <div className="user">
                                                        <div className="user_img flex items-center gap-3">
                                                            <span> <img src={item?.authorAttribution?.photoUri} width={48} height={48} alt="" /></span>
                                                            <span>
                                                                <h6 className='m-0'>
                                                                    {item?.authorAttribution?.displayName}
                                                                </h6>
                                                            </span>
                                                        </div>
                                                        <div className="rating hotel_rating flex gap-2 items-center">
                                                            <span>
                                                                {renderBootstrapStars(4)}
                                                            </span>
                                                            <span>
                                                                <p className='m-0'>
                                                                    {moment(item?.publishTime).format("DD MMM YYYY hh:mm A")}
                                                                </p>
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="like_button">
                                                        <img src="/justbuytravel_next/demo/review/like.png" alt="" />
                                                    </div>

                                                </div>
                                                {/* ********************** */}
                                                <div className="review_content">
                                                    <p className=''>
                                                        {displayedText}
                                                        {!isExpanded && isLongText && "..."}
                                                    </p>

                                                    <button onClick={() =>
                                                        setExpandedIndex(isExpanded ? null : index)
                                                    }> {isExpanded ? "Read less" : "Read more"}</button>
                                                </div>
                                            </div>

                                        </>
                                    )
                                })
                            }
                            {/* *************  review xxxxxxxxxxxx */}

                            {reviews?.length > 3 && !showAll && (
                                <div className="review_more mt-4">
                                    <button
                                        onClick={() => setShowAll(true)}
                                        className=" text-black underline font-semibold capitalize"
                                    >
                                        View more reviews
                                    </button>
                                </div>
                            )}

                            {/* *************  review xxxxxxxxxxxx */}
                        </div>
                        {/* ******************** */}
                        <div className="col-lg-3">
                            <div className="review_banner padding_bottom ">
                                <div className="banner_img ">
                                    <img src="/justbuytravel_next/demo/review/banner.png" className='' alt="" />
                                </div>

                            </div>
                        </div>

                    </div>
                </div>

            </section>



        </>
    )
}
