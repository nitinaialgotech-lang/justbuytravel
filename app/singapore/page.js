import Header from '@/component/Header'
import SingaporeBanner from '@/Components/InnerPages/Singapore/SingaporeBanner'
import SingaporeRecomdSection from '@/Components/InnerPages/Singapore/SingaporeRecomdSection'
import React, { Suspense } from 'react'
import { generateDestinationMetadata, generateBreadcrumbStructuredData } from '@/app/utils/seo'
import { getDestinationMetadata } from '@/app/utils/destinationMetadata'

const destination = 'singapore';
const customData = getDestinationMetadata(destination);

export const metadata = generateDestinationMetadata(destination, customData);

export default function page() {
    const breadcrumbData = generateBreadcrumbStructuredData([
        { name: 'Home', path: '/' },
        { name: 'Singapore', path: '/singapore' }
    ]);

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
            />
            
            <Suspense fallback={<div>Loading...</div>}>
                <Header />
                <SingaporeBanner />
                <SingaporeRecomdSection />
            </Suspense>
        </>
    )
}
