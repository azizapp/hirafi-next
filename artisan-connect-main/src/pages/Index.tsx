import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import CategoriesSection from "@/components/CategoriesSection";
import FeaturedCraftsmen from "@/components/FeaturedCraftsmen";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <CategoriesSection />
      <FeaturedCraftsmen />
      <Footer />
    </div>
  );
};

export default Index;
