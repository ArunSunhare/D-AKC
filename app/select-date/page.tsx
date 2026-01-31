"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/app/context/CartContext";
import Link from "next/link";
import {
    ArrowLeft,
    FileText,
    Clock
} from "lucide-react";

import { Navigation } from "../componets/navbar";
import { Footer } from "../componets/footer";
import { Hero } from "../componets/hero";
import { LoginModal } from "../componets/LoginModal";
import { MainNavbar } from "../componets/MainNavbar";
import { TopNavbar } from "../componets/TopNavbar";
import { TopHeader } from "../componets/top_header";

type UserProfile = {
    Title?: string;
    FirstName?: string;
    PatientLastName?: string;
    Gender?: string;
    DOB?: string;
    Age?: string;
    MobileNo?: string;
    Email?: string;
    Address?: string;
    Country?: string;
    CountryID?: string;
    State?: string;
    StateID?: string;
    District?: string;
    DistrictID?: string;
    City?: string;
    CityID?: string;
    PinCode?: string;
    PatientId?: string;
    MRNo?: string;
    name?: string;
    mobile?: string;
};

function calculateAge(dob: string): string {
    if (!dob) return "";
    const birth = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
    return String(age);
}

export default function CartPage() {
    const router = useRouter();
    const { items, cartTotal, clearCart } = useCart();

    const [selectedDay, setSelectedDay] = useState<number | null>(null);
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string>("");
    const [statusMessage, setStatusMessage] = useState<string>("");
    const [showLoginModal, setShowLoginModal] = useState(false);

    const timeSlots = [
        "07:00 AM - 08:00 AM",
        "08:00 AM - 09:00 AM",
        "09:00 AM - 10:00 AM",
        "10:00 AM - 11:00 AM",
    ];

    useEffect(() => {
        if (typeof window === "undefined") return;
        
        // Check if user is logged in
        const storedUser = localStorage.getItem("user");
        if (!storedUser) {
            // Show login modal instead of redirecting
            setShowLoginModal(true);
            return;
        }

        const stored = localStorage.getItem("userProfile");
        if (stored) {
            try {
                setUserProfile(JSON.parse(stored));
            } catch (e) {
                console.error("Failed to parse userProfile", e);
            }
        } else {
            // If no profile, user can still book (will fill form)
            const userData = JSON.parse(storedUser);
            setUserProfile({
                MobileNo: userData.mobile || "",
                name: userData.name || "",
            });
        }
    }, [router]);

    const originalTotal = items.reduce(
        (sum, item) => sum + (item.originalPrice || item.price),
        0
    );
    const savings = originalTotal - cartTotal;

    const hasRadiology = useMemo(
        () => items.some((i) => (i.CategoryID || "").toLowerCase() === "lshhi7"),
        [items]
    );

    const handleDateClick = (day: number) => {
        const today = new Date();
        const dateObj = new Date(today.getFullYear(), today.getMonth(), day);
        setSelectedDay(day);
        setSelectedDate(dateObj.toISOString().split("T")[0]);
    };

    const buildPayload = () => {
        if (!userProfile) return null;

        const testDetails = items.map((item) => ({
            ItemName: item.name,
            ItemID: item.Item_ID || item.id,
            CategoryID: item.CategoryID || "",
            SubCategoryID: item.SubCategoryID || "",
            Amount: Number(item.price) || 0,
        }));

        const age = userProfile.Age || (userProfile.DOB ? calculateAge(userProfile.DOB) : "");

        // Determine if user is registered or new
        // Existing user: has PatientId or MRNo
        // New user: no PatientId/MRNo (data saved in session only)
        const isRegistered = !!(userProfile.PatientId || userProfile.MRNo);

        // Build payload for GenerateLabTest API
        // This combines user info (from GetPatient API for existing users OR from form for new users) + test details
        return {
            isRegisteredPatient: isRegistered ? "1" : "0",
            PatientId: userProfile.PatientId || userProfile.MRNo || "",
            Title: userProfile.Title || "Mr",
            FirstName: userProfile.FirstName || userProfile.name || "",
            PatientLastName: userProfile.PatientLastName || "",
            Gender: userProfile.Gender || "Male",
            DOB: userProfile.DOB || "",
            Age: age,
            MobileNo: userProfile.MobileNo || userProfile.mobile || "",
            Email: userProfile.Email || "",
            Address: userProfile.Address || "",
            Country: userProfile.Country || "",
            CountryID: userProfile.CountryID || "",
            State: userProfile.State || "",
            StateID: userProfile.StateID || "",
            District: userProfile.District || "",
            DistrictID: userProfile.DistrictID || "",
            City: userProfile.City || "",
            CityID: userProfile.CityID || "",
            PinCode: userProfile.PinCode || "",
            Document: "",
            TestDetails: testDetails,
        };
    };

    const handleSubmitBooking = async () => {
        const storedUser = localStorage.getItem("user");
        if (!storedUser) {
            setError("Please login before booking.");
            setShowLoginModal(true);
            return;
        }

        if (!items.length) {
            setError("Please add at least one test.");
            return;
        }
        if (!selectedDate) {
            setError("Please select a date.");
            return;
        }
        if (hasRadiology && !selectedSlot) {
            setError("Please select a time slot for radiology tests.");
            return;
        }

        // Check if user profile has required fields for booking
        // For new users, redirect to registration form if data is incomplete
        if (!userProfile?.FirstName || !userProfile?.DOB || !userProfile?.Address || !userProfile?.Country || !userProfile?.State || !userProfile?.City) {
            setError("Please complete your profile information. Redirecting to form...");
            setTimeout(() => {
                const storedUser = localStorage.getItem("user");
                const userData = storedUser ? JSON.parse(storedUser) : {};
                router.push(`/register?mobile=${userData.mobile || userProfile?.MobileNo || ""}`);
            }, 2000);
            return;
        }

        const payload = buildPayload();
        if (!payload) {
            setError("Please complete all required fields.");
            return;
        }

        setSubmitting(true);
        setError("");
        setStatusMessage("");

        try {
            // Call GenerateLabTest API (register-patient route)
            // This API will:
            // - For existing users: Use existing PatientId
            // - For new users: Auto-register the patient and create booking
            const res = await fetch("/api/register-patient", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            let data;
            try {
                data = await res.json();
            } catch (e) {
                setError("Invalid response from server. Please try again.");
                return;
            }

            if (res.ok && data?.success !== false) {
                const reqId = data?.requestId;
                
                // Update user profile with requestId if it's a new user
                if (!userProfile?.PatientId && !userProfile?.MRNo && reqId) {
                    const updatedProfile = {
                        ...userProfile,
                        requestId: reqId,
                    };
                    localStorage.setItem("userProfile", JSON.stringify(updatedProfile));
                }

                setStatusMessage(reqId ? `Booking successful! Request ID: ${reqId}` : "Booking successful!");
                clearCart();
                localStorage.removeItem("cart_items");
                
                // Store booking info for profile page
                const bookingInfo = {
                    requestId: reqId,
                    date: selectedDate,
                    slot: selectedSlot,
                    tests: items.map(i => ({ name: i.name, price: i.price })),
                    total: cartTotal,
                    timestamp: new Date().toISOString()
                };
                const existingBookings = JSON.parse(localStorage.getItem("bookings") || "[]");
                existingBookings.push(bookingInfo);
                localStorage.setItem("bookings", JSON.stringify(existingBookings));
                
                // Redirect to profile after 2 seconds
                setTimeout(() => {
                    router.push("/patient_profile");
                }, 2000);
            } else {
                const errorMsg = data?.message || data?.error || `Booking failed (${res.status}). Please check your details and try again.`;
                setError(errorMsg);
                console.error("Booking failed:", data);
            }
        } catch (err) {
            console.error("Booking error", err);
            setError("Network error, please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <TopHeader />
                  <TopNavbar />
                  <MainNavbar />
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
                    {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
                    {statusMessage && <p className="text-green-600 mt-2 text-sm">{statusMessage}</p>}
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
                                            onClick={() => handleDateClick(1 + i)}
                                            className={`w-10 h-10 rounded-full
                                            ${selectedDay === i + 1
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

                            <button
                                onClick={handleSubmitBooking}
                                disabled={submitting || !selectedDate || (hasRadiology && !selectedSlot)}
                                className={`block w-full text-center py-3 rounded-md font-semibold
                                ${selectedDate && (!hasRadiology || selectedSlot)
                                        ? "bg-orange-600 text-white"
                                        : "bg-gray-300 text-gray-500 pointer-events-none"
                                    }`}
                            >
                                {submitting ? "Submitting..." : "Confirm & Submit"}
                            </button>
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
                    // Reload user profile after login
                    const stored = localStorage.getItem("userProfile");
                    if (stored) {
                        try {
                            setUserProfile(JSON.parse(stored));
                        } catch (e) {
                            console.error("Failed to parse userProfile", e);
                        }
                    }
                }}
            />
        </div>
    );
}
