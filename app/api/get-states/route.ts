import { NextRequest, NextResponse } from "next/server";

const baseUrl = "https://shbcdc.in/HIS/API/MobileApplication.asmx";
const SecurityKey = "XZY45ZTYLG19045GHTY";
const ClientId = "XZY45ZTBNG190489GHTY";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const countryId = searchParams.get("countryId");

  if (!countryId) {
    return NextResponse.json(
      { Status: "Error", Message: "Country ID required", Data: [] },
      { status: 400 }
    );
  }

  try {
    // 🔥 FIX: Change to GET with query params, like country API
    const res = await fetch(
      `${baseUrl}/GetStateList?SecurityKey=${SecurityKey}&ClientId=${ClientId}&CountryID=${countryId}`,
      {
        method: "GET",
        cache: "no-store",
      }
    );

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const text = await res.text();
    console.log("🏛️ RAW STATE RESPONSE:", text);

    // ✅ XML se JSON extract karo (same as country)
    let jsonString = text;

    // Check if response is XML
    if (text.includes("<?xml")) {
      // Extract JSON from XML tags
      const match = text.match(/<string[^>]*>([\s\S]*?)<\/string>/);

      if (match && match[1]) {
        jsonString = match[1];
        console.log("📦 EXTRACTED JSON STRING:", jsonString);
      }
    }

    // Parse JSON
    const parsed = JSON.parse(jsonString);
    console.log("✅ PARSED STATE DATA:", parsed);

    // Check for failure
    if (parsed.status === "Failure") {
      console.error("❌ Backend Error:", parsed.message);
      return NextResponse.json(
        {
          Status: "Error",
          Message: parsed.message,
          Data: [],
        },
        { status: 400 }
      );
    }

    // Format states (same as country)
    const states = (parsed.data || []).map((item: any) => {
      console.log("🔍 State Item:", item);
      return {
        id: item.StateID || item.Id || item.id || "",
        name: item.StateName || item.Name || item.name || "",
      };
    });

    console.log("✅ FORMATTED STATES:", states);

    return NextResponse.json({
      Status: "Success",
      Message: parsed.message || "",
      Data: states,
    });
  } catch (error: any) {
    console.error("❌ GetStates ERROR:", error);

    return NextResponse.json(
      {
        Status: "Error",
        Message: error.message || "Failed to fetch states",
        Data: [],
      },
      { status: 500 }
    );
  }
}
