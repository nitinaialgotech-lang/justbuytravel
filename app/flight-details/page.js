import Header from '@/component/Header'
import Flight_Detail_Banner from '@/Components/Book-Flights/Flight_Details/Flight_Detail_Banner'
import React from 'react'
export const dynamic = "force-dynamic";
export const revalidate = 0;
export default function page() {
    return (
        <>
            <Header />

            <Flight_Detail_Banner />



        </>
    )
}
