"use client";

import { useParams, useRouter } from "next/navigation";
import {
  TestTube,
  Activity,
  ArrowLeft,
  CheckCircle,
  Clock,
  ShieldCheck,
  HelpCircle
} from "lucide-react";

/* =======================
   TEST DATA (UPGRADED)
======================= */
const tests = [
  {
    slug: "whole-body-mrcp-scan",
    name: "Whole Body MRCP Scan",
    subtitle: "Advanced MRI Scan | MRCP",
    price: "₹ 11,999",
    originalPrice: "₹ 13,999",
    parameters: 8,
    reportTat: "36 hours",
    specialization: "Gastroenterology & Liver Care",

    description:
      "Whole Body MRCP Scan is an advanced MRI-based imaging test specially designed to evaluate the liver, gallbladder, bile ducts, pancreas, and pancreatic ducts. It is completely non-invasive, painless, and does not use harmful radiation. This scan is highly recommended for patients experiencing abdominal pain, jaundice, gallstones, pancreatic disorders, or unexplained digestive issues.",

    whyRecommended: [
      "Persistent abdominal pain or discomfort",
      "Suspected gallstones or bile duct blockage",
      "Pancreatic inflammation or cysts",
      "Unexplained jaundice or abnormal liver tests",
      "Follow-up for known liver or pancreatic conditions"
    ],

    preparation:
      "You may be asked to fast for 6–8 hours before the scan. Remove all metallic items such as jewelry, watches, or belts before entering the MRI room. Inform the technician if you have any implants, pacemakers, or metal devices in your body.",

    procedure:
      "During the scan, you will lie comfortably on the MRI table. The machine captures detailed images using magnetic fields. The process is painless and usually takes 30–45 minutes. You may be asked to hold your breath briefly to obtain clearer images.",

    alsoKnownAs: [
      "MRCP Abdomen",
      "MRCP Scan with Contrast",
      "Magnetic Resonance Cholangiopancreatography"
    ],

    faqs: [
      {
        q: "Is MRCP Scan painful?",
        a: "No, MRCP is completely painless and non-invasive."
      },
      {
        q: "Is contrast dye mandatory?",
        a: "Not always. Contrast is used only if clinically required."
      },
      {
        q: "Is MRCP safe?",
        a: "Yes, it is very safe as it does not involve radiation."
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
    
    <section className="bg-gray-200 py-16">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow p-8 space-y-12">

        {/* Back */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-600 hover:text-orange-600"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Tests
        </button>

        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-blue-600">
            {test.name}
          </h1>
          <p className="text-gray-600 mt-1">{test.subtitle}</p>
        </div>

        {/* Price */}
        <div className="flex items-center gap-4">
          <span className="text-3xl font-semibold text-orange-600">
            {test.price}
          </span>
          <span className="text-gray-400 line-through">
            {test.originalPrice}
          </span>
        </div>

        {/* Description */}
        <p className="text-gray-700 leading-relaxed">
          {test.description}
        </p>

        {/* Highlights */}
        <div className="grid sm:grid-cols-3 gap-6">
          <div className="flex items-center gap-3">
            <TestTube className="text-orange-600" />
            <span className="text-orange-500">{test.parameters}+ Diagnostic Parameters</span>
          </div>
          <div className="flex items-center gap-3">
            <Clock className="text-orange-500" />
            <span className="text-orange-500">Report in {test.reportTat}</span>
          </div>
          <div className="flex items-center gap-3">
            <ShieldCheck className="text-orange-600" />
            <span className="text-orange-500">100% Safe & Non-Invasive</span>
          </div>
        </div>

        {/* Why Recommended */}
        <div>
          <h2 className="text-xl font-semibold text-blue-600 mb-4">
            Why is this test recommended?
          </h2>
          <ul className="space-y-2 text-gray-700">
            {test.whyRecommended.map((item, i) => (
              <li key={i} className="flex gap-2">
                <CheckCircle className="w-4 h-4 text-green-600 mt-1" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Preparation */}
        <div>
          <h2 className="text-xl font-semibold text-blue-600 mb-2">
            Test Preparation
          </h2>
          <p className="text-gray-700 leading-relaxed">
            {test.preparation}
          </p>
        </div>

        {/* Procedure */}
        <div>
          <h2 className="text-xl font-semibold text-blue-600 mb-2">
            How is the test performed?
          </h2>
          <p className="text-gray-700 leading-relaxed">
            {test.procedure}
          </p>
        </div>

        {/* Also Known As */}
        <div>
          <h2 className="text-xl font-semibold text-blue-600 mb-2">
            Also Known As
          </h2>
          <ul className="list-disc list-inside text-gray-700">
            {test.alsoKnownAs.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>

        {/* FAQs */}
        <div>
          <h2 className="text-xl font-semibold text-blue-600 mb-4">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {test.faqs.map((faq, i) => (
              <div key={i}>
                <p className="font-medium text-gray-900 flex gap-2">
                  <HelpCircle className="w-4 h-4 text-orange-600 mt-1" />
                  {faq.q}
                </p>
                <p className="text-gray-700 ml-6">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="flex justify-end">
          <button className="bg-orange-500 text-white px-10 py-4 rounded-lg hover:bg-orange-600 transition">
            BOOK THIS TEST
          </button>
        </div>

      </div>
    </section>
  );
}
