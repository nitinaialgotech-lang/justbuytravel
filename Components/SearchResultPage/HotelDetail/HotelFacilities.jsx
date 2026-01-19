import React from "react";
import { RiCheckboxCircleLine } from "react-icons/ri";
export default function HotelFacilities({ hotelAmenties = [], load }) {
    // If no amenities provided, show default static content
    const hasAmenities = hotelAmenties && hotelAmenties.length > 0;
    console.log(hotelAmenties, ".................");


    // ****************************************************
    const ShimmerFacilities = () => {
        return (
            <div className="facilities_section">
                <div className="hotel_detail_page">
                    <div className="facilities-wrap">
                        <div className="single-facilities">
                            {/* Optional shimmer heading */}
                            <div
                                className="shimmer-text mb-4"
                                style={{ width: "25%", height: "20px", borderRadius: "6px" }}
                            ></div>

                            {/* Shimmer list */}
                            <ul className="facilities-list">
                                {Array.from({ length: 6 }).map((_, i) => (
                                    <li key={i} className="flex items-center gap-2">
                                        {/* Icon placeholder */}
                                        <div
                                            className="shimmer-icon"
                                            style={{ width: "16px", height: "16px", borderRadius: "50%" }}
                                        ></div>
                                        {/* Text placeholder */}
                                        <div
                                            className="shimmer-text"
                                            style={{ width: `${80 - i * 5}%`, height: "16px", borderRadius: "4px" }}
                                        ></div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Shimmer CSS */}
                <style dangerouslySetInnerHTML={{
                    __html: `
        @keyframes shimmer {
          0% {
            background-position: -1000px 0;
          }
          100% {
            background-position: 1000px 0;
          }
        }

        .shimmer-text,
        .shimmer-icon {
          display: inline-block;
          position: relative;
          overflow: hidden;
          background-color: #e5e7eb;
        }

        .shimmer-text::before,
        .shimmer-icon::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          width: 100%;
          background: linear-gradient(
            90deg,
            #e5e7eb 0%,
            #f3f4f6 50%,
            #e5e7eb 100%
          );
          background-size: 1000px 100%;
          animation: shimmer 2s infinite;
        }
      `}} />
            </div>
        );
    };

    return (
        <>
            {hasAmenities ? (
                <div className="container ">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="title about_hotel_detail">
                                <h3>Highlights Facilities</h3>
                            </div>
                            {
                                load ? <ShimmerFacilities /> :
                                    <div className="facilities_section ">
                                        <div className="hotel_detail_page">
                                            <div className="facilities-wrap">
                                                <div className="single-facilities">
                                                    <ul className="facilities-list">


                                                        {
                                                            hotelAmenties?.map((item, i) => {
                                                                return (


                                                                    <li key={i}>
                                                                        <RiCheckboxCircleLine />
                                                                        {item}
                                                                    </li>


                                                                )
                                                            })
                                                        }


                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                            }
                        </div>
                    </div>
                </div>
            ) : (
                " "
            )}
        </>
    );
}
