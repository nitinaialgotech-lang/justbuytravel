"use client"
import React, { useState, useEffect } from 'react'
import './faq.css'
import { Accordion } from 'react-bootstrap'
import { GoPlusCircle } from "react-icons/go"
import { MdArrowOutward } from 'react-icons/md'

const DEFAULT_KEY = "0"

const FAQS = [
    {
        title: 'How we will help you in getting the best travel deals?',
        content: <>
            We compare the premium travel websites to help you get the{' '}
            <span className="g_color">best deals on flights</span> and hotels.
            You can compare the prices on the site as there will be no hidden costs.
        </>,
        key: "0"
    },
    {
        title: 'Can I book airline tickets and the best hotel offers today with JustBuyTravel?',
        content: <>
            Yes! You can easily search and  <span className="g_color"> compare flight prices </span> and hotel options in one go, making it simple to arrange your whole trip.
        </>,
        key: "1"
    },
    {
        title: 'Are there any hidden fees while booking with JustBuyTravel',
        content: 'No. We only offer the exact pricing and promptly send you to the reputed booking partners with no hidden fees.',
        key: "2"
    },
    {
        title: 'Can I get last-minute travel deals on JustBuyTravel?',
        content: <>
            Absolutely! We can help you find out the <span className="g_color"> cheap flight booking </span> and <span className="g_color"> compare hotel prices </span> even at the last minute.
        </>,
        key: "3"
    },
    {
        title: 'Is JustBuyTravel suitable for international travel?',
        content: <>
            Yes, we serve major worldwide locations and can help you find <span className="g_color"> cheap flights </span> and reliable <span className="g_color">affordable hotels near me </span>  wherever you travel.
        </>,
        key: "4"
    }
]

export default function FaqSection() {
    const [activeKey, setActiveKey] = useState(DEFAULT_KEY)
    const [isDesktop, setIsDesktop] = useState(false)

    // Detect screen size
    useEffect(() => {
        const checkScreen = () => setIsDesktop(window.innerWidth >= 992)
        checkScreen()
        window.addEventListener('resize', checkScreen)
        return () => window.removeEventListener('resize', checkScreen)
    }, [])

    // Desktop hover
    const handleEnter = (key) => {
        if (isDesktop) {
            setActiveKey(key)
        }
    }

    // Restore default item on hover out
    const handleLeave = () => {
        if (isDesktop) {
            setActiveKey(DEFAULT_KEY)
        }
    }

    // Mobile click
    const handleClick = (key) => {
        if (!isDesktop) {
            setActiveKey(activeKey === key ? null : key)
        }
    }

    return (
        <section className="faq-wrapper  pt-5 pb-20  ">
            <div className="container ">
                <div className="section_title ">
                    <h2 className='mb-0 capitalize'>
                        FAQs
                    </h2>
                    <h5 >
                        Simple answers for stress-free travel
                    </h5>
                </div>
                <Accordion activeKey={activeKey}>
                    {FAQS.map((item) => (
                        <Accordion.Item
                            key={item.key}
                            eventKey={item.key}
                            className={activeKey === item.key ? "open" : ""}
                            onMouseEnter={() => handleEnter(item.key)}
                            onMouseLeave={handleLeave}
                        >
                            <Accordion.Header onClick={() => handleClick(item.key)}>
                                <div className="accordian_header flex justify-between items-center w-full header_accordian" id='accordian_gap'>
                                    <h3>{item.title}</h3>

                                    <div className="accordian_icon">
                                        {activeKey === item.key ? (
                                            <span className="bg-color-green">
                                                <MdArrowOutward className='bg-color-green text-white rounded-full p-1' />
                                            </span>
                                        ) : (
                                            <GoPlusCircle />
                                        )}
                                    </div>
                                </div>
                            </Accordion.Header>

                            <Accordion.Body>
                                <div className="accordion_body">
                                    <p>{item.content}</p>
                                </div>
                            </Accordion.Body>
                        </Accordion.Item>
                    ))}
                </Accordion>
            </div>
        </section>
    )
}
