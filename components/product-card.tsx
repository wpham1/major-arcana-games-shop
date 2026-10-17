import Image from "next/image";
import Link from "next/link";
import { AvailabilityBadge } from "@/components/availability-badge";
import type { Availability } from "@/lib/availability";
import { formatPrice } from "@/lib/format";
import type { CatalogProduct } from "@/lib/products";

function priceLabel(product: CatalogProduct) {
  const prices = product.variants.map((v) => v.priceCents);
  if (prices.length === 0) return null;
  const lowest = formatPrice(Math.min(...prices));
  return new Set(prices).size > 1 ? `From ${lowest}` : lowest;
}

/**
 * Everything a shopper scans for is visible at rest: photo, Japanese and
 * English names, set code, price, stock. See DESIGN.md > Components.
 */
export function ProductCard({
  product,
  availability,
}: {
  product: CatalogProduct;
  /** null while live stock is still streaming in. */
  availability: Availability | null;
}) {
  const price = priceLabel(product);
  const soldOut = availability?.kind === "sold-out";

  return (
    <Link
      href={`/products/${product.slug}`}
      className="flex h-full flex-col overflow-hidden rounded-md border border-line bg-card transition-[border-color,box-shadow] duration-150 hover:border-blue/40 hover:shadow-[0_8px_22px_-16px_rgb(27_36_64/0.5)]"
    >
      <div
        className={`relative grid aspect-[5/4] place-items-center bg-image-well ${soldOut ? "opacity-55" : ""}`}
      >
        {product.imageUrl ? (
          <Image
            src={product.imageUrl}
            alt=""
            fill
            sizes="(max-width: 540px) 50vw, 280px"
            className="object-contain p-2"
          />
        ) : (
          // No photo yet: the set code stands in.
          product.setCode && (
            <span className="font-mono text-2xl text-ink-muted">
              {product.setCode}
            </span>
          )
        )}
      </div>
      <div className="grid flex-1 content-start gap-0.5 px-3.5 pt-3 pb-3.5">
        {product.nameJa && (
          <p className="text-[0.8125rem] text-ink-muted">{product.nameJa}</p>
        )}
        <h3 className="leading-snug font-bold">{product.name}</h3>
        {product.setCode && (
          <p className="font-mono text-xs text-ink-muted">
            {product.setCode} · Japanese
          </p>
        )}
        <div className="mt-auto flex flex-wrap items-baseline justify-between gap-x-2 gap-y-1 pt-2">
          {price && (
            <span className="text-[1.0625rem] font-bold tabular-nums">
              {price}
            </span>
          )}
          <AvailabilityBadge availability={availability} />
        </div>
      </div>
    </Link>
  );
}
