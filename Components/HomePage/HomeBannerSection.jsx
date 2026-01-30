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
                                        <h1 className=''>
                                            Smarter <span> Travel Planning </span> for  Hotels <span>&</span> Flights


                                        </h1>
                                        <div className="col-lg-9 m-auto">
                                            <p className='supporting_text'>
                                                Plan trips confidently with verified hotel and flight options from trusted travel partners.
                                            </p>
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
