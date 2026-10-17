import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ArtCard } from "@/components/art-card";
import { getArtistBySlug } from "@/lib/artists";

export default function ArtistPage({ params }: PageProps<"/artists/[slug]">) {
  return (
    <main className="mx-auto w-full max-w-[1160px] px-4 py-10 sm:py-14">
      <Link href="/artists" className="text-sm font-bold text-blue hover:underline">
        &larr; All artists
      </Link>
      <Suspense fallback={<p className="mt-6 text-ink-muted">Loading…</p>}>
        <ArtistDetails params={params} />
      </Suspense>
    </main>
  );
}

async function ArtistDetails({
  params,
}: Pick<PageProps<"/artists/[slug]">, "params">) {
  const { slug } = await params;
  const artist = await getArtistBySlug(slug);
  if (!artist) notFound();

  return (
    <article className="mt-8 grid items-start gap-10 md:grid-cols-[0.8fr_1fr] md:gap-14">
      <div className="mx-auto w-full max-w-[380px]">
        <ArtCard artist={artist} priority />
      </div>
      <div className="grid max-w-[60ch] gap-4">
        <div>
          <h1 className="font-display text-[clamp(2rem,4.5vw,3rem)] leading-[1.12]">
            {artist.name}
          </h1>
          {artist.city && <p className="mt-1 text-ink-muted">{artist.city}</p>}
        </div>
        {artist.bio && <p className="whitespace-pre-line">{artist.bio}</p>}
        {artist.linkUrl && (
          <a
            href={artist.linkUrl}
            className="w-fit rounded-sm bg-gold px-5 py-3 font-bold text-brand-ink"
          >
            See more of {artist.name}&apos;s work
          </a>
        )}
      </div>
    </article>
  );
}
