"use client"
import { HotelDetail } from '@/app/Route/endpoints';
import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { FaRegHeart } from 'react-icons/fa'
import { IoStar } from "react-icons/io5"; import { IoStarHalf } from "react-icons/io5"; import { IoStarOutline } from "react-icons/io5";
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
    const search = localStorage.getItem("search")

    const { data } = useQuery({
        queryKey: ["hotels", search],
        queryFn: () => HotelDetail(search)
    })

    console.log(data?.data?.data, "deatils");


    const name = localStorage.getItem("search")

    return (
        <>
            <section className='experience_explore_section pb-20'>
                <div className="container">
                    <div className="explore_section section_title mb-10">
                        <h2 className='mb-0'>
                            Explore experiences near {name}
                        </h2>
                        <h5 >
                            Top-rated experiences and hidden gems near you
                        </h5>
                    </div>

                    <div className="row">
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
                                                <img src={item?.img} className="card-img-top rounded-4 " alt="..." />
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
            </section>

            {/* ********************************************************************************************************************** section two big cities .........>>>>>>>>>>>>>>>>>> */}
            <section className=''>
                <div className="container">
                    <div className="explore_section section_title mb-10">
                        <h2 className='mb-0'>
                            Explore experiences near {name}
                        </h2>
                        <h5 >
                            Top-rated experiences and hidden gems near you
                        </h5>
                    </div>

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
                                                <img src={item?.img} className="card-img-top rounded-4 " alt="..." />
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
            </section>



        </>
    )
}
