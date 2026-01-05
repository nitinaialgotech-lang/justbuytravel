import axios from "axios";

export const https_hotels = axios.create({
    baseURL: "https://justbuygear.com/justbuytravel_next/hotel-api/",
    // Treat responses as raw text so we can safely JSON.parse
    transformResponse: [(data) => data],
});

export const https_blog = axios.create({
    baseURL: "https://justbuytravel.com/wp-json/wp/v2"
})
