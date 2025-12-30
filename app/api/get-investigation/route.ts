import { NextRequest, NextResponse } from "next/server";

const baseUrl = "https://shbcdc.in/HIS/API/MobileApplication.asmx";
const SecurityKey = "XZY45ZTYLG19045GHTY";
const ClientId = "XZY45ZTBNG190489GHTY";

export async function GET(req: NextRequest) {
  try {
    const res = await fetch(
      `${baseUrl}/GetInvestigation?SecurityKey=${SecurityKey}&ClientId=${ClientId}`,
      { 
        method: "GET",
        cache: "no-store" 
      }
    );

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const text = await res.text();
    console.log("🔬 RAW INVESTIGATION RESPONSE:", text);

    let jsonString = text;
    // Handle XML wrapped JSON if present, similar to other endpoints
    if (text.includes("<?xml")) {
      const match = text.match(/<string[^>]*>(.*?)<\/string>/s);
      if (match && match[1]) {
        jsonString = match[1];
      }
    }

    const parsed = JSON.parse(jsonString);
    
    // Normalize response structure if needed, or pass through
    // Checking one of the existing responses, it often wraps in { status, message, data } 
    // or sometimes just the array. Assuming similar structure to cities/etc.
    
    return NextResponse.json(parsed);

  } catch (error: any) {
    console.error("❌ GetInvestigation ERROR:", error);
    return NextResponse.json(
      {
        Status: "Error",
        Message: error.message || "Failed to fetch investigations",
        Data: [],
      },
      { status: 500 }
    );
  }
}
