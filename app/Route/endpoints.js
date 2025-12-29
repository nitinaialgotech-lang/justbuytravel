import { https_blog, https_hotels } from "./https"

export const SearchLocation = async (search) => {
    return await https_hotels.get(`/search?q=${search}`);
}
export const HotelDetail = async (id) => {
    return await https_hotels.get(`/property/${id}`)
}
export const Get_Blogs = async () => {
    return await https_blog.get("/posts")
}