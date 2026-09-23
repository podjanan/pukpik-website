import { Product, products as fallbackProducts, categories as fallbackCategories } from "@/data/products";

export function formatImageUrl(url?: string): string {
  if (!url || !url.trim()) return "/images/products/cat-bag.svg";
  const trimmed = url.trim();

  // If it's already a relative path
  if (trimmed.startsWith("/")) return trimmed;

  // Google Drive URL matching (file/d/ID, open?id=ID, id=ID, etc.)
  const driveMatch =
    trimmed.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) ||
    trimmed.match(/id=([a-zA-Z0-9_-]+)/) ||
    trimmed.match(/\/d\/([a-zA-Z0-9_-]+)/);

  if (driveMatch && driveMatch[1] && trimmed.includes("google.com")) {
    const fileId = driveMatch[1];
    // lh3.googleusercontent.com/d/FILE_ID is Google's fast public image CDN link
    const directDriveUrl = `https://lh3.googleusercontent.com/d/${fileId}`;
    return `/api/image-proxy?url=${encodeURIComponent(directDriveUrl)}`;
  }

  // Standard http/https URLs -> wrap through image-proxy if external
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return `/api/image-proxy?url=${encodeURIComponent(trimmed)}`;
  }

  return trimmed;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\u0E00-\u0E7F\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function parseCSV(text: string): string[][] {
  const lines: string[][] = [];
  let row: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const nextChar = text[i + 1];

    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === "," && !inQuotes) {
      row.push(current.trim());
      current = "";
    } else if ((char === "\r" || char === "\n") && !inQuotes) {
      if (char === "\r" && nextChar === "\n") i++;
      row.push(current.trim());
      if (row.some((cell) => cell.length > 0)) lines.push(row);
      row = [];
      current = "";
    } else {
      current += char;
    }
  }

  if (current || row.length > 0) {
    row.push(current.trim());
    if (row.some((cell) => cell.length > 0)) lines.push(row);
  }

  return lines;
}

export async function fetchProductsFromGoogleSheet(sheetId: string): Promise<{
  products: Product[];
  categories: string[];
  isLive: boolean;
}> {
  try {
    const csvUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv`;
    const res = await fetch(csvUrl, {
      next: { revalidate: 60 }, // Cache for 60 seconds
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
      },
    });

    if (!res.ok) {
      throw new Error(`Google Sheet fetch failed with status ${res.status}`);
    }

    const csvText = await res.text();
    const rows = parseCSV(csvText);

    if (rows.length < 2) {
      throw new Error("Google Sheet has no data rows");
    }

    // Header mapping
    const headers = rows[0].map((h) => h.toLowerCase().trim());
    const getColIndex = (name: string) => headers.findIndex((h) => h === name);

    const slugIdx = getColIndex("slug");
    const nameIdx = getColIndex("name");
    const brandIdx = getColIndex("brand");
    const categoryIdx = getColIndex("category");
    
    // Support image1, image2, image3 OR image, image2, image3 OR images
    const image1Idx = getColIndex("image1") !== -1 ? getColIndex("image1") : getColIndex("image");
    const image2Idx = getColIndex("image2");
    const image3Idx = getColIndex("image3");
    const imagesIdx = getColIndex("images");

    const descIdx = getColIndex("description");
    const shopeeIdx = getColIndex("shopee");
    const lazadaIdx = getColIndex("lazada");
    const tiktokIdx = getColIndex("tiktok");
    const officialIdx = getColIndex("official");
    const statusIdx = getColIndex("status");

    const parsedProducts: Product[] = [];
    const categorySet = new Set<string>();

    for (let i = 1; i < rows.length; i++) {
      const row = rows[i];
      const name = nameIdx !== -1 ? row[nameIdx] : "";
      if (!name) continue;

      // Check status (if 'hidden', 'inactive', 'deleted', '0', 'false', 'ซ่อน', 'ลบ' -> skip)
      const status = statusIdx !== -1 ? row[statusIdx]?.toLowerCase() : "active";
      if (
        status === "hidden" ||
        status === "inactive" ||
        status === "deleted" ||
        status === "0" ||
        status === "false" ||
        status === "ซ่อน" ||
        status === "ลบ"
      ) {
        continue;
      }

      const rawSlug = slugIdx !== -1 ? row[slugIdx] : "";
      const slug = rawSlug && rawSlug.trim() ? rawSlug.trim() : slugify(name) || `product-${i}`;

      const brand = brandIdx !== -1 && row[brandIdx] ? row[brandIdx] : "PUKPIK";
      const category = categoryIdx !== -1 && row[categoryIdx] ? row[categoryIdx] : "ของใช้";

      // Collect up to 3 images from image1/image/image2/image3 or comma-separated images
      const collectedImages: string[] = [];

      if (image1Idx !== -1 && row[image1Idx]?.trim()) {
        collectedImages.push(formatImageUrl(row[image1Idx]));
      }
      if (image2Idx !== -1 && row[image2Idx]?.trim()) {
        collectedImages.push(formatImageUrl(row[image2Idx]));
      }
      if (image3Idx !== -1 && row[image3Idx]?.trim()) {
        collectedImages.push(formatImageUrl(row[image3Idx]));
      }

      // If no image1/2/3 found, check comma-separated 'images' column
      if (collectedImages.length === 0 && imagesIdx !== -1 && row[imagesIdx]?.trim()) {
        row[imagesIdx]
          .split(",")
          .map((img) => formatImageUrl(img))
          .filter((img) => Boolean(img) && img !== "/images/products/cat-bag.svg")
          .slice(0, 3)
          .forEach((img) => collectedImages.push(img));
      }

      const mainImage = collectedImages[0] || "/images/products/cat-bag.svg";
      const imagesList = collectedImages.length > 0 ? collectedImages.slice(0, 3) : [mainImage];

      const description =
        descIdx !== -1 && row[descIdx]
          ? row[descIdx]
          : "ไอเทมน่ารักที่ PUKPIK อยากบอกต่อ ใช้งานง่ายและเหมาะกับทุกวันค่ะ ♡";

      const shopee = shopeeIdx !== -1 ? row[shopeeIdx] : "";
      const lazada = lazadaIdx !== -1 ? row[lazadaIdx] : "";
      const tiktok = tiktokIdx !== -1 ? row[tiktokIdx] : "";
      const official = officialIdx !== -1 ? row[officialIdx] : "";

      categorySet.add(category);

      parsedProducts.push({
        slug,
        name,
        brand,
        category,
        image: mainImage,
        images: imagesList,
        description,
        tags: [category, "แนะนำโดย PUKPIK"],
        links: {
          ...(shopee ? { shopee } : {}),
          ...(lazada ? { lazada } : {}),
          ...(tiktok ? { tiktok } : {}),
          ...(official ? { official } : {}),
        },
      });
    }

    if (parsedProducts.length === 0) {
      throw new Error("No active products parsed from Google Sheet");
    }

    const categoriesList = ["ทั้งหมด", ...Array.from(categorySet)];

    return {
      products: parsedProducts,
      categories: categoriesList,
      isLive: true,
    };
  } catch (err) {
    console.error("Google Sheets fetch error:", err);
    return {
      products: fallbackProducts,
      categories: fallbackCategories,
      isLive: false,
    };
  }
}
