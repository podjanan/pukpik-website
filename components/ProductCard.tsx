import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/data/products";

function ShopButton({ platform, url }: { platform: "shopee" | "lazada"; url: string }) {
  const isShopee = platform === "shopee";
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`platform-btn platform-btn--sm ${isShopee ? "platform-btn--shopee" : "platform-btn--lazada"}`}
    >
      {isShopee ? "Shopee" : "Lazada"}
    </a>
  );
}

export function ProductCard({ product }: { product: Product }) {
  const shopee = product.links.shopee;
  const lazada = product.links.lazada;

  return (
    <article className="card group overflow-hidden border-2 border-pink-100 transition hover:-translate-y-1">
      <Link aria-label={`ดู ${product.name}`} href={`/shop/${product.slug}`}>
        <div className="relative aspect-square overflow-hidden bg-pink-50">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition duration-300 group-hover:scale-105"
          />
        </div>
      </Link>
      <div className="space-y-2 p-3 sm:p-4">
        <Link href={`/shop/${product.slug}`}>
          <h3 className="line-clamp-2 min-h-[2.5rem] text-sm font-bold leading-snug">{product.name}</h3>
        </Link>
        <div className="flex gap-2">
          {shopee && <ShopButton platform="shopee" url={shopee} />}
          {lazada && <ShopButton platform="lazada" url={lazada} />}
        </div>
      </div>
    </article>
  );
}

export function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
      {products.map((p) => (
        <ProductCard key={p.slug} product={p} />
      ))}
    </div>
  );
}

export function PlatformButton({ platform, url }: { platform: string; url: string }) {
  const key = platform.toLowerCase();
  const isShopee = key.includes("shopee");
  const isLazada = key.includes("lazada");
  const variant = isShopee ? "platform-btn--shopee" : isLazada ? "platform-btn--lazada" : "platform-btn--shopee";

  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className={`platform-btn ${variant}`}>
      {isShopee ? "Shopee" : isLazada ? "Lazada" : platform}
    </a>
  );
}
