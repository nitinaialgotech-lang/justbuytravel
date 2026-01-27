import { notFound } from 'next/navigation';
import Header from '@/component/Header';
import Footer from '@/component/Footer';
import Blog_Detail from '@/Components/Blogs/Blog_Detail/Blog_Detail';
import { Get_Blogs } from '@/app/Route/endpoints';
import { generateBlogMetadata, generateBlogStructuredData, generateBreadcrumbStructuredData } from '@/app/utils/seo';
import "../../../style/responsive.css";

// Generate static params for static generation
export async function generateStaticParams() {
    try {
        const response = await Get_Blogs();
        const blogs = response?.data || [] || {};
        
        return blogs.map((blog) => ({
            slug: blog.slug,
        }));
    } catch (error) {
        console.error('Error generating static params:', error);
        return [];
    }
}

// Generate dynamic metadata for each blog post
export async function generateMetadata({ params }) {
    try {
        const { slug } = params;
        const response = await Get_Blogs();
        const blogs = response?.data || [];
        
        const blog = blogs.find(b => b.slug === slug);
        
        if (!blog) {
            return {
                title: 'Blog Not Found',
                description: 'The requested blog post could not be found.',
            };
        }
        
        return generateBlogMetadata(blog);
    } catch (error) {
        console.error('Error generating metadata:', error);
        return {
            title: 'Travel Blog',
            description: 'Read our latest travel insights and tips.',
        };
    }
}

export default async function BlogPostPage({ params }) {
    const { slug } = params;
    
    try {
        const response = await Get_Blogs();
        const blogs = response?.data || [];
        const blog = blogs.find(b => b.slug === slug);
        
        if (!blog) {
            notFound();
        }
        
        const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://justbuytravel.com';
        
        // Generate structured data
        const blogStructuredData = generateBlogStructuredData(blog, slug);
        const breadcrumbData = generateBreadcrumbStructuredData([
            { name: 'Home', path: '/' },
            { name: 'Blogs', path: '/blogs' },
            { name: blog.title?.rendered || 'Blog Post', path: `/blog/${slug}` }
        ]);
        
        return (
            <>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(blogStructuredData) }}
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
                />
                
                <div className='container blog'>
                    <Header />
                </div>
                
                <Blog_Detail blog={blog} />
                
                <Footer />
            </>
        );
    } catch (error) {
        if (error?.digest !== "NEXT_HTTP_ERROR_FALLBACK;404") {
            console.error('Error loading blog:', error);
        }
        notFound();
    }
}
