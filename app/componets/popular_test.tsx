"use client";

import {
  TestTube,
  Activity,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

/* ✅ moved outside (same as HealthPackages) */
const slugify = (text: string) =>
  text.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, "");

export function PopularTests() {
  const router = useRouter();
  const [startIndex, setStartIndex] = useState(0);
  const [tests, setTests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const visibleTests = 3;

  useEffect(() => {
    const fetchPopularTests = async () => {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 15000);

        const res = await fetch("/api/popular-investigation", {
          signal: controller.signal,
        }).finally(() => clearTimeout(timeoutId));

        const json = await res.json();

        if (!res.ok || !json?.success) {
          throw new Error(json?.message || "Failed to fetch popular tests");
        }

        /* ✅ simplified parsing (same pattern as HealthPackages) */
        let parsed;
        if (json?.data) {
          parsed = typeof json.data === "string"
            ? JSON.parse(json.data)
            : json.data;
        } else {
          parsed = json;
        }

        const list = Array.isArray(parsed?.data) ? parsed.data : [];

        /* ✅ optimized mapping */
        const mappedTests = list.slice(0, 5).map((item: any) => {
          const observationCount =
            Number(item.ObsCount) ||
            ((item.ObsName?.match(/,/g)?.length ?? 0) + 1) ||
            1;

          return {
            id: item.Item_ID,
            slug: slugify(item.ItemName),
            name: item.ItemName,
            subtitle: item.categoryid || "Diagnostic Test",
            price: `₹ ${item.Rate}`,
            originalPrice: `₹ ${Math.round(item.Rate * 1.2)}`,
            parameters: observationCount,
            reportTat: "24-48 Hours",
            bgColor: "bg-blue-50",
            description: item.description || `Diagnostic test for ${item.ItemName}`,
            specialization: "General Pathology"
          };
        });

        setTests(mappedTests);
      } catch (err) {
        console.error("Failed to fetch popular tests", err);
        const message =
          err instanceof Error && err.name === "AbortError"
            ? "Request timed out"
            : err instanceof Error
              ? err.message
              : "Failed to fetch popular tests";
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    fetchPopularTests();
  }, []);

  const maxStartIndex = Math.max(0, tests.length - visibleTests);

  const handlePrev = () =>
    setStartIndex((prev) => Math.max(prev - 1, 0));

  const handleNext = () =>
    setStartIndex((prev) =>
      Math.min(prev + 1, maxStartIndex)
    );

  const handleBookClick = (test: any) => {
    router.push(`/tests/${test.slug}`);
  };

  /* ---------------- LOADING ---------------- */
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

  /* ---------------- ERROR ---------------- */
  if (error) {
    return (
      <section className="py-5 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Popular Health Test
          </h2>
          <div className="w-20 h-1 bg-red-600 mb-8"></div>
          <div className="border border-red-200 bg-red-50 text-red-700 rounded-lg p-4 text-sm">
            {error}
          </div>
        </div>
      </section>
    );
  }

  /* ---------------- EMPTY ---------------- */
  if (tests.length === 0) {
    return (
      <section className="py-5 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Popular Health Test
          </h2>
          <div className="w-20 h-1 bg-red-600 mb-8"></div>
          <div className="border border-gray-200 bg-gray-50 text-gray-700 rounded-lg p-4 text-sm">
            No popular tests available right now.
          </div>
        </div>
      </section>
    );
  }

  /* ---------------- UI (UNCHANGED) ---------------- */
  return (
    <section className="py-5 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Popular Health Test
        </h2>
        <div className="w-20 h-1 bg-red-600 mb-8"></div>

        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex gap-6 transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${startIndex * (100 / visibleTests)}%)`
              }}
            >
              {tests.map((test, index) => (
                <div
                  key={test.id || index}
                  className="flex-shrink-0 w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
                >
                  <div
                    className={`${test.bgColor} border border-gray-200 rounded-lg p-5 flex flex-col min-h-[320px]`}
                  >
                    <div>
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="text-gray-900 truncate" title={test.name}>
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
                          <TestTube className="w-6 h-6 text-orange-600" />
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
                        className="ml-auto bg-orange-500 text-white px-6 py-2.5 rounded-lg hover:bg-orange-600 transition-colors text-sm font-medium"
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={handlePrev}
            disabled={startIndex === 0}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10
              bg-white border border-gray-200 rounded-full p-2 shadow-md
              disabled:opacity-40"
          >
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </button>

          <button
            onClick={handleNext}
            disabled={startIndex === maxStartIndex}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10
              bg-white border border-gray-200 rounded-full p-2 shadow-md
              disabled:opacity-40"
          >
            <ChevronRight className="w-5 h-5 text-gray-700" />
          </button>
        </div>
      </div>
    </section>
  );
}
