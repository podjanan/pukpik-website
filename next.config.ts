import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      // TikTok CDN domains
      { protocol: "https", hostname: "**.tiktokcdn.com" },
      { protocol: "https", hostname: "**.tiktokcdn-us.com" },
      { protocol: "https", hostname: "**.byteoversea.com" },
      { protocol: "https", hostname: "**.ibyteimg.com" },
      { protocol: "https", hostname: "**.musical.ly" },
      { protocol: "https", hostname: "p16-sign.tiktokcdn.com" },
      { protocol: "https", hostname: "p16-sign-va.tiktokcdn.com" },
      { protocol: "https", hostname: "p16-sign-sg.tiktokcdn.com" },
      // YouTube / Google
      { protocol: "https", hostname: "**.ytimg.com" },
      { protocol: "https", hostname: "**.ggpht.com" },
      { protocol: "https", hostname: "**.googleusercontent.com" },
    ],
  },
};

export default nextConfig;

