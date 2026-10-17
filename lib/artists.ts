import { asc, desc, eq, isNotNull } from "drizzle-orm";
import { cacheLife, cacheTag } from "next/cache";
import { db } from "@/lib/db";
import { artists } from "@/lib/db/schema";

// Artist pages change rarely. After editing an artist, call
// updateTag("artists") to refresh them.

const artistColumns = {
  id: true,
  slug: true,
  name: true,
  city: true,
  bio: true,
  artworkUrl: true,
  linkUrl: true,
  featuredFrom: true,
} as const;

export async function getArtists() {
  "use cache";
  cacheLife("hours");
  cacheTag("artists");

  return db.query.artists.findMany({
    columns: artistColumns,
    orderBy: [desc(artists.featuredFrom), asc(artists.name)],
  });
}

/** The artist whose art card is going out now: the latest one featured. */
export async function getFeaturedArtist() {
  "use cache";
  cacheLife("hours");
  cacheTag("artists");

  const artist = await db.query.artists.findFirst({
    columns: artistColumns,
    where: isNotNull(artists.featuredFrom),
    orderBy: desc(artists.featuredFrom),
  });
  return artist ?? null;
}

export async function getArtistBySlug(slug: string) {
  "use cache";
  cacheLife("hours");
  cacheTag("artists", `artist:${slug}`);

  const artist = await db.query.artists.findFirst({
    columns: artistColumns,
    where: eq(artists.slug, slug),
  });
  return artist ?? null;
}

export type Artist = NonNullable<Awaited<ReturnType<typeof getArtistBySlug>>>;
