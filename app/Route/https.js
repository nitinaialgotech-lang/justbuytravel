import axios from "axios";

export const https_hotels = axios.create({
    baseURL: "https://justbuygear.com/justbuytravel_next/"
})