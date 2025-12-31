import { https_blog, https_hotels } from "./https"

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

export const SearchLocation = async (search) => {
    if (!search || typeof search !== 'string' || !search.trim()) {
        throw new Error("Search location is required");
    }

    // Trim and clean the search term
    const cleanedSearch = search.trim();
    
    // Disambiguate common city names to avoid matching wrong locations
    const disambiguatedSearch = disambiguateCityName(cleanedSearch);
    
    // Log the search term being sent for debugging
    console.log("Original search:", cleanedSearch);
    console.log("Disambiguated search:", disambiguatedSearch);
    
    // Use the disambiguated search (which should be "Delhi, India" for "delhi")
    try {
        console.log("Searching with:", disambiguatedSearch);
        const res = await https_hotels.get(`/hotels.php?location=${encodeURIComponent(disambiguatedSearch)}`);
        
        // Check if response status is OK
        if (res.status !== 200) {
            throw new Error(`API returned status ${res.status}`);
        }
        
        // Check if response data exists and is a string
        if (!res.data || typeof res.data !== 'string') {
            throw new Error("Invalid response data format");
        }
        
        // Check if response starts with HTML (error page)
        if (res.data.trim().startsWith('<!DOCTYPE') || res.data.trim().startsWith('<html')) {
            console.error("API returned HTML instead of JSON:", res.data.substring(0, 200));
            throw new Error("API returned HTML error page instead of JSON");
        }
        
        // Try to parse JSON
        let json;
        try {
            json = JSON.parse(res.data);
        } catch (parseError) {
            console.error("Failed to parse JSON response:", res.data.substring(0, 500));
            throw new Error(`Invalid JSON response: ${parseError.message}`);
        }
        
        console.log("API response:", json);
        
        // Filter results to ensure they match the intended location
        if (json?.hotels && Array.isArray(json.hotels)) {
            const filteredHotels = filterResultsByLocation(json.hotels, cleanedSearch);
            console.log(`Filtered ${json.hotels.length} hotels to ${filteredHotels.length} matching results`);
            
            // Return filtered results
            return { ...json, hotels: filteredHotels };
        }
        
        return json;
    } catch (error) {
        console.error("SearchLocation error:", error);
        // Re-throw with more context
        if (error.response) {
            // Axios error with response
            throw new Error(`API request failed: ${error.response.status} - ${error.response.statusText}`);
        } else if (error.request) {
            // Request made but no response
            throw new Error("No response from API server");
        } else {
            // Error in request setup or parsing
            throw error;
        }
    }
}

// Helper function to filter results by location
const filterResultsByLocation = (hotels, originalSearch) => {
    if (!hotels || !Array.isArray(hotels)) return hotels;
    
    const lowerSearch = originalSearch.toLowerCase().trim();
    
    // Map of city names to their expected country
    const cityCountryMap = {
        'delhi': 'india',
        'new delhi': 'india',
        'mumbai': 'india',
        'bangalore': 'india',
        'kolkata': 'india',
        'chennai': 'india',
        'hyderabad': 'india',
        'pune': 'india',
        'ahmedabad': 'india',
        'jaipur': 'india',
        'lucknow': 'india',
        'kanpur': 'india',
        'nagpur': 'india',
        'indore': 'india',
        'thane': 'india',
        'bhopal': 'india',
        'visakhapatnam': 'india',
        'patna': 'india',
        'vadodara': 'india',
        'ghaziabad': 'india',
        'ludhiana': 'india',
        'agra': 'india',
        'nashik': 'india',
        'faridabad': 'india',
        'meerut': 'india',
        'rajkot': 'india',
        'varanasi': 'india',
        'srinagar': 'india',
        'amritsar': 'india',
        'chandigarh': 'india',
        'gurgaon': 'india',
        'noida': 'india',
    };
    
    const expectedCountry = cityCountryMap[lowerSearch];
    
    if (!expectedCountry) return hotels;
    
    return hotels.filter(hotel => {
        // Get all possible location-related fields from the hotel object
        const locationFields = [
            hotel?.location,
            hotel?.address,
            hotel?.city,
            hotel?.country,
            hotel?.state,
            hotel?.region,
            hotel?.name,
            hotel?.property_name,
            hotel?.hotel_name,
            hotel?.description,
            hotel?.address_line_1,
            hotel?.address_line_2,
            hotel?.full_address,
        ].filter(Boolean).join(' ').toLowerCase();
        
        // Also stringify the entire object to catch any nested location data
        const hotelStr = JSON.stringify(hotel).toLowerCase();
        
        // Combine both for comprehensive checking
        const allText = `${locationFields} ${hotelStr}`;
        
        // Check if the hotel data contains the expected country
        const hasExpectedCountry = allText.includes(expectedCountry);
        
        // Check if it contains USA indicators (and exclude those)
        const hasUSA = 
            allText.includes('usa') ||
            allText.includes('united states') ||
            allText.includes('america') ||
            allText.includes('us,') ||
            allText.includes(', us') ||
            allText.includes('united states of america') ||
            allText.includes('u.s.') ||
            allText.includes('u.s.a');
        
        // Also check for common US state abbreviations that might appear
        const hasUSState = /,\s*(al|ak|az|ar|ca|co|ct|de|fl|ga|hi|id|il|in|ia|ks|ky|la|me|md|ma|mi|mn|ms|mo|mt|ne|nv|nh|nj|nm|ny|nc|nd|oh|ok|or|pa|ri|sc|sd|tn|tx|ut|vt|va|wa|wv|wi|wy)\s*$/i.test(allText);
        
        // Exclude USA results for Indian city searches
        if (hasUSA || hasUSState) {
            console.log("Filtered out USA hotel:", hotel?.name || hotel?.property_name);
            return false;
        }
        
        // If we have expected country markers, definitely include it
        if (hasExpectedCountry) {
            return true;
        }
        
        // For ambiguous cases without clear country markers, include if it doesn't have USA
        return !hasUSA && !hasUSState;
    });
}

export const HotelDetail = async (id) => {
    if (!id) {
        throw new Error("Property token is required");
    }
    
    try {
        const res = await https_hotels.get(`/hotel-property.php?property_token=${encodeURIComponent(id)}`);
        
        // Check if response status is OK
        if (res.status !== 200) {
            throw new Error(`API returned status ${res.status}`);
        }
        
        // Check if response data exists and is a string
        if (!res.data || typeof res.data !== 'string') {
            throw new Error("Invalid response data format");
        }
        
        // Check if response starts with HTML (error page)
        if (res.data.trim().startsWith('<!DOCTYPE') || res.data.trim().startsWith('<html')) {
            console.error("API returned HTML instead of JSON:", res.data.substring(0, 200));
            throw new Error("API returned HTML error page instead of JSON");
        }
        
        // Try to parse JSON
        let json;
        try {
            json = JSON.parse(res.data);
        } catch (parseError) {
            console.error("Failed to parse JSON response:", res.data.substring(0, 500));
            throw new Error(`Invalid JSON response: ${parseError.message}`);
        }
        
        console.log("HotelDetail API response:", json);
        return json;
    } catch (error) {
        console.error("HotelDetail API error:", error);
        if (error.response) {
            console.error("Response data:", error.response.data);
        }
        // Re-throw with more context
        if (error.response) {
            throw new Error(`API request failed: ${error.response.status} - ${error.response.statusText}`);
        } else if (error.request) {
            throw new Error("No response from API server");
        } else {
            throw error;
        }
    }
}

export const Get_Blogs = async () => {
    return await https_blog.get("/posts")
}