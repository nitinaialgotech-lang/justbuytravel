import Header from '@/component/Header'
import SanFrancBanner from '@/Components/InnerPages/SanFransci/SanFrancBanner'
import { React, Suspense } from 'react'
import { generateDestinationMetadata, generateBreadcrumbStructuredData } from '@/app/utils/seo'
import { getDestinationMetadata } from '@/app/utils/destinationMetadata'

export const metadata = {
    title: "Hotels in San Francisco | Cheap & Luxury | Just Buy Travel ",
    description:
        " Choose from affordable and premium hotels in San Francisco with reliable listings, central locations, and easy booking options. Visit the website now.",
    keywords:
        "",
    openGraph: {
        title: "Hotels in San Francisco | Cheap & Luxury | Just Buy Travel ",
        description:
            " Choose from affordable and premium hotels in San Francisco with reliable listings, central locations, and easy booking options. Visit the website now.",
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
        { name: 'San Francisco', path: '/san-francisco' }
    ]);
    const FaqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "What are the best areas to stay in San Francisco?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Union Square suits travellers who want central access, Fisherman’s Wharf works well for first-time visits, and SoMa is ideal for business stays."
                }
            },
            {
                "@type": "Question",
                "name": "Are there affordable hotels in San Francisco with good locations?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes. Many budget-friendly hotels are located near transit lines and popular districts, helping travellers save money without losing convenience."
                }
            },
            {
                "@type": "Question",
                "name": "Are there pet friendly hotels San Francisco travellers can choose from?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes. Several hotels in San Francisco welcome pets, offering flexible policies, nearby walking areas, and comfortable stays for travellers with pets."
                }
            },
            {
                "@type": "Question",
                "name": "Are there hotels near San Francisco airport for early flights?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes. Airport-area hotels are convenient for early departures, late arrivals, or short overnight stays between connections."
                }
            },
            {
                "@type": "Question",
                "name": "Can I book hotels in San Francisco directly through Just Buy Travel?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Just Buy Travel does not handle bookings directly. We help travellers review hotel options and pricing before completing bookings on trusted partner sites."
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

            <Suspense fallback={<div>Loading...</div>}>
                <Header />
                <SanFrancBanner />
            </Suspense>
        </>
    )
}
