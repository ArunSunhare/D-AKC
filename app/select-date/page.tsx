"use client";

import { useState } from "react";
import { useCart } from "@/app/context/CartContext";
import Link from "next/link";
import {
    Trash2,
    ArrowLeft,
    FileText,
    Clock
} from "lucide-react";

import { Navigation } from "../componets/navbar";
import { Footer } from "../componets/footer";
import { Hero } from "../componets/hero";

export default function CartPage() {
    const { items, removeFromCart, cartTotal } = useCart();

    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedSlot, setSelectedSlot] = useState(null);

    const timeSlots = [
        "07:00 AM - 08:00 AM",
        "08:00 AM - 09:00 AM",
        "09:00 AM - 10:00 AM",
        "10:00 AM - 11:00 AM",
    ];

    const originalTotal = items.reduce(
        (sum, item) => sum + (item.originalPrice || item.price),
        0
    );
    const savings = originalTotal - cartTotal;

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navigation />
            <Hero />

            <main className="flex-grow max-w-7xl mx-auto px-4 py-8">

                <div className="flex items-center justify-center mb-10">
                    {["Confirm Test", "Select Date", "Upload Documents", "Order Confirmation"].map(
                        (step, index) => (
                            <div key={step} className="flex items-center">
                                <div
                                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold
                                    ${index <= 1
                                        ? "bg-orange-600 text-white"
                                        : "border border-gray-300 text-gray-400"
                                    }`}
                                >
                                    {index + 1}
                                </div>

                                <span
                                    className={`ml-2 mr-6 text-sm
                                    ${index === 1
                                        ? "text-orange-600 font-semibold"
                                        : "text-gray-400"
                                    }`}
                                >
                                    {step}
                                </span>

                                {index !== 3 && <div className="w-12 h-[2px] bg-gray-300" />}
                            </div>
                        )
                    )}
                </div>

        
                <div className="mb-6">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-gray-600 hover:text-orange-600 mb-2"
                    >
                        <ArrowLeft size={16} />
                        Back to Home
                    </Link>
                    <h1 className="text-2xl font-bold">Confirm Appointment</h1>
                </div>

                {items.length > 0 ? (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                      
                        <div className="lg:col-span-2 space-y-6">
                          
                            <div className="bg-white rounded-lg shadow p-6">
                                <p className="text-sm text-gray-500 mb-2">SELECT DATE</p>

                                <div className="grid grid-cols-7 gap-3 text-center">
                                    {Array.from({ length: 31 }).map((_, i) => (
                                        <button
                                            key={i}
                                            onClick={() => setSelectedDate(1+i)}
                                            className={`w-10 h-10 rounded-full
                                            ${selectedDate === i + 1
                                                ? "bg-orange-600 text-white"
                                                : "hover:bg-gray-100"
                                            }`}
                                        >
                                            {i + 1}
                                        </button>
                                    ))}
                                </div>
                            </div>

                       
                            <div className="bg-white rounded-lg shadow p-6">
                                <p className="text-sm text-gray-500 mb-3 flex items-center gap-2">
                                    <Clock size={16} /> SELECT TIME SLOT
                                </p>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {timeSlots.map((slot) => (
                                        <button
                                            key={slot}
                                            onClick={() => setSelectedSlot(slot)}
                                            className={`border rounded-lg py-3 font-medium
                                            ${selectedSlot === slot
                                                ? "border-orange-600 bg-orange-50 text-orange-600"
                                                : "hover:border-gray-400"
                                            }`}
                                        >
                                            {slot}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                     
                        <div className="space-y-4">

                            <div className="bg-white rounded-lg shadow p-4">
                                <h3 className="font-semibold mb-3">Payment</h3>

                                <div className="flex justify-between mb-2">
                                    <span>Sub Total</span>
                                    <span>₹{originalTotal}</span>
                                </div>

                                {savings > 0 && (
                                    <div className="flex justify-between text-green-600 mb-2">
                                        <span>Discount</span>
                                        <span>- ₹{savings}</span>
                                    </div>
                                )}

                                <div className="flex justify-between font-bold">
                                    <span>Total</span>
                                    <span>₹{cartTotal}</span>
                                </div>
                            </div>

                            <Link
                                href="/upload-documents"
                                className={`block text-center py-3 rounded-md font-semibold
                                ${selectedDate && selectedSlot
                                    ? "bg-orange-600 text-white"
                                    : "bg-gray-300 text-gray-500 pointer-events-none"
                                }`}
                            >
                                Proceed
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-20">
                        <FileText size={40} className="text-orange-500 mb-4" />
                        <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
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
        </div>
    );
}
