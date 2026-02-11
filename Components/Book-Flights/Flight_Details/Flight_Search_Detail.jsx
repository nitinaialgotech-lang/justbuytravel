"use client"
import { GetSerpFlights } from '@/app/Route/endpoints';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import moment from "moment";
export default function Flight_Search_Detail() {
    const [flights, setFlights] = useState("");
    const engine="google_flights";
const departure_id = useSelector(state => state.user.SearchFlight.startfrom);
const start_date = useSelector(state => state.user.SearchFlight.startDate);
const  back_date = useSelector(state => state.user.SearchFlight.endDate);
const arrival_id = useSelector(state => state.user.SearchFlight.endto);
const type = useSelector(state => state.user.SearchFlight.type);
const outbound_date = moment(start_date).format("YYYY-MM-DD");
const return_date = moment(back_date).format("YYYY-MM-DD");

    const { data } = useQuery({
        queryKey: ['flights',engine, departure_id,  outbound_date,return_date, arrival_id,type],
        queryFn: () => GetSerpFlights(
           { engine,
            departure_id,
            arrival_id,
            outbound_date,
            return_date: type === "1" ? return_date : undefined,
            type}
        ),
        onSuccess: (data) => {
            setFlights(data);
        },
        onError: (error) => {
            console.log(error);
        },
    });
    console.log(data, "pkpkpkpkpkpkp", flights);

    const flight = data?.data?.flights?.best_flights?.map((item) => item)
    return (
        <>

            <section>
                <div className="container">
                    <div className="row justify-center departure_chart_section padding_b30   pb-10 pt-6">
                        <div className="col-lg-12">


                            <div className="section_title departure_title_head space-y-3 mb-8">
                                <h2>
                                    Best Departure Chart
                                </h2>
                                <p>
                                    Over the years, we’ve explored and evaluated many travel companies while planning real trips worldwide. Some delivered excellent experiences, while others didn’t meet expectations.
                                </p>
                            </div>
                            <div className="col-lg-12 text-center justify-center m-auto">

                                <div className="departure bg-white rounded-2xl  border border-gray-100 text-left overflow-hidden">
                                    <div className="departure_chart border-b border-gray-100  px-4 ">


                                        <div className="row items-center">
                                            <div className="col-lg-12">
                                                {/* *********** headerrr */}
                                                <div className="row items-center">
                                                    <div className="col-lg-7">
                                                        <div className="departure_title flex items-center gap-3 md:gap-4">
                                                            <div className="logo">
                                                                <img src="/flights/MU.png" alt="" width={30} />

                                                            </div>
                                                            <div className="departure_time">
                                                                <h4 className='m-0'>
                                                                    Departure - {data?.data?.outbound_date}
                                                                </h4>
                                                                <span className="sub">628 kg CO₂ · 1 stop</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/* ******************* */}
                                                    <div className="col-lg-5">
                                                        <div className="departure_item flex items-center justify-end gap-3 md:gap-4">
                                                            <div className="price">
                                                                ${data?.data?.flights?.price_insights?.lowest_price}
                                                            </div>
                                                            <button className='button_bg2'>
                                                                Select Flight
                                                            </button>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>




                                    <div className="departure_body px-4 md:px-6 pb-4 md:pb-5">
                                        {
                                            flight?.map((item) => {
                                                return (
                                                    <>
                                                    
                                                    
                                                    
                                        <div className="row items-center py-3 border_bt">
                                            <div className="col-lg-1 flex flex-col items-center gap-2 text-sm text-gray-600">
                                                <img src={item?.airline_logo} alt="" width={30} />

                                             

                                            </div>
                                            <div className="col-lg-6">
                                                {
                                                    item?.flights?.map((planes) => {
                                                        const formattedTime = moment(planes?.arrival_airport?.time, "YYYY-MM-DD HH:mm").format("hh:mm A");
                                                        const ardate = moment(planes?.arrival_airport?.time).format("LL");
                                                        const departure_Time = moment(planes?.departure_airport?.time, "YYYY-MM-DD HH:mm").format("hh:mm A");
                                                        const dpdate = moment(planes?.departure_airport?.time).format("LL");
                                                        return (
                                                            <>
                                                            
                                                <div className="contet ">
                                                    <div className="timeline space-y-4">
                                                        {/* Leg 1 */}
                                                        <div className="leg">
                                                            <div className="reach_dot" />
                                                            <div className="leg-content">
                                                                <p className="time">{formattedTime} · {planes?.arrival_airport?.name} ({planes?.arrival_airport?.id})</p>
                                                                <p className="meta">Travel day - {ardate}</p>


                                                            </div>
                                                        </div>

                                                        {/* <div className="layover">
                                                1h 30m layover · Heathrow Airport (LHR)
                                            </div> */}


                                                        <div className="leg">
                                                            <div className="reach_dot" />
                                                            <div className="leg-content">
                                                                <p className="time">{ departure_Time} · {planes?.departure_airport?.name} ({planes?.departure_airport?.id})</p>
                                                                <p className="meta">Travel day - {dpdate}</p>


                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                            
                                                            </>
                                                        )
                                                    })
                                                }

                                            </div>
                                            <div className="col-lg-4">
                                                <div className="side_content space-y-1 text-sm text-gray-600 text-left md:text-right">
                                                    <p>
                                                        Below average legroom (29 in)
                                                    </p>
                                                    <p>
                                                        In-seat USB outlet
                                                    </p>
                                                    <p>
                                                        Carbon emissions estimate: 63 kg
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                                    </>
                                                )
                                            })
                                        }

                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </section>


        </>
    )
}
