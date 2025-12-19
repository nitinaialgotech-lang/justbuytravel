import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import { FaUserAlt } from 'react-icons/fa';
import { IoTime } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
export default function RecomendSection() {
    const recomendData = [
        {

        }
    ]
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
                    {/* ***xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx */}
                    <div className="col-lg-4">
                        {/* *********** */}
                        <div className="recommend_card_box   rounded-3xl shadow margin_lr ">
                            {/* *********** */}
                            <div className="card_box pe-">
                                <div className="card_box_img rounded-3xl  relative">
                                    <img src="/home/destination/recommentImg.png" className='rounded-3xl' alt="" />
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
                                <div className="card_box_detail px-4 py-5 rounded-4xl flex flex-col z-1 gap-4 relative">
                                    <h4 className='m-0'>
                                        California Sunset/Twilight
                                        Boat Cruise
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
                                            $99.00 <span>/ person</span>
                                        </h5>
                                        <button className='rounded-full'>
                                            Book Now
                                        </button>
                                    </div>
                                    {/* *************** rating_list */}
                                    <div className="rating_list absolute flex items-center gap-1 right-10 shadow">
                                        <span className='w-5'><FontAwesomeIcon icon={faStar} /></span>
                                        <span><p className='m-0'>4.96</p></span>
                                        <span><p className='m-0'>(672 reviews)</p></span>
                                    </div>

                                </div>
                            </div>
                            {/* *********** */}
                        </div>
                        {/* *********** */}
                    </div>
                    {/* ***xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx */}
                    {/* ***xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx */}
                    <div className="col-lg-4">
                        {/* *********** */}
                        <div className="recommend_card_box   rounded-3xl shadow margin_lr ">
                            {/* *********** */}
                            <div className="card_box pe-">
                                <div className="card_box_img rounded-3xl  relative">
                                    <img src="/home/destination/recommendImg2.png" className='rounded-3xl' alt="" />
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
                                <div className="card_box_detail px-4 py-5 rounded-4xl flex flex-col z-1 gap-4 relative">
                                    <h4 className='m-0'>
                                        California Sunset/Twilight
                                        Boat Cruise
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
                                            $99.00 <span>/ person</span>
                                        </h5>
                                        <button className='rounded-full'>
                                            Book Now
                                        </button>
                                    </div>
                                    {/* *************** rating_list */}
                                    <div className="rating_list absolute flex items-center gap-1 right-10 shadow">
                                        <span className='w-5'><FontAwesomeIcon icon={faStar} /></span>
                                        <span><p className='m-0'>4.96</p></span>
                                        <span><p className='m-0'>(672 reviews)</p></span>
                                    </div>

                                </div>
                            </div>
                            {/* *********** */}
                        </div>
                        {/* *********** */}
                    </div>
                    {/* ***xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx */}
                    {/* ***xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx */}
                    <div className="col-lg-4">
                        {/* *********** */}
                        <div className="recommend_card_box   rounded-3xl shadow margin_lr ">
                            {/* *********** */}
                            <div className="card_box pe-">
                                <div className="card_box_img rounded-3xl  relative">
                                    <img src="/home/destination/recommendImg3.png" className='rounded-3xl' alt="" />
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
                                <div className="card_box_detail px-4 py-5 rounded-4xl flex flex-col z-1 gap-4 relative">
                                    <h4 className='m-0'>
                                        California Sunset/Twilight
                                        Boat Cruise
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
                                            $99.00 <span>/ person</span>
                                        </h5>
                                        <button className='rounded-full'>
                                            Book Now
                                        </button>
                                    </div>
                                    {/* *************** rating_list */}
                                    <div className="rating_list absolute flex items-center gap-1 right-10 shadow">
                                        <span className='w-5'><FontAwesomeIcon icon={faStar} /></span>
                                        <span><p className='m-0'>4.96</p></span>
                                        <span><p className='m-0'>(672 reviews)</p></span>
                                    </div>

                                </div>
                            </div>
                            {/* *********** */}
                        </div>
                        {/* *********** */}
                    </div>
                    {/* ***xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx */}
                    {/* **** button  */}

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
