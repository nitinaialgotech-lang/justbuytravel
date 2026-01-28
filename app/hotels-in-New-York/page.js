import Header from '@/component/Header'
import NewYorkBanner from '@/Components/InnerPages/NewYorkPage/NewYorkBanner'
import NewYorkRecondSection from '@/Components/InnerPages/NewYorkPage/NewYorkRecondSection'
import React, { Suspense } from 'react'
import { generateDestinationMetadata, generateBreadcrumbStructuredData } from '@/app/utils/seo'
import { getDestinationMetadata } from '@/app/utils/destinationMetadata'

export const metadata = {
    title: "Hotels in New York | Beach, Budget & Luxury Stays | Just Buy Travel",
    description:
        "Start planning your stay in New York with us and find hotels in New York that fit your budget, offer luxury amenities, and are located in the city center.",
    keywords:
        " ",
    openGraph: {
        title: "Hotels in New York | Beach, Budget & Luxury Stays | Just Buy Travel",
        description:
            "Start planning your stay in New York with us and find hotels in New York that fit your budget, offer luxury amenities, and are located in the city center.",
        type: "website",
    },
    alternates: {
        canonical: process.env.NEXT_PUBLIC_SITE_URL || 'https://justbuytravel.com',
    },
    robots: { index: false, follow: false },
};
export default function page() {
    const breadcrumbData = generateBreadcrumbStructuredData([
        { name: 'Home', path: '/' },
        { name: 'New York', path: '/newyork' }
    ]);

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
            />

            <Suspense fallback={<div>Loading...</div>}>
                <Header />
                <NewYorkBanner />
                <NewYorkRecondSection />
            </Suspense>
        </>
    )
}
