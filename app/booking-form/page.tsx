"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCart } from "@/app/context/CartContext";
import { ArrowLeft, X } from "lucide-react";
import Image from "next/image";
import { Navigation } from "../componets/navbar";
import { Footer } from "../componets/footer";

function calculateAge(dob: string): string {
    if (!dob) return "";
    const birth = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
    return String(age);
}

interface LocationOption {
    id: string;
    name: string;
}

export default function BookingFormPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { items, cartTotal } = useCart();
    const mobile = searchParams.get("mobile") || "";

    const [form, setForm] = useState({
        title: "Mr",
        firstName: "",
        lastName: "",
        gender: "Male",
        email: "",
        dob: "",
        phoneNumber: mobile,
        address: "",
        postalCode: "",
        country: "",
        state: "",
        district: "",
        city: "",
        countryId: "",
        stateId: "",
        districtId: "",
        cityId: ""
    });

    const [countries, setCountries] = useState<LocationOption[]>([]);
    const [states, setStates] = useState<LocationOption[]>([]);
    const [districts, setDistricts] = useState<LocationOption[]>([]);
    const [cities, setCities] = useState<LocationOption[]>([]);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [loading, setLoading] = useState(false);
    const [locationLoading, setLocationLoading] = useState(false);

    useEffect(() => {
        // Load existing profile if available
        const storedProfile = localStorage.getItem("userProfile");
        if (storedProfile) {
            try {
                const profile = JSON.parse(storedProfile);
                setForm(prev => ({
                    ...prev,
                    title: profile.Title || "Mr",
                    firstName: profile.FirstName || profile.PFirstName || "",
                    lastName: profile.PatientLastName || profile.PLastName || "",
                    gender: profile.Gender || "Male",
                    email: profile.Email || "",
                    dob: profile.DOB || "",
                    phoneNumber: profile.MobileNo || mobile,
                    address: profile.Address || profile.House_No || "",
                    postalCode: profile.PinCode || "",
                    country: profile.Country || "",
                    state: profile.State || "",
                    district: profile.District || "",
                    city: profile.City || "",
                }));
            } catch (e) {
                console.error("Failed to load profile", e);
            }
        }
        loadCountries();
    }, []);

    const loadCountries = async () => {
        try {
            setLocationLoading(true);
            const res = await fetch("/api/get-countries");
            const json = await res.json();
            if (json?.Status === "Success" && Array.isArray(json.Data)) {
                const stringifiedCountries = json.Data.map((c: any) => ({
                    id: String(c.id),
                    name: c.name
                }));
                setCountries(stringifiedCountries);
            }
        } catch (err) {
            console.error("Load countries failed", err);
        } finally {
            setLocationLoading(false);
        }
    };

    const handleCountryChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const id = e.target.value;
        const country = countries.find(c => c.id === id);
        if (!country) return;
        setForm(prev => ({
            ...prev,
            country: country.name,
            countryId: country.id,
            state: "", stateId: "", district: "", districtId: "", city: "", cityId: ""
        }));
        setStates([]); setDistricts([]); setCities([]);
        const res = await fetch(`/api/get-states?countryId=${id}`);
        const json = await res.json();
        const stringifiedStates = (json.Data || []).map((s: any) => ({
            id: String(s.id),
            name: s.name
        }));
        setStates(stringifiedStates);
    };

    const handleStateChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const id = e.target.value;
        const state = states.find(s => s.id === id);
        if (!state) return;
        setForm(prev => ({
            ...prev,
            state: state.name,
            stateId: state.id,
            district: "", districtId: "", city: "", cityId: ""
        }));
        setDistricts([]); setCities([]);
        const res = await fetch(`/api/get-districts?stateId=${id}`);
        const json = await res.json();
        const stringifiedDistricts = (json.Data || []).map((d: any) => ({
            id: String(d.DistrictID || d.districtID || d.District_ID || d.Id || d.id),
            name: d.District || d.DistrictName || d.districtName || d.District_Name || d.Name || d.name
        }));
        setDistricts(stringifiedDistricts);
    };

    const handleDistrictChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const id = e.target.value;
        const district = districts.find(d => d.id === id);
        if (!district) return;
        setForm(prev => ({
            ...prev,
            district: district.name,
            districtId: district.id,
            city: "", cityId: ""
        }));
        setCities([]);
        const res = await fetch(`/api/get-cities?districtId=${id}`);
        const json = await res.json();
        const stringifiedCities = (json.Data || []).map((c: any) => ({
            id: String(c.id),
            name: c.name
        }));
        setCities(stringifiedCities);
    };

    const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const id = e.target.value;
        const city = cities.find(c => c.id === id);
        if (!city) return;
        setForm(prev => ({
            ...prev,
            city: city.name,
            cityId: city.id
        }));
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        // Validation
        if (!form.firstName || !form.dob || !form.address || !form.postalCode || !form.country || !form.state || !form.district || !form.city) {
            alert("Please fill all required fields");
            return;
        }

        setLoading(true);

        try {
            // Save user profile data in session/localStorage (NOT in DB yet)
            // This data will be sent to GenerateLabTest API after payment
            const userProfile = {
                Title: form.title,
                FirstName: form.firstName,
                PatientLastName: form.lastName,
                Gender: form.gender,
                DOB: form.dob,
                Age: calculateAge(form.dob),
                MobileNo: form.phoneNumber,
                Email: form.email,
                Address: form.address,
                Country: form.country,
                CountryID: form.countryId,
                State: form.state,
                StateID: form.stateId,
                District: form.district,
                DistrictID: form.districtId,
                City: form.city,
                CityID: form.cityId,
                PinCode: form.postalCode,
                // Mark as new user (not registered yet)
                isRegisteredPatient: "0",
                PatientId: "",
            };

            // Store user profile in localStorage
            localStorage.setItem("userProfile", JSON.stringify(userProfile));

            // Update user info
            const userToStore = {
                name: `${form.firstName} ${form.lastName}`.trim(),
                mobile: form.phoneNumber,
            };
            localStorage.setItem("user", JSON.stringify(userToStore));

            // Check if cart has items
            const hasCartItems = items.length > 0;

            // Redirect based on cart status
            if (hasCartItems) {
                // If cart has items, go to select-date page
                router.push("/select-date");
            } else {
                // If no cart items, go to investigations page to select tests
                router.push("/investigations");
            }
        } catch (error) {
            console.error("SAVE PROFILE ERROR:", error);
            alert("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
            <Image src="/assets/hero.jpg" alt="Background" fill priority className="object-cover" />
            <div className="absolute inset-0 bg-black/40"></div>
            <div className="relative z-10 w-full flex justify-center">
                <div className="w-full max-w-3xl bg-blue-500 rounded-[40px] p-6 shadow-xl">
                    <div className="text-center text-white text-2xl font-bold mb-4">
                        Shri Hanuman Balaji Charitable <br /> Diagnostic Centre
                    </div>
                    <div className="bg-white rounded-2xl p-8 relative">
                        <button onClick={() => router.back()} className="absolute right-4 top-4 text-gray-500 hover:text-orange-500">
                            <X className="w-6 h-6" />
                        </button>
                        <div className="flex justify-center mb-4">
                            <div className="relative w-64 h-24">
                                <Image src="/assets/logo_main.png" alt="Logo" fill className="object-contain" />
                            </div>
                        </div>
                        <p className="text-center text-blue-500 font-semibold mb-6">Complete Your Booking</p>

                        <div className="space-y-6">
                            {/* Personal Details */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                                    <select name="title" value={form.title} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md">
                                        <option>Mr</option>
                                        <option>Mrs</option>
                                        <option>Ms</option>
                                        <option>Dr</option>
                                        <option>Baby</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
                                    <input type="text" name="firstName" value={form.firstName} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md" required />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                                    <input type="text" name="lastName" value={form.lastName} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Gender *</label>
                                    <select name="gender" value={form.gender} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md">
                                        <option>Male</option>
                                        <option>Female</option>
                                        <option>Other</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth *</label>
                                    <input type="date" name="dob" value={form.dob} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md" required />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                    <input type="tel" name="phoneNumber" value={form.phoneNumber} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md" disabled />
                                </div>
                                <div className="lg:col-span-3">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                    <input type="email" name="email" value={form.email} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                                </div>
                            </div>

                            {/* Address Details */}
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Address *</label>
                                    <textarea name="address" value={form.address} onChange={(e: any) => handleInputChange(e)} rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-md" required />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Postal Code / PIN *</label>
                                    <input type="text" name="postalCode" value={form.postalCode} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md" required />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Country *</label>
                                        <select value={form.countryId} onChange={handleCountryChange} className="w-full px-3 py-2 border border-gray-300 rounded-md" disabled={locationLoading}>
                                            <option value="">Select Country</option>
                                            {countries.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">State *</label>
                                        <select value={form.stateId} onChange={handleStateChange} className="w-full px-3 py-2 border border-gray-300 rounded-md" disabled={!form.countryId}>
                                            <option value="">Select State</option>
                                            {states.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">District *</label>
                                        <select value={form.districtId} onChange={handleDistrictChange} className="w-full px-3 py-2 border border-gray-300 rounded-md" disabled={!form.stateId}>
                                            <option value="">Select District</option>
                                            {districts.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
                                        <select value={form.cityId} onChange={handleCityChange} className="w-full px-3 py-2 border border-gray-300 rounded-md" disabled={!form.districtId}>
                                            <option value="">Select City</option>
                                            {cities.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={handleSubmit}
                                disabled={loading || locationLoading}
                                className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white font-semibold py-3 rounded-lg transition mt-8"
                            >
                                {loading ? "Submitting..." : "Submit Booking"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
