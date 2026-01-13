"use client";

import { useState } from "react";
import { Phone, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();

  const [mobile, setMobile] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [agree, setAgree] = useState(false);

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
      // Directly call GetPatient API to check if user exists in DB
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

      // Parse response - handle different response formats
      let parsed;
      try {
        // Try to parse if response has .d property (wrapped JSON from SOAP)
        if (result?.d) {
          if (typeof result.d === "string") {
            try {
              parsed = JSON.parse(result.d);
            } catch (e) {
              // If parsing fails, try to extract from XML
              const xmlMatch = result.d.match(/<string[^>]*>([\s\S]*?)<\/string>/);
              if (xmlMatch?.[1]) {
                parsed = JSON.parse(xmlMatch[1]);
              } else {
                parsed = result.d;
              }
            }
          } else {
            parsed = result.d;
          }
        } 
        // If response has status directly (already parsed)
        else if (result?.status) {
          parsed = result;
        }
        // If response is already parsed with data
        else if (result?.data) {
          parsed = result;
        }
        // Try parsing raw response if it's a string
        else if (typeof result === "string") {
          parsed = JSON.parse(result);
        }
        // If result itself is the parsed object
        else {
          parsed = result;
        }
      } catch (parseError) {
        console.error("⚠️ Response parsing error:", parseError, "Raw result:", result);
        // Fallback: use result as-is
        parsed = result;
      }

      console.log("📋 Parsed Response:", JSON.stringify(parsed, null, 2));
      console.log("📋 Response Status:", parsed?.status);
      console.log("📋 Response Data:", parsed?.data);
      console.log("📋 Is Data Array?", Array.isArray(parsed?.data));
      console.log("📋 Data Length:", parsed?.data?.length);

      // ✅ CONDITION CHECK: Check if patient exists in DB
      // More flexible check - handle different response formats
      const status = parsed?.status?.toLowerCase() || "";
      const isSuccess = status === "success";
      
      // Check if data exists and has patients (try multiple possible locations)
      const dataArray = 
        Array.isArray(parsed?.data) ? parsed.data :
        Array.isArray(parsed?.Data) ? parsed.Data :
        Array.isArray(parsed?.patients) ? parsed.patients :
        [];
      
      const hasPatients = dataArray.length > 0;
      
      // Also check if parsed itself has patient data (different API format)
      const hasDirectPatientData = 
        parsed?.PName || 
        parsed?.PFirstName || 
        parsed?.ContactNo || 
        parsed?.MRNo ||
        parsed?.PatientID ||
        parsed?.MobileNo;
      
      // Check if any patient object exists in the response
      const hasAnyPatientData = hasPatients || hasDirectPatientData;
      
      // Patient exists if ANY of these conditions are true:
      // 1. Status is "Success" (case insensitive) AND data array has patients, OR
      // 2. Direct patient data exists in response (PName, PFirstName, ContactNo, MRNo, etc.), OR
      // 3. Data array has patients (even if status is not "Success" - some APIs return data with different status)
      // Priority: If we have patient data, treat as existing user
      const patientExists = 
        hasPatients ||  // If data array has patients, user exists
        hasDirectPatientData ||  // If direct patient fields exist, user exists
        (isSuccess && hasPatients);  // Success status with patients
      
      // Final check: If we have ANY indication of patient data, user exists
      const finalPatientExists = patientExists || (dataArray.length > 0);

      console.log("🔍 Condition Check Details:", {
        status: parsed?.status,
        isSuccess,
        dataArrayLength: dataArray.length,
        hasPatients,
        hasDirectPatientData,
        hasAnyPatientData,
        patientExists,
        finalPatientExists,
        fullResponse: parsed
      });

      // Use final check
      if (finalPatientExists) {
        // ✅ CASE 1: EXISTING USER - Already registered in DB
        console.log("✅ User found in DB - Existing Patient");
        
        // Handle different response formats
        let allPatients = [];
        let patient = null;
        
        // Try multiple possible data locations
        if (Array.isArray(parsed.data) && parsed.data.length > 0) {
          // Standard format: { status: "Success", data: [...] }
          allPatients = parsed.data;
          patient = allPatients[0];
          console.log("📊 Format: Standard (parsed.data) - Total patients:", allPatients.length);
        } else if (Array.isArray(parsed.Data) && parsed.Data.length > 0) {
          // Capital D format: { status: "Success", Data: [...] }
          allPatients = parsed.Data;
          patient = allPatients[0];
          console.log("📊 Format: Capital D (parsed.Data) - Total patients:", allPatients.length);
        } else if (hasDirectPatientData) {
          // Direct format: patient data in root of response
          allPatients = [parsed];
          patient = parsed;
          console.log("📊 Format: Direct (root level) - Patient data found");
        } else if (Array.isArray(parsed.patients) && parsed.patients.length > 0) {
          // Alternative format
          allPatients = parsed.patients;
          patient = allPatients[0];
          console.log("📊 Format: Alternative (parsed.patients) - Total patients:", allPatients.length);
        } else {
          // Last resort: use parsed as patient if it has any patient-like fields
          console.log("⚠️ Trying last resort - using parsed as patient");
          allPatients = [parsed];
          patient = parsed;
        }
        
        if (!patient) {
          console.error("❌ Could not extract patient data from response");
          setError("Failed to parse patient data. Please try again.");
          return;
        }
        
        console.log("👤 Patient Data:", {
          Name: patient.PName || patient.PFirstName,
          Mobile: patient.ContactNo || patient.MobileNo,
          MRNo: patient.MRNo,
          PatientID: patient.PatientID
        });

        // Store user basic info
        const userPayload = {
          name: patient.PName?.trim() || patient.PFirstName || "User",
          mobile: patient.ContactNo || patient.MobileNo || mobile,
          MRNo: patient.MRNo || "",
          PatientId: patient.PatientID || patient.MRNo || "",
        };

        // Store complete patient profile with all details
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
          // Mark as registered patient
          isRegisteredPatient: "1",
          allPatients: allPatients,
        };

        // Save to localStorage
        localStorage.setItem("user", JSON.stringify(userPayload));
        localStorage.setItem("userProfile", JSON.stringify(profilePayload));
        localStorage.setItem("allPatients", JSON.stringify(allPatients));

        console.log("💾 Patient profile saved to localStorage:", profilePayload);

        // Check if cart has items
        const hasCartItems =
          typeof window !== "undefined" &&
          !!localStorage.getItem("cart_items") &&
          JSON.parse(localStorage.getItem("cart_items") || "[]")?.length > 0;

        // Redirect based on cart status
        console.log("🚀 Redirecting to:", hasCartItems ? "/select-date" : "/");
        router.push(hasCartItems ? "/select-date" : "/");
      } else {
        // ❌ CASE 2: NEW USER - Not registered in DB
        console.log("❌ User NOT found in DB - New Patient");
        console.log("📊 Reason:", {
          status: parsed?.status,
          isSuccess,
          hasData: !!parsed?.data,
          dataLength: Array.isArray(parsed?.data) ? parsed.data.length : "N/A",
          dataType: typeof parsed?.data,
          hasDirectPatientData,
          patientExists
        });
        
        const userPayload = {
          name: "User",
          mobile: mobile,
        };
        localStorage.setItem("user", JSON.stringify(userPayload));
        
        // Clear any existing profile data
        localStorage.removeItem("userProfile");
        localStorage.removeItem("allPatients");

        // Check if cart has items
        const hasCartItems =
          typeof window !== "undefined" &&
          !!localStorage.getItem("cart_items") &&
          JSON.parse(localStorage.getItem("cart_items") || "[]")?.length > 0;

        // Redirect to registration form with mobile number
        router.push(`/register?mobile=${mobile}`);
      }
    } catch (error) {
      console.error("❌ LOGIN ERROR:", error);
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

            <button
              onClick={() => router.back()}
              className="absolute left-4 top-4 text-gray-500 hover:text-orange-500"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>

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
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && mobile.length === 10 && agree) {
                      handleLogin();
                    }
                  }}
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
                  onClick={handleLogin}
                  disabled={loading || !agree}
                  className="flex-1 bg-orange-500 text-white py-3 rounded-md font-semibold
                  disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {loading ? "Checking..." : "Login"}
                </button>

                <button
                  onClick={() => {
                    setMobile("");
                    setError("");
                  }}
                  className="flex-1 bg-green-600 text-white py-3 rounded-md font-semibold"
                >
                  Clear
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
