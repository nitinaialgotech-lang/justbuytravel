import Header from '@/component/Header'
import Book_Flight_Banner from '@/Components/Book-Flights/Book_Flight_Banner'
import Flight_Iconic_Places from '@/Components/Book-Flights/Flight_Iconic_Places'
import React, { Suspense } from 'react'
import Helping_travel_Explore from '@/Components/Book-Flights/Helping_travel_Explore'
import { generateBreadcrumbStructuredData } from '@/app/utils/seo'
import Popular_Flight_Hotel_section from '@/Components/Book-Flights/Popular_Flight_Hotel_section'
import Iconic_Flight_Hotel_section from '@/Components/Book-Flights/Iconic_Flight_Hotel_section'
import Trusted_Favourite_Companies from '@/Components/TrustedPartner/Trusted&Favourite_Companies'
import Blogs from '@/Components/HomePage/Blog/Blogs'
import Footer from '@/component/Footer'
import Flight_Faq_Section from '@/Components/Book-Flights/Flight_Faq_Section'
import Flight_Hotel_Guide_Section from '@/Components/Book-Flights/Flight_Hotel_Guide_Section'
import Trust_Guide_Section from '@/Components/Aboutus/Trust_Guide_Section'

export const metadata = {
    title: "Book Flights - Compare & Save on Airfare",
    description: "Book cheap flights and compare airfare from leading airlines. Find the best flight deals, compare prices, and book your tickets with confidence.",
    keywords: "book flights, cheap flights, flight booking, airfare deals, compare flights, airline tickets, flight search, discount flights",
    openGraph: {
        title: "Book Flights - Compare & Save on Airfare | Just Buy Travel",
        description: "Book cheap flights and compare airfare from leading airlines. Find the best flight deals.",
        type: "website",
    },
    alternates: {
        canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://justbuytravel.com'}/book-flights`,
    },
    robots: {
        index: true,
        follow: true,
    },
};

export default function page() {
    const breadcrumbData = generateBreadcrumbStructuredData([
        { name: 'Home', path: '/' },
        { name: 'Book Flights', path: '/book-flights' }
    ]);

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
            />

            <Suspense >
                <Header />
                <Book_Flight_Banner />
                <Helping_travel_Explore />
                {/* <Popular_Flight_Hotel_section /> */}
                <Iconic_Flight_Hotel_section />
                {/* <Flight_Iconic_Places /> */}
                {/* <Flight_Hotel_Guide_Section /> */}
                <Trust_Guide_Section />
                <Flight_Faq_Section />

                <Blogs />


                <Footer />
            </Suspense>
        </>
    )
}
