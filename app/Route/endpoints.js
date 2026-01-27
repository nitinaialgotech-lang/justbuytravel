import { https_api, https_blog, https_blog_category, https_checkIn, https_hotels, https_SearchCity } from "./https"

// Helper function to disambiguate common city names


export const SearchLocation = async (search, address) => {
    return await https_api.get(`/search.php?city=${search}&full_address=${address}`)
}

export const HotelDetail = async (hotel_id, code) => {
    return await https_api.get(`/result.php?hotel_identifier=${hotel_id}&location_code=${code}`)
    // {
    //     catche: "no-store"
    // }
}

export const Get_Blogs = async () => {
    return await https_blog.get("/posts")
}

export const Get_Blog_category = async () => {
    return await https_blog.get("/categories?per_page=20")
}
// export const Get_Blog_data = async (id) => {


//     return await https_blog.get(`/posts?categories=${id}`)
// }


export const Get_Blog_data = async (id, page) => {
    if (!id) {
        // Fetch All Posts
        const response = await https_blog.get(`/posts?page=${page}`);
        return response?.data;
    }


    // Fetch by Category
    const response = await https_blog.get(`/posts?categories=${id}`);
    return response.data;
};

export const Dropdown_Get = async (data) => {
    return await https_api.get(`/location.php?q=${data}`)
}

// (((((((((((((())))))))))))))
export const Get_cityName = async (id) => {
    return await https_SearchCity.get(`/search.php?city=${id}`)
}
// *************************** search text 
export const searchText = async (text, limit = 50) => {
    return await https_SearchCity.get(`/text-search.php?textQuery=${text}&maxResultCount=${limit}`)
}
export const searchHotel = async (text, limit = 50) => {
    return await https_SearchCity.get(`/text-search.php?textQuery=hotels and tourist_attraction in ${text}&maxResultCount=${limit}`)
}
/******************* testing hotel detail */
export const searchHotelName = async (name) => {
    return await https_SearchCity.get(`/testing.php?hotel=${name}&include_xotelo=1`)
}
/********************************** check in check out apis >>>>>>>>>>>> */
export const HotelCheckInCheckOut = async (hotelkey, checkin, checkout) => {
    // Default to 7 days if dates not provided
    const defaultCheckin = checkin || new Date().toISOString().split('T')[0];
    const defaultCheckout = checkout || (() => {
        const date = new Date();
        date.setDate(date.getDate() + 1);
        return date.toISOString().split('T')[0];
    })();

    const url = `/pricing.php?hotel_key=${hotelkey}&chk_in=${defaultCheckin}&chk_out=${defaultCheckout}`;

    const response = await https_SearchCity.get(url);

    return response;
}
// ************ hotel around the world >>>>>>>>>>>>>>>>>>>>>>>>>>>>>
export const TopHotelAroundWorld = async () => {
    return await https_SearchCity.get(`/top-hotels.php?includedType=lodging`)
}
export const TouristAttractionApi = async () => {
    return await https_SearchCity.get(`/top-hotels.php?includedType=tourist_attraction`)
}
export const RestaurantApi = async (text) => {
    return await https_SearchCity.get(`/text-search.php?textQuery=${text}&includedType=restaurant`)
}
// *((((((((((((((((((((((()))))))))))))))))))))))
export const autoComplete = async (text, limit = 10) => {
    return await https_SearchCity.get(`/autocomplete.php?input=${text}&maxResultCount=${limit}`)
}
export const nearbyPlaces = async (lat, lng) => {
    return await https_SearchCity.get(
        `/nearby-search.php?latitude=${lat}&longitude=${lng}&includedTypes=lodging&radius=10000&maxResultCount=20`
    );
};
export const Restro = async (lat, lng) => {
    return await https_SearchCity.get(
        `/nearby-search.php?latitude=${lat}&longitude=${lng}&includedTypes=restaurant&radius=10000&maxResultCount=10`
    );
};
export const IconicPlaces = async (lat, lng) => {
    return await https_SearchCity.get(
        `/nearby-search.php?latitude=${lat}&longitude=${lng}&includedTypes=tourist_attraction&radius=10000&maxResultCount=10`
    );
};
export const GetHotel_Detail = async (id) => {
    return await https_SearchCity.get(`/place-details.php?placeId=${id}`)
}
