"use client";

import { useParams, useRouter } from "next/navigation";
import { TestTube, Activity, ArrowLeft, Phone, MapPin, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import { useCart } from "@/app/context/CartContext";
import { Navigation } from "@/app/componets/navbar";
import { Footer } from "@/app/componets/footer";
import { TestBookingCard } from "@/app/componets/TestBookingCard";


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
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [showParams, setShowParams] = useState(false);

  // Dynamic State
  const [dynamicTest, setDynamicTest] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const slug = (Array.isArray(params.slug) ? params.slug[0] : params.slug) || "";

  // Helper to slugify (must match the one in investigations page)
  const slugify = (text: string) => {
    return text
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");
  };

  useEffect(() => {
    // 1. Check Static first (Exact slug match OR Alias match)
    const staticTest = tests.find((t) =>
      t.slug === slug ||
      t.alsoKnownAs.some(alias => slugify(alias) === slug)
    );

    if (staticTest) {
      setDynamicTest(staticTest);
      setLoading(false);
      return;
    }

    // 2. Fetch from API if not static
    const fetchFromApi = async () => {
      try {
        // Convert slug to search term (approximate)
        const searchTerm = slug.replace(/-/g, " ");
        const res = await fetch(`/api/get-investigation?search=${searchTerm}`);
        const json = await res.json();

        if (json.status === "Success" && json.data) {
          // Find exact match by slug logic
          const match = json.data.find(
            (item: any) => slugify(item.ItemName) === slug
          );

          if (match) {
            // Parse observationName to get parameters list
            const observationList = match.observationName
              ? match.observationName.split(',').map((s: string) => s.trim()).filter((s: string) => s.length > 0)
              : [];
            const paramCount = observationList.length || 1;

            // Map API data to our UI format
            setDynamicTest({
              slug: slug,
              name: match.ItemName,
              subtitle: match.LabType === "LAB" ? "Laboratory Test" : (match.categoryid || "Diagnostic Test"),
              price: `₹${match.Rate}`,
              originalPrice: `₹${Math.round(match.Rate * 1.2)}`, // Fake markup for display
              parameters: paramCount,
              reportTat: match.TAT || match.ReportTat || "24-48 Hours*",
              description: match.description || `Diagnostic test for ${match.ItemName}. Please consult your doctor for correlation.`,
              alsoKnownAs: [match.ItemName],
              specialization: "General Pathology",
              testPreparation: match.Pre_Test_Info || match.TestPreparation || "No special preparation required.",
              centres: ["Karkardooma Institutional Area"], // Default centre
              faqs: [], // API doesn't have FAQs
              isDynamic: true, // Flag to know it's from API
              observationName: match.observationName || "", // Store full observation list
              Item_ID: match.Item_ID || "",
              Sample: match.Sample || ""
            });
          } else {
            setError("Test not found");
          }
        } else {
          setError("Test not found");
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load test details");
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchFromApi();
    }
  }, [slug]);


  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-orange-500"></div>
      </div>
    );
  }

  if (error || !dynamicTest) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Navigation />
        <div className="flex-grow flex flex-col items-center justify-center py-24 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Test Not Found</h2>
          <p className="text-gray-500 mb-8">We couldn't find the test you're looking for.</p>
          <button
            onClick={() => router.push('/investigations')}
            className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 transition"
          >
            Browse All Tests
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  const test = dynamicTest; // Use the resolved test data

  return (
    <>
      <Navigation />

      <section className="bg-gray-100 py-6 min-h-screen">
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
                {test.alsoKnownAs && test.alsoKnownAs.length > 0 && (
                  <div className="mb-4">
                    <h3 className="text-sm font-semibold text-gray-900 mb-2">
                      Also Known As:
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {test.alsoKnownAs.map((item: string, idx: number) => (
                        <span
                          key={idx}
                          className="px-3 py-1.5 text-sm border border-orange-500 text-orange-600 rounded-full"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Description */}
                <p className="text-gray-700 leading-relaxed text-justify">
                  {test.description}
                </p>
              </div>

              {/* Includes Parameters */}
              <div className="bg-white rounded-lg shadow-sm overflow-hidden p-4">
                <h2 className="font-bold text-sm md:text-lg text-black md:mb-4 mb-2">
                  Includes<span className="text-[#c74115]"> {test.parameters}</span> Test Parameters
                </h2>
                <button
                  onClick={() => setShowParams(!showParams)}
                  className="w-full flex justify-between items-center px-4 py-3 text-left hover:bg-gray-200 transition cursor-pointer rounded-md bg-gray-100 font-bold text-gray-900"
                >
                  <span className="truncate pr-4">{test.name}</span>
                  <div className="flex items-center md:gap-4 gap-2 flex-shrink-0">
                    <span className="text-orange-600 text-sm font-medium whitespace-nowrap">
                      {test.parameters} Parameter{test.parameters !== 1 ? 's' : ''}
                    </span>
                    <ChevronDown
                      className={`w-6 h-6 text-orange-600 transform transition-transform duration-200 ${showParams ? 'rotate-180' : 'rotate-0'}`}
                    />
                  </div>
                </button>

                {showParams && (
                  <div className="mt-4">
                    {test.observationName && test.observationName.split(',').filter((s: string) => s.trim()).length > 0 ? (
                      // Show all parameters from API in Grid
                      <div className="grid gap-2 grid-cols-1 md:grid-cols-2 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                        {test.observationName.split(',').map((param: string, idx: number) => (
                          <div key={idx} className="flex items-center px-3 py-1.5 bg-gray-50 rounded-lg border border-gray-100">
                            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" className="w-4 h-4 text-orange-600 mr-2 flex-shrink-0" viewBox="0 0 24 24">
                              <path fill="currentColor" d="M12 7a5 5 0 1 1-4.995 5.217L7 12l.005-.217A5 5 0 0 1 12 7"></path>
                            </svg>
                            <p className="text-gray-700 font-[var(--font-roboto-serif)] text-[13px] leading-tight">{param.trim().replace(/\*/g, '').trim()}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      // Fallback for static tests
                      <div className="flex items-center justify-between px-4 py-2 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <TestTube className="w-5 h-5 text-orange-600" />
                          <span className="text-gray-800 font-medium">{test.name}</span>
                        </div>
                        <span className="text-orange-600 text-sm font-medium">
                          {test.parameters} Parameter{test.parameters > 1 ? 's' : ''}
                        </span>
                      </div>
                    )}
                  </div>
                )}
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
              {test.faqs && test.faqs.length > 0 && (
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="bg-blue-900 px-6 py-4">
                    <h3 className="text-xl font-bold text-white">
                      Frequently Asked Questions
                    </h3>
                  </div>
                  <div className="divide-y">
                    {test.faqs.map((faq: any, idx: number) => (
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
              )}

            </div>

            {/* RIGHT BOOKING CARD */}
            <div className="lg:col-span-1">
              <TestBookingCard test={test} />
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}