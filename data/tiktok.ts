export type TiktokVideo = {
  id?: string;
  caption: string;
  views: string;
  playCountFormatted?: string;
  thumbnail?: string;
  playAddr?: string;
  url: string;
  isPinned?: boolean;
};

export type TiktokProfile = {
  username: string;
  displayName: string;
  bio: string;
  followers: string;
  following: string;
  likes: string;
  avatar?: string;
  url: string;
};

export const tiktok: TiktokProfile & { videos: TiktokVideo[] } = {
  username: "@pxpukpik",
  displayName: "⁺◟✿ ทูเดย์อิสพุกพิก ‧₊˚",
  bio: "₊𐙚˚\n💬 dm for work ꒰ @185vodyy ꒱ 🍮🎀\n♡ ig : pxpukpik Ი𐑼\nสอนลงแอดออนมายคราฟฟรี ꒰ yt : pxpukpik ꒱",
  followers: "223.5K",
  following: "375",
  likes: "5.4M",
  avatar: "",
  url: "https://www.tiktok.com/@pxpukpik",
  videos: [],
};
