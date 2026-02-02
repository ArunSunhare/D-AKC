"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    id: 1,
    backgroundImage: "/assets/banner/IMG_0201.JPG",
    slogan: "नासै रोग हरे सब पीरा, जपत निरंतर हनुमत बीरा"
  },
  {
    id: 2,
    backgroundImage: "/assets/banner/IMG_0201.JPG",
    slogan: "Your Health, Our Priority - Advanced Diagnostics"
  },
  {
    id: 3,
    backgroundImage: "/assets/banner/IMG_0205.JPG",
    slogan: "Comprehensive Healthcare Services Under One Roof"
  },
  {
    id: 4,
    backgroundImage: "/assets/banner/IMG_20260131_100043.jpg",
    slogan: "Trusted Diagnostics with Modern Technology"
  },
  {
    id: 5,
    backgroundImage: "/assets/banner/IMG-20260130-WA0031.jpg",
    slogan: "Affordable & Reliable Healthcare Services"
  }
];

const staticImages = {
  leftImage: "/assets/person-left.png",
  centerLogo: "/assets/Logo_Embossed.png",
  rightImage: "/assets/person-right.png"
};

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="bg-gray-20 ">
      <section 
        className="relative h-[220px] sm:h-[280px] md:h-[350px] lg:h-[450px] overflow-hidden transition-all duration-1000 z-0"
        style={{
         
          backgroundImage: `url(${slides[currentSlide].backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat"
        }}
        >
        {/* <div className="absolute inset-0 bg-black bg-opacity-40"></div> */}
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-3 gap-2 md:gap-4 lg:gap-8 items-center relative px-2">
          </div>
        </div>
      </section>
    </div>
  );
}
