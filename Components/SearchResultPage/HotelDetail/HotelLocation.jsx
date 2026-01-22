import Footer from "@/component/Footer";
import React from "react";

function ShimmerMap() {
    return (
        <div className="hotel_map">
            <div
                className="shimmer-map rounded-2xl"
                style={{ width: "100%", height: "450px" }}
            ></div>

            {/* Shimmer CSS */}
            <style jsx>{`
                @keyframes shimmer {
                    0% {
                        background-position: -1000px 0;
                    }
                    100% {
                        background-position: 1000px 0;
                    }
                }

                .shimmer-map {
                    position: relative;
                    overflow: hidden;
                    background-color: #e5e7eb;
                }

                .shimmer-map::before {
                    content: "";
                    position: absolute;
                    top: 0;
                    left: 0;
                    height: 100%;
                    width: 100%;
                    background: linear-gradient(90deg, #e5e7eb 0%, #f3f4f6 50%, #e5e7eb 100%);
                    background-size: 1000px 100%;
                    animation: shimmer 2s infinite;
                }
            `}</style>
        </div>
    );
}

export default function HotelLocation({ lat, long, load }) {
    console.log(load, ".........>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");

    return (
        <>
            <section className="padding_bottom">
                <div className="container">
                    <div className="nearbyhotels rounded-2xl ">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className=" section_title ">
                                    <h2 className="m-0">Location</h2>
                                </div>
                                {/* *********************** */}
                                {
                                    load ? <ShimmerMap /> :
                                        <div className="hotel_map">
                                            <iframe
                                                src={`https://www.google.com/maps?q=${lat},${long}&hl=en&z=15&output=embed`}
                                                width="100%"
                                                height="450"
                                                className="rounded-2xl"
                                                allowFullScreen=""
                                                loading="lazy"
                                                referrerPolicy="no-referrer-when-downgrade"
                                            />
                                        </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
