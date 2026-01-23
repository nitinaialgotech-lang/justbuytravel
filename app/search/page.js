import SearchResult from '@/Components/SearchResultPage/SearchResult'
import React, { Suspense } from 'react'
import { generateBreadcrumbStructuredData } from '@/app/utils/seo'

export const metadata = {
    title: "Search Hotels, Flights & Travel Deals",
    description: "Search and compare hotels, flights, and travel deals. Find the best prices from multiple booking sites. Compare prices from Expedia, Booking.com and more.",
    keywords: "hotel search, flight search, travel search, compare hotels, hotel prices, travel deals, hotel booking",
    openGraph: {
        title: "Search Hotels, Flights & Travel Deals | Just Buy Travel",
        description: "Search and compare hotels, flights, and travel deals. Find the best prices from multiple booking sites.",
        type: "website",
    },
    alternates: {
        canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://justbuytravel.com'}/search/`,
    },
    robots: {
        index: true,
        follow: true,
    },
};

export default function page() {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://justbuytravel.com';

    const searchPageSchema = {
        "@context": "https://schema.org",
        "@type": "SearchResultsPage",
        "name": "Travel Search Results",
        "description": "Search and compare hotels, flights, and travel deals",
        "url": `${siteUrl}/search/`
    };

    const breadcrumbData = generateBreadcrumbStructuredData([
        { name: 'Home', path: '/' },
        { name: 'Search', path: '/search' }
    ]);

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(searchPageSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
            />
            
            <Suspense fallback={<div>Loading...</div>}>
                <SearchResult />
            </Suspense>
        </>
    )
}
