import Header from '@/component/Header'
import NewYorkBanner from '@/Components/InnerPages/NewYorkPage/NewYorkBanner'
import NewYorkRecondSection from '@/Components/InnerPages/NewYorkPage/NewYorkRecondSection'
import React, { Suspense } from 'react'

export default function page() {
    return (
        <>
            <Suspense fallback={<div>Loading...</div>}>
                <Header />
                < NewYorkBanner />
                <NewYorkRecondSection />
            </Suspense>

        </>
    )
}
