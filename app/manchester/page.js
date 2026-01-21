import Header from '@/component/Header'
import ManchesterBanner from '@/Components/InnerPages/Manchester/ManchesterBanner'
import React, { Suspense } from 'react'

export default function page() {
    return (
        <>
            <Suspense fallback={<div>Loading...</div>}>
                <Header />

                <ManchesterBanner />
            </Suspense>

        </>
    )
}
