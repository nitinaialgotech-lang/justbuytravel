import Header from '@/component/Header'
import CanadaBanner from '@/Components/InnerPages/Canada/CanadaBanner'
import React, { Suspense } from 'react'

export default function page() {
    return (
        <>
            <Suspense fallback={<div>Loading...</div>}>
                <Header />
                <CanadaBanner />
            </Suspense>
        </>
    )
}
