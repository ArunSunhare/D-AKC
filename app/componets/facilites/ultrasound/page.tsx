"use client";

import Image from "next/image";
import { useState } from "react";
import { Navigation } from "@/app/componets/navbar";
import { Footer } from "@/app/componets/footer";
import { TopHeader } from "../../top_header";
import { TopNavbar } from "../../TopNavbar";
import { MainNavbar } from "../../MainNavbar";

const ultrasoundImages = [
  { src: "/assets/diagnostics/USG.jpg", title: "Advanced Ultrasound System" },
];

export default function UltrasoundPage() {
  const [activeImage, setActiveImage] = useState<null | typeof ultrasoundImages[0]>(null);

  return (
    <div className="min-h-screen bg-white">
      <TopHeader />
            <TopNavbar />
            <MainNavbar />

      <section className="relative bg-gradient-to-r from-gray-700 to-gray-600 py-16 overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <Image
            src="/assets/diagnostics/USG.jpg"
            alt="Ultrasound Imaging Facility"
            fill
            priority
            className="object-cover"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-white mb-4 text-4xl md:text-5xl font-bold">
              Advanced Ultrasound Imaging
            </h1>
            <p className="text-white/90 text-lg md:text-xl">
              Safe Imaging • Real-time Diagnosis • Non-invasive Technology
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-8 md:p-12 lg:p-16 space-y-10 text-gray-800 leading-relaxed text-lg">

            <p className="text-justify">
              The <strong>Ultrasound Imaging Department</strong> at{" "}
              <strong>Shri Hanuman Balaji Charitable Diagnostic Centre</strong>{" "}
              is equipped with state-of-the-art ultrasound systems that provide high-quality real-time imaging without any radiation exposure. Our advanced ultrasound technology ensures safe and accurate diagnosis for various medical conditions.
            </p>

            <div className="bg-blue-50 border-l-4 border-blue-600 p-8 rounded-r-xl">
              <p className="text-xl font-semibold text-blue-800 italic text-center">
                Safe ultrasound imaging at affordable costs - radiation-free healthcare for all
              </p>
            </div>

            <p className="text-justify">
              Our ultrasound services include{" "}
              <strong>
                Abdominal Ultrasound, Pelvic Ultrasound, Obstetric Ultrasound,
                Cardiac Ultrasound (Echocardiography), Vascular Doppler Studies,
                Musculoskeletal Ultrasound, and Breast Ultrasound
              </strong>.
              All ultrasound examinations are conducted by skilled sonographers
              and radiologists using advanced imaging protocols.
            </p>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Ultrasound Equipment & Technology
              </h2>

              <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6">
                {ultrasoundImages.map((img: typeof ultrasoundImages[0], index: number) => (
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
                radiation-free imaging, real-time visualization, accurate diagnosis,
                and patient comfort during ultrasound procedures
              </strong>.
              Special care is provided to pediatric patients, pregnant women, and elderly patients
              with gentle scanning techniques and comfortable positioning.
            </p>

            <div className="mt-12 bg-gradient-to-r from-blue-100 to-blue-50 p-10 rounded-xl text-center">
              <p className="text-2xl font-bold text-blue-700">
                Advanced Ultrasound Analysis • Safe Diagnosis • Patient Comfort
              </p>
              <p className="mt-4 text-gray-700">
                Cutting-edge ultrasound technology for radiation-free medical imaging
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