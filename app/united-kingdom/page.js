import Header from '@/component/Header'
import UkBanner from '@/Components/InnerPages/UnitedKingDom/UkBanner'
import React from 'react'

export default function page() {
    return (
        <>
            <Suspense fallback={<div>Loading...</div>}>
                <Header />
                <UkBanner />
            </Suspense>


        </>
    )
}
