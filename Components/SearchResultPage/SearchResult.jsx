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
import { SearchLocation } from '@/app/Route/endpoints'
import Footer from '@/component/Footer';
import Link from 'next/link';
export default function SearchResult() {

    const searchQuery = useSearchParams();

    const search = searchQuery.get("query");
    const { data } = useQuery({
        queryKey: ["fetch data ", search],
        queryFn: async () => await SearchLocation(search),
    });
    return (
        <>
            <Header />
            {/* ************************** */}
            <section className='ps-15 pe-15'>
                <div className="section_search_home_banner pt-10 pb-10 rounded-3xl flex items-center">
                    {/* *************************** box title */}
                    <div className="container">
                        <div className="row justify-center">
                            <div className="col-lg-12">
                                <div className="search_banner_box">
                                    <div className="title text-center">
                                        <h2 className='capitalize'>
                                            {data?.data?.data?.location}  <span>hotels </span>
                                        </h2>
                                        <h5 className='capitalize'>
                                            {/* Book with us and you could <span className='bg-theme px-2'>save up to 80%</span> */}
                                            home / {data?.data?.data?.location} hotels

                                        </h5>

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
                        <ol className="breadcrumb mb-0 pt-3 pb-3 ps-2">
                            <li className="breadcrumb-item"><Link href="/">Home</Link></li>
                            <li className="breadcrumb-item active capitalize" aria-current="page">{data?.data?.data?.location}</li>
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
