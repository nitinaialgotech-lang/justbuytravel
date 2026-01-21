import Header from '@/component/Header'
import HotelPageBanner from '@/Components/HotelPage/HotelPageBanner'
import React, { Suspense } from 'react'

export default function page() {
    return (
        <>
            <Suspense fallback={<div>Loading...</div>}>
                <Header />
                <HotelPageBanner />
            </Suspense>
        </>
    )
}
