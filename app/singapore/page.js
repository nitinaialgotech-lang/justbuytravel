import Header from '@/component/Header'
import SingaporeBanner from '@/Components/InnerPages/Singapore/SingaporeBanner'
import SingaporeRecomdSection from '@/Components/InnerPages/Singapore/SingaporeRecomdSection'
import React from 'react'

export default function page() {
    return (
        <>
            <Header />
            <SingaporeBanner />
            <SingaporeRecomdSection />
        </>
    )
}
