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
                                        <li ><Link href={"/book-hotels-dubai"}>Flight For Dubai</Link></li>
                                        {/* <li ><Link href={"/newyork"}>New York To London</Link></li> */}
                                        <li ><Link href={"/hotels-in-australia"}>Flight For Australia</Link></li>
                                        <li ><Link href={"/hotels-in-canada"}>Flight For Canada</Link></li>
                                        <li ><Link href={"/hotels-in-denmark"}>Flight For Denmark</Link></li>
                                        <li ><Link href={"/hotels-in-glasgow"}>Flight For glasgow</Link></li>
                                        <li ><Link href={"/hotels-in-goa"}>Flight For goa</Link></li>
                                        <li ><Link href={"/hotels-in-ireland"}>Flight For ireland</Link></li>
                                        <li ><Link href={"/hotels-in-manchester"}>Flight For menchester</Link></li>
                                        <li ><Link href={"/hotels-in-New-York"}>Flight For new york</Link></li>
                                        <li ><Link href={"/hotels-in-paris"}>Flight For paris</Link></li>
                                        <li ><Link href={"/hotels-in-san-francisco"}>Flight For san-francisco</Link></li>
                                        <li ><Link href={"/hotels-in-uk"}>Flight For united-kingdom</Link></li>
                                        <li ><Link href={"/singapore"}>Flight For singapore</Link></li>
                                        <li ><Link href={"/sydney"}>Flight For sydney</Link></li>
                                        <li ><Link href={"/tokyo"}>Flight For tokyo</Link></li>
                                        <li ><Link href={"/usa"}>Flight For usa</Link></li>




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
