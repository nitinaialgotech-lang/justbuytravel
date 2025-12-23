import Header from '@/component/Header'
import React from 'react'
import SearchSection from '../HomePage/SearchSection'
import SearchSidebar from './SearchSidebar'
import SearchContentBox from './SearchContentBox'
import "../../style/search.scss"
export default function SearchResult() {
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
                                            Chandigarh  <span>hotels </span>
                                        </h2>
                                        <h5 className='capitalize'>
                                            {/* Book with us and you could <span className='bg-theme px-2'>save up to 80%</span> */}
                                            home / hotels

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
            <SearchSection />

            {/* ***************************************************** seasrch container  */}
            <div className="container">
                <div className="row">
                    <div className="col-lg-4">
                        <SearchSidebar />

                    </div>
                    <div className="col-lg-8">
                        <SearchContentBox />
                    </div>
                </div>
            </div>
        </>
    )
}
