"use client";

import { Search } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function Hero() {
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchSuggestions = async (value: string) => {
    if (!value.trim()) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(
        `/api/get-investigation?search=${value}&limit=5`
      );
      const json = await res.json();

      if (json.status === "Success") {
        setSuggestions(json.data || []);
        setShowSuggestions(true);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchSuggestions(search);
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  const handleSearch = (value?: string) => {
    const query = value || search;
    if (!query || !query.trim()) return;

    router.push(`/tests/${slugify(query)}`);
  };

  const slugify = (text: string) => {
    return text
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");
  };

  return (
    // ✅ FIX: overflow-hidden REMOVED
    <section className="relative bg-gradient-to-r from-gray-700 to-gray-600 py-16">
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
            Experience Care
          </h1>

          <p className="text-white/90 mb-8 text-lg">
            Near You, Health Checkups and Genetic Test
          </p>

          {/* Search Box */}
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
                  onFocus={() => search && setShowSuggestions(true)}
                  className="w-full pl-10 pr-4 py-3 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-700"
                />

                {/* Suggestions */}
                {showSuggestions && suggestions.length > 0 && (
                  <ul className="absolute z-50 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto">
                    {suggestions.map((item, index) => (
                      <li
                        key={index}
                        onClick={() =>
                          router.push(`/tests/${slugify(item.ItemName)}`)
                        }
                        className="px-4 py-2 cursor-pointer hover:bg-orange-50 text-gray-800"
                      >
                        <p className="font-medium">{item.ItemName}</p>
                        <p className="text-xs text-gray-500">
                          ID: {item.Item_ID}
                        </p>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <button
                onClick={() => handleSearch()}
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
  );
}
