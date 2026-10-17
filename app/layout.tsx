import type { Metadata } from "next";
import {
  JetBrains_Mono,
  Shippori_Mincho_B1,
  Zen_Kaku_Gothic_New,
} from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

// Fonts from DESIGN.md > Typography. Only Latin is preloaded; Japanese
// glyphs load on demand through the unicode-range subsets Google serves.
const shippori = Shippori_Mincho_B1({
  variable: "--font-shippori",
  weight: ["500", "700", "800"],
  subsets: ["latin"],
});

const zenKaku = Zen_Kaku_Gothic_New({
  variable: "--font-zen-kaku",
  weight: ["400", "500", "700"],
  subsets: ["latin"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  weight: ["400", "500"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Major Arcana Games",
    template: "%s | Major Arcana Games",
  },
  description:
    "Japanese Pokémon and One Piece booster boxes, shipped from Australia.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${shippori.variable} ${zenKaku.variable} ${jetbrains.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <SiteHeader />
        <div className="flex flex-1 flex-col">{children}</div>
        <SiteFooter />
      </body>
    </html>
  );
}
