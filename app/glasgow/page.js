import Header from '@/component/Header'
import GlasGowBanner from '@/Components/InnerPages/GlasGow/GlasGowBanner'
import React, { Suspense } from 'react'

export default function page() {
    return (
        <>
            <Suspense fallback={<div>Loading...</div>}>
                <Header />
                <GlasGowBanner />
            </Suspense>
        </>
    )
}
