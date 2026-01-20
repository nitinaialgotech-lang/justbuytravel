import { https_api, https_blog, https_blog_category, https_hotels, https_SearchCity } from "./https"

// Helper function to disambiguate common city names
const disambiguateCityName = (searchTerm) => {
    const lowerSearch = searchTerm.toLowerCase().trim();

    // Map of ambiguous city names to their most common location (with country)
    const cityDisambiguation = {
        'delhi': 'Delhi, India',
        'new delhi': 'New Delhi, India',
        'mumbai': 'Mumbai, India',
        'bangalore': 'Bangalore, India',
        'kolkata': 'Kolkata, India',
        'chennai': 'Chennai, India',
        'hyderabad': 'Hyderabad, India',
        'pune': 'Pune, India',
        'ahmedabad': 'Ahmedabad, India',
        'jaipur': 'Jaipur, India',
        'lucknow': 'Lucknow, India',
        'kanpur': 'Kanpur, India',
        'nagpur': 'Nagpur, India',
        'indore': 'Indore, India',
        'thane': 'Thane, India',
        'bhopal': 'Bhopal, India',
        'visakhapatnam': 'Visakhapatnam, India',
        'patna': 'Patna, India',
        'vadodara': 'Vadodara, India',
        'ghaziabad': 'Ghaziabad, India',
        'ludhiana': 'Ludhiana, India',
        'agra': 'Agra, India',
        'nashik': 'Nashik, India',
        'faridabad': 'Faridabad, India',
        'meerut': 'Meerut, India',
        'rajkot': 'Rajkot, India',
        'varanasi': 'Varanasi, India',
        'srinagar': 'Srinagar, India',
        'amritsar': 'Amritsar, India',
        'chandigarh': 'Chandigarh, India',
        'gurgaon': 'Gurgaon, India',
        'noida': 'Noida, India',
    };

    // Check if the search term matches a known ambiguous city
    if (cityDisambiguation[lowerSearch]) {
        return cityDisambiguation[lowerSearch];
    }

    // If search already contains a comma, assume it's already specific enough
    if (searchTerm.includes(',')) {
        return searchTerm;
    }

    // Return original search term if no disambiguation needed
    return searchTerm;
};

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
// ************ hotel around the world 
export const TopHotelAroundWorld = async () => {
    return await https_SearchCity.get(`/top-hotels.php?includedType=lodging`)
}
export const TouristAttractionApi = async () => {
    return await https_SearchCity.get(`/top-hotels.php?includedType=tourist_attraction`)
}
// *((((((((((((((((((((((()))))))))))))))))))))))
export const autoComplete = async (text, limit = 10) => {
    return await https_SearchCity.get(`/autocomplete.php?input=${text}&maxResultCount=${limit}`)
}
export const nearbyPlaces = async (lat, lng) => {
    return await https_SearchCity.get(
        `/nearby-search.php?latitude=${lat}&longitude=${lng}&includedTypes=lodging&radius=10000&maxResultCount=10`
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

export const GetAccommodationDetails = async (name, address) => {
    return await https_api.post(
        `/get-prices.php`,
        { name, address },
        { headers: { "Content-Type": "application/json" } }
    );
};