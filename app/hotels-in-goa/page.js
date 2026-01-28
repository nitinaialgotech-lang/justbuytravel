import React, { Suspense } from 'react'
import Header from '@/component/Header'
import GoaBannner from '@/Components/InnerPages/Goa/GoaBannner'
import { generateDestinationMetadata, generateBreadcrumbStructuredData } from '@/app/utils/seo'
import { getDestinationMetadata } from '@/app/utils/destinationMetadata'

export const metadata = {
    title: "Hotels in Goa | Beach, Budget & Luxury Stays | Just Buy Travel",
    description:
        "Choose hotels in Goa that suit your budget and preferred location. Review amenities, prices, and verified stay options with Just Buy Travel before booking.",
    keywords:
        "terms and conditions, terms of use, service terms, legal terms, user agreement",
    openGraph: {
        title: "Hotels in Goa | Beach, Budget & Luxury Stays | Just Buy Travel",
        description:
            "Choose hotels in Goa that suit your budget and preferred location. Review amenities, prices, and verified stay options with Just Buy Travel before booking.",
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
        { name: 'Goa', path: '/goa' }
    ]);

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
            />

            <Suspense fallback={<div>Loading...</div>}>
                <Header />
                <GoaBannner />
            </Suspense>
        </>
    )
}
