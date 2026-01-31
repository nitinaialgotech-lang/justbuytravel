import Link from 'next/link'
import React from 'react'

export default function FlightQuickLinks() {
    return (
        <section className=''>
            <div className="container padding_bottom ">
                <div className="row">
                    <div className="col-lg-12">
                        {/* ********** links */}
                        <div className="section_title relative m-0 ">
                            <h2 className="mb-2">Quick Links</h2>
                        </div>
                        <div className="quick_links ">
                            {/* *********************************************** */}
                            <div className="quick_link_box">
                                <div className="quick_link_items">
                                    {/* <h4>Asia Flights</h4> */}
                                    <ul className='p-0 flex capitalize'>
                                        <li ><Link href={"/book-hotels-dubai"}> Dubai Flight</Link></li>
                                        {/* <li ><Link href={"/newyork"}>New York To London</Link></li> */}
                                        <li ><Link href={"/hotels-in-australia"}> Australia Flight</Link></li>
                                        <li ><Link href={"/hotels-in-canada"}> Canada Flight</Link></li>
                                        <li ><Link href={"/hotels-in-denmark"}> Denmark Flight</Link></li>
                                        <li ><Link href={"/hotels-in-glasgow"}> glasgow Flight</Link></li>
                                        <li ><Link href={"/hotels-in-goa"}> goa Flight</Link></li>
                                        <li ><Link href={"/hotels-in-ireland"}> ireland Flight</Link></li>
                                        <li ><Link href={"/hotels-in-manchester"}> menchester Flight</Link></li>
                                        <li ><Link href={"/hotels-in-New-York"}> new york Flight</Link></li>
                                        <li ><Link href={"/hotels-in-paris"}> paris Flight</Link></li>
                                        <li ><Link href={"/hotels-in-san-francisco"}> san-francisco Flight</Link></li>
                                        <li ><Link href={"/hotels-in-uk"}> united-kingdom Flight</Link></li>
                                        <li ><Link href={"/singapore"}> singapore Flight</Link></li>
                                        <li ><Link href={"/sydney"}> sydney Flight</Link></li>
                                        <li ><Link href={"/tokyo"}> tokyo Flight</Link></li>
                                        <li ><Link href={"/usa"}> usa Flight</Link></li>




                                    </ul>
                                </div>
                                <hr></hr>
                            </div>
                            {/* *********************************************** */}

                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
