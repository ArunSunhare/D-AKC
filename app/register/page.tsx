"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import { X } from "lucide-react";
import Image from "next/image";

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

    console.log("Registering patient:", form);

    // 🔗 GeneratePatient API call yahan aayegi

    router.push("/");
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
              {/* Name + Gender */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Full Name
                  </label>
                  <div className="flex gap-2">
                    <select
                      value={form.salutation}
                      onChange={(e) =>
                        setForm({ ...form, salutation: e.target.value })
                      }
                      className="w-24 px-3 py-3 border text-gray-900 border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-orange-500"
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
                      onChange={(e) =>
                        setForm({ ...form, fullName: e.target.value })
                      }
                      className={`flex-1 px-4 py-3 border text-gray-900 rounded-lg outline-none focus:ring-2 focus:ring-orange-500 ${
                        errors.fullName
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    />
                  </div>
                  {errors.fullName && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.fullName}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Gender
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
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="Enter Email"
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    className={`w-full px-4 py-3 border text-gray-900 rounded-lg outline-none focus:ring-2 focus:ring-orange-500 ${
                      errors.email
                        ? "border-red-500"
                        : "border-gray-300"
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
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    value={form.dob}
                    onChange={(e) =>
                      setForm({ ...form, dob: e.target.value })
                    }
                    className={`w-full px-4 py-3 border text-gray-900 rounded-lg outline-none focus:ring-2 focus:ring-orange-500 ${
                      errors.dob ? "border-red-500" : "border-gray-300"
                    }`}
                  />
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
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={form.phoneNumber}
                    readOnly
                    className="w-full px-4 py-3 border bg-gray-100 text-gray-700 rounded-lg outline-none"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Postal Code
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Pincode"
                    value={form.postalCode}
                    onChange={(e) =>
                      setForm({ ...form, postalCode: e.target.value })
                    }
                    className={`w-full px-4 py-3 border text-gray-900 rounded-lg outline-none focus:ring-2 focus:ring-orange-500 ${
                      errors.postalCode
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                  {errors.postalCode && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.postalCode}
                    </p>
                  )}
                </div>
              </div>

              {/* Save Button */}
              <button
                onClick={handleSubmit}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg transition mt-6"
              >
                Save & Continue
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
