"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { X } from "lucide-react";
import Image from "next/image";
import type { ChangeEvent } from "react";


/* ---------------- HELPERS ---------------- */
function calculateAge(dob: string): string {
    if (!dob) return "";
    const birth = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    if (
        today.getMonth() < birth.getMonth() ||
        (today.getMonth() === birth.getMonth() &&
            today.getDate() < birth.getDate())
    ) {
        age--;
    }
    return age.toString();
}

interface LocationOption {
    id: string;
    name: string;
}

/* ---------------- COMPONENT ---------------- */
export default function RegisterPage() {
    const params = useSearchParams();
    const router = useRouter();
    const mobile = params.get("mobile") || "";
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

        // 👇 NAME (display)
        country: "",
        state: "",
        district: "",
        city: "",

        // 👇 ID (API)
        countryId: "",
        stateId: "",
        districtId: "",
        cityId: ""
    });



    const [countries, setCountries] = useState<LocationOption[]>([]);
    const [states, setStates] = useState<LocationOption[]>([]);
    const [districts, setDistricts] = useState<LocationOption[]>([]);
    const [cities, setCities] = useState<LocationOption[]>([]);

    const [selectedCountry, setSelectedCountry] = useState<LocationOption>({ id: "", name: "" });
    const [selectedState, setSelectedState] = useState<LocationOption>({ id: "", name: "" });
    const [selectedDistrict, setSelectedDistrict] = useState<LocationOption>({ id: "", name: "" });
    const [selectedCity, setSelectedCity] = useState<LocationOption>({ id: "", name: "" });

    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [loading, setLoading] = useState(false);
    const [locationLoading, setLocationLoading] = useState(false);

    /* ---------------- LOAD COUNTRIES ---------------- */
    useEffect(() => {
        loadCountries();
    }, []);

    const loadCountries = async () => {
        try {
            setLocationLoading(true);

            const res = await fetch("/api/get-countries");
            const json = await res.json();

            // 🔍 FULL DEBUG
            console.log("🌍 COUNTRY API FULL RESPONSE:", json);

            if (json?.Status === "Success" && Array.isArray(json.Data)) {
                console.log("🌍 COUNTRIES ARRAY:", json.Data);
                // 🔥 FIX: Ensure IDs are strings for consistency
                const stringifiedCountries = json.Data.map((c: any) => ({
                    id: String(c.id),
                    name: c.name
                }));
                setCountries(stringifiedCountries);
            } else {
                console.warn("⚠️ COUNTRY DATA EMPTY OR INVALID");
                setCountries([]);
            }

        } catch (err) {
            console.error("❌ Load countries failed", err);
            setCountries([]);
        } finally {
            setLocationLoading(false);
        }
    };


    /* ---------------- COUNTRY CHANGE ---------------- */
    const handleCountryChange = async (
        e: React.ChangeEvent<HTMLSelectElement>
    ) => {
        const id = e.target.value;

        const country = countries.find(c => String(c.id) === id);
        if (!country) return;

        setForm(prev => ({
            ...prev,
            country: country.name,
            countryId: country.id,
            state: "",
            stateId: "",
            district: "",
            districtId: "",
            city: "",
            cityId: ""
        }));

        setStates([]);
        setDistricts([]);
        setCities([]);

        const res = await fetch(`/api/get-states?countryId=${id}`);
        const json = await res.json();

        console.log("✅ STATES API ARUNANSIS:", json);

        // 🔥 FIX: Ensure IDs are strings for states too
        const stringifiedStates = (json.Data || []).map((s: any) => ({
            id: String(s.id),
            name: s.name
        }));
        setStates(stringifiedStates);
    };



    /* ---------------- STATE CHANGE ---------------- */
    const handleStateChange = async (
        e: ChangeEvent<HTMLSelectElement>
    ) => {
        const id = e.target.value;
        const state = states.find(s => String(s.id) === id);
        console.log("🔍 Selected State ID:", id); // 🔥 Added log for debugging
        if (!state) return;

        setForm(prev => ({
            ...prev,
            state: state.name,
            stateId: state.id,
            district: "",
            districtId: "",
            city: "",
            cityId: ""
        }));

        const res = await fetch(`/api/get-districts?stateId=${id}`);
        const json = await res.json();

        // 🔥 ADD THIS LINE
        console.log("✅ DISTRICTS API RESPONSE:", json);
        console.log("✅ DISTRICTS DATA:", json.Data);

        const stringifiedDistricts = (json.Data || []).map((d: any) => {
            console.log("Arun sdfkjdsfkldj:", state.name); // Add this first
            return {
                id: String(d.DistrictID || d.districtID || d.District_ID || d.Id || d.id),
                name: d.DistrictName || d.districtName || d.District_Name || d.Name || d.name
            };
        });
        setDistricts(stringifiedDistricts);
    };


    /* ---------------- DISTRICT CHANGE ---------------- */
    const handleDistrictChange = async (
        e: ChangeEvent<HTMLSelectElement>
    ) => {
        const id = e.target.value;
        const district = districts.find(d => String(d.id) === id);

        if (!district) return;

        setForm(prev => ({
            ...prev,
            district: district.name,
            districtId: district.id,
            city: "",
            cityId: ""
        }));

        const res = await fetch(`/api/get-cities?districtId=${id}`);
        const json = await res.json();
        console.log("✅ DISTRICTS API FULL RESPONSE:", json);
        console.log("✅ DISTRICTS DATA ARRAY:", json.Data);

        // 🔥 FIX: Ensure IDs are strings for cities
        const stringifiedCities = (json.Data || []).map((c: any) => ({
            id: String(c.id),
            name: c.name
        }));
        setCities(stringifiedCities);
    };


    /* ---------------- CITY CHANGE ---------------- */
    const handleCityChange = (
        e: ChangeEvent<HTMLSelectElement>
    ) => {
        const id = e.target.value;
        const city = cities.find(c => String(c.id) === id);

        if (!city) return;

        setForm(prev => ({
            ...prev,
            city: city.name,
            cityId: city.id
        }));
    };


    /* ---------------- SUBMIT ---------------- */
   const handleSubmit = async () => {
    if (
        !form.firstName ||
        !form.dob ||
        !form.address ||
        !form.postalCode ||
        !form.country ||
        !form.state ||
        !form.district ||
        !form.city
    ) {
        alert("Please fill all required fields");
        return;
    }

    setLoading(true);
    const payload = {
        isRegisteredPatient: "0",
        PatientId: "",

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
        Document: "",
        TestDetails: []
    };

    try {
        const res = await fetch("/api/register-patient", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });

        const json = await res.json();

        console.log("📦 REGISTER RAW:", json.raw);

        // 🔥 FIX: Parse double-wrapped SOAP response
        let parsed = null;
        try {
            const outerParsed = JSON.parse(json.raw);
            if (outerParsed && outerParsed.d) {
                parsed = JSON.parse(outerParsed.d);
            }
        } catch (e) {
            console.error("❌ JSON PARSE ERROR", e);
        }

        console.log("✅ PARSED REGISTER RESPONSE:", parsed);

        if (parsed?.status === "Success") {
            const userToStore = {
                name: `${form.firstName} ${form.lastName}`.trim(),
                mobile: form.phoneNumber,
                requestId: parsed.data?.[0]?.RequestID
            };

            localStorage.setItem("user", JSON.stringify(userToStore));
            alert("Registration successful!");
            router.replace("/");
        } else {
            alert(parsed?.message || "Registration failed");
        }

    } catch (error) {
        console.error("❌ REGISTER API ERROR:", error);
        alert("Something went wrong. Please try again.");
    } finally {
        setLoading(false);
    }
};


    return (
        <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
            {/* Background */}
            <Image
                src="/assets/hero.jpg"
                alt="Background"
                fill
                priority
                className="object-cover"
            />
            <div className="absolute inset-0 bg-black/40"></div>

            <div className="relative z-10 w-full flex justify-center">
                {/* Outer Blue Container */}
                <div className="w-full max-w-3xl bg-blue-500 rounded-[40px] p-6 shadow-xl">
                    <div className="text-center text-white text-2xl font-bold mb-4">
                        Shri Hanuman Balaji Charitable <br /> Diagnostic Centre
                    </div>

                    {/* Inner White Card */}
                    <div className="bg-white rounded-2xl p-8 relative">
                        {/* Close Button */}
                        <button
                            onClick={() => router.back()}
                            className="absolute right-4 top-4 text-gray-500 hover:text-orange-500"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        {/* Logo */}
                        <div className="flex justify-center mb-4">
                            <div className="relative w-64 h-24">
                                <Image
                                    src="/assets/logo_main.png"
                                    alt="Logo"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        </div>

                        <p className="text-center text-blue-500 font-semibold mb-6">
                            Create New Patient
                        </p>

                        {/* FORM */}
                        <div className="space-y-4">
                            {/* Title + First Name */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-gray-700 font-medium mb-2">
                                        Title *
                                    </label>
                                    <select
                                        value={form.title}
                                        onChange={(e) =>
                                            setForm({ ...form, title: e.target.value })
                                        }
                                        className="w-full px-4 py-3 border text-gray-900 border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-orange-500"
                                    >
                                        <option value="Mr">Mr</option>
                                        <option value="Mrs">Mrs</option>
                                        <option value="Ms">Ms</option>
                                        <option value="Dr">Dr</option>
                                        <option value="Baby">Baby</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-gray-700 font-medium mb-2">
                                        First Name *
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter First Name"
                                        value={form.firstName}
                                        onChange={(e) =>
                                            setForm({ ...form, firstName: e.target.value })
                                        }
                                        className={`w-full px-4 py-3 border text-gray-900 rounded-lg outline-none focus:ring-2 focus:ring-orange-500 ${errors.firstName ? "border-red-500" : "border-gray-300"
                                            }`}
                                    />
                                    {errors.firstName && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.firstName}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Last Name + Gender */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-gray-700 font-medium mb-2">
                                        Last Name
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter Last Name"
                                        value={form.lastName}
                                        onChange={(e) =>
                                            setForm({ ...form, lastName: e.target.value })
                                        }
                                        className="w-full px-4 py-3 border text-gray-900 border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-orange-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-gray-700 font-medium mb-2">
                                        Gender *
                                    </label>
                                    <select
                                        value={form.gender}
                                        onChange={(e) =>
                                            setForm({ ...form, gender: e.target.value })
                                        }
                                        className="w-full px-4 py-3 border text-gray-900 border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-orange-500"
                                    >
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                            </div>

                            {/* Email + DOB */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-gray-700 font-medium mb-2">
                                        Email *
                                    </label>
                                    <input
                                        type="email"
                                        placeholder="Enter Email"
                                        value={form.email}
                                        onChange={(e) =>
                                            setForm({ ...form, email: e.target.value })
                                        }
                                        className={`w-full px-4 py-3 border text-gray-900 rounded-lg outline-none focus:ring-2 focus:ring-orange-500 ${errors.email ? "border-red-500" : "border-gray-300"
                                            }`}
                                    />
                                    {errors.email && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.email}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-gray-700 font-medium mb-2">
                                        Date of Birth *
                                    </label>
                                    <input
                                        type="date"
                                        value={form.dob}
                                        onChange={(e) =>
                                            setForm({ ...form, dob: e.target.value })
                                        }
                                        className={`w-full px-4 py-3 border text-gray-900 rounded-lg outline-none focus:ring-2 focus:ring-orange-500 ${errors.dob ? "border-red-500" : "border-gray-300"
                                            }`}
                                    />
                                    {form.dob && (
                                        <p className="text-sm text-gray-600 mt-1">
                                            Age: {calculateAge(form.dob)} years
                                        </p>
                                    )}
                                    {errors.dob && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.dob}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Phone + Pincode */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-gray-700 font-medium mb-2">
                                        Phone Number *
                                    </label>
                                    <input
                                        type="tel"
                                        value={form.phoneNumber}
                                        readOnly
                                        className="w-full px-4 py-3 border bg-gray-100 text-gray-700 rounded-lg outline-none"
                                    />
                                    {errors.phoneNumber && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.phoneNumber}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-gray-700 font-medium mb-2">
                                        Postal Code *
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter Pincode"
                                        value={form.postalCode}
                                        onChange={(e) =>
                                            setForm({ ...form, postalCode: e.target.value })
                                        }
                                        className={`w-full px-4 py-3 border text-gray-900 rounded-lg outline-none focus:ring-2 focus:ring-orange-500 ${errors.postalCode ? "border-red-500" : "border-gray-300"
                                            }`}
                                    />
                                    {errors.postalCode && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.postalCode}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Address */}
                            <div>
                                <label className="block text-gray-700 font-medium mb-2">
                                    Address *
                                </label>
                                <textarea
                                    placeholder="Enter full address (House No, Street, etc.)"
                                    value={form.address}
                                    onChange={(e) =>
                                        setForm({ ...form, address: e.target.value })
                                    }
                                    className={`w-full px-4 py-3 border text-gray-900 rounded-lg outline-none focus:ring-2 focus:ring-orange-500 ${errors.address ? "border-red-500" : "border-gray-300"
                                        }`}
                                    rows={3}
                                />
                                {errors.address && (
                                    <p className="text-red-500 text-sm mt-1">{errors.address}</p>
                                )}
                            </div>

                            {/* Country + State */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-gray-700 font-medium mb-2">
                                        Country *
                                    </label>
                                    <select
                                        value={form.countryId}
                                        onChange={handleCountryChange}
                                        className="w-full px-4 py-3 border text-black rounded-lg"
                                    >
                                        <option value="">Select Country</option>
                                        {countries.map((c) => (
                                            <option key={c.id} value={c.id}>
                                                {c.name}
                                            </option>
                                        ))}
                                    </select>



                                </div>

                                <div>
                                    <label className="block text-gray-700 font-medium mb-2">
                                        State *
                                    </label>
                                    <select
                                        value={form.stateId}
                                        onChange={handleStateChange}
                                        disabled={!form.countryId}
                                        className="w-full px-4 py-3 text-black border rounded-lg"
                                    >
                                        <option value="">Select State</option>

                                        {states.map((s) => (
                                            <option key={s.id} value={s.id}>
                                                {s.name}
                                            </option>

                                        ))}
                                    </select>

                                </div>
                            </div>


                            {/* District + City */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-gray-700 font-medium mb-2">
                                        District *
                                    </label>
                                    <select
                                        value={form.districtId}
                                        onChange={handleDistrictChange}
                                        disabled={!form.stateId}
                                        className="w-full px-4 text-black py-3 border rounded-lg"
                                    >
                                        <option value="">Select District</option>
                                        {districts.map((d) => (
                                            <option key={d.id} value={d.id}>
                                                {d.name}
                                            </option>
                                        ))}
                                    </select>

                                </div>

                                <div>
                                    <label className="block text-gray-700 font-medium mb-2">
                                        City *
                                    </label>
                                    <select
                                        value={form.cityId}
                                        onChange={handleCityChange}
                                        disabled={!form.districtId}
                                        className="w-full px-4 text-black py-3 border rounded-lg"
                                    >
                                        <option value="">Select City</option>
                                        {cities.map((c) => (
                                            <option key={c.id} value={c.id}>
                                                {c.name}
                                            </option>
                                        ))}
                                    </select>

                                </div>
                            </div>


                            {/* Save Button */}
                            <button
                                onClick={handleSubmit}
                                disabled={loading || locationLoading}
                                className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white font-semibold py-3 rounded-lg transition mt-6"
                            >
                                {loading ? "Saving..." : "Save & Continue"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}