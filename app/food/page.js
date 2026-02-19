import Footer from '@/component/Footer'
import Header from '@/component/Header'
import FoodDestination_Section from '@/Components/FoodDestination/FoodDestination_Section'
import FoodRecomanded_Section from '@/Components/FoodDestination/FoodRecomanded_Section'
import React from 'react'
export const dynamic = "force-dynamic";
export const revalidate = 0;
export default function page() {
    return (
        <>

            <Header />
            <FoodDestination_Section />
            <FoodRecomanded_Section />
            <Footer />
        </>
    )
}
