import { NextRequest, NextResponse } from "next/server";

const baseUrl = "https://shbcdc.in/HIS/API/MobileApplication.asmx";
const SecurityKey = "XZY45ZTYLG19045GHTY";
const ClientId = "XZY45ZTBNG190489GHTY";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const stateId = searchParams.get("stateId");

  if (!stateId) {
    return NextResponse.json(
      { Status: "Error", Message: "State ID required", Data: [] },
      { status: 400 }
    );
  }

  try {
    // 🔥 SAME FIX AS STATE API → GET with query params
    const res = await fetch(
      // Try this format
      `${baseUrl}/GetDistrictList?SecurityKey=${SecurityKey}&ClientId=${ClientId}&StateID=${stateId}`,
      {
        method: "GET",
        cache: "no-store",
      }
    );

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const text = await res.text();
    console.log("🏙️ RAW DISTRICT RESPONSE:", text);

    // ✅ XML → JSON extract (same as state)
    let jsonString = text;

    if (text.includes("<?xml")) {
      const match = text.match(/<string[^>]*>(.*?)<\/string>/s);
      if (match && match[1]) {
        jsonString = match[1];
        console.log("📦 EXTRACTED JSON STRING:", jsonString);
      }
    }

    const parsed = JSON.parse(jsonString);
    console.log("✅ PARSED DISTRICT DATA:", parsed);

    // ❌ Backend failure check
    if (parsed.status === "Failure") {
      return NextResponse.json(
        {
          Status: "Error",
          Message: parsed.message,
          Data: [],
        },
        { status: 400 }
      );
    }
    // ✅ Format districts (same style as country & state)
    // ✅ ADD THIS LINE FIRST
    console.log("🔍 RAW PARSED DATA:", parsed.data);

    const districts = (parsed.data || []).map((item: any) => {
      console.log("🔍 District Item BEFORE mapping:", item); // Change this log
      return {
        id: item.DistrictID || item.Id || item.id || "",
        name: item.DistrictName || item.Name || item.name || "",
      };
    });

    console.log("✅ FORMATTED DISTRICTS:", districts);

    return NextResponse.json({
      Status: "Success",
      Message: parsed.message || "",
      Data: districts,
    });
  } catch (error: any) {
    console.error("❌ GetDistrict ERROR:", error);

    return NextResponse.json(
      {
        Status: "Error",
        Message: error.message || "Failed to fetch districts",
        Data: [],
      },
      { status: 500 }
    );
  }
}
