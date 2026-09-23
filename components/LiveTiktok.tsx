"use client";

import Image from "next/image";
import { Eye, Music2, Play, RefreshCw, X, ExternalLink, Heart, Users, UserCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { tiktok, type TiktokProfile, type TiktokVideo } from "@/data/tiktok";

type Response = { profile: TiktokProfile; videos: TiktokVideo[]; isLive: boolean };

export function LiveTiktok() {
  const [data, setData] = useState<Response>({
    profile: tiktok,
    videos: tiktok.videos,
    isLive: false,
  });
  const [loading, setLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState<TiktokVideo | null>(null);

  const loadData = () => {
    setLoading(true);
    fetch("/api/tiktok", { cache: "no-store" })
      .then((res) => res.json())
      .then((res: Response) => {
        setData(res);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <main className="min-h-screen pb-16">
      {/* Profile Section */}
      <section className="paper border-b border-pink-200 py-8">
        <div className="shell text-center">
          <div className="relative mx-auto h-24 w-24 overflow-hidden rounded-full border-4 border-white bg-pink-100 shadow-candy transition-transform hover:scale-105">
            {data.profile.avatar ? (
              <img
                src={data.profile.avatar}
                alt={data.profile.displayName}
                className="h-full w-full object-cover"
                referrerPolicy="no-referrer"
              />
            ) : (
              <Image
                src="/images/character-pukpik-cutout.png"
                alt="PUKPIK"
                fill
                className="object-cover object-top scale-125"
              />
            )}
          </div>

          <div className="mt-4 flex items-center justify-center gap-2 flex-wrap">
            <h1 className="text-xl sm:text-2xl font-extrabold text-pink-900">{data.profile.displayName}</h1>
          </div>
          <p className="font-bold text-rose">{data.profile.username}</p>

          <dl className="mx-auto mt-5 flex max-w-sm justify-center gap-6 sm:gap-8 rounded-2xl bg-white/70 p-3 border border-pink-100 shadow-sm backdrop-blur-sm">
            <div className="text-center">
              <dt className="text-lg font-extrabold text-pink-950 flex items-center justify-center gap-1">
                <UserCheck size={14} className="text-rose" />
                {data.profile.following}
              </dt>
              <dd className="text-[11px] font-semibold text-[#866b75]">กำลังติดตาม</dd>
            </div>
            <div className="h-8 w-px bg-pink-100 self-center" />
            <div className="text-center">
              <dt className="text-lg font-extrabold text-pink-950 flex items-center justify-center gap-1">
                <Users size={14} className="text-rose" />
                {data.profile.followers}
              </dt>
              <dd className="text-[11px] font-semibold text-[#866b75]">ผู้ติดตาม</dd>
            </div>
            <div className="h-8 w-px bg-pink-100 self-center" />
            <div className="text-center">
              <dt className="text-lg font-extrabold text-pink-950 flex items-center justify-center gap-1">
                <Heart size={14} className="text-rose fill-rose/20" />
                {data.profile.likes}
              </dt>
              <dd className="text-[11px] font-semibold text-[#866b75]">ถูกใจ</dd>
            </div>
          </dl>

          <div className="mt-5 flex items-center justify-center gap-3">
            <a
              className="button min-w-[140px] shadow-candy"
              href={data.profile.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              ติดตามบน TikTok <Music2 size={17} />
            </a>
            <button
              onClick={loadData}
              disabled={loading}
              title="รีเฟรชข้อมูลล่าสุด"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white border border-pink-200 text-rose hover:bg-pink-50 transition active:scale-95 disabled:opacity-50"
            >
              <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
            </button>
          </div>

          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-[#725d65] whitespace-pre-line">
            {data.profile.bio}
          </p>
        </div>
      </section>

      {/* Videos Section */}
      <section className="shell section">
        <div className="mb-6 flex items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-extrabold text-pink-950 flex items-center gap-2">
              Videos <span className="text-rose">♡</span>
            </h2>
            <p className="text-xs font-medium text-[#866b75] mt-0.5">
              คลิปล่าสุดจาก TikTok @pxpukpik
            </p>
          </div>
        </div>

        {loading && data.videos.length === 0 ? (
          <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="aspect-[3/4] animate-pulse rounded-2xl bg-pink-100/70 border border-pink-200/50"
              />
            ))}
          </div>
        ) : data.videos.length === 0 ? (
          <div className="rounded-2xl border-2 border-dashed border-pink-200 p-12 text-center bg-white/50">
            <Music2 size={40} className="mx-auto text-pink-300 mb-3" />
            <p className="font-extrabold text-pink-900">กำลังโหลดคลิปวิดีโอจาก TikTok...</p>
            <p className="text-xs text-[#866b75] mt-1">
              กรุณารอ สักครู่ หรือกดรีเฟรชเพื่อโหลดข้อมูลอีกครั้ง
            </p>
            <button
              onClick={loadData}
              className="mt-4 button min-w-[120px] text-xs py-2"
            >
              รีเฟรช <RefreshCw size={14} className="ml-1" />
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:gap-4 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6">
            {data.videos.map((video, idx) => (
              <div
                key={`${video.id || video.url}-${idx}`}
                onClick={() => setSelectedVideo(video)}
                className="group relative aspect-[3/4] cursor-pointer overflow-hidden rounded-2xl border-2 border-pink-100 bg-pink-50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-pink-300"
              >
                {/* Cover Thumbnail */}
                {video.thumbnail ? (
                  <img
                    src={video.thumbnail}
                    alt={video.caption}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                ) : (
                  <div className="h-full w-full grid place-items-center bg-gradient-to-b from-pink-100 to-pink-200 text-rose font-bold p-2 text-center text-xs">
                    TikTok Video
                  </div>
                )}

                {/* Pinned Badge */}
                {video.isPinned && (
                  <span className="absolute left-2 top-2 z-10 rounded-md bg-[#fe2c55] px-2 py-0.5 text-[10px] font-black uppercase text-white shadow-md">
                    Pinned
                  </span>
                )}

                {/* Play Button Overlay */}
                <div className="absolute inset-0 bg-black/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-center justify-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-rose shadow-lg transition-transform duration-300 group-hover:scale-110">
                    <Play size={24} className="ml-1 fill-rose" />
                  </div>
                </div>

                {/* Bottom Shadow Gradient */}
                <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                {/* Play Count & Caption Overlay */}
                <div className="absolute inset-x-2 bottom-2 z-10">
                  <p className="line-clamp-2 text-[11px] font-semibold text-white leading-tight drop-shadow-sm group-hover:text-pink-100">
                    {video.caption}
                  </p>
                  <div className="mt-1 flex items-center gap-1 text-[11px] font-extrabold text-white">
                    <Play size={12} className="fill-white" />
                    <span>{video.playCountFormatted || video.views}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Video Modal Player */}
      {selectedVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm transition-all"
          onClick={() => setSelectedVideo(null)}
        >
          <div
            className="relative w-full max-w-sm sm:max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl border border-pink-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-pink-100 px-4 py-3 bg-pink-50/50">
              <div className="flex items-center gap-2">
                <Music2 size={18} className="text-rose" />
                <span className="font-extrabold text-sm text-pink-950">TikTok Video</span>
              </div>
              <button
                onClick={() => setSelectedVideo(null)}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-gray-500 hover:bg-pink-100 hover:text-rose transition"
              >
                <X size={18} />
              </button>
            </div>

            {/* Video Player or Embed */}
            <div className="relative aspect-[9/16] max-h-[70vh] w-full bg-black flex items-center justify-center">
              {selectedVideo.id ? (
                <iframe
                  src={`https://www.tiktok.com/embed/v2/${selectedVideo.id}?lang=th-TH`}
                  className="h-full w-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : selectedVideo.playAddr ? (
                <video
                  src={selectedVideo.playAddr}
                  controls
                  autoPlay
                  className="h-full w-full object-contain"
                />
              ) : selectedVideo.thumbnail ? (
                <img
                  src={selectedVideo.thumbnail}
                  alt={selectedVideo.caption}
                  className="h-full w-full object-cover opacity-90"
                />
              ) : null}
            </div>

            {/* Caption & Actions */}
            <div className="p-4 bg-white">
              <p className="text-xs text-gray-700 leading-relaxed line-clamp-3 font-medium">
                {selectedVideo.caption}
              </p>
              <div className="mt-3 flex items-center justify-between gap-2 border-t border-pink-100 pt-3">
                <div className="flex items-center gap-1.5 text-xs font-bold text-rose">
                  <Eye size={14} />
                  <span>{selectedVideo.views}</span>
                </div>

                <a
                  href={selectedVideo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button text-xs py-2 px-4 flex items-center gap-1.5 shadow-candy"
                >
                  เปิดดูบน TikTok <ExternalLink size={14} />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
