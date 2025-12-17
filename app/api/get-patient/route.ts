import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { mobile } = await req.json();

  const url = `https://shbcdc.in/HIS/API/MobileApplication.asmx/GetPatient?SecurityKey=XZY45ZTYLG19045GHTY&ClientId=XZY45ZTBNG190489GHTY&MobileNo=${mobile}`;

  try {
    const res = await fetch(url);
    const text = await res.text();

    // ASMX response parsing
    const match = text.match(/<string[^>]*>(.*?)<\/string>/);

    if (!match || !match[1]) {
      return NextResponse.json({ patient: null });
    }

    const parsed = JSON.parse(match[1]);

    if (parsed.PatientID) {
      return NextResponse.json({ patient: parsed });
    }

    return NextResponse.json({ patient: null });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch patient" },
      { status: 500 }
    );
  }
}
