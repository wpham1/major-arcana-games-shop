// Prices are stored in cents, AUD, GST included.
const aud = new Intl.NumberFormat("en-AU", {
  style: "currency",
  currency: "AUD",
  currencyDisplay: "narrowSymbol",
});

export function formatPrice(cents: number) {
  return `A${aud.format(cents / 100)}`;
}
