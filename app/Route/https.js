import axios from "axios";

export const https_hotels = axios.create({
    baseURL: "https://justbuygear.com/justbuytravel_next/"
})

export const https_blog = axios.create({
    baseURL: "https://justbuytravel.com/wp-json/wp/v2"
})