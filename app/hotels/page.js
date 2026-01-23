import Header from '@/component/Header'
import HotelPageBanner from '@/Components/HotelPage/HotelPageBanner'
import React, { Suspense } from 'react'
import { generateBreadcrumbStructuredData } from '@/app/utils/seo'

export const metadata = {
    title: "Hotels - Find & Compare Best Hotel Deals Worldwide",
    description: "Discover and compare hotels worldwide. Browse thousands of hotels, read reviews, view photos, and find the best deals. Book your perfect accommodation today.",
    keywords: "hotels, hotel search, find hotels, hotel deals, accommodation, hotel booking, hotel comparison, cheap hotels",
    openGraph: {
        title: "Hotels - Find & Compare Best Hotel Deals Worldwide | Just Buy Travel",
        description: "Discover and compare hotels worldwide. Browse thousands of hotels and find the best deals.",
        type: "website",
    },
    alternates: {
        canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://justbuytravel.com'}/hotels`,
    },
    robots: {
        index: true,
        follow: true,
    },
};

export default function page() {
    const breadcrumbData = generateBreadcrumbStructuredData([
        { name: 'Home', path: '/' },
        { name: 'Hotels', path: '/hotels' }
    ]);

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
            />
            
            <Suspense fallback={<div>Loading...</div>}>
                <Header />
                <HotelPageBanner />
            </Suspense>
        </>
    )
}
