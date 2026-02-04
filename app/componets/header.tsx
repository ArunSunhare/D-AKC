"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  { id: 1, backgroundImage: "/assets/banner/Gemini_Generated_Image_te3itite3itite3i.png" },
  { id: 2, backgroundImage: "/assets/banner/Gemini_Generated_Image_ydr3q4ydr3q4ydr3.png" },
  { id: 3, backgroundImage: "/assets/banner/Gemini_Generated_Image_qc0av7qc0av7qc0a.png" },
  { id: 4, backgroundImage: "/assets/banner/Gemini_Generated_Image_w269hww269hww269.png" },
  { id: 5, backgroundImage: "/assets/banner/Gemini_Generated_Image_z41ubxz41ubxz41u.png" }
];

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-slide logic
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="bg-gray-20">
      <section 
        className="relative h-[220px] sm:h-[280px] md:h-[350px] lg:h-[450px] overflow-hidden transition-all duration-700 ease-in-out z-0"
        style={{
          backgroundImage: `url(${slides[currentSlide].backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat"
        }}
      >
       
        <div className="absolute bottom-6 left-6 flex items-center gap-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-300 rounded-full ${
                currentSlide === index 
                  ? "w-6 h-6 bg-orange-500 border-4 border-gray-400"
                  : "w-4 h-4 bg-white hover:bg-gray-200"       
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <div className="container mx-auto px-4">
          <div className="grid grid-cols-3 gap-2 md:gap-4 lg:gap-8 items-center relative px-2">
      
          </div>
        </div>
      </section>
    </div>
  );
}