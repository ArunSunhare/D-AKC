import { NextResponse } from "next/server";
import { XMLParser } from "fast-xml-parser";

export async function GET() {
  try {
    const url =
      "https://shbcdc.in/HIS/API/MobileApplication.asmx/GetPopularInvestigation" +
      "?SecurityKey=XZY45ZTYLG19045GHTY" +
      "&ClientId=XZY45ZTBNG190489GHTY";

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Accept": "text/xml",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch investigation data");
    }

    const xmlText = await response.text();

    // XML → JSON
    const parser = new XMLParser({
      ignoreAttributes: false,
    });

    const jsonData = parser.parse(xmlText);

    return NextResponse.json({
      success: true,
      data: jsonData,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}
