import Header from '@/component/Header'
import CanadaBanner from '@/Components/InnerPages/Canada/CanadaBanner'
import React, { Suspense } from 'react'
import { generateDestinationMetadata, generateBreadcrumbStructuredData } from '@/app/utils/seo'
import { getDestinationMetadata } from '@/app/utils/destinationMetadata'

const destination = 'canada';
const customData = getDestinationMetadata(destination);

export const metadata = generateDestinationMetadata(destination, customData);

export default function page() {
    const breadcrumbData = generateBreadcrumbStructuredData([
        { name: 'Home', path: '/' },
        { name: 'Canada', path: '/canada' }
    ]);

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
            />
            
            <Suspense fallback={<div>Loading...</div>}>
                <Header />
                <CanadaBanner />
            </Suspense>
        </>
    )
}
