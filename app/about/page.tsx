import Image from "next/image";
import Link from "next/link";
import { socialLinks, site } from "@/data/site";
import { Mail, ChevronRight, Shield, Share2, Instagram, Youtube, Link2 } from "lucide-react";
import { LineIcon, Lemon8Icon, TikTokIcon } from "@/components/PlatformIcons";

export const metadata = { title: "เพิ่มเติม" };

const socialIconsMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  line: LineIcon,
  instagram: Instagram,
  tiktok: TikTokIcon,
  lemon8: Lemon8Icon,
  youtube: Youtube,
};

const menu = [
  { href: site.line, label: "ติดต่อ / ร่วมงาน", Icon: LineIcon, external: true },
  { href: "#", label: "นโยบายความเป็นส่วนตัว", Icon: Shield, external: false },
  { href: "/#", label: "ช่องทางโซเชียลอื่น ๆ", Icon: Share2, external: false },
] as const;

export default function About() {
  return (
    <main className="paper min-h-[70vh] py-8">
      <div className="shell space-y-6">
        <article className="card border-2 border-pink-100 p-5 sm:p-7">
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
            <div className="relative shrink-0">
              <div className="absolute inset-2 rounded-full bg-pink-200/50 blur-xl" />
              <Image
                src="/images/character-pukpik-cutout.png"
                alt="ตัวละคร PUKPIK"
                width={140}
                height={160}
                className="relative w-[120px] sm:w-[140px]"
              />
            </div>
            <div className="text-center sm:text-left">
              <p className="font-bold text-rose">เกี่ยวกับ PUKPIK</p>
              <h1 className="mt-1 text-2xl font-extrabold">สวัสดีค่ะ ♡</h1>
              <p className="mt-4 leading-7 text-[#725d65]">
                PUKPIK คือพื้นที่เล็ก ๆ ที่อยากชวนทุกคนมาเติมความสุขไปกับของน่ารัก ๆ เราอยากให้ทุกครั้งที่แวะมา 
                คุณรู้สึกผ่อนคลายและเป็นตัวของตัวเอง เหมือนได้แวะมาพูดคุยกับเพื่อนคนหนึ่งค่ะ

              </p>
            </div>
          </div>
        </article>

        <nav aria-label="เมนูเพิ่มเติม" className="space-y-2">
          {menu.map(({ href, label, Icon, external }) => (
            <Link
              key={label}
              href={href}
              {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="card flex items-center gap-4 border-2 border-pink-100 px-4 py-4 transition hover:-translate-y-0.5 hover:bg-pink-50/50"
            >
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-pink-100 text-rose">
                <Icon size={20} />
              </span>
              <span className="flex-1 font-bold">{label}</span>
              <ChevronRight className="text-rose" size={20} />
            </Link>
          ))}
        </nav>

        <div className="card border-2 border-pink-100 p-4">
          <p className="mb-3 text-sm font-extrabold text-rose">ช่องทางติดตาม</p>
          <div className="grid gap-2">
            {socialLinks.map((s) => {
              const Icon = socialIconsMap[s.icon] || Link2;
              return (
                <a
                  key={s.label}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-xl border border-pink-200 px-4 py-3 text-sm font-bold hover:bg-pink-50 transition"
                >
                  <span className="flex items-center gap-2.5">
                    <span className="grid h-7 w-7 place-items-center rounded-lg bg-pink-100 text-rose">
                      <Icon size={16} />
                    </span>
                    {s.label}
                    <small className="font-normal text-[#866b75]">{s.handle}</small>
                  </span>
                  <ChevronRight size={16} className="text-rose" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
}
