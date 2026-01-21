import React, { Suspense } from 'react'
import Header from '@/component/Header'
import GoaBannner from '@/Components/InnerPages/Goa/GoaBannner'

export default function page() {
    return (
        <>
            <Suspense fallback={<div>Loading...</div>}>
                <Header />
                <GoaBannner />
            </Suspense>

        </>
    )
}
