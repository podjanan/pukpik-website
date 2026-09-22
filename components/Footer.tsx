import { Instagram, Music2, Youtube, Facebook, Link2, Heart } from "lucide-react";
import { BrandImage } from "@/components/BrandImage";
import { site } from "@/data/site";

const social = [
  { Icon: Instagram, url: site.instagram, label: "Instagram" },
  { Icon: Music2, url: site.tiktok, label: "TikTok" },
  { Icon: Youtube, url: site.youtube, label: "YouTube" },
  { Icon: Facebook, url: site.facebook, label: "Facebook" },
  { Icon: Link2, url: "https://linktr.ee", label: "Link" },
] as const;

export function Footer() {
  return (
    <footer className="relative mt-6 overflow-hidden border-t border-pink-200 bg-gradient-to-b from-pink-50 to-[#fff0f6] py-12 pb-[calc(5.5rem+env(safe-area-inset-bottom))] md:pb-12">
      <span className="doodle floating left-[6%] top-8 text-2xl text-pink-300">✦</span>
      <span className="doodle floating right-[8%] top-16 text-2xl text-pink-300" style={{ animationDelay: "1.2s" }}>
        ♡
      </span>
      <div className="shell flex flex-col items-center text-center">
        <div className="relative mx-auto w-full max-w-[280px]">
          <div className="absolute inset-6 rounded-full bg-pink-200/50 blur-2xl" />
          <BrandImage
            src="/images/character-pukpik.png"
            alt="ตัวละคร PUKPIK"
            width={280}
            height={320}
            backdropClassName="bg-[#fff0f6]"
            className="relative mx-auto block w-full drop-shadow-lg"
          />
        </div>
        <p className="mt-4 font-extrabold tracking-wide text-rose">ขอบคุณที่แวะเข้ามานะคะ</p>
        <p className="mt-1 text-sm text-[#866b75]">ติดตาม PUKPIK ได้ทุกช่องทางเลยนะ ♡</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          {social.map(({ Icon, url, label }) => (
            <a
              key={label}
              aria-label={label}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="grid h-11 w-11 place-items-center rounded-full border-2 border-white bg-white text-rose shadow-candy transition hover:-translate-y-0.5 hover:bg-pink-50"
            >
              <Icon size={19} />
            </a>
          ))}
        </div>
        <p className="mt-8 inline-flex items-center gap-1 rounded-full border border-pink-200 bg-white px-4 py-2 text-xs font-bold text-[#866b75]">
          Have a nice day <Heart size={12} className="fill-rose text-rose" />
        </p>
        <p className="mt-4 text-[11px] text-[#9a8490]">© {new Date().getFullYear()} PUKPIK</p>
      </div>
    </footer>
  );
}
