import { Suspense } from 'react';
import Search from './Search';
import SearchSection from './SearchSection';
export default function
    HomeBannerSection() {
    return (
        <div>
            <section className='ps-15 pe-15 mp-s mp-e'>
                <div className="section_home_banner rounded-3xl flex items-center">
                    {/* *************************** box title */}
                    <div className="container">
                        <div className="row justify-center">
                            <div className="col-lg-12">
                                <div className="banner_box">
                                    <div className="title text-center">
                                        <h2 className='capitalize'>
                                            Explore more <span>spend</span> less
                                        </h2>
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
            <Suspense fallback={<div>Loading...</div>}>
                <Search />
            </Suspense>

        </div>
    )
}
