import React, { Suspense } from 'react'
import Header from '@/component/Header'
import DubaiBanner from '@/Components/InnerPages/Dubai/DubaiBanner'
import { generateDestinationMetadata, generateBreadcrumbStructuredData } from '@/app/utils/seo'
import { getDestinationMetadata } from '@/app/utils/destinationMetadata'

// *********************************************************
export const metadata = {
    title: "Book Hotels in Dubai | Compare Cheap & Luxury Hotel Deals |  Just Buy Travel ",
    description:
        " Looking for book hotels in Dubai? Compare budget, luxury & 5-star hotels and find the best deals from trusted booking partners online.  ",
    keywords:
        "",
    openGraph: {
        title: "Book Hotels in Dubai | Compare Cheap & Luxury Hotel Deals |  Just Buy Travel ",
        description:
            " Looking for book hotels in Dubai? Compare budget, luxury & 5-star hotels and find the best deals from trusted booking partners online.  ",
        type: "website",
    },
    alternates: {
        canonical: process.env.NEXT_PUBLIC_SITE_URL || 'https://justbuytravel.com',
    },
    robots: { index: false, follow: false },
};

// ******************************************************
export default function page() {
    const breadcrumbData = generateBreadcrumbStructuredData([
        { name: 'Home', path: '/' },
        { name: 'Dubai', path: '/dubai' }
    ]);

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
            />

            <Header />
            <Suspense fallback={<div>Loading...</div>}>
                <DubaiBanner />
            </Suspense>
        </>
    )
}
