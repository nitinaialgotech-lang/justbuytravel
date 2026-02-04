import { notFound } from 'next/navigation';
import Header from '@/component/Header';
import Footer from '@/component/Footer';
import Blog_Detail_section from '@/Components/Blogs/Blog_Banner/Blog_Detail_section';
import { Get_Blog_By_Slug, Get_All_Blog_Posts_For_Static } from '@/app/Route/endpoints';

// Pre-render all known blog slugs at build so /blogs/[slug] works on static hosts (e.g. Hostinger).
export async function generateStaticParams() {
  try {
    const posts = await Get_All_Blog_Posts_For_Static();
    return (posts || []).filter((p) => p?.slug).map((p) => ({ slug: p.slug }));
  } catch (err) {
    console.warn('generateStaticParams blogs/[slug]:', err?.message);
    return [];
  }
}

export const dynamicParams = true;

export default async function BlogDetailPage({ params }) {
    const { slug } = await params;
    let blog = null;
    try {
        blog = await Get_Blog_By_Slug(slug);
    } catch (error) {
        console.error('Error fetching blog:', error?.message || error);
        notFound();
    }
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
