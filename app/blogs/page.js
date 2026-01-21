import Footer from '@/component/Footer';
import Header from '@/component/Header'
import Blog_Detail_section from '@/Components/Blogs/Blog_Banner/Blog_Detail_section';
import React, { Suspense } from 'react'

export const metadata = {
    title: "Travel Blogs, Tips & Destination Guides",
    description: "Read travel blogs, destination guides, travel tips, and insider advice from travel experts. Discover hidden gems and plan your perfect trip.",
    keywords: "travel blogs, travel tips, destination guides, travel advice, travel stories, travel inspiration, travel planning",
    openGraph: {
        title: "Travel Blogs, Tips & Destination Guides | Just Buy Travel",
        description: "Read travel blogs, destination guides, travel tips, and insider advice from travel experts.",
        type: "website",
    },
    alternates: {
        canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://justbuytravel.com'}/blogs/`,
    },
    robots: {
        index: false,
        follow: false,
    },
};

export default function page() {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://justbuytravel.com';

    const blogSchema = {
        "@context": "https://schema.org",
        "@type": "Blog",
        "name": "Just Buy Travel Blog",
        "description": "Travel blogs, tips, and destination guides",
        "url": `${siteUrl}/blogs/`
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
            />
            <div className='container blog'>

                <Header />
            </div>

            <Blog_Detail_section />

            <Footer />

        </>
    )
}
