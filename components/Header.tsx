"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { BrandImage } from "@/components/BrandImage";

const links = [
  ["หน้าแรก", "/"],
  ["สินค้า", "/shop"],
  ["YouTube", "/youtube"],
  ["TikTok", "/tiktok"],
  ["เพิ่มเติม", "/about"],
] as const;

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="scallop-edge sticky top-0 z-50 border-b border-pink-200/80 bg-[#fffafd]/94 backdrop-blur-md">
      <div className="shell flex h-[62px] items-center justify-between md:h-[72px]">
        <Link href="/" className="flex min-w-0 items-center gap-2">
          <span className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border-2 border-pink-200 bg-[#fff3f8] shadow-candy">
            <BrandImage
              src="/images/character-pukpik.png"
              alt=""
              fill
              sizes="40px"
              backdropClassName="bg-[#fff3f8]"
              className="object-cover object-top scale-125"
            />
          </span>
          <BrandImage
            src="/images/logo-pukpik.png"
            alt="PUKPIK"
            width={120}
            height={36}
            backdropClassName="bg-[#fffafd]"
            className="h-8 w-auto max-w-[min(42vw,120px)] object-contain object-left"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-bold md:flex">
          {links.map(([n, h]) => (
            <Link className="navlink text-[#725d65] hover:text-rose" key={h} href={h}>
              {n}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          aria-label={open ? "ปิดเมนู" : "เปิดเมนู"}
          aria-expanded={open}
          className="grid h-11 w-11 place-items-center rounded-2xl border border-pink-200 bg-white text-rose shadow-sm md:hidden"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <nav className="border-t border-pink-100 bg-white px-4 py-3 md:hidden">
          {links.map(([n, h]) => (
            <Link
              onClick={() => setOpen(false)}
              className="flex items-center justify-between rounded-2xl px-4 py-3.5 text-sm font-bold text-[#4A3A40] hover:bg-pink-50"
              key={h}
              href={h}
            >
              {n}
              <span className="text-rose">›</span>
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
