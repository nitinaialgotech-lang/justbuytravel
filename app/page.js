import Header from "@/component/Header";
import DestinationSection from "@/Pages/HomePage/DestinationSection/DestinationSection";
import ExperienceExploreSection from "@/Pages/HomePage/ExpereinceExploreSection/ExperienceExploreSection";
import GetOfferSection from "@/Pages/HomePage/GetOfferSection/GetOfferSection";
import HomeBannerSection from "@/Pages/HomePage/HomeBannerSection";
import RecomendSection from "@/Pages/HomePage/RecommendedSection/RecomendSection";
// import SearchSection from "@/Pages/HomePage/SearchSection";


export default function Home() {
  return (
    <>
      <section className="">
        <Header />
        {/* <SearchSection /> */}
        <HomeBannerSection />
        <DestinationSection />
        <RecomendSection />
        <GetOfferSection />
        <ExperienceExploreSection />
      </section>
    </>

  )
}
