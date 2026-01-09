"use client";
import { Get_Blog_category, Get_Blog_data } from "@/app/Route/endpoints";
import { useMutation, useQuery } from "@tanstack/react-query";
import moment from "moment";
import { useEffect } from "react";
import { useState } from "react";
import { Tab } from "react-bootstrap";
import Tabs from "react-bootstrap/Tabs";
import { FaRegUserCircle } from "react-icons/fa";

export default function Blog_Tabs() {

  const [activeKey, setActiveKey] = useState("showall"); // default tab

  const { data: categories } = useQuery({
    queryKey: ["blog_category"],
    queryFn: () => Get_Blog_category()
  })
  const [count, setcount] = useState(1)



  // Convert tab key to categoryId (showall = fetch all)
  const categoryId = activeKey === "showall" ? null : Number(activeKey);

  const { data: blog_data, isLoading } = useQuery({
    queryKey: ["blog_data", categoryId, count],
    queryFn: () => Get_Blog_data(categoryId, count),
    enabled: true,
  });
  console.log(blog_data, ",,,,,,,,,,j", categoryId);
  // (*************************************************************** trim the wortds )
  // Helper: truncate first 30 words
  const truncateWords = (html, limit = 30) => {
    const text = html.replace(/<[^>]*>/g, "");
    const words = text.split(/\s+/).slice(0, limit).join(" ");
    return words + (text.split(/\s+/).length > limit ? "..." : "");
  };
  // ****************************************

  return (
    <>
      <section>
        <div className="container">
          <div className="row justify-center">
            <div className="col-lg-12">
              {/* **************** */}
              <div className="tab_head">
                <Tabs
                  id="controlled-tab-example"
                  activeKey={activeKey}
                  onSelect={(k) => setActiveKey(k)}
                  className="mb-3"
                >
                  {/************************************************************* ************************** show all    */}
                  <Tab eventKey="showall" title="Show All">
                    <div className="row">
                      {isLoading ? (
                        <p>Loading...</p>
                      ) : (
                        blog_data?.map((post) => {
                          console.log(post, ";;;;;;;;;;;;;;;");

                          return (


                            <div className="col-lg-4" key={post.id}>
                              <div className="blog_card_box mb-10">
                                <div className="blog_card">
                                  <div className="blog_card_img">
                                    <img
                                      src={
                                        post?.yoast_head_json?.og_image?.[0]?.url ||
                                        "/default-image.webp"
                                      }
                                      alt=""
                                    />
                                  </div>

                                  <div className="blog_card_body blog_showall_body">
                                    <h4
                                      dangerouslySetInnerHTML={{
                                        __html: post.title.rendered,
                                      }}
                                    />
                                    <div
                                      dangerouslySetInnerHTML={{
                                        __html: truncateWords(post.excerpt.rendered),
                                      }}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          )
                        })
                      )}
                    </div>
                  </Tab>

                  {/* ************************** ********************************************************************************************/}
                  {
                    categories?.data?.map((item, i) => {
                      if (item?.name == "Travel" || item?.name == "Flight" || item?.name == "Hotel" || item?.name == "Travel Tips" || item?.name == "Adventure" || item?.name == "Travel Tips") {

                        const cat_name = item?.name;



                        return (

                          <Tab eventKey={item?.id} title={item?.name} key={i}
                          >
                            <div className="container">
                              <div className="row">
                                {blog_data?.map((item) => {
                                  const date_it = item?.date;
                                  const formatted = moment(date_it).format("MMMM D, YYYY");

                                  // Get plain text words from excerpt
                                  const text = item.excerpt.rendered?.replace(/<[^>]*>/g, "").split(" ");
                                  const fullText = text?.slice(0, 30).join(" "); // first 50 words
                                  // *************************************
                                  return (
                                    <div className="col-lg-4" key={item.id}>
                                      <div className="blog_card_box mb-10">
                                        <div className="blog_card">
                                          {/* ****************************** */}
                                          <div className="blog_card_img">
                                            <img
                                              src={item?.yoast_head_json?.og_image?.[0]?.url}
                                              alt=""
                                            />
                                          </div>
                                          {/* ****************************** */}
                                          <div className="blog_card_body">
                                            <div className="card_body_blog_time flex justify-between items-center">
                                              <button className="button_bg2 px-3 py-1 bg-dark text-light">
                                                {cat_name}
                                              </button>
                                              <p className="m-0 g_color">{formatted}</p>
                                            </div>
                                            {/* ****************************** */}
                                            <div className="blog_card_heading">
                                              <h4 className="m-0">
                                                <a href="#">{item?.title?.rendered}</a>
                                              </h4>
                                            </div>
                                            {/* ****************************** */}
                                            <div
                                              className="blog_card_content text-justify"
                                              dangerouslySetInnerHTML={{ __html: fullText + (text.length > 30 ? "..." : "") }}
                                            />

                                            <div className="blog_card_user flex items-center gap-2">
                                              <span className='g_color'>
                                                <FaRegUserCircle />
                                              </span>
                                              <span className="g_color capitalize">Sulagna</span>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>

                            </div>
                          </Tab>
                          // *************************************
                        )
                      }
                    })
                  }
                </Tabs>

                {/* ********************************** yav b more button ........... */}
                <div className="loadmore text-center flex justify-center padding_bottom ">
                  <button className="button_bg2" type="button" onClick={() => setcount(count + 1)}>
                    {isLoading ? <p className="m-0">..Loading</p> : <p className="m-0">Load More</p>}
                  </button>
                </div>
              </div>
              {/* **************** */}
            </div>
          </div>
        </div>
      </section >
    </>
  );
}
