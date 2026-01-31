import { NextResponse } from "next/server";

/* ---------------- CONFIG ---------------- */

const BASE_URL =
  "https://shbcdc.in/HIS/API/MobileApplication.asmx/GetPopularInvestigation";
const SecurityKey = "XZY45ZTYLG19045GHTY";
const ClientId = "XZY45ZTBNG190489GHTY";

/* ---------------- CACHE ---------------- */

let CACHE_DATA: any | null = null;
let CACHE_TIME = 0;
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

/* ---------------- UTILS ---------------- */

function extractJsonFromSoap(xml: string): string | null {
  const match = xml.match(/<string[^>]*>([\s\S]*?)<\/string>/);
  return match?.[1] ?? null;
}

/* ---------------- API ---------------- */

export async function GET() {
  try {
    const now = Date.now();

    /* ✅ Serve cached response */
    if (CACHE_DATA && now - CACHE_TIME < CACHE_TTL) {
      return NextResponse.json({
        success: true,
        source: "cache",
        data: CACHE_DATA,
      });
    }

    const url = `${BASE_URL}?SecurityKey=${SecurityKey}&ClientId=${ClientId}`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Upstream failed: ${response.status}`);
    }

    /* 🔴 SOAP XML → TEXT */
    const xmlText = await response.text();

    /* ✅ Direct JSON extraction (NO XML PARSER) */
    const jsonString = extractJsonFromSoap(xmlText);
    if (!jsonString) {
      throw new Error("Invalid SOAP response");
    }

    /* ✅ Parse JSON ONCE */
    const parsed = JSON.parse(jsonString);

    /* ✅ Cache full parsed payload */
    CACHE_DATA = parsed;
    CACHE_TIME = now;

    return NextResponse.json({
      success: true,
      source: "fresh",
      data: parsed,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Failed to fetch popular investigations",
      },
      { status: 500 }
    );
  }
}
