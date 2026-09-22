"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, ShoppingBag, Youtube, Music2, MoreHorizontal } from "lucide-react";

const items = [
  { href: "/", label: "หน้าแรก", Icon: Home },
  { href: "/shop", label: "สินค้า", Icon: ShoppingBag },
  { href: "/youtube", label: "YouTube", Icon: Youtube },
  { href: "/tiktok", label: "TikTok", Icon: Music2 },
  { href: "/about", label: "เพิ่มเติม", Icon: MoreHorizontal },
] as const;

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="เมนูหลัก"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-pink-200/90 bg-white/95 pb-[env(safe-area-inset-bottom)] shadow-[0_-4px_24px_rgba(232,93,143,.12)] backdrop-blur-md md:hidden"
    >
      <ul className="mx-auto flex max-w-lg items-stretch justify-around px-1 py-1.5">
        {items.map(({ href, label, Icon }) => {
          const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
          return (
            <li key={href} className="flex-1">
              <Link
                href={href}
                className={`flex flex-col items-center gap-0.5 rounded-2xl px-1 py-2 text-[10px] font-bold transition ${
                  active ? "text-rose" : "text-[#9a8490]"
                }`}
              >
                <span
                  className={`grid h-9 w-9 place-items-center rounded-2xl transition ${
                    active ? "bg-pink-100 text-rose" : "bg-transparent"
                  }`}
                >
                  <Icon size={20} strokeWidth={active ? 2.5 : 2} />
                </span>
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
