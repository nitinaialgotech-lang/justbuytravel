import Footer from '@/component/Footer'
import Header from '@/component/Header'
import CapeTownBanner from '@/Components/InnerPages/Capetown/CapeTownBanner'
import CapTownRecomd from '@/Components/InnerPages/Capetown/CapTownRecomd'
import React from 'react'

export default function page() {
    return (
        <>
            <Header />

            <CapeTownBanner />
            <CapTownRecomd />

        </>
    )
}
