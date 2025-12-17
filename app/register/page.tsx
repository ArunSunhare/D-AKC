"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import { X, Calendar } from "lucide-react";

export default function RegisterPage() {
  const params = useSearchParams();
  const router = useRouter();

  const mobile = params.get("mobile") || "";

  const [form, setForm] = useState({
    salutation: "Mr",
    fullName: "",
    gender: "Male",
    email: "",
    dob: "",
    phoneNumber: mobile,
    postalCode: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!form.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!form.dob) newErrors.dob = "Date of birth is required";
    if (!form.phoneNumber || form.phoneNumber.length !== 10) {
      newErrors.phoneNumber = "Valid 10-digit phone number required";
    }
    if (!form.postalCode.trim()) newErrors.postalCode = "Postal code is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    // 🔗 API call to GeneratePatient will go here
    console.log("Registering patient:", form);
    
    // Redirect to dashboard after successful registration
    router.push("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200 px-4 py-8">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl p-6 relative">
        
        {/* Close Button */}
        <button
          onClick={() => router.back()}
          className="absolute right-4 top-4 text-gray-600 hover:text-orange-500 transition"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Heading */}
        <h1 className="text-2xl font-bold text-blue-500 mb-6">
          Create New Patient
        </h1>

        {/* Form Grid */}
        <div className="space-y-4">
          
          {/* Full Name Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Salutation + Full Name */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Full Name
              </label>
              <div className="flex gap-2">
                <select
                  value={form.salutation}
                  onChange={(e) => setForm({ ...form, salutation: e.target.value })}
                  className="w-24 px-3 py-3 border  text-gray-900 border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="Mr">Mr</option>
                  <option value="Ms">Ms</option>
                  <option value="Mrs">Mrs</option>
                  <option value="Dr">Dr</option>
                </select>
                
                <input
                  type="text"
                  placeholder="Enter Full Name"
                  value={form.fullName}
                  onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                  className={`flex-1 px-4 py-3 border  text-gray-900 rounded-lg outline-none focus:ring-2 focus:ring-orange-500 ${
                    errors.fullName ? "border-red-500" : "border-gray-300"
                  }`}
                />
              </div>
              {errors.fullName && (
                <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
              )}
            </div>

            {/* Gender */}
            <div>
              <label className="block text-gray-700  font-medium mb-2">
                Gender
              </label>
              <select
                value={form.gender}
                onChange={(e) => setForm({ ...form, gender: e.target.value })}
                className="w-full px-4 py-3 border  text-gray-900  border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          {/* Email & DOB Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Email */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className={`w-full px-4 py-3 border   text-gray-900 rounded-lg outline-none focus:ring-2 focus:ring-orange-500 ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* Date of Birth */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Date of Birth
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={form.dob}
                  onChange={(e) => setForm({ ...form, dob: e.target.value })}
                  className={`w-full px-4 py-3 border  text-gray-900 rounded-lg outline-none focus:ring-2 focus:ring-orange-500 ${
                    errors.dob ? "border-red-500" : "border-gray-300"
                  }`}
                />
            {/* <Calendar className="absolute right-3 top-3.5 text-gray-400 w-5 h-5 pointer-events-none" /> */}
              </div>
              {errors.dob && (
                <p className="text-red-500 text-sm mt-1">{errors.dob}</p>
              )}
            </div>
          </div>

          {/* Phone & Postal Code Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Phone Number */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                inputMode="numeric"
                placeholder="Enter Phone Number"
                value={form.phoneNumber}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "");
                  if (value.length <= 10) {
                    setForm({ ...form, phoneNumber: value });
                  }
                }}
                className={`w-full px-4 py-3 border  text-gray-900 rounded-lg outline-none focus:ring-2 focus:ring-orange-500 ${
                  errors.phoneNumber ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.phoneNumber && (
                <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>
              )}
            </div>

            {/* Postal Code */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Postal Code
              </label>
              <input
                type="text"
                placeholder="Enter Pincode Code"
                value={form.postalCode}
                onChange={(e) => setForm({ ...form, postalCode: e.target.value })}
                className={`w-full px-4 py-3 border  text-gray-900 rounded-lg outline-none focus:ring-2 focus:ring-orange-500 ${
                  errors.postalCode ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.postalCode && (
                <p className="text-red-500 text-sm mt-1">{errors.postalCode}</p>
              )}
            </div>
          </div>

          {/* Save Button */}
          <button
            onClick={handleSubmit}
            className="w-full bg-orange-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg transition mt-6"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}