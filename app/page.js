
"use client"
import Footer from "@/component/Footer";
import Header from "@/component/Header";
import DestinationSection from "@/Pages/HomePage/DestinationSection/DestinationSection";
import ExperienceExploreSection from "@/Pages/HomePage/ExpereinceExploreSection/ExperienceExploreSection";
import GetOfferSection from "@/Pages/HomePage/GetOfferSection/GetOfferSection";
import HomeBannerSection from "@/Pages/HomePage/HomeBannerSection";
import RecomendSection from "@/Pages/HomePage/RecommendedSection/RecomendSection";
// import SearchSection from "@/Pages/HomePage/SearchSectionhhh";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryclient = new QueryClient()
export default function Home() {
  return (
    <>

      <QueryClientProvider client={queryclient}>
        <section className="">
          <Header />
          {/* <SearchSection /> */}
          <HomeBannerSection />
          <DestinationSection />
          <RecomendSection />
          <GetOfferSection />
          <ExperienceExploreSection />
          <Footer />
        </section>
      </QueryClientProvider>

    </>

  )
}
