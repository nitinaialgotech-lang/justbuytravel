"use client"
import React, { useEffect } from 'react'
import gsap from "gsap";

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
        let observer;

        const initAccordion = () => {
            const accordions = document.querySelectorAll(".e-n-accordion");
            if (!accordions.length) return;

            accordions.forEach((accordion) => {
                const items = accordion.querySelectorAll(".e-n-accordion-item");

                items.forEach((item) => {
                    const content = item.querySelector('div[role="region"]');
                    if (!content) return;

                    // Inject icon dynamically if not present
                    let icon = item.querySelector(".accordion-icon");
                    const header = item.querySelector(".accordion-header") || item.firstElementChild;
                    if (!icon && header) {
                        icon = document.createElement("span");
                        icon.className = "accordion-icon";
                        icon.textContent = "+"; // initial closed icon
                        header.appendChild(icon);
                    }

                    // Initial closed state
                    gsap.set(content, { height: 0, opacity: 0, overflow: "hidden" });
                    if (icon) icon.textContent = "+";

                    const openItem = () => {
                        items.forEach((i) => {
                            const c = i.querySelector('div[role="region"]');
                            const ic = i.querySelector(".accordion-icon");
                            if (c && i !== item) {
                                gsap.to(c, { height: 0, opacity: 0, duration: 0.4, ease: "power3.inOut" });
                                if (ic) ic.textContent = "+";
                            }
                        });

                        gsap.to(content, { height: content.scrollHeight, opacity: 1, duration: 0.6, ease: "power3.out" });
                        if (icon) icon.textContent = "−";
                    };

                    const closeItem = () => {
                        gsap.to(content, { height: 0, opacity: 0, duration: 0.4, ease: "power3.inOut" });
                        if (icon) icon.textContent = "+";
                    };

                    // Attach hover events
                    item.addEventListener("mouseenter", openItem);
                    item.addEventListener("mouseleave", closeItem);

                    item._accordionListeners = { openItem, closeItem };
                });
            });
        };

        // Initialize once
        initAccordion();

        // Observe WordPress content dynamically
        const contentContainer = document.querySelector(".blog_content");
        if (contentContainer) {
            observer = new MutationObserver(() => initAccordion());
            observer.observe(contentContainer, { childList: true, subtree: true });
        }

        // Cleanup
        return () => {
            const accordions = document.querySelectorAll(".e-n-accordion");
            accordions.forEach((accordion) => {
                const items = accordion.querySelectorAll(".e-n-accordion-item");
                items.forEach((item) => {
                    if (item._accordionListeners) {
                        item.removeEventListener("mouseenter", item._accordionListeners.openItem);
                        item.removeEventListener("mouseleave", item._accordionListeners.closeItem);
                    }
                });
            });
            if (observer) observer.disconnect();
        };
    }, [content]); // re-run whenever WordPress content changes
    return (
        <>
            {/* ***************************** */}
            {load ? (
                <BlogDetailsShimmer />
            ) : (

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
                                {/* ******************* */}
                            </div>
                        </div>
                    </div>
                </div>

            )
            }


        </>
    )
}
