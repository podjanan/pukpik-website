import Image from "next/image";
import { Play, Eye } from "lucide-react";
import { youtube, type YoutubeVideo } from "@/data/youtube";
import { tiktok } from "@/data/tiktok";

export function YoutubeCard({ video }: { video: YoutubeVideo }) {
  return (
    <a
      href={video.url}
      target="_blank"
      rel="noopener noreferrer"
      className="card group flex gap-3 overflow-hidden border-2 border-pink-100 p-2 transition hover:-translate-y-0.5"
    >
      <div className="relative aspect-video w-[42%] shrink-0 overflow-hidden rounded-xl bg-pink-50">
        <Image fill src={video.thumbnail} alt={video.title} className="object-cover transition group-hover:scale-105" />
        <span className="absolute bottom-1.5 right-1.5 rounded-md bg-black/75 px-1.5 py-0.5 text-[10px] font-bold text-white">
          {video.duration}
        </span>
      </div>
      <div className="flex min-w-0 flex-1 flex-col justify-center py-1 pr-1">
        <h3 className="line-clamp-2 text-sm font-bold leading-snug">{video.title}</h3>
        <p className="mt-2 text-[11px] text-[#866b75]">
          {video.views} · {video.date}
        </p>
      </div>
    </a>
  );
}

export function YoutubeGrid({ limit }: { limit?: number }) {
  const list = limit ? youtube.videos.slice(0, limit) : youtube.videos;
  return (
    <div className="space-y-3">
      {list.map((v) => (
        <YoutubeCard key={v.title} video={v} />
      ))}
    </div>
  );
}

export function TikTokGrid({ limit }: { limit?: number }) {
  const list = limit ? tiktok.videos.slice(0, limit) : tiktok.videos;
  return (
    <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
      {list.map((v) => (
        <a
          key={v.caption}
          href={v.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative aspect-[3/4] overflow-hidden rounded-xl border border-pink-100 bg-pink-50"
        >
          {v.thumbnail && <Image src={v.thumbnail} alt={v.caption} fill className="object-cover transition group-hover:scale-105" />}
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
          <Play
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/90 p-1.5 text-rose opacity-90"
            size={28}
          />
          <p className="absolute inset-x-1.5 bottom-1.5 flex items-center gap-0.5 text-[10px] font-bold text-white">
            <Eye size={10} />
            {v.views}
          </p>
        </a>
      ))}
    </div>
  );
}
