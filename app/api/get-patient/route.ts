import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const { mobile } = await request.json();

        console.log("📞 Calling GetPatient API for mobile:", mobile);

        const response = await fetch(
            "https://shbcdc.in/HIS/API/MobileApplication.asmx/GetPatient",
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
        
        console.log("✅ GetPatient API Response:", data);

        return NextResponse.json(data);
    } catch (error) {
        console.error("❌ GetPatient API Error:", error);
        return NextResponse.json(
            { error: "Failed to get patient data" },
            { status: 500 }
        );
    }
}
// ```

// // ## Key Changes:

// // 1. ✅ **Simplified API call** - Sirf `mobile` send karo, baaki backend handle karega
// // 2. ✅ **Better response parsing** - Pehle check karo ki `result.d` exist karta hai
// // 3. ✅ **Array length check** - `parsed.data.length > 0` se confirm karo user exist karta hai
// // 4. ✅ **Better error handling** - Har step pe proper logging aur error messages

// // ## Flow Summary:
// // ```
// // 1. User OTP enter karta hai (frontend pe assume verified)
// //    ↓
// // 2. GetPatient API call (check if user exists)
// //    ↓
// // 3. Response mein data array hai?
// //    ├─ YES (length > 0) → Dashboard redirect ✅
// //    └─ NO (empty array) → Register page redirect 🆕