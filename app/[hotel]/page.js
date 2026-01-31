import SearchHotelDetail from '@/Components/SearchResultPage/HotelDetail/SearchHotelDetail';
import { GetHotel_Detail } from '@/app/Route/endpoints';
import {
    generateHotelMetadata,
    generateHotelStructuredData,
    generateBreadcrumbStructuredData,
    getHotelIdFromSlug,
} from '@/app/utils/seo';
import "../../style/responsive.css";

export const dynamicParams = true;

export function generateStaticParams() {
    return [];
}

export async function generateMetadata({ params }) {
    try {
        // Await params in Next.js 15+
        const resolvedParams = await params;
        const hotelId = getHotelIdFromSlug(resolvedParams?.hotel);
        if (!hotelId) {
            return {
                title: 'Hotel Details',
                description: 'View detailed hotel information, reviews, and prices.',
            };
        }

        const response = await GetHotel_Detail(hotelId);
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

export default async function HotelDetailPage({ params }) {
    try {
        // Await params in Next.js 15+
        const resolvedParams = await params;
        const hotelId = getHotelIdFromSlug(resolvedParams?.hotel);
        if (!hotelId) {
            return <SearchHotelDetail />;
        }

        const response = await GetHotel_Detail(hotelId);
        const hotel = response?.data;

        if (!hotel) {
            return <SearchHotelDetail />;
        }

        const hotelName = hotel?.displayName?.text || hotel?.name || 'Hotel';
        const structuredData = generateHotelStructuredData(hotel);
        const breadcrumbData = generateBreadcrumbStructuredData([
            { name: 'Home', path: '/' },
            { name: 'Hotels', path: '/hotels' },
            { name: hotelName, path: `/${resolvedParams.hotel}` },
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
    } catch (error) {
        console.error('Error loading hotel:', error);
        return <SearchHotelDetail />;
    }
}
