import Image from "next/image";
import icon from "@/public/brand/icon-circle.svg";
import type { Artist } from "@/lib/artists";

/**
 * An artist's art card at 4:5, set down slightly tilted like a card on a
 * table. Without artwork, the brand card (blue, logo icon) stands in.
 */
export function ArtCard({
  artist,
  priority = false,
}: {
  artist: Pick<Artist, "name" | "artworkUrl"> | null;
  priority?: boolean;
}) {
  return (
    <div className="relative aspect-[4/5] w-full -rotate-[2.5deg] overflow-hidden rounded-lg border-[6px] border-card bg-card shadow-[0_18px_40px_-24px_rgb(27_36_64/0.45)]">
      {artist?.artworkUrl ? (
        <Image
          src={artist.artworkUrl}
          alt={`Art card by ${artist.name}`}
          fill
          priority={priority}
          sizes="(max-width: 820px) 300px, 420px"
          className="object-cover"
        />
      ) : (
        <div className="grid h-full place-items-center rounded-[8px] bg-blue">
          <Image src={icon} alt="" className="size-24" />
        </div>
      )}
    </div>
  );
}
