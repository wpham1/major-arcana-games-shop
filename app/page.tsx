import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { ArtCard } from "@/components/art-card";
import { ArtistCall } from "@/components/artist-call";
import { NearMintPromise } from "@/components/near-mint-promise";
import {
  ProductGrid,
  ProductGridWithStock,
} from "@/components/product-grid";
import { getFeaturedArtist } from "@/lib/artists";
import { getActiveProducts, type CatalogProduct } from "@/lib/products";
import { site } from "@/lib/site";

const NEW_ARRIVALS = 4;

/** Newest release first; products without a date go last. */
function byReleaseDesc(a: CatalogProduct, b: CatalogProduct) {
  return (b.releasesOn ?? "").localeCompare(a.releasesOn ?? "");
}

export default async function Home() {
  const [artist, products] = await Promise.all([
    getFeaturedArtist(),
    getActiveProducts(),
  ]);
  const newArrivals = [...products].sort(byReleaseDesc).slice(0, NEW_ARRIVALS);

  return (
    <main>
      {/* Hero: the featured artist's art card, or the brand card until there is one. */}
      <section aria-labelledby="hero-title" className="py-8 sm:py-14">
        <div className="mx-auto grid w-full max-w-[1160px] items-center gap-8 px-4 md:grid-cols-[0.85fr_1fr] md:gap-14">
          <figure className="order-2 mx-auto w-full max-w-[300px] md:order-none md:max-w-[420px]">
            <ArtCard artist={artist} priority />
            {artist && (
              <figcaption className="mt-5 flex flex-wrap justify-between gap-3 text-[0.9375rem]">
                <span>
                  Art card by <b>{artist.name}</b>
                  {artist.city && `, ${artist.city}`}
                </span>
                <Link
                  href={`/artists/${artist.slug}`}
                  className="font-bold text-blue hover:underline"
                >
                  Meet the artist →
                </Link>
              </figcaption>
            )}
          </figure>
          <div>
            <h1
              id="hero-title"
              className="font-display text-[clamp(2.25rem,5vw,3.5rem)] leading-[1.12]"
            >
              Every order comes with a little art.
            </h1>
            <p className="mt-5 max-w-[44ch] text-lg text-ink-muted">
              Japanese Pokémon and One Piece cards and booster boxes, Near Mint
              or better. Each parcel comes with a sticker and a hand-drawn art
              card
              {artist ? `. This month's is by ${artist.name}.` : "."}
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-6">
              <Link
                href="/products"
                className="rounded-sm bg-blue px-5 py-3 font-bold text-white transition-colors hover:bg-blue-deep"
              >
                Shop new arrivals
              </Link>
              <Link href="#parcel" className="font-bold text-blue hover:underline">
                What&apos;s in the parcel →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {newArrivals.length > 0 && (
        <section
          aria-labelledby="new-title"
          className="border-t border-line py-[72px]"
        >
          <div className="mx-auto w-full max-w-[1160px] px-4">
            <div className="mb-7 flex flex-wrap items-baseline justify-between gap-4">
              <h2 id="new-title" className="font-display text-[clamp(1.5rem,3vw,2rem)]">
                New arrivals
              </h2>
              <Link href="/products" className="font-bold text-blue hover:underline">
                See everything →
              </Link>
            </div>
            <Suspense
              fallback={
                <ProductGrid products={newArrivals} stock={null} today={null} />
              }
            >
              <ProductGridWithStock products={newArrivals} />
            </Suspense>
          </div>
        </section>
      )}

      <section
        id="parcel"
        aria-labelledby="parcel-title"
        className="scroll-mt-20 border-t border-line py-[72px]"
      >
        <div
          className={`mx-auto grid w-full max-w-[1160px] items-center gap-8 px-4 ${site.packingPhoto ? "md:grid-cols-2 md:gap-12" : ""}`}
        >
          {site.packingPhoto && (
            <div className="relative aspect-[4/3] overflow-hidden rounded-md">
              <Image
                src={site.packingPhoto}
                alt="A packed Major Arcana Games order with a sticker and art card"
                fill
                sizes="(max-width: 768px) 100vw, 560px"
                className="object-cover"
              />
            </div>
          )}
          <div className="max-w-[60ch]">
            <h2 id="parcel-title" className="font-display text-[clamp(1.5rem,3vw,2rem)]">
              What arrives in your letterbox
            </h2>
            <ul className="sparkle-list mt-5 grid gap-3.5">
              <li>
                <span>
                  <b>Your cards, packed properly.</b> Secure, neat packaging.
                  No crumpled envelopes.
                </span>
              </li>
              <li>
                <span>
                  <b>A free sticker,</b> because mail day should feel like mail
                  day.
                </span>
              </li>
              <li>
                <span>
                  <b>A hand-drawn art card</b>
                  {artist ? ` by ${artist.name}` : ""}. Which one you get is a
                  surprise, like a pull.
                </span>
              </li>
              {site.dispatchTime && (
                <li>
                  <span>
                    <b>Dispatched within {site.dispatchTime}</b>, with reliable
                    postage.
                  </span>
                </li>
              )}
            </ul>
          </div>
        </div>
      </section>

      <NearMintPromise />

      <section aria-labelledby="people-title" className="py-[72px]">
        <div className="mx-auto grid w-full max-w-[1160px] items-start gap-8 px-4 md:grid-cols-[1.1fr_1fr] md:gap-12">
          <div className="grid max-w-[56ch] gap-4">
            <h2 id="people-title" className="font-display text-[clamp(1.5rem,3vw,2rem)]">
              A small shop run by people who love the hobby
            </h2>
            <p>
              We started Major Arcana Games to help people find the card that
              finishes their deck or collection, quickly and without the risk
              of a stranger on Marketplace.
            </p>
            <p>
              Fair prices, accurate listings, no scalping. Everyone&apos;s
              welcome here: we&apos;re LGBTQIA+ friendly, judgment-free, and
              just as excited about your pulls as you are.
            </p>
            <Link href="/about" className="font-bold text-blue hover:underline">
              More about us →
            </Link>
          </div>
          <ArtistCall />
        </div>
      </section>
    </main>
  );
}
