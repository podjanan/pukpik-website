import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ProductGallery } from "@/components/ProductGallery";
import { PlatformButton, ProductGrid } from "@/components/ProductCard";
import { products } from "@/data/products";
import { ArrowLeft } from "lucide-react";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = products.find((x) => x.slug === slug);
  return { title: p ? `${p.name} — ${p.brand}` : "สินค้า" };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) notFound();

  const related = products.filter((p) => p.slug !== product.slug && p.category === product.category).slice(0, 4);
  const gallery = product.images ?? [product.image];

  return (
    <main className="shell section">
      <Link href="/shop" className="mb-5 inline-flex items-center gap-2 text-sm font-bold text-rose hover:underline">
        <ArrowLeft size={16} /> กลับไปหน้าสินค้า
      </Link>

      <article className="card overflow-hidden border-2 border-pink-100">
        <ProductGallery images={gallery} alt={product.name} />
        <div className="space-y-4 p-5 sm:p-8">
          <div>
            <p className="text-sm font-bold text-rose">{product.brand}</p>
            <h1 className="mt-1 text-2xl font-extrabold leading-snug">{product.name}</h1>
            <p className="mt-2 text-xl font-extrabold text-rose">{product.price}</p>
          </div>
          <p className="leading-relaxed text-[#725d65]">{product.description}</p>
          <div className="grid grid-cols-2 gap-3 pt-2">
            {product.links.shopee && <PlatformButton platform="Shopee" url={product.links.shopee} />}
            {product.links.lazada && <PlatformButton platform="Lazada" url={product.links.lazada} />}
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section className="mt-10">
          <h2 className="mb-5 text-center text-lg font-extrabold">สินค้าในหมวดเดียวกัน</h2>
          <ProductGrid products={related} />
        </section>
      )}
    </main>
  );
}
