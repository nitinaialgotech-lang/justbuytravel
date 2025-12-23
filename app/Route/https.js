import axios from "axios";

export const https_hotels = axios.create({
    baseURL: "http://192.168.29.59:3000/api/hotels"
})