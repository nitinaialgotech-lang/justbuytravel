import Footer from "@/component/Footer";
import Header from "@/component/Header";
import Blogs from "@/Components/HomePage/Blog/Blogs";
import DestinationSection from "@/Components/HomePage/DestinationSection/DestinationSection";
import ExperienceExploreSection from "@/Components/HomePage/ExpereinceExploreSection/ExperienceExploreSection";
import GetOfferSection from "@/Components/HomePage/GetOfferSection/GetOfferSection";
import HomeBannerSection from "@/Components/HomePage/HomeBannerSection";
import RecomendSection from "@/Components/HomePage/RecommendedSection/RecomendSection";
// import SearchSection from "@/Components/HomePage/SearchSectionhhh";
import "../style/responsive.css"

export const metadata = {
  title: "Just Buy Travel: Trusted Reviews, Travel Deals & Destination Ideas",
  description: "Travel made easy with Just Buy Travel. Explore honest reviews, best hotel offers, tours, attractions & dining deals—all in one place. Find the best travel deals and book your perfect vacation.",
  keywords: "travel deals, hotel reviews, travel booking, vacation packages, destination guides, travel tips, hotel comparison, travel offers, cheap flights, travel destinations",
  openGraph: {
    title: "Just Buy Travel: Trusted Reviews, Travel Deals & Destination Ideas",
    description: "Travel made easy with Just Buy Travel. Explore honest reviews, best hotel offers, tours, attractions & dining deals—all in one place.",
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
      <Header />
      {/* <SearchSection /> */}
      <HomeBannerSection />
      <div className="container">
        <DestinationSection />
        <RecomendSection />
        <GetOfferSection />
        <ExperienceExploreSection />
        <Blogs />
      </div>
      <Footer />
    </>
  )
}
