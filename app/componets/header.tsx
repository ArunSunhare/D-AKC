"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, ChevronDown, Menu, X } from "lucide-react";

const slides = [
  { id: 1, backgroundImage: "/assets/banner/Gemini_Generated_Image_te3itite3itite3i.png" },
  { id: 2, backgroundImage: "/assets/banner/Gemini_Generated_Image_ydr3q4ydr3q4ydr3.png" },
  { id: 3, backgroundImage: "/assets/banner/Gemini_Generated_Image_qc0av7qc0av7qc0a.png" },
  { id: 4, backgroundImage: "/assets/banner/Gemini_Generated_Image_w269hww269hww269.png" },
  { id: 5, backgroundImage: "/assets/banner/Gemini_Generated_Image_z41ubxz41ubxz41u.png" }
];

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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

  const dropdownItems = [
    { name: "Book Appointment", href: "/book-appointment" },
    { name: "View Reports", href: "/reports" },
    { name: "Health Packages", href: "/health-packages" },
    { name: "Find Tests", href: "/investigations" },
    { name: "Emergency Services", href: "/emergency" }
  ];

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
       
        {/* Dropdown Menu */}
        <div className="absolute top-4 right-4 z-10">
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 hover:bg-white transition-all duration-200"
            >
              <Menu className="w-5 h-5 text-gray-700" />
              <span className="text-gray-700 font-medium">Quick Access</span>
              <ChevronDown className={`w-4 h-4 text-gray-700 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {isDropdownOpen && (
              <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden">
                {dropdownItems.map((item, index) => (
                  <a
                    key={index}
                    href={item.href}
                    className="block px-4 py-3 text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors duration-200 border-b border-gray-100 last:border-b-0"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>

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