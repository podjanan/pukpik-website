import { NextResponse } from "next/server";
import { fetchProductsFromGoogleSheet } from "@/lib/googleSheets";
import { products as fallbackProducts, categories as fallbackCategories } from "@/data/products";

export const dynamic = "force-dynamic";

export async function GET() {
  const sheetId = process.env.GOOGLE_SHEET_ID || process.env.NEXT_PUBLIC_GOOGLE_SHEET_ID;

  if (!sheetId) {
    return NextResponse.json({
      products: fallbackProducts,
      categories: fallbackCategories,
      isLive: false,
      source: "fallback",
      message: "GOOGLE_SHEET_ID environment variable is not set. Using local fallback data.",
    });
  }

  const result = await fetchProductsFromGoogleSheet(sheetId);
  return NextResponse.json({
    ...result,
    source: result.isLive ? "sheet" : "fallback",
  });
}
