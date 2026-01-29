"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    id: 1,
    leftImage: "/assets/person-left.png",
    centerLogo: "/assets/Logo_Embossed.png",
    rightImage: "/assets/person-right.png",
    slogan: "नासै रोग हरे सब पीरा, जपत निरंतर हनुमत बीरा"
  },
  {
    id: 2,
    leftImage: "/assets/person-left.png",
    centerLogo: "/assets/Logo_Embossed.png",
    rightImage: "/assets/person-right.png",
    slogan: "Your Health, Our Priority - Advanced Diagnostics"
  },
  {
    id: 3,
    leftImage: "/assets/person-left.png",
    centerLogo: "/assets/Logo_Embossed.png",
    rightImage: "/assets/person-right.png",
    slogan: "Comprehensive Healthcare Services Under One Roof"
  }
];

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
      <section className="relative  bg-gradient-to-r from-blue-50 via-sky-100 to-blue-50 py-8 md:py-12 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-3 gap-2 md:gap-4 lg:gap-8 items-center relative px-2">
            {/* Left Image */}
            <div className="flex justify-center order-1">
              <img
                src={slides[currentSlide].leftImage}
                alt="Healthcare Professional"
                className="w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-56 lg:h-56 object-cover rounded-full border-2 border-white shadow-lg"
              />
            </div>

            {/* Center Content */}
            <div className="text-center relative order-2 px-1">
              <img
                src={slides[currentSlide].centerLogo}
                alt="Center Icon"
                className="absolute left-1/2 -top-2 sm:-top-4 md:-top-6 lg:-top-40 transform -translate-x-1/2 w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-32 lg:h-32 object-contain"
              />
              <h1 className="text-xs sm:text-sm md:text-base lg:text-3xl text-orange-600 drop-shadow-sm font-semibold leading-tight">
                {slides[currentSlide].slogan}
              </h1>
              <div className="flex justify-center mt-1 md:mt-2 lg:mt-4">
                <div className="w-8 h-0.5 sm:w-10 sm:h-1 md:w-12 lg:w-16 bg-red-600 rounded-full"></div>
              </div>
            </div>

            {/* Right Image */}
            <div className="flex justify-center order-3">
              <img
                src={slides[currentSlide].rightImage}
                alt="Healthcare Leader"
                className="w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-56 lg:h-56 object-cover rounded-full border-2 border-white shadow-lg"
              />
            </div>
          </div>

          {/* Slider Indicators */}
          <div className="flex justify-center gap-2 mt-6">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  currentSlide === index ? "bg-orange-600 w-8" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
