"use client";

import { useParams, useRouter } from "next/navigation";
import { TestTube, Activity, ArrowLeft, Phone, MapPin, ChevronDown } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/app/context/CartContext";
import { Navigation } from "@/app/componets/navbar";
import { Footer } from "@/app/componets/footer";


/* =======================
   TEST DATA
======================= */
const tests = [
  {
    slug: "whole-body-mrcp-scan",
    name: "Whole Body PET-CT Scan (FDG)",
    subtitle: "Scan | PET-CT Scan",
    price: "₹11999",
    originalPrice: "₹23998",
    parameters: 1,
    reportTat: "Same Day*",
    description:
      "A Whole Body FDG PET CT scan is a nuclear medicine imaging test used commonly to detect a range of cancers, heart diseases, neurological conditions, infections and PUO (Pyrexia of Unknown Origin). A radioactive glucose tracer (18F FDG) is injected and the uptake by tissues, which are in fasting state in your body, is measured by the PET Scanner. This Whole Body PET CT Scan is most commonly used for Detection, Staging and Treatment Response for a variety of Cancers.",
    alsoKnownAs: [
      "18 F FDG PET/CT Whole Body",
      "PET CT Whole Body FDG",
      "FDG Whole Body PET CT",
      "Whole Body PET FDG",
      "PETCT"
    ],
    specialization: "Cancer Care",
    testPreparation:
      "4-6 hours of fasting required but Overnight fasting is prefered. During fasting only plain water is allowed. Urea & Creatinine report is Required within last 15 days. Diabetic patients should have light breakfast 4 to 6 hours before the test time on the day of test, and must take the advised medications prescribed. It is important NOT TO MISS the diabetic medication in the morning of the test date. DO NOT TAKE INSULIN on the day of the test, before the test. Must inform us about your diabetic history for us to plan needful for your test. Please carry old report/CD. One attendant mandatory fo",
    centres: ["Green Park"],
    faqs: [
      {
        question: "What is a PET-CT scan?",
        answer: "A PET-CT scan combines positron emission tomography (PET) and computed tomography (CT) to create detailed images of organs and tissues."
      },
      {
        question: "Why do I need a PET-CT scan?",
        answer: "PET-CT scans are commonly used to detect cancer, heart diseases, neurological conditions, and infections."
      },
      {
        question: "How does PET-CT work?",
        answer: "A radioactive tracer is injected into your body, which is absorbed by tissues. The PET scanner detects this tracer to create images."
      },
      {
        question: "What happens after the PET Scan?",
        answer: "After the scan, you can resume normal activities. The radioactive tracer will naturally leave your body through urine."
      },
      {
        question: "What are the risks associated with a PET-CT scan?",
        answer: "PET-CT scans are generally safe. The amount of radiation exposure is minimal and the benefits outweigh the risks."
      },
      {
        question: "How soon can I see my PET-CT scan report?",
        answer: "Reports are typically available on the same day or within 24-48 hours depending on the facility."
      }
    ]
  },
  {
    slug: "cbc-test",
    name: "CBC Test (Complete Blood Count)",
    subtitle: "Blood Test | CBC",
    price: "₹499",
    originalPrice: "₹699",
    parameters: 25,
    reportTat: "24 Hours*",
    description:
      "A Complete Blood Count (CBC) is a blood test used to evaluate your overall health and detect a wide range of disorders, including anemia, infection and leukemia. A complete blood count test measures several components and features of your blood, including: Red blood cells, which carry oxygen. White blood cells, which fight infection. Hemoglobin, the oxygen-carrying protein in red blood cells. Hematocrit, the proportion of red blood cells to the fluid component, or plasma, in your blood. Platelets, which help with blood clotting.",
    alsoKnownAs: [
      "Complete Blood Count",
      "Hemogram",
      "CBC",
      "Full Blood Count"
    ],
    specialization: "General Pathology",
    testPreparation:
      "No special preparation is required for a CBC test. You can eat and drink normally before the test. However, if your blood sample will also be used for other tests, you may need to fast for a certain period of time. Your doctor will give you specific instructions.",
    centres: ["Green Park", "Hauz Khas", "Saket"],
    faqs: [
      {
        question: "What does a CBC test detect?",
        answer: "A CBC test can help detect a variety of conditions, including anemia, infection, inflammation, bleeding disorders, and leukemia."
      },
      {
        question: "Do I need to fast for a CBC test?",
        answer: "Generally, no fasting is required for a standalone CBC test. However, follow your doctor's instructions if other tests are included."
      },
      {
        question: "How is the test performed?",
        answer: "A healthcare professional will take a blood sample from a vein in your arm using a small needle."
      },
      {
        question: "When will I get my results?",
        answer: "Results are typically available within 24 hours."
      }
    ]
  }
];

