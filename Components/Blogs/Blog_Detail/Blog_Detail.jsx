"use client"
import React, { useEffect } from 'react'


const BlogDetailsShimmer = () => {
    return (
        <section>
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 p-0">

                        {/* Image Shimmer */}
                        <div className="blog_img blog_pb">
                            <div
                                className="shimmer-bg rounded-2xl shimmer-100p-420"
                            />
                        </div>

                        {/* Content Shimmer */}
                        <div className="blog_content blog_pb">

                            {/* Paragraph lines */}
                            {Array.from({ length: 8 }).map((_, i) => (
                                <div
                                    key={i}
                                    className={`shimmer-line mb-3 ${i === 7 ? "shimmer-60p-16" : "shimmer-100p-16"}`}
                                />
                            ))}

                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default function Blog_detail({ content, blog_image, load }) {
    useEffect(() => {
        const root = document.querySelector(".blog_content");
        if (!root) return;

        const handleToggle = (event) => {
            const target = event.target;
            if (!(target instanceof HTMLDetailsElement)) return;
            if (!target.open) return;

            const allDetails = root.querySelectorAll("details");
            allDetails.forEach((detail) => {
                if (detail !== target) detail.open = false;
            });
        };

        root.addEventListener("toggle", handleToggle, true);
        return () => {
            root.removeEventListener("toggle", handleToggle, true);
        };
    }, []);

    return (
        <>
            {/* ***************************** */}
            {load ? (
                <BlogDetailsShimmer />
            ) : (
                <section >
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12 p-0">
                                <div className="blog_img blog_pb">
                                    {Array.isArray(blog_image) &&
                                        blog_image.map((item, index) => (
                                            <img
                                                key={`blog-image-${item?.url || index}`}
                                                src={item?.url}
                                                alt=""
                                                className="rounded-2xl"
                                            />
                                        ))}
                                </div>
                                <div
                                    className="blog_content blog_pb "
                                    dangerouslySetInnerHTML={{ __html: content }}
                                >
                                    {/* ******************* */}
                                    {/* <div className="blog_title blog_pb ">
                                    <h2 className='mb-0 '>
                                        Why Seoul Is a Dream Destination for Kpop Fans
                                    </h2>

                                </div> */}
                                    {/* ******************* */}
                                    {/* <div className="blog_img blog_pb">
                                    <img src="/justbuytravel_next/demo/blog/Budget-Travel.webp" alt="" className='rounded-2xl' />
                                </div> */}
                                    {/* ******************* */}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )
            }


        </>
    )
}
