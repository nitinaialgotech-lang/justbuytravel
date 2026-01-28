import Header from '@/component/Header'
import CanadaBanner from '@/Components/InnerPages/Canada/CanadaBanner'
import React, { Suspense } from 'react'
import { generateDestinationMetadata, generateBreadcrumbStructuredData } from '@/app/utils/seo'
import { getDestinationMetadata } from '@/app/utils/destinationMetadata'

export const metadata = {
    title: "Best Hotels in Canada | Budget & Luxury Stays | Just Buy Travel",
    description:
        " Looking for the best hotels in Canada? Compare budget, luxury, and comfortable stays, explore top places to stay, and plan your trip with Just Buy Travel.  ",
    keywords:
        "",
    openGraph: {
        title: "Best Hotels in Canada | Budget & Luxury Stays | Just Buy Travel",
        description:
            " Looking for the best hotels in Canada? Compare budget, luxury, and comfortable stays, explore top places to stay, and plan your trip with Just Buy Travel.  ",
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
        { name: 'Hotels in Canada', path: '/hotels-in-canada' }
    ]);

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
            />

            <Suspense>
                <Header />
                <CanadaBanner />
            </Suspense>
        </>
    )
}
