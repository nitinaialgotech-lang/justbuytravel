"use client";
import React, { useEffect, useState } from "react";
import "../../style/searchresult.css";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { SearchLocation } from "@/app/Route/endpoints";
import ReactPaginate from "react-paginate";


import { useRouter } from "next/navigation";
export default function SearchContentBox() {
    // ********************************

    const searchQuery = useSearchParams();
    const LIMIT = 20;

    const [page, setPage] = useState(1);
    const [hotels, setHotels] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [imageErrors, setImageErrors] = useState({});
    const search = searchQuery.get("query");

    const { data, isFetching } = useQuery({
        queryKey: ["hotels", search, page],
        queryFn: async () => {
            // Currently the API only accepts location; page/LIMIT can be added when backend supports it
            if (!search || !search.trim()) {
                throw new Error("Search query is required");
            }
            return await SearchLocation(search);
        },
        keepPreviousData: true,
        enabled: !!search && !!search.trim(), // Only run if search exists and is not empty
    });

    const handleLoadMore = () => {
        if (hasMore && !isFetching) {
            setPage(prev => prev + 1); // increments page
        }
    };

    useEffect(() => {
        setPage(1);       // reset page
        setHotels([]);    // clear previous hotels
        setHasMore(true); // reset hasMore
    }, [search]);
    // Helper function to filter hotels by location/country
    const filterHotelsByLocation = (hotels, searchTerm) => {
        if (!hotels || !Array.isArray(hotels)) return hotels;
        
        const lowerSearch = searchTerm.toLowerCase().trim();
        
        // Map of city names to their expected country
        const cityCountryMap = {
            'delhi': 'india',
            'new delhi': 'india',
            'mumbai': 'india',
            'bangalore': 'india',
            'kolkata': 'india',
            'chennai': 'india',
            'hyderabad': 'india',
            'pune': 'india',
            'ahmedabad': 'india',
            'jaipur': 'india',
            'lucknow': 'india',
            'kanpur': 'india',
            'nagpur': 'india',
            'indore': 'india',
            'thane': 'india',
            'bhopal': 'india',
            'visakhapatnam': 'india',
            'patna': 'india',
            'vadodara': 'india',
            'ghaziabad': 'india',
            'ludhiana': 'india',
            'agra': 'india',
            'nashik': 'india',
            'faridabad': 'india',
            'meerut': 'india',
            'rajkot': 'india',
            'varanasi': 'india',
            'srinagar': 'india',
            'amritsar': 'india',
            'chandigarh': 'india',
            'gurgaon': 'india',
            'noida': 'india',
        };
        
        const expectedCountry = cityCountryMap[lowerSearch];
        
        // If we know the expected country, filter results
        if (expectedCountry) {
            return hotels.filter(hotel => {
                // Check various location fields that might contain country info
                const locationStr = JSON.stringify(hotel).toLowerCase();
                const nameStr = (hotel?.name || '').toLowerCase();
                const addressStr = (hotel?.address || hotel?.location || hotel?.city || '').toLowerCase();
                
                // Check if the hotel data contains the expected country
                const hasExpectedCountry = 
                    locationStr.includes(expectedCountry) ||
                    nameStr.includes(expectedCountry) ||
                    addressStr.includes(expectedCountry);
                
                // Also check if it contains USA (and exclude those)
                const hasUSA = 
                    locationStr.includes('usa') ||
                    locationStr.includes('united states') ||
                    locationStr.includes('america') ||
                    nameStr.includes('usa') ||
                    addressStr.includes('usa');
                
                // If we found USA markers and no India markers, exclude it
                if (hasUSA && !hasExpectedCountry) {
                    return false;
                }
                
                // If we have expected country markers, include it
                if (hasExpectedCountry) {
                    return true;
                }
                
                // For ambiguous cases, include if it doesn't clearly have USA
                return !hasUSA;
            });
        }
        
        return hotels;
    };

    useEffect(() => {
        if (data?.hotels) {
            let newHotels = data.hotels;
            
            // Filter hotels to match the intended location
            if (search) {
                newHotels = filterHotelsByLocation(newHotels, search);
            }

            if (page === 1) {
                // New search → replace hotels
                setHotels(newHotels);
            } else {
                // Load more → append hotels
                setHotels(prev => [...prev, ...newHotels]);
            }

            // Check if API returned less than the limit
            setHasMore(newHotels.length === LIMIT);
        } else {
            if (page === 1) setHotels([]);
            setHasMore(false);
        }
    }, [data, page, search]);
    console.log(hotels, "detailsnow")
    // const params = new URLSearchParams({
    //           location: searchParams.location || "hotels",
    //           adults: searchParams.adults || "2"
    //         });
    // ****************************** view detail 
    const router = useRouter();
    // const searchParams = useSearchParams();
    // const search = searchParams.get("query") || ""
    const viewDetail = (id, item) => {
        // Store amenities and images_full in sessionStorage to pass to detail page
        if (item) {
            const dataToPass = {
                amenities: item?.amenities || [],
                images_full: item?.images_full || []
            };
            sessionStorage.setItem(`hotel_${id}`, JSON.stringify(dataToPass));
        }
        router.push(`/hoteldetail?property_token=${id}`)
    }



    const handleImageError = (itemId, item, e) => {
        const currentSrc = e.target.src;
        
        // If we tried image_proxy and it failed, try the original image
        if (currentSrc === item?.image_proxy && item?.image) {
            e.target.src = item.image;
            return;
        }
        
        // If both failed, show placeholder
        setImageErrors(prev => ({ ...prev, [itemId]: true }));
        e.target.src = 'https://via.placeholder.com/400x300/f3f4f6/9ca3af?text=Image+Not+Available';
        e.target.onerror = null; // Prevent infinite loop
    };



    return (
        <>
            <div className="list-grid-product-wrap">
                <div id="sidebar_filter_hotel" className="row gy-md-5 gy-4">
                    {/* ***************************************************** */}
                    {hotels?.map((item, i) => {
                        const itemId = item?.property_token || item?.property_id || i;
                        const imageUrl = imageErrors[itemId]
                            ? "https://via.placeholder.com/400x300/f3f4f6/9ca3af?text=Image+Not+Available"
                            : (item?.image_proxy || item?.image || "https://via.placeholder.com/400x300/f3f4f6/9ca3af?text=Image+Not+Available");
                        return (
                            <>
                                <div
                                    className="col-md-4 item wow animate fadeInDown"
                                    data-wow-delay="200ms"
                                    data-wow-duration="1500ms"
                                    key={i}
                                >
                                    <div className="hotel-card">
                                        <div className="hotel-img-wrap">
                                            <a
                                                href="#"
                                                className="hotel-img"
                                            >
                                                <img
                                                    src={imageUrl}
                                                    className='rounded-3xl w-full h-full object-cover'
                                                    alt={item?.name || 'Hotel image'}
                                                    onError={(e) => handleImageError(itemId, item, e)}
                                                    onLoad={() => {
                                                        // Remove error state if image loads successfully
                                                        if (imageErrors[itemId]) {
                                                            setImageErrors(prev => {
                                                                const newErrors = { ...prev };
                                                                delete newErrors[itemId];
                                                                return newErrors;
                                                            });
                                                        }
                                                    }}
                                                    loading="lazy"
                                                />
                                            </a>
                                            <div className="batch">
                                                <span>Sale on!</span>
                                            </div>
                                        </div>
                                        <div className="hotel-content">
                                            <div className="rating-area">
                                                <div className="rating-text">
                                                    <div className="rating-stars">
                                                        <ul>
                                                            <li>☆</li>
                                                            <li>☆</li>
                                                            <li>☆</li>
                                                            <li>☆</li>
                                                            <li>☆</li>{" "}
                                                        </ul>
                                                    </div>
                                                    <span className="total">{item?.reviews} reviews</span>
                                                </div>
                                            </div>
                                            <h5>
                                                <a href="#">
                                                    {item?.name}
                                                </a>
                                            </h5>
                                            
                                            <ul className="hotel-feature-list">
                                                <li>
                                                    <svg
                                                        width="14"
                                                        height="14"
                                                        viewBox="0 0 14 14"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <rect
                                                            x="0.5"
                                                            y="0.5"
                                                            width="13"
                                                            height="13"
                                                            rx="6.5"
                                                        ></rect>
                                                        <path d="M10.6947 5.45777L6.24644 9.90841C6.17556 9.97689 6.08572 10.0124 5.99596 10.0124C5.9494 10.0125 5.90328 10.0033 5.86027 9.98548C5.81727 9.96763 5.77822 9.94144 5.7454 9.90841L3.3038 7.46681C3.16436 7.32969 3.16436 7.10521 3.3038 6.96577L4.16652 6.10065C4.29892 5.96833 4.53524 5.96833 4.66764 6.10065L5.99596 7.42897L9.33092 4.09161C9.36377 4.05868 9.40278 4.03255 9.44573 4.01471C9.48868 3.99686 9.53473 3.98766 9.58124 3.98761C9.67572 3.98761 9.76556 4.02545 9.83172 4.09161L10.6944 4.95681C10.8341 5.09625 10.8341 5.32073 10.6947 5.45777Z"></path>
                                                    </svg>
                                                    Free Wi-Fi
                                                </li>
                                                <li>
                                                    <svg
                                                        width="14"
                                                        height="14"
                                                        viewBox="0 0 14 14"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <rect
                                                            x="0.5"
                                                            y="0.5"
                                                            width="13"
                                                            height="13"
                                                            rx="6.5"
                                                        ></rect>
                                                        <path d="M10.6947 5.45777L6.24644 9.90841C6.17556 9.97689 6.08572 10.0124 5.99596 10.0124C5.9494 10.0125 5.90328 10.0033 5.86027 9.98548C5.81727 9.96763 5.77822 9.94144 5.7454 9.90841L3.3038 7.46681C3.16436 7.32969 3.16436 7.10521 3.3038 6.96577L4.16652 6.10065C4.29892 5.96833 4.53524 5.96833 4.66764 6.10065L5.99596 7.42897L9.33092 4.09161C9.36377 4.05868 9.40278 4.03255 9.44573 4.01471C9.48868 3.99686 9.53473 3.98766 9.58124 3.98761C9.67572 3.98761 9.76556 4.02545 9.83172 4.09161L10.6944 4.95681C10.8341 5.09625 10.8341 5.32073 10.6947 5.45777Z"></path>
                                                    </svg>
                                                    Air Conditioning
                                                </li>
                                                <li>
                                                    <svg
                                                        width="14"
                                                        height="14"
                                                        viewBox="0 0 14 14"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <rect
                                                            x="0.5"
                                                            y="0.5"
                                                            width="13"
                                                            height="13"
                                                            rx="6.5"
                                                        ></rect>
                                                        <path d="M10.6947 5.45777L6.24644 9.90841C6.17556 9.97689 6.08572 10.0124 5.99596 10.0124C5.9494 10.0125 5.90328 10.0033 5.86027 9.98548C5.81727 9.96763 5.77822 9.94144 5.7454 9.90841L3.3038 7.46681C3.16436 7.32969 3.16436 7.10521 3.3038 6.96577L4.16652 6.10065C4.29892 5.96833 4.53524 5.96833 4.66764 6.10065L5.99596 7.42897L9.33092 4.09161C9.36377 4.05868 9.40278 4.03255 9.44573 4.01471C9.48868 3.99686 9.53473 3.98766 9.58124 3.98761C9.67572 3.98761 9.76556 4.02545 9.83172 4.09161L10.6944 4.95681C10.8341 5.09625 10.8341 5.32073 10.6947 5.45777Z"></path>
                                                    </svg>
                                                    Swimming Pool
                                                </li>
                                                <li>
                                                    <svg
                                                        width="14"
                                                        height="14"
                                                        viewBox="0 0 14 14"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <rect
                                                            x="0.5"
                                                            y="0.5"
                                                            width="13"
                                                            height="13"
                                                            rx="6.5"
                                                        ></rect>
                                                        <path d="M10.6947 5.45777L6.24644 9.90841C6.17556 9.97689 6.08572 10.0124 5.99596 10.0124C5.9494 10.0125 5.90328 10.0033 5.86027 9.98548C5.81727 9.96763 5.77822 9.94144 5.7454 9.90841L3.3038 7.46681C3.16436 7.32969 3.16436 7.10521 3.3038 6.96577L4.16652 6.10065C4.29892 5.96833 4.53524 5.96833 4.66764 6.10065L5.99596 7.42897L9.33092 4.09161C9.36377 4.05868 9.40278 4.03255 9.44573 4.01471C9.48868 3.99686 9.53473 3.98766 9.58124 3.98761C9.67572 3.98761 9.76556 4.02545 9.83172 4.09161L10.6944 4.95681C10.8341 5.09625 10.8341 5.32073 10.6947 5.45777Z"></path>
                                                    </svg>
                                                    Laundry Services{" "}
                                                </li>
                                            </ul>
                                            <div className="cancellation">
                                                <svg
                                                    width="14"
                                                    height="14"
                                                    viewBox="0 0 14 14"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <rect width="14" height="14" rx="7"></rect>
                                                    <path d="M10.6947 5.45777L6.24644 9.90841C6.17556 9.97689 6.08572 10.0124 5.99596 10.0124C5.9494 10.0125 5.90328 10.0033 5.86027 9.98548C5.81727 9.96763 5.77822 9.94144 5.7454 9.90841L3.3038 7.46681C3.16436 7.32969 3.16436 7.10521 3.3038 6.96577L4.16652 6.10065C4.29892 5.96833 4.53524 5.96833 4.66764 6.10065L5.99596 7.42897L9.33092 4.09161C9.36377 4.05868 9.40278 4.03255 9.44573 4.01471C9.48868 3.99686 9.53473 3.98766 9.58124 3.98761C9.67572 3.98761 9.76556 4.02545 9.83172 4.09161L10.6944 4.95681C10.8341 5.09625 10.8341 5.32073 10.6947 5.45777Z"></path>
                                                </svg>
                                                <span>Free Cancellation Policy</span>
                                            </div>
                                            <div className="btn-and-price-area">
                                                <a
                                                    href="#"
                                                    className="primary-btn1"
                                                    onClick={() => viewDetail(item?.property_token, item)}
                                                >
                                                    <span>
                                                        Book Now{" "}
                                                        <svg
                                                            width="10"
                                                            height="10"
                                                            viewBox="0 0 10 10"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <path d="M9.73535 1.14746C9.57033 1.97255 9.32924 3.26406 9.24902 4.66797C9.16817 6.08312 9.25559 7.5453 9.70214 8.73633C9.84754 9.12406 9.65129 9.55659 9.26367 9.70215C8.9001 9.83849 8.4969 9.67455 8.32812 9.33398L8.29785 9.26367L8.19921 8.98438C7.73487 7.5758 7.67054 5.98959 7.75097 4.58203C7.77875 4.09598 7.82525 3.62422 7.87988 3.17969L1.53027 9.53027C1.23738 9.82317 0.762615 9.82317 0.469722 9.53027C0.176829 9.23738 0.176829 8.76262 0.469722 8.46973L6.83593 2.10254C6.3319 2.16472 5.79596 2.21841 5.25 2.24902C3.8302 2.32862 2.2474 2.26906 0.958003 1.79102L0.704097 1.68945L0.635738 1.65527C0.303274 1.47099 0.157578 1.06102 0.310542 0.704102C0.463655 0.347333 0.860941 0.170391 1.22363 0.28418L1.29589 0.310547L1.48828 0.387695C2.47399 0.751207 3.79966 0.827571 5.16601 0.750977C6.60111 0.670504 7.97842 0.428235 8.86132 0.262695L9.95312 0.0585938L9.73535 1.14746Z"></path>
                                                        </svg>
                                                    </span>
                                                    <span>
                                                        Book Now{" "}
                                                        <svg
                                                            width="10"
                                                            height="10"
                                                            viewBox="0 0 10 10"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <path d="M9.73535 1.14746C9.57033 1.97255 9.32924 3.26406 9.24902 4.66797C9.16817 6.08312 9.25559 7.5453 9.70214 8.73633C9.84754 9.12406 9.65129 9.55659 9.26367 9.70215C8.9001 9.83849 8.4969 9.67455 8.32812 9.33398L8.29785 9.26367L8.19921 8.98438C7.73487 7.5758 7.67054 5.98959 7.75097 4.58203C7.77875 4.09598 7.82525 3.62422 7.87988 3.17969L1.53027 9.53027C1.23738 9.82317 0.762615 9.82317 0.469722 9.53027C0.176829 9.23738 0.176829 8.76262 0.469722 8.46973L6.83593 2.10254C6.3319 2.16472 5.79596 2.21841 5.25 2.24902C3.8302 2.32862 2.2474 2.26906 0.958003 1.79102L0.704097 1.68945L0.635738 1.65527C0.303274 1.47099 0.157578 1.06102 0.310542 0.704102C0.463655 0.347333 0.860941 0.170391 1.22363 0.28418L1.29589 0.310547L1.48828 0.387695C2.47399 0.751207 3.79966 0.827571 5.16601 0.750977C6.60111 0.670504 7.97842 0.428235 8.86132 0.262695L9.95312 0.0585938L9.73535 1.14746Z"></path>
                                                        </svg>
                                                    </span>
                                                </a>
                                                <div className="price-area">
                                                    <h6 >Starting From</h6>
                                                    <span>
                                                        {/* <del>$55.00</del> */}

                                                        ${item?.price}.00
                                                    </span>
                                                </div>{" "}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        );
                    })}
                    {/* *********************************************************************** */}


                    {/* ************************************* */}


                    {/* ***************************************************************************** pagination >>>>>>>>>>>>>>>>>>> */}
                    <div className="pagination_wrapper text-center flex justify-center mb-10">
                        <button className=" px-3 py-2 rounded bg-color-green  text-black font-semibold" onClick={handleLoadMore}> {isFetching ? "Loading..." : "Load More"} </button>
                    </div>
                </div>
            </div>{" "}

        </>
    );
}
