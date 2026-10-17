import Image from "next/image";
import Link from "next/link";
import { AvailabilityBadge } from "@/components/availability-badge";
import type { Availability } from "@/lib/availability";
import { formatPrice, formatReleaseDate } from "@/lib/format";
import type { CatalogProduct } from "@/lib/products";

function priceLabel(product: CatalogProduct) {
  const prices = product.variants.map((v) => v.priceCents);
  if (prices.length === 0) return null;
  const lowest = formatPrice(Math.min(...prices));
  return new Set(prices).size > 1 ? `From ${lowest}` : lowest;
}

/**
 * A product drawn as a trading card. The front shows what a collector scans
 * for (Japanese title, English title, price, stock); the back, revealed on
 * hover or focus, shows the editions on offer. See DESIGN.md.
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

  return (
    <Link
      href={`/products/${product.slug}`}
      className="card rounded-md"
      data-availability={availability?.kind}
    >
      <div className="card-inner">
        <div className="card-face">
          <div className="card-photo relative grid min-h-0 flex-1 place-items-center overflow-hidden rounded-sm bg-night-sunk">
            {product.imageUrl ? (
              <Image
                src={product.imageUrl}
                alt=""
                fill
                sizes="(max-width: 640px) 50vw, 280px"
                className="object-contain p-2"
              />
            ) : (
              // No photo yet: the set code stands in, in display type.
              product.setCode && (
                <span className="font-display text-[clamp(1.5rem,4vw,2.25rem)] font-extrabold text-gold/60">
                  {product.setCode}
                </span>
              )
            )}
          </div>
          <div className="grid gap-0.5 px-2 pt-4 pb-2">
            {product.nameJa && (
              <p className="font-display text-[0.8125rem] leading-snug text-star-muted">
                {product.nameJa}
              </p>
            )}
            <h3 className="card-title font-display text-[1.0625rem] leading-tight font-bold">
              {product.name}
            </h3>
            <div className="mt-2 flex flex-wrap items-baseline justify-between gap-2">
              {price && (
                <span className="font-mono text-[1.0625rem] font-medium tabular-nums">
                  {price}
                </span>
              )}
              <AvailabilityBadge availability={availability} />
            </div>
            <p className="card-touch-details mt-1 font-mono text-xs text-star-muted">
              {[product.setCode, product.variants.length > 1 && `${product.variants.length} editions`]
                .filter(Boolean)
                .join(" · ")}
            </p>
          </div>
        </div>

        <div className="card-face card-back gap-4 px-4 py-6" aria-hidden="true">
          <p className="font-display text-xl leading-tight font-bold">
            {product.name}
          </p>
          <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 text-[0.8125rem]">
            {product.setCode && (
              <>
                <dt className="text-star-muted">Set code</dt>
                <dd className="text-right font-mono">{product.setCode}</dd>
              </>
            )}
            {product.releasesOn && (
              <>
                <dt className="text-star-muted">Release</dt>
                <dd className="text-right font-mono">
                  {formatReleaseDate(product.releasesOn)}
                </dd>
              </>
            )}
            <dt className="text-star-muted">Language</dt>
            <dd className="text-right font-mono">Japanese</dd>
          </dl>
          <ul className="grid gap-1.5 border-t border-rule pt-3 text-[0.8125rem]">
            {product.variants.map((variant) => (
              <li key={variant.id} className="flex justify-between gap-3">
                <span>{variant.name}</span>
                <span className="font-mono tabular-nums">
                  {formatPrice(variant.priceCents)}
                </span>
              </li>
            ))}
          </ul>
          <span className="mt-auto rounded-md bg-gold px-3 py-2 text-center text-sm font-bold text-on-gold">
            View box
          </span>
        </div>
      </div>
    </Link>
  );
}
