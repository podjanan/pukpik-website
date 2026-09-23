import { NextResponse } from "next/server";
import { tiktok, type TiktokProfile, type TiktokVideo } from "@/data/tiktok";

export const dynamic = "force-dynamic";
export const revalidate = 0;

function proxyUrl(url?: string): string {
  if (!url) return "";
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return `/api/image-proxy?url=${encodeURIComponent(url)}`;
  }
  return url;
}

function formatCount(num: number | string): string {
  if (!num) return "0";
  const n = Number(num);
  if (isNaN(n)) return String(num);
  if (n >= 1_000_000) {
    return (n / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  }
  if (n >= 1_000) {
    return (n / 1_000).toFixed(1).replace(/\.0$/, "") + "K";
  }
  return n.toString();
}

/* eslint-disable @typescript-eslint/no-explicit-any */
type AnyRecord = Record<string, any>;
/* eslint-enable @typescript-eslint/no-explicit-any */

async function fetchFromEmbed(): Promise<{
  profile: TiktokProfile;
  videos: TiktokVideo[];
  isLive: boolean;
} | null> {
  try {
    const res = await fetch("https://www.tiktok.com/embed/@pxpukpik", {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
        "Accept-Language": "th-TH,th;q=0.9,en-US;q=0.8,en;q=0.7",
      },
      cache: "no-store",
    });

    if (!res.ok) return null;
    const html = await res.text();

    const match = html.match(
      /<script id="__FRONTITY_CONNECT_STATE__"[^>]*>([\s\S]*?)<\/script>/
    );
    if (!match) return null;

    const state = JSON.parse(match[1]) as AnyRecord;
    const data = state?.source?.data?.["/embed/@pxpukpik"] as AnyRecord | undefined;
    if (!data) return null;

    const rawUser = (data.userInfo || {}) as AnyRecord;
    const rawVideos = (data.videoList || []) as AnyRecord[];

    const profile: TiktokProfile = {
      username: rawUser.uniqueId ? `@${rawUser.uniqueId}` : "@pxpukpik",
      displayName: rawUser.nickname || tiktok.displayName,
      bio: rawUser.signature || tiktok.bio,
      followers: rawUser.followerCount ? formatCount(rawUser.followerCount) : tiktok.followers,
      following: rawUser.followingCount ? formatCount(rawUser.followingCount) : tiktok.following,
      likes: rawUser.heartCount ? formatCount(rawUser.heartCount) : tiktok.likes,
      avatar: proxyUrl(rawUser.avatarThumbUrl || rawUser.avatarMediumUrl || ""),
      url: `https://www.tiktok.com/@${rawUser.uniqueId || "pxpukpik"}`,
    };

    const videos: TiktokVideo[] = rawVideos.map((item, idx) => {
      const cover =
        item.coverUrl || item.dynamicCoverUrl || item.originCoverUrl || "";
      const rawDesc = item.desc || "";
      const playCount = item.playCount || 0;
      const isPinned = idx < 3 && item.isPinned !== false; // First 3 pinned like TikTok layout or pinned property

      return {
        id: item.id ? String(item.id) : undefined,
        caption: rawDesc || "TikTok Video",
        views: `${formatCount(playCount)} views`,
        playCountFormatted: formatCount(playCount),
        thumbnail: proxyUrl(cover),
        playAddr: item.playAddr || "",
        url: `https://www.tiktok.com/@pxpukpik/video/${item.id}`,
        isPinned,
      };
    });

    if (videos.length === 0) return null;

    return {
      profile,
      videos,
      isLive: true,
    };
  } catch {
    return null;
  }
}

async function fetchFromProfilePage(): Promise<{
  profile: TiktokProfile;
  videos: TiktokVideo[];
  isLive: boolean;
} | null> {
  try {
    const res = await fetch("https://www.tiktok.com/@pxpukpik", {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36",
        "Accept-Language": "th-TH,th;q=0.9,en-US;q=0.8,en;q=0.7",
      },
      cache: "no-store",
    });

    if (!res.ok) return null;
    const html = await res.text();

    const rehydMatch = html.match(
      /<script id="__UNIVERSAL_DATA_FOR_REHYDRATION__"[^>]*>([\s\S]*?)<\/script>/
    );
    if (!rehydMatch) return null;

    const json = JSON.parse(rehydMatch[1]) as AnyRecord;
    const scope = json?.["__DEFAULT_SCOPE__"];
    const userDetail = scope?.["webapp.user-detail"];
    const userInfo = userDetail?.userInfo;

    if (!userInfo) return null;

    const user = userInfo.user || {};
    const stats = userInfo.stats || userInfo.statsV2 || {};

    const rawAvatar =
      user.avatarLarger || user.avatarMedium || user.avatarThumb || "";

    const profile: TiktokProfile = {
      displayName: user.nickname || tiktok.displayName,
      username: user.uniqueId ? `@${user.uniqueId}` : tiktok.username,
      bio: user.signature || tiktok.bio,
      followers: stats.followerCount ? formatCount(stats.followerCount) : tiktok.followers,
      following: stats.followingCount ? formatCount(stats.followingCount) : tiktok.following,
      likes: (stats.heartCount || stats.heart) ? formatCount(stats.heartCount || stats.heart) : tiktok.likes,
      avatar: proxyUrl(rawAvatar),
      url: tiktok.url,
    };

    return {
      profile,
      videos: [],
      isLive: true,
    };
  } catch {
    return null;
  }
}

export async function GET() {
  // Try real-time fetch from embed API first (has both full profile and full video list)
  const embedData = await fetchFromEmbed();
  if (embedData) {
    return NextResponse.json(embedData, {
      headers: {
        "Cache-Control": "no-store, max-age=0, must-revalidate",
      },
    });
  }

  // Fallback to profile page scraping if embed failed
  const profileData = await fetchFromProfilePage();
  if (profileData) {
    return NextResponse.json(profileData, {
      headers: {
        "Cache-Control": "no-store, max-age=0, must-revalidate",
      },
    });
  }

  // Static fallback
  return NextResponse.json(
    {
      profile: tiktok,
      videos: tiktok.videos,
      isLive: false,
    },
    {
      headers: {
        "Cache-Control": "no-store, max-age=0, must-revalidate",
      },
    }
  );
}
