import { NextRequest, NextResponse } from "next/server";

const baseUrl = "https://shbcdc.in/HIS/API/MobileApplication.asmx";
const SecurityKey = "XZY45ZTYLG19045GHTY";
const ClientId = "XZY45ZTBNG190489GHTY";

function decodeHtml(html: string) {
  return html
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "9");
    const search = searchParams.get("search") || "";

    const res = await fetch(
      `${baseUrl}/GetInvestigation?SecurityKey=${SecurityKey}&ClientId=${ClientId}`,
      { cache: "no-store" }
    );

    if (!res.ok) {
      return NextResponse.json(
        { status: "Error", message: "External API failed" },
        { status: 500 }
      );
    }

    const text = await res.text();

    // ✅ Extract JSON from XML
    const match = text.match(/<string[^>]*>([\s\S]*?)<\/string>/);
    if (!match || !match[1]) {
      throw new Error("Invalid XML response");
    }

    // ✅ Decode HTML entities
    const decodedJson = decodeHtml(match[1]);

    const parsed = JSON.parse(decodedJson);

    let allData = parsed.data || [];

    // ✅ Search filter
    if (search) {
      const normalize = (s: string) =>
        s.toLowerCase().replace(/[^a-z0-9]/g, "");

      const q = normalize(search);
      allData = allData.filter((item: any) =>
        normalize(item.ItemName || "").includes(q)
      );
    }

    const totalItems = allData.length;
    const totalPages = Math.ceil(totalItems / limit);
    const start = (page - 1) * limit;
    const data = allData.slice(start, start + limit);

    return NextResponse.json({
      status: "Success",
      data,
      pagination: {
        currentPage: page,
        totalPages,
        totalItems,
        itemsPerPage: limit,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        status: "Error",
        message: error.message || "Failed to fetch investigations",
        data: [],
      },
      { status: 500 }
    );
  }
}
