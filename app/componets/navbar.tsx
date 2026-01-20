"use client";

import Image from "next/image";
import { Menu, X, User, LogOut, ShoppingCart, Phone, ArrowLeft } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import logo from "@/public/assets/logo_main.png";
import { useCart } from "@/app/context/CartContext";
import { LoginModal } from "./LoginModal";
import { Search_Bar } from "./search_bar";

type UserType = {
  name: string;
  mobile: string;
};

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [user, setUser] = useState<UserType | null>(null);
  const router = useRouter();
  const { items, openCart } = useCart();

  // Login Modal States
  const [step, setStep] = useState<"mobile" | "otp">("mobile");
  const [mobile, setMobile] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [serverOtp, setServerOtp] = useState<string | null>(null);
  const [agree, setAgree] = useState(false);
  const [otp, setOtp] = useState<string[]>(Array(4).fill(""));
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen || isLoginModalOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen, isLoginModalOpen]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
        setIsLoginModalOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (serverOtp) {
      console.log("Anshul serverOtp:", serverOtp);
    }
  }, [serverOtp]);

  const getInitial = (name: string) => {
    return name.charAt(0).toUpperCase();
  };

  const openLoginModal = () => {
    setIsMenuOpen(false);
    setShowLoginModal(true);
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
    setStep("mobile");
    setMobile("");
    setOtp(Array(4).fill(""));
    setError("");
    setAgree(false);
  };

  const goToProfile = () => {
    setIsMenuOpen(false);
    router.push("/patient_profile");
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    router.push("/");
  };

  // Login Modal Functions
  const handleMobileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 10) {
      setMobile(value);
      setError("");
    }
  };

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

      if (!response.ok || !data?.d) {
        setError("OTP sending failed. Please try again.");
        return;
      }

      const parsed = JSON.parse(data.d);
      const receivedOtp = parsed?.data?.[0]?.OTP;

      console.log("OTP API RESPONSE:", receivedOtp);

      setOtp(Array(4).fill(""));
      setStep("otp");
      setServerOtp(receivedOtp);
    } catch (err) {
      console.error("OTP ERROR:", err);
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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

  const verifyOtp = async () => {
    const enteredOtp = otp.join("");

    if (enteredOtp.length !== 4) {
      setError("Please enter 4-digit OTP");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const verifyResponse = await fetch("/api/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mobile,
          otp: enteredOtp,
          genOtp: serverOtp,
        }),
      });

      if (!verifyResponse.ok) {
        setError("OTP verification service not available.");
        return;
      }

      const verifyResult = await verifyResponse.json();

      if (!verifyResult?.success) {
        setError("Invalid OTP. Please try again.");
        return;
      }

      const response = await fetch("/api/get-patient", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ mobile }),
      });

      const result = await response.json();

      if (!response.ok) {
        setError("Server error. Please try again.");
        return;
      }

      if (result?.d) {
        const parsed = JSON.parse(result.d);

        if (
          parsed?.status === "Success" &&
          Array.isArray(parsed.data) &&
          parsed.data.length > 0
        ) {
          const patient = parsed.data[0];

          localStorage.setItem(
            "user",
            JSON.stringify({
              name: patient.PName?.trim() || "User",
              mobile: patient.ContactNo,
            })
          );

          setUser({
            name: patient.PName?.trim() || "User",
            mobile: patient.ContactNo,
          });

          closeLoginModal();
          router.push("/");
        } else {
          closeLoginModal();
          router.push(`/register?mobile=${mobile}`);
        }
      } else {
        closeLoginModal();
        router.push(`/register?mobile=${mobile}`);
      }
    } catch (error) {
      console.error("OTP VERIFY ERROR:", error);
      setError("OTP verification failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <a href="/" className="block">
              <Image
                src={logo}
                alt="Shri Hanuman Balaji Charitable Diagnostic Centre"
                className="h-12 w-auto"
                priority
              />
            </a>


            <div className="hidden md:flex items-center gap-6 transition-all duration-300 ease-in-out">
              <Search_Bar />
              <a className="nav-link" onClick={() => router.push("/")}>Home</a>
              <a className="nav-link" onClick={() => router.push("/")}>Locate Us</a>
              <a className="nav-link" onClick={() => router.push("/investigations")}>Find A Test</a>
              <a className="nav-link" onClick={() => router.push("/health-packages")}>Health Packages</a>
              <a className="nav-link" onClick={() => router.push("/about-us")}>About Us</a>

              <button onClick={openCart} className="relative p-2">
                <ShoppingCart className="w-6 h-6 text-black hover:text-orange-600 transition" />

              </button>

              {user ? (
                <div className="flex items-center gap-3">
                  <button onClick={goToProfile} className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-linear-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white font-bold">
                      {getInitial(user.name)}
                    </div>
                    <span>{user.name}</span>
                  </button>
                  <button onClick={logout} className="text-red-600 text-sm">Logout</button>
                </div>
              ) : (
                <button onClick={openLoginModal} className="bg-orange-500 text-white px-4 py-2 rounded-lg">
                  Login / Sign Up
                </button>
              )}
            </div>

            {/* Mobile Search Bar (always visible on mobile) */}
            <div className="md:hidden px-4 pb-3">
              <Search_Bar />
            </div>



            <button
              className="md:hidden p-2 text-gray-600"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>

          {isMenuOpen && (
            <div className="md:hidden py-4 border-t">
              <div className="flex text-black flex-col gap-4">
                <a>Home</a>
                <a>Locate Us</a>
                <a>Facilities</a>
                <a onClick={() => router.push("/investigations")}>Find A Test</a>
                <a onClick={() => router.push("/health-packages")}>Health Packages</a>
                <a>Reach Us</a>

                {user ? (
                  <div className="border-t pt-3">
                    <button
                      onClick={goToProfile}
                      className="flex items-center gap-3 mb-3"
                    >
                      <div className="w-10 h-10 rounded-full bg-linear-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white font-bold text-lg shadow-md">
                        {getInitial(user.name)}
                      </div>
                      <span className="font-medium text-gray-800">
                        {user.name}
                      </span>
                    </button>

                    <button
                      onClick={logout}
                      className="flex items-center gap-2 text-red-600"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={openLoginModal}
                    className="flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-lg mt-2"
                  >
                    <User className="w-5 h-5" />
                    Login / Sign Up
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Login Modal - Single instance for both desktop and mobile */}
        <LoginModal
          isOpen={showLoginModal}
          onClose={() => {
            setShowLoginModal(false);
            setIsMenuOpen(false);
          }}
          onSuccess={() => {
            setShowLoginModal(false);
            setIsMenuOpen(false);
            const storedUser = localStorage.getItem("user");
            if (storedUser) {
              setUser(JSON.parse(storedUser));
            }
          }}
        />

        <style jsx>{`
          .nav-link {
            color: #374151;
            cursor: pointer;
          }
          .nav-link:hover {
            color: #ea580c;
          }
        `}</style>
      </nav>

      {/* Old Login Modal - Keeping for backward compatibility but not using */}
      {false && isLoginModalOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center px-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60"
            onClick={closeLoginModal}
          ></div>

          {/* Modal Content */}
          <div className="relative z-10 w-full max-w-2xl bg-blue-500 rounded-[40px] p-6 shadow-xl">
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

              <button
                onClick={() => (step === "otp" ? setStep("mobile") : closeLoginModal())}
                className="absolute left-4 top-4 text-gray-500 hover:text-orange-500"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>

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

                  <div className="max-w-sm mx-auto flex items-start gap-2 text-left text-sm text-gray-600">
                    <input
                      type="checkbox"
                      checked={agree}
                      onChange={(e) => setAgree(e.target.checked)}
                      className="mt-1 accent-orange-500"
                    />
                    <p>I agree to the Terms & Conditions and Privacy Policy</p>
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
                      className="flex-1 bg-green-600 text-white py-3 rounded-md font-semibold"
                    >
                      Clear
                    </button>
                  </div>
                </div>
              )}

              {step === "otp" && (
                <div>
                  <p className="text-center text-gray-600 mb-4">
                    OTP sent to <b>+91 {mobile}</b>
                  </p>

                  <div className="flex justify-center gap-3 mb-6">
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        ref={(el) => {
                          otpRefs.current[index] = el;
                        }}
                        type="text"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        onKeyDown={(e) => handleOtpKeyDown(index, e)}
                        className="w-12 h-12 text-center text-lg font-bold border text-black rounded-md
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
      )}
    </>
  );
}