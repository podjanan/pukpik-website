import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const imageUrl = searchParams.get("url");

  if (!imageUrl) {
    return new NextResponse("Missing url parameter", { status: 400 });
  }

  try {
    const parsed = new URL(imageUrl);
    const allowedDomains = [
      "googleusercontent.com",
      "ggpht.com",
      "ytimg.com",
      "tiktokcdn.com",
      "byteoversea.com",
      "ibyteimg.com",
      "musical.ly",
    ];

    if (!allowedDomains.some((d) => parsed.hostname.endsWith(d))) {
      return new NextResponse("Invalid image domain", { status: 403 });
    }

    const imageRes = await fetch(imageUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
    });

    if (!imageRes.ok) {
      return new NextResponse("Failed to fetch image", { status: imageRes.status });
    }

    const contentType = imageRes.headers.get("content-type") || "image/jpeg";
    const imageBuffer = await imageRes.arrayBuffer();

    return new NextResponse(imageBuffer, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=86400, s-maxage=86400",
      },
    });
  } catch {
    return new NextResponse("Invalid URL", { status: 400 });
  }
}
