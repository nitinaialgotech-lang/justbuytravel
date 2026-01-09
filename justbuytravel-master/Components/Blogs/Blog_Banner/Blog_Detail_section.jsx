
"use client"
import React from 'react'
import { SlCalender } from "react-icons/sl";
import { FaRegUserCircle } from "react-icons/fa";
import Blog_Right_Sidebar from '../Blog_Right_Section/Blog_Right_Sidebar';
import Blog_Detail from '../Blog_Detail/Blog_Detail';
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { useQuery } from '@tanstack/react-query';
import { Get_Blogs } from '@/app/Route/endpoints';
import { useSearchParams } from 'next/navigation';

export default function Blog_Detail_section() {

    const { data } = useQuery({
        queryKey: ["blog"],
        queryFn: () => Get_Blogs()
    })

    const blog_slug = useSearchParams();
    const slug = blog_slug.get("detail")
    console.log(slug);
    // ***************************************
    const blog_content = data?.data?.map((item) => {
        if (item?.id == Number(slug)) {
            return item?.excerpt?.rendered
        }
        return null
    })
    // ***************************************
    console.log(blog_content, "content");
    const blog_img = data?.data?.map((item) => {
        if (item?.id == Number(slug)) {
            return item?.yoast_head_json?.og_image
        }
        return null
    })

    return (
        <>
            <section className='Blog_Detail_section blog_pt blog_pb blog_pt'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-lg-8 '>

                            {
                                data?.data?.map((item, i) => {

                                    if (item?.id == Number(slug)) {
                                        console.log(item, "......................item blog");

                                        return (

                                            <div className="title flex flex-col gap-2 padding_bottom" key={i}>
                                                {/* **************************************** */}
                                                <div className='blog_section_left_bar'>
                                                    <div className="breadcrumb m-0">
                                                        <h4 className='flex '>Home <span className='g_color'><MdKeyboardDoubleArrowRight /></span> Should Kpop and Kdrama Lovers Visit Seoul in 2026? </h4>
                                                    </div>
                                                </div>
                                                {/* **************************************** */}
                                                <div className="blog_banner_box p-0">
                                                    <div className="title">
                                                        <h2 className='capitalize'>
                                                            {item?.slug}
                                                        </h2>

                                                    </div>
                                                </div>
                                                {/* **************************************** */}
                                                <div className="time_section flex gap-3 items-center ">
                                                    <div className="month flex items-center gap-1">
                                                        <span className='g_color'><SlCalender /></span>
                                                        <span>December 17, 2025</span>
                                                    </div>
                                                    <div className="time flex items-center gap-1">
                                                        <span className='g_color'>
                                                            <FaRegUserCircle />
                                                        </span>
                                                        <span>
                                                            Written by Sulagna B
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>



                                        )
                                    }



                                    return null

                                })
                            }

                            {/* **************************************** */}
                            <Blog_Detail content={blog_content} blog_image={blog_img} />
                        </div>
                        <div className='col-lg-4'>
                            <Blog_Right_Sidebar />
                        </div>
                    </div>
                </div>
            </section>



        </>
    )
}
