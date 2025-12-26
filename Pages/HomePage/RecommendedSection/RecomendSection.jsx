import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useCallback, useState } from 'react'
import { FaUserAlt } from 'react-icons/fa';
import { IoTime } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import { useQuery } from '@tanstack/react-query';
import { SearchLocation } from '@/app/Route/endpoints';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
export default function RecomendSection() {
    // const search = useSelector((state) => state?.user?.search);
    // const active = useSelector((state) => state?.user?.active);

    const search = localStorage.getItem("search")

    const { data } = useQuery({
        queryKey: ["hotels ", search],
        queryFn: async () => await SearchLocation(search)
    })
    console.log(data, ".........pkpk");

    return (
        <>
            <section className='recomend_section container  pb-20'>
                <div className="section_title relative pb-10 pt-10">
                    <h2 className='mb-0'>
                        Recommended For You
                    </h2>
                    <h5 >
                        The best booking platform you can trust
                    </h5>
                    <div className="title_icon absolute right-5   ">
                        <img src="/home/destination/icon_plane.png" alt="" />
                    </div>
                </div>
                {/* **************************** recomend carsd cord box */}

                <div className="row">
                    <Swiper
                        slidesPerView={3}
                        spaceBetween={30}
                        pagination={{
                            clickable: true,
                        }}
                        modules={[Autoplay, Navigation, Pagination]}
                        className="mySwiper"
                        // navigation={true}
                        autoplay={{
                            delay: 3000, // 3 seconds
                            disableOnInteraction: false, // continue autoplay after user interaction
                        }}
                        breakpoints={{
                            640: {
                                slidesPerView: 1, // mobile
                            },
                            768: {
                                slidesPerView: 2, // tablet
                            },
                            1024: {
                                slidesPerView: 3, // desktop (optional)
                            },
                        }}
                        loop={true}
                        id='swiper_sldie'
                    >
                        {
                            data?.data?.data?.hotels?.slice(0, 6)?.map((item, i) => {
                                let titlecontent = item?.title.split(" ").slice(0, 3).join(" ");
                                if (titlecontent?.length > 3) {
                                    titlecontent += "..."
                                }
                                return (

                                    <SwiperSlide> <div className="card_col " key={i} >
                                        {/* *********** */}
                                        <div className="recommend_card_box   rounded-3xl shadow margin_lr ">
                                            {/* *********** */}
                                            <div className="card_box pe-">
                                                <div className="card_box_img rounded-3xl  relative">
                                                    <img src={item?.thumbnail} className='rounded-3xl' alt="" />
                                                    {/* ********************* */}
                                                    <div className="rated_msg absolute top-5 flex  justify-between items-center left-5 right-5">
                                                        <div className="msg">
                                                            <p className='m-0'>top rated</p>
                                                        </div>
                                                        <div className="msg_icon">
                                                            <FaRegHeart />
                                                        </div>
                                                    </div>
                                                    {/* ********************* */}
                                                </div>
                                                {/* *** */}
                                                <div className="card_box_detail px-4 py-5 rounded-4xl flex flex-col z-1 gap-2 relative">
                                                    <h4 className='m-0 capitalize'>
                                                        {item?.title}
                                                    </h4>
                                                    {/* ****** */}
                                                    <div className="time flex items-center gap-3 relative">
                                                        <div className="icon flex items-center gap-1">
                                                            <span><IoTime /></span>
                                                            <span><p className='m-0'>2 Days 3 Nights</p></span>
                                                        </div>
                                                        <div className="guest flex items-center gap-1">
                                                            <span><FaUserAlt /></span>
                                                            <span><p className='m-0'>4 -5 guest</p></span>
                                                        </div>
                                                    </div>
                                                    {/* ******* */}
                                                    <div className="price_book flex mt-3 justify-between items-center">
                                                        <h5 className='m-0'>
                                                            {item?.price}.00 <span>/ person</span>
                                                        </h5>
                                                        <button className='rounded-full'>
                                                            Book Now
                                                        </button>
                                                    </div>
                                                    {/* *************** rating_list */}
                                                    <div className="rating_list absolute flex items-center gap-1 right-10 shadow">
                                                        <span className='w-5'><FontAwesomeIcon icon={faStar} /></span>
                                                        <span><p className='m-0'>{item?.rating}</p></span>
                                                        <span><p className='m-0'>({item?.reviews} reviews)</p></span>
                                                    </div>

                                                </div>
                                            </div>
                                            {/* *********** */}
                                        </div>
                                        {/* *********** */}
                                    </div>
                                    </SwiperSlide>
                                )
                            })

                        }
                    </Swiper>
                    <div className="button_more flex justify-center">
                        <button className=''>
                            Load More
                        </button>
                    </div>

                </div>
            </section>
        </>
    )
}
