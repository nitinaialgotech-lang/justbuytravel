import React, { useState, useEffect } from 'react'
import { RiCheckboxCircleLine } from 'react-icons/ri'

export default function ViewPriceDetail({ PriceRate, hotelName, hotelAddress, hotelData, onSearchDates, isLoadingPrices, initialCheckin, initialCheckout, showPricing = true }) {
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

        switch (siteName) {
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
    if (!showPricing) {
        return null;
    }

    return (
        <>
            <section className='padding_bottom'>
                <div className="container">
                    <div className="row matrix_fix">
                        <div className="col-lg-12">
                            <div className="content_box_detail view_price_detial_content rounded-2xl border border-gray-300 bg_grey2">
                                <div className="view_price_title">
                                    <div className="view-price-title-row">
                                        <h4 className="view-price-title">View prices for your travel dates</h4>
                                        {/* {!isLoadingPrices && hotelPrice && hotelPrice.length > 0 && (
                                            <small>Last updated: {lastUpdated.toLocaleTimeString()}</small>
                                        )} */}
                                    </div>
                                    {/* {!isLoadingPrices && hotelPrice && hotelPrice.length > 0 && (
                                        <p>
                                            📅 {new Date(checkinDate).toLocaleDateString()} → {new Date(checkoutDate).toLocaleDateString()}
                                            ({Math.ceil((new Date(checkoutDate) - new Date(checkinDate)) / (1000 * 60 * 60 * 24))} nights)
                                        </p>
                                    )} */}
                                </div>

                                {/* Date Picker Section */}
                                <div className="date_picker_section view-price-date-section">
                                    <div className="row">
                                        <div className="col-lg-5 col-md-5 mb-3 mb-lg-0">
                                            <label htmlFor="checkin" className="view-price-label">
                                                Check-in Date
                                            </label>
                                            <input
                                                type="date"
                                                id="checkin"
                                                className="form-control view-price-input"
                                                value={checkinDate}
                                                onChange={(e) => setCheckinDate(e.target.value)}
                                                min={getTodayDate()}
                                            />
                                        </div>
                                        <div className="col-lg-5 col-md-5 mb-3 mb-lg-0">
                                            <label htmlFor="checkout" className="view-price-label">
                                                Check-out Date
                                            </label>
                                            <input
                                                type="date"
                                                id="checkout"
                                                className="form-control view-price-input"
                                                value={checkoutDate}
                                                onChange={(e) => setCheckoutDate(e.target.value)}
                                                min={checkinDate}
                                            />
                                        </div>
                                        <div className="col-lg-2 col-md-2">
                                            {/* <div>
                                                {(() => {
                                                    const checkin = new Date(checkinDate);
                                                    const checkout = new Date(checkoutDate);
                                                    const nights = Math.ceil((checkout - checkin) / (1000 * 60 * 60 * 24));
                                                    return `${nights} night${nights !== 1 ? 's' : ''}`;
                                                })()}
                                            </div> */}
                                            <button
                                                onClick={() => onSearchDates && onSearchDates(checkinDate, checkoutDate)}
                                                className="hotel_detail_button hotel_mobile_button text-white view-price-search-button"
                                                disabled={isLoadingPrices}
                                            >
                                                {isLoadingPrices ? 'Searching...' : 'Search Prices'}
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Loading State */}
                                {isLoadingPrices && (
                                    <div className="view-price-loading">
                                        <div className="view-price-spinner"></div>
                                        <p className="view-price-loading-text">
                                            Fetching prices for your selected dates...
                                        </p>
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

                                        if (matchedImg) {

                                            return (
                                                <React.Fragment key={`${item.name}-${item.rate}-${priceDataKey}`}>
                                                    <div className="view_price_box d-none d-lg-block">
                                                        <div className="price_box">
                                                            <div className="row items-center">

                                                                {/* Logo column */}
                                                                <div className="col-lg-3">
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
                                                                {/* **************** */}
                                                                <div className="col-lg-3">
                                                                    <div className="text_detail">
                                                                        <div className="info flex justify-center">
                                                                            <div className="info_item">
                                                                                <small className="view-price-rate-note">
                                                                                    ${ratePerNight.toFixed(2)} / {nights} night{nights !== 1 ? 's' : ''}
                                                                                </small>
                                                                                {tax > 0 && (
                                                                                    <small className="view-price-tax-note">
                                                                                        + ${tax.toFixed(2)} tax
                                                                                    </small>
                                                                                )}
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                </div>

                                                                {/* Price column */}
                                                                <div className="col-lg-3">
                                                                <div className="price_box_price flex justify-center flex-column view-price-box-price">
                                                                        {(() => {
                                                                            const nights = Math.ceil((new Date(checkoutDate) - new Date(checkinDate)) / (1000 * 60 * 60 * 24));
                                                                            const ratePerNight = Number(item.rate);
                                                                            const totalBeforeTax = ratePerNight * nights;
                                                                            const tax = Number(item.tax || 0);
                                                                            const grandTotal = totalBeforeTax + tax;

                                                                            return (
                                                                                <>
                                                                                    <div
                                                                                        className="view-price-total-wrap"
                                                                                        title={`Breakdown:\n${ratePerNight.toFixed(2)} per night × ${nights} nights = ${totalBeforeTax.toFixed(2)}\n+ Tax: ${tax.toFixed(2)}\n= Total: ${grandTotal.toFixed(2)}`}
                                                                                    >
                                                                                        <h4 className="view-price-total-amount">
                                                                                            ${grandTotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                                                                        </h4>

                                                                                    </div>
                                                                                </>
                                                                            );
                                                                        })()}
                                                                    </div>
                                                                </div>

                                                                {/* Button column */}
                                                                <div className="col-lg-3">
                                                                    <div className="price_box_button price_view_detail flex justify-end">
                                                                        {finalLink ? (
                                                                            <a
                                                                                href={finalLink}
                                                                                target="_blank"
                                                                                rel="noopener noreferrer"
                                                                                className="hotel_detail_button text-white view-price-link"
                                                                            >
                                                                                view deals
                                                                            </a>
                                                                        ) : (
                                                                            <button
                                                                                className="hotel_detail_button text-white"
                                                                            >
                                                                                view deals
                                                                            </button>
                                                                        )}
                                                                    </div>
                                                                </div>

                                                            </div>
                                                        </div>
                                                    </div>


                                                    {/* /*********************************************** mobile view show price detraik */}

                                                    <div className="view_price_box d-block d-lg-none">
                                                        <div className="price_box">
                                                            <div className="detail flex justify-between items-center">
                                                                <div className="icon flex flex-col gap-0 ">
                                                                    <img
                                                                        src={matchedImg.img}
                                                                        alt={item.name}
                                                                        width={100}
                                                                        height={100}
                                                                    />
                                                                    <div className="info_item">
                                                                        <small className="view-price-rate-note-sm">
                                                                            ${ratePerNight.toFixed(2)} / {nights} night{nights !== 1 ? 's' : ''}
                                                                        </small>
                                                                        {tax > 0 && (
                                                                            <small className="view-price-tax-note-sm">
                                                                                + ${tax.toFixed(2)} tax
                                                                            </small>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                                {/* *************************** */}
                                                                <div className="side_price_detail">
                                                                    <div className="side_detail">
                                                                        {/* ***** */}
                                                                        <div className="price_box_price mobile_price_box flex justify-center flex-column m-0 view-price-box-price">
                                                                            {(() => {
                                                                                const nights = Math.ceil((new Date(checkoutDate) - new Date(checkinDate)) / (1000 * 60 * 60 * 24));
                                                                                const ratePerNight = Number(item.rate);
                                                                                const totalBeforeTax = ratePerNight * nights;
                                                                                const tax = Number(item.tax || 0);
                                                                                const grandTotal = totalBeforeTax + tax;

                                                                                return (
                                                                                    <>
                                                                                        <div
                                                                                            className="view-price-total-wrap"
                                                                                            title={`Breakdown:\n${ratePerNight.toFixed(2)} per night × ${nights} nights = ${totalBeforeTax.toFixed(2)}\n+ Tax: ${tax.toFixed(2)}\n= Total: ${grandTotal.toFixed(2)}`}
                                                                                        >
                                                                                            <h4 className="view-price-total-amount m-0">
                                                                                                ${grandTotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                                                                            </h4>

                                                                                        </div>
                                                                                    </>
                                                                                );
                                                                            })()}
                                                                        </div>
                                                                        {/* ****** */}
                                                                        <div className="price_box_button price_view_detail mobile_price_detail flex justify-end">
                                                                            {finalLink ? (
                                                                                <a
                                                                                    href={finalLink}
                                                                                    target="_blank"
                                                                                    rel="noopener noreferrer"
                                                                                    className="hotel_detail_button text-white view-price-link"
                                                                                >
                                                                                    view deals
                                                                                </a>
                                                                            ) : (
                                                                                <button
                                                                                    className="hotel_detail_button text-white"
                                                                                >
                                                                                    view deals
                                                                                </button>
                                                                            )}
                                                                        </div>

                                                                    </div>

                                                                </div>
                                                                {/* ********* */}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </React.Fragment>
                                            );
                                        } else {
                                            return <div className="view_price_box" key={`price-fallback-${i}`}>
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
                                    <div className="view-price-no-data">
                                        <p className="view-price-no-data-title">
                                            ⚠️ No pricing data available for the selected dates.
                                        </p>
                                        <p className="view-price-no-data-sub">
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
