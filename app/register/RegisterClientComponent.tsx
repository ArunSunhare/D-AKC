"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect, ChangeEvent } from "react";
import { X } from "lucide-react";
import Image from "next/image";

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

/* ---------------- CLIENT COMPONENT ---------------- */
export default function RegisterClientComponent() {
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

    /* ---------------- LOAD COUNTRIES ---------------- */
    useEffect(() => {
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
            } else {
                setCountries([]);
            }
        } catch (err) {
            console.error("Load countries failed", err);
            setCountries([]);
        } finally {
            setLocationLoading(false);
        }
    };

    /* ---------------- LOCATION HANDLERS ---------------- */
    const handleCountryChange = async (e: ChangeEvent<HTMLSelectElement>) => {
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

    const handleStateChange = async (e: ChangeEvent<HTMLSelectElement>) => {
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
            name: d.DistrictName || d.districtName || d.District_Name || d.Name || d.name
        }));
        setDistricts(stringifiedDistricts);
    };

    const handleDistrictChange = async (e: ChangeEvent<HTMLSelectElement>) => {
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

    const handleCityChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const id = e.target.value;
        const city = cities.find(c => c.id === id);
        if (!city) return;
        setForm(prev => ({
            ...prev,
            city: city.name,
            cityId: city.id
        }));
    };

    /* ---------------- INPUT CHANGE ---------------- */
    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    /* ---------------- SUBMIT ---------------- */
    const handleSubmit = async () => {
        // Validation
        if (
            !form.firstName || !form.dob || !form.address ||
            !form.postalCode || !form.country || !form.state ||
            !form.district || !form.city
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
            let parsed = null;
            try {
                const outerParsed = JSON.parse(json.raw);
                if (outerParsed && outerParsed.d) {
                    parsed = JSON.parse(outerParsed.d);
                }
            } catch (e) {
                console.error("JSON PARSE ERROR", e);
            }

            if (parsed?.status === "Success") {
                const requestId = parsed.data?.[0]?.RequestID;
                const userProfile = { ...form, Age: calculateAge(form.dob), requestId };
                localStorage.setItem("userProfile", JSON.stringify(userProfile));
                const userToStore = {
                    name: `${form.firstName} ${form.lastName}`.trim(),
                    mobile: form.phoneNumber,
                    requestId
                };
                localStorage.setItem("user", JSON.stringify(userToStore));
                alert(`Registration successful! Request ID: ${requestId}`);
                router.replace("/");
            } else {
                alert(parsed?.message || "Registration failed");
            }
        } catch (error) {
            console.error("REGISTER API ERROR:", error);
            alert("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    /* ---------------- RENDER ---------------- */
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
                        <p className="text-center text-blue-500 font-semibold mb-6">Create New Patient</p>

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
                                {loading ? "Saving..." : "Save & Continue"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}