import Header from '@/component/Header'
import DenMarkBanner from '@/Components/InnerPages/Denmark/DenMarkBanner'
import React, { Suspense } from 'react'

export default function page() {
    return (
        <>

            <Suspense fallback={<div>Loading...</div>}>
                <Header />
                <DenMarkBanner />
            </Suspense>
        </>
    )
}
