import Header from '@/component/Header'
import Book_CruisesBanner from '@/Components/Book-Cruises/Book_CruisesBanner'
import React, { Suspense } from 'react'

export default function page() {
    return (
        <>
            <Suspense fallback={<div>Loading...</div>}>
                <Header />
                <Book_CruisesBanner />

            </Suspense>
        </>
    )
}
