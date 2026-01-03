"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Search, TestTube, Activity } from "lucide-react";
import { Navigation } from "../componets/navbar";
import { Footer } from "../componets/footer";

export default function InvestigationsPage() {
    const [investigations, setInvestigations] = useState<any[]>([]);
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const itemsPerPage = 9;

    // Fetch data when page or search changes
    useEffect(() => {
        fetchInvestigations();
    }, [currentPage]);

    // Debounced search - reset to page 1 and fetch
    useEffect(() => {
        const timer = setTimeout(() => {
            setCurrentPage(1);
            fetchInvestigations();
        }, 300);
        return () => clearTimeout(timer);
    }, [search]);

    const fetchInvestigations = async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams({
                page: currentPage.toString(),
                limit: itemsPerPage.toString(),
                search: search
            });

            const res = await fetch(`/api/get-investigation?${params}`);
            const json = await res.json();

            if (json.status === "Success") {
                setInvestigations(json.data || []);
                setTotalPages(json.pagination?.totalPages || 1);
                setTotalItems(json.pagination?.totalItems || 0);
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

    const slugify = (text: string) => {
        return text
            .toLowerCase()
            .replace(/ /g, "-")
            .replace(/[^\w-]+/g, "");
    };

    return (
        <div className="min-h-screen bg-white">
            <Navigation />

            {/* ---------------- HERO SECTION ---------------- */}
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
                        <h1 className="text-white mb-2 text-4xl font-bold">
                            Find Your Test
                        </h1>
                        <p className="text-white/90 mb-8 text-lg">
                            Search from our wide range of diagnostic tests
                        </p>

                        <div className="bg-white rounded-lg shadow-lg p-6">
                            <p className="text-gray-700 mb-4">
                                Can help you with right test responsive & Lab Contact!
                            </p>

                            <div className="flex gap-3">
                                <div className="flex-1 relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Search for tests (e.g. CBC, Lipid)..."
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        className="w-full pl-10 pr-4 py-3 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-700"
                                    />
                                </div>
                                <button
                                    onClick={() => fetchInvestigations()}
                                    className="bg-orange-500 text-white px-8 py-3 rounded-lg hover:bg-orange-600 transition-colors flex items-center gap-2"
                                >
                                    <Search className="w-5 h-5" />
                                    Search
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ---------------- INVESTIGATIONS LIST ---------------- */}
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
                        <div className="flex justify-between items-center">
                            <h2 className="text-2xl font-bold text-gray-900">
                                {search ? `Search Results for "${search}"` : "Available Tests"}
                                <span className="text-gray-500 text-base font-normal ml-2">
                                    ({totalItems} tests)
                                </span>
                            </h2>
                            <div className="w-20 h-1 bg-orange-600 hidden md:block"></div>
                        </div>

                        {/* List Layout */}
                        <div className="flex flex-col space-y-4">
                            {investigations.map((item: any, idx: number) => (
                                <div key={idx} className="flex flex-col md:flex-row md:items-center justify-between p-6 bg-white border border-gray-100 rounded-lg shadow-sm hover:shadow-md transition-all duration-200">

                                    {/* Left: Info */}
                                    <div className="flex-1 mb-4 md:mb-0">
                                        <div className="flex items-start gap-4">
                                            <div className="bg-orange-50 p-3 rounded-lg flex-shrink-0 hidden sm:block">
                                                {idx % 2 === 0 ? (
                                                    <TestTube className="w-6 h-6 text-orange-600" />
                                                ) : (
                                                    <Activity className="w-6 h-6 text-orange-600" />
                                                )}
                                            </div>
                                            <div>
                                                <h3 className="text-gray-900 font-bold text-lg">{item.ItemName}</h3>
                                                <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-500 mt-1">
                                                    <span>ID: <span className="font-mono text-gray-700">{item.Item_ID}</span></span>
                                                    <span className="hidden sm:inline">•</span>
                                                    <span>{item.categoryid || "Diagnostic Test"}</span>
                                                    <span className="hidden sm:inline">•</span>
                                                    <span>{item.Sample || "Sample N/A"}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right: Actions */}
                                    <div className="flex items-center gap-6 flex-shrink-0">
                                        <div className="text-right hidden sm:block">
                                            <p className="text-xs text-gray-500 mb-0.5">Price</p>
                                            <p className="text-xl font-bold text-orange-600">₹ {item.Rate || "—"}</p>
                                        </div>

                                        <div className="flex items-center justify-between w-full sm:w-auto gap-3">
                                            {/* Mobile Price Overlay (only visible on small screens) */}
                                            <span className="sm:hidden font-bold text-orange-600 text-lg">₹ {item.Rate || "—"}</span>

                                            <button
                                                onClick={() => router.push(`/tests/${slugify(item.ItemName)}`)}
                                                className="bg-orange-500 text-white px-6 py-2.5 rounded-lg hover:bg-orange-600 transition text-sm font-semibold shadow-sm whitespace-nowrap"
                                            >
                                                Book Now
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {investigations.length === 0 && (
                            <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-100">
                                <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Search className="w-8 h-8 text-gray-400" />
                                </div>
                                <h3 className="text-lg font-medium text-gray-900">No tests found</h3>
                                <p className="text-gray-500 mt-1">Try searching for a different test name or ID.</p>
                            </div>
                        )}

                        {/* Pagination Controls */}
                        {totalPages > 1 && (
                            <div className="flex justify-center items-center gap-2 mt-8">
                                <button
                                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                    disabled={currentPage === 1}
                                    className="px-4 py-2 border rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Previous
                                </button>

                                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                    // Logic to show valid page range around current page
                                    let pageNum = i + 1;
                                    if (totalPages > 5) {
                                        if (currentPage > 3) {
                                            pageNum = currentPage - 2 + i;
                                        }
                                        if (pageNum > totalPages) {
                                            pageNum = totalPages - 4 + i;
                                        }
                                    }

                                    return (
                                        <button
                                            key={pageNum}
                                            onClick={() => setCurrentPage(pageNum)}
                                            className={`w-10 h-10 rounded-lg flex items-center justify-center ${currentPage === pageNum
                                                ? "bg-orange-600 text-white"
                                                : "border hover:bg-gray-50 text-gray-700"
                                                }`}
                                        >
                                            {pageNum}
                                        </button>
                                    );
                                })}

                                <button
                                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                    disabled={currentPage === totalPages}
                                    className="px-4 py-2 border rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Next
                                </button>
                            </div>
                        )}

                        {/* Page Info */}
                        {totalPages > 1 && (
                            <p className="text-center text-sm text-gray-500">
                                Page {currentPage} of {totalPages}
                            </p>
                        )}
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
}
