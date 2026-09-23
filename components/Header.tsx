import Link from "next/link";
import { BrandImage } from "@/components/BrandImage";

const links = [
  ["หน้าแรก", "/"],
  ["สินค้า", "/shop"],
  ["YouTube", "/youtube"],
  ["TikTok", "/tiktok"],
  ["เพิ่มเติม", "/about"],
] as const;

export function Header() {
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
          <h1>⁺◟✿ ทูเดย์อิสพุกพิก ‧₊˚</h1>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-bold md:flex">
          {links.map(([n, h]) => (
            <Link className="navlink text-[#725d65] hover:text-rose" key={h} href={h}>
              {n}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

