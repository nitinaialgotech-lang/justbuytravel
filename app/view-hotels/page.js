import Footer from '@/component/Footer'
import Header from '@/component/Header'
import TrySearch from '@/Components/HomePage/Search'
import ViewHotelBanner from '@/Components/ViewHotels/ViewHotelBanner'
import ViewHotelPage from '@/Components/ViewHotels/ViewHotelPage'
import React from 'react'

export default function page() {
    return (
        <>
            <Header />
            <ViewHotelBanner />
            <TrySearch />
            <ViewHotelPage />
            <Footer />
        </>
    )
}
