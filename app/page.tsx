import Link from "next/link";
import { connection } from "next/server";
import { Suspense } from "react";
import { ProductCard } from "@/components/product-card";
import { getProductAvailability, todayInJapan } from "@/lib/availability";
import { formatReleaseDate } from "@/lib/format";
import { getStock } from "@/lib/inventory";
import { getActiveProducts, type CatalogProduct } from "@/lib/products";

export default function Home() {
  return (
    <main>
      <section className="bg-brand-blue">
        <div className="mx-auto w-full max-w-6xl px-4 pt-12 pb-16 sm:pb-20">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-x-12 gap-y-6">
            <h1 className="max-w-[18ch] font-display text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.15] font-extrabold">
              Japanese Pokémon and One Piece booster boxes, shipped from
              Australia.
            </h1>
            <Link
              href="/products"
              className="rounded-md bg-gold px-[18px] py-[11px] font-bold text-on-gold transition-colors hover:bg-gold-hover"
            >
              Browse booster boxes
            </Link>
          </div>

          <Suspense fallback={<SpreadPlaceholder />}>
            <ReleaseSpread />
          </Suspense>
        </div>
      </section>
    </main>
  );
}

type Slot = { title: string; product: CatalogProduct };

/**
 * Picks up to three products in date order: the latest release that's out,
 * the next one coming, and the furthest-out pre-order.
 */
function pickSpread(products: CatalogProduct[], today: string): Slot[] {
  const dated = products
    .filter((p): p is CatalogProduct & { releasesOn: string } => !!p.releasesOn)
    .sort((a, b) => a.releasesOn.localeCompare(b.releasesOn));
  const released = dated.filter((p) => p.releasesOn <= today);
  const upcoming = dated.filter((p) => p.releasesOn > today);

  const slots: Slot[] = [];
  const landed = released.at(-1);
  if (landed) slots.push({ title: "Just landed", product: landed });
  if (upcoming[0]) slots.push({ title: "Releasing next", product: upcoming[0] });
  if (upcoming.length > 1)
    slots.push({ title: "Pre-orders open", product: upcoming.at(-1)! });
  return slots;
}

async function ReleaseSpread() {
  await connection();
  const today = todayInJapan(new Date());
  const slots = pickSpread(await getActiveProducts(), today);
  if (slots.length === 0) return null;

  const stock = await getStock(
    slots.flatMap(({ product }) => product.variants.map((v) => v.id)),
  );

  return (
    <SpreadRow>
      {slots.map(({ title, product }) => (
        <li key={product.id} className="grid snap-start gap-4">
          <div className="flex items-baseline justify-between gap-2 border-b border-gold-faint pb-2">
            <h2 className="font-display text-xl font-bold">{title}</h2>
            <span className="font-mono text-sm opacity-85">
              {formatReleaseDate(product.releasesOn!)}
            </span>
          </div>
          <ProductCard
            product={product}
            availability={getProductAvailability(product, stock, today)}
          />
        </li>
      ))}
    </SpreadRow>
  );
}

/** Three cards across; on phones a swipeable row, like a hand of cards. */
function SpreadRow({ children }: { children: React.ReactNode }) {
  return (
    <ul className="grid snap-x snap-mandatory auto-cols-[72%] grid-flow-col gap-6 overflow-x-auto pb-2 md:auto-cols-auto md:grid-flow-row md:grid-cols-3 md:overflow-visible">
      {children}
    </ul>
  );
}

function SpreadPlaceholder() {
  return (
    <SpreadRow>
      {[0, 1, 2].map((i) => (
        <li key={i} className="grid gap-4" aria-hidden="true">
          <div className="h-[2.35rem] border-b border-gold-faint" />
          <div className="aspect-[63/88] rounded-md border border-gold-faint bg-night-raised/50" />
        </li>
      ))}
    </SpreadRow>
  );
}
