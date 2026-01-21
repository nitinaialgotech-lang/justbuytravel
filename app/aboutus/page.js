import Footer from '@/component/Footer'
import Header from '@/component/Header'
import About_banner from '@/Components/Aboutus/About_banner'
import AboutHotelDetail from '@/Components/SearchResultPage/HotelDetail/AboutHotelDetail'
import React, { Suspense } from 'react'

export default function page() {
    return (
        <>
            <Suspense fallback={<div>Loading...</div>}>
                <Header />
                <About_banner />
                <Footer />
            </Suspense>
        </>
    )
}
