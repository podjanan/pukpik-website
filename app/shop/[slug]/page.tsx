import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ProductGallery } from "@/components/ProductGallery";
import { PlatformButton, ProductGrid } from "@/components/ProductCard";
import { fetchProductsFromGoogleSheet } from "@/lib/googleSheets";
import { products as fallbackProducts, type Product } from "@/data/products";
import { ArrowLeft, Sparkles, ShoppingBag } from "lucide-react";

export const dynamic = "force-dynamic";

async function getAllProducts(): Promise<Product[]> {
  const sheetId = process.env.GOOGLE_SHEET_ID || process.env.NEXT_PUBLIC_GOOGLE_SHEET_ID;
  if (!sheetId) return fallbackProducts;
  const result = await fetchProductsFromGoogleSheet(sheetId);
  return result.products.length > 0 ? result.products : fallbackProducts;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const allProducts = await getAllProducts();
  const p = allProducts.find((x) => x.slug === slug);
  return { title: p ? `${p.name} — ${p.brand}` : "สินค้า" };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const allProducts = await getAllProducts();
  const product = allProducts.find((p) => p.slug === slug);
  if (!product) notFound();

  const related = allProducts.filter((p) => p.slug !== product.slug && p.category === product.category).slice(0, 3);
  const gallery = product.images && product.images.length > 0 ? product.images : [product.image];

  return (
    <main className="shell section">
      {/* Back Button */}
      <Link
        href="/shop"
        className="group mb-6 inline-flex items-center gap-2 rounded-full border-2 border-pink-200/80 bg-white px-4 py-2 text-sm font-bold text-rose shadow-candy transition hover:-translate-x-1 hover:border-pink-300 hover:bg-pink-50"
      >
        <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" /> กลับไปหน้าสินค้าทั้งหมด
      </Link>

      {/* Main Product Card - 2 Column Layout on md+ */}
      <article className="relative overflow-hidden rounded-[36px] border-2 border-pink-200/90 bg-gradient-to-b from-white via-pink-50/20 to-white p-5 shadow-[0_12px_40px_rgba(244,114,182,0.16)] sm:p-8 md:p-10">
        {/* Background Floating Doodles */}
        <span aria-hidden="true" className="doodle floating left-[3%] top-6 text-xl text-pink-300/70 select-none">
          ✦
        </span>
        <span aria-hidden="true" className="doodle floating right-[4%] top-12 text-2xl text-pink-300/70 select-none" style={{ animationDelay: "0.8s" }}>
          ♡
        </span>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:items-start">
          {/* Left Column: Product Gallery */}
          <div className="md:col-span-6">
            <ProductGallery images={gallery} alt={product.name} />
          </div>

          {/* Right Column: Product Details & Shop Buttons */}
          <div className="flex flex-col space-y-5 md:col-span-6">
            {/* Category & Brand Badge */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-pink-300/80 bg-pink-100/70 px-3.5 py-1 text-xs font-bold text-rose shadow-sm">
                <Sparkles size={13} /> {product.brand || "PUKPIK"}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-pink-200 bg-white px-3.5 py-1 text-xs font-bold text-[#725d65] shadow-sm">
                🎀 {product.category}
              </span>
            </div>

            {/* Product Title */}
            <h1 className="title text-2xl font-extrabold leading-snug text-[#4a3a40] sm:text-3xl">
              {product.name}
            </h1>

            {/* Description Card */}
            <div className="rounded-2xl border-2 border-pink-100 bg-white/90 p-4 shadow-sm sm:p-5">
              <p className="text-xs font-bold uppercase tracking-wider text-rose">รายละเอียดสินค้า</p>
              <p className="mt-2 text-sm leading-relaxed text-[#725d65]">
                {product.description || "ไอเทมน่ารักที่ PUKPIK อยากบอกต่อ ใช้งานง่ายและเหมาะกับทุกวันค่ะ ♡"}
              </p>
            </div>

            {/* Platform Shop Links Section */}
            <div className="pt-2">
              <div className="mb-3.5 flex items-center gap-2">
                <ShoppingBag size={18} className="text-rose" />
                <h2 className="font-mali text-sm font-extrabold text-[#4a3a40] sm:text-base">
                  เลือกร้านค้าที่ต้องการสั่งซื้อ ♡
                </h2>
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {product.links.shopee && <PlatformButton platform="Shopee" url={product.links.shopee} />}
                {product.links.lazada && <PlatformButton platform="Lazada" url={product.links.lazada} />}
                {product.links.tiktok && <PlatformButton platform="TikTok Shop" url={product.links.tiktok} />}
                {product.links.official && <PlatformButton platform="Official Store" url={product.links.official} />}
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Related Products */}
      {related.length > 0 && (
        <section className="mt-14">
          <div className="mb-6 text-center">
            <h2 className="title text-xl font-extrabold sm:text-2xl">✨ สินค้าในหมวดเดียวกัน</h2>
            <p className="mt-1 text-xs font-medium text-[#866b75] sm:text-sm">ลองดูสินค้าน่ารัก ๆ ชิ้นอื่นในหมวด {product.category} นะคะ</p>
          </div>
          <ProductGrid products={related} />
        </section>
      )}
    </main>
  );
}
