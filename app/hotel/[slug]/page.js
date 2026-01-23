import { notFound } from 'next/navigation';
import SearchHotelDetail from '@/Components/SearchResultPage/HotelDetail/SearchHotelDetail';
import { GetHotel_Detail } from '@/app/Route/endpoints';
import { generateHotelMetadata, generateHotelStructuredData, generateBreadcrumbStructuredData, createSlug } from '@/app/utils/seo';
import "../../../style/responsive.css";

export const dynamic = 'force-static';
export const dynamicParams = false;

export function generateStaticParams() {
    return [{ slug: "placeholder" }];
}

// Generate dynamic metadata for each hotel
export async function generateMetadata({ params, searchParams }) {
    try {
        const { slug } = params;
        const { id } = searchParams;
        
        if (!id) {
            return {
                title: 'Hotel Details',
                description: 'View detailed hotel information, reviews, and prices.',
            };
        }
        
        const response = await GetHotel_Detail(id);
        const hotel = response?.data;
        
        if (!hotel) {
            return {
                title: 'Hotel Not Found',
                description: 'The requested hotel could not be found.',
            };
        }
        
        return generateHotelMetadata(hotel);
    } catch (error) {
        console.error('Error generating hotel metadata:', error);
        return {
            title: 'Hotel Details',
            description: 'View hotel information and compare prices.',
        };
    }
}

export default async function HotelDetailPage({ params, searchParams }) {
    const { slug } = params;
    const { id, hotel_id, code } = searchParams;
    
    try {
        // If we have an ID, fetch the hotel details for structured data
        let hotel = null;
        let structuredData = null;
        
        if (id) {
            const response = await GetHotel_Detail(id);
            hotel = response?.data;
            
            if (hotel) {
                const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://justbuytravel.com';
                const hotelName = hotel?.displayName?.text || hotel?.name || 'Hotel';
                
                structuredData = generateHotelStructuredData(hotel);
                const breadcrumbData = generateBreadcrumbStructuredData([
                    { name: 'Home', path: '/' },
                    { name: 'Hotels', path: '/hotels' },
                    { name: hotelName, path: `/hotel/${slug}?id=${id}` }
                ]);
                
                return (
                    <>
                        <script
                            type="application/ld+json"
                            dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
                        />
                        <script
                            type="application/ld+json"
                            dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
                        />
                        
                        <SearchHotelDetail />
                    </>
                );
            }
        }
        
        // Fallback if no ID or hotel not found
        return <SearchHotelDetail />;
        
    } catch (error) {
        console.error('Error loading hotel:', error);
        return <SearchHotelDetail />;
    }
}
