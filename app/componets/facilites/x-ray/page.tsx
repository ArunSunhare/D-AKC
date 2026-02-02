"use client";

import Image from "next/image";
import { useState } from "react";
import { Navigation } from "@/app/componets/navbar";
import { Footer } from "@/app/componets/footer";
import { TopHeader } from "../../top_header";
import { TopNavbar } from "../../TopNavbar";
import { MainNavbar } from "../../MainNavbar";

const xrayImages = [
  { src: "/assets/diagnostics/X-RAY.jpg", title: "Digital X-Ray System" },
  { src: "/assets/diagnostics/OPG.jpeg", title: "OPG Dental X-Ray Machine" },
];

export default function XRayPage() {
  const [activeImage, setActiveImage] = useState<null | typeof xrayImages[0]>(null);

  return (
    <div className="min-h-screen bg-white">
      <TopHeader />
            <TopNavbar />
            <MainNavbar />

      <section className="relative bg-gradient-to-r from-gray-700 to-gray-600 py-16 overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <Image
            src="/assets/diagnostics/X-RAY.jpg"
            alt="X-Ray Imaging Facility"
            fill
            priority
            className="object-cover"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-white mb-4 text-4xl md:text-5xl font-bold">
              Advanced X-Ray Imaging
            </h1>
            <p className="text-white/90 text-lg md:text-xl">
              Precision Diagnosis • Advanced Technology • Patient Safety
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-8 md:p-12 lg:p-16 space-y-10 text-gray-800 leading-relaxed text-lg">

            <p className="text-justify">
              The <strong>X-Ray Imaging Department</strong> at{" "}
              <strong>Shri Hanuman Balaji Charitable Diagnostic Centre</strong>{" "}
              is equipped with state-of-the-art digital X-ray systems that provide high-quality images with minimal radiation exposure. Our advanced X-ray technology ensures precise diagnosis for various medical conditions.
            </p>

            <div className="bg-orange-50 border-l-4 border-orange-600 p-8 rounded-r-xl">
              <p className="text-xl font-semibold text-orange-800 italic text-center">
                Advanced X-ray analysis at affordable costs - precision healthcare for all
              </p>
            </div>

            <p className="text-justify">
              Our X-ray services include{" "}
              <strong>
                Digital Radiography, Chest X-rays, Bone X-rays, Dental X-rays (OPG),
                Abdominal X-rays, and Specialized View X-rays
              </strong>.
              All X-ray examinations are conducted by skilled radiology technologists
              following strict radiation safety protocols and ALARA principles.
            </p>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                X-Ray Equipment & Technology
              </h2>

              <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6">
                {xrayImages.map((img: typeof xrayImages[0], index: number) => (
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
                radiation dose optimization, high-resolution imaging, accurate diagnosis,
                and patient comfort during X-ray procedures
              </strong>.
              Special care is provided to pediatric patients, pregnant women, and elderly patients
              with appropriate radiation shielding and dose adjustments.
            </p>

            <div className="mt-12 bg-gradient-to-r from-orange-100 to-orange-50 p-10 rounded-xl text-center">
              <p className="text-2xl font-bold text-orange-700">
                Advanced X-Ray Analysis • Precise Diagnosis • Patient Safety
              </p>
              <p className="mt-4 text-gray-700">
                Cutting-edge X-ray technology for accurate medical imaging
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
