import Header from '@/component/Header'
import NewYorkBanner from '@/Components/InnerPages/NewYorkPage/NewYorkBanner'
import NewYorkRecondSection from '@/Components/InnerPages/NewYorkPage/NewYorkRecondSection'
import React, { Suspense } from 'react'
import { generateDestinationMetadata, generateBreadcrumbStructuredData } from '@/app/utils/seo'
import { getDestinationMetadata } from '@/app/utils/destinationMetadata'

const destination = 'newyork';
const customData = getDestinationMetadata(destination);

export const metadata = generateDestinationMetadata(destination, customData);

export default function page() {
    const breadcrumbData = generateBreadcrumbStructuredData([
        { name: 'Home', path: '/' },
        { name: 'New York', path: '/newyork' }
    ]);

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
            />
            
            <Suspense fallback={<div>Loading...</div>}>
                <Header />
                <NewYorkBanner />
                <NewYorkRecondSection />
            </Suspense>
        </>
    )
}
