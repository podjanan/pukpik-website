import { NextResponse } from "next/server";
import { youtube, type YoutubeChannel, type YoutubeVideo } from "@/data/youtube";

export const dynamic = "force-dynamic";

/* eslint-disable @typescript-eslint/no-explicit-any */
type YouTubeApiResponse = { items?: Array<Record<string, any>> };
type AnyRecord = Record<string, any>;
/* eslint-enable @typescript-eslint/no-explicit-any */

function proxyUrl(url?: string): string {
  if (!url) return "";
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return `/api/image-proxy?url=${encodeURIComponent(url)}`;
  }
  return url;
}

function parseDuration(value = "") {
  const parts = value.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!parts) return "YouTube";
  const [, hours = "0", minutes = "0", seconds = "0"] = parts;
  return Number(hours) > 0
    ? `${hours}:${minutes.padStart(2, "0")}:${seconds.padStart(2, "0")}`
    : `${minutes}:${seconds.padStart(2, "0")}`;
}

// ---------------------------------------------------------------------------
// Scrape YouTube channel page directly (no API key required)
// Fetches /videos tab → only regular videos, no Shorts
// ---------------------------------------------------------------------------
async function fetchViaScraping(): Promise<{
  channel: YoutubeChannel;
  videos: YoutubeVideo[];
  isLive: boolean;
} | null> {
  try {
    const res = await fetch("https://www.youtube.com/@pxpukpik/videos", {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept-Language": "th-TH,th;q=0.9,en;q=0.8",
      },
      next: { revalidate: 1800 },
    });

    if (!res.ok) return null;
    const html = await res.text();

    // Extract ytInitialData JSON blob embedded in the page
    const match = html.match(/var ytInitialData = ({[\s\S]*?});<\/script>/);
    if (!match) return null;

    const data = JSON.parse(match[1]) as AnyRecord;

    // --- Channel metadata (full description, avatar, name) ---
    const metadata = data?.metadata?.channelMetadataRenderer;
    const name: string = metadata?.title ?? youtube.name;
    const description: string = metadata?.description ?? youtube.description;
    const avatar: string =
      metadata?.avatar?.thumbnails?.[0]?.url ?? youtube.avatar ?? "";

    // --- Banner from pageHeaderRenderer ---
    const phrContent =
      data?.header?.pageHeaderRenderer?.content?.pageHeaderViewModel;
    const bannerSources =
      phrContent?.banner?.imageBannerViewModel?.image?.sources as
        | Array<{ url: string; width: number }>
        | undefined;
    const banner: string = bannerSources
      ? (bannerSources.sort((a, b) => b.width - a.width)[0]?.url ?? "")
      : "";

    // --- Subscriber count from metadata rows ---
    const metaRows =
      phrContent?.metadata?.contentMetadataViewModel?.metadataRows as
        | AnyRecord[]
        | undefined;
    let subscribers = youtube.subscribers;
    if (metaRows) {
      for (const row of metaRows) {
        for (const part of row.metadataParts ?? []) {
          const text: string = part.text?.content ?? "";
          if (text.includes("ติดตาม") || text.includes("subscriber")) {
            subscribers = text;
          }
        }
      }
    }

    // --- Videos from the "วิดีโอ" / "Videos" tab ---
    const tabs =
      data?.contents?.twoColumnBrowseResultsRenderer?.tabs as AnyRecord[];
    const videosTab = tabs?.find(
      (t: AnyRecord) =>
        t.tabRenderer?.title === "วิดีโอ" ||
        t.tabRenderer?.title === "Videos",
    );
    const gridItems = (videosTab?.tabRenderer?.content?.richGridRenderer
      ?.contents ?? []) as AnyRecord[];

    const videos: YoutubeVideo[] = [];

    for (const item of gridItems) {
      if (videos.length >= 6) break;
      const content = item.richItemRenderer?.content;
      if (!content) continue;

      // New format: lockupViewModel
      if (content.lockupViewModel) {
        const lvm = content.lockupViewModel;
        if (lvm.contentType !== "LOCKUP_CONTENT_TYPE_VIDEO") continue;

        const videoId: string = lvm.contentId ?? "";
        const title: string =
          lvm.metadata?.lockupMetadataViewModel?.title?.content ?? "";
        if (!videoId || !title) continue;

        // Views & date
        const vMetaRows =
          lvm.metadata?.lockupMetadataViewModel?.metadata
            ?.contentMetadataViewModel?.metadataRows as
            | AnyRecord[]
            | undefined;
        let views = "";
        let date = "";
        if (vMetaRows) {
          for (const row of vMetaRows) {
            for (const part of row.metadataParts ?? []) {
              const t: string = part.text?.content ?? "";
              if (t.includes("การดู") || t.includes("view") || t.includes("ครั้ง")) {
                views = t;
              } else if (t.length > 0) {
                date = t;
              }
            }
          }
        }

        // Thumbnail – prefer high-res
        const thumbSources =
          lvm.contentImage?.thumbnailViewModel?.image?.sources as
            | Array<{ url: string; width: number }>
            | undefined;
        const thumbnail = thumbSources
          ? (thumbSources.sort((a, b) => b.width - a.width)[0]?.url ??
            `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`)
          : `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

        // Duration from overlays
        let dur = "";
        const overlays =
          lvm.contentImage?.thumbnailViewModel?.overlays as
            | AnyRecord[]
            | undefined;
        if (overlays) {
          for (const ov of overlays) {
            const badges =
              (ov.thumbnailOverlayBadgeViewModel?.thumbnailBadges ??
                ov.thumbnailBottomOverlayViewModel?.badges) as
                | AnyRecord[]
                | undefined;
            if (badges) {
              for (const badge of badges) {
                if (badge.thumbnailBadgeViewModel?.text) {
                  dur = badge.thumbnailBadgeViewModel.text;
                }
              }
            }
          }
        }

        videos.push({
          title,
          views: views || "YouTube",
          date: date || "YouTube",
          duration: dur || "YouTube",
          thumbnail: proxyUrl(thumbnail),
          url: `https://www.youtube.com/watch?v=${videoId}`,
        });
        continue;
      }

      // Legacy format: videoRenderer
      if (content.videoRenderer) {
        const v = content.videoRenderer;
        const videoId: string = v.videoId ?? "";
        if (!videoId) continue;

        const thumbUrl =
          v.thumbnail?.thumbnails?.[v.thumbnail.thumbnails.length - 1]?.url ??
          `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

        videos.push({
          title: v.title?.runs?.[0]?.text ?? "",
          views: v.viewCountText?.simpleText ?? "YouTube",
          date: v.publishedTimeText?.simpleText ?? "YouTube",
          duration: v.lengthText?.simpleText ?? "YouTube",
          thumbnail: proxyUrl(thumbUrl),
          url: `https://www.youtube.com/watch?v=${videoId}`,
        });
      }
    }

    return {
      channel: {
        name,
        handle: "@pxpukpik",
        subscribers,
        description,
        avatar: proxyUrl(avatar),
        banner: proxyUrl(banner),
        url: youtube.url,
      },
      videos: videos.length > 0 ? videos : youtube.videos,
      isLive: true,
    };
  } catch {
    return null;
  }
}

