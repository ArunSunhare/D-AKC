"use client";

import { useParams, useRouter } from "next/navigation";
import { TestTube, Activity, ArrowLeft } from "lucide-react";

/* =======================
   TEST DATA
======================= */
const tests = [
  {
    slug: "whole-body-mrcp-scan",
    name: "Whole Body MRCP Scan",
    subtitle: "Scan | MRCP",
    price: "₹ 11999",
    originalPrice: "₹ 13999",
    parameters: 8,
    reportTat: "36 hours",
    description:
      "MRCP (Magnetic Resonance Cholangiopancreatography) is a non-invasive MRI technique used to visualize the biliary and pancreatic ducts. It helps detect stones, strictures, and other abnormalities in the liver, gallbladder, pancreas, and bile ducts.",
    alsoKnownAs: [
      "Whole Body MRCP Scan",
      "MRCP Abdomen",
      "MRCP with Contrast"
    ],
    specialization: "Gastroenterology & Liver Care"
  },
  {
    slug: "cbc-test",
    name: "CBC Test",
    subtitle: "Blood Test | CBC",
    price: "₹ 499",
    originalPrice: "₹ 699",
    parameters: 25,
    reportTat: "24 hours",
    description:
      "A Complete Blood Count (CBC) measures red blood cells, white blood cells, hemoglobin, hematocrit, and platelets. It helps detect infections, anemia, and nutritional deficiencies.",
    alsoKnownAs: ["Complete Blood Count", "Full Hemogram"],
    specialization: "General Health Checkup"
  },
  {
    slug: "ultrasound-whole-abdomen",
    name: "Ultrasound Whole Abdomen",
    subtitle: "Imaging | Ultrasound",
    price: "₹ 999",
    originalPrice: "₹ 1299",
    parameters: 12,
    reportTat: "24 hours",
    description:
      "An ultrasound of the whole abdomen evaluates liver, gallbladder, pancreas, kidneys, spleen, and urinary bladder for stones, cysts, and swelling.",
    alsoKnownAs: ["USG Whole Abdomen"],
    specialization: "Radiology & Imaging"
  }
];

/* =======================
   PAGE
======================= */
export default function TestDetailPage() {
  const params = useParams();
  const router = useRouter();

  const slug = Array.isArray(params.slug)
    ? params.slug[0]
    : params.slug;

  const test = tests.find((t) => t.slug === slug);

  if (!test) {
    return (
      <div className="py-24 text-center text-gray-500 text-lg">
        Test not found
      </div>
    );
  }

  return (
    <section className="py-16 bg-gray-200">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow p-8">

        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-600 mb-6 hover:text-orange-600"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        {/* Title */}
        <h1 className="text-3xl font-bold text-blue-600 mb-1">
          {test.name}
        </h1>
        <p className="text-gray-600 mb-6">{test.subtitle}</p>

        {/* Price */}
        <div className="flex items-center gap-4 mb-6">
          <span className="text-2xl font-semibold text-orange-600">
            {test.price}
          </span>
          <span className="text-gray-400 line-through">
            {test.originalPrice}
          </span>
        </div>

        {/* Description */}
        <p className="text-gray-700 mb-8 leading-relaxed">
          {test.description}
        </p>

        {/* Info Grid */}
        <div className="grid sm:grid-cols-2 gap-4 mb-8">
          <div className="flex items-center gap-3 text-gray-700">
            <TestTube className="w-5 h-5 text-orange-600" />
            {test.parameters} Parameters
          </div>
          <div className="flex items-center gap-3 text-gray-700">
            <Activity className="w-5 h-5 text-orange-600" />
            Report in {test.reportTat}
          </div>
        </div>

        {/* Also Known As */}
        <div className="mb-8">
          <h3 className="font-semibold text-lg text-blue-600 mb-2">
            Also Known As
          </h3>
          <ul className="list-disc list-inside text-gray-600">
            {test.alsoKnownAs.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        {/* Specialization */}
        <div className="mb-10">
          <span className="inline-block bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm">
            {test.specialization}
          </span>
        </div>

        {/* CTA */}
        <div className="flex justify-end">
          <button className="bg-orange-500 text-white px-10 py-3 rounded-lg hover:bg-orange-600 transition">
            PROCEED TO BOOK
          </button>
        </div>

      </div>
    </section>
  );
}
