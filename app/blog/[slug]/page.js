import { notFound } from 'next/navigation';
import Link from 'next/link';
import Header from '@/component/Header';
import Footer from '@/component/Footer';
import Blog_Detail from '@/Components/Blogs/Blog_Detail/Blog_Detail';
import Blog_Right_Sidebar from '@/Components/Blogs/Blog_Right_Section/Blog_Right_Sidebar';
import { Get_Blog_By_Slug, Get_Blog_category, Get_All_Blog_Posts_For_Static } from '@/app/Route/endpoints';
import { generateBlogMetadata, generateBlogStructuredData, generateBreadcrumbStructuredData } from '@/app/utils/seo';
import { SlCalender } from 'react-icons/sl';
import { FaRegUserCircle } from 'react-icons/fa';
import { MdKeyboardDoubleArrowRight } from 'react-icons/md';
import "../../../style/responsive.css";

// Pre-render all known blog slugs at build so /blog/[slug] works on static hosts (e.g. Hostinger).
export async function generateStaticParams() {
  try {
    const posts = await Get_All_Blog_Posts_For_Static();
    return (posts || []).filter((p) => p?.slug).map((p) => ({ slug: p.slug }));
  } catch (err) {
    console.warn('generateStaticParams blog/[slug]:', err?.message);
    return [];
  }
}

export const dynamicParams = true;

export async function generateMetadata({ params }) {
    try {
        const { slug } = await params;
        const blog = await Get_Blog_By_Slug(slug);
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
    const { slug } = await params;

    try {
        const blog = await Get_Blog_By_Slug(slug);
        if (!blog) {
            notFound();
        }

        const categoriesRes = await Get_Blog_category();
        const categories = categoriesRes?.data || [];
        const firstCategoryId = blog?.categories?.[0];
        const categoryForBreadcrumb = categories.find((c) => Number(c.id) === Number(firstCategoryId));

        const blogContent = blog?.content?.rendered || '';
        const blogImage = blog?.yoast_head_json?.og_image || [];
        
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

                <section className="Blog_Detail_section blog_pt blog_pb blog_pt">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8">
                                <div className="title flex flex-col gap-2 padding_bottom">
                                    <div className="blog_section_left_bar">
                                        <div className="breadcrumb m-0">
                                            <p className="flex flex-wrap items-center gap-1 m-0">
                                                <Link href="/" className="g_color_hover">Home</Link>
                                                <span className="g_color"><MdKeyboardDoubleArrowRight /></span>
                                                <Link href={`/blog?category=${categoryForBreadcrumb?.slug || ''}`} className="g_color_hover">{categoryForBreadcrumb?.name || 'Blog'}</Link>
                                                <span className="g_color"><MdKeyboardDoubleArrowRight /></span>
                                                <span className="breadcrumb_current" dangerouslySetInnerHTML={{ __html: blog.title?.rendered || blog.slug || '' }} />
                                            </p>
                                        </div>
                                    </div>
                                    <div className="blog_banner_box p-0">
                                        <div className="title">
                                            <h1 className="capitalize" dangerouslySetInnerHTML={{ __html: blog.title?.rendered || blog.slug || '' }} />
                                        </div>
                                    </div>
                                    <div className="time_section flex gap-3 items-center ">
                                        <div className="month flex items-center gap-1">
                                            <span className="g_color"><SlCalender /></span>
                                            <span>
                                                {blog?.date
                                                    ? new Date(blog.date).toLocaleDateString('en-US', {
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric',
                                                    })
                                                    : ''}
                                            </span>
                                        </div>
                                        <div className="time flex items-center gap-1">
                                            <span className="g_color">
                                                <FaRegUserCircle />
                                            </span>
                                            <span>
                                                Written by {blog?.yoast_head_json?.author || 'JustBuyTravel'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <Blog_Detail content={blogContent} blog_image={blogImage} load={false} />
                            </div>
                            <div className="col-lg-4">
                                <Blog_Right_Sidebar />
                            </div>
                        </div>
                    </div>
                </section>
                
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
