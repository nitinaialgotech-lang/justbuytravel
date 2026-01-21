import Header from '@/component/Header'
import SaudiToInBanner from '@/Components/InnerPages/SaudiToIndia/SaudiToInBanner'
import React, { Suspense } from 'react'

export default function page() {
    return (
        <>
            <Suspense fallback={<div>Loading...</div>}>
                <Header />
                <SaudiToInBanner />
            </Suspense>

        </>
    )
}
