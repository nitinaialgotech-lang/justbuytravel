import Header from "@/component/Header";
import DenMarkBanner from "@/Components/InnerPages/Denmark/DenMarkBanner";
import React, { Suspense } from "react";
import {
    generateDestinationMetadata,
    generateBreadcrumbStructuredData,
} from "@/app/utils/seo";
import { getDestinationMetadata } from "@/app/utils/destinationMetadata";

const destination = "denmark";
const customData = getDestinationMetadata(destination);
// *********************************************************
export const metadata = {
    title: "Hotels in Denmark | Cheap & luxury hotels | Just Buy Travel ",
    description:
        "Looking for hotels in Denmark? Access affordable and luxury stays, transparent pricing, and reliable booking options with Just Buy Travel online today easily.",
    keywords:
        "terms and conditions, terms of use, service terms, legal terms, user agreement",
    openGraph: {
        title: "Hotels in Denmark | Cheap & luxury hotels | Just Buy Travel ",
        description:
            "Looking for hotels in Denmark? Access affordable and luxury stays, transparent pricing, and reliable booking options with Just Buy Travel online today easily.",
        type: "website",
    },
    alternates: {
        canonical: process.env.NEXT_PUBLIC_SITE_URL || 'https://justbuytravel.com',
    },
    robots: { index: false, follow: false },
};

// ******************************************************
export default function page() {
    const breadcrumbData = generateBreadcrumbStructuredData([
        { name: "Home", path: "/" },
        { name: "Denmark", path: "/denmark" },
    ]);

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
            />

            <Suspense fallback={<div>Loading...</div>}>
                <Header />
                <DenMarkBanner />
            </Suspense>
        </>
    );
}
