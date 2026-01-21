import Header from '@/component/Header'
import BookHotels_Banner from '@/Components/Book-Hotels/BookHotels_Banner'
import React, { Suspense } from 'react'

export default function page() {
    return (
        <>
            <Suspense fallback={<div>Loading...</div>}>
                <Header />
                <BookHotels_Banner />
            </Suspense>
        </>
    )
}
