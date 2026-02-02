import Header from '@/component/Header'
import UkBanner from '@/Components/InnerPages/UnitedKingDom/UkBanner'
import React, { Suspense } from 'react'
import { generateDestinationMetadata, generateBreadcrumbStructuredData } from '@/app/utils/seo'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://justbuytravel.com';
const canonicalUrl = `${siteUrl}/hotels-in-san-francisco`;

export const metadata = {
    title: " Hotels in UK | Best hotels in UK | Just Buy Travel",
    description:
        "Explore hotels in the UK, from luxury stays to affordable options. Compare the best hotels in the UK and plan your trip with Just Buy Travel. ",
    keywords: [
        "hotels in San Francisco",
        "San Francisco hotels",
        "cheap hotels San Francisco",
        "luxury hotels San Francisco",
        "San Francisco accommodation",
    ],
    openGraph: {
        title: " Hotels in UK | Best hotels in UK | Just Buy Travel",
        description:
            "Explore hotels in the UK, from luxury stays to affordable options. Compare the best hotels in the UK and plan your trip with Just Buy Travel. ",
        type: "website",
        url: canonicalUrl,
    },
    alternates: {
        canonical: canonicalUrl,
    },
    robots: { index: false, follow: false },
};
export default function page() {
    const breadcrumbData = generateBreadcrumbStructuredData([
        { name: 'Home', path: '/' },
        { name: 'United Kingdom', path: '/united-kingdom' }
    ]);
    const Faq =
    {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "What are the best hotels in the UK for tourists?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "The UK offers a wide range of hotels for tourists, including city hotels, countryside stays, and family-friendly accommodations across popular destinations."
                }
            },
            {
                "@type": "Question",
                "name": "Can I book hotels in the UK online easily?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, you can book hotels in the UK online by comparing prices, checking availability, and choosing trusted hotel partners in one place."
                }
            },
            {
                "@type": "Question",
                "name": "Are there affordable hotels in the UK for budget travelers?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Affordable hotels are available across the UK, offering comfortable stays with essential amenities for travelers on a budget."
                }
            },
            {
                "@type": "Question",
                "name": "Do UK hotels offer free cancellation options?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Many hotels in the UK provide free cancellation or flexible booking policies, depending on the hotel and booking partner."
                }
            },
            {
                "@type": "Question",
                "name": "Are luxury hotels available across major UK cities?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, luxury hotels are widely available in major UK cities, offering premium services, modern amenities, and central locations."
                }
            }
        ]
    }

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(Faq) }}
            />

            <Suspense >
                <Header />
                <UkBanner />
            </Suspense>
        </>
    )
}
