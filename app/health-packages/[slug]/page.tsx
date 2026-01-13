"use client";

import { useParams, useRouter } from "next/navigation";
import { Activity, ArrowLeft, Phone, MapPin, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import { useCart } from "@/app/context/CartContext";
import { Navigation } from "@/app/componets/navbar";
import { Footer } from "@/app/componets/footer";

const STATIC_CENTRES = ["Karkardooma Institutional Area"];

export default function PackageDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { addToCart } = useCart();
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [showParams, setShowParams] = useState(false);
  const [selectedCentre, setSelectedCentre] = useState(STATIC_CENTRES[0] || "");

  const [dynamicPackage, setDynamicPackage] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const slug = (Array.isArray(params.slug) ? params.slug[0] : params.slug) || "";

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

        console.log("✅ API RESPONSE:", parsed);

        if (parsed?.status !== "Success" || !parsed.data?.length) {
          setError("Package not found");
          return;
        }

        const match = parsed.data.find(
          (item: any) => slugify(item.ItemName) === slug
        );

        console.log("🎯 MATCHED PACKAGE:", match);

        if (!match) {
          setError("Package not found");
          return;
        }

        const packageItems = match.PackageItem
          ? match.PackageItem.split(",").map((s: string) => s.trim()).filter(Boolean)
          : [];

        const mappedPackage = {
          slug,
          name: match.ItemName,
          subtitle: "Health Package",
          price: `₹${match.Rate}`,
          originalPrice: `₹${Math.round(match.Rate * 1.2)}`,
          parameters: match.PackageCount || packageItems.length || 0,
          reportTat: "24-48 Hours*",
          description: `${match.ItemName} is a comprehensive health package that includes ${match.PackageCount} diagnostic tests to assess your overall health.`,
          packageItems: packageItems,
          packageItemString: match.PackageItem || "",
          packagitemID: match.PackagitemID || "",
          Item_ID: match.itemID || "",
          CategoryID: match.CategoryID || "",
          SubCategoryID: match.SubCategoryID || "",
          Rate: match.Rate || 0,
          centres: STATIC_CENTRES,
        };

        console.log("🚀 FINAL PACKAGE OBJECT:", mappedPackage);

        setDynamicPackage(mappedPackage);
      } catch (err) {
        console.error("❌ FETCH ERROR:", err);
        setError("Failed to load package details");
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchFromApi();
  }, [slug]);

  const handleBookNow = () => {
    if (!dynamicPackage) return;

    const priceNumber = Number(dynamicPackage.Rate) || 0;

    addToCart({
      id: dynamicPackage.Item_ID || dynamicPackage.slug || dynamicPackage.name,
      name: dynamicPackage.name,
      price: priceNumber,
      type: "package",
      reportTat: dynamicPackage.reportTat,
      Item_ID: dynamicPackage.Item_ID || "",
      CategoryID: dynamicPackage.CategoryID || "",
      SubCategoryID: dynamicPackage.SubCategoryID || "",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-orange-500"></div>
      </div>
    );
  }

  if (error || !dynamicPackage) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Navigation />
        <div className="flex-grow flex flex-col items-center justify-center py-24 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Package Not Found</h2>
          <p className="text-gray-500 mb-8">We couldn't find the package you're looking for.</p>
          <button
            onClick={() => router.push('/health-packages')}
            className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 transition"
          >
            Browse All Packages
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  const pkg = dynamicPackage;

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
            {/* LEFT CONTENT */}
            <div className="lg:col-span-2 space-y-6">
              {/* Package Header */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h1 className="text-3xl font-bold text-blue-900 mb-1">
                  {pkg.name}
                </h1>
                <p className="text-gray-600 text-sm mb-4">{pkg.subtitle}</p>

                <div className="lg:hidden mb-4">
                  <span className="text-gray-400 line-through text-sm mr-2">
                    {pkg.originalPrice}
                  </span>
                  <span className="text-3xl font-bold text-orange-600">
                    {pkg.price}
                  </span>
                </div>

                <p className="text-gray-700 leading-relaxed text-justify">
                  {pkg.description}
                </p>
              </div>

              {/* Package Includes */}
              <div className="bg-white rounded-lg shadow-sm overflow-hidden p-4">
                <h2 className="font-bold text-sm md:text-lg text-black md:mb-4 mb-2">
                  Includes<span className="text-[#c74115]"> {pkg.parameters}</span> Tests
                </h2>
                <button
                  onClick={() => setShowParams(!showParams)}
                  className="w-full flex justify-between items-center px-4 py-3 text-left hover:bg-gray-200 transition cursor-pointer rounded-md bg-gray-100 font-bold text-gray-900"
                >
                  <span className="truncate pr-4">{pkg.name}</span>
                  <div className="flex items-center md:gap-4 gap-2 flex-shrink-0">
                    <span className="text-orange-600 text-sm font-medium whitespace-nowrap">
                      {pkg.parameters} Test{pkg.parameters !== 1 ? 's' : ''}
                    </span>
                    <ChevronDown
                      className={`w-6 h-6 text-orange-600 transform transition-transform duration-200 ${showParams ? 'rotate-180' : 'rotate-0'}`}
                    />
                  </div>
                </button>

                {showParams && pkg.packageItems && pkg.packageItems.length > 0 && (
                  <div className="mt-4">
                    <div className="grid gap-2 grid-cols-1 md:grid-cols-2 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                      {pkg.packageItems.map((item: string, idx: number) => (
                        <div key={idx} className="flex items-center px-3 py-1.5 bg-gray-50 rounded-lg border border-gray-100">
                          <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" className="w-4 h-4 text-orange-600 mr-2 flex-shrink-0" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M12 7a5 5 0 1 1-4.995 5.217L7 12l.005-.217A5 5 0 0 1 12 7"></path>
                          </svg>
                          <p className="text-gray-700 font-[var(--font-roboto-serif)] text-[13px] leading-tight">{item.trim().replace(/\*/g, '').trim()}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Reporting TAT */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="font-bold text-gray-900 mb-2">
                  Reporting TAT:
                </h3>
                <p className="text-gray-700">{pkg.reportTat}</p>
              </div>
            </div>

            {/* RIGHT BOOKING CARD */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
                <h3 className="text-lg font-bold text-blue-900 mb-4">
                  Visit Type
                </h3>

                <button className="w-full bg-orange-600 text-white py-3 rounded-lg mb-6 hover:bg-orange-700 transition-colors font-semibold">
                  Visit Centre
                </button>

                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-blue-900 mb-2">
                    Centres
                  </h4>
                  <div className="relative">
                    <select
                      value={selectedCentre}
                      onChange={(e) => setSelectedCentre(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg appearance-none bg-white text-gray-700 pr-10 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      {pkg.centres && pkg.centres.map((centre: string, idx: number) => (
                        <option key={idx} value={centre}>
                          {centre}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                  </div>
                  <button className="mt-2 text-orange-600 hover:text-orange-700 flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                  </button>
                </div>

                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-blue-900 mb-2">
                    Package
                  </h4>
                  <div className="relative">
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-lg appearance-none bg-white text-gray-700 pr-10 focus:outline-none focus:ring-2 focus:ring-orange-500">
                      <option>{pkg.name}</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                <div className="mb-6 text-center">
                  <div className="text-3xl font-bold text-orange-600">
                    {pkg.price}
                  </div>
                </div>

                <button
                  onClick={handleBookNow}
                  className="w-full bg-orange-600 text-white py-3 rounded-lg hover:bg-orange-700 transition-colors mb-3 font-semibold"
                >
                  Book Now
                </button>

                <button className="w-full border-2 border-orange-600 text-orange-600 py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-orange-50 transition-colors font-semibold mb-3">
                  <Phone className="w-4 h-4" />
                  Call {selectedCentre}
                </button>

                <button className="w-full border-2 border-orange-600 text-orange-600 py-3 rounded-lg hover:bg-orange-50 transition-colors font-semibold">
                  Request A Callback
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
