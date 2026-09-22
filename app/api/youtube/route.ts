import { NextResponse } from "next/server";
import { youtube } from "@/data/youtube";

export const dynamic = "force-dynamic";

type YouTubeApiResponse = { items?: Array<Record<string, any>> };

function duration(value = "") {
  const parts = value.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!parts) return "YouTube";
  const [, hours = "0", minutes = "0", seconds = "0"] = parts;
  return Number(hours) > 0 ? `${hours}:${minutes.padStart(2, "0")}:${seconds.padStart(2, "0")}` : `${minutes}:${seconds.padStart(2, "0")}`;
}

export async function GET() {
  const key = process.env.YOUTUBE_API_KEY;
  if (!key) return NextResponse.json({ channel: youtube, videos: youtube.videos, isLive: false });

  try {
    const channelResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics,contentDetails&forHandle=pxpukpik&key=${key}`,
      { cache: "no-store" },
    );
    const channelData = (await channelResponse.json()) as YouTubeApiResponse;
    const channel = channelData.items?.[0];
    const uploadsId = channel?.contentDetails?.relatedPlaylists?.uploads;
    if (!channel || !uploadsId) throw new Error("Channel not found");

    const playlistResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&playlistId=${uploadsId}&maxResults=6&key=${key}`,
      { cache: "no-store" },
    );
    const playlist = (await playlistResponse.json()) as YouTubeApiResponse;
    const ids = (playlist.items ?? []).map((item) => item.contentDetails?.videoId).filter(Boolean).join(",");
    const videoResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=contentDetails,statistics&id=${ids}&key=${key}`,
      { cache: "no-store" },
    );
    const videoStats = (await videoResponse.json()) as YouTubeApiResponse;
    const byId = new Map((videoStats.items ?? []).map((item) => [item.id, item]));

    const videos = (playlist.items ?? []).map((item) => {
      const id = item.contentDetails.videoId;
      const details = byId.get(id);
      return {
        title: item.snippet.title,
        views: `${Number(details?.statistics?.viewCount ?? 0).toLocaleString()} views`,
        date: new Intl.DateTimeFormat("th-TH", { dateStyle: "medium" }).format(new Date(item.contentDetails.videoPublishedAt)),
        duration: duration(details?.contentDetails?.duration),
        thumbnail: item.snippet.thumbnails?.medium?.url ?? item.snippet.thumbnails?.default?.url ?? "",
        url: `https://www.youtube.com/watch?v=${id}`,
      };
    });

    return NextResponse.json({
      channel: {
        name: channel.snippet.title,
        handle: "@pxpukpik",
        subscribers: `${Number(channel.statistics.subscriberCount).toLocaleString()} subscribers`,
        description: channel.snippet.description || youtube.description,
        url: youtube.url,
      },
      videos,
      isLive: true,
    });
  } catch {
    return NextResponse.json({ channel: youtube, videos: youtube.videos, isLive: false });
  }
}
