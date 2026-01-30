
// import SearchSection from "@/Components/HomePage/SearchSectionhhh";

import IndexPage from "@/Components/HomePage/IndexPage/IndexPage";
import "../style/responsive.css"
import { Provider } from "react-redux";
import store from "@/Components/Redux/Store";


export const metadata = {
  title: "Smart Travel Planning for Hotels & Flights | Just Buy Travel",
  description: "Plan smart trips with verified hotel and flight options. Compare prices, read genuine reviews, and book with confidence for every trip with Just Buy Travel",
  keywords: "travel deals, hotel reviews, travel booking, vacation packages, destination guides, travel tips, hotel comparison, travel offers, cheap flights, travel destinations",
  openGraph: {
    title: "Smart Travel Planning for Hotels & Flights | Just Buy Travel",
    description: "Plan smart trips with verified hotel and flight options. Compare prices, read genuine reviews, and book with confidence for every trip with Just Buy Travel",
    type: "website",
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_URL || 'https://justbuytravel.com',
  },
};

export default function Home() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://justbuytravel.com';

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": siteUrl
      }
    ]
  };

  return (
    <>



      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />


      <IndexPage />

    </>
  )
}
