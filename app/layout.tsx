import type { Metadata } from "next";
import {
  JetBrains_Mono,
  Young_Serif,
  Zen_Kaku_Gothic_New,
} from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

// Fonts from DESIGN.md > Typography. Only Latin is preloaded; Japanese
// glyphs in Zen Kaku Gothic New load on demand through Google's
// unicode-range subsets.
const youngSerif = Young_Serif({
  variable: "--font-young-serif",
  weight: "400",
  subsets: ["latin"],
});

const zenKaku = Zen_Kaku_Gothic_New({
  variable: "--font-zen-kaku",
  weight: ["400", "500", "700"],
  subsets: ["latin"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  weight: "500",
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
      className={`${youngSerif.variable} ${zenKaku.variable} ${jetbrains.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <SiteHeader />
        <div className="flex flex-1 flex-col">{children}</div>
        <SiteFooter />
      </body>
    </html>
  );
}
