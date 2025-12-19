import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // ✅ Inject required SOAP params here
    const payload = {
      SecurityKey: "XZY45ZTYLG19045GHTY",
      ClientId: "XZY45ZTBNG190489GHTY",
      ...body
    };

    console.log("📤 FINAL PAYLOAD TO SOAP:", payload);

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

    // ⚠️ SOAP = text, not json
    const rawText = await res.text();

    console.log("📥 RAW SOAP RESPONSE:", rawText);

    return NextResponse.json({ raw: rawText });
  } catch (error) {
    console.error("❌ REGISTER API ERROR:", error);
    return NextResponse.json(
      { error: "Registration failed" },
      { status: 500 }
    );
  }
}
