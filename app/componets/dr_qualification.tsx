"use client";
import React, { useState, useEffect } from "react";
// If you are using standard React without Next.js, use <img /> instead of <Image />
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
    }, 2000); // Slides every 2 seconds

    return () => clearInterval(interval);
  }, [doctors.length]);

  const currentDoctor = doctors[currentIndex];

  return (
    <>
      <section className="flex flex-col items-center justify-center py-10 min-h-[400px]">
        {/* Card Container */}
        <div className="w-full max-w-lg bg-gray-50 rounded-2xl shadow-xl p-8 flex flex-col items-center transition-all duration-300">
          
          {/* Circular Image */}
          <div className="relative w-40 h-40 mb-6">
            <Image
              src={currentDoctor.img}
              alt={currentDoctor.name}
              fill
              className="rounded-full object-cover border-4 border-blue-500 shadow-md"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>

          {/* Text Content */}
          <h1 className="text-2xl font-bold text-gray-800 text-center mb-2">
            {currentDoctor.name}
          </h1>
          
          <span className="bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full mb-4">
            {currentDoctor.specialty}
          </span>
          
          <p className="text-gray-600 text-center text-sm leading-relaxed">
            {currentDoctor.qual}
          </p>
        </div>

        {/* Optional Progress Dots */}
        <div className="flex gap-2 mt-6">
          {doctors.map((_, idx) => (
            <div
              key={idx}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === currentIndex ? "w-6 bg-blue-600" : "w-2 bg-gray-300"
              }`}
            />
          ))}
        </div>
      </section>
    </>
  );
}