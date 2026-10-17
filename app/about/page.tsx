import type { Metadata } from "next";
import Image from "next/image";
import { ArtistCall } from "@/components/artist-call";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About us",
};

// Copy adapted from the Brand Identity page in Notion.
export default function AboutPage() {
  return (
    <main className="mx-auto grid w-full max-w-[760px] gap-6 px-4 py-12 sm:py-16">
      <h1 className="font-display text-[clamp(2rem,4.5vw,3rem)] leading-[1.12]">
        A small shop run by people who love the hobby
      </h1>
      {site.teamPhoto && (
        <div className="relative aspect-[3/2] overflow-hidden rounded-md">
          <Image
            src={site.teamPhoto}
            alt="The people who pack Major Arcana Games orders"
            fill
            priority
            sizes="(max-width: 760px) 100vw, 760px"
            className="object-cover"
          />
        </div>
      )}
      <p className="text-lg">
        Major Arcana Games exists to make collecting feel special: helping you
        complete your deck or collection, supporting local artists, and making
        every order feel like a small gift.
      </p>

      <h2 className="mt-4 font-display text-2xl">What we care about</h2>
      <ul className="sparkle-list grid gap-3.5">
        <li>
          <span>
            <b>Doing things properly.</b> Fair pricing, accurate listings, no
            scalping, and no lazy packaging.
          </span>
        </li>
        <li>
          <span>
            <b>Thoughtful touches.</b> Stickers and hand-drawn art in every
            parcel, so a purchase turns into a moment.
          </span>
        </li>
        <li>
          <span>
            <b>Everyone&apos;s welcome.</b> We&apos;re LGBTQIA+ friendly and
            judgment-free, whether you&apos;re a competitive player, a
            collector or buying your first pack.
          </span>
        </li>
        <li>
          <span>
            <b>Supporting local creatives.</b> When you buy from us, you&apos;re
            also helping the artists whose work goes into your parcel.
          </span>
        </li>
      </ul>

      <div className="mt-6">
        <ArtistCall />
      </div>
    </main>
  );
}
