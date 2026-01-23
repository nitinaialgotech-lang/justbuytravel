import Header from '@/component/Header'
import SydneyBanner from '@/Components/InnerPages/Sydney/SydneyBanner'
import SydneyRecomd from '@/Components/InnerPages/Sydney/SydneyRecomd'
import React, { Suspense } from 'react'
import { generateDestinationMetadata, generateBreadcrumbStructuredData } from '@/app/utils/seo'
import { getDestinationMetadata } from '@/app/utils/destinationMetadata'

const destination = 'sydney';
const customData = getDestinationMetadata(destination);

export const metadata = generateDestinationMetadata(destination, customData);

export default function page() {
    const breadcrumbData = generateBreadcrumbStructuredData([
        { name: 'Home', path: '/' },
        { name: 'Sydney', path: '/sydney' }
    ]);

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
            />
            
            <Suspense fallback={<div>Loading...</div>}>
                <Header />
                <SydneyBanner />
            </Suspense>
        </>
    )
}
