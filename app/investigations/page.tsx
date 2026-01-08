"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Search, TestTube, Activity } from "lucide-react";
import { Navigation } from "../componets/navbar";
import { Footer } from "../componets/footer";

export default function InvestigationsPage() {
  const router = useRouter();

  // Full data from API
  const [allInvestigations, setAllInvestigations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string>(""); // "", "LSHHI3", "LSHHI7"
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 9;


  useEffect(() => {
    fetchInvestigations();
  }, []);

  const fetchInvestigations = async () => {
    setLoading(true);
    setError("");

    try {
      const params = new URLSearchParams({
        page: "1",
        limit: "10", 
      });

      const res = await fetch(`/api/get-investigation?${params}`);
      const json = await res.json();

      if (json.status === "Success") {
        setAllInvestigations(json.data || []);
      } else {
        setError(json.message || "Failed to load investigations");
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred while fetching data");
    } finally {
      setLoading(false);
    }
  };

  const filteredInvestigations = allInvestigations.filter((item) => {
    const matchesSearch =
      !search ||
      item.ItemName?.toLowerCase().includes(search.toLowerCase()) ||
      item.Item_ID?.toLowerCase().includes(search.toLowerCase());

    const matchesCategory = !category || item.categoryid === category;

    return matchesSearch && matchesCategory;
  });


  const totalItems = filteredInvestigations.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const investigationsToShow = filteredInvestigations.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [search, category]);

  const slugify = (text: string) =>
    text
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "");

  const getPageNumbers = () => {
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
  };

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
            <h1 className="text-white mb-2 text-4xl font-bold">Find Your Test</h1>
            <p className="text-white/90 mb-8 text-lg">
              Search from our wide range of diagnostic tests
            </p>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <p className="text-gray-700 mb-4">
                Can help you with the right test & lab contact!
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search for tests (e.g. CBC, Lipid)..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-700 text-black"
                  />
                </div>
                <button
                  onClick={() => setSearch(search)} 
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
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-10 w-10 border-b-4 border-orange-500"></div>
          </div>
        ) : error ? (
          <div className="text-center bg-red-50 p-6 rounded-xl border border-red-100">
            <p className="text-red-600">{error}</p>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h2 className="text-2xl font-bold text-gray-900">
                {search
                  ? `Search Results for "${search}"`
                  : category === "LSHHI3"
                  ? "Lab Tests"
                  : category === "LSHHI7"
                  ? "Radiology Tests"
                  : "All Available Tests"}
                <span className="text-gray-500 text-base font-normal ml-2">
                  ({totalItems} tests)
                </span>
              </h2>

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setCategory("")}
                  className={`px-4 py-2 rounded-lg border text-sm font-medium transition ${
                    category === ""
                      ? "bg-orange-600 text-white"
                      : "bg-white text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  All Tests
                </button>
                <button
                  onClick={() => setCategory("LSHHI3")}
                  className={`px-4 py-2 rounded-lg border text-sm font-medium transition ${
                    category === "LSHHI3"
                      ? "bg-orange-600 text-white"
                      : "bg-white text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  Lab Tests
                </button>
                <button
                  onClick={() => setCategory("LSHHI7")}
                  className={`px-4 py-2 rounded-lg border text-sm font-medium transition ${
                    category === "LSHHI7"
                      ? "bg-orange-600 text-white"
                      : "bg-white text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  Radiology Tests
                </button>
              </div>
            </div>

            <div className="flex flex-col space-y-4">
              {investigationsToShow.map((item: any, idx: number) => (
                <div
                  key={item.Item_ID || idx}
                  className="flex flex-col md:flex-row md:items-center justify-between p-6 bg-white border border-gray-100 rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
                >
                  <div className="flex-1 mb-4 md:mb-0">
                    <div className="flex items-start gap-4">
                      <div className="bg-orange-50 p-3 rounded-lg hidden sm:block">
                        {idx % 2 === 0 ? (
                          <TestTube className="w-6 h-6 text-orange-600" />
                        ) : (
                          <Activity className="w-6 h-6 text-orange-600" />
                        )}
                      </div>
                      <div>
                        <h3 className="text-gray-900 text-lg ">
                          {item.ItemName}
                        </h3>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-500 mt-1">
                          <span>ID: <span className="font-mono">{item.Item_ID}</span></span>
                          <span>•</span>
                          <span>
                            {item.categoryid === "LSHHI3" ? "Lab Test" : "Radiology Test"}
                          </span>
                         
                          {item.Rate && (
                            <>
                              <span className="sm:hidden">•</span>
                              <span className="sm:hidden font-bold text-orange-600">
                                ₹ {item.Rate}
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    {item.Rate && (
                      <div className="text-right hidden sm:block">
                        <p className="text-xs text-gray-500">Price</p>
                        <p className="text-xl font-bold text-orange-600">₹ {item.Rate}</p>
                      </div>
                    )}
                    <button
                      onClick={() => router.push(`/tests/${slugify(item.ItemName)}`)}
                      className="bg-orange-500 text-white px-6 py-2.5 rounded-lg hover:bg-orange-600 transition text-sm font-semibold shadow-sm"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              ))}
            </div>

   
            {investigationsToShow.length === 0 && (
              <div className="text-center py-16 bg-gray-50 rounded-2xl">
                <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900">No tests found</h3>
                <p className="text-gray-500 mt-2">
                  Try adjusting your search or category filter.
                </p>
              </div>
            )}

       
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-8">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  Previous
                </button>

                {getPageNumbers().map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-10 h-10 rounded-lg transition ${
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
                  className="px-4 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
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