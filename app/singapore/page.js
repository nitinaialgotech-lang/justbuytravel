import Header from '@/component/Header'
import SingaporeBanner from '@/Components/InnerPages/Singapore/SingaporeBanner'
import SingaporeRecomdSection from '@/Components/InnerPages/Singapore/SingaporeRecomdSection'
import React, { Suspense } from 'react'

export default function page() {
    return (
        <>
            <Suspense fallback={<div>Loading...</div>}>
                <Header />
                <SingaporeBanner />
                <SingaporeRecomdSection />
            </Suspense>
        </>
    )
}
