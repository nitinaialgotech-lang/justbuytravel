import Header from '@/component/Header'
import ParisBanner from '@/Components/InnerPages/paris/ParisBanner'
import React, { Suspense } from 'react'

export default function page() {
    return (
        <>
            <Suspense fallback={<div>Loading...</div>}>
                <Header />
                <ParisBanner />
            </Suspense>

        </>
    )
}
