import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const ALLOWED_DOMAINS = [
  "googleusercontent.com",
  "ggpht.com",
  "ytimg.com",
  // TikTok CDN variants
  "tiktokcdn.com",
  "tiktokcdn-us.com",
  "tiktokcdn-eu.com",
  "byteoversea.com",
  "ibyteimg.com",
  "musical.ly",
  "tiktok.com",
  "bytedance.com",
  "snssdk.com",
  "ibytedtos.com",
  "ipstatp.com",
  "ixigua.com",
];

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const imageUrl = searchParams.get("url");

  if (!imageUrl) {
    return new NextResponse("Missing url parameter", { status: 400 });
  }

  try {
    const parsed = new URL(imageUrl);

    if (!ALLOWED_DOMAINS.some((d) => parsed.hostname.endsWith(d))) {
      return new NextResponse("Invalid image domain", { status: 403 });
    }

    const imageRes = await fetch(imageUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1",
        "Accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
        "Accept-Language": "th-TH,th;q=0.9,en-US;q=0.8,en;q=0.7",
        "Referer": "https://www.tiktok.com/",
        "Origin": "https://www.tiktok.com",
        "Sec-Fetch-Dest": "image",
        "Sec-Fetch-Mode": "no-cors",
        "Sec-Fetch-Site": "cross-site",
      },
      // No cache so we always get the freshest image
      cache: "no-store",
    });

    if (!imageRes.ok) {
      return new NextResponse("Failed to fetch image", { status: imageRes.status });
    }

    const contentType = imageRes.headers.get("content-type") || "image/jpeg";
    const imageBuffer = await imageRes.arrayBuffer();

    return new NextResponse(imageBuffer, {
      headers: {
        "Content-Type": contentType,
        // Cache for 1 day on CDN, 1 hour in browser (TikTok URLs are signed and expire)
        "Cache-Control": "public, max-age=3600, s-maxage=86400, stale-while-revalidate=3600",
      },
    });
  } catch {
    return new NextResponse("Invalid URL", { status: 400 });
  }
}
