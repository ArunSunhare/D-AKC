import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const payload = {
      SecurityKey: "XZY45ZTYLG19045GHTY",
      ClientId: "XZY45ZTBNG190489GHTY",
      ...body
    };

    console.log("📤 FINAL PAYLOAD TO SOAP:", payload);
    console.log("📱 Registering Mobile:", payload.MobileNo);
    console.log("👤 Patient Name:", payload.FirstName, payload.PatientLastName);

    const res = await fetch(
      "https://shbcdc.in/HIS/API/MobileApplication.asmx/GenerateLabTest",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      }
    );

    const rawText = await res.text();
    console.log("📥 RAW SOAP RESPONSE:", rawText);

    // 🔥 Parse and check status
    try {
      const parsed = JSON.parse(rawText);
      const inner = parsed.d ? JSON.parse(parsed.d) : null;
      
      if (inner?.status === "Success") {
        console.log("✅ DATABASE SAVE CONFIRMED!");
        console.log("🆔 Request ID:", inner.data?.[0]?.RequestID);
      } else {
        console.log("❌ DATABASE SAVE FAILED:", inner?.message);
      }
    } catch (e) {
      console.error("⚠️ Could not parse response", e);
    }

    return NextResponse.json({ raw: rawText });
  } catch (error) {
    console.error("❌ REGISTER API ERROR:", error);
    return NextResponse.json(
      { error: "Registration failed" },
      { status: 500 }
    );
  }
}