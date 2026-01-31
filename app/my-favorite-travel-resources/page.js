import Footer from '@/component/Footer'
import Header from '@/component/Header'
import Trusted_Favourite_Companies from '@/Components/TrustedPartner/Trusted&Favourite_Companies'

import TrustedPartner_content from '@/Components/TrustedPartner/TrustedPartner_content'
import React, { Suspense } from 'react'
import Trusted_Partner_Banner from '@/Components/TrustedPartner/Trusted_Partner_Banner'
import TrustedPartner_Title from '@/Components/TrustedPartner/TrustedPartner_Title'
import Trusted_Explore_Category from '@/Components/TrustedPartner/Trusted_Explore_Category'
import Trust_Guide_Section from '@/Components/Aboutus/Trust_Guide_Section'

export default function page() {
    return (
        <>
            <Suspense fallback={<div>Loading...</div>}>
                <Header />

                <TrustedPartner_Title />
                <TrustedPartner_content />
                <Trust_Guide_Section />
                {/* <Trusted_Favourite_Companies /> */}
                <Trusted_Partner_Banner />
                <Trusted_Explore_Category />
                <Footer />
            </Suspense>
        </>
    )
}
