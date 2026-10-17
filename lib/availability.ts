// How a product is offered right now, from its release date and live stock.
// Pure functions: callers pass in "today" so cached code never reads the clock.

export type Availability =
  | { kind: "pre-order"; releasesOn: string }
  | { kind: "in-stock"; stock: number }
  | { kind: "low-stock"; stock: number }
  | { kind: "sold-out" };

export const LOW_STOCK_THRESHOLD = 5;

/** Today's date in Japan, as "YYYY-MM-DD". Release days are set in Japan time. */
export function todayInJapan(now: Date) {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Tokyo" }).format(
    now,
  );
}

export function getAvailability(
  releasesOn: string | null,
  stock: number,
  today: string,
): Availability {
  // Pre-order stock is our allocation, so it can sell out before release.
  if (stock <= 0) return { kind: "sold-out" };
  // ISO dates compare correctly as strings.
  if (releasesOn && releasesOn > today) return { kind: "pre-order", releasesOn };
  if (stock <= LOW_STOCK_THRESHOLD) return { kind: "low-stock", stock };
  return { kind: "in-stock", stock };
}

/** A product's availability across all its editions. */
export function getProductAvailability(
  product: { releasesOn: string | null; variants: { id: number }[] },
  stock: Map<number, number>,
  today: string,
) {
  const total = product.variants.reduce(
    (sum, v) => sum + (stock.get(v.id) ?? 0),
    0,
  );
  return getAvailability(product.releasesOn, total, today);
}
