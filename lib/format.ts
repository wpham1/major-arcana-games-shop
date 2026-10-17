// Prices are stored in cents, AUD, GST included.
const aud = new Intl.NumberFormat("en-AU", {
  style: "currency",
  currency: "AUD",
  currencyDisplay: "narrowSymbol",
});

export function formatPrice(cents: number) {
  return `A${aud.format(cents / 100)}`;
}

const day = new Intl.DateTimeFormat("en-AU", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

/** Formats a Postgres `date` string ("2026-11-14") as "14 Nov 2026". */
export function formatDate(isoDate: string) {
  return day.format(new Date(`${isoDate}T00:00:00Z`));
}
