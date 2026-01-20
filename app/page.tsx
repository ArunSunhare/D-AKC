import { Navigation } from "./componets/navbar";
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
export default function App() {
  return (
    <div className="min-h-screen bg-white">
      
      <Navigation />
      <Header />
      {/* <Hero /> */}
      <ExploreMore />
      <DR_Qualification />
      <PopularTests />
      <HealthPackages />
      <Facilities />
      <WhyChooseUs />
      <Testimonials />
      <Footer />
    </div>
  );
}
