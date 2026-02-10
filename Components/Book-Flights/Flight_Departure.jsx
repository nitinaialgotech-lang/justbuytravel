import React from 'react'
import { VscArrowSwap } from "react-icons/vsc";
import { BiRadioCircle } from "react-icons/bi";
import { IoLocationSharp } from "react-icons/io5";
import { SlCalender } from "react-icons/sl";
import { FaUser } from "react-icons/fa";
import Flight_Departure_Chart from './Flight_Departure_Chart';
export default function Flight_Departure() {
    return (
        <>

            <section className='flight_departure_section py-8 md:py-10'>
                <div className="container mx-auto px-4 md:px-6 lg:px-8">
                    <div className="flight_chart_box bg-white rounded-2xl shadow-md border border-gray-100  space-y-5">
                        <div className="row m-0 ">
                            <div className="header_input_head space-y-4">
                                <div className="header_title">
                                    <div className="content flex flex-wrap items-center gap-3 md:gap-5">
                                        <div className="item flex items-center gap-2">
                                            <span><VscArrowSwap /></span>
                                            <span>one way</span>
                                        </div>
                                        {/* ************ */}
                                        <div className="item flex items-center gap-2">
                                            <span><FaUser /></span>
                                            <span>1</span>
                                        </div>
                                        {/* ************ */}
                                        <div className="item">
                                            <span></span>
                                            <span>Economy (included basic) </span>
                                        </div>
                                        {/* ************ */}

                                    </div>
                                </div>
                                <div className="header_input_item flex flex-col md:flex-row gap-3 md:gap-4">
                                    <div className="header_input_1 relative flex flex-1 gap-2">
                                        <div className="header_input relative h-12">
                                            <div className="icon  absolute inset-y-0 start-3 flex items-center  pointer-events-none icon_search">
                                                <BiRadioCircle />
                                            </div>
                                            <input type="text" name='ss' id='ss' placeholder='Paris CDG' className='block w-full h-full bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:outline-none focus:ring-0 placeholder:text-body ps-10 capitalize' />

                                        </div>
                                        {/* ******** */}
                                        <div className="arrow absolute flex items-center justify-center inset-y-0 left-1/2 -translate-x-1/2">
                                            <VscArrowSwap />
                                        </div>
                                        <div className="header_input relative h-12">

                                            <div className="icon absolute inset-y-0 start-3 flex items-center  pointer-events-none icon_search">
                                                <IoLocationSharp />
                                            </div>
                                            <input type="text" name='dd' id='pp' className='block w-full h-full bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:outline-none focus:ring-0 placeholder:text-body ps-10 capitalize' placeholder='Autria AUS' />

                                        </div>
                                    </div>
                                    {/* ********* */}
                                    <div className="header_input relative h-12 flex-1 min-w-[180px]">

                                        <div className="icon icon absolute inset-y-0 start-3 flex items-center  pointer-events-none icon_search">
                                            <SlCalender />
                                        </div>
                                        <input type="text" name='oo' id='ll' className='block w-full h-full bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:outline-none focus:ring-0 placeholder:text-body ps-10 capitalize' placeholder='Tue,Mar,23' />

                                    </div>
                                </div>
                            </div>
                        </div>
                        <Flight_Departure_Chart />
                    </div>


                </div>
            </section >


        </>
    )
}
