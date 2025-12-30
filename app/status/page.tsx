"use client";

import { useState } from "react";
import Image from "next/image";
import { X, Search, FileText, Calendar, User } from "lucide-react";
import { useRouter } from "next/navigation";

export default function StatusPage() {
    const router = useRouter();
    const [mobile, setMobile] = useState("");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<any>(null);
    const [error, setError] = useState("");
    const [hasSearched, setHasSearched] = useState(false);

    const checkStatus = async (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!mobile) return;

        setLoading(true);
        setError("");
        setResult(null);
        setHasSearched(true);

        try {
            const res = await fetch(`/api/get-status?MobileNo=${mobile}`);
            const json = await res.json();

            console.log("📊 Status Result:", json);

            if (json.status === "Success" || json.Length > 0 || (json.data && json.data.length > 0)) {
                setResult(json.data || []);
            } else {
                setError(json.message || "No records found for this mobile number.");
            }
        } catch (err) {
            console.error(err);
            setError("Failed to fetch status. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 relative">
            <div className="absolute inset-0 z-0">
                <Image
                    src="/assets/hero.jpg"
                    alt="Background"
                    fill
                    className="object-cover opacity-20"
                />
            </div>

            <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl z-10 overflow-hidden">
                {/* Header */}
                <div className="bg-orange-500 p-6 flex justify-between items-center text-white">
                    <div>
                        <h1 className="text-2xl font-bold">Check Status</h1>
                        <p className="text-orange-100 text-sm">Track your test requests</p>
                    </div>
                    <button
                        onClick={() => router.back()}
                        className="p-2 hover:bg-orange-600 rounded-full transition"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="p-8">
                    <form onSubmit={checkStatus} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
                            <div className="relative">
                                <input
                                    type="tel"
                                    placeholder="Enter registered mobile number"
                                    value={mobile}
                                    onChange={(e) => setMobile(e.target.value)}
                                    className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
                                />
                                <button
                                    type="submit"
                                    disabled={loading || !mobile}
                                    className="absolute right-2 top-2 bottom-2 bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white px-4 rounded-lg transition flex items-center"
                                >
                                    <Search className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </form>

                    {loading && (
                        <div className="flex justify-center py-10">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
                        </div>
                    )}

                    {!loading && hasSearched && (
                        <div className="mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            {error ? (
                                <div className="text-center p-6 bg-red-50 rounded-xl border border-red-100">
                                    <p className="text-red-600 font-medium">{error}</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Patient Requests</h3>
                                    {(Array.isArray(result) ? result : [result]).map((item: any, idx: number) => (
                                        <div key={idx} className="bg-white border rounded-xl p-4 shadow-sm hover:shadow-md transition">
                                            <div className="flex items-start justify-between mb-3">
                                                <div>
                                                    <p className="text-sm text-gray-500">Request ID</p>
                                                    <p className="font-mono font-bold text-gray-800">{item.RequestID || "N/A"}</p>
                                                </div>
                                                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${item.Status === 'Completed' ? 'bg-green-100 text-green-700' :
                                                        item.Status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                                                            'bg-blue-100 text-blue-700'
                                                    }`}>
                                                    {item.Status || "Unknown"}
                                                </span>
                                            </div>

                                            <div className="grid grid-cols-2 gap-y-2 text-sm">
                                                <div className="flex items-center text-gray-600">
                                                    <User className="w-4 h-4 mr-2 text-gray-400" />
                                                    {item.PatientName || "Patient"}
                                                </div>
                                                <div className="flex items-center text-gray-600">
                                                    <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                                                    {item.RequestDate || "Date N/A"}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
