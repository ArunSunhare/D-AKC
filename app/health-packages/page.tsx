"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Search, Activity, Loader2 } from "lucide-react";
import { Navigation } from "../componets/navbar";
import { Footer } from "../componets/footer";

export default function HealthPackagesPage() {
  const router = useRouter();

  const [allPackages, setAllPackages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 9;

  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setCurrentPage(1);
    }, 400);

    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    fetchHealthPackages();
  }, []);

  const fetchHealthPackages = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/get-health-packages", {
        next: { revalidate: 3600 },
      });

      if (!res.ok) throw new Error("Failed to fetch");

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
        setAllPackages(parsed.data || []);
      } else {
        setError(parsed?.message || "Failed to load health packages");
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred while fetching data");
    } finally {
      setLoading(false);
    }
  };

  // Memoized filtering
  const filteredPackages = useMemo(() => {
    return allPackages.filter((item) => {
      const matchesSearch =
        !debouncedSearch ||
        item.ItemName?.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        item.itemID?.toLowerCase().includes(debouncedSearch.toLowerCase());

      return matchesSearch;
    });
  }, [allPackages, debouncedSearch]);

  // Memoized paginated data
  const packagesToShow = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filteredPackages.slice(start, end);
  }, [filteredPackages, currentPage]);

  const totalItems = filteredPackages.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch]);

  const slugify = (text: string) =>
    text
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "");

  const getPageNumbers = useCallback(() => {
    const pages = [];
    const maxVisible = 7;
    let start = Math.max(1, currentPage - 3);
    let end = Math.min(totalPages, start + maxVisible - 1);
    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  }, [currentPage, totalPages]);

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <section className="relative bg-gradient-to-r from-gray-700 to-gray-600 py-16 overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <Image
            src="/assets/hero.jpg"
            alt="Hero Background"
            fill
            priority
            className="object-cover"
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-white mb-2 text-4xl font-bold">Health Packages</h1>
            <p className="text-white/90 mb-8 text-lg">
              Choose from our comprehensive health checkup packages
            </p>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <p className="text-gray-700 mb-4">
                Find the perfect health package for your needs!
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search for packages (e.g. Diabetic, Cardiac)..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-700 text-black"
                  />
                </div>
                <button
                  className="bg-orange-500 text-white px-8 py-3 rounded-lg hover:bg-orange-600 transition-colors flex items-center justify-center gap-2"
                >
                  <Search className="w-5 h-5" />
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(9)].map((_, i) => (
              <div
                key={i}
                className="animate-pulse bg-gray-100 border border-gray-200 rounded-lg p-6"
              >
                <div className="flex items-start gap-4">
                  <div className="bg-gray-200 rounded-lg w-12 h-12" />
                  <div className="flex-1">
                    <div className="h-6 bg-gray-200 rounded w-3/4 mb-2" />
                    <div className="h-4 bg-gray-200 rounded w-1/2" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center bg-red-50 p-8 rounded-xl border border-red-100">
            <p className="text-red-600 text-lg">{error}</p>
            <button
              onClick={fetchHealthPackages}
              className="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Retry
            </button>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h2 className="text-2xl font-bold text-gray-900">
                {debouncedSearch
                  ? `Search Results for "${debouncedSearch}"`
                  : "All Health Packages"}
                <span className="text-gray-500 text-base font-normal ml-2">
                  ({totalItems} packages)
                </span>
              </h2>
            </div>

            <div className="space-y-4">
              {packagesToShow.length === 0 ? (
                <div className="text-center py-20 bg-gray-50 rounded-2xl">
                  <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-medium text-gray-900">No packages found</h3>
                  <p className="text-gray-500 mt-2 max-w-md mx-auto">
                    Try adjusting your search term.
                  </p>
                </div>
              ) : (
                packagesToShow.map((item: any, idx: number) => (
                  <div
                    key={item.itemID || idx}
                    className="flex flex-col md:flex-row md:items-center justify-between p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex-1 mb-4 md:mb-0">
                      <div className="flex items-start gap-4">
                        <div className="bg-orange-50 p-3 rounded-lg hidden sm:block">
                          <Activity className="w-6 h-6 text-orange-600" />
                        </div>
                        <div>
                          <h3 className="text-lg text-gray-900">
                            {item.ItemName}
                          </h3>
                          <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-500 mt-1">
                            <span>ID: <span className="font-mono">{item.itemID}</span></span>
                            <span>•</span>
                            <span>{item.PackageCount} Tests Included</span>
                            {item.Rate && (
                              <>
                                <span className="sm:hidden">•</span>
                                <span className="sm:hidden font-bold text-orange-600">
                                  ₹ {item.Rate}
                                </span>
                              </>
                            )}
                          </div>
                          {item.PackageItem && (
                            <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                              {item.PackageItem.split(',').slice(0, 3).join(', ')}
                              {item.PackageItem.split(',').length > 3 ? '...' : ''}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      {item.Rate && (
                        <div className="text-right hidden sm:block">
                          <p className="text-xs text-gray-500">Price</p>
                          <p className="text-2xl font-bold text-orange-600">₹ {item.Rate}</p>
                        </div>
                      )}
                      <button
                        onClick={() => router.push(`/health-packages/${slugify(item.ItemName)}`)}
                        className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition font-medium shadow-sm"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {totalPages > 1 && packagesToShow.length > 0 && (
              <div className="flex justify-center items-center gap-2 mt-12">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-5 py-3 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 font-medium"
                >
                  Previous
                </button>

                {getPageNumbers().map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-12 h-12 rounded-lg font-medium transition ${
                      currentPage === page
                        ? "bg-orange-600 text-white"
                        : "border hover:bg-gray-50 text-gray-700"
                    }`}
                  >
                    {page}
                  </button>
                ))}

                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="px-5 py-3 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 font-medium"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
