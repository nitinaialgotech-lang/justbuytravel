import Link from 'next/link'
import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { Get_Blogs } from '@/app/Route/endpoints'

export default function Blog_Right_Sidebar() {
    const { data, isLoading } = useQuery({
        queryKey: ["blog_sidebar_recent"],
        queryFn: () => Get_Blogs(),
    })

    const posts = data?.data || []
    const recentPosts = posts.slice(0, 4)

    return (
        <>
            <div className="blog_post_section">
                <div className="post_title ">
                    <h4>
                        Recent Post
                    </h4>
                    {/* ************************** */}
                    <ul className="blog_post_box p-0">
                        {isLoading && (
                            <li>
                                <span className="box_post_title">
                                    <h5 className="m-0">Loading...</h5>
                                </span>
                            </li>
                        )}
                        {!isLoading && recentPosts.length === 0 && (
                            <li>
                                <span className="box_post_title">
                                    <h5 className="m-0">No posts found</h5>
                                </span>
                            </li>
                        )}
                        {!isLoading && recentPosts.map((post) => {
                            const title = post?.title?.rendered || post?.slug || "Post"
                            const imageUrl =
                                post?.yoast_head_json?.og_image?.[0]?.url ||
                                "/justbuytravel_next/demo/blog/Budget-Travel.webp"
                            const date = post?.date
                                ? new Date(post.date).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                })
                                : ""

                            return (
                                <li key={post?.id || post?.slug}>
                                    <Link href={`/blogs/${post?.slug || ""}`} className="post_img">
                                        <img src={imageUrl} className="rounded" alt={title} />
                                    </Link>
                                    <span className="box_post_title">
                                        <h5 className="m-0">
                                            {title}
                                        </h5>
                                        {date && (
                                            <p className="m-0">
                                                {date}
                                            </p>
                                        )}
                                    </span>
                                </li>
                            )
                        })}
                    </ul>
                    {/* ************************** */}
                </div>

            </div>


        </>
    )
}