/* =======================
   PAGE
======================= */
export default function TestDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { addToCart } = useCart();
  const [selectedCentre, setSelectedCentre] = useState("HOD Green Park");
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;
  const test = tests.find((t) => t.slug === slug);

  if (!test) {
    return (

      <div className="py-24 text-center text-gray-500 text-lg">
        Test not found
      </div>
    );
  }

  return (
    <>
      <Navigation />

      <section className="bg-gray-100 py-6">
        <div className="max-w-7xl mx-auto px-4">

          {/* Back Button */}
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-700 mb-6 hover:text-orange-600 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back</span>
          </button>

          <div className="grid lg:grid-cols-3 gap-6">

            {/* LEFT CONTENT */}
            <div className="lg:col-span-2 space-y-6">

              {/* Main Info Card */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h1 className="text-3xl font-bold text-blue-900 mb-1">
                  {test.name}
                </h1>
                <p className="text-gray-600 text-sm mb-4">{test.subtitle}</p>

                {/* Price Display (Mobile) */}
                <div className="lg:hidden mb-4">
                  <span className="text-gray-400 line-through text-sm mr-2">
                    {test.originalPrice}
                  </span>
                  <span className="text-3xl font-bold text-orange-600">
                    {test.price}
                  </span>
                </div>

                {/* Also Known As Tags */}
                <div className="mb-4">
                  <h3 className="text-sm font-semibold text-gray-900 mb-2">
                    Also Known As:
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {test.alsoKnownAs.map((item, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1.5 text-sm border border-orange-500 text-orange-600 rounded-full"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-700 leading-relaxed text-justify">
                  {test.description}
                </p>
              </div>

              {/* Includes Parameters */}
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="bg-gray-50 px-6 py-3 border-b">
                  <h3 className="font-bold text-gray-900">
                    Includes {test.parameters} Test Parameters
                  </h3>
                </div>
                <div className="px-6 py-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <TestTube className="w-5 h-5 text-orange-600" />
                    <span className="text-gray-800 font-medium">
                      18 F FDG PET/CT Whole Body
                    </span>
                  </div>
                  <span className="text-orange-600 text-sm font-medium">
                    1 Parameter
                  </span>
                </div>
              </div>

              {/* Test Preparation */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="font-bold text-gray-900 mb-3">
                  Test Preparation:
                </h3>
                <p className="text-gray-700 leading-relaxed text-sm">
                  {test.testPreparation}
                </p>
              </div>

              {/* Reporting TAT */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="font-bold text-gray-900 mb-2">
                  Reporting TAT:
                </h3>
                <p className="text-gray-700">{test.reportTat}</p>
              </div>

              {/* Specializations */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="font-bold text-gray-900 mb-3">
                  Specializations:
                </h3>
                <span className="inline-block bg-orange-50 text-orange-600 px-4 py-2 rounded-full text-sm border border-orange-200">
                  {test.specialization}
                </span>
              </div>

              {/* FAQs */}
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="bg-blue-900 px-6 py-4">
                  <h3 className="text-xl font-bold text-white">
                    Frequently Asked Questions
                  </h3>
                </div>
                <div className="divide-y">
                  {test.faqs.map((faq, idx) => (
                    <div key={idx} className="border-b last:border-b-0">
                      <button
                        onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                        className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors text-left"
                      >
                        <span className="font-semibold text-gray-900 pr-4">
                          {faq.question}
                        </span>
                        <ChevronDown
                          className={`w-5 h-5 text-orange-600 flex-shrink-0 transition-transform ${expandedFaq === idx ? "rotate-180" : ""
                            }`}
                        />
                      </button>
                      {expandedFaq === idx && (
                        <div className="px-6 pb-4 text-gray-700 text-sm">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* RIGHT BOOKING CARD */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">

                <h3 className="text-lg font-bold text-blue-900 mb-4">
                  Visit Type
                </h3>

                <button className="w-full bg-orange-600 text-white py-3 rounded-lg mb-6 hover:bg-orange-700 transition-colors font-semibold">
                  Visit Centre
                </button>

                {/* Centre Selection */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-blue-900 mb-2">
                    Centres
                  </h4>
                  <div className="relative">
                    <select
                      value={selectedCentre}
                      onChange={(e) => setSelectedCentre(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg appearance-none bg-white text-gray-700 pr-10 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      {test.centres.map((centre, idx) => (
                        <option key={idx} value={centre}>
                          {centre}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                  </div>
                  <button className="mt-2 text-orange-600 hover:text-orange-700 flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                  </button>
                </div>

                {/* Test Selection */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-blue-900 mb-2">
                    Tests
                  </h4>
                  <div className="relative">
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-lg appearance-none bg-white text-gray-700 pr-10 focus:outline-none focus:ring-2 focus:ring-orange-500">
                      <option>18 F FDG PET/CT Whole Body</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                {/* Price */}
                <div className="mb-6 text-center">
                  <span className="text-gray-400 line-through text-base">
                    {test.originalPrice}
                  </span>
                  <div className="text-3xl font-bold text-orange-600">
                    {test.price}
                  </div>
                </div>

                {/* CTA Buttons */}
                <button
                  onClick={() => {
                    // Parse price string "₹11999" -> 11999
                    const priceNumber = parseInt(test.price.replace(/[^0-9]/g, "")) || 0;
                    const originalPriceNumber = parseInt(test.originalPrice.replace(/[^0-9]/g, "")) || 0;

                    addToCart({
                      id: test.slug,
                      name: test.name,
                      price: priceNumber,
                      originalPrice: originalPriceNumber,
                      type: "test",
                      testPreparation: test.testPreparation,
                      reportTat: test.reportTat,
                      Item_ID: "" // Placeholder as slug currently acts as ID in this static list
                    });

                    router.push('/cart');
                  }}
                  className="w-full bg-orange-600 text-white py-3 rounded-lg hover:bg-orange-700 transition-colors mb-3 font-semibold"
                >
                  Book Now
                </button>

                <button className="w-full border-2 border-orange-600 text-orange-600 py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-orange-50 transition-colors font-semibold mb-3">
                  <Phone className="w-4 h-4" />
                  Call {selectedCentre}
                </button>

                <button className="w-full border-2 border-orange-600 text-orange-600 py-3 rounded-lg hover:bg-orange-50 transition-colors font-semibold">
                  Request A Callback
                </button>

              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}