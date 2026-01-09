import Footer from '@/component/Footer'
import Header from '@/component/Header'
import Trusted_Favourite_Companies from '@/Components/TrustedPartner/Trusted&Favourite_Companies'

import TrustedPartner_content from '@/Components/TrustedPartner/TrustedPartner_content'
import React from 'react'
import Trusted_Partner_Banner from '@/Components/TrustedPartner/Trusted_Partner_Banner'
import TrustedPartner_Title from '@/Components/TrustedPartner/TrustedPartner_Title'
import Trusted_Explore_Category from '@/Components/TrustedPartner/Trusted_Explore_Category'

export default function page() {
    return (
        <>
            <Header />

            <TrustedPartner_Title />
            <TrustedPartner_content />

            <Trusted_Favourite_Companies />
            <Trusted_Partner_Banner />
            <Trusted_Explore_Category />
            <Footer />
        </>
    )
}
