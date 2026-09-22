import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#4A3A40",
        rose: "#E85D8F",
        blush: "#FBCFE8",
        cream: "#FFF8FB",
        shopee: "#EE4D2D",
        lazada: "#0F146D",
      },
      boxShadow: {
        candy: "0 8px 22px rgba(199,92,130,.12)",
      },
    },
  },
  plugins: [],
} satisfies Config;
