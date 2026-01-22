import React, { useState, useEffect } from 'react'
import { RiCheckboxCircleLine } from 'react-icons/ri'

export default function ViewPriceDetail({ PriceRate, hotelName, hotelAddress, hotelData, onSearchDates, isLoadingPrices, initialCheckin, initialCheckout }) {
    const hotelPrice = PriceRate?.data?.raw?.result?.rates;
    const allRatesData = PriceRate?.data?.raw?.result; // This might have deep links

    // Initialize dates: check-in is today, check-out is 7 days later (or use parent's initial dates)
    const getTodayDate = () => {
        const today = new Date();
        return today.toISOString().split('T')[0];
    };
    
    const getSevenDaysLater = () => {
        const sevenDays = new Date();
        sevenDays.setDate(sevenDays.getDate() + 1);
        return sevenDays.toISOString().split('T')[0];
    };

    const [checkinDate, setCheckinDate] = useState(initialCheckin || getTodayDate());
    const [checkoutDate, setCheckoutDate] = useState(initialCheckout || getSevenDaysLater());
    const [lastUpdated, setLastUpdated] = useState(new Date());
    
    // Sync with parent's dates when they change
    useEffect(() => {
        if (initialCheckin) setCheckinDate(initialCheckin);
        if (initialCheckout) setCheckoutDate(initialCheckout);
    }, [initialCheckin, initialCheckout]);
    
    // Update timestamp when price data changes
    useEffect(() => {
        if (!isLoadingPrices && hotelPrice) {
            setLastUpdated(new Date());
        }
    }, [hotelPrice, isLoadingPrices]);

    // Update checkout if checkin is changed to be after checkout
    useEffect(() => {
        if (checkinDate >= checkoutDate) {
            const newCheckout = new Date(checkinDate);
            newCheckout.setDate(newCheckout.getDate() + 1);
            setCheckoutDate(newCheckout.toISOString().split('T')[0]);
        }
    }, [checkinDate, checkoutDate]);

    // Create a unique key based on dates and price data to force re-render
    const priceDataKey = `${checkinDate}-${checkoutDate}-${hotelPrice?.length || 0}-${JSON.stringify(hotelPrice?.map(p => p.rate))}`;
    
    const bookingImg = [
        {
            name: "Booking.com",
            img: "/justbuytravel_next/demo/logo/hoteldetail/Booking_com.png",
            affiliateBase: "https://tp.media/r?marker=620562&trs=404603&p=2076&campaign_id=84"
        },
        {
            name: "expedia.com/",
            img: "/justbuytravel_next/demo/logo/hoteldetail/expedia_logo.svg",
            affiliateBase: "https://tp.media/r?marker=620562&trs=404603&p=8645&campaign_id=594"
        },
        {
            name: "traveloka.com/",
            img: "/justbuytravel_next/demo/logo/hoteldetail/travelok.svg",
            affiliateBase: ""
        },
        {
            name: "Trip.com",
            img: "/justbuytravel_next/demo/logo/hoteldetail/tripcom.webp",
            affiliateBase: "https://tp.media/r?marker=620562&trs=404603&p=8626&campaign_id=121"
        },
    ]
    
    // Helper function to construct booking site URLs
    const constructBookingUrl = (siteName, hotelName, hotelData, priceRateItem, checkin, checkout) => {
        if (!hotelName) return null;
        
        // PRIORITY 1: Check the current rate item itself for deep links
        if (priceRateItem?.deep_link || priceRateItem?.url || priceRateItem?.link || priceRateItem?.booking_url) {
            const deepLink = priceRateItem.deep_link || priceRateItem.url || priceRateItem.link || priceRateItem.booking_url;
            return deepLink;
        }
        
        // PRIORITY 2: Check if hotelData.xotelo has specific URLs for each site
        if (hotelData?.xotelo?.rates) {
            const siteData = hotelData.xotelo.rates.find(r => r.name === siteName);
            if (siteData?.deep_link || siteData?.url || siteData?.link) {
                const deepLink = siteData.deep_link || siteData.url || siteData.link;
                return deepLink;
            }
        }
        
        // PRIORITY 3: Check allRatesData for deep links
        if (allRatesData?.rates) {
            const rateData = allRatesData.rates.find(r => r.name === siteName);
            if (rateData?.deep_link || rateData?.url || rateData?.link) {
                const deepLink = rateData.deep_link || rateData.url || rateData.link;
                return deepLink;
            }
        }
        
        // FALLBACK: construct search URLs for each booking site using selected dates
        const encodedHotel = encodeURIComponent(hotelName);
        
        switch(siteName) {
            case "Booking.com":
                return `https://www.booking.com/searchresults.html?ss=${encodedHotel}&checkin=${checkin}&checkout=${checkout}`;
            case "expedia.com/":
                return `https://www.expedia.com/Hotel-Search?destination=${encodedHotel}&startDate=${checkin}&endDate=${checkout}`;
            case "Trip.com":
                // Trip.com uses a specific format with searchWord and destName
                return `https://www.trip.com/hotels/list?searchWord=${encodedHotel}&destName=${encodedHotel}&searchType=H&checkin=${checkin}&checkout=${checkout}&crn=1&adult=2&curr=USD&locale=en-US`;
            default:
                return null;
        }
    }
    
    // Helper function to build affiliate link with specific hotel URL
    const buildAffiliateLink = (affiliateBase, hotelUrl) => {
        if (!hotelUrl) {
            return null;
        }
        if (!affiliateBase) {
            return hotelUrl;
        }
        const finalLink = `${affiliateBase}&u=${encodeURIComponent(hotelUrl)}`;
        return finalLink;
    }
    return (
        <>
            <section className='padding_bottom'>
                <div className="container">
                    <div className="row matrix_fix">
                        <div className="col-lg-12">
                            <div className="content_box_detail view_price_detial_content rounded-2xl border border-gray-300 bg_grey2">
                                <div className="view_price_title">
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
                                        <h4 style={{ margin: 0 }}>View prices for your travel dates</h4>
                                        {!isLoadingPrices && hotelPrice && hotelPrice.length > 0 && (
                                            <small style={{ 
                                                fontSize: '12px', 
                                                color: '#888',
                                                fontStyle: 'italic'
                                            }}>
                                                Last updated: {lastUpdated.toLocaleTimeString()}
                                            </small>
                                        )}
                                    </div>
                                    {!isLoadingPrices && hotelPrice && hotelPrice.length > 0 && (
                                        <p style={{ 
                                            fontSize: '14px', 
                                            color: '#666', 
                                            marginTop: '8px',
                                            marginBottom: '0',
                                            fontWeight: 'normal'
                                        }}>
                                            📅 {new Date(checkinDate).toLocaleDateString()} → {new Date(checkoutDate).toLocaleDateString()} 
                                            ({Math.ceil((new Date(checkoutDate) - new Date(checkinDate)) / (1000 * 60 * 60 * 24))} nights)
                                        </p>
                                    )}
                                </div>

                                {/* Date Picker Section */}
                                <div className="date_picker_section" style={{ 
                                    padding: '20px', 
                                    marginBottom: '20px',
                                    backgroundColor: '#f8f9fa',
                                    borderRadius: '8px'
                                }}>
                                    <div className="row">
                                        <div className="col-lg-5 col-md-5 mb-3 mb-lg-0">
                                            <label htmlFor="checkin" style={{ 
                                                display: 'block', 
                                                marginBottom: '8px',
                                                fontWeight: '600',
                                                fontSize: '14px',
                                                color: '#333'
                                            }}>
                                                Check-in Date
                                            </label>
                                            <input
                                                type="date"
                                                id="checkin"
                                                className="form-control"
                                                value={checkinDate}
                                                onChange={(e) => setCheckinDate(e.target.value)}
                                                min={getTodayDate()}
                                                style={{
                                                    padding: '10px',
                                                    fontSize: '16px',
                                                    border: '2px solid #ddd',
                                                    borderRadius: '6px'
                                                }}
                                            />
                                        </div>
                                        <div className="col-lg-5 col-md-5 mb-3 mb-lg-0">
                                            <label htmlFor="checkout" style={{ 
                                                display: 'block', 
                                                marginBottom: '8px',
                                                fontWeight: '600',
                                                fontSize: '14px',
                                                color: '#333'
                                            }}>
                                                Check-out Date
                                            </label>
                                            <input
                                                type="date"
                                                id="checkout"
                                                className="form-control"
                                                value={checkoutDate}
                                                onChange={(e) => setCheckoutDate(e.target.value)}
                                                min={checkinDate}
                                                style={{
                                                    padding: '10px',
                                                    fontSize: '16px',
                                                    border: '2px solid #ddd',
                                                    borderRadius: '6px'
                                                }}
                                            />
                                        </div>
                                        <div className="col-lg-2 col-md-2">
                                            <div style={{
                                                padding: '10px 0',
                                                fontSize: '14px',
                                                color: '#666',
                                                marginBottom: '8px'
                                            }}>
                                                {(() => {
                                                    const checkin = new Date(checkinDate);
                                                    const checkout = new Date(checkoutDate);
                                                    const nights = Math.ceil((checkout - checkin) / (1000 * 60 * 60 * 24));
                                                    return `${nights} night${nights !== 1 ? 's' : ''}`;
                                                })()}
                                            </div>
                                            <button
                                                onClick={() => onSearchDates && onSearchDates(checkinDate, checkoutDate)}
                                                className="hotel_detail_button text-white"
                                                disabled={isLoadingPrices}
                                                style={{
                                                    width: '100%',
                                                    padding: '10px 15px',
                                                    fontSize: '14px',
                                                    fontWeight: '600',
                                                    border: 'none',
                                                    cursor: isLoadingPrices ? 'not-allowed' : 'pointer',
                                                    opacity: isLoadingPrices ? 0.6 : 1
                                                }}
                                            >
                                                {isLoadingPrices ? 'Searching...' : 'Search Prices'}
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Loading State */}
                                {isLoadingPrices && (
                                    <div style={{
                                        padding: '40px 20px',
                                        textAlign: 'center',
                                        backgroundColor: '#f8f9fa',
                                        borderRadius: '8px',
                                        marginBottom: '20px'
                                    }}>
                                        <div style={{
                                            display: 'inline-block',
                                            width: '40px',
                                            height: '40px',
                                            border: '4px solid #f3f3f3',
                                            borderTop: '4px solid #3498db',
                                            borderRadius: '50%',
                                            animation: 'spin 1s linear infinite'
                                        }}></div>
                                        <p style={{ marginTop: '15px', color: '#666', fontSize: '16px' }}>
                                            Fetching prices for your selected dates...
                                        </p>
                                        <style dangerouslySetInnerHTML={{
                                            __html: `
                                                @keyframes spin {
                                                    0% { transform: rotate(0deg); }
                                                    100% { transform: rotate(360deg); }
                                                }
                                            `
                                        }} />
                                    </div>
                                )}

                                {!isLoadingPrices && hotelPrice
                                    ?.filter(item => bookingImg.some(img => img.name === item.name)) // Only matched hotels
                                    .map((item, i) => {
                                        // Get the matched image
                                        const matchedImg = bookingImg.find(img => img.name === item.name);
                                        const hotelUrl = constructBookingUrl(item.name, hotelName, hotelData, item, checkinDate, checkoutDate);
                                        const finalLink = buildAffiliateLink(matchedImg?.affiliateBase, hotelUrl);
                                        
                                        // Calculate pricing breakdown
                                        const nights = Math.ceil((new Date(checkoutDate) - new Date(checkinDate)) / (1000 * 60 * 60 * 24));
                                        const ratePerNight = Number(item.rate);
                                        const totalBeforeTax = ratePerNight * nights;
                                        const tax = Number(item.tax || 0);
                                        const grandTotal = totalBeforeTax + tax;
                                        
                                        if(matchedImg){

                                        return (
                                            <div className="view_price_box" key={`${item.name}-${item.rate}-${priceDataKey}`}>
                                                <div className="price_box">
                                                    <div className="row items-center">

                                                        {/* Logo column */}
                                                        <div className="col-lg-4">
                                                            <div className="price_box_item">
                                                                <div className="icon text-center flex">
                                                                    <img
                                                                        src={matchedImg.img}
                                                                        alt={item.name}
                                                                        width={120}
                                                                        height={120}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {/* Price column */}
                                                        <div className="col-lg-4">
                                                            <div className="price_box_price flex justify-center flex-column" style={{ position: 'relative', cursor: 'help' }}>
                                                                {(() => {
                                                                    const nights = Math.ceil((new Date(checkoutDate) - new Date(checkinDate)) / (1000 * 60 * 60 * 24));
                                                                    const ratePerNight = Number(item.rate);
                                                                    const totalBeforeTax = ratePerNight * nights;
                                                                    const tax = Number(item.tax || 0);
                                                                    const grandTotal = totalBeforeTax + tax;
                                                                    
                                                                    return (
                                                                        <>
                                                                            <div 
                                                                                style={{ textAlign: 'center' }}
                                                                                title={`Breakdown:\n${ratePerNight.toFixed(2)} per night × ${nights} nights = ${totalBeforeTax.toFixed(2)}\n+ Tax: ${tax.toFixed(2)}\n= Total: ${grandTotal.toFixed(2)}`}
                                                                            >
                                                                                <h4 style={{ margin: 0, fontWeight: 'bold', color: '#2c3e50' }}>
                                                                                    ${grandTotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                                                                </h4>
                                                                                <small style={{ 
                                                                                    fontSize: '11px', 
                                                                                    color: '#888', 
                                                                                    marginTop: '4px',
                                                                                    display: 'block'
                                                                                }}>
                                                                                    ${ratePerNight.toFixed(2)} × {nights} night{nights !== 1 ? 's' : ''}
                                                                                </small>
                                                                                {tax > 0 && (
                                                                                    <small style={{ 
                                                                                        fontSize: '10px', 
                                                                                        color: '#999', 
                                                                                        marginTop: '2px',
                                                                                        display: 'block'
                                                                                    }}>
                                                                                        + ${tax.toFixed(2)} tax
                                                                                    </small>
                                                                                )}
                                                                            </div>
                                                                        </>
                                                                    );
                                                                })()}
                                                            </div>
                                                        </div>

                                                        {/* Button column */}
                                                        <div className="col-lg-4">
                                                            <div className="price_box_button price_view_detail flex justify-end">
                                                                {finalLink ? (
                                                                    <a 
                                                                        href={finalLink}
                                                                        target="_blank" 
                                                                        rel="noopener noreferrer"
                                                                        className="hotel_detail_button text-white"
                                                                        style={{ textDecoration: 'none', display: 'inline-block' }}
                                                                    >
                                                                        view details
                                                                    </a>
                                                                ) : (
                                                                    <button 
                                                                        className="hotel_detail_button text-white"
                                                                    >
                                                                        view details
                                                                    </button>
                                                                )}
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    }else{
                                        return <div className="view_price_box" key={i}>
                                        <div className="price_box">
                                            <div className="row items-center">

                                                {/* Logo column */}
                                                <div className="col-lg-4">
                                                    <div className="price_box_item">
                                                        <div className="icon text-center flex">
                                                            <span className="text-muted">{item.name}</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Price column */}
                                                <div className="col-lg-4">
                                                    <div className="price_box_price flex justify-center">
                                                        <h4>Price Not Available</h4>
                                                    </div>
                                                </div>

                                                {/* Button column */}
                                                <div className="col-lg-4">
                                                    <div className="price_box_button price_view_detail flex justify-end">
                                                        <button className="hotel_detail_button text-white" disabled>
                                                            view details
                                                        </button>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                    }
                                    })}

                                {/* No Prices Available Message */}
                                {!isLoadingPrices && (!hotelPrice || hotelPrice.length === 0) && (
                                    <div style={{
                                        padding: '40px 20px',
                                        textAlign: 'center',
                                        backgroundColor: '#fff3cd',
                                        borderRadius: '8px',
                                        marginBottom: '20px',
                                        border: '1px solid #ffc107'
                                    }}>
                                        <p style={{ margin: 0, color: '#856404', fontSize: '16px' }}>
                                            ⚠️ No pricing data available for the selected dates.
                                        </p>
                                        <p style={{ margin: '10px 0 0 0', color: '#856404', fontSize: '14px' }}>
                                            Try selecting different check-in and check-out dates.
                                        </p>
                                    </div>
                                )}

                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
