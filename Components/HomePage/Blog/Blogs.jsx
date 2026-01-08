'use client';
import Link from 'next/link'
import React, { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";
import 'swiper/css/pagination';
import { useQuery } from '@tanstack/react-query';
import { Get_Blogs } from '@/app/Route/endpoints';
export default function Blogs() {
    // (((((((((((((((((())))))))))))))))))
    const [isBlogActive, BlogActive] = useState(true);
    // ******************************************************
    const { data, isLoading } = useQuery({
        queryKey: ["blog"],
        queryFn: () => Get_Blogs()

    })
    if (isLoading) return <div className='pt-20 pb-20 text-center'>
        <h4>
            Blog is Loading .....
        </h4>
    </div>


    return (
        <>
            <section className='blog_section container padding_top padding_bottom  '>
                <div className="section_title ">
                    <h2 className='mb-0 capitalize'>
                        From the blog
                    </h2>
                    <h5 >
                        Whatever you're into, we’ve got it
                    </h5>
                </div>
                {/* ********************** */}
                <div className="container d-none d-lg-block">
                    <div className="row">

                        {
                            data?.data?.slice(1, 5).map((item, i) => {
                                return (

                                    <div className="col-12 col-md-6 col-lg-3" key={i}>
                                        {/* **************** */}
                                        <div className="blog_box mb-10">
                                            <div className="blog_img relative ">
                                                <img src={item?.yoast_head_json?.og_image?.map((item) => item?.url)} className='card_rounded' alt={item?.title?.rendered || "Travel blog post image"} />
                                                {/* <div className="inner_content absolute top-6 left-4">
                                                    Top Rated
                                                </div> */}
                                                <div className="content mt-2">
                                                    <Link href={`/blogs?detail=${item?.id}`}>
                                                        {item?.title?.rendered}
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                        {/* **************** */}
                                    </div>

                                )




                            })
                        }



                    </div>
                </div>
                {/* ****************************************************************************************   display block >>>>>>>>>>>>>>>>>>>> */}
                <div className="container  d-block d-lg-none">

                    <div className="row relative">
                        <Swiper
                            slidesPerView={3}
                            spaceBetween={15}

                            navigation={{
                                prevEl: "#blog_prev",
                                nextEl: "#blog_next",
                            }}
                            loop={true}
                            // autoplay={{
                            //     delay: 3200,
                            //     disableOnInteraction: false,
                            // }}
                            modules={[Navigation, Pagination]}
                            onSwiper={(swiper) => BlogActive(swiper.isBeginning)}
                            onSlideChange={(swiper) => BlogActive(swiper.isBeginning)}
                            breakpoints={{
                                320: {
                                    slidesPerView: 1.5

                                },
                                375: {
                                    slidesPerView: 1.5

                                },
                                425: {
                                    slidesPerView: 1.5

                                },

                                768: {
                                    slidesPerView: 1,
                                },
                                992: {
                                    slidesPerView: 4,
                                    spaceBetween: 24,
                                },
                            }}

                            className="mySwiper relative"
                        >
                            {
                                data?.data?.map((item, i) => {

                                    return (


                                        <>

                                            <SwiperSlide key={i}>
                                                <div className="blog_box mb-10">
                                                    <div className="blog_img relative ">
                                                        <img src={item?.yoast_head_json?.og_image?.map((item) => item?.url)} className='card_rounded' alt={item?.title?.rendered || "Travel blog post image"} />
                                                        {/* <div className="inner_content absolute top-6 left-4">
                                                            Top Rated
                                                        </div> */}
                                                        <div className="content mt-2">
                                                            <Link href={`/blogs?detail=${item?.id}`}>
                                                                {item?.title?.rendered}
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>


                                            </SwiperSlide>
                                            {/* ********************** */}

                                        </>
                                    )



                                })
                            }
                        </Swiper>
                        <div className="button_swiper absolute ">
                            <div className="buttons_icon relative">


                                <button id='blog_prev' aria-label="Previous" className={`absolute ${isBlogActive ? 'opacity-50 pointer-events-none' : ''}`}>
                                    <MdOutlineKeyboardArrowLeft size={30} />
                                </button>


                                <button id='blog_next' aria-label="Next" className='absolute'>
                                    <MdOutlineKeyboardArrowRight size={30} />
                                </button>
                            </div>
                        </div>

                    </div>


                </div>

            </section>

        </>
    )
}
