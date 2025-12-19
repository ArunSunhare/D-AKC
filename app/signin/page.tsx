"use client";

import { useState, useRef } from "react";
import { Phone, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();

  const [step, setStep] = useState<"mobile" | "otp">("mobile");
  const [mobile, setMobile] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ✅ NEW: Terms checkbox state
  const [agree, setAgree] = useState(false);

  const [otp, setOtp] = useState<string[]>(Array(4).fill(""));
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  /* ---------------- MOBILE HANDLER ---------------- */
  const handleMobileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 10) {
      setMobile(value);
      setError("");
    }
  };

  /* ---------------- SEND OTP ---------------- */
  const handleSendOtp = async () => {
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
      const response = await fetch("/api/get-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile }),
      });

      const data = await response.json();

      console.log("OTP API RESPONSE:", data);

      if (response.ok && data?.d) {
        setOtp(Array(4).fill(""));
        setStep("otp");
      } else {
        setError("OTP sending failed. Please try again.");
      }
    } catch (err) {
      console.error("OTP ERROR:", err);
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- OTP HANDLERS ---------------- */
  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 3) otpRefs.current[index + 1]?.focus();
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  /* ---------------- VERIFY OTP ---------------- */
const verifyOtp = async () => {
  const enteredOtp = otp.join("");

  if (enteredOtp.length !== 4) {
    setError("Please enter 4-digit OTP");
    return;
  }

  setLoading(true);
  setError("");

  try {
    const response = await fetch("/api/get-patient", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        mobile: mobile, // sirf mobile
      }),
    });

    const result = await response.json();

    console.log("✅ GetPatient RAW RESPONSE:", result);

    if (!response.ok) {
      setError("Server error. Please try again.");
      return;
    }

    // SOAP response handling
    if (result?.d) {
      console.log("🧩 SOAP STRING:", result.d);

      let parsed: any = null;

      try {
        parsed = JSON.parse(result.d);
        console.log("✅ PARSED PATIENT DATA:", parsed);
      } catch (err) {
        console.error("❌ JSON Parse Error:", err);
      }

      // ✅ EXISTING USER
      if (
        parsed &&
        parsed.status === "Success" &&
        Array.isArray(parsed.data) &&
        parsed.data.length > 0
      ) {
        const patient = parsed.data[0]; // 👈 first patient

        const userToStore = {
          name: patient.PName?.trim() || "User",
          mobile: patient.ContactNo,
        };

        console.log("💾 SAVING USER TO LOCALSTORAGE:", userToStore);

        localStorage.setItem("user", JSON.stringify(userToStore));

        console.log("✅ EXISTING USER → DASHBOARD");
        router.push("/"); // or /dashboard
      } else {
        // 🆕 NEW USER
        console.log("🆕 NEW USER (empty data) → REGISTER");
        router.push(`/register?mobile=${mobile}`);
      }
    } else {
      // 🆕 NO d PROPERTY
      console.log("🆕 NO 'd' PROPERTY → REGISTER");
      router.push(`/register?mobile=${mobile}`);
    }
  } catch (error) {
    console.error("❌ GetPatient API ERROR:", error);
    setError("Network error. Please try again.");
  } finally {
    setLoading(false);
  }
};




  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      <Image
        src="/assets/hero.jpg"
        alt="Background"
        fill
        priority
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="relative z-10 w-full flex justify-center">
        <div className="w-full max-w-2xl bg-blue-500 rounded-[40px] p-6 shadow-xl">
          <div className="text-center text-white text-2xl font-bold mb-4">
            Shri Hanuman Balaji Charitable <br /> Diagnostic Centre
          </div>

          <div className="bg-white rounded-2xl p-8 relative">
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
              Welcome, Please Login..
            </p>

            {/* Back */}
            <button
              onClick={() =>
                step === "otp" ? setStep("mobile") : router.back()
              }
              className="absolute left-4 top-4 text-gray-500 hover:text-orange-500"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>

            {/* ================= MOBILE ================= */}
            {step === "mobile" && (
              <div className="space-y-4 text-center">
                <label className="block font-semibold text-gray-700">
                  Mobile Number
                </label>

                <div className="relative max-w-sm mx-auto">
                  <Phone className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                  <input
                    type="tel"
                    value={mobile}
                    onChange={handleMobileChange}
                    placeholder="Enter mobile number"
                    className={`w-full pl-10 py-3 border text-black rounded-md outline-none
                    focus:border-orange-500 focus:ring-2 focus:ring-orange-500
                    ${error ? "border-red-500" : "border-gray-300"}`}
                  />
                </div>

                {/* ✅ TERMS CHECKBOX */}
                <div className="max-w-sm mx-auto flex items-start gap-2 text-left text-sm text-gray-600">
                  <input
                    type="checkbox"
                    checked={agree}
                    onChange={(e) => setAgree(e.target.checked)}
                    className="mt-1 accent-orange-500"
                  />
                  <p>
                    I agree to the{" "}
                    <span className="text-orange-500 font-medium cursor-pointer">
                      Terms & Conditions
                    </span>{" "}
                    and{" "}
                    <span className="text-orange-500 font-medium cursor-pointer">
                      Privacy Policy
                    </span>
                  </p>
                </div>

                {error && <p className="text-red-500 text-sm">{error}</p>}

                <div className="flex gap-4 mt-6 max-w-sm mx-auto">
                  <button
                    onClick={handleSendOtp}
                    disabled={loading || !agree}
                    className="flex-1 bg-orange-500 text-white py-3 rounded-md font-semibold
                    disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    {loading ? "Sending..." : "Login"}
                  </button>

                  <button
                    onClick={() => setMobile("")}
                    className="flex-1 bg-green-600 hover:bg-green-500 transition-colors duration-200
                    py-3 rounded-md font-semibold"
                  >
                    Clear
                  </button>
                </div>
              </div>
            )}

            {/* ================= OTP ================= */}
            {step === "otp" && (
              <div>
                <p className="text-center text-gray-600 mb-4">
                  OTP sent to <b>+91 {mobile}</b>
                </p>

                <div className="flex justify-center gap-3 mb-6">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => (otpRefs.current[index] = el)}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) =>
                        handleOtpChange(index, e.target.value)
                      }
                      onKeyDown={(e) => handleOtpKeyDown(index, e)}
                      className="w-12 h-12 text-center text-lg font-bold border rounded-md
                      focus:border-orange-500 focus:ring-2 focus:ring-orange-500"
                    />
                  ))}
                </div>

                {error && (
                  <p className="text-red-500 text-sm text-center mb-4">
                    {error}
                  </p>
                )}

                <button
                  onClick={verifyOtp}
                  disabled={loading}
                  className="w-full bg-orange-500 text-white py-3 rounded-md font-semibold"
                >
                  {loading ? "Verifying..." : "Verify OTP"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}   