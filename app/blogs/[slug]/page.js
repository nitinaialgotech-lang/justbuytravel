import { notFound } from 'next/navigation';
import Header from '@/component/Header';
import Footer from '@/component/Footer';
import Blog_Detail_section from '@/Components/Blogs/Blog_Banner/Blog_Detail_section';
import { Get_All_Blog_Posts_For_Static, Get_Blog_By_Slug } from '@/app/Route/endpoints';

export const dynamic = 'force-static';

export async function generateStaticParams() {
    try {
        const blogs = await Get_All_Blog_Posts_For_Static();
        return (blogs || []).map((blog) => ({ slug: blog.slug }));
    } catch (error) {
        console.error('Error generating blog params:', error);
        return [];
    }
}

export default async function BlogDetailPage({ params }) {
    const { slug } = await params;
    const blog = await Get_Blog_By_Slug(slug);
    if (!blog) {
        notFound();
    }

    return (
        <>
            <Header />
            <Blog_Detail_section initialSlug={slug} initialPost={blog} />
            <Footer />
        </>
    );
}
