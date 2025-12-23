import { https_hotels } from "./https"

export const SearchLocation = async (search) => {
    return await https_hotels.get(`/search?location=${search}`)
}