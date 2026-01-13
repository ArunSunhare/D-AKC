import { NextResponse } from "next/server";

const BASE_URL = "https://shbcdc.in/HIS/API/MobileApplication.asmx/GethealthPackage";
const SecurityKey = "XZY45ZTYLG19045GHTY";
const ClientId = "XZY45ZTBNG190489GHTY";

function parseHealthPackageResponse(rawText: string) {
    // Handle XML wrapped response
    if (rawText.includes("<?xml")) {
        const match = rawText.match(/<string[^>]*>([\s\S]*?)<\/string>/);
        if (match?.[1]) {
            rawText = match[1];
        }
    }

    try {
        const parsed = JSON.parse(rawText);
        return parsed;
    } catch (e) {
        console.error("⚠️ Failed to parse GethealthPackage response", e);
        return null;
    }
}

export async function GET() {
    try {
        console.log("📦 Calling GethealthPackage API");

        const url = `${BASE_URL}?SecurityKey=${SecurityKey}&ClientId=${ClientId}`;
        
        const response = await fetch(url, {
            method: "GET",
            cache: "no-store",
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const rawText = await response.text();
        const parsed = parseHealthPackageResponse(rawText);

        console.log("✅ GethealthPackage API Response:", parsed);

        return NextResponse.json(parsed ?? { raw: rawText });
    } catch (error: any) {
        console.error("❌ GethealthPackage API Error:", error);
        return NextResponse.json(
            { error: "Failed to get health packages", message: error.message },
            { status: 500 }
        );
    }
}
