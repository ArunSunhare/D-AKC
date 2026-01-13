"use client";

import {
  TestTube,
  Activity,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const slugify = (text: string) => {
  return text
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");
};

export function HealthPackages() {
  const router = useRouter();
  const [startIndex, setStartIndex] = useState(0);
  const [packages, setPackages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const visiblePackages = 3;

  useEffect(() => {
    const fetchHealthPackages = async () => {
      try {
        const res = await fetch("/api/get-health-packages");
        const json = await res.json();

        // Parse response
        let parsed;
        if (json?.d) {
          parsed = typeof json.d === "string" ? JSON.parse(json.d) : json.d;
        } else if (json?.status) {
          parsed = json;
        } else {
          parsed = json;
        }

        if (parsed?.status === "Success" && Array.isArray(parsed.data)) {
          // Take only first 5 packages
          const packagesData = parsed.data.slice(0, 5).map((pkg: any) => ({
            id: pkg.itemID,
            slug: slugify(pkg.ItemName),
            name: pkg.ItemName,
            price: `₹ ${pkg.Rate}`,
            originalPrice: `₹ ${Math.round(pkg.Rate * 1.2)}`,
            parameters: pkg.PackageCount || 0,
            reportTat: "24-48 Hours",
            includes: `${pkg.PackageCount} Tests Included`,
            packageItems: pkg.PackageItem || "",
            packagitemID: pkg.PackagitemID || "",
            CategoryID: pkg.CategoryID || "",
            SubCategoryID: pkg.SubCategoryID || "",
            bgColor: "bg-blue-50"
          }));
          setPackages(packagesData);
        }
      } catch (err) {
        console.error("Failed to fetch health packages", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHealthPackages();
  }, []);

  const handlePrev = () =>
    setStartIndex((prev) => Math.max(0, prev - 1));

  const handleNext = () =>
    setStartIndex((prev) =>
      Math.min(packages.length - visiblePackages, prev + 1)
    );

  const handleBookClick = (pkg: any) => {
    router.push(`/health-packages/${pkg.slug}`);
  };

  if (loading) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Popular Health Packages
          </h2>
          <div className="w-20 h-1 bg-orange-600 mb-8"></div>
          <div className="h-[420px] flex items-center justify-center">
            <div className="animate-spin rounded-full h-10 w-10 border-b-4 border-orange-500"></div>
          </div>
        </div>
      </section>
    );
  }

  if (packages.length === 0) return null;

  const maxStartIndex = Math.max(0, packages.length - visiblePackages);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Popular Health Packages
        </h2>
        <div className="w-20 h-1 bg-orange-600 mb-8"></div>

        {/* Slider */}
        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex gap-6 transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${startIndex * (100 / visiblePackages)}%)`
              }}
            >
              {packages.map((pkg, index) => (
                <div
                  key={pkg.id || index}
                  className="flex-shrink-0 w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
                >
                  {/* Card */}
                  <div
                    className={`${pkg.bgColor} border border-gray-200 rounded-lg p-6 flex flex-col min-h-[320px]`}
                  >
                    {/* Top */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-gray-900 mb-1 truncate" title={pkg.name}>
                          {pkg.name}
                        </h3>
                        <span className="inline-block bg-white border border-red-200 text-red-600 px-3 py-1 text-xs rounded-full">
                          NABL Certified
                        </span>
                      </div>

                      <div className="bg-white p-2 rounded-lg shadow-sm">
                        <Activity className="w-6 h-6 text-orange-600" />
                      </div>
                    </div>

                    {/* Parameters Area */}
                    <div className="space-y-2 mb-4 text-sm flex-1">
                      <div className="flex items-center gap-2 text-gray-700">
                        <TestTube className="w-4 h-4 text-orange-500" />
                        <span>{pkg.parameters} Tests</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-700">
                        <Activity className="w-4 h-4 text-orange-500" />
                        <span>Report: {pkg.reportTat}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-700">
                        <Activity className="w-4 h-4 text-orange-500" />
                        <span>{pkg.includes}</span>
                      </div>
                    </div>

                    {/* Price + Button */}
                    <div className="flex items-center justify-between pt-3 border-t border-gray-200 mt-auto">
                      <div className="text-orange-600 font-semibold text-lg">
                        {pkg.price}
                      </div>

                      <button
                        onClick={() => handleBookClick(pkg)}
                        className="bg-orange-500 text-white px-6 py-2.5 rounded-lg hover:bg-orange-600 transition-colors text-sm font-medium"
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Prev Button */}
          <button
            onClick={handlePrev}
            disabled={startIndex === 0}
            aria-label="Previous packages"
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10
              bg-white border border-gray-200 rounded-full p-2 shadow-md
              transition-all duration-200 hover:bg-gray-50 hover:shadow-lg
              disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </button>

          {/* Next Button */}
          <button
            onClick={handleNext}
            disabled={startIndex >= maxStartIndex}
            aria-label="Next packages"
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
