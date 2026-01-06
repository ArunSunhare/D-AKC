import { NextResponse } from "next/server";

const baseUrl = "https://shbcdc.in/HIS/API/MobileApplication.asmx";
const SecurityKey = "XZY45ZTYLG19045GHTY";
const ClientId = "XZY45ZTBNG190489GHTY";

export async function GET() {
  try {
    // 🔥 FIX: CountryID ko empty string ki jagah "0" bhejo
    const res = await fetch(
      `${baseUrl}/GetCountryList?SecurityKey=${SecurityKey}&ClientId=${ClientId}&CountryID=0`,
      { 
        method: "GET",
        cache: "no-store"
      }
    );

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const text = await res.text();
    console.log("🌍 RAW RESPONSE:", text);

    // ✅ XML se JSON extract karo
    let jsonString = text;
    
    // Check if response is XML
    if (text.includes('<?xml')) {
      // Extract JSON from XML tags
      const match = text.match(/<string[^>]*>([\s\S]*?)<\/string>/);
      if (match && match[1]) {
        jsonString = match[1];
        console.log("📦 EXTRACTED JSON STRING:", jsonString);
      }
    }

    // Parse JSON
    const parsed = JSON.parse(jsonString);
    console.log("✅ PARSED DATA:", parsed);

    // Check for failure
    if (parsed.status === "Failure") {
      console.error("❌ Backend Error:", parsed.message);
      return NextResponse.json({
        Status: "Error",
        Message: parsed.message,
        Data: []
      }, { status: 400 });
    }

    // Format countries
    const countries = (parsed.data || []).map((item: any) => {
      console.log("🔍 Country Item:", item);
      return {
        id: item.CountryID || item.Id || item.id || "",
        name: item.CountryName || item.Name || item.name || ""
      };
    });

    console.log("✅ FORMATTED COUNTRIES:", countries);

    return NextResponse.json({
      Status: "Success",
      Message: parsed.message || "",
      Data: countries
    });

  } catch (error: any) {
    console.error("❌ GetCountries ERROR:", error);
    
    return NextResponse.json(
      { 
        Status: "Error", 
        Message: error.message || "Failed to fetch countries", 
        Data: [] 
      },
      { status: 500 }
    );
  }
}