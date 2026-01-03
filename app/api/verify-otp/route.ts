
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { mobile, otp, genOtp } = await req.json();
  // TEMP: hardcoded OTP (replace with real logic / DB / SMS provider)
  if (otp === genOtp) {
    return NextResponse.json({
      success: true,
      message: "OTP verified",
    });
  }

  return NextResponse.json(
    {
      success: false,
      message: "Invalid OTP",
    },
    { status: 400 }
  );
}