// ---------------------------------------------------------------------------
// Official YouTube Data API v3 (requires YOUTUBE_API_KEY)
// ---------------------------------------------------------------------------
async function fetchViaAPI(
  key: string,
): Promise<{
  channel: YoutubeChannel;
  videos: YoutubeVideo[];
  isLive: boolean;
} | null> {
  try {
    const channelResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics,contentDetails,brandingSettings&forHandle=pxpukpik&key=${key}`,
      { cache: "no-store" },
    );
    const channelData = (await channelResponse.json()) as YouTubeApiResponse;
    const channel = channelData.items?.[0];
    const uploadsId = channel?.contentDetails?.relatedPlaylists?.uploads;
    if (!channel || !uploadsId) return null;

    const playlistResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&playlistId=${uploadsId}&maxResults=12&key=${key}`,
      { cache: "no-store" },
    );
    const playlist = (await playlistResponse.json()) as YouTubeApiResponse;
    const ids = (playlist.items ?? [])
      .map((item) => item.contentDetails?.videoId)
      .filter(Boolean)
      .join(",");

    const videoResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=contentDetails,statistics&id=${ids}&key=${key}`,
      { cache: "no-store" },
    );
    const videoStats = (await videoResponse.json()) as YouTubeApiResponse;
    const byId = new Map(
      (videoStats.items ?? []).map((item) => [item.id, item]),
    );

    // Filter out Shorts (duration <= 60s)
    const videos: YoutubeVideo[] = [];
    for (const item of playlist.items ?? []) {
      if (videos.length >= 6) break;
      const id = item.contentDetails.videoId;
      const details = byId.get(id);
      const raw = details?.contentDetails?.duration ?? "";
      const dMatch = raw.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
      if (dMatch) {
        const totalSec =
          Number(dMatch[1] || 0) * 3600 +
          Number(dMatch[2] || 0) * 60 +
          Number(dMatch[3] || 0);
        if (totalSec <= 60 && totalSec > 0) continue;
      }

      const rawThumb =
        item.snippet.thumbnails?.high?.url ??
        item.snippet.thumbnails?.medium?.url ??
        item.snippet.thumbnails?.default?.url ??
        "";

      videos.push({
        title: item.snippet.title,
        views: `${Number(details?.statistics?.viewCount ?? 0).toLocaleString()} views`,
        date: new Intl.DateTimeFormat("th-TH", { dateStyle: "medium" }).format(
          new Date(item.contentDetails.videoPublishedAt),
        ),
        duration: parseDuration(raw),
        thumbnail: proxyUrl(rawThumb),
        url: `https://www.youtube.com/watch?v=${id}`,
      });
    }

    const avatar =
      channel.snippet?.thumbnails?.high?.url ??
      channel.snippet?.thumbnails?.medium?.url ??
      "";
    const banner =
      channel.brandingSettings?.image?.bannerExternalUrl ?? "";

    return {
      channel: {
        name: channel.snippet.title,
        handle: "@pxpukpik",
        subscribers: `${Number(channel.statistics.subscriberCount).toLocaleString()} subscribers`,
        description: channel.snippet.description || youtube.description,
        avatar: proxyUrl(avatar || youtube.avatar),
        banner: proxyUrl(banner || youtube.banner),
        url: youtube.url,
      },
      videos,
      isLive: true,
    };
  } catch {
    return null;
  }
}

// ---------------------------------------------------------------------------
// Route handler – tries API first, then scraping, then static fallback
// ---------------------------------------------------------------------------
export async function GET() {
  const key = process.env.YOUTUBE_API_KEY;

  if (key) {
    const apiData = await fetchViaAPI(key);
    if (apiData) return NextResponse.json(apiData);
  }

  const scrapeData = await fetchViaScraping();
  if (scrapeData) return NextResponse.json(scrapeData);

  return NextResponse.json({
    channel: youtube,
    videos: youtube.videos,
    isLive: false,
  });
}

