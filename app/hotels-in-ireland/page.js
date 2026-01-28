import Header from '@/component/Header'
import IreLandBanner from '@/Components/InnerPages/Ireland/IreLandBanner'
import React, { Suspense } from 'react'
import { generateDestinationMetadata, generateBreadcrumbStructuredData } from '@/app/utils/seo'
export const metadata = {
    title: " Hotels in Ireland | Cheap & Luxury Stays | Just Buy Travel ",
    description:
        " Compare hotels in Ireland with cheap and luxury stays. Find trusted deals, verified listings, and flexible options for every travel style with Just Buy Travel.",
    keywords:
        "",
    openGraph: {
        title: " Hotels in Ireland | Cheap & Luxury Stays | Just Buy Travel ",
        description:
            " Compare hotels in Ireland with cheap and luxury stays. Find trusted deals, verified listings, and flexible options for every travel style with Just Buy Travel.",
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
        { name: 'Ireland', path: '/ireland' }
    ]);

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
            />

            <Suspense fallback={<div>Loading...</div>}>
                <Header />
                <IreLandBanner />
            </Suspense>
        </>
    )
}
