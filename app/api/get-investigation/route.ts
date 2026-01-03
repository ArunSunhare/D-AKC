import { NextRequest, NextResponse } from "next/server";

const baseUrl = "https://shbcdc.in/HIS/API/MobileApplication.asmx";
const SecurityKey = "XZY45ZTYLG19045GHTY";
const ClientId = "XZY45ZTBNG190489GHTY";

export async function GET(req: NextRequest) {
  try {
    // Get pagination and search params
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "9");
    const search = searchParams.get("search") || "";

    // Fetch all data from external API (external API doesn't support pagination)
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

    let jsonString = text;
    // Handle XML wrapped JSON if present
    if (text.includes("<?xml")) {
      const match = text.match(/<string[^>]*>(.*?)<\/string>/s);
      if (match && match[1]) {
        jsonString = match[1];
      }
    }

    const parsed = JSON.parse(jsonString);
    let allData = parsed.data || [];

    // Apply search filter server-side
    if (search) {
      const normalize = (str: string) => str.toLowerCase().replace(/[^a-z0-9]/g, "");
      const searchNormalized = normalize(search);

      allData = allData.filter((item: any) =>
        normalize(item.ItemName || "").includes(searchNormalized)
      );
    }

    // Calculate pagination
    const totalItems = allData.length;
    const totalPages = Math.ceil(totalItems / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedData = allData.slice(startIndex, endIndex);

    return NextResponse.json({
      status: "Success",
      data: paginatedData,
      pagination: {
        currentPage: page,
        totalPages,
        totalItems,
        itemsPerPage: limit
      }
    });

  } catch (error: any) {
    console.error("❌ GetInvestigation ERROR:", error);
    return NextResponse.json(
      {
        Status: "Error",
        Message: error.message || "Failed to fetch investigations",
        Data: [],
        pagination: {
          currentPage: 1,
          totalPages: 0,
          totalItems: 0,
          itemsPerPage: 9
        }
      },
      { status: 500 }
    );
  }
}
