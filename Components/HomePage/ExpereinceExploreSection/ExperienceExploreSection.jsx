"use client"
import { HotelDetail } from '@/app/Route/endpoints';
import { useQuery } from '@tanstack/react-query';
import React, { useState, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { getAssetPath } from '@/app/utils/assetPath';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import { FaRegHeart } from 'react-icons/fa'
import { IoStar } from "react-icons/io5"; import { IoStarHalf } from "react-icons/io5"; import { IoStarOutline } from "react-icons/io5";
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";
// import required modules
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
export default function ExperienceExploreSection() {
    const card = [

        {
            img: "/home/destination/outdoors.jpg",
            content: "Half-Day Railway Market and Floating Market Tour in Thailand",
            info: "from ₹1000 per person",
            star: [
                <IoStar />,
                <IoStar />,
                <IoStar />,
                <IoStarHalf />,
                <IoStarOutline />


            ]
        },
        {
            img: "/home/destination/outdoors.jpg",
            content: "Half-Day Railway Market and Floating Market Tour in Thailand",
            info: "from ₹4500 per person",
            star: [
                <IoStar />,
                <IoStar />,
                <IoStar />,
                <IoStarHalf />,
                <IoStarOutline />


            ]
        },
        {
            img: "/home/destination/outdoors.jpg",
            content: "Half-Day Railway Market and Floating Market Tour in Thailand",
            info: "from ₹4500 per person",
            star: [
                <IoStar />,
                <IoStar />,
                <IoStar />,
                <IoStarHalf />,
                <IoStarOutline />
            ]
        },
        {
            img: "/home/destination/outdoors.jpg",
            content: "Half-Day Railway Market and Floating Market Tour in Thailand",
            info: "from ₹4500 per person",
            star: [
                <IoStar />,
                <IoStar />,
                <IoStar />,
                <IoStarHalf />,
                <IoStarOutline />


            ]
        },

    ]
    const [search, setSearch] = useState("");
    // *************************** show button 
    const [isBeginning, setIsBeginning] = useState(true);
    const [secondActive, setSecondActive] = useState(true)

    useEffect(() => {
        // Get search from URL params or use default
        if (typeof window !== "undefined") {
            const params = new URLSearchParams(window.location.search);
            const query = params.get("query") || "";
            setSearch(query);
        }
    }, []);

    const { data } = useQuery({
        queryKey: ["hotels", search],
        queryFn: () => HotelDetail(search)
    })

    console.log(data?.data?.data, "deatils");


    const name = search || "your location";


    return (
        <>
            <section className='experience_explore_section padding_bottom m-0 pt-3'>
                <div className="container">
                    <div className="explore_section section_title m">
                        <h2 className='mb-0'>
                            Explore experiences near {name}
                        </h2>
                        <h5 >
                            Top-rated experiences and hidden gems near you
                        </h5>
                    </div>
                    <div className="d-none d-lg-block">
                        <div className="row ">
                            {/* ********************************** */}
                            {
                                card?.map((item, i) => {
                                    let simplecontetnt = item?.content.split(" ").slice(0, 3).join(" ");

                                    if (simplecontetnt?.length > 3) {
                                        simplecontetnt += "...";
                                    }

                                    return (


                                        <div className="col-12 col-md-6 col-lg-3" key={i}>
                                            <div className="experience_explore_section ">
                                                <div className="card  relative border-0 ">
                                                    <img src={getAssetPath(item?.img)} className="card-img-top card_rounded " alt="..." />
                                                    <div className="heart_icon absolute top-2 right-4">
                                                        <span>
                                                            <FaRegHeart />
                                                        </span>

                                                    </div>
                                                    <div className="card-body ps-0 flex justify-between ">
                                                        <div className="card_detail">
                                                            <h5 className="card-title m-0">
                                                                {
                                                                    simplecontetnt
                                                                }
                                                            </h5>
                                                            <p className='m-0'>
                                                                {
                                                                    item?.info
                                                                }
                                                            </p>
                                                        </div>
                                                        <div className="rating flex ">
                                                            {
                                                                item?.star?.map((star_item, i) => {
                                                                    return (

                                                                        <span key={i}>{star_item}</span>

                                                                    )
                                                                })
                                                            }
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>

                                        </div>


                                    )
                                })
                            }
                            {/* ********************************** */}
                            {/* ********************************** */}
                            {/* ********************************** */}
                        </div>
                    </div>
                    {/*8888888888888888888888888888888888888888888888888888888888888888888888888xxxxxxxx======================************************************************** mobile view display 
                     */}
                    <div className="container d-block d-lg-none relative">


                        <div className="row ">
                            <Swiper
                                slidesPerView={3}
                                spaceBetween={15}
                                // pagination={{ clickable: true }}
                                navigation={{
                                    prevEl: "#custom_prev",
                                    nextEl: "#custom_next",
                                }}
                                loop={true}
                                // autoplay={{
                                //     delay: 3100,
                                //     disableOnInteraction: false,
                                // }}
                                onSwiper={(swiper) => setIsBeginning(swiper.isBeginning)}
                                onSlideChange={(swiper) => setIsBeginning(swiper.isBeginning)}

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
                                modules={[Pagination, Navigation]}
                                className="mySwiper relative"
                            >
                                {
                                    card?.map((item, i) => {
                                        let simplecontetnt = item?.content.split(" ").slice(0, 3).join(" ");

                                        if (simplecontetnt?.length > 3) {
                                            simplecontetnt += "...";
                                        }
                                        return (
                                            <>



                                                <SwiperSlide key={i}>
                                                    <div className="experience_explore_section m-0">
                                                        <div className="card  relative border-0 ">
                                                            <img src={getAssetPath(item?.img)} className=" card_rounded " alt="..." />
                                                            <div className="heart_icon absolute top-2 right-4">
                                                                <span>
                                                                    <FaRegHeart />
                                                                </span>

                                                            </div>
                                                            <div className="card-body ps-0 flex justify-between ">
                                                                <div className="card_detail">
                                                                    <h5 className="card-title m-0">
                                                                        {
                                                                            simplecontetnt
                                                                        }
                                                                    </h5>
                                                                    <p className='m-0'>
                                                                        {
                                                                            item?.info
                                                                        }
                                                                    </p>
                                                                </div>
                                                                <div className="rating flex ">
                                                                    {
                                                                        item?.star?.map((star_item, i) => {
                                                                            return (

                                                                                <span key={i}>{star_item}</span>

                                                                            )
                                                                        })
                                                                    }
                                                                </div>

                                                            </div>
                                                        </div>
                                                    </div>

                                                </SwiperSlide>

                                            </>
                                        )

                                        {/* ********************** */ }

                                    })
                                }
                            </Swiper>
                            <div className="button_swiper2 absolute ">
                                <div className="buttons_icon relative">
                                    {!isBeginning && (
                                        <button id='custom_prev' className='absolute'>
                                            <MdOutlineKeyboardArrowLeft size={30} />
                                        </button>
                                    )}

                                    <button id='custom_next' className='absolute'>
                                        <MdOutlineKeyboardArrowRight size={30} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ********************************************************************************************************************** section two big cities .........>>>>>>>>>>>>>>>>>> */}

            <div className="container padding_bottom">
                <div className="explore_section section_title ">
                    <h2 className='mb-0'>
                        Explore experiences near {name}
                    </h2>
                    <h5 >
                        Top-rated experiences and hidden gems near you
                    </h5>
                </div>
                {/* *******************************************  show on deskltop >>>>>>>>>>>>>>>>>>>>>> */}
                <div className="d-none d-lg-block">

                    <div className="row">
                        {/* ********************************** */}
                        {
                            card?.map((item, i) => {
                                let simplecontetnt = item?.content.split(" ").slice(0, 3).join(" ");

                                if (simplecontetnt?.length > 3) {
                                    simplecontetnt += "...";
                                }

                                return (


                                    <div className="col-md-6 col-lg-3" key={i}>
                                        <div className="experience_explore_section ">
                                            <div className="card  relative border-0 ">
                                                <img src={getAssetPath(item?.img)} className=" card_rounded " alt="..." />
                                                <div className="heart_icon absolute top-2 right-4">
                                                    <span>
                                                        <FaRegHeart />
                                                    </span>

                                                </div>
                                                <div className="card-body ps-0 flex justify-between ">
                                                    <div className="card_detail">
                                                        <h5 className="card-title m-0">
                                                            {
                                                                simplecontetnt
                                                            }
                                                        </h5>
                                                        <p className='m-0'>
                                                            {
                                                                item?.info
                                                            }
                                                        </p>
                                                    </div>
                                                    <div className="rating flex ">
                                                        {
                                                            item?.star?.map((star_item, i) => {
                                                                return (

                                                                    <span key={i}>{star_item}</span>

                                                                )
                                                            })
                                                        }
                                                    </div>

                                                </div>
                                            </div>
                                        </div>

                                    </div>


                                )
                            })
                        }
                        {/* ********************************** */}
                        {/* ********************************** */}
                        {/* ********************************** */}
                    </div>
                </div>
                {/* ************************************************************  show on mobile  */}
                <div className="container d-block d-lg-none">
                    <div className="row  relative">
                        <Swiper
                            slidesPerView={3}
                            spaceBetween={15}
                            // pagination={{ clickable: true }}
                            navigation={{
                                prevEl: "#experience_prev",
                                nextEl: "#experience_next",
                            }}
                            loop={true}
                            // autoplay={{
                            //     delay: 3000,
                            //     disableOnInteraction: false,
                            // }}
                            onSwiper={(swiper) => setSecondActive(swiper.isBeginning)}
                            onSlideChange={(swiper) => setSecondActive(swiper.isBeginning)}

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
                            modules={[Pagination, Navigation]}
                            className="mySwiper relative"
                        >
                            {
                                card?.map((item, i) => {
                                    let simplecontetnt = item?.content.split(" ").slice(0, 3).join(" ");

                                    if (simplecontetnt?.length > 3) {
                                        simplecontetnt += "...";
                                    }
                                    return (


                                        <>


                                            <SwiperSlide key={i}>
                                                <div className="experience_explore_section m-0 ">
                                                    <div className="card  relative border-0 ">
                                                        <img src={getAssetPath(item?.img)} className="card-img-top card_rounded" alt="..." />
                                                        <div className="heart_icon absolute top-2 right-4">
                                                            <span>
                                                                <FaRegHeart />
                                                            </span>

                                                        </div>
                                                        <div className="card-body ps-0 flex justify-between ">
                                                            <div className="card_detail">
                                                                <h5 className="card-title m-0">
                                                                    {
                                                                        simplecontetnt
                                                                    }
                                                                </h5>
                                                                <p className='m-0'>
                                                                    {
                                                                        item?.info
                                                                    }
                                                                </p>
                                                            </div>
                                                            <div className="rating flex ">
                                                                {
                                                                    item?.star?.map((star_item, i) => {
                                                                        return (

                                                                            <span key={i}>{star_item}</span>

                                                                        )
                                                                    })
                                                                }
                                                            </div>

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
                        <div className="button_swiper2 absolute ">
                            <div className="buttons_icon relative">
                                {
                                    !secondActive && (

                                        <button id='experience_prev' className='absolute'>
                                            <MdOutlineKeyboardArrowLeft size={30} />
                                        </button>
                                    )
                                }


                                <button id='experience_next' className='absolute'>
                                    <MdOutlineKeyboardArrowRight size={30} />
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>




        </>
    )
}
