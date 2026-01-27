
import React from 'react'
import SanFrancRecomd from './SanFrancRecomd'
import Search from '@/Components/HomePage/Search'

export default function SanFrancBanner() {
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
                                            Book Hotel in<span> San Francisco</span>
                                        </h1>
                                        {/* <h5 className='capitalize'>
                                                               How can we help you travel better for less?
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
            {/* <SearchSection /> */}
            <Search />
            <SanFrancRecomd />
        </>
    )
}
