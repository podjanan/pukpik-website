import Link from "next/link";
import { Instagram, Music2, Youtube, Facebook, Link2 } from "lucide-react";
import { BrandImage } from "@/components/BrandImage";
import { CategoryGrid } from "@/components/CategoryGrid";
import { socialLinks } from "@/data/site";

const socialIcons = [Instagram, Music2, Youtube, Facebook];

export default function Home() {
  return (
    <main>
      <section className="hero-banner paper doodle-frame relative overflow-hidden">
        <span className="doodle floating left-[5%] top-10 text-2xl text-pink-400">✦</span>
        <span className="doodle floating right-[6%] top-20 text-2xl text-pink-400" style={{ animationDelay: "0.8s" }}>
          ♡
        </span>
        <span className="doodle floating left-[12%] bottom-32 text-xl text-pink-300" style={{ animationDelay: "1.5s" }}>
          ★
        </span>

        <div className="shell py-8 md:py-14">
          <div className="relative mx-auto max-w-[340px] text-center">
            <div className="absolute inset-x-8 top-10 h-48 rounded-full bg-pink-200/50 blur-3xl" />
            <BrandImage
              src="/images/character-pukpik.png"
              alt="ตัวละคร PUKPIK"
              width={340}
              height={380}
              priority
              backdropClassName="bg-transparent"
              className="relative mx-auto w-[92%] drop-shadow-[0_10px_12px_rgba(224,110,157,.16)]"
            />
            <BrandImage
              src="/images/logo-pukpik.png"
              alt="PUKPIK"
              width={260}
              height={80}
              backdropClassName="bg-transparent"
              className="relative -mt-5 mx-auto block w-[min(72vw,260px)]"
            />
            <p className="relative mt-3 text-sm font-semibold leading-relaxed text-[#725d65] md:text-base">
              รวมลิงก์ร้านค้า & คอนเทนต์น่ารัก
              <br />
              มาค้นพบของคิ้วท์ไปด้่วยกันนะคะ ♡
            </p>
            <div className="relative mt-5 flex justify-center gap-2.5">
              {socialLinks.map((s, i) => {
                const Icon = socialIcons[i] || Link2;
                return (
                  <a
                    aria-label={s.label}
                    key={s.label}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="grid h-10 w-10 place-items-center rounded-2xl border border-pink-200 bg-white/90 text-rose shadow-candy transition hover:-translate-y-0.5 hover:bg-pink-50"
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="card mb-6 border-2 border-pink-100 bg-gradient-to-r from-pink-50 to-white px-4 py-4 text-center">
            <h2 className="sticker-title text-base font-extrabold text-rose sm:text-lg">🎀 รวมลิงก์ร้านค้า & สินค้าน่ารัก</h2>
            <p className="mt-1 text-xs text-[#866b75] sm:text-sm">เลือกหมวดที่อยากดูได้เลยค่ะ</p>
          </div>
          <CategoryGrid />
          <div className="mt-8 text-center">
            <Link href="/shop" className="button w-full max-w-xs sm:w-auto">
              ดูสินค้าทั้งหมด
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
