
"use client"
import Footer from "@/component/Footer";
import Header from "@/component/Header";
import Blogs from "@/Pages/HomePage/Blog/Blogs";
import DestinationSection from "@/Pages/HomePage/DestinationSection/DestinationSection";
import ExperienceExploreSection from "@/Pages/HomePage/ExpereinceExploreSection/ExperienceExploreSection";
import GetOfferSection from "@/Pages/HomePage/GetOfferSection/GetOfferSection";
import HomeBannerSection from "@/Pages/HomePage/HomeBannerSection";
import RecomendSection from "@/Pages/HomePage/RecommendedSection/RecomendSection";
// import SearchSection from "@/Pages/HomePage/SearchSectionhhh";
import "../style/responsive.css"

export default function Home() {
  return (
    <>



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
