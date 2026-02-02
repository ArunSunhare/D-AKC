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
    backgroundImage: "http://localhost:3000/assets/banner/IMG_0201.JPG",
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
      
        <div className="container mx-auto px-4">
          {/* <div className="grid grid-cols-3 gap-2 md:gap-4 lg:gap-8 items-center relative px-2">
          
            <div className="flex justify-center order-1">
              <img
                src={staticImages.leftImage}
                alt="Healthcare Professional"
                className="w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-56 lg:h-56 object-cover rounded-full border-2 border-white shadow-lg"
              />
            </div>

         
            <div className="text-center relative order-2 px-1">
              <img
                src={staticImages.centerLogo}
                alt="Center Icon"
                className="absolute left-1/2 -top-2 sm:-top-4 md:-top-6 lg:-top-40 transform -translate-x-1/2 w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-32 lg:h-32 object-contain"
              />
              <h1 className="text-xs sm:text-sm md:text-base lg:text-3xl text-white drop-shadow-lg font-semibold leading-tight">
                {slides[currentSlide].slogan}
              </h1>
              <div className="flex justify-center mt-1 md:mt-2 lg:mt-4">
                <div className="w-8 h-0.5 sm:w-10 sm:h-1 md:w-12 lg:w-16 bg-white rounded-full"></div>
              </div>
            </div>

         
            <div className="flex justify-center order-3">
              <img
                src={staticImages.rightImage}
                alt="Healthcare Leader"
                className="w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-56 lg:h-56 object-cover rounded-full border-2 border-white shadow-lg"
              />
            </div>
          </div> */}

          {/* Slider Indicators */}
          <div className="flex justify-center gap-2 mt-120">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  currentSlide === index ? "bg-white w-8" : "bg-white bg-opacity-50"
                }`}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
