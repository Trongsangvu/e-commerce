import { useRef } from "react";
import HomeBanner from "../components/home/home-banner";
import HomeAnnouncementBar from "../components/home/home-announcement-bar";
import HomeBenefits from "../components/home/home-benefits";
import HomeCustomerReviews from "../components/home/home-customer-review";
import HomeHero from "../components/home/home-hero";
import HomeProductSection from "../components/home/home-product-section";
import HomeSaleBanner from "../components/home/home-sale-banner";
import HomeSubscribeSection from "../components/home/home-subscribe-section";
import useBannerVisibility from "../hooks/use-banner-visibility";

const HomePage = () => {
  const bannerRef = useRef<HTMLDivElement>(null);
  const isBannerVisible = useBannerVisibility(bannerRef);

  return (
    <div className="flex flex-col min-h-screen bg-[#fefcf8] text-[#0f0e0c] overflow-x-hidden font-['DM_Sans',sans-serif]">
      <main className="grow">
        <HomeHero bannerRef={bannerRef} isBannerVisible={isBannerVisible} />

        <HomeAnnouncementBar />

        <HomeBenefits />

        <HomeBanner />

        <HomeProductSection />

        <HomeSaleBanner />

        <HomeCustomerReviews />

        <HomeSubscribeSection />
      </main>
    </div>
  );
};

export default HomePage;