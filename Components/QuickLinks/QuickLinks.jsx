import Link from 'next/link';
export default function QuickLinks() {
    return (

        <>

            <section className=''>

                <div className="container padding_bottom ">
                    <div className="row">
                        <div className="col-lg-12">
                            {/* ********** links */}
                            <div className="section_title relative m-0 ">
                                <h2 className="mb-2">Quick Links</h2>
                            </div>
                            <div className="quick_links ">
                                {/* *********************************************** */}
                                <div className="quick_link_box">
                                    <div className="quick_link_items">
                                        {/* <h4>Asia Flights</h4> */}
                                        <ul className='p-0 flex capitalize'>
                                            <li ><Link href={"/book-hotels-dubai"}> Dubai Hotel</Link></li>
                                            {/* <li ><Link href={"/newyork"}>New York To London</Link></li> */}
                                            <li ><Link href={"/hotels-in-australia"}> Australia Hotel</Link></li>
                                            <li ><Link href={"/hotels-in-canada"}> Canada Hotel</Link></li>
                                            <li ><Link href={"/hotels-in-denmark"}> Denmark Hotel</Link></li>
                                            <li ><Link href={"/hotels-in-glasgow"}> glasgow Hotel</Link></li>
                                            <li ><Link href={"/hotels-in-goa"}> goa Hotel</Link></li>
                                            <li ><Link href={"/hotels-in-ireland"}> ireland Hotel</Link></li>
                                            <li ><Link href={"/hotels-in-manchester"}> menchester Hotel</Link></li>
                                            <li ><Link href={"/hotels-in-New-York"}> new york Hotel</Link></li>
                                            <li ><Link href={"/hotels-in-paris"}> paris Hotel</Link></li>
                                            <li ><Link href={"/hotels-in-san-francisco"}> san-francisco Hotel</Link></li>
                                            <li ><Link href={"/hotels-in-uk"}> united-kingdom Hotel</Link></li>
                                            <li ><Link href={"/singapore"}> singapore Hotel</Link></li>
                                            <li ><Link href={"/sydney"}> sydney Hotel</Link></li>
                                            <li ><Link href={"/tokyo"}> tokyo Hotel</Link></li>
                                            <li ><Link href={"/usa"}> usa Hotel</Link></li>




                                        </ul>
                                    </div>
                                    <hr></hr>
                                </div>
                                {/* *********************************************** */}

                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}
