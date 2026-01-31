import { NextResponse } from "next/server";

const BASE_URL = "https://shbcdc.in/HIS/API/MobileApplication.asmx/GethealthPackage";
const SecurityKey = "XZY45ZTYLG19045GHTY";
const ClientId = "XZY45ZTBNG190489GHTY";

function createUpstreamError(status: number, bodyText?: string) {
    const error = new Error(
        `Upstream request failed with status ${status}` +
            (bodyText ? `: ${bodyText.slice(0, 300)}` : "")
    ) as Error & { upstreamStatus?: number };

    error.upstreamStatus = status;
    return error;
}

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

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 15000);

        const response = await fetch(url, {
            method: "GET",
            cache: "no-store",
            signal: controller.signal,
        }).finally(() => clearTimeout(timeoutId));

        if (!response.ok) {
            const bodyText = await response.text().catch(() => "");
            throw createUpstreamError(response.status, bodyText);
        }

        const rawText = await response.text();
        const parsed = parseHealthPackageResponse(rawText);

        console.log("✅ GethealthPackage API Response:", parsed);

        return NextResponse.json(parsed ?? { raw: rawText });
    } catch (error: any) {
        console.error("❌ GethealthPackage API Error:", error);

        const statusCode =
            error?.name === "AbortError"
                ? 504
                : typeof error?.upstreamStatus === "number"
                    ? error.upstreamStatus
                    : 500;

        return NextResponse.json(
            {
                error: "Failed to get health packages",
                message:
                    error?.name === "AbortError"
                        ? "Upstream request timed out"
                        : error?.message || "Unexpected error",
            },
            { status: statusCode }
        );
    }
}
