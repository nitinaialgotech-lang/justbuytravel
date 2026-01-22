import Header from '@/component/Header'
import UsaBanner from '@/Components/InnerPages/USA/UsaBanner'
import React,{ Suspense } from 'react'

export default function page() {
    return (
        <>
            <Suspense fallback={<div>Loading...</div>}>
                <Header />
                <UsaBanner />
            </Suspense>

        </>
    )
}
