import { NextRequest, NextResponse } from "next/server";

/* ---------------- CONFIG ---------------- */

const baseUrl = "https://shbcdc.in/HIS/API/MobileApplication.asmx";
const SecurityKey = "XZY45ZTYLG19045GHTY";
const ClientId = "XZY45ZTBNG190489GHTY";

/* ---------------- UTILS ---------------- */

function decodeHtml(html: string) {
  return html
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

/* ---------------- IN-MEMORY CACHE ---------------- */
/* (Best possible optimization without Redis) */

let CACHE_DATA: any[] | null = null;
let CACHE_TIME = 0;
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

/* ---------------- API HANDLER ---------------- */

export async function GET(req: NextRequest) {
  try {
    const now = Date.now();

    /* ✅ Serve from cache if valid */
    if (CACHE_DATA && now - CACHE_TIME < CACHE_TTL) {
      return NextResponse.json({
        success: true,
        source: "cache",
        data: {
          data: CACHE_DATA.slice(0, 5), // only what UI needs
        },
      });
    }

    /* 🔴 External SOAP API call (slow part) */
    const response = await fetch(
      `${baseUrl}/GetInvestigation?SecurityKey=${SecurityKey}&ClientId=${ClientId}`
    );

    if (!response.ok) {
      throw new Error("External API failed");
    }

    /* 🔴 SOAP XML → TEXT */
    const xmlText = await response.text();

    /* 🔴 Extract JSON string from XML */
    const match = xmlText.match(/<string[^>]*>([\s\S]*?)<\/string>/);
    if (!match || !match[1]) {
      throw new Error("Invalid SOAP response");
    }

    /* 🔴 Decode HTML entities */
    const decodedJson = decodeHtml(match[1]);

    /* 🔴 Parse JSON */
    const parsed = JSON.parse(decodedJson);

    const allData = Array.isArray(parsed?.data) ? parsed.data : [];

    /* ✅ Store FULL data in cache ONCE */
    CACHE_DATA = allData;
    CACHE_TIME = now;

    /* ✅ Return minimal payload */
    return NextResponse.json({
      success: true,
      source: "fresh",
      data: {
        data: allData.slice(0, 5),
      },
    });

  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Failed to fetch investigations",
        data: [],
      },
      { status: 500 }
    );
  }
}
