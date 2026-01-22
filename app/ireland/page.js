import Header from '@/component/Header'
import IreLandBanner from '@/Components/InnerPages/Ireland/IreLandBanner'
import React,{ Suspense } from 'react'

export default function page() {
    return (
        <>
            <Suspense fallback={<div>Loading...</div>}>
                <Header />
                <IreLandBanner />
            </Suspense>
        </>
    )
}
