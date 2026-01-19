import React, { Suspense } from 'react'
import Header from '@/component/Header'
import DubaiBanner from '@/Components/InnerPages/Dubai/DubaiBanner'

export default function page() {
    return (
        <>
            <Header />
            <Suspense fallback={<div>Loading...</div>}>

                <DubaiBanner />
            </Suspense>

        </>
    )
}
