import Link from "next/link";
import { Grid2X2, Sparkles, Heart, Shirt } from "lucide-react";

const categories = [
  { href: "/shop", label: "สินค้าทั้งหมด", sub: "All Products", Icon: Grid2X2 },
  { href: "/shop?cat=ของใช้", label: "ของใช้ประจำวัน", sub: "Daily Life", Icon: Sparkles },
  { href: "/shop?cat=สินค้าแต่งหน้า", label: "สินค้าแต่งหน้า", sub: "Beauty", Icon: Heart },
  { href: "/shop?cat=แฟชั่น", label: "แฟชั่น & เสื้อผ้า", sub: "Fashion", Icon: Shirt },
] as const;

export function CategoryGrid() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4">
      {categories.map(({ href, label, sub, Icon }) => (
        <Link
          key={href}
          href={href}
          className="card group relative flex min-h-[108px] flex-col items-center justify-center gap-2 border-2 border-pink-100 bg-gradient-to-b from-white to-pink-50/60 p-4 text-center transition hover:-translate-y-1 hover:border-pink-200"
        >
          <span className="absolute right-3 top-2 text-xs text-pink-300">♡</span>
          <span className="grid h-12 w-12 place-items-center rounded-2xl border border-pink-100 bg-pink-50 text-rose transition group-hover:scale-105">
            <Icon size={24} />
          </span>
          <span>
            <b className="block text-sm leading-snug">{label}</b>
            <small className="text-[11px] font-semibold text-[#9a8490]">{sub}</small>
          </span>
        </Link>
      ))}
    </div>
  );
}
