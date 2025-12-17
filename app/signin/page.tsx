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

  // ✅ OTP = 4 digits
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

      if (response.ok) {
        console.log("OTP API Response:", data);
        setOtp(Array(4).fill("")); // reset OTP
        setStep("otp");
      } else {
        setError("Failed to send OTP. Please try again.");
      }
    } catch (err) {
      console.error("Error sending OTP:", err);
      setError("Network error. Please check your connection.");
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

    // ✅ Auto focus next (max 4)
    if (value && index < 3) {
      otpRefs.current[index + 1]?.focus();
    }
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
      // 🔗 Replace with real VERIFY OTP API later
      setTimeout(() => {
        setLoading(false);
        router.push("/"); // ✅ LOGIN SUCCESS
      }, 1000);
    } catch (err) {
      console.error("Error verifying OTP:", err);
      setError("Failed to verify OTP. Please try again.");
      setLoading(false);
    }
  };

return (
<div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
    {/* Outer Blue Container */}
      <Image
    src="/assets/hero.jpg"   // 👈 background image path
    alt="Background"
    fill
    priority
    className="object-cover"
  />
    <div className="w-full max-w-2xl bg-blue-500 rounded-[40px] p-6 shadow-xl">
      

      {/* Header */}
      <div className="text-center text-white text-2xl font-bold uppercase mb-4">
        Shri Hanuman Balaji Charitable <br /> Diagnostic Centre
      </div>

      {/* Inner White Card */}
      <div className="bg-white rounded-2xl p-8 relative">

        {/* Logo */}
        <div className="flex justify-center mb-4">
          <div className="relative w-64 h-24">
            <Image
              src="/assets/logo_main.png"   // 👈 apna logo yahan
              alt="Shri Hanuman Balaji Diagnostic Centre"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>

        <p className="text-center text-blue-500 font-semibold mb-6">
          Welcome, Please Login..
        </p>

        {/* Back Button */}
        <button
          onClick={() => (step === "otp" ? setStep("mobile") : router.back())}
          className="absolute left-4 top-4 text-gray-500 hover:text-orange-500"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        {/* ================= MOBILE SCREEN ================= */}
        {step === "mobile" && (
          <div className="space-y-4">
            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                Mobile Number
              </label>

              <div className="relative">
                <Phone className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                <input
                  type="tel"
                  value={mobile}
                  onChange={handleMobileChange}
                  placeholder="Enter mobile number"
                  className={`w-full pl-10 py-3 border rounded-md outline-none
                  focus:border-orange-500 focus:ring-2 focus:ring-orange-500
                  ${error ? "border-red-500" : "border-gray-300"}`}
                />
              </div>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <div className="flex gap-4 mt-6">
              <button
                onClick={handleSendOtp}
                disabled={loading || mobile.length !== 10}
                className="flex-1 bg-orange-500 hover:bg-orange-600
                text-white py-3 rounded-md font-semibold disabled:bg-gray-400"
              >
                {loading ? "Sending..." : "Login"}
              </button>

              <button
                onClick={() => setMobile("")}
                className="flex-1 bg-gray-200 py-3 rounded-md font-semibold hover:bg-gray-300"
              >
                Clear
              </button>
            </div>
          </div>
        )}

        {/* ================= OTP SCREEN ================= */}
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
                  className="w-12 h-12 text-center text-lg font-bold
                  border border-gray-300 rounded-md
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
              className="w-full bg-orange-500 hover:bg-orange-600
              text-white py-3 rounded-md font-semibold"
            >
              Verify OTP
            </button>
          </div>
        )}
      </div>
    </div>
  </div>
);

}