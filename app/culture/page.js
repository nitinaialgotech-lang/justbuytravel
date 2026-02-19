import Footer from '@/component/Footer'
import Header from '@/component/Header'
import Culture_Places from '@/Components/Culture/Culture_Places'
import CultureBanner_Section from '@/Components/Culture/CultureBanner_Section'
import React from 'react'
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function page() {
    return (
        <>
            <Header />
            <CultureBanner_Section />
            <Culture_Places />
            <Footer />
        </>
    )
}
