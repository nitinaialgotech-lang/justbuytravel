import FaqSection from '../../Components/HomePage/Faq/FaqSection'
import { generateBreadcrumbStructuredData, generateFAQStructuredData } from '@/app/utils/seo'

export const metadata = {
    title: "FAQ - Frequently Asked Questions",
    description: "Find answers to frequently asked questions about booking travel, hotels, flights, and using Just Buy Travel. Get help with common travel queries.",
    keywords: "travel FAQ, travel questions, hotel booking help, flight booking FAQ, travel assistance, common travel questions",
    openGraph: {
        title: "FAQ - Frequently Asked Questions | Just Buy Travel",
        description: "Find answers to frequently asked questions about booking travel, hotels, and flights.",
        type: "website",
    },
    alternates: {
        canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://justbuytravel.com'}/faq`,
    },
    robots: {
        index: true,
        follow: true,
    },
};

export default function Page() {
    const breadcrumbData = generateBreadcrumbStructuredData([
        { name: 'Home', path: '/' },
        { name: 'FAQ', path: '/faq' }
    ]);

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
            />
            
            <main>
                <FaqSection />
            </main>
        </>
    )
}
