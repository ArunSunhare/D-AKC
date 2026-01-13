"use client";

import { useCart } from "@/app/context/CartContext";
import Link from "next/link";
import {Trash2,Info,ArrowLeft,FileText} from "lucide-react";
import { Navigation } from "../componets/navbar";
import { Footer } from "../componets/footer";
import { Hero } from "../componets/hero";
import { LoginModal } from "../componets/LoginModal";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function CartPage() {
    const { items, removeFromCart, cartTotal } = useCart();
    const router = useRouter();
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        // Check if user is logged in
        const storedUser = localStorage.getItem("user");
        if (!storedUser) {
            setShowLoginModal(true);
        }
    }, []);

    if (!mounted) {
        return null;
    }
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navigation />
            <Hero />
            <main className="flex-grow max-w-9xl mx-auto px-4 py-8">
                <div className="flex items-center justify-center mb-10">
                    {["Confirm Test", "Select Time", "Upload Documents", "Order Confirmation"].map(
                        (step, index) => (
                            <div key={step} className="flex items-center">
                                <div
                                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold
                                    ${index === 0
                                            ? "bg-orange-600 text-white"
                                            : "border border-gray-300 text-gray-400"
                                        }`}
                                >
                                    {index + 1}
                                </div>

                                <span
                                    className={`ml-2 mr-6 text-sm
                                    ${index === 0
                                            ? "text-orange-600 font-semibold"
                                            : "text-gray-400"
                                        }`}
                                >
                                    {step}
                                </span>

                                {index !== 3 && (
                                    <div className="w-12 h-[2px] bg-gray-300" />
                                )}
                            </div>
                        )
                    )}
                </div>
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 text-gray-600 hover:text-orange-600 mb-2"
                        >
                            <ArrowLeft size={16} />
                            Back to Home
                        </Link>
                        <h1 className="text-2xl font-bold">Cart</h1>
                    </div>

                    <Link
                        href="/investigations"
                        className="border border-orange-600 text-orange-600 px-4 py-2 rounded-md font-medium"
                    >
                        Add More Tests
                    </Link>
                </div>
                {items.length > 0 ? (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-4">
                            {items.map((item) => (
                                <div
                                    key={item.id}
                                    className="bg-white rounded-lg shadow p-4"
                                >
                                    <div className="flex justify-between items-center border rounded-md p-3">
                                        <div>
                                            <p className="font-medium">{item.name}</p>
                                            <p className="text-sm">
                                                {item.originalPrice && (
                                                    <span className="line-through text-gray-400 mr-2">
                                                        ₹{item.originalPrice}
                                                    </span>
                                                )}
                                                <span className="font-semibold">
                                                    ₹{item.price}
                                                </span>
                                            </p>
                                        </div>

                                        <Trash2
                                            className="text-red-500 cursor-pointer"
                                            size={18}
                                            onClick={() => removeFromCart(item.id)}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="space-y-4">
                            <div className="bg-white rounded-lg shadow p-4">
                                <h3 className="font-semibold mb-3">Payment</h3>

                                <div className="flex justify-between mb-2">
                                </div>
                                <div className="flex justify-between font-bold">
                                    <span>Total</span>
                                    <span>₹{cartTotal}</span>
                                </div>
                            </div>

                            <button
                                onClick={() => {
                                    const storedUser = localStorage.getItem("user");
                                    if (!storedUser) {
                                        setShowLoginModal(true);
                                    } else {
                                        router.push("/select-date");
                                    }
                                }}
                                className="w-full bg-orange-600 text-white text-center py-3 rounded-md font-semibold hover:bg-orange-700 transition"
                            >
                                Proceed to select Date
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-20">
                        <div className="bg-orange-100 w-24 h-24 rounded-full flex items-center justify-center mb-6">
                            <FileText className="w-10 h-10 text-orange-500" />
                        </div>
                        <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
                        <p className="text-gray-500 mb-6">
                            Please add tests to continue.
                        </p>
                        <Link
                            href="/investigations"
                            className="bg-orange-600 text-white px-6 py-3 rounded-md font-semibold"
                        >
                            Browse Tests
                        </Link>
                    </div>
                )}
            </main>

            <Footer />

            {/* Login Modal */}
            <LoginModal
                isOpen={showLoginModal}
                onClose={() => {
                    setShowLoginModal(false);
                    // If user closes modal without login, redirect to home
                    const storedUser = localStorage.getItem("user");
                    if (!storedUser) {
                        router.push("/");
                    }
                }}
                onSuccess={() => {
                    setShowLoginModal(false);
                    // User logged in, can proceed
                }}
            />
        </div>
    );
}
