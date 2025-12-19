import { NextRequest, NextResponse } from "next/server";

const baseUrl = "https://shbcdc.in/HIS/API/MobileApplication.asmx";
const SecurityKey = "XZY45ZTYLG19045GHTY";
const ClientId = "XZY45ZTBNG190489GHTY";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const districtId = searchParams.get("districtId");

  if (!districtId) {
    return NextResponse.json(
      { Status: "Error", Message: "District ID required", Data: [] },
      { status: 400 }
    );
  }

  try {
    const res = await fetch(
      `${baseUrl}/GetCityList?SecurityKey=${SecurityKey}&ClientId=${ClientId}&DistrictId=${districtId}`,
      { cache: "no-store" }
    );

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const text = await res.text();
    console.log("🌆 RAW CITY RESPONSE:", text);

    // ✅ Extract JSON from XML
    let jsonString = text;
    if (text.includes("<?xml")) {
      const match = text.match(/<string[^>]*>(.*?)<\/string>/s);
      if (match && match[1]) {
        jsonString = match[1];
      }
    }

    const parsed = JSON.parse(jsonString);
    console.log("✅ PARSED CITY DATA:", parsed);

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

    console.log("🔍 RAW PARSED CITY DATA:", parsed.data);

    const cities = (parsed.data || []).map((item: any) => {
      console.log("🔍 City Item BEFORE mapping:", item);
      return {
        id: item.CityID || item.Id || item.id || "",
        name: item.CityName || item.Name || item.name || "",
      };
    });

    console.log("✅ FORMATTED CITIES:", cities);

    return NextResponse.json({
      Status: "Success",
      Message: parsed.message || "",
      Data: cities,
    });
  } catch (error: any) {
    console.error("❌ GetCities ERROR:", error);
    return NextResponse.json(
      {
        Status: "Error",
        Message: error.message || "Failed to fetch cities",
        Data: [],
      },
      { status: 500 }
    );
  }
}
