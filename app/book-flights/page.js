import Header from '@/component/Header'
import Book_Flight_Banner from '@/Components/Book-Flights/Book_Flight_Banner'
import Flight_Iconic_Places from '@/Components/Book-Flights/Flight_Iconic_Places'
import React, { Suspense } from 'react'
import "../../style/responsive.css"
import Helping_travel_Explore from '@/Components/Book-Flights/Helping_travel_Explore'
import { generateBreadcrumbStructuredData } from '@/app/utils/seo'

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
            
            <Suspense fallback={<div>Loading...</div>}>
                <Header />
                <Book_Flight_Banner />
                <Flight_Iconic_Places />
                <Helping_travel_Explore />
            </Suspense>
        </>
    )
}
