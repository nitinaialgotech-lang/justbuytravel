"use client";
import Header from '@/component/Header'
import React from 'react'
import SearchSection from '../HomePage/SearchSection'
import SearchSidebar from './SearchSidebar'
import SearchContentBox from './SearchContentBox'
import "../../style/search.scss"
import "../../style/searchresult.css"
import Search from '../HomePage/Search'
import { useSearchParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { nearbyPlaces, SearchLocation } from '@/app/Route/endpoints'
import Footer from '@/component/Footer';
import Link from 'next/link';
export default function SearchResult() {

    const searchCity = useSearchParams();

    const city = searchCity.get("name")

    return (
        <>
            <Header />
            {/* ************************** */}
            <section className='padding_bottom pb-md-0'>
                <div className="section_search_home_banner pt-10 pb-10 rounded-3xl flex items-center">
                    {/* *************************** box title */}
                    <div className="container">
                        <div className="row justify-center">
                            <div className="col-lg-12">
                                <div className="search_banner_box">
                                    <div className="title text-center">
                                        <h2 className='capitalize'>
                                            {city}  <span> hotels </span>
                                        </h2>
                                        {/* <h5 className='capitalize'>

                                            home / {city} hotels

                                        </h5> */}

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* ************************************************ */}
                    {/* ************************ search Box */}
                </div>
            </section>
            <Search />

            {/* ***************************************************** seasrch container  */}
            <div className="container">
                <div className="crums z-1 relative">
                    <nav aria-label="breadcrumb ">
                        <ol className="breadcrumb mb-2 padding_bottom ps-2 pb-md-0">
                            <li className="breadcrumb-item"><Link href="/">Home</Link></li>
                            <li className="breadcrumb-item active capitalize" aria-current="page">{city}</li>
                        </ol>
                    </nav>
                </div>
                <div className="row">

                    <div className="col-lg-12">

                        <SearchContentBox />
                    </div>

                </div>
            </div>




            <Footer />
        </>
    )
}
