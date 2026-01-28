import Header from '@/component/Header'
import AustraliaBanner from '@/Components/InnerPages/Australia/AustraliaBanner'
import React, { Suspense } from 'react'
import { generateDestinationMetadata, generateBreadcrumbStructuredData } from '@/app/utils/seo'
import { getDestinationMetadata } from '@/app/utils/destinationMetadata'

export const metadata = {
    title: "Affordable Hotels in Australia | Budget Hotel Deals | Just Buy Travel",
    description:
        " Compare affordable hotels in Australia and find budget-friendly hotel deals through trusted booking partners for a comfortable, safe, and hassle-free stay. ",
    keywords:
        "",
    openGraph: {
        title: "Affordable Hotels in Australia | Budget Hotel Deals | Just Buy Travel",
        description:
            " Compare affordable hotels in Australia and find budget-friendly hotel deals through trusted booking partners for a comfortable, safe, and hassle-free stay. ",
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
        { name: 'Australia', path: '/australia' }
    ]);

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
            />

            <Suspense fallback={<div>Loading...</div>}>
                <Header />
                <AustraliaBanner />
            </Suspense>
        </>
    )
}
