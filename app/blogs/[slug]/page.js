import Header from '@/component/Header';
import Footer from '@/component/Footer';
import Blog_Detail_section from '@/Components/Blogs/Blog_Banner/Blog_Detail_section';
import { Get_Blogs } from '@/app/Route/endpoints';

export const dynamic = 'force-static';
export const dynamicParams = false;

export async function generateStaticParams() {
    try {
        const response = await Get_Blogs();
        const blogs = response?.posts || [];

        return blogs.map((blog) => ({ slug: blog.slug }));
    } catch (error) {
        console.error('Error generating blog params:', error);
        return [];
    }
}
export default async function BlogDetailPage({ params }) {
    const { slug } = await params;

    return (
        <>
            <Header />

            <Blog_Detail_section initialSlug={slug} />
            <Footer />
        </>
    );
}
