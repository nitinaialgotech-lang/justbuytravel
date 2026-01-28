import Header from '@/component/Header'
import GlasGowBanner from '@/Components/InnerPages/GlasGow/GlasGowBanner'
import React, { Suspense } from 'react'
import { generateDestinationMetadata, generateBreadcrumbStructuredData } from '@/app/utils/seo'
export const metadata = {
    title: "Hotels in Glasgow | Luxury & Family Stays | Just Buy Travel ",
    description:
        " Find the best hotels in Glasgow with Just Buy Travel. Explore luxury and family stays, compare prices, and book top hotel deals across trusted platforms.",
    keywords:
        "",
    openGraph: {
        title: "Hotels in Glasgow | Luxury & Family Stays | Just Buy Travel ",
        description:
            " Find the best hotels in Glasgow with Just Buy Travel. Explore luxury and family stays, compare prices, and book top hotel deals across trusted platforms.",
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
        { name: 'Glasgow', path: '/glasgow' }
    ]);

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
            />

            <Suspense fallback={<div>Loading...</div>}>
                <Header />
                <GlasGowBanner />
            </Suspense>
        </>
    )
}
