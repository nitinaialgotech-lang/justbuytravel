import Link from 'next/link'
import React from 'react'

export default function Blogs() {
    return (
        <>

            <section className='blog_section'>
                <div className="destination_title section_title mb-10">
                    <h2 className='mb-0 capitalize'>
                        From the blog
                    </h2>
                    <h5 >
                        Whatever you're into, we’ve got it
                    </h5>
                </div>
                <div className="row">
                    {/* ******************************* */}
                    <div className="col-12 col-md-6 col-lg-3">
                        {/* **************** */}
                        <div className="blog_box mb-10">
                            <div className="blog_img relative ">
                                <img src="/blog/Budget-Travel.webp " className='rounded-2xl' alt="" />
                                <div className="inner_content absolute top-6 left-4">
                                    Top Rated
                                </div>
                                <div className="content mt-2">
                                    <Link href="#">
                                        Should Kpop and Kdrama Lovers Visit Seoul in 2026?</Link>
                                </div>
                            </div>
                        </div>
                        {/* **************** */}
                    </div>
                    {/* ******************************* */}
                    <div className="col-12 col-md-6 col-lg-3">
                        {/* ***************** */}
                        <div className="blog_box mb-10">
                            <div className="blog_img relative ">
                                <img src="/blog/Budget-Travel.webp " className='rounded-2xl' alt="" />
                                <div className="inner_content absolute top-6 left-4">
                                    Top Rated
                                </div>
                                <div className="content mt-2">
                                    <Link href="#">
                                        Should Kpop and Kdrama Lovers Visit Seoul in 2026?</Link>
                                </div>
                            </div>
                        </div>
                        {/* ****************** */}

                    </div>
                    {/* ******************************* */}
                    <div className="col-12 col-md-6 col-lg-3">
                        {/* ***************** */}
                        <div className="blog_box mb-10">
                            <div className="blog_img relative ">
                                <img src="/blog/Budget-Travel.webp " className='rounded-2xl' alt="" />
                                <div className="inner_content absolute top-6 left-4">
                                    Top Rated
                                </div>
                                <div className="content mt-2">
                                    <Link href="#">
                                        Should Kpop and Kdrama Lovers Visit Seoul in 2026?</Link>
                                </div>
                            </div>
                        </div>
                        {/* ****************** */}


                    </div>
                    {/* ******************************* */}
                    <div className="col-12 col-md-6 col-lg-3">
                        {/* ***************** */}
                        <div className="blog_box mb-10">
                            <div className="blog_img relative ">
                                <img src="/blog/Budget-Travel.webp " className='rounded-2xl' alt="" />
                                <div className="inner_content absolute top-6 left-4">
                                    Top Rated
                                </div>
                                <div className="content mt-2">
                                    <Link href="#">
                                        Should Kpop and Kdrama Lovers Visit Seoul in 2026?</Link>
                                </div>
                            </div>
                        </div>
                        {/* ****************** */}


                    </div>

                </div>

            </section>

        </>
    )
}
