"use client";
import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image"; 

export function DR_Qualification() {
  const doctors = [
    // { id: 1, name: "Dr. Priyanka Thakran", qual: "M.B.B.S., D.M.R.D., D.N.B. (Radio-diagnosis), LL.B.", specialty: "Radiologist", img: "/images/dr_priyanka.png" },
    { id: 2, name: "Dr. Saurabh Suman", qual: "M.B.B.S., M.D. Radio-diagnosis", specialty: "Radiologist", img: "/assets/DR. SAURABH SUMAN.png" },
    { id: 3, name: "Dr. Vinesh Kumar", qual: "M.B.B.S., M.D. Radio-diagnosis", specialty: "Radiologist", img: "/assets/DR. VINESH KUMAR.png" },
    { id: 4, name: "Dr. Anuj Aggarwal", qual: "M.B.B.S., M.D. Radio-diagnosis", specialty: "Radiologist", img: "/assets/DR. ANUJ AGGARWAL.png" },
    { id: 5, name: "Dr. N. Savita", qual: "M.B.B.S., DMRT, CIRTI. (RSO) (NM)", specialty: "Nuclear Medicine", img: "/assets/DR. N SAVITA.png" },
    { id: 6, name: "Dr. Beauty Sarkar", qual: "M.B.B.S., M.D. Pathology", specialty: "Pathologist", img: "/assets/DR. BEAUTY SARKAR.png" },
    { id: 7, name: "Dr. Bharat Singh", qual: "M.B.B.S., M.D. Pathology", specialty: "Pathologist", img: "/assets/DR. BHARAT SINGH.png" },
    { id: 8, name: "Dr. T. Aruna Sumanthini", qual: "M.B.B.S., DMRT, D.N.B. (RT)", specialty: "Oncologist", img: "/assets/DR. T. ARUNA SUMANTHINI.png" },
    { id: 9, name: "Dr. Raman Narang", qual: "M.B.B.S., D.N.B. (RT), Dr.N.B. (MEDICAL ONCOLOGY)", specialty: "Medical Oncologist", img: "/assets/DR. RAMAN NARANG.png" },
    { id: 10, name: "Dr. Kamaldeep", qual: "M.B.B.S., M.S. (GENERAL SURGERY)", specialty: "General Surgeon", img: "/assets/DR. KAMAL DEEP.png" },
    { id: 11, name: "Dr. Amit Jaiswal", qual: "M.B.B.S., M.D.(PHYSICIAN)", specialty: "Physician", img: "/assets/DR. AMIT JAISWAL.png" },
    { id: 12, name: "Dr. Rajeev Saini", qual: "M.B.B.S., M.D.(PHYSICIAN)", specialty: "Physician", img: "/assets/DR. RAJEEV SAINI.png" },
    { id: 13, name: "Dr. Santosh Kumari", qual: "M.B.B.S., M.D. (Obst. & Gynae)", specialty: "Gynaecologist", img: "/assets/DR. SANTOSH KUMARI.png" },
    { id: 14, name: "Dr. Usha Upreti", qual: "M.B.B.S., M.D. (Obst. & Gynae)", specialty: "Gynaecologist", img: "/assets/DR. USHA UPRETI.png" },
    { id: 15, name: "Dr. Manju Gupta", qual: "M.B.B.S., DLO (L.H.M.C.)", specialty: "ENT", img: "/assets/DR. MANJU GUPTA.png" },
    { id: 16, name: "Dr. Ritesh Bansal", qual: "M.B.B.S., M.D (S.P.M.). M.R.C.P.", specialty: "Diabetologist", img: "/assets/DR. RITESH BANSAL.png" },
    { id: 17, name: "Dr. Prince Nigam", qual: "M.B.B.S., DVD", specialty: "Dermatologist", img: "/assets/DR. PRINCE NIGAM.png" },
    { id: 18, name: "Dr. Taruna Mehra", qual: "M.B.B.S. M.D. (Paediatrics)", specialty: "Paediatrics", img: "/assets/DR. TARUNA MEHRA.png" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % doctors.length);
    }, 3000); // Slides every 3 seconds

    return () => clearInterval(interval);
  }, [doctors.length]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + doctors.length) % doctors.length);
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % doctors.length);
  };

  const currentDoctor = doctors[currentIndex];

  return (
    <>
      <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-2">
              Our Expert Doctors
            </h2>
            <div className="w-20 h-1 bg-red-600 mx-auto mb-4"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Meet our team of highly qualified and experienced medical professionals
            </p>
          </div>

          {/* Main Slider Container */}
          <div className="relative max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                {/* Doctor Image - Circular */}
                <div className="flex justify-center">
                  <div className="relative w-64 h-64 md:w-80 md:h-80">
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-red-600 rounded-full opacity-20 blur-xl"></div>
                    <Image
                      src={currentDoctor.img}
                      alt={currentDoctor.name}
                      fill
                      className="rounded-full object-cover border-6 border-white shadow-2xl relative z-10"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    {/* Decorative Ring */}
                    <div className="absolute inset-0 rounded-full border-4 border-orange-200 opacity-50 z-0"></div>
                  </div>
                </div>

                {/* Doctor Information */}
                <div className="text-center lg:text-left">
                  <h3 className="text-3xl font-bold text-gray-900 mb-3">
                    {currentDoctor.name}
                  </h3>
                  
                  <div className="inline-block bg-gradient-to-r from-orange-500 to-red-600 text-white text-lg font-semibold px-4 py-2 rounded-full mb-4">
                    {currentDoctor.specialty}
                  </div>
                  
                  <p className="text-gray-600 text-lg leading-relaxed mb-6">
                    {currentDoctor.qual}
                  </p>

                  {/* Navigation Buttons */}
                  <div className="flex justify-center lg:justify-start gap-4">
                    <button
                      onClick={goToPrevious}
                      className="w-12 h-12 bg-gray-100 hover:bg-orange-100 rounded-full flex items-center justify-center transition-colors group"
                    >
                      <ChevronLeft className="w-6 h-6 text-gray-600 group-hover:text-orange-600 transition-colors" />
                    </button>
                    <button
                      onClick={goToNext}
                      className="w-12 h-12 bg-gray-100 hover:bg-orange-100 rounded-full flex items-center justify-center transition-colors group"
                    >
                      <ChevronRight className="w-6 h-6 text-gray-600 group-hover:text-orange-600 transition-colors" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Dots */}
            <div className="flex justify-center gap-2 mt-8">
              {doctors.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-3 rounded-full transition-all duration-300 ${
                    idx === currentIndex 
                      ? "w-8 bg-gradient-to-r from-orange-500 to-red-600" 
                      : "w-3 bg-gray-300 hover:bg-gray-400"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Additional Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">18+</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Expert Doctors</h4>
              <p className="text-gray-600 text-sm">Highly qualified medical professionals</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">15+</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Specialties</h4>
              <p className="text-gray-600 text-sm">Comprehensive medical specialties</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">24/7</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Available</h4>
              <p className="text-gray-600 text-sm">Round-the-clock medical care</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}