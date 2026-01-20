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
                            <div className="section_title relative ">
                                <h2 className="mb-0">Quick Links</h2>
                            </div>
                            <div className="quick_links ">
                                {/* *********************************************** */}
                                <div className="quick_link_box">
                                    <div className="quick_link_items">
                                        <h4>Asia Flights</h4>
                                        <ul className='p-0 flex'>
                                            <li ><span className='g_color'><IoAirplane /></span><Link href={"/dubai"}>Dubai</Link></li>

                                        </ul>
                                    </div>
                                    <hr></hr>
                                </div>
                                {/* *********************************************** */}
                                <div className="quick_link_box">
                                    <div className="quick_link_items">
                                        <h4>Europe Flights</h4>
                                        <ul className='p-0 flex'>
                                            <li ><span className='g_color'><IoAirplane /></span><Link href={"/newyork"}>New York To London</Link></li>
                                            <li ><Link href={""}>London</Link></li>
                                            <li ><Link href={"/paris"}>Paris</Link></li>
                                            <li><Link href={"/saudi-to-india"}>Saudi To India</Link></li>
                                            <li>
                                                <Link href={""}>India To Italy</Link>
                                            </li>
                                        </ul>
                                    </div>
                                    <hr></hr>
                                </div>
                                {/* *********************************************** */}
                                <div className="quick_link_box">
                                    <div className="quick_link_items">
                                        <h4>North America Flights</h4>
                                        <ul className='p-0 flex'>
                                            <li ><span className='g_color'><IoAirplane /></span><Link href={"/newyork"}>New York</Link></li>

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
