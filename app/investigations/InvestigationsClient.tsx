"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Search, TestTube, Activity, Loader2 } from "lucide-react";
import { Navigation } from "../componets/navbar";
import { Footer } from "../componets/footer";
import { MainNavbar } from "../componets/MainNavbar";
import { TopNavbar } from "../componets/TopNavbar";
import { TopHeader } from "../componets/top_header";

export default function InvestigationsClient({
  investigations,
  pagination,
  serverError,
}: {
  investigations: any[];
  pagination: any;
  serverError: string;
}) {
  const router = useRouter();

  const [data, setData] = useState(investigations);
  const [page, setPage] = useState(pagination?.currentPage || 1);
  const [totalPages, setTotalPages] = useState(pagination?.totalPages || 1);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(serverError);

  const fetchData = async (pageNo = 1, searchText = "") => {
    setLoading(true);
    setError("");

    const params = new URLSearchParams({
      page: pageNo.toString(),
      limit: "9",
      search: searchText,
    });

    try {
      const res = await fetch(`/api/get-investigation?${params}`);
      const json = await res.json();

      if (json.status === "Success") {
        setData(json.data);
        setPage(json.pagination.currentPage);
        setTotalPages(json.pagination.totalPages);
      } else {
        setError("Failed to load data");
      }
    } catch {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const slugify = (text: string) =>
    text.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, "");

  return (
    <div className="min-h-screen bg-white">
      <TopHeader />
            <TopNavbar />
            <MainNavbar />

      {/* HERO */}
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

        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <h1 className="text-white text-4xl font-bold mb-2">
            Find Your Test
          </h1>
          <p className="text-white/90 mb-6 text-lg">
            Search from our wide range of diagnostic tests
          </p>

          <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  fetchData(1, e.target.value);
                }}
                placeholder="Search for tests (e.g. CBC, Lipid)..."
                className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-600"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-orange-600" />
          </div>
        ) : error ? (
          <p className="text-center text-red-600">{error}</p>
        ) : (
          <>
            <div className="space-y-4">
              {data.map((item) => (
                <div
                  key={item.Item_ID}
                  className="flex flex-col md:flex-row justify-between items-center p-6 border rounded-lg shadow-sm hover:shadow-md transition"
                >
                  <div className="flex items-start gap-4">
                    <div className="bg-orange-50 p-3 rounded-lg hidden sm:block">
                      {item.categoryid === "LSHHI3" ? (
                        <TestTube className="text-orange-600" />
                      ) : (
                        <Activity className="text-orange-600" />
                      )}
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold">
                        {item.ItemName}
                      </h3>
                      <p className="text-sm text-gray-500">
                        ID: {item.Item_ID}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() =>
                      router.push(`/tests/${slugify(item.ItemName)}`)
                    }
                    className="mt-4 md:mt-0 bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600"
                  >
                    Book Now
                  </button>
                </div>
              ))}
            </div>

            {/* PAGINATION */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-12">
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => fetchData(i + 1, search)}
                    className={`w-12 h-12 rounded-lg font-medium ${
                      page === i + 1
                        ? "bg-orange-600 text-white"
                        : "border hover:bg-gray-50"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      <Footer />
    </div>
  );
}
