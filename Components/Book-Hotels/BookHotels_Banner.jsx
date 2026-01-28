import React from 'react'
import Search from '../HomePage/Search'
import TopHotels from './TopHotels'
import Footer from '@/component/Footer'
import IconicPlaces from './Hotel_IconicPlaces'
import GuideHotel from './GuideHotel'
import Blogs from '../HomePage/Blog/Blogs'
import Book_Hotel_Guide_Section from './Book_HotelGuide_Section'
import Book_Hotel_Faq_section from './Book_Hotel_Faq_section'

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
                    <h1 className='capitalize'>
                      {/* Smart Hotel Booking with Trusted  <span> Guidance</span> */}
                      Compare and  <span>Book Hotels</span> Online Easily
                    </h1>
                    <h5 className='capitalize'>
                      Compare hotel prices, <strong className='g_color'> find the best deals,</strong> and book hotels online securely with trusted travel platforms.

                    </h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Search />
      <TopHotels />
      <IconicPlaces />
      <GuideHotel />

      <Book_Hotel_Guide_Section />
      <Blogs />
      <Book_Hotel_Faq_section />


      <Footer />


    </>
  )
}
