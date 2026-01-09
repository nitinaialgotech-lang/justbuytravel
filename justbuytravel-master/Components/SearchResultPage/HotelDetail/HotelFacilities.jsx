import React from 'react'
import { RiCheckboxCircleLine } from "react-icons/ri";
export default function HotelFacilities({ amenities = [] }) {
    // If no amenities provided, show default static content
    const hasAmenities = amenities && amenities.length > 0;
    console.log(amenities?.amenities, ".................");

    const facility = amenities?.map((item) => item?.amenities);
    console.log(facility, "...........");
    const fact = facility?.flat(1)
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


                                        <div className="facilities-wrap">
                                            <div className="single-facilities">
                                                <ul className="facilities-list">
                                                    {fact?.map((item, i) => {
                                                        return (


                                                            <>
                                                                <li key={i}>
                                                                    <RiCheckboxCircleLine />
                                                                    {item?.category}
                                                                </li>


                                                            </>
                                                        )
                                                    })






                                                    }








                                                </ul>
                                            </div>
                                        </div>




                                    </div>


                                </div>
                            </div>
                        </div>
                    </div >

                ) : " "
            }

        </>
    )
}
