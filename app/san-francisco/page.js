import Header from '@/component/Header'
import SanFrancBanner from '@/Components/InnerPages/SanFransci/SanFrancBanner'
import React from 'react'

export default function page() {
    return (

        <>
            <Suspense fallback={<div>Loading...</div>}>
                <Header />
                <SanFrancBanner />
            </Suspense>
        </>
    )
}
