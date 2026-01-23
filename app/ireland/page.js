import Header from '@/component/Header'
import IreLandBanner from '@/Components/InnerPages/Ireland/IreLandBanner'
import React,{ Suspense } from 'react'
import { generateDestinationMetadata, generateBreadcrumbStructuredData } from '@/app/utils/seo'
import { getDestinationMetadata } from '@/app/utils/destinationMetadata'

const destination = 'ireland';
const customData = getDestinationMetadata(destination);

export const metadata = generateDestinationMetadata(destination, customData);

export default function page() {
    const breadcrumbData = generateBreadcrumbStructuredData([
        { name: 'Home', path: '/' },
        { name: 'Ireland', path: '/ireland' }
    ]);

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
            />
            
            <Suspense fallback={<div>Loading...</div>}>
                <Header />
                <IreLandBanner />
            </Suspense>
        </>
    )
}
