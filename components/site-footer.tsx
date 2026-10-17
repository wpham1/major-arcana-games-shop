import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="bg-ink text-[#E7EAF3]">
      <div className="mx-auto grid w-full max-w-[1160px] gap-8 px-4 py-12 md:grid-cols-[1.4fr_1fr]">
        <div className="grid gap-2.5">
          <p className="font-display text-xl text-white">Major Arcana Games</p>
          <p className="max-w-[50ch] text-[#BFC6D8]">
            Japanese Pokémon and One Piece, Near Mint or better, with a little
            art in every parcel. Everyone&apos;s welcome here.
          </p>
        </div>
        <div className="grid content-start gap-1.5 text-[0.8125rem] text-[#BFC6D8]">
          <span className="select-all">{site.email}</span>
          <span>Prices in AUD, GST included</span>
          {site.abn && <span>ABN {site.abn}</span>}
          {site.reviewsUrl && (
            <a href={site.reviewsUrl} className="text-gold hover:underline">
              Read our reviews
            </a>
          )}
        </div>
      </div>
    </footer>
  );
}
