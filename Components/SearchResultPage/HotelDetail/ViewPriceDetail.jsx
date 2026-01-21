import React from 'react'
import { RiCheckboxCircleLine } from 'react-icons/ri'

export default function ViewPriceDetail() {
    return (
        <>

            <section>
                <div className="container">
                    <div className="row matrix_fix">
                        <div className="col-lg-12 ">
                            <div className=" content_box_detail view_price_detial_content rounded-2xl border border-gray-300">
                                <div className="view_price_title">
                                    <h4>
                                        View prices for your travel dates
                                    </h4>
                                </div>
                                <div className="view_price_box">
                                    <div className="price_box">
                                        <div className="row items-center">
                                            <div className="col-lg-4">
                                                <div className="price_box_item ">
                                                    <div className="icon text-center flex justify-center">
                                                        <img src="/justbuytravel_next/demo/price_img/price-icon1.png" alt="" />
                                                    </div>
                                                </div>
                                            </div>

                                            {/* ********* col */}
                                            <div className="col-lg-4">
                                                <div className="price_box_price flex justify-center">
                                                    <h4>
                                                        $2132432
                                                    </h4>
                                                </div>
                                            </div>
                                            {/* ************ */}
                                            <div className="col-lg-4">
                                                <div className="price_box_button price_view_detail flex justify-center">
                                                    <button className="hotel_detail_button text-white">
                                                        view details
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
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
