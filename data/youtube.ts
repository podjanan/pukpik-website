export type YoutubeVideo = {
  title: string;
  views: string;
  date: string;
  duration: string;
  thumbnail: string;
  url: string;
};

export type YoutubeChannel = {
  name: string;
  handle: string;
  subscribers: string;
  description: string;
  avatar?: string;
  banner?: string;
  url: string;
};

export const youtube: YoutubeChannel & { videos: YoutubeVideo[] } = {
  name: "pxpukpik",
  handle: "@pxpukpik",
  subscribers: "61.7K+ subscribers",
  description: "สตรีมเกม คลิปชิล ๆ และสอนโหลดแอดออน Minecraft ฟรี ♡",
  avatar: "/images/character-pukpik-cutout.png",
  banner: "",
  url: "https://www.youtube.com/@pxpukpik",
  videos: [
    {
      title: "แอดออน/มอดทำอาหารมายคราฟ: เพิ่มครัว เตา กระทะ และเมนูอาหารน่ากิน",
      views: "วิดีโอแนะนำ",
      date: "Minecraft",
      duration: "YouTube",
      thumbnail: "",
      url: "https://www.youtube.com/@pxpukpik",
    },
    {
      title: "แนะนำแอดออนมายคราฟน่ารัก ๆ โหลดฟรี แต่งบ้านโทนชมพู-ขาว",
      views: "วิดีโอแนะนำ",
      date: "Minecraft",
      duration: "YouTube",
      thumbnail: "",
      url: "https://www.youtube.com/@pxpukpik",
    },
    {
      title: "สตรีมเกม / คลิปชิล ๆ / คลิปสอน จาก pxpukpik",
      views: "ดูวิดีโอทั้งหมด",
      date: "ช่องจริง",
      duration: "YouTube",
      thumbnail: "",
      url: "https://www.youtube.com/@pxpukpik",
    },
  ],
};

