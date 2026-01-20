import React from 'react'
import Search from '../HomePage/Search'
import TopHotels from './TopHotels'
import Footer from '@/component/Footer'
import IconicPlaces from './Hotel_IconicPlaces'
import GuideHotel from './GuideHotel'
import Blogs from '../HomePage/Blog/Blogs'
import Trust_Guide_Section from '../Aboutus/Trust_Guide_Section'
import FaqSection from '../HomePage/Faq/FaqSection'

export default function BookHotels_Banner() {
  return (
    <>
      <section>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="book_hotel_banner_section">
                <div className="banner_box home_banner">
                  <div className="title text-center">
                    <h2 className='capitalize'>
                      Smart Hotel Booking with Trusted  <span> Guidance</span>
                    </h2>
                    {/* <h5 className='capitalize'>
                                        JustBuyTravel explored <strong className='g_color'> hundreds of Flights </strong>  so you can book with <strong className='g_color'> clarity, ease, and confidence .</strong>Your Easy Way to Book Flights and Hotels
                                    </h5> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Search />
      <TopHotels />
      <GuideHotel />
      <IconicPlaces />

      <Trust_Guide_Section />
      <Blogs />
      <FaqSection />


      <Footer />


    </>
  )
}
