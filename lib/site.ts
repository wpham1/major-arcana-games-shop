// Facts about the shop that only the owner can confirm. Each one shows on the
// site only once it has a real value, so nothing unconfirmed goes live.
// See DESIGN.md > Do's and Don'ts.

export const site = {
  email: "info@majorarcanagames.com.au",
  // e.g. "1 business day". Shown in "What arrives in your letterbox".
  dispatchTime: null as string | null,
  // e.g. "12 345 678 901". Shown in the footer.
  abn: null as string | null,
  // A link to real reviews (Google Business, eBay feedback).
  reviewsUrl: null as string | null,
  // A real photo of a packed order, under /public. Shown beside the parcel list.
  packingPhoto: null as string | null,
  // A real photo of the people who pack orders, under /public. Shown on About.
  teamPhoto: null as string | null,
};
