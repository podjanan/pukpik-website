import type { Metadata } from "next";
import "./globals.css";
import { AppShell } from "@/components/AppShell";

export const metadata: Metadata = {
  title: { default: "PUKPIK — รวมลิงก์ร้านค้า & สินค้าน่ารัก", template: "%s | PUKPIK" },
  description: "รวมลิงก์ร้านค้า สินค้าน่ารัก และคอนเทนต์จาก PUKPIK ทุกช่องทาง",
  openGraph: {
    title: "PUKPIK",
    description: "รวมลิงก์ร้านค้า & สินค้าน่ารัก",
    type: "website",
    locale: "th_TH",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th">
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
