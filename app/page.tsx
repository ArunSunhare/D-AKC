import { TopHeader } from "./componets/top_header";
import { LowerHeader } from "./componets/lower_header";
import { Hero } from "./componets/hero";
import { ExploreMore } from "./componets/explore";
// import { Announcements } from "./components/Announcements";
import { PopularTests } from "./componets/popular_test";
import { HealthPackages } from "./componets/health_packgae";
import { Facilities } from "./componets/facilities";
import { WhyChooseUs } from "./componets/WhyChooseUs";
import { Testimonials } from "./componets/Testimonials";
import { Footer } from "./componets/footer";
import Header from     "./componets/header"
import { DR_Qualification } from "./componets/dr_qualification";
import { DoctorsSection } from "./componets/doctors";
import { VideoSection } from "./componets/video_section";
import { GallerySection } from "./componets/gallery";
import { OnlineReportsSection } from "./componets/online_reports";
import { SocialFollowSection } from "./componets/social_follow";
import { Disclaimer } from "./componets/disclamer";
import { TopNavbar } from "./componets/TopNavbar";
import { MainNavbar } from "./componets/MainNavbar";
export default function App() {
  return (
    <div className="min-h-screen bg-white"> 
      <TopHeader />
      <TopNavbar />
      <MainNavbar />
      <Header />
      <Disclaimer />
      <ExploreMore />
      <PopularTests />
      <HealthPackages />
      <Facilities />
      <DoctorsSection />
      <WhyChooseUs />
      <Testimonials />
      <Footer />
    </div>
  );
}
