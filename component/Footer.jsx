import React from 'react'
import { MdLocationPin } from "react-icons/md";
import { LuClock4 } from "react-icons/lu";
import { TbMailFilled } from "react-icons/tb";
import Link from 'next/link';
import { IoLogoFacebook } from "react-icons/io";
import { AiFillInstagram } from "react-icons/ai";
import { RiTwitterXLine } from "react-icons/ri";
export default function Footer() {
    return (
        <>
            <section className='footer_section '>
                <footer className='footer'>
                    <div className="container pt-20  ">
                        <div className="row items-center">
                            <div className="col-lg-4">
                                <div className="footer_detail">
                                    <div className="footer_logo">
                                        <img src="/logo/footer_img.png" alt="" />
                                    </div>
                                    <div className="footer_title">
                                        <p>
                                            Dive into local recommendations for a truly
                                            authentic experience.
                                        </p>
                                    </div>
                                    <div className="footer_location">
                                        <ul className='p-0' >
                                            <li className='flex gap-3'><span><MdLocationPin /></span>   4517 Washington Ave. Manchester, Kentucky
                                                39495</li>
                                            <li className='flex gap-3'><span><LuClock4 /></span> Hours: 8:00 - 17:00, Mon - Sat</li>
                                            <li className='flex gap-3'><span><TbMailFilled /></span> support@justbuytravel.com</li>
                                        </ul>

                                    </div>

                                </div>
                            </div>
                            <div className="col-lg-1"></div>
                            <div className="col-lg-2">
                                <div className="footer_link">
                                    <div className="link_title">
                                        <h5>Comapny</h5>
                                    </div>
                                    <ul className='p-0'>
                                        <li><Link href={""}>About us </Link></li>
                                        <li><Link href={""}>Comunity & blogs</Link></li>
                                        <li><Link href={""}>Job & career</Link></li>
                                        <li><Link href={""}>Contact Us </Link></li>
                                        <li><Link href={""}>Our Awards</Link></li>

                                    </ul>
                                </div>
                            </div>
                            <div className="col-lg-2">
                                <div className="footer_link">
                                    <div className="link_title ">
                                        <h5 className='ps-4'>Services</h5>
                                    </div>
                                    <ul className='ps-4'>
                                        <li><Link href={""}>Tour Gide</Link></li>
                                        <li><Link href={""}>Tour Booking</Link></li>
                                        <li><Link href={""}>Hotel Booking</Link></li>
                                        <li><Link href={""}>Ticket Booking</Link></li>
                                        <li><Link href={""}>Rental Booking</Link></li>

                                    </ul>
                                </div>
                            </div>
                            <div className="col-lg-3">
                                <div className="footer_newslatter">
                                    <div className="link_title ">
                                        <h5 className=' text-white'>NewsLatter</h5>
                                    </div>
                                    <div className="news_latter_input mt-3">
                                        <input type="text" placeholder='Enter You Mail' className='w-full text-gray-400 border rounded-5 p-3' />

                                    </div>
                                    <div className="news_later_button text-center">
                                        <button className='w-full rounded-5 p-3 text-black mt-3  text-center '>
                                            Subscribe
                                        </button>
                                    </div>
                                </div>



                            </div>
                        </div>
                        {/* ************************************* footer contact info */}
                        <div className="footer_contact_info pt-10 ">
                            <div className="row items-center border rounded-3xl p-3">
                                <div className="col-lg-4">
                                    <div className="footer_contact_detail ps-5 pe-5">
                                        <div className="contact flex items-center gap-2">
                                            <div className="icon">
                                                <img src="/footer/icon/help.svg_fill.png" alt="" />
                                            </div>
                                            <div className="call_us">
                                                <p className='m-0'>Need help? Call us</p>
                                                <h5>
                                                    1-800-222-8888
                                                </h5>

                                            </div>


                                        </div>

                                    </div>

                                </div>
                                <div className="col-lg-4 border-l-2 ">
                                    <div className="footer_contact_detail ps-5 pe-5">
                                        <div className="join_us flex items-center gap-2">
                                            <div className="icon">
                                                <img src="/footer/icon/join.svg.png" alt="" />
                                            </div>
                                            <div className="content">
                                                <h5>
                                                    Join Travila Affiliate
                                                    Program Today !
                                                </h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 border-l-2">
                                    <div className="footer_contact_detail ps-5 pe-5">
                                        <div className="send_msg flex items-center gap-2">
                                            <div className="icon">
                                                <img src="/footer/icon/msg.svg.png" alt="" />
                                            </div>
                                            <div className="content">
                                                <h5>
                                                    Send us a message
                                                </h5>
                                                <p className='m-0'>Contact our agents about your booking,
                                                    and we'll reply as soon as possible.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                        {/* ******************************************************************** botton ooter */}
                        <div className="bottom_footer">
                            <div className="reserved_section flex justify-between items-center py-10">
                                <div className="content">
                                    <p className='m-0'>
                                        © 2025 Justbuytravel.com. All rights reserved.
                                    </p>
                                </div>
                                <div className="follow_icon flex justify-center items-center gap-3">
                                    <h5 className='m-0 capitalize'>
                                        follow us
                                    </h5>
                                    <span>
                                        <IoLogoFacebook />
                                    </span>
                                    <span>
                                        <AiFillInstagram />
                                    </span>
                                    <span>
                                        <RiTwitterXLine />
                                    </span>
                                    <span></span>

                                </div>
                            </div>

                        </div>
                    </div>



                </footer>
            </section>



        </>
    )
}
