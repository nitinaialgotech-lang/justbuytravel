import { Suspense } from 'react';
import Search from './Search';
import SearchSection from './SearchSection';
export default function
    HomeBannerSection() {
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
                                            {/* Travel <span>Decision</span> Made Smarter */}
                                            Complete <span> Travel Solutions </span> to Compare Hotels & Flights

                                            {/* Your Complete travel Buying  <span>Guide</span> */}
                                        </h1>
                                        <div className="col-lg-9 m-auto">
                                            <h2 className='supporting_text'>
                                                {/* Discover hotels, flights, holidays, and cruises with real insights and easy comparisons. */}
                                                {/* Your guide to hotels, flights, and travel insights. */}

                                                Compare hotels, flights and holidays in one place for smarter travel decisions.
                                            </h2>
                                        </div>
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

        </>

    )
}
