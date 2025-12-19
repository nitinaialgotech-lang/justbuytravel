"use client"
import Link from 'next/link'
import React from 'react'
import { FaHotel } from "react-icons/fa";
import { MdFlight } from "react-icons/md";
import { FaCar } from "react-icons/fa6";
import { GrBike } from "react-icons/gr";
import { FaUser } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
export default function SearchSection() {

    return (
        <>
            <section className="Search_section pb-20">
                <div className="container">
                    <div className="search_container">
                        <div className="search_container_box  bg-white rounded-2xl pb-4 w-full w-100">
                            {/* *************** */}
                            <div className="search_tab ps-5 pe-5 pt-4 pb-4">
                                <div className="tab_link flex justify-between ">
                                    <ul className='flex items-center gap-3 p-0'>
                                        <li ><Link href={""} className='button_bg text-white'>search all</Link></li>
                                        <li><Link href={""}><span><FaHotel /></span> <span>hotels</span></Link></li>
                                        <li><Link href={""}><span><MdFlight /></span> <span>flights</span></Link></li>
                                        <li><Link href={""}><span><FaCar /></span> <span>Things to do</span></Link></li>
                                        <li><Link href={""}><span><GrBike /></span> <span>Restaurant</span></Link></li>
                                    </ul>
                                    <div className="help_info">
                                        <p className='flex items-center gap-2'><span><FaUser /></span> <span>need some help ?</span></p>
                                    </div>
                                </div>
                            </div>
                            {/* ********************************** seacrh input >>>>>>>>> */}
                            <div className="search_box_input">
                                <form className="px-15 mx-auto  ">
                                    <div className="relative search_box">
                                        <div className="absolute inset-y-0 start-0 flex items-center ps-4 pointer-events-none icon_search">
                                            <CiSearch />
                                        </div>
                                        <input type="search" id="search" className="block w-full  bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:outline-none focus:ring-0 active:outline-none shadow-xs placeholder:text-body" placeholder="Places to go, things to do, hotels..." required />
                                        <Link href={""} className="absolute top-7 end-5  bg-brand hover:bg-brand-strong box-border border border-transparent focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5  text-xs px-3  focus:outline-none button_bg2">Search</Link>
                                    </div>
                                </form>

                            </div>



                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
