"use client";
import React from 'react'
import { IoCheckmarkOutline } from "react-icons/io5";
import { getAssetPath } from '@/app/utils/assetPath';
import { useSearchParams } from 'next/navigation';

export default function HotelDetailContent({ prices, load, title_url }) {
    const searchParams = useSearchParams();
    const ShimmerPriceCard = () => {
        return (
            <div className="hotel_price_detail">
                {Array.from({ length: 3 }).map((_, i) => (
                    <div
                        className="hotel_price_card flex items-center justify-between border-t border-gray-300 p-4"
                        key={i}
                    >
                        {/* Left: Title */}
                        <div className="shimmer-text w-1/3 h-6 rounded-md"></div>

                        {/* Middle: Price */}
                        <div className="shimmer-text w-1/6 h-6 rounded-md mx-4"></div>

                        {/* Right: Button */}
                        <div className="shimmer-button w-24 h-8 rounded-md"></div>
                    </div>
                ))}

                {/* Shimmer CSS */}
                <style dangerouslySetInnerHTML={{
                    __html: `
        @keyframes shimmer {
          0% {
            background-position: -1000px 0;
          }
          100% {
            background-position: 1000px 0;
          }
        }

        .shimmer-text,
        .shimmer-button {
          background: linear-gradient(
            90deg,
            #e5e7eb 0%,
            #f3f4f6 50%,
            #e5e7eb 100%
          );
          background-size: 1000px 100%;
          animation: shimmer 2s infinite;
        }
      `}} />
            </div>
        );
    };
    // *********************************
    console.log(prices, "pricesssssssssssssssssssssssssssssssssssssss", load);
    console.log(title_url, "title_urlsssssssssssssssssssssssssssssssssssss");
    return (
        <>
            <div className="section_hoitel_detail_content ">
                <div className="container">
                    <div className="price_card rounded-2xl ">
                        <div className="row">
                            <div className="col-lg-12">
                                {/* ********************** */}
                                {
                                    load ? <ShimmerPriceCard /> :
                                        <div className="hotel_price_detail">

                                            {
                                                (() => {
                                                    const filteredPrices = prices?.filter((item) => {
                                                        const title = item?.title?.toLowerCase() || '';
                                                        return title.includes('booking') || title.includes('expedia');
                                                    }) || [];
                                                    
                                                    // Get only one booking and one expedia item
                                                    const bookingItem = filteredPrices.find((item) => {
                                                        const title = item?.title?.toLowerCase() || '';
                                                        return title.includes('booking');
                                                    });
                                                    
                                                    const expediaItem = filteredPrices.find((item) => {
                                                        const title = item?.title?.toLowerCase() || '';
                                                        return title.includes('expedia');
                                                    });
                                                    // Function to create URL when missing based on hotel name and location
                                                    const createUrlForLocation = (providerName, hotelName) => {
                                                        if (!hotelName) return '';
                                                        
                                                        // Get search parameters from URL if available
                                                        const checkin = searchParams.get('checkin') || '';
                                                        const checkout = searchParams.get('checkout') || '';
                                                        const adults = searchParams.get('adults') || '2';
                                                        const rooms = searchParams.get('rooms') || '1';
                                                        
                                                        // Clean hotel name for URL
                                                        const cleanHotelName = hotelName
                                                            .toLowerCase()
                                                            .replace(/[^a-z0-9\s-]/g, '')
                                                            .replace(/\s+/g, '-')
                                                            .replace(/-+/g, '-')
                                                            .trim();
                                                        
                                                        const isBooking = providerName?.toLowerCase().includes('booking');
                                                        const isExpedia = providerName?.toLowerCase().includes('expedia');
                                                        
                                                        if (isBooking) {
                                                            // Booking.com search URL
                                                            let bookingUrl = 'https://www.booking.com/searchresults.en.html?';
                                                            
                                                            // Add hotel name as search query
                                                            bookingUrl += `ss=${encodeURIComponent(hotelName)}`;
                                                            
                                                            // Add dates if available
                                                            if (checkin) bookingUrl += `&checkin=${checkin}`;
                                                            if (checkout) bookingUrl += `&checkout=${checkout}`;
                                                            
                                                            // Add guests and rooms
                                                            bookingUrl += `&group_adults=${adults}`;
                                                            bookingUrl += `&no_rooms=${rooms}`;
                                                            
                                                            // Add affiliate ID
                                                            bookingUrl += `&aid=818288`;
                                                            
                                                            return bookingUrl;
                                                        } else if (isExpedia) {
                                                            // Expedia search URL
                                                            let expediaUrl = 'https://www.expedia.com/Hotel-Search?';
                                                            
                                                            // Add hotel name as search query
                                                            expediaUrl += `destination=${encodeURIComponent(hotelName)}`;
                                                            
                                                            // Add dates if available
                                                            if (checkin) expediaUrl += `&startDate=${checkin}`;
                                                            if (checkout) expediaUrl += `&endDate=${checkout}`;
                                                            
                                                            // Add guests and rooms
                                                            expediaUrl += `&adults=${adults}`;
                                                            expediaUrl += `&rooms=${rooms}`;
                                                            
                                                            // Add affiliate ID
                                                            expediaUrl += `&aid=818288`;
                                                            
                                                            return expediaUrl;
                                                        }
                                                        
                                                        return '';
                                                    };
                                                    
                                                    // Function to check if URL is a Google URL (should be avoided)
                                                    const isGoogleUrl = (url) => {
                                                        if (!url) return false;
                                                        const urlLower = url.toLowerCase();
                                                        return urlLower.includes('google.com') || 
                                                               urlLower.includes('googleadservices.com') || 
                                                               urlLower.includes('/aclk') ||
                                                               urlLower.includes('gclid=') ||
                                                               urlLower.includes('googleads');
                                                    };
                                                    
                                                    // Function to check if URL is from the respective website (Booking.com or Expedia)
                                                    const isDirectWebsiteUrl = (url, providerName) => {
                                                        if (!url) return false;
                                                        const urlLower = url.toLowerCase();
                                                        const providerLower = providerName?.toLowerCase() || '';
                                                        
                                                        if (providerLower.includes('booking')) {
                                                            return urlLower.includes('booking.com') && !isGoogleUrl(url);
                                                        } else if (providerLower.includes('expedia')) {
                                                            return (urlLower.includes('expedia.com') || urlLower.includes('expedia.co')) && !isGoogleUrl(url);
                                                        }
                                                        return false;
                                                    };
                                                    
                                                    // Function to replace aid parameter and remove Meta/GHA tracking
                                                    const replaceAidInUrl = (url) => {
                                                        if (!url) return '';
                                                        
                                                        // Skip Google URLs - don't process them
                                                        if (isGoogleUrl(url)) {
                                                            console.warn('Google URL detected, skipping:', url);
                                                            return '';
                                                        }
                                                        
                                                        // Ensure URL is absolute (starts with http:// or https://)
                                                        // If it's a relative URL, return as-is to avoid breaking redirects
                                                        if (!url.startsWith('http://') && !url.startsWith('https://')) {
                                                            console.warn('Relative URL detected, skipping modification:', url);
                                                            return '';
                                                        }
                                                        
                                                        // Use string manipulation to preserve URL structure (safer for redirect URLs)
                                                        let cleanUrl = url;
                                                        
                                                        // Remove existing aid parameters (handle both &aid= and ?aid=)
                                                        // Match aid= followed by any value until &, #, or end of string
                                                        cleanUrl = cleanUrl.replace(/[?&]aid=[^&?#]*/g, '');
                                                        
                                                        // Remove Meta/GHA tracking parameters
                                                        cleanUrl = cleanUrl.replace(/[?&]utm_source=[^&?#]*/gi, '');
                                                        cleanUrl = cleanUrl.replace(/[?&]utm_medium=[^&?#]*/gi, '');
                                                        cleanUrl = cleanUrl.replace(/[?&]utm_campaign=[^&?#]*/gi, '');
                                                        // Remove label parameter (especially metagha-link labels from Google Hotel Ads)
                                                        cleanUrl = cleanUrl.replace(/[?&]label=[^&?#]*/gi, '');
                                                        
                                                        // Clean up any double separators that might have been created
                                                        cleanUrl = cleanUrl.replace(/\?&/g, '?');
                                                        cleanUrl = cleanUrl.replace(/&&+/g, '&');
                                                        // Remove trailing & or ? if no params remain
                                                        cleanUrl = cleanUrl.replace(/[?&]$/, '');
                                                        
                                                        // Add your aid parameter
                                                        // Check if URL already has query parameters
                                                        const hasQuery = cleanUrl.includes('?');
                                                        const separator = hasQuery ? '&' : '?';
                                                        
                                                        // Make sure we don't add if it's already there (shouldn't happen, but safety check)
                                                        if (!cleanUrl.includes('aid=818288')) {
                                                            cleanUrl = `${cleanUrl}${separator}aid=818288`;
                                                        }
                                                        
                                                        return cleanUrl;
                                                    };
                                                    
                                                    // Combine and filter out undefined values
                                                    const uniqueItems = [bookingItem, expediaItem].filter(Boolean);
                                                    
                                                    return uniqueItems.map((item, i) => {
                                                        // Get or create URL
                                                        let finalUrl = '';
                                                        
                                                        // Check if URL exists and is NOT a Google URL
                                                        if (item?.url && !isGoogleUrl(item?.url)) {
                                                            // Check if it's a direct website URL (Booking.com or Expedia)
                                                            if (isDirectWebsiteUrl(item?.url, item?.title)) {
                                                                // If URL is from the respective website, clean it and add affiliate ID
                                                                finalUrl = replaceAidInUrl(item?.url);
                                                                // Debug logging
                                                                console.log('Original URL (direct website):', item.url);
                                                                console.log('Modified URL:', finalUrl);
                                                            } else {
                                                                // If URL exists but is not from the direct website, create a new one
                                                                finalUrl = createUrlForLocation(item?.title, title_url);
                                                                console.log('URL not from direct website, created URL:', finalUrl);
                                                            }
                                                        } else {
                                                            // If URL is missing or is a Google URL, create one based on hotel name and location
                                                            if (item?.url && isGoogleUrl(item?.url)) {
                                                                console.log('Google URL detected, creating direct URL instead:', item.url);
                                                            } else {
                                                                console.log('URL missing, creating URL');
                                                            }
                                                            finalUrl = createUrlForLocation(item?.title, title_url);
                                                            console.log('Created URL:', finalUrl);
                                                        }
                                                        
                                                        return (
                                                            <div className="hotel_price_card flex items-center justify-between  border-t-1 border-gray-300" key={i}>
                                                                <table className='table m-0'>
                                                                    <tbody>
                                                                        <tr className=' border-none '>
                                                                            <td className='border-0 text-left align-middle'>
                                                                                <div className="booking_icon flex items-center">
                                                                                <img src={getAssetPath((item?.title?.toLowerCase() || '').includes('expedia') ? "/logo/hoteldetail/expedia_logo.svg" : "/logo/hoteldetail/Booking_Com.png")} alt={`${item?.title} booking logo - Compare hotel prices`} />

                                                                                {/* <h6 className='m-0'>{item?.title}</h6> */}
                                                                                </div>
                                                                            </td>

                                                                            <td className='border-0 text-center align-middle'>
                                                                                {/* ************************* */}
                                                                                {/* <div className="bookign_price"> */}
                                                                                <h6 className='m-0'>
                                                                                    ${item?.price}
                                                                                </h6>
                                                                                {/* </div> */}
                                                                                {/* ********************** */}
                                                                            </td>

                                                                            <td className='border-0 text-right align-middle'>
                                                                                {/* <div className="hotel_viewdetail"> */}
                                                                                <a href={finalUrl || '#'} target='_blank' rel="noopener noreferrer" className='button_bg bg-color-green color_bl'>
                                                                                    View Details
                                                                                </a>
                                                                                {/* </div> */}
                                                                            </td>

                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                                {/* ********************* */}

                                                                {/* ********************* */}
                                                            </div>
                                                        )
                                                    });
                                                })()
                                            }
                                        </div>
                                }
                                {/* ************************ */}
                            </div>
                            {/* ****************************************** */}
                        </div>
                    </div>
                </div>

            </div >



        </>
    )
}
