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
    const search = searchQuery.get("query");

    const { data, isFetching } = useQuery({
        queryKey: ["hotels", search, page],
        queryFn: async () => {
            return await SearchLocation(
                search,
                page,
                LIMIT,
            );
        },
        keepPreviousData: true,
    });

    console.log(data);
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
    useEffect(() => {
        if (data?.data?.data?.hotels) {
            const newHotels = data.data.data.hotels;

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
    const viewDetail = (id) => {
        router.push(`/hoteldetail?query=${id}`)

    }



    // const title = hotels.title || hotels.name || hotels.property_id || "hotels";
    // const price = hotels.price || hotels.rate_per_night?.lowest || "N/A";
    // const rating = hotels.rating || "N/A";
    // const reviews = hotels.reviews || hotels.review_count || "N/A";
    // const address = hotels.address || hotels.location || "";
    // const thumbnail = hotels.thumbnail;
    // const token = hotels.property_token || hotels.property_id || "";
    // const hotelSlug = createSlug(title);


    console.log();



    return (
        <>
            {/* ********************************************************************************* */}
            <div className="list-grid-product-wrap">
                <div id="sidebar_filter_hotel" className="row gy-md-5 gy-4">
                    {/* ***************************************************** */}
                    {hotels?.map((item, i) => {
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
                                                    loading="lazy"
                                                    width="1320"
                                                    height="770"
                                                    src={item?.thumbnail}
                                                    className="attachment-post-thumbnail size-post-thumbnail wp-post-image"
                                                    alt=""
                                                    decoding="async"
                                                    srcset={item?.thumbnail}
                                                    sizes="(max-width: 1320px) 100vw, 1320px"
                                                />{" "}
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
                                                    {item?.title}
                                                </a>
                                            </h5>
                                            <div className="location-area">
                                                <div className="location">
                                                    <svg
                                                        width="14"
                                                        height="14"
                                                        viewBox="0 0 14 14"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path d="M6.83615 0C3.77766 0 1.28891 2.48879 1.28891 5.54892C1.28891 7.93837 4.6241 11.8351 6.05811 13.3994C6.25669 13.6175 6.54154 13.7411 6.83615 13.7411C7.13076 13.7411 7.41561 13.6175 7.6142 13.3994C9.04821 11.8351 12.3834 7.93833 12.3834 5.54892C12.3834 2.48879 9.89464 0 6.83615 0ZM7.31469 13.1243C7.18936 13.2594 7.02008 13.3342 6.83615 13.3342C6.65222 13.3342 6.48295 13.2594 6.35761 13.1243C4.95614 11.5959 1.69584 7.79515 1.69584 5.54896C1.69584 2.7134 4.00067 0.406933 6.83615 0.406933C9.67164 0.406933 11.9765 2.7134 11.9765 5.54896C11.9765 7.79515 8.71617 11.5959 7.31469 13.1243Z"></path>
                                                        <path d="M6.83618 8.54554C8.4624 8.54554 9.7807 7.22723 9.7807 5.60102C9.7807 3.9748 8.4624 2.65649 6.83618 2.65649C5.20997 2.65649 3.89166 3.9748 3.89166 5.60102C3.89166 7.22723 5.20997 8.54554 6.83618 8.54554Z"></path>
                                                    </svg>
                                                    <a href="">
                                                        Bangladesh
                                                    </a>{" "}
                                                    <i className="bi bi-arrow-right"></i>{" "}
                                                    <a href="">
                                                        Dhaka
                                                    </a>{" "}
                                                </div>
                                                <a
                                                    href=""
                                                    className="map-view text-primary"
                                                    target=" _blank"
                                                >
                                                    View Map{" "}
                                                    <svg
                                                        width="9"
                                                        height="9"
                                                        viewBox="0 0 9 9"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path d="M4.22358 9H1.52534C1.07358 9 0.690381 8.85586 0.41792 8.5834C0.145459 8.31093 0.00131836 7.92597 0.00131836 7.47246C-0.000439453 5.51777 -0.000439453 3.75293 0.00131836 2.07597C0.00131836 1.62422 0.147217 1.24101 0.421436 0.970309C0.695654 0.699606 1.07886 0.555466 1.53237 0.555466H3.32534C3.54507 0.555466 3.72437 0.620505 3.84565 0.743552C3.95464 0.852536 4.01089 1.00371 4.00913 1.17949C4.00562 1.55215 3.74194 1.79121 3.33413 1.79297H1.5394C1.29331 1.79297 1.2353 1.85097 1.2353 2.10058V7.4584C1.2353 7.70625 1.29331 7.7625 1.54116 7.7625H6.89897C7.14683 7.7625 7.20483 7.70625 7.20483 7.45664V5.66367C7.20483 5.25586 7.44741 4.99043 7.82007 4.98867H7.82358C8.198 4.98867 8.44058 5.25058 8.44058 5.65664V5.82539C8.44233 6.37558 8.44233 6.94511 8.44058 7.5041C8.43882 7.93828 8.29292 8.31093 8.0187 8.58164C7.74448 8.85234 7.37183 8.99648 6.93589 8.99824H4.22358V9Z"></path>
                                                        {/* *********************************** */}
                                                        <path d="M3.89929 5.67422C3.69011 5.67422 3.48444 5.53535 3.38776 5.32969C3.26823 5.0748 3.31921 4.79883 3.52487 4.58965C3.78151 4.32949 4.04519 4.06758 4.30007 3.81445L4.57077 3.54551L5.4444 2.67715C5.91374 2.21133 6.38132 1.74551 6.8489 1.27793C6.85769 1.26914 6.86647 1.26035 6.87526 1.2498C6.5905 1.24453 5.97351 1.24102 5.63073 1.23926C5.43561 1.23926 5.27038 1.17598 5.15436 1.05645C5.04362 0.943945 4.98561 0.789258 4.98737 0.611719C4.99089 0.247852 5.24929 0.00351562 5.62897 0.00175781C6.09655 0 6.56061 0 7.02644 0C7.49929 0 7.93698 0 8.36589 0.00175781C8.74733 0.00175781 8.99519 0.246094 8.99694 0.622266C9.00046 1.5627 9.00046 2.49434 8.99694 3.39434C8.99519 3.75644 8.74206 4.01133 8.38171 4.01133C8.02136 4.01133 7.76823 3.7582 7.76472 3.39785C7.76296 3.21328 7.7612 2.92676 7.75944 2.64902C7.75769 2.44512 7.75769 2.25 7.75593 2.11992C7.74186 2.13223 7.72956 2.14453 7.71726 2.15684C7.44655 2.4293 7.17585 2.7 6.90515 2.97246C6.1071 3.77402 5.28269 4.60371 4.46706 5.41406C4.3405 5.53711 4.18229 5.62324 4.01179 5.66367C3.97312 5.6707 3.9362 5.67422 3.89929 5.67422Z"></path>
                                                    </svg>
                                                </a>
                                            </div>
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
                                                    onClick={() => viewDetail(item?.property_token)}
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

                                                        {item?.price}.00
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
                        <button className="btn bg-danger text-light" onClick={handleLoadMore}> {isFetching ? "Loading..." : "Load More"} </button>
                    </div>
                </div>
            </div>{" "}
            {/* <div id="hide-ax">
                <div
                    className="pagination-area hotel wow animate fadeInUp mt-60"
                    data-wow-delay="200ms"
                    data-wow-duration="1500ms"
                >
                    <div className="paginations-button">
                        <a href="https://gofly-wp.egenstheme.com/hotel/">
                            <svg
                                width="10"
                                height="10"
                                viewBox="0 0 10 10"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <g>
                                    <path
                                        d="M7.86133 9.28516C7.14704 7.49944 3.57561 5.71373 1.43276 4.99944C3.57561 4.28516 6.7899 3.21373 7.86133 0.713728"
                                        stroke-width="1.5"
                                        stroke-linecap="round"
                                    ></path>
                                </g>
                            </svg>
                            Prev{" "}
                        </a>
                    </div>
                    <ul className="paginations">
                        <li className="page-item">
                            <a aria-label="Page 1" aria-current="page" className=" current">
                                01
                            </a>
                        </li>
                        <li className="page-item">
                            <a
                                aria-label="Page 2"
                                className=""
                                href="https://gofly-wp.egenstheme.com/hotel/page/2/"
                            >
                                02
                            </a>
                        </li>
                    </ul>
                    <div className="paginations-button">
                        <a href="https://gofly-wp.egenstheme.com/hotel/page/2/">
                            Next{" "}
                            <svg
                                width="10"
                                height="10"
                                viewBox="0 0 10 10"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <g>
                                    <path
                                        d="M1.42969 9.28613C2.14397 7.50042 5.7154 5.7147 7.85826 5.00042C5.7154 4.28613 2.50112 3.21471 1.42969 0.714705"
                                        stroke-width="1.5"
                                        stroke-linecap="round"
                                    ></path>
                                </g>
                            </svg>
                        </a>
                    </div>
                </div>
            </div> */}
        </>
    );
}
