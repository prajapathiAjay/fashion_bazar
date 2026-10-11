import Hero from "../components/Hero";
import CategoryStrip from "../components/CategoryStrip";
import FeaturedProducts from "../components/FeaturedProducts";
import PromoBanner from "../components/PromoBanner";
import TrustBadges from "../components/TrustBanges";
import Newsletter from "../components/NewsLetter";

const Home = () => {
  return (
    <>
      <Hero />
      <CategoryStrip />
      <FeaturedProducts />
      <PromoBanner />
      <TrustBadges />
      <Newsletter />
    </>
  );
};

export default Home;
