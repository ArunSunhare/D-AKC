"use client";

import { useState, useEffect, useRef } from "react";
import { Phone, X, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export function LoginModal({ isOpen, onClose, onSuccess }: LoginModalProps) {
  const router = useRouter();
  const [mobile, setMobile] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [agree, setAgree] = useState(false);
  const [step, setStep] = useState<"login" | "register">("login");

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  const handleMobileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 10) {
      setMobile(value);
      setError("");
    }
  };

  const handleLogin = async () => {
    if (!agree) {
      setError("Please accept Terms & Conditions to continue");
      return;
    }

    if (mobile.length !== 10) {
      setError("Please enter a valid 10-digit mobile number");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(`/api/get-patient?MobileNo=${mobile}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      let result = await response.json();
      console.log("🔍 GetPatient API Response:", result);

      // Parse response
      let parsed;
      try {
        if (result?.d) {
          parsed = typeof result.d === "string" ? JSON.parse(result.d) : result.d;
        } else if (result?.status) {
          parsed = result;
        } else if (result?.data) {
          parsed = result;
        } else if (typeof result === "string") {
          parsed = JSON.parse(result);
        } else {
          parsed = result;
        }
      } catch (parseError) {
        console.error("⚠️ Response parsing error:", parseError);
        parsed = result;
      }

      const status = parsed?.status?.toLowerCase() || "";
      const isSuccess = status === "success";
      const dataArray = 
        Array.isArray(parsed?.data) ? parsed.data :
        Array.isArray(parsed?.Data) ? parsed.Data :
        [];
      const hasPatients = dataArray.length > 0;
      const hasDirectPatientData = 
        parsed?.PName || parsed?.PFirstName || parsed?.ContactNo || parsed?.MRNo;
      const patientExists = (isSuccess && hasPatients) || hasDirectPatientData || hasPatients;

      if (patientExists) {
        // ✅ EXISTING USER
        let allPatients = [];
        let patient = null;
        
        if (Array.isArray(parsed.data) && parsed.data.length > 0) {
          allPatients = parsed.data;
          patient = allPatients[0];
        } else if (hasDirectPatientData) {
          allPatients = [parsed];
          patient = parsed;
        } else if (Array.isArray(parsed.Data) && parsed.Data.length > 0) {
          allPatients = parsed.Data;
          patient = allPatients[0];
        } else {
          allPatients = [parsed];
          patient = parsed;
        }

        if (!patient) {
          setError("Failed to parse patient data. Please try again.");
          return;
        }

        const userPayload = {
          name: patient.PName?.trim() || patient.PFirstName || "User",
          mobile: patient.ContactNo || patient.MobileNo || mobile,
          MRNo: patient.MRNo || "",
          PatientId: patient.PatientID || patient.MRNo || "",
        };

        const profilePayload = {
          Title: patient.Title?.replace(".", "") || "Mr",
          FirstName: patient.PFirstName || patient.PName?.trim() || "",
          PatientLastName: patient.PLastName || "",
          Gender: patient.Gender || "Male",
          DOB: patient.DOB || "",
          Age: patient.Age || "",
          MobileNo: patient.ContactNo || patient.MobileNo || mobile,
          Email: patient.Email || "",
          Address: patient.House_No || patient.Address || "",
          Country: patient.Country || "",
          State: patient.State || "",
          District: patient.District || "",
          City: patient.City || "",
          PinCode: patient.PinCode || "",
          MRNo: patient.MRNo || "",
          PatientId: patient.PatientID || patient.MRNo || "",
          isRegisteredPatient: "1",
          allPatients: allPatients,
        };

        localStorage.setItem("user", JSON.stringify(userPayload));
        localStorage.setItem("userProfile", JSON.stringify(profilePayload));
        localStorage.setItem("allPatients", JSON.stringify(allPatients));

        onClose();
        if (onSuccess) {
          onSuccess();
        } else {
          // Reload page to update user state
          window.location.reload();
        }
      } else {
        // ❌ NEW USER - Switch to register step
        const userPayload = {
          name: "User",
          mobile: mobile,
        };
        localStorage.setItem("user", JSON.stringify(userPayload));
        localStorage.removeItem("userProfile");
        localStorage.removeItem("allPatients");
        
        // Switch to registration form
        setStep("register");
      }
    } catch (error) {
      console.error("❌ LOGIN ERROR:", error);
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center px-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative z-10 w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 text-gray-500 hover:text-orange-600 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-4">
          <div className="flex justify-center mb-2">
            <div className="relative w-48 h-16">
              <Image
                src="/assets/logo_main.png"
                alt="Logo"
                fill
                className="object-contain"
              />
            </div>
          </div>
          <p className="text-center text-white font-semibold text-sm">
            {step === "login" ? "Login to Continue" : "Complete Your Registration"}
          </p>
        </div>

        {/* Body */}
        <div className="p-6">
          {step === "login" ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Mobile Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="tel"
                    value={mobile}
                    onChange={handleMobileChange}
                    placeholder="Enter 10-digit mobile number"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-black"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && mobile.length === 10 && agree) {
                        handleLogin();
                      }
                    }}
                  />
                </div>
              </div>

              <div className="flex items-start gap-2 text-sm text-gray-600">
                <input
                  type="checkbox"
                  checked={agree}
                  onChange={(e) => setAgree(e.target.checked)}
                  className="mt-1 accent-orange-500"
                />
                <p className="text-xs">
                  I agree to the Terms & Conditions and Privacy Policy
                </p>
              </div>

              {error && (
                <p className="text-red-500 text-sm text-center">{error}</p>
              )}

              <button
                onClick={handleLogin}
                disabled={loading || !agree || mobile.length !== 10}
                className="w-full bg-orange-600 text-white py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {loading ? "Checking..." : "Continue"}
              </button>

              <p className="text-center text-sm text-gray-600">
                New user? Enter your mobile number to register
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <button
                  onClick={() => {
                    setStep("login");
                    setError("");
                    setMobile("");
                  }}
                  className="text-gray-500 hover:text-orange-600 transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <p className="text-gray-700 font-semibold">
                  Mobile: {mobile}
                </p>
              </div>

              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-4">
                <p className="text-sm text-orange-800 font-medium mb-2">
                  New User Detected
                </p>
                <p className="text-xs text-orange-700">
                  Please complete your registration to continue with your booking.
                </p>
              </div>

              <button
                onClick={() => {
                  onClose();
                  router.push(`/register?mobile=${mobile}`);
                }}
                className="w-full bg-orange-600 text-white py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors"
              >
                Complete Registration
              </button>

              <button
                onClick={() => {
                  setStep("login");
                  setMobile("");
                  setError("");
                }}
                className="w-full border border-gray-300 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors text-sm"
              >
                Use Different Number
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
