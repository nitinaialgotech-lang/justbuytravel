import Header from '@/component/Header'
import SydneyBanner from '@/Components/InnerPages/Sydney/SydneyBanner'
import SydneyRecomd from '@/Components/InnerPages/Sydney/SydneyRecomd'
import React, { Suspense } from 'react'

export default function page() {
    return (
        <>
            <Suspense fallback={<div>Loading...</div>}>
                <Header />
                <SydneyBanner />
            </Suspense>
        </>
    )
}
