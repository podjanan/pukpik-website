"use client";

import Image from "next/image";
import { Play, Youtube } from "lucide-react";
import { useEffect, useState } from "react";
import { youtube, type YoutubeChannel, type YoutubeVideo } from "@/data/youtube";

type Response = { channel: YoutubeChannel; videos: YoutubeVideo[]; isLive: boolean };

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
            <div className="relative h-32 w-full overflow-hidden bg-gradient-to-r from-pink-200 via-pink-100 to-white sm:h-40">
              {data.channel.banner ? (
                <img src={data.channel.banner} alt="Channel Banner" className="h-full w-full object-cover" referrerPolicy="no-referrer" />
              ) : (
                <Image src="/images/character-pukpik-cutout.png" alt="" width={200} height={120} className="absolute -bottom-2 right-4 h-28 w-auto object-contain object-bottom" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
              <p className="absolute left-4 top-4 rounded-full bg-white/80 px-3 py-1 text-xs font-extrabold text-rose backdrop-blur-sm shadow-sm">
                YouTube Channel
              </p>
            </div>
            <div className="relative px-5 pb-5 pt-14">
              <div className="absolute -top-12 left-5 h-24 w-24 overflow-hidden rounded-full border-4 border-white bg-pink-100 shadow-candy">
                {data.channel.avatar ? (
                  <img src={data.channel.avatar} alt={data.channel.name} className="h-full w-full object-cover" referrerPolicy="no-referrer" />
                ) : (
                  <Image src="/images/character-pukpik-cutout.png" alt="pxpukpik" fill className="object-cover object-top scale-125" />
                )}
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-xl font-extrabold sm:text-2xl">{data.channel.name}</h1>
              </div>
              <p className="mt-0.5 text-xs text-[#866b75]">{data.channel.handle} · {data.channel.subscribers}</p>
              <p className="mt-3 text-sm leading-relaxed text-[#725d65] whitespace-pre-line">{data.channel.description}</p>
              <a className="button mt-4 w-full sm:w-auto inline-flex items-center justify-center gap-2" href={data.channel.url} target="_blank" rel="noopener noreferrer">
                ดูช่องจริง <Youtube size={18} />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="shell section">
        <div className="mb-4 flex items-center justify-between gap-3">
          <h2 className="text-lg font-extrabold">วิดีโอล่าสุด <span className="text-rose">♡</span></h2>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {data.videos.map((video) => (
            <a key={`${video.url}-${video.title}`} href={video.url} target="_blank" rel="noopener noreferrer" className="card group flex flex-col sm:flex-row gap-3 overflow-hidden border-2 border-pink-100 p-2.5 transition hover:-translate-y-0.5 hover:shadow-md">
              <div className="relative aspect-video w-full sm:w-44 shrink-0 overflow-hidden rounded-xl bg-pink-100">
                {video.thumbnail ? (
                  <img src={video.thumbnail} alt={video.title} className="h-full w-full object-cover transition group-hover:scale-105" referrerPolicy="no-referrer" />
                ) : (
                  <div className="h-full w-full grid place-items-center bg-pink-100 text-rose font-bold">YouTube</div>
                )}
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition grid place-items-center">
                  <div className="grid h-10 w-10 place-items-center rounded-full bg-white/90 shadow-md transition group-hover:scale-110">
                    <Play className="ml-0.5 text-rose fill-rose" size={20} />
                  </div>
                </div>
                <span className="absolute bottom-1.5 right-1.5 rounded-md bg-black/80 px-1.5 py-0.5 text-[10px] font-bold text-white backdrop-blur-xs">
                  {video.duration}
                </span>
              </div>
              <div className="flex min-w-0 flex-1 flex-col justify-between py-1 pr-1">
                <div>
                  <h3 className="line-clamp-2 text-sm font-bold leading-snug text-gray-800 group-hover:text-rose transition-colors">{video.title}</h3>
                </div>
                <p className="mt-2 text-[11px] font-medium text-[#866b75]">{video.views} · {video.date}</p>
              </div>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}

