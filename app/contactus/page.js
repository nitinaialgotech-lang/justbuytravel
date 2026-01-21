import React, { Suspense } from 'react'
import Header from '../../component/Header'
import ContactUs from '@/Components/Contactus/ContactUs'
import Footer from '@/component/Footer'
export default function page() {
    return (
        <>
            <Suspense fallback={<div>Loading...</div>}>
                <Header />
                <ContactUs />

                <Footer />
            </Suspense>
        </>
    )
}
