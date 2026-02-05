import Link from 'next/link';
import { usePathname } from 'next/navigation';
import FlightQuickLinks from './FlightQuickLinks';
import HotelQuickLinks from './HotelQuickLinks';
export default function QuickLinks() {
    const route = usePathname();
    return (

        <>
            <section className={`padding_bottom ${route == "/about-us" ? "padding_top" : ""}  bg_brown `} >
                <div className="container  ">
                    <div className="row">
                        {/* <div className="section_title relative m-0 ">
                            <h2 className="m-0 link_title">Quick Links</h2>
                        </div> */}
                        <div className={`${route == "/hotels" ? "col-lg-12" : "col-lg-6"} ${route == "/flights" ? "d-none" : ""}`}>
                            {/* ******hotel */}
                            <HotelQuickLinks />


                        </div>
                        {/* ************************** */}
                        <div className={`${route == "/flights" ? "col-lg-12" : "col-lg-6"} ${route == "/hotels" ? "d-none" : ""}`}>
                            {/* **********  flight */}
                            <FlightQuickLinks />
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}
