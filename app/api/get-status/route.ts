import { NextRequest, NextResponse } from "next/server";

const baseUrl = "https://shbcdc.in/HIS/API/MobileApplication.asmx";
const SecurityKey = "XZY45ZTYLG19045GHTY";
const ClientId = "XZY45ZTBNG190489GHTY";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const mobileNo = searchParams.get("MobileNo");
    const patientId = searchParams.get("PatientID") || ""; // Optional in postman usage?

    if (!mobileNo) {
        return NextResponse.json(
            { Status: "Error", Message: "Mobile Number required", Data: [] },
            { status: 400 }
        );
    }

    try {
        const res = await fetch(
            `${baseUrl}/getRequestedStatus?SecurityKey=${SecurityKey}&ClientId=${ClientId}&MobileNo=${mobileNo}&PatientID=${patientId}`,
            {
                method: "GET",
                cache: "no-store"
            }
        );

        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        const text = await res.text();
        console.log("📊 RAW STATUS RESPONSE:", text);

        let jsonString = text;
        if (text.includes("<?xml")) {
            const match = text.match(/<string[^>]*>(.*?)<\/string>/s);
            if (match && match[1]) {
                jsonString = match[1];
            }
        }

        const parsed = JSON.parse(jsonString);
        return NextResponse.json(parsed);

    } catch (error: any) {
        console.error("❌ GetStatus ERROR:", error);
        return NextResponse.json(
            {
                Status: "Error",
                Message: error.message || "Failed to fetch status",
                Data: [],
            },
            { status: 500 }
        );
    }
}
