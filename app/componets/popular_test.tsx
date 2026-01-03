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
        // Fetch first page of tests to show as "Popular"
        const res = await fetch("/api/get-investigation?limit=9");
        const json = await res.json();

        if (json.status === "Success" && json.data) {
          // Map API data to component format
          const mappedTests = json.data.map((item: any) => {
            // Calculate parameter count
            const observationList = item.observationName
              ? item.observationName.split(',').filter((s: string) => s.trim().length > 0)
              : [];
            const paramCount = observationList.length || 1;

            return {
              id: item.Item_ID,
              slug: slugify(item.ItemName),
              name: item.ItemName,
              subtitle: item.categoryid || "Diagnostic Test",
              price: `₹ ${item.Rate}`,
              originalPrice: `₹ ${Math.round(item.Rate * 1.2)}`,
              parameters: paramCount,
              reportTat: item.TAT || item.ReportTat || "24-48 Hours",
              icon: item.observationName ? TestTube : Activity,
              bgColor: "bg-blue-50", // Simplify to single color for consistency or map randomly
              description: item.description || `Diagnostic test for ${item.ItemName}.`,
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
    setStartIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setStartIndex((prev) =>
      Math.min(tests.length - visibleTests, prev + 1)
    );
  };

  const handleBookClick = (test: any) => {
    router.push(`/tests/${test.slug}`);
  };

  if (loading) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 flex justify-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-4 border-orange-500"></div>
        </div>
      </section>
    );
  }

  if (tests.length === 0) return null;

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Popular Tests
        </h2>
        <div className="w-20 h-1 bg-orange-600 mb-8"></div>

        <div className="relative overflow-hidden">
          <div
            className="flex gap-6 transition-transform duration-500"
            style={{
              transform: `translateX(-${startIndex * (100 / visibleTests)}%)`
            }}
          >
            {tests.map((test, index) => {
              const Icon = test.icon;
              return (
                <div
                  key={index}
                  className="flex-shrink-0 w-full sm:w-[48%] lg:w-[32%]"
                >
                  <div
                    className={`${test.bgColor} border rounded-lg p-6 h-full flex flex-col justify-between`}
                  >
                    <div>
                      <div className="flex justify-between mb-4">
                        <div>
                          <h3 className="text-gray-900 font-bold truncate pr-2" title={test.name}>{test.name}</h3>
                          <p className="text-sm text-gray-600">
                            {test.subtitle}
                          </p>
                          <p className="text-xs text-gray-500 line-clamp-2 mt-2">
                            {test.description}
                          </p>
                        </div>
                        <div className="bg-white p-2 rounded-lg h-fit shadow-sm">
                          <Icon className="w-6 h-6 text-orange-600" />
                        </div>
                      </div>

                      <div className="space-y-2 mb-4 text-gray-600 text-sm">
                        <div className="flex items-center gap-2">
                          <TestTube className="w-4 h-4 text-orange-500" />
                          {test.parameters} Parameters
                        </div>
                        <div className="flex items-center gap-2">
                          <Activity className="w-4 h-4 text-orange-500" />
                          Report: {test.reportTat}
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center border-t border-gray-200 pt-4 mt-2">
                      <div className="text-orange-600 text-lg font-bold">
                        {test.price}
                      </div>
                      <button
                        onClick={() => handleBookClick(test)}
                        className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors text-sm font-semibold shadoow-md"
                      >
                        KNOW MORE
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {startIndex > 0 && (
            <button
              onClick={handlePrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow"
            >
              <ChevronLeft />
            </button>
          )}

          {startIndex < tests.length - visibleTests && (
            <button
              onClick={handleNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow"
            >
              <ChevronRight />
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
