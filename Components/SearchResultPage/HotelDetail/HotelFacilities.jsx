import React from 'react'
import { RiCheckboxCircleLine } from "react-icons/ri";
export default function HotelFacilities({ amenities = [] }) {
    // If no amenities provided, show default static content
    const hasAmenities = amenities && amenities.length > 0;

    return (
        <>
            {
                hasAmenities ? (


                    <div className="container ">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="title about_hotel_detail">
                                    <h3>
                                        Highlights Facilities
                                    </h3>
                                </div>
                                <div className="facilities_section ">
                                    <div className="hotel_detail_page">

                                        {hasAmenities ? (
                                            <div className="facilities-wrap">
                                                <div className="single-facilities">
                                                    <ul className="facilities-list">
                                                        {amenities?.map((amenity, index) => (
                                                            <li key={index}>
                                                                <RiCheckboxCircleLine />
                                                                {amenity}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        ) : (
                                            " "
                                            // Default static content

                                        )}
                                    </div>


                                </div>
                            </div>
                        </div>
                    </div>

                ) : " "
            }

        </>
    )
}
