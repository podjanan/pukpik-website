import Image from "next/image";
import { TikTokGrid } from "@/components/VideoCards";
import { tiktok } from "@/data/tiktok";
import { ChevronDown, Music2 } from "lucide-react";

export const metadata = { title: "TikTok" };

export default function TikTokPage() {
  return (
    <main>
      <section className="paper border-b border-pink-200 py-8">
        <div className="shell text-center">
          <div className="relative mx-auto h-24 w-24 overflow-hidden rounded-full border-4 border-white bg-pink-100 shadow-candy">
            <Image src="/images/character-pukpik-cutout.png" alt="PUKPIK" fill className="object-cover object-top scale-125" />
          </div>
          <h1 className="mt-4 text-xl font-extrabold">{tiktok.displayName}</h1>
          <p className="font-bold text-rose">{tiktok.username}</p>
          <dl className="mx-auto mt-5 flex max-w-xs justify-center gap-6">
            <div>
              <dt className="text-lg font-extrabold">{tiktok.following}</dt>
              <dd className="text-[11px] text-[#866b75]">กำลังติดตาม</dd>
            </div>
            <div>
              <dt className="text-lg font-extrabold">{tiktok.followers}</dt>
              <dd className="text-[11px] text-[#866b75]">ผู้ติดตาม</dd>
            </div>
            <div>
              <dt className="text-lg font-extrabold">{tiktok.likes}</dt>
              <dd className="text-[11px] text-[#866b75]">ถูกใจ</dd>
            </div>
          </dl>
          <div className="mt-5 flex justify-center gap-2">
            <a className="button min-w-[140px]" href={tiktok.url} target="_blank" rel="noopener noreferrer">
              ติดตาม <Music2 size={17} />
            </a>
            <button
              type="button"
              aria-label="ตัวเลือกเพิ่มเติม"
              className="grid h-[46px] w-12 place-items-center rounded-full border-2 border-pink-200 bg-white text-rose"
            >
              <ChevronDown size={20} />
            </button>
          </div>
          <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-[#725d65]">{tiktok.bio}</p>
        </div>
      </section>

      <section className="shell section">
        <h2 className="mb-4 text-lg font-extrabold">
          คลิปล่าสุด <span className="text-rose">♡</span>
        </h2>
        <TikTokGrid />
      </section>
    </main>
  );
}
