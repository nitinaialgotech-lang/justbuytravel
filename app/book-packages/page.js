import Header from '@/component/Header'
import PackageBanner from '@/Components/Book-Packages/PackageBanner'
import React, { Suspense } from 'react'

export default function page() {
    return (
        <>
            <Suspense fallback={<div>Loading...</div>}>
                <Header />
                <PackageBanner />
            </Suspense>

        </>
    )
}
