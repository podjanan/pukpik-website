import Link from "next/link";
import { Instagram, Youtube, Link2 } from "lucide-react";
import { BrandImage } from "@/components/BrandImage";
import { CategoryGrid } from "@/components/CategoryGrid";
import { socialLinks } from "@/data/site";
import { LineIcon, Lemon8Icon, TikTokIcon } from "@/components/PlatformIcons";

const socialIconsMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  line: LineIcon,
  instagram: Instagram,
  tiktok: TikTokIcon,
  lemon8: Lemon8Icon,
  youtube: Youtube,
};

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
          <div className="relative mx-auto max-w-[460px] text-center">
            <div className="absolute inset-x-8 top-10 h-48 rounded-full bg-pink-200/50 blur-3xl" />
            <BrandImage
              src="/images/character-pukpik.png"
              alt="ตัวละคร PUKPIK"
              width={340}
              height={380}
              priority
              backdropClassName="bg-transparent"
              className="relative mx-auto w-[92%] max-w-[320px] drop-shadow-[0_10px_12px_rgba(224,110,157,.16)]"
            />
            <BrandImage
              src="/images/logo-pukpik.png"
              alt="PUKPIK"
              width={260}
              height={80}
              backdropClassName="bg-transparent"
              className="relative -mt-5 mx-auto block w-[min(72vw,260px)]"
            />
            <div className="relative mt-3 space-y-1 text-center font-semibold text-[#725d65]">
              <p className="whitespace-nowrap text-[10.5px] xs:text-[11.5px] sm:text-sm md:text-base leading-snug">
                ʚ 𓈒ྀི ⸝⸝• ·̫ •⸝⸝ マ ♡ Welcome to pxpukpik 𓈒 ིྀ
              </p>
              <p className="whitespace-nowrap text-[10.5px] xs:text-[11.5px] sm:text-sm md:text-base leading-snug">
                ช่องทางติดต่อลิงก์ข้างล่างค่ะ 𐙚 สตรีมเกมต่างๆในTiktok : pxpukpik
              </p>
            </div>
            <div className="relative mt-5 flex justify-center gap-2.5">
              {socialLinks.map((s) => {
                const Icon = socialIconsMap[s.icon] || Link2;
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

          {/* Cute Social Link Buttons List */}
          <div className="relative mx-auto mt-8 max-w-[520px] space-y-2.5 px-2">
            {socialLinks.map((s) => {
              const Icon = socialIconsMap[s.icon] || Link2;
              return (
                <a
                  key={s.label}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between rounded-full border-2 border-pink-100 bg-white/95 px-3.5 py-3 shadow-[0_4px_16px_rgba(232,93,143,0.06)] backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-pink-300 hover:bg-white hover:shadow-[0_8px_20px_rgba(232,93,143,0.14)]"
                >
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-pink-100/80 text-rose transition group-hover:scale-105 group-hover:bg-pink-100">
                    <Icon size={17} />
                  </span>
                  <span className="mx-2 flex-1 truncate text-center font-extrabold text-[#4A3A40] text-[10.5px] xs:text-xs sm:text-sm whitespace-nowrap">
                    {s.title}
                  </span>
                  <span className="text-sm text-pink-300 transition group-hover:translate-x-1 group-hover:text-rose font-bold shrink-0">
                    ›
                  </span>
                </a>
              );
            })}
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
