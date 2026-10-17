import type { Metadata } from "next";
import Link from "next/link";
import { ArtCard } from "@/components/art-card";
import { ArtistCall } from "@/components/artist-call";
import { getArtists } from "@/lib/artists";

export const metadata: Metadata = {
  title: "Artists",
};

export default async function ArtistsPage() {
  const artists = await getArtists();

  return (
    <main className="mx-auto w-full max-w-[1160px] px-4 py-12 sm:py-16">
      <div className="grid max-w-[60ch] gap-3">
        <h1 className="font-display text-[clamp(1.75rem,4vw,2.5rem)]">
          Our artists
        </h1>
        <p className="text-ink-muted">
          Every parcel carries a hand-drawn art card. These are the local
          artists behind them. When you shop with us, you&apos;re supporting
          them too.
        </p>
      </div>

      {artists.length > 0 ? (
        <ul className="mt-10 grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-[repeat(auto-fill,minmax(220px,1fr))]">
          {artists.map((artist) => (
            <li key={artist.id}>
              <Link href={`/artists/${artist.slug}`} className="group grid gap-4">
                <ArtCard artist={artist} />
                <span>
                  <span className="block font-bold group-hover:text-blue">
                    {artist.name}
                  </span>
                  {artist.city && (
                    <span className="text-sm text-ink-muted">{artist.city}</span>
                  )}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-8 text-ink-muted">
          Our first featured artist is on the way.
        </p>
      )}

      <div className="mt-14 max-w-[640px]">
        <ArtistCall />
      </div>
    </main>
  );
}
