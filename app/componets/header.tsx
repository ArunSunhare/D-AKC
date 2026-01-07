"use client";

import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function App() {
    const router = useRouter();

    const [search, setSearch] = useState("");
    const [suggestions, setSuggestions] = useState<any[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [loading, setLoading] = useState(false);

    const slugify = (text: string) => {
        return text
            .toLowerCase()
            .replace(/ /g, "-")
            .replace(/[^\w-]+/g, "");
    };

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
        if (!query.trim()) return;
        router.push(`/tests/${slugify(query)}`);
    };

    return (
        <div className="bg-gray-20">

            <section className="relative bg-gradient-to-r from-blue-50 via-sky-100 to-blue-50 py-12">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-50 items-center">
                        <div className="flex justify-center lg:justify-end">
                            <img
                                src="/assets/person-left.png"
                                alt="Healthcare Professional"
                                className="w-48 h-48 lg:w-56 lg:h-56 object-cover rounded-full border-4 border-white shadow-xl"
                            />
                        </div>
                        <div className="text-center mt-10  relative">
                            <img
                                src="\assets\Logo_Embossed.png"
                                alt="Center Icon"
                                className="absolute left-1/2 -top-40 transform -translate-x-1/2 w-50 h-50 object-contain"
                            />
                            <h1 className="text-3xl text-orange-600 drop-shadow-sm ml-[-80px] lg:whitespace-nowrap">


                                "नासै रोग हरे सब पीरा, जपत निरंतर हनुमत बीरा"
                            </h1>

                            <div className="flex justify-center mt-4">
                                <div className="w-20 h-1 bg-orange-500 rounded-full"></div>
                            </div>
                        </div>
                        <div className="flex justify-center lg:justify-start">
                            <img
                                src="/assets/person-right.png"
                                alt="Healthcare Leader"
                                className="w-48 h-48 lg:w-56 lg:h-56 object-cover rounded-full border-4 border-white shadow-xl"
                            />
                        </div>

                    </div>
                </div>

            </section>
            <section className="relative -mt-8 z-10">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-2xl p-8">
                        <h2 className="text-2xl text-orange-600 mb-2">Experience Care</h2>
                        <p className="text-gray-600 mb-6">
                            Find Tests, Health Checkups and Centres Near You.
                        </p>

                        <div className="bg-gray-50 rounded-xl p-6 space-y-4">
                            {/* <p className="text-sm text-gray-700">
               
              </p> */}

                            <div className="flex gap-3 relative">
                                <div className="relative flex-1">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 h-5 w-5" />

                                    <input
                                        type="text"
                                        placeholder="Search for tests (e.g. CBC, Lipid)..."
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        onFocus={() => search && setShowSuggestions(true)}
                                        className="
    pl-10 h-12 w-full 
    border border-gray-600 
    rounded-md 
    bg-white 
    text-gray-900 
    placeholder-gray-400
    focus:border-orange-500 
    focus:ring-orange-500
  "
                                    />

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
                                    className="h-12 px-8 bg-orange-500 hover:bg-orange-600 text-white flex items-center rounded-md"
                                >
                                    <Search className="h-5 w-5 mr-2" />
                                    Search
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
