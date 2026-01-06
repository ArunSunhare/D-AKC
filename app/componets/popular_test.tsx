"use client";

import {
  FlaskConical,
  TestTube,
  Activity,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export function PopularTests() {
  const router = useRouter();
  const [startIndex, setStartIndex] = useState(0);
  const [tests, setTests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const visibleTests = 3;

  useEffect(() => {
    const fetchPopularTests = async () => {
      try {
        const res = await fetch("/api/popular-investigation");
        const json = await res.json();

        if (json.success && json.data) {

          const rawText = json.data?.string?.["#text"];
          const parsed = JSON.parse(rawText);
          const list = Array.isArray(parsed.data) ? parsed.data : [];
          console.log("Fetched popular tests:", list);

          const mappedTests = list.map((item: any) => {
            const observationList = item.ObsName
              ? item.ObsName.split(",").filter((s: string) => s.trim().length > 0)
              : [];

            return {
              id: item.Item_ID,
              slug: slugify(item.ItemName),
              name: item.ItemName,
              subtitle: item.categoryid || "Diagnostic Test",
              price: `₹ ${item.Rate}`,
              originalPrice: `₹ ${Math.round(item.Rate * 1.2)}`,
              parameters: item.ObsCount || observationList.length || 1,
              reportTat: "24-48 Hours",
              icon: TestTube,
              bgColor: "bg-blue-50",
              description: item.description || `Diagnostic test for ${item.ItemName}`,
              specialization: "General Pathology"
            };
          });

          setTests(mappedTests);
        }
      } catch (err) {
        console.error("Failed to fetch popular tests", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPopularTests();
  }, []);


  const slugify = (text: string) => {
    return text
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");
  };

  const handlePrev = () => {
    setStartIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setStartIndex((prev) => Math.min(prev + 1, maxStartIndex));
  };
  const maxStartIndex = Math.max(0, tests.length - visibleTests);

  const handleBookClick = (test: any) => {
    router.push(`/tests/${test.slug}`);
  };
  if (loading) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="h-[420px] flex items-center justify-center">
            <div className="animate-spin rounded-full h-10 w-10 border-b-4 border-orange-500"></div>
          </div>
        </div>
      </section>
    );
  }


  if (tests.length === 0) return null;

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">


        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Popular Health Test
        </h2>
        <div className="w-20 h-1 bg-orange-600 mb-8"></div>

        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex gap-6 transition-transform duration-500 ease-in-out"
              style={{
               transform: `translateX(-${startIndex * 100}%)`
              }}
            >
              {tests.map((test, index) => {
                const Icon = test.icon;

                return (
                  <div
                    key={index}
                    className="flex-shrink-0 w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
                  >

                    <div
                      className={`${test.bgColor} border border-gray-200 rounded-lg p-5
                    flex flex-col min-h-[320px]`}
                    >

                      <div>
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <h3
                              className="text-gray-900 truncate"
                              title={test.name}
                            >
                              {test.name}
                            </h3>

                            <p className="text-sm text-gray-600 mt-0.5">
                              {test.subtitle}
                            </p>

                            <p className="text-xs text-gray-500 line-clamp-2 mt-1.5 min-h-[32px]">
                              {test.description}
                            </p>
                          </div>

                          <div className="bg-white p-2 rounded-lg shadow-sm">
                            <Icon className="w-6 h-6 text-orange-600" />
                          </div>
                        </div>

                        <div className="space-y-1.5 mb-3 text-sm text-gray-700">
                          <div className="flex items-center gap-2">
                            <TestTube className="w-4 h-4 text-orange-500" />
                            <span>{test.parameters} Parameters</span>
                          </div>

                          <div className="flex items-center gap-2">
                            <Activity className="w-4 h-4 text-orange-500" />
                            <span>Report: {test.reportTat}</span>
                          </div>
                        </div>
                      </div>


                      <div className="flex items-center gap-4 pt-3 border-t border-gray-200 mt-auto">
                        <div className="text-orange-600 font-semibold text-lg">
                          {test.price}
                        </div>

                        <button
                          onClick={() => handleBookClick(test)}
                          className="ml-auto bg-orange-500 text-white px-6 py-2.5 rounded-lg
                        hover:bg-orange-600 transition-colors text-sm font-medium"
                        >
                          Book Now
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <button
            onClick={handlePrev}
            disabled={startIndex === 0}
            aria-label="Previous tests"
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10
    bg-white border border-gray-200 rounded-full p-2 shadow-md
    transition-all duration-200 hover:bg-gray-50 hover:shadow-lg
    disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </button>

          <button
            onClick={handleNext}
            disabled={startIndex === maxStartIndex}
            aria-label="Next tests"
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10
    bg-white border border-gray-200 rounded-full p-2 shadow-md
    transition-all duration-200 hover:bg-gray-50 hover:shadow-lg
    disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-5 h-5 text-gray-700" />
          </button>


        </div>
      </div>
    </section>
  );


}
