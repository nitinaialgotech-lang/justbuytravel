import axios from "axios";

// Only set headers that browsers allow. User-Agent is forbidden in browser XHR/fetch.
const commonHeaders = {
    "Accept": "application/json",
};

export const https_hotels = axios.create({
    baseURL: "https://justbuygear.com/justbuytravel_next/hotel-api/",
    headers: commonHeaders,
    transformResponse: [(data) => data],
});

export const https_blog = axios.create({
    baseURL: "https://justbuytravel.in/wp-json/wp/v2",
    headers: commonHeaders,
});

export const https_api = axios.create({
    baseURL: "https://justbuygear.com/justbuytravel-api",
    headers: commonHeaders,
});

export const https_SearchCity = axios.create({
    baseURL: "https://justbuygear.com/justbuytravel-api",
    headers: commonHeaders,
});
