import Header from '@/component/Header'
import ManchesterBanner from '@/Components/InnerPages/Manchester/ManchesterBanner'
import React, { Suspense } from 'react'
import { generateDestinationMetadata, generateBreadcrumbStructuredData } from '@/app/utils/seo'
import { getDestinationMetadata } from '@/app/utils/destinationMetadata'
export const metadata = {
    title: "Hotels in Manchester | Luxury & Budget Stays | Just Buy Travel  ",
    description:
        "Luxury and comfortable hotels in Manchester with great deals. Compare prices, check trusted stays, and book your hotel easily with Just Buy Travel today.",
    keywords:
        "",
    openGraph: {
        title: "Hotels in Manchester | Luxury & Budget Stays | Just Buy Travel  ",
        description:
            "Luxury and comfortable hotels in Manchester with great deals. Compare prices, check trusted stays, and book your hotel easily with Just Buy Travel today.",
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
        { name: 'Manchester', path: '/manchester' }
    ]);

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
            />

            <Suspense fallback={<div>Loading...</div>}>
                <Header />
                <ManchesterBanner />
            </Suspense>
        </>
    )
}
