import Header from '@/component/Header'
import TokyoBanner from '@/Components/InnerPages/Tokyo/TokyoBanner'
import React, { Suspense } from 'react'

export default function page() {
    return (
        <>
            <Suspense fallback={<div>Loading...</div>}>
                <Header />
                <TokyoBanner />
            </Suspense>



        </>
    )
}
