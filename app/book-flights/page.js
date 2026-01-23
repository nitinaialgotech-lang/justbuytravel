import Header from '@/component/Header'
import Book_Flight_Banner from '@/Components/Book-Flights/Book_Flight_Banner'
import Flight_Iconic_Places from '@/Components/Book-Flights/Flight_Iconic_Places'
import React, { Suspense } from 'react'
import Helping_travel_Explore from '@/Components/Book-Flights/Helping_travel_Explore'
import "../../style/responsive.css";
export default function page() {
    return (
        <>
            <Suspense fallback={<div>Loading...</div>}>
                <Header />
                <Book_Flight_Banner />
                <Flight_Iconic_Places />
                <Helping_travel_Explore />
            </Suspense>

        </>
    )
}
