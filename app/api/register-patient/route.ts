import { NextResponse } from "next/server";

const BASE_URL = "https://shbcdc.in/HIS/API/MobileApplication.asmx/GenerateLabTest";
const SecurityKey = "XZY45ZTYLG19045GHTY";
const ClientId = "XZY45ZTBNG190489GHTY";

function parseWrappedResponse(rawText: string) {
  // API sometimes returns raw JSON, sometimes JSON wrapped in XML with .d
  let parsed: any;

  // Try XML extraction first
  if (rawText.includes("<?xml")) {
    const match = rawText.match(/<string[^>]*>([\s\S]*?)<\/string>/);
    if (match && match[1]) {
      rawText = match[1];
    }
  }

  try {
    parsed = JSON.parse(rawText);
  } catch (e) {
    console.error("⚠️ Could not JSON.parse raw response", e);
    return { inner: null, parsed: null, rawText };
  }

  const inner = parsed?.d ? JSON.parse(parsed.d) : parsed;
  return { inner, parsed, rawText };
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Remove fields that are not in the API spec (VisitDate, VisitSlot, PreferredSlot)
    const { VisitDate, VisitSlot, PreferredSlot, ...apiBody } = body;

    const payload = {
      SecurityKey,
      ClientId,
      ...apiBody,
    };

    // Validate required fields
    if (!payload.MobileNo) {
      return NextResponse.json(
        { success: false, message: "Mobile number is required", error: "Missing MobileNo" },
        { status: 400 }
      );
    }

    if (!payload.TestDetails || !Array.isArray(payload.TestDetails) || payload.TestDetails.length === 0) {
      return NextResponse.json(
        { success: false, message: "At least one test is required", error: "Missing TestDetails" },
        { status: 400 }
      );
    }

    console.log("📤 FINAL PAYLOAD TO SOAP:", JSON.stringify(payload, null, 2));
    console.log("📱 Registering Mobile:", payload.MobileNo);
    console.log("👤 Patient Name:", payload.FirstName, payload.PatientLastName);
    console.log("🧪 Test Count:", payload.TestDetails?.length || 0);

    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      console.error("❌ HTTP ERROR:", res.status, res.statusText);
      return NextResponse.json(
        { success: false, message: `API request failed: ${res.status} ${res.statusText}`, error: "HTTP_ERROR" },
        { status: res.status }
      );
    }

    const rawText = await res.text();
    console.log("📥 RAW SOAP RESPONSE:", rawText);

    const { inner } = parseWrappedResponse(rawText);
    const success = inner?.status === "Success";
    const requestId = inner?.data?.[0]?.RequestID;

    if (success) {
      console.log("✅ DATABASE SAVE CONFIRMED!", requestId);
    } else {
      console.log("❌ DATABASE SAVE FAILED:", inner?.message || "Unknown error");
    }

    return NextResponse.json(
      {
        success,
        message: inner?.message || (success ? "Booking successful" : "Booking failed"),
        data: inner?.data || null,
        requestId,
        raw: rawText,
      },
      { status: success ? 200 : 400 }
    );
  } catch (error: any) {
    console.error("❌ REGISTER API ERROR:", error);
    return NextResponse.json(
      { 
        success: false,
        error: "Registration failed", 
        message: error?.message || "Internal server error" 
      },
      { status: 500 }
    );
  }
}