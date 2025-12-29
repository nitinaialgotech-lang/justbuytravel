import { https_hotels } from "./https"

export const SearchLocation = async (search) => {
    return await https_hotels.get(`/search?q=${search}`);
}
export const HotelDetail = async (id) => {
    return await https_hotels.get(`/property/${id}`)
}