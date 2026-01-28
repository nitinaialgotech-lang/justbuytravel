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
                                <h2 className="mb-0">Quick Links</h2>
                            </div>
                            <div className="quick_links ">
                                {/* *********************************************** */}
                                <div className="quick_link_box">
                                    <div className="quick_link_items">
                                        {/* <h4>Asia Flights</h4> */}
                                        <ul className='p-0 flex capitalize'>
                                            <li ><Link href={"/book-hotels-dubai"}>Hotel In Dubai</Link></li>
                                            {/* <li ><Link href={"/newyork"}>New York To London</Link></li> */}
                                            <li ><Link href={"/hotels-in-australia"}>Hotel In Australia</Link></li>
                                            <li ><Link href={"/hotels-in-canada"}>Hotel In Canada</Link></li>
                                            <li ><Link href={"/hotels-in-denmark"}>Hotel In Denmark</Link></li>
                                            <li ><Link href={"/hotels-in-glasgow"}>Hotel In glasgow</Link></li>
                                            <li ><Link href={"/hotels-in-goa"}>Hotel In goa</Link></li>
                                            <li ><Link href={"/hotels-in-ireland"}>Hotel In ireland</Link></li>
                                            <li ><Link href={"/manchester"}>Hotel In menchester</Link></li>
                                            <li ><Link href={"/hotels-in-New-York"}>Hotel In new york</Link></li>
                                            <li ><Link href={"/paris"}>Hotel In paris</Link></li>
                                            <li ><Link href={"/san-francisco"}>Hotel In san-francisco</Link></li>
                                            <li ><Link href={"/united-kingdom"}>Hotel In united-kingdom</Link></li>
                                            <li ><Link href={"/singapore"}>Hotel In singapore</Link></li>
                                            <li ><Link href={"/sydney"}>Hotel In sydney</Link></li>
                                            <li ><Link href={"/tokyo"}>Hotel In tokyo</Link></li>
                                            <li ><Link href={"/usa"}>Hotel In usa</Link></li>




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
