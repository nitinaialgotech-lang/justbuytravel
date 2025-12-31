import Link from 'next/link'
import React from 'react'

export default function Blog_Right_Sidebar() {
    return (
        <>
            <div className="blog_post_section">
                <div className="post_title ">
                    <h4>
                        Recent Post
                    </h4>
                    {/* ************************** */}
                    <ul className="blog_post_box p-0">
                        <li>
                            <Link href={""} className="post_img">
                                <img src="/justbuytravel_next/demo/blog/Budget-Travel.webp" className='rounded' alt="" />
                            </Link>
                            <span className="box_post_title">
                                <h5 className='m-0'>
                                    Budget Travel Guide for Cape Town
                                </h5>
                                <p className='m-0'>
                                    December 17, 2025
                                </p>

                            </span>
                        </li>
                        {/*  *****************************************/}
                        <li>
                            <Link href={""} className="post_img">
                                <img src="/justbuytravel_next/demo/blog/Budget-Travel.webp" className='rounded' alt="" />
                            </Link>
                            <span className="box_post_title">
                                <h5 className='m-0'>
                                    Budget Travel Guide for Cape Town
                                </h5>
                                <p className='m-0'>
                                    December 17, 2025
                                </p>

                            </span>
                        </li>
                        {/* ********************************************************* */}
                        <li>
                            <Link href={""} className="post_img">
                                <img src="/justbuytravel_next/demo/blog/Budget-Travel.webp" className='rounded' alt="" />
                            </Link>
                            <span className="box_post_title">
                                <h5 className='m-0'>
                                    Budget Travel Guide for Cape Town
                                </h5>
                                <p className='m-0'>
                                    December 17, 2025
                                </p>

                            </span>
                        </li>
                        {/* ************************************************************* */}
                        <li>
                            <Link href={""} className="post_img">
                                <img src="/justbuytravel_next/demo/blog/Budget-Travel.webp" className='rounded' alt="" />
                            </Link>
                            <span className="box_post_title">
                                <h5 className='m-0'>
                                    Budget Travel Guide for Cape Town
                                </h5>
                                <p className='m-0'>
                                    December 17, 2025
                                </p>

                            </span>
                        </li>


                    </ul>
                    {/* ************************** */}
                </div>

            </div>


        </>
    )
}
