import Link from 'next/link';
import React from 'react'
import { IoAirplane } from "react-icons/io5";
export default function QuickLinks() {
    return (

        <>

            <section className=''>

                <div className="container padding_bottom ">
                    <div className="row">
                        <div className="col-lg-12">
                            {/* ********** links */}
                            <div className="section_title relative m-0 ">
                                <h2 className="mb-0">Quick Links</h2>
                            </div>
                            <div className="quick_links ">
                                {/* *********************************************** */}
                                <div className="quick_link_box">
                                    <div className="quick_link_items">
                                        {/* <h4>Asia Flights</h4> */}
                                        <ul className='p-0 flex capitalize'>
                                            <li ><Link href={"/dubai"}>Hotel In Dubai</Link></li>
                                            {/* <li ><Link href={"/newyork"}>New York To London</Link></li> */}
                                            <li ><Link href={"/australia"}>Hotel In Australia</Link></li>
                                            <li ><Link href={"/canada"}>Hotel In Canada</Link></li>
                                            <li ><Link href={"/denmark"}>Hotel In Denmark</Link></li>
                                            <li ><Link href={"/glasgow"}>Hotel In glasgow</Link></li>
                                            <li ><Link href={"/goa"}>Hotel In goa</Link></li>
                                            <li ><Link href={"/ireland"}>Hotel In ireland</Link></li>
                                            <li ><Link href={"/manchester"}>Hotel In menchester</Link></li>
                                            <li ><Link href={"/newyork"}>Hotel In new york</Link></li>
                                            <li ><Link href={"/paris"}>Hotel In paris</Link></li>
                                            <li ><Link href={"/san-francisco"}>Hotel In san-francisco</Link></li>
                                            <li ><Link href={"/saudi-to-india"}>Hotel In saudi to india</Link></li>
                                            <li ><Link href={"/singapore"}>Hotel In singapore</Link></li>
                                            <li ><Link href={"/sydney"}>Hotel In sydney</Link></li>
                                            <li ><Link href={"/tokyo"}>Hotel In tokyo</Link></li>
                                            <li ><Link href={"/usa"}>Hotel In usa</Link></li>




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

        </>
    )
}
