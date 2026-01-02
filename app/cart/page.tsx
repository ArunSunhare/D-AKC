"use client";

import { useCart } from "@/app/context/CartContext";
import { Trash2, AlertCircle, Clock, ArrowLeft, FileText, MapPin, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Navigation } from "../componets/navbar";
import { Footer } from "../componets/footer";

export default function CartPage() {
    const { items, removeFromCart, cartTotal } = useCart();

    // Calculate original total for showing savings
    const originalTotal = items.reduce((sum, item) => sum + (item.originalPrice || item.price), 0);
    const savings = originalTotal - cartTotal;

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex flex-col">
            <Navigation />

            <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header with Back Button */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 text-gray-600 hover:text-orange-600 transition font-medium mb-2"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back to Home
                        </Link>
                        <h1 className="text-3xl font-bold text-gray-900">Your Cart</h1>
                        <p className="text-gray-500 mt-1">{items.length} test(s) selected</p>
                    </div>
                </div>

                {items.length > 0 ? (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Cart Items - Left Column */}
                        <div className="lg:col-span-2 space-y-4">
                            {/* Centre Info */}
                            <div className="bg-orange-50 border border-orange-100 rounded-xl p-4 flex items-center gap-3">
                                <MapPin className="w-5 h-5 text-orange-600" />
                                <div>
                                    <p className="text-sm text-orange-600 font-medium">Centre Visit</p>
                                    <p className="font-bold text-gray-900">HOD Karkardooma</p>
                                </div>
                                <button className="ml-auto text-orange-600 text-sm font-medium hover:underline flex items-center gap-1">
                                    Change <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>

                            {/* Items */}
                            {items.map((item) => (
                                <div
                                    key={item.id}
                                    className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow p-5"
                                >
                                    <div className="flex justify-between items-start">
                                        <div className="flex-1 pr-4">
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs px-2 py-0.5 rounded-full font-medium uppercase">
                                                    {item.type}
                                                </span>
                                                {item.Item_ID && (
                                                    <span className="text-gray-400 text-xs">ID: {item.Item_ID}</span>
                                                )}
                                            </div>
                                            <h3 className="font-bold text-lg text-gray-900 mb-3">{item.name}</h3>

                                            {/* Test Details */}
                                            {/* <div className="space-y-2">
                                                {item.testPreparation && (
                                                    <div className="flex items-start gap-2 text-sm bg-amber-50 text-amber-800 p-2 rounded-lg">
                                                        <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                                                        <div>
                                                            <span className="font-medium">Preparation: </span>
                                                            {item.testPreparation}
                                                        </div>
                                                    </div>
                                                )}
                                                {item.reportTat && (
                                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                                        <Clock className="w-4 h-4 text-blue-500" />
                                                        <span><span className="font-medium">Report Time:</span> {item.reportTat}</span>
                                                    </div>
                                                )}
                                            </div> */}
                                        </div>

                                        {/* Price and Remove */}
                                        <div className="text-right flex flex-col items-end gap-3">
                                            <div>
                                                {item.originalPrice && item.originalPrice > item.price && (
                                                    <p className="text-gray-400 text-sm line-through">₹{item.originalPrice}</p>
                                                )}
                                                <p className="text-2xl font-bold text-gray-900">₹{item.price}</p>
                                                {item.originalPrice && item.originalPrice > item.price && (
                                                    <p className="text-green-600 text-xs font-medium">
                                                        Save ₹{item.originalPrice - item.price}
                                                    </p>
                                                )}
                                            </div>
                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                className="flex items-center gap-1 text-red-500 hover:text-red-700 text-sm font-medium transition"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {/* Add More Tests Button */}
                            <Link
                                href="/investigations"
                                className="block text-center border-2 border-dashed border-orange-300 text-orange-600 py-4 rounded-xl hover:bg-orange-50 transition font-medium"
                            >
                                + Add More Tests
                            </Link>
                        </div>

                        {/* Order Summary - Right Column */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-xl border border-gray-100 shadow-lg p-6 sticky top-24">
                                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                    <FileText className="w-5 h-5 text-orange-500" />
                                    Order Summary
                                </h2>

                                <div className="space-y-4 mb-6">
                                    <div className="flex justify-between text-gray-600">
                                        <span>Subtotal ({items.length} items)</span>
                                        <span>₹{originalTotal}</span>
                                    </div>

                                    {savings > 0 && (
                                        <div className="flex justify-between text-green-600">
                                            <span>Discount</span>
                                            <span>- ₹{savings}</span>
                                        </div>
                                    )}

                                    <div className="flex justify-between text-gray-600">
                                        <span>Home Collection</span>
                                        <span className="text-green-600 font-medium">FREE</span>
                                    </div>

                                    <div className="border-t border-gray-200 pt-4">
                                        <div className="flex justify-between text-lg font-bold text-gray-900">
                                            <span>Total</span>
                                            <span>₹{cartTotal}</span>
                                        </div>
                                    </div>
                                </div>

                                <button className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-4 rounded-xl font-bold hover:from-orange-600 hover:to-red-600 transition shadow-lg hover:shadow-xl">
                                    Proceed to Checkout
                                </button>

                                <p className="text-xs text-gray-400 text-center mt-4">
                                    Safe & Secure Payment | 100% Accurate Results
                                </p>
                            </div>
                        </div>
                    </div>
                ) : (
                    /* Empty State */
                    <div className="flex flex-col items-center justify-center py-20">
                        <div className="bg-orange-100 w-24 h-24 rounded-full flex items-center justify-center mb-6">
                            <FileText className="w-10 h-10 text-orange-500" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
                        <p className="text-gray-500 mb-8 text-center max-w-md">
                            Looks like you haven't added any tests yet. Browse our wide range of diagnostic tests.
                        </p>
                        <Link
                            href="/investigations"
                            className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-3 rounded-xl font-bold hover:from-orange-600 hover:to-red-600 transition shadow-lg"
                        >
                            Browse Tests
                        </Link>
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
}
