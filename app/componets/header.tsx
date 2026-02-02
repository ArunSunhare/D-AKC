"use client";

import { useState, useEffect } from "react";

const slides = [
  { id: 1, backgroundImage: "/assets/banner/IMG_0201.JPG" },
  { id: 2, backgroundImage: "/assets/banner/IMG_0201.JPG" },
  { id: 3, backgroundImage: "/assets/banner/IMG_0205.JPG" },
  { id: 4, backgroundImage: "/assets/banner/IMG_20260131_100043.jpg" },
  { id: 5, backgroundImage: "/assets/banner/IMG-20260130-WA0031.jpg" },
];

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      className="relative w-full h-screen overflow-hidden transition-all duration-1000"
      style={{
        backgroundImage: `url(${slides[currentSlide].backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Optional overlay */}
      {/* <div className="absolute inset-0 bg-black/30"></div> */}
    </section>
  );
}
