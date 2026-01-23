import Header from '@/component/Header'
import BookHotels_Banner from '@/Components/Book-Hotels/BookHotels_Banner'
import React, { Suspense } from 'react'
import { generateBreadcrumbStructuredData } from '@/app/utils/seo'

export const metadata = {
    title: "Book Hotels - Best Prices & Deals Worldwide",
    description: "Book hotels worldwide with the best prices guaranteed. Compare rates from top booking sites including Expedia, Booking.com, and Hotels.com. Find your perfect accommodation.",
    keywords: "book hotels, hotel booking, cheap hotels, hotel deals, hotel reservations, accommodation booking, hotel comparison",
    openGraph: {
        title: "Book Hotels - Best Prices & Deals Worldwide | Just Buy Travel",
        description: "Book hotels worldwide with the best prices guaranteed. Compare rates from top booking sites.",
        type: "website",
    },
    alternates: {
        canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://justbuytravel.com'}/book-hotels`,
    },
    robots: {
        index: true,
        follow: true,
    },
};

export default function page() {
    const breadcrumbData = generateBreadcrumbStructuredData([
        { name: 'Home', path: '/' },
        { name: 'Book Hotels', path: '/book-hotels' }
    ]);

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
            />
            
            <Suspense fallback={<div>Loading...</div>}>
                <Header />
                <BookHotels_Banner />
            </Suspense>
        </>
    )
}
