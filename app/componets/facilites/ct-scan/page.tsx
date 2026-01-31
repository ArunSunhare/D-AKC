"use client";

import Image from "next/image";
import { useState } from "react";
import { Navigation } from "@/app/componets/navbar";
import { Footer } from "@/app/componets/footer";
import { MainNavbar } from "../../MainNavbar";
import { TopNavbar } from "../../TopNavbar";
import { TopHeader } from "../../top_header";

const ctScanImages = [
  { src: "/assets/diagnostics/CT.jpg", title: "Philips CT Scanner" },
  { src: "/assets/diagnostics/MRI.jpg", title: "MRI Scanner" },
  { src: "/assets/diagnostics/PET-CT.jpg", title: "PET-CT Scanner (Siemens Biograph Horizon)" },
  { src: "/assets/diagnostics/X-RAY.jpg", title: "Digital X-Ray System" },
  { src: "/assets/diagnostics/USG.jpg", title: "Ultrasound (USG) Machine" },
  { src: "/assets/diagnostics/ECG.jpg", title: "ECG Machine" },
  { src: "/assets/diagnostics/OPG.jpeg", title: "OPG Dental X-Ray Machine" },
  { src: "/assets/diagnostics/TRUEBEAM MACHINE.jpeg", title: "TrueBeam Radiotherapy Machine" },
];

export default function CTScanPage() {
  const [activeImage, setActiveImage] = useState<null | typeof ctScanImages[0]>(null);

  return (
    <div className="min-h-screen bg-white">
      <TopHeader/>
            <TopNavbar />
            <MainNavbar />

      <section className="relative bg-gradient-to-r from-gray-700 to-gray-600 py-16 overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <Image
            src="/assets/diagnostics/CT.jpg"
            alt="Diagnostic Imaging Facility"
            fill
            priority
            className="object-cover"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-white mb-4 text-4xl md:text-5xl font-bold">
              Advanced Diagnostic Imaging
            </h1>
            <p className="text-white/90 text-lg md:text-xl">
              Precision • Speed • Compassionate Healthcare
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-8 md:p-12 lg:p-16 space-y-10 text-gray-800 leading-relaxed text-lg">

            <p className="text-justify">
              The <strong>Diagnostic Imaging Facility</strong> at{" "}
              <strong>Shri Hanuman Balaji Charitable Diagnostic Centre</strong>{" "}
              is equipped with state-of-the-art imaging systems from globally
              trusted manufacturers. Our goal is to deliver accurate diagnosis
              with maximum patient safety and comfort.
            </p>

            <div className="bg-orange-50 border-l-4 border-orange-600 p-8 rounded-r-xl">
              <p className="text-xl font-semibold text-orange-800 italic text-center">
                World-class diagnostics at subsidized cost – true charitable healthcare
              </p>
            </div>

            <p className="text-justify">
              Our services include{" "}
              <strong>
                CT Scan, MRI, PET-CT, Digital X-Ray, Ultrasound (USG),
                ECG, OPG Dental Imaging, and Advanced Radiotherapy
              </strong>.
              All investigations are conducted by skilled technologists under
              strict quality and safety protocols.
            </p>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Diagnostic Infrastructure
              </h2>

              <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {ctScanImages.map((img, index) => (
                  <div
                    key={index}
                    onClick={() => setActiveImage(img)}
                    className="rounded-xl overflow-hidden shadow-md bg-white hover:shadow-xl transition-shadow cursor-pointer"
                  >
                    <div className="relative aspect-[4/3]">
                      <Image
                        src={img.src}
                        alt={img.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-4 text-center text-sm font-semibold text-gray-700">
                      {img.title}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-justify">
              We emphasize{" "}
              <strong>
                radiation dose optimization, fast reporting, diagnostic accuracy,
                and patient comfort
              </strong>.
              Special care is provided to elderly patients and economically
              weaker sections with complete dignity and support.
            </p>

            <div className="mt-12 bg-gradient-to-r from-orange-100 to-orange-50 p-10 rounded-xl text-center">
              <p className="text-2xl font-bold text-orange-700">
                Accurate Diagnosis • Compassionate Care • Affordable Access
              </p>
              <p className="mt-4 text-gray-700">
                Advanced diagnostics in service of humanity
              </p>
            </div>

          </div>
        </div>
      </div>

      {activeImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
          onClick={() => setActiveImage(null)}
        >
          <button
            className="absolute top-6 right-6 text-white text-3xl font-bold"
            onClick={() => setActiveImage(null)}
          >
            ✕
          </button>

          <div
            className="relative w-[90vw] h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={activeImage.src}
              alt={activeImage.title}
              fill
              className="object-contain"
            />
            <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-lg font-semibold">
              {activeImage.title}
            </p>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
