"use client";

import { Search } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";

export function Search_Bar() {
    const router = useRouter();
    const inputRef = useRef<HTMLInputElement>(null);

    const [search, setSearch] = useState("");
    const [suggestions, setSuggestions] = useState<any[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [loading, setLoading] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const [dropdownStyle, setDropdownStyle] = useState<any>({});

    const fetchSuggestions = async (value: string) => {
        if (!value.trim()) {
            setSuggestions([]);
            setShowSuggestions(false);
            return;
        }

        setLoading(true);
        try {
            const res = await fetch(
                `/api/get-investigation?search=${encodeURIComponent(value)}&limit=5`
            );
            const json = await res.json();

            if (json.status === "Success") {
                setSuggestions(json.data || []);
                setShowSuggestions(true);
            } else {
                setSuggestions([]);
                setShowSuggestions(false);
            }
        } catch (err) {
            console.error("Search error:", err);
            setSuggestions([]);
            setShowSuggestions(false);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const close = (e: MouseEvent) => {
            const target = e.target as Node;
            if (inputRef.current && !inputRef.current.contains(target)) {
                setShowSuggestions(false);
            }
        };
        document.addEventListener("mousedown", close);
        return () => document.removeEventListener("mousedown", close);
    }, []);

    useEffect(() => {
        if (suggestions.length > 0) {
            setActiveIndex(0);
        }
    }, [suggestions]);

    const handleInputFocus = () => {
        if (inputRef.current) {
            const rect = inputRef.current.getBoundingClientRect();
            setDropdownStyle({
                top: rect.bottom + window.scrollY + 8,
                left: rect.left,
                width: rect.width,
            });
        }
        search && setShowSuggestions(true);
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            if (search.trim()) {
                fetchSuggestions(search);
            } else {
                setSuggestions([]);
                setShowSuggestions(false);
            }
        }, 300);

        return () => clearTimeout(timer);
    }, [search]);

    const handleSearch = () => {
        if (suggestions.length > 0) {
            router.push(
                `/tests/${slugify(suggestions[0].ItemName)}`
            );
            setShowSuggestions(false);
            setSearch("");
        }
    };

    const handleSuggestionClick = (item: any) => {
        router.push(`/tests/${slugify(item.ItemName)}`);
        setShowSuggestions(false);
        setSearch("");
    };

    const slugify = (text: string) => {
        return text
            .toLowerCase()
            .replace(/ /g, "-")
            .replace(/[^\w-]+/g, "");
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (!showSuggestions || suggestions.length === 0) return;
        
        if (e.key === "ArrowDown") {
            e.preventDefault();
            const nextIndex = (activeIndex + 1) % suggestions.length;
            setActiveIndex(nextIndex);
            setSearch(suggestions[nextIndex].ItemName);
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            const prevIndex = activeIndex === 0 ? suggestions.length - 1 : activeIndex - 1;
            setActiveIndex(prevIndex);
            setSearch(suggestions[prevIndex].ItemName);
        } else if (e.key === "Enter") {
            e.preventDefault();
            if (suggestions.length > 0 && activeIndex >= 0) {
                handleSuggestionClick(suggestions[activeIndex]);
            }
        } else if (e.key === "Escape") {
            setShowSuggestions(false);
        }
    };

    return (
        <>
            <div className="relative w-full max-w-md">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                    
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder="Search for tests... "
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onFocus={handleInputFocus}
                        onKeyDown={handleKeyDown}
                        className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:border-orange-500 bg-white text-gray-900 placeholder-gray-500 shadow-sm"
                    />

                    {loading && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-orange-500"></div>
                        </div>
                    )}
                </div>
            </div>

            {/* Fixed Position Suggestions Dropdown */}
            {showSuggestions && suggestions.length > 0 && (
                <ul
                    style={dropdownStyle}
                    className="fixed z-[9999] bg-white border border-gray-200 rounded-lg shadow-xl max-h-60 overflow-auto"
                >
                    {suggestions.map((item, index) => (
                        <li
                            key={item.Item_ID || index}
                            onClick={() => handleSuggestionClick(item)}
                            onMouseEnter={() => setActiveIndex(index)}
                            className={`px-4 py-3 cursor-pointer text-gray-800 border-b border-gray-100 last:border-b-0
                                ${index === activeIndex
                                    ? "bg-orange-100 border-orange-200"
                                    : "hover:bg-orange-50"
                                }`}
                        >
                            <p className="font-medium text-sm">{item.ItemName}</p>
                            <p className="text-xs text-gray-500 mt-1">
                                {item.Rate && `₹${item.Rate}`}
                                {item.Rate && item.categoryid && " • "}
                                {item.categoryid}
                            </p>
                        </li>
                    ))}
                </ul>
            )}

            {showSuggestions && search && !loading && suggestions.length === 0 && (
                <div
                    style={dropdownStyle}
                    className="fixed z-[9999] bg-white border border-gray-200 rounded-lg shadow-xl"
                >
                    <div className="px-4 py-3 text-gray-500 text-sm">
                        No tests found for "{search}"
                    </div>
                </div>
            )}
        </>
    );
}