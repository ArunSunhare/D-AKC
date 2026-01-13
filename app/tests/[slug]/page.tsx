"use client";

import { useParams, useRouter } from "next/navigation";
import { TestTube, Activity, ArrowLeft, Phone, MapPin, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import { useCart } from "@/app/context/CartContext";
import { Navigation } from "@/app/componets/navbar";
import { Footer } from "@/app/componets/footer";
import { TestBookingCard } from "@/app/componets/TestBookingCard";


export default function TestDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [showParams, setShowParams] = useState(false);


  const [dynamicTest, setDynamicTest] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const slug = (Array.isArray(params.slug) ? params.slug[0] : params.slug) || "";

  const STATIC_CENTRES = ["Karkardooma Institutional Area"];



  const slugify = (text: string) => {
    return text
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");
  };

  useEffect(() => {

    const fetchFromApi = async () => {
      try {
        const searchTerm = slug.replace(/-/g, " ");
        console.log("🔍 SEARCH TERM:", searchTerm);

        const res = await fetch(`/api/get-investigation?search=${searchTerm}`);
        const json = await res.json();

        console.log("✅ API RESPONSE:", json);

        if (json.status !== "Success" || !json.data?.length) {
          setError("Test not found");
          return;
        }

        const match = json.data.find(
          (item: any) => slugify(item.ItemName) === slug
        );

        console.log("🎯 MATCHED TEST:", match);

        if (!match) {
          setError("Test not found");
          return;
        }

        const observationList = match.observationName
          ? match.observationName
            .split(",")
            .map((s: string) => s.trim())
            .filter(Boolean)
          : [];

        const paramCount = observationList.length || 1;

        const mappedTest = {
          slug,
          name: match.ItemName,
          subtitle: match.LabType === "LAB" ? "Laboratory Test" : "Diagnostic Test",
          price: `₹${match.Rate}`,
          originalPrice: `₹${Math.round(match.Rate * 1.2)}`,
          parameters: paramCount,
          reportTat: match.TAT || "24-48 Hours*",
          description: match.description || match.ItemName,
          alsoKnownAs: [match.ItemName],
          specialization: "General Pathology",
          testPreparation: match.TestPreparation || "No special preparation required.",
          observationName: match.observationName || "",
          Item_ID: match.Item_ID || "",
          SubCategoryID: match.SubCategoryID || match.SubcategoryID || "",
          CategoryID: match.categoryid || match.CategoryID || "",
          LabType: match.LabType || "",
          Sample: match.Sample || "",
          centres: STATIC_CENTRES,
        };

        console.log("🚀 FINAL TEST OBJECT:", mappedTest);

        setDynamicTest(mappedTest);
      } catch (err) {
        console.error("❌ FETCH ERROR:", err);
        setError("Failed to load test details");
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchFromApi();
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

  const test = dynamicTest;

  return (
    <>
      <Navigation />

      <section className="bg-gray-100 py-6 min-h-screen">
        <div className="max-w-7xl mx-auto px-4">


          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-700 mb-6 hover:text-orange-600 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back</span>
          </button>

          <div className="grid lg:grid-cols-3 gap-6">


            <div className="lg:col-span-2 space-y-6">


              <div className="bg-white rounded-lg shadow-sm p-6">
                <h1 className="text-3xl font-bold text-blue-900 mb-1">
                  {test.name}
                </h1>
                <p className="text-gray-600 text-sm mb-4">{test.subtitle}</p>


                <div className="lg:hidden mb-4">
                  <span className="text-gray-400 line-through text-sm mr-2">
                    {test.originalPrice}
                  </span>
                  <span className="text-3xl font-bold text-orange-600">
                    {test.price}
                  </span>
                </div>


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


                <p className="text-gray-700 leading-relaxed text-justify">
                  {test.description}
                </p>
              </div>


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

              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="font-bold text-gray-900 mb-3">
                  Test Preparation:
                </h3>
                <p className="text-gray-700 leading-relaxed text-sm">
                  {test.testPreparation}

                </p>
              </div>

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