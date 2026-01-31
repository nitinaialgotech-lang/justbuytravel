import { notFound } from 'next/navigation';
import Header from '@/component/Header';
import Footer from '@/component/Footer';
import Blog_Detail from '@/Components/Blogs/Blog_Detail/Blog_Detail';
import Blog_Right_Sidebar from '@/Components/Blogs/Blog_Right_Section/Blog_Right_Sidebar';
import { Get_Blog_By_Slug, Get_Blog_category } from '@/app/Route/endpoints';
import { generateBlogMetadata, generateBlogStructuredData, generateBreadcrumbStructuredData } from '@/app/utils/seo';
import { SlCalender } from 'react-icons/sl';
import { FaRegUserCircle } from 'react-icons/fa';
import { MdKeyboardDoubleArrowRight } from 'react-icons/md';
import "../../../style/responsive.css";

// Reserved first segments that are actual app routes (not blog categories)
const RESERVED_SEGMENTS = new Set([
  'aboutus', 'blog', 'blogs', 'book-cruises', 'book-flights', 'book-hotels',
  'book-hotels-dubai', 'book-packages', 'contactus', 'denmark', 'desclimer',
  'faq', 'hotel', 'hoteldetail', 'hotels', 'hotels-in-australia', 'hotels-in-canada',
  'hotels-in-denmark', 'hotels-in-glasgow', 'hotels-in-goa', 'hotels-in-ireland',
  'hotels-in-manchester', 'hotels-in-New-York', 'hotels-in-paris', 'hotels-in-san-francisco',
  'hotels-in-uk', 'my-favorite-travel-resources', 'newyork', 'privacy-policy',
  'search', 'singapore', 'sydney', 'term-and-conditions', 'tokyo', 'usa',
  'view-all-hotels'
]);

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }) {
  try {
    const { hotel: categorySlug, slug } = await params;
    const categorySlugLower = (categorySlug || '').toLowerCase();

    if (RESERVED_SEGMENTS.has(categorySlugLower)) {
      return { title: 'Not Found' };
    }

    const [categoriesRes, blog] = await Promise.all([
      Get_Blog_category(),
      Get_Blog_By_Slug(slug),
    ]);
    const categories = categoriesRes?.data || [];
    const validCategorySlugs = categories.map((c) => (c.slug || '').toLowerCase());
    if (!validCategorySlugs.includes(categorySlugLower)) {
      return { title: 'Not Found' };
    }

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

export default async function BlogDetailWithCategoryPage({ params }) {
  const { hotel: categorySlug, slug } = await params;
  const categorySlugLower = (categorySlug || '').toLowerCase();

  if (RESERVED_SEGMENTS.has(categorySlugLower)) {
    notFound();
  }

  try {
    const [categoriesRes, blog] = await Promise.all([
      Get_Blog_category(),
      Get_Blog_By_Slug(slug),
    ]);
    const categories = categoriesRes?.data || [];
    const validCategorySlugs = categories.map((c) => (c.slug || '').toLowerCase());

    if (!validCategorySlugs.includes(categorySlugLower)) {
      notFound();
    }

    if (!blog) {
      notFound();
    }

    const blogContent = blog?.content?.rendered || '';
    const blogImage = blog?.yoast_head_json?.og_image || [];

    const blogStructuredData = generateBlogStructuredData(blog, slug);
    const breadcrumbData = generateBreadcrumbStructuredData([
      { name: 'Home', path: '/' },
      { name: 'Blogs', path: '/blogs' },
      { name: blog.title?.rendered || 'Blog Post', path: `/${categorySlug}/${slug}` },
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

        <div className="container blog">
          <Header />
        </div>

        <section className="Blog_Detail_section blog_pt blog_pb blog_pt">
          <div className="container">
            <div className="row">
              <div className="col-lg-8">
                <div className="title flex flex-col gap-2 padding_bottom">
                  <div className="blog_section_left_bar">
                    <div className="breadcrumb m-0">
                      <h4 className="flex ">
                        Home <span className="g_color"><MdKeyboardDoubleArrowRight /></span>
                        <span dangerouslySetInnerHTML={{ __html: blog.title?.rendered || blog.slug || '' }} />
                      </h4>
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
    if (error?.digest !== 'NEXT_HTTP_ERROR_FALLBACK;404') {
      console.error('Error loading blog:', error);
    }
    notFound();
  }
}
