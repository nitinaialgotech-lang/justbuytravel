import React from 'react'


const BlogDetailsShimmer = () => {
    return (
        <section>
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 p-0">

                        {/* Image Shimmer */}
                        <div className="blog_img blog_pb">
                            <div
                                className="shimmer-bg rounded-2xl"
                                style={{ width: "100%", height: "420px" }}
                            />
                        </div>

                        {/* Content Shimmer */}
                        <div className="blog_content blog_pb">

                            {/* Paragraph lines */}
                            {Array.from({ length: 8 }).map((_, i) => (
                                <div
                                    key={i}
                                    className="shimmer-line mb-3"
                                    style={{
                                        width:
                                            i === 7 ? "60%" : "100%",
                                        height: "16px",
                                    }}
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
    return (
        <>
            <style dangerouslySetInnerHTML={{
                __html: `
    @keyframes shimmer {
      0% { background-position: -1000px 0; }
      100% { background-position: 1000px 0; }
    }

    .shimmer-bg,
    .shimmer-line {
      background: linear-gradient(
        90deg,
        #e5e7eb 0%,
        #f3f4f6 50%,
        #e5e7eb 100%
      );
      background-size: 1000px 100%;
      animation: shimmer 1.8s infinite linear;
      border-radius: 8px;
    }
  `
            }} />
            {/* ***************************** */}
            {load ? (
                <BlogDetailsShimmer />
            ) : (
                <section >
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12 p-0">
                                <div className="blog_img blog_pb">
                                    {
                                        blog_image?.map((item) => {
                                            return (
                                                <img src={item?.map((item) => item?.url)} alt="" className='rounded-2xl' />
                                            )
                                        })
                                    }
                                </div>
                                <div className="blog_content blog_pb " >
                                    {
                                        content?.map((item, i) => {
                                            return (

                                                <p dangerouslySetInnerHTML={{ __html: item }} key={i}>

                                                </p>
                                            )
                                        })
                                    }
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
