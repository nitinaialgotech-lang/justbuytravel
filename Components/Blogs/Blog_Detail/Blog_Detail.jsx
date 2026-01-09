import React from 'react'

export default function Blog_detail({ content, blog_image }) {
    return (
        <>

            <section >
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 p-0">
                            <div className="blog_img blog_pb">
                                {
                                    blog_image?.map((item) => {
                                        console.log(item, "item,,,,,,,,,,,,,,,,,,,,,,,");

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


        </>
    )
}
