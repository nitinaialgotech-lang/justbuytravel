import Header from '@/component/Header'
import AustraliaBanner from '@/Components/InnerPages/Australia/AustraliaBanner'
import React, { Suspense } from 'react'

export default function page() {
    return (
        <>
            <Suspense fallback={<div>Loading...</div>}>
                <Header />
                <AustraliaBanner />
            </Suspense>


        </>
    )
}
