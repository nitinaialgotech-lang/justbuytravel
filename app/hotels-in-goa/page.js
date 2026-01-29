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
    const FaqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "Are there cheap hotels in Goa near the beach?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, Goa has several budget-friendly hotels near popular beaches. Prices depend on the season and location, so comparing hotel options on trusted booking platforms helps find affordable stays close to the beach."
                }
            },
            {
                "@type": "Question",
                "name": "Which are the best hotels in Goa for families?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Goa offers many family-friendly hotels with spacious rooms, kid-friendly facilities, and safe locations. Families can compare hotel features and locations to choose a stay that fits their needs."
                }
            },
            {
                "@type": "Question",
                "name": "Are there hotels in Goa near the airport?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, there are hotels located near Goa’s airport that are convenient for early flights or short stays. Comparing nearby hotel options makes it easier to find suitable accommodation."
                }
            },
            {
                "@type": "Question",
                "name": "Are beachfront hotels available in Goa?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, Goa is known for its beachfront hotels offering direct access to the beach and sea views. Availability and prices vary, so checking multiple booking platforms is recommended."
                }
            },
            {
                "@type": "Question",
                "name": "Can I book hotels in Goa online?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, hotels in Goa can be booked online through reliable third-party hotel booking websites. Comparing prices and reviews online helps travelers book with confidence."
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
                dangerouslySetInnerHTML={{ __html: JSON.stringify(FaqSchema) }}
            />

            <Suspense >
                <Header />
                <GoaBannner />
            </Suspense>
        </>
    )
}
