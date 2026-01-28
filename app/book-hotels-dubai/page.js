import React, { Suspense } from 'react'
import Header from '@/component/Header'
import DubaiBanner from '@/Components/InnerPages/Dubai/DubaiBanner'
import { generateDestinationMetadata, generateBreadcrumbStructuredData } from '@/app/utils/seo'
import { getDestinationMetadata } from '@/app/utils/destinationMetadata'

const destination = 'dubai';
const customData = getDestinationMetadata(destination);

export const metadata = generateDestinationMetadata(destination, customData);

export default function page() {
    const breadcrumbData = generateBreadcrumbStructuredData([
        { name: 'Home', path: '/' },
        { name: 'Dubai', path: '/dubai' }
    ]);

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
            />
            
            <Header />
            <Suspense fallback={<div>Loading...</div>}>
                <DubaiBanner />
            </Suspense>
        </>
    )
}
