"use client";

import Image from "next/image";
import { Play, Youtube } from "lucide-react";
import { useEffect, useState } from "react";
import { youtube, type YoutubeVideo } from "@/data/youtube";

type Channel = Pick<typeof youtube, "name" | "handle" | "subscribers" | "description" | "url">;
type Response = { channel: Channel; videos: YoutubeVideo[]; isLive: boolean };

export function LiveYoutube() {
  const [data, setData] = useState<Response>({ channel: youtube, videos: youtube.videos, isLive: false });

  useEffect(() => {
    fetch("/api/youtube", { cache: "no-store" })
      .then((response) => response.json())
      .then((response: Response) => setData(response))
      .catch(() => undefined);
  }, []);

  return (
    <main>
      <section className="hero-banner paper border-b border-pink-200 py-8">
        <div className="shell">
          <div className="card overflow-hidden border-2 border-pink-100 bg-white/80">
            <div className="relative h-28 bg-gradient-to-r from-pink-200 via-pink-100 to-white">
              <Image src="/images/character-pukpik-cutout.png" alt="" width={200} height={120} className="absolute -bottom-2 right-4 h-24 w-auto object-contain object-bottom" />
              <p className="absolute left-4 top-4 text-sm font-extrabold text-rose">YouTube Channel</p>
            </div>
            <div className="relative px-5 pb-5 pt-12">
              <div className="absolute -top-10 left-5 h-20 w-20 overflow-hidden rounded-full border-4 border-white bg-pink-100 shadow-candy">
                <Image src="/images/character-pukpik-cutout.png" alt="pxpukpik" fill className="object-cover object-top scale-125" />
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-xl font-extrabold">{data.channel.name}</h1>
                {data.isLive && <span className="rounded-full bg-pink-100 px-2 py-0.5 text-[10px] font-bold text-rose">LIVE DATA</span>}
              </div>
              <p className="mt-0.5 text-xs text-[#866b75]">{data.channel.handle} · {data.channel.subscribers}</p>
              <p className="mt-3 text-sm leading-relaxed text-[#725d65]">{data.channel.description}</p>
              <a className="button mt-4 w-full sm:w-auto" href={data.channel.url} target="_blank" rel="noopener noreferrer">ดูช่องจริง <Youtube size={17} /></a>
            </div>
          </div>
        </div>
      </section>

      <section className="shell section">
        <div className="mb-4 flex items-center justify-between gap-3">
          <h2 className="text-lg font-extrabold">วิดีโอล่าสุด <span className="text-rose">♡</span></h2>
          <span className="text-[11px] font-semibold text-[#866b75]">{data.isLive ? "อัปเดตเมื่อเปิดหน้า" : "เชื่อม API เพื่ออัปเดตอัตโนมัติ"}</span>
        </div>
        <div className="space-y-3">
          {data.videos.map((video) => (
            <a key={`${video.url}-${video.title}`} href={video.url} target="_blank" rel="noopener noreferrer" className="card group flex gap-3 overflow-hidden border-2 border-pink-100 p-2 transition hover:-translate-y-0.5">
              <div className="relative grid aspect-video w-[42%] shrink-0 place-items-center overflow-hidden rounded-xl bg-pink-100">
                {video.thumbnail && <img src={video.thumbnail} alt="" className="absolute inset-0 h-full w-full object-cover transition group-hover:scale-105" />}
                <Play className="relative rounded-full bg-white/90 p-1.5 text-rose" size={30} />
                <span className="absolute bottom-1.5 right-1.5 rounded-md bg-black/75 px-1.5 py-0.5 text-[10px] font-bold text-white">{video.duration}</span>
              </div>
              <div className="flex min-w-0 flex-1 flex-col justify-center py-1 pr-1">
                <h3 className="line-clamp-2 text-sm font-bold leading-snug">{video.title}</h3>
                <p className="mt-2 text-[11px] text-[#866b75]">{video.views} · {video.date}</p>
              </div>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
