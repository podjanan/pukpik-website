import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import type { Product } from "@/data/products";
import {
  ShopeeIcon,
  LazadaIcon,
  TikTokIcon,
  OfficialStoreIcon,
  CuteBowRibbon,
} from "./PlatformIcons";

function getPlatformDetails(platform: string) {
  const key = platform.toLowerCase();
  if (key.includes("shopee")) {
    return { label: "Shopee", Icon: ShopeeIcon };
  }
  if (key.includes("lazada")) {
    return { label: "Lazada", Icon: LazadaIcon };
  }
  if (key.includes("tiktok")) {
    return { label: "TikTok", Icon: TikTokIcon };
  }
  return { label: platform || "Official Store", Icon: OfficialStoreIcon };
}

export function PlatformButton({
  platform,
  url,
  compact = false,
}: {
  platform: string;
  url: string;
  compact?: boolean;
}) {
  const { label, Icon } = getPlatformDetails(platform);

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`cute-platform-btn group relative flex w-full items-center justify-between overflow-visible rounded-full border-2 border-pink-300/80 bg-gradient-to-r from-pink-50/90 via-white to-pink-50/90 shadow-[0_4px_14px_rgba(244,114,182,0.16)] transition-all duration-300 hover:-translate-y-0.5 hover:border-pink-400 hover:shadow-[0_6px_18px_rgba(244,114,182,0.26)] ${
        compact ? "px-3 py-1.5 text-xs" : "px-4 py-2.5 text-sm sm:px-5 sm:py-3"
      }`}
    >
      {/* Top Right Ribbon Bow */}
      <CuteBowRibbon
        className={`absolute z-10 text-pink-400 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110 ${
          compact ? "-right-1.5 -top-2 h-5 w-5" : "-right-2 -top-2.5 h-7 w-7"
        }`}
      />

      {/* Decorative Sparkle Doodles */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-2.5 top-1 text-[9px] text-pink-300/70 select-none"
      >
        🌸
      </span>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-1 right-8 text-[8px] text-pink-300/60 select-none"
      >
        ✨
      </span>

      {/* Left Section: Icon + Divider + Label */}
      <div className="flex items-center gap-2.5 sm:gap-3">
        <div
          className={`flex shrink-0 items-center justify-center ${
            compact ? "h-5 w-5" : "h-6 w-6 sm:h-7 sm:w-7"
          }`}
        >
          <Icon className="h-full w-full object-contain" />
        </div>
        <div className={`w-[1.5px] bg-pink-200/90 ${compact ? "h-4" : "h-5"}`} />
        <span
          className={`font-mali font-bold tracking-wide text-[#5c3a47] transition-colors group-hover:text-pink-600 ${
            compact ? "text-xs" : "text-sm sm:text-base"
          }`}
        >
          {label}
        </span>
      </div>

      {/* Right Section: Arrow */}
      <div className="flex items-center text-pink-400 group-hover:text-pink-600">
        <ArrowRight
          size={compact ? 14 : 18}
          className="transition-transform duration-200 group-hover:translate-x-1"
        />
      </div>
    </a>
  );
}

export function ProductCard({ product }: { product: Product }) {
  const shopee = product.links.shopee;
  const lazada = product.links.lazada;
  const tiktok = product.links.tiktok;
  const official = product.links.official;

  return (
    <article className="group relative flex flex-col justify-between overflow-hidden rounded-[20px] border-2 border-pink-200/90 bg-gradient-to-b from-white via-pink-50/30 to-white p-2.5 shadow-[0_8px_24px_rgba(244,114,182,0.12)] transition-all duration-300 hover:-translate-y-1.5 hover:border-pink-300 hover:shadow-[0_14px_32px_rgba(244,114,182,0.22)] sm:rounded-[28px] sm:p-4">
      {/* Decorative Corner Star */}
      <span aria-hidden="true" className="pointer-events-none absolute right-3 top-2 text-xs text-pink-300/70 select-none">
        ✦
      </span>

      <div>
        {/* Product Image Box */}
        <Link aria-label={`ดู ${product.name}`} href={`/shop/${product.slug}`} className="block">
          <div className="relative aspect-square w-full overflow-hidden rounded-[22px] border border-pink-100 bg-pink-50/60">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {/* Category / Brand Sticker Badge */}
            <div className="absolute left-1.5 top-1.5 z-10 flex items-center gap-0.5 rounded-full border border-pink-200/90 bg-white/95 px-1.5 py-0.5 text-[9px] font-bold text-rose shadow-sm backdrop-blur-sm sm:left-2.5 sm:top-2.5 sm:gap-1 sm:px-2.5 sm:py-1 sm:text-[11px]">
              <Sparkles size={9} className="sm:hidden" />
              <Sparkles size={11} className="hidden sm:inline" /> {product.brand || product.category}
            </div>
          </div>
        </Link>

        {/* Title & Info */}
        <div className="mt-2 space-y-0.5 sm:mt-3.5 sm:space-y-1">
          <Link href={`/shop/${product.slug}`} className="block">
            <h3 className="line-clamp-2 min-h-[2rem] font-mali text-xs font-extrabold leading-snug text-[#4a3a40] transition-colors group-hover:text-rose sm:min-h-[2.5rem] sm:text-base">
              {product.name}
            </h3>
          </Link>
          <p className="hidden text-xs font-semibold text-[#866b75] sm:block">
            🎀 {product.category}
          </p>
        </div>
      </div>

      {/* Action Footer */}
      <div className="mt-2 border-t border-pink-100/80 pt-1.5 sm:mt-4 sm:pt-2">
        {/* Platform icons preview — hidden on mobile to save space */}
        <div className="mb-1.5 hidden items-center gap-1.5 sm:flex">
          {shopee && <ShopeeIcon className="h-5 w-5 opacity-90 hover:opacity-100" />}
          {lazada && <LazadaIcon className="h-5 w-5 opacity-90 hover:opacity-100" />}
          {tiktok && <TikTokIcon className="h-5 w-5 opacity-90 hover:opacity-100" />}
          {official && <OfficialStoreIcon className="h-5 w-5 opacity-90 hover:opacity-100" />}
        </div>

        {/* View Details Button */}
        <Link
          href={`/shop/${product.slug}`}
          className="cute-platform-btn group/btn flex w-full items-center justify-between rounded-full px-2.5 py-1.5 text-[11px] font-bold text-rose sm:px-3.5 sm:py-2 sm:text-sm"
        >
          <CuteBowRibbon className="absolute -right-1.5 -top-2 h-5.5 w-5.5 text-pink-400 transition-transform group-hover/btn:rotate-12" />
          <span className="font-mali font-bold text-[#5c3a47] group-hover/btn:text-pink-600">
            <span className="hidden sm:inline">ดูรายละเอียด & สั่งซื้อ</span>
            <span className="sm:hidden">ดูสินค้า</span>
          </span>
          <ArrowRight size={13} className="text-pink-400 transition-transform group-hover/btn:translate-x-1 sm:hidden" />
          <ArrowRight size={15} className="hidden text-pink-400 transition-transform group-hover/btn:translate-x-1 sm:inline" />
        </Link>
      </div>
    </article>
  );
}

export function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">
      {products.map((p) => (
        <ProductCard key={p.slug} product={p} />
      ))}
    </div>
  );
}
