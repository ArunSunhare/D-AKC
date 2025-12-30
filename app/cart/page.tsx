"use client";

import { useCart } from "@/app/context/CartContext";
import { Trash2, AlertCircle, Clock, FileText, ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Navigation } from "../componets/navbar";
import { Footer } from "../componets/footer";

export default function CartPage() {
    const { items, removeFromCart, cartTotal } = useCart();

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navigation />

            <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">

                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Health Cart</h1>
                    <p className="text-gray-500 mt-1">
                        {items.length === 0 ? "You have no items in your cart." : `You have ${items.length} items in your cart.`}
                    </p>
                </div>

                {items.length > 0 ? (
                    <div className="grid lg:grid-cols-3 gap-8">

                        {/* LEFT COLUMN: Cart Items */}
                        <div className="lg:col-span-2 space-y-4">
                            {items.map((item) => (
                                <div
                                    key={item.id}
                                    className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 transition hover:shadow-md"
                                >
                                    <div className="flex justify-between items-start">
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2">
                                                <span className="bg-orange-100 text-orange-700 text-xs px-2 py-0.5 rounded font-medium uppercase tracking-wide">
                                                    {item.type}
                                                </span>
                                                {item.Item_ID && (
                                                    <span className="text-xs text-gray-400 font-mono">ID: {item.Item_ID}</span>
                                                )}
                                            </div>
                                            <h3 className="text-xl font-semibold text-gray-900 leading-tight">
                                                {item.name}
                                            </h3>
                                        </div>

                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="text-gray-400 hover:text-red-500 transition-colors p-2 -mr-2"
                                            title="Remove Item"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </div>

                                    {/* Details Grid */}
                                    <div className="grid sm:grid-cols-2 gap-4 mt-4 pt-4 border-t border-gray-50">

                                        {/* Preparation */}
                                        {item.testPreparation && (
                                            <div className="flex items-start gap-2">
                                                <AlertCircle className="w-4 h-4 text-orange-500 mt-0.5 shrink-0" />
                                                <div className="text-sm">
                                                    <span className="block font-medium text-gray-700">Preparation:</span>
                                                    <span className="text-gray-600 leading-snug">{item.testPreparation}</span>
                                                </div>
                                            </div>
                                        )}

                                        {/* TAT */}
                                        {item.reportTat && (
                                            <div className="flex items-start gap-2">
                                                <Clock className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
                                                <div className="text-sm">
                                                    <span className="block font-medium text-gray-700">Report TAT:</span>
                                                    <span className="text-gray-600">{item.reportTat}</span>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex justify-end items-center mt-4 pt-4 border-t border-gray-100">
                                        <div className="text-right">
                                            {item.originalPrice && (
                                                <span className="text-gray-400 text-sm line-through mr-2">₹{item.originalPrice}</span>
                                            )}
                                            <span className="text-2xl font-bold text-gray-900">₹{item.price}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            <Link
                                href="/investigations"
                                className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 font-medium mt-4"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                Add More Tests
                            </Link>
                        </div>

                        {/* RIGHT COLUMN: Order Summary */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-24">
                                <h2 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h2>

                                <div className="space-y-3 mb-6">
                                    <div className="flex justify-between text-gray-600">
                                        <span>Subtotal</span>
                                        <span>₹{cartTotal}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600">
                                        <span>Home Collection Charges</span>
                                        <span className="text-green-600">FREE</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600">
                                        <span>Discount</span>
                                        <span className="text-green-600">- ₹0</span>
                                    </div>

                                    <div className="h-px bg-gray-200 my-2"></div>

                                    <div className="flex justify-between items-center text-lg font-bold text-gray-900">
                                        <span>Total Amount</span>
                                        <span>₹{cartTotal}</span>
                                    </div>
                                </div>

                                <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 flex gap-3 mb-6">
                                    <FileText className="w-5 h-5 text-blue-600 shrink-0" />
                                    <p className="text-xs text-blue-800 leading-tight">
                                        By proceeding, you agree to the Terms & Conditions and Privacy Policy of the center.
                                    </p>
                                </div>

                                <button className="w-full bg-orange-600 text-white py-4 rounded-lg font-bold hover:bg-orange-700 transition shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group">
                                    Proceed to Checkout
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </div>

                    </div>
                ) : (
                    /* Empty State */
                    <div className="flex flex-col items-center justify-center py-20 bg-white rounded-xl shadow-sm border border-gray-100">
                        <div className="bg-orange-50 w-24 h-24 rounded-full flex items-center justify-center mb-6">
                            <Clock className="w-10 h-10 text-orange-400" /> {/* Using Clock as placeholder, can replace with specific Empty Cart icon */}
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
                        <p className="text-gray-500 mb-8 text-center max-w-md">Looks like you haven't added any tests yet. Browse our comprehensive list of diagnostic tests.</p>
                        <Link
                            href="/investigations"
                            className="bg-orange-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-orange-700 transition"
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
