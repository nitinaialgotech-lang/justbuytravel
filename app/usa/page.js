import Header from '@/component/Header'
import UsaBanner from '@/Components/InnerPages/USA/UsaBanner'
<<<<<<< HEAD
import React,{ Suspense } from 'react'
=======
import React, { Suspense } from 'react'
>>>>>>> 9b9b0db8ed1e567088fa0c997ad83072bc29f987

export default function page() {
    return (
        <>
            <Suspense fallback={<div>Loading...</div>}>
                <Header />
                <UsaBanner />
            </Suspense>

        </>
    )
}
