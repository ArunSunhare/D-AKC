"use client";

import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";


export function Search_Bar() {
    const router = useRouter();

const [search, setSearch] = useState("");
const [suggestions, setSuggestions] = useState<any[]>([]);
const [showSuggestions, setShowSuggestions] = useState(false);
const [loading, setLoading] = useState(false);
const [activeIndex, setActiveIndex] = useState(0);



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
        if (suggestions.length > 0) {
            setActiveIndex(0);
        }
    }, [suggestions]);


    useEffect(() => {
        const timer = setTimeout(() => {
            fetchSuggestions(search);
        }, 300);

        return () => clearTimeout(timer);
    }, [search]);

const slugify = (text: string) => {
    return text
        .toLowerCase()
        .replace(/ /g, "-")
        .replace(/[^\w-]+/g, "");
};


const handleSearch = () => {
    if (suggestions.length > 0) {
        router.push(
            `/tests/${slugify(suggestions[0].ItemName)}`
        );
        setShowSuggestions(false);
    }
};


    return (
    
        <div>
            <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 h-5 w-5" />

                <input
                    type="text"
                    placeholder=" (e.g. CBC, Lipid)..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onFocus={() => search && setShowSuggestions(true)}
                    className="
                                        pl-8 h-8 w-full border border-gray-600 
                                        rounded-md bg-white text-gray-900 
                                        placeholder-gray-400focus:border-orange-500 
                                        focus:ring-orange-500"
                    onKeyDown={(e) => {

                        if (e.key === "Tab" && suggestions.length > 0) {
                            e.preventDefault();
                            const nextIndex = (activeIndex + 1) % suggestions.length;
                            setActiveIndex(nextIndex);
                            setSearch(suggestions[nextIndex].ItemName);
                        }


                        if (e.key === "Enter") {
                            e.preventDefault();

                            if (suggestions.length > 0) {
                                router.push(
                                    `/tests/${slugify(suggestions[activeIndex].ItemName)}`
                                );
                                setShowSuggestions(false);
                            }
                        }
                    }}


                />

                {showSuggestions && suggestions.length > 0 && (
                    <ul className="absolute z-50 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto">
                        {suggestions.map((item, index) => (
                            <li
                                key={index}
                                onClick={() =>
                                    router.push(`/tests/${slugify(item.ItemName)}`)
                                }
                                onMouseEnter={() => {
                                    setActiveIndex(index);
                                    setSearch(item.ItemName);
                                }}
                                className={`px-4 py-2 cursor-pointer text-gray-800
                                                 ${index === activeIndex
                                        ? "bg-orange-100"
                                        : "hover:bg-orange-50"
                                    }`}
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


        </div >
        
    )
}