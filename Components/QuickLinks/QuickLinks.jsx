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
                            <div className="quick_links">
                                <div className="quick_link_box">

                                    {/* ================= Asia Hotels ================= */}
                                    <div className="quick_link_items">
                                        <h4 className="p-0 m-0">Asia Hotels</h4>
                                        <ul className="p-0 m-0 flex capitalize">
                                            <li><Link href="/book-hotels-dubai">Dubai Hotel</Link> |</li>
                                            <li><Link href="/hotels-in-goa">Goa Hotel</Link> |</li>
                                            <li><Link href="/singapore">Singapore Hotel</Link> |</li>
                                            <li><Link href="/tokyo">Tokyo Hotel</Link></li>
                                        </ul>
                                        <hr />
                                    </div>

                                    {/* ================= Europe Hotels ================= */}
                                    <div className="quick_link_items">
                                        <h4 className="p-0 m-0">Europe Hotels</h4>
                                        <ul className="p-0 m-0 flex capitalize">
                                            <li><Link href="/hotels-in-denmark">Denmark Hotel</Link> |</li>
                                            <li><Link href="/hotels-in-glasgow">Glasgow Hotel</Link> |</li>
                                            <li><Link href="/hotels-in-ireland">Ireland Hotel</Link> |</li>
                                            <li><Link href="/hotels-in-manchester">Manchester Hotel</Link> |</li>
                                            <li><Link href="/hotels-in-paris">Paris Hotel</Link> |</li>
                                            <li><Link href="/hotels-in-uk">United Kingdom Hotel</Link></li>
                                        </ul>
                                        <hr />
                                    </div>

                                    {/* ================= North America Hotels ================= */}
                                    <div className="quick_link_items">
                                        <h4 className="p-0 m-0">North America Hotels</h4>
                                        <ul className="p-0 m-0 flex capitalize">
                                            <li><Link href="/hotels-in-canada">Canada Hotel</Link> |</li>
                                            <li><Link href="/hotels-in-new-york">New York Hotel</Link> |</li>
                                            <li><Link href="/hotels-in-san-francisco">San Francisco Hotel</Link> |</li>
                                            <li><Link href="/usa">USA Hotel</Link></li>
                                        </ul>
                                        <hr />
                                    </div>

                                    {/* ================= Australia Hotels ================= */}
                                    <div className="quick_link_items">
                                        <h4 className="p-0 m-0">Australia Hotels</h4>
                                        <ul className="p-0 m-0 flex capitalize">
                                            <li><Link href="/hotels-in-australia">Australia Hotel</Link> |</li>
                                            <li><Link href="/sydney">Sydney Hotel</Link></li>
                                        </ul>
                                        <hr />
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
