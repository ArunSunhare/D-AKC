import { NextRequest, NextResponse } from "next/server";

const BASE_URL = "https://shbcdc.in/HIS/API/MobileApplication.asmx/GetPatient";
const SecurityKey = "XZY45ZTYLG19045GHTY";
const ClientId = "XZY45ZTBNG190489GHTY";

function parseGetPatientResponse(rawText: string) {
    if (rawText.includes("<?xml")) {
        const match = rawText.match(/<string[^>]*>([\s\S]*?)<\/string>/);
        if (match?.[1]) rawText = match[1];
    }

    try {
        const parsed = JSON.parse(rawText);
        return parsed;
    } catch (e) {
        console.error("⚠️ Failed to parse GetPatient response", e);
        return null;
    }
}

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const mobile = searchParams.get("MobileNo");

        if (!mobile) {
            return NextResponse.json(
                { error: "Mobile number is required" },
                { status: 400 }
            );
        }

        console.log("📞 Calling GetPatient API for mobile:", mobile);

        const url = `${BASE_URL}?SecurityKey=${SecurityKey}&ClientId=${ClientId}&MobileNo=${mobile}`;
        
        const response = await fetch(url, {
            method: "GET",
            cache: "no-store",
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const rawText = await response.text();
        const parsed = parseGetPatientResponse(rawText);

        console.log("✅ GetPatient API Response:", parsed);

        return NextResponse.json(parsed ?? { raw: rawText });
    } catch (error: any) {
        console.error("❌ GetPatient API Error:", error);
        return NextResponse.json(
            { error: "Failed to get patient data", message: error.message },
            { status: 500 }
        );
    }
}

// Keep POST for backward compatibility
export async function POST(request: Request) {
    try {
        const { mobile } = await request.json();

        if (!mobile) {
            return NextResponse.json(
                { error: "Mobile number is required" },
                { status: 400 }
            );
        }

        console.log("📞 Calling GetPatient API for mobile:", mobile);

        const url = `${BASE_URL}?SecurityKey=${SecurityKey}&ClientId=${ClientId}&MobileNo=${mobile}`;
        
        const response = await fetch(url, {
            method: "GET",
            cache: "no-store",
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const rawText = await response.text();
        const parsed = parseGetPatientResponse(rawText);

        console.log("✅ GetPatient API Response:", parsed);

        return NextResponse.json(parsed ?? { raw: rawText });
    } catch (error: any) {
        console.error("❌ GetPatient API Error:", error);
        return NextResponse.json(
            { error: "Failed to get patient data", message: error.message },
            { status: 500 }
        );
    }
}