import Header from '@/component/Header';
import MiamiBanner from '@/Components/InnerPages/Miami/MiamiBanner';
import React from 'react'
export const dynamic = "force-dynamic";
export const revalidate = 0;
export const metadata = {
    title: "",
    description:
        " ",
    keywords:
        "",
    openGraph: {
        title: "",
        description:
            " ",
        type: "website",
    },
    alternates: {
        canonical: process.env.NEXT_PUBLIC_SITE_URL || 'https://justbuytravel.com/hotels-in-miami',
    },
    robots: { index: false, follow: false },
};
export default function page() {
    return (
        <>
            <Header />
            <MiamiBanner />

        </>
    )
}
