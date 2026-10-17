// Prices are stored in cents, AUD, GST included.
const aud = new Intl.NumberFormat("en-AU", {
  style: "currency",
  currency: "AUD",
  currencyDisplay: "narrowSymbol",
});

export function formatPrice(cents: number) {
  return `A${aud.format(cents / 100)}`;
}

const shortDate = new Intl.DateTimeFormat("en-AU", {
  day: "2-digit",
  month: "short",
  timeZone: "UTC",
});

/** "2026-10-24" -> "24 Oct". Takes the plain date string Postgres returns. */
export function formatReleaseDate(isoDate: string) {
  return shortDate.format(new Date(`${isoDate}T00:00:00Z`));
}
