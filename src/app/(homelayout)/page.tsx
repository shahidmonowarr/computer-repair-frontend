import HeroSection from "@/components/Home/HeroSection";
import HighlightSection from "@/components/Home/HighlightSection";
import NewsLetter from "@/components/Home/NewsLetter/NewsLetter";
import BlogSection from "@/components/Home/blogSection/BlogSection";
import BookingSection from "@/components/Home/bookingSection/BookingSection";
import Faqs from "@/components/Home/faqs/Faqs";
import FeedbackSection from "@/components/Home/feedbackSection/FeedbackSection";
import ServiceSection from "@/components/Home/serviceSection/ServiceSection";

export default function Home() {
  return (
    <div className="">
      <div className="container">
        <HeroSection />
      </div>
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          <HighlightSection />
        </div>
        <div className="max-w-7xl mx-auto">
          <ServiceSection />
        </div>
        <div className="max-w-7xl mx-auto">
          <BookingSection />
        </div>
        <div className="max-w-7xl mx-auto">
          <BlogSection />
        </div>
        <div className="max-w-7xl mx-auto">
          <Faqs />
        </div>
        <div className="max-w-7xl mx-auto">
          <FeedbackSection />
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        <NewsLetter />
      </div>
    </div>
  );
}
