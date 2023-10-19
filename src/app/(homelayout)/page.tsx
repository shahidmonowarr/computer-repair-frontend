import HeroSection from "@/components/Home/HeroSection";
import HighlightSection from "@/components/Home/HighlightSection";
import ServiceSection from "@/components/Home/serviceSection/ServiceSection";

export default function Home() {
  return (
    <div className="container mx-auto px-6 py-12">
      <div className="max-w-7xl mx-auto">
        <HeroSection />
      </div>
      <div className="max-w-7xl mx-auto">
        <HighlightSection />
      </div>
      <div className="max-w-7xl mx-auto">
        <ServiceSection />
      </div>
    </div>
  );
}
