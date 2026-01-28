import Search from '@/Components/HomePage/Search'
import React from 'react'
import CanadaRecomd from './CanadaRecomd'

export default function CanadaBanner() {
    return (
        <>
            <section className='mp-s mp-e'>
                <div className="section_home_banner rounded-3xl flex items-center">
                    {/* *************************** box title */}
                    <div className="container">
                        <div className="row justify-center">
                            <div className="col-lg-12">
                                <div className="banner_box home_banner">
                                    <div className="title text-center">
                                        <h1 className='capitalize'>
                                            Hotels in <span> Canada</span>
                                        </h1>
                                        <h5 className='capitalize'>
                                            Best places to stay in Canada for every budget, from affordable hotels to luxury stays.
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
            {/* <SearchSection /> */}
            <Search />
            <CanadaRecomd />

        </>
    )
}
