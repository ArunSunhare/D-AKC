import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const { mobile } = await request.json();

        const response = await fetch(
            "https://shbcdc.in/HIS/API/MobileApplication.asmx/GetOTP",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    SecurityKey: "XZY45ZTYLG19045GHTY",
                    ClientId: "XZY45ZTBNG190489GHTY",
                    MobileNo: mobile,
                }),
            }
        );

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to send OTP" },
            { status: 500 }
        );
    }
}