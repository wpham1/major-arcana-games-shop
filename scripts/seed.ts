// Adds placeholder products for local development. Safe to run more than
// once: rows that already exist (same slug or SKU) are skipped.
// Replace these with the real catalog when importing from Shopify.
import { config } from "dotenv";

config({ path: [".env.local", ".env"], quiet: true });

// Covers every storefront state: in stock, low stock, sold out, pre-order,
// and a missing Japanese title. Names are real sets; prices, stock and dates
// are made up.
const examples = [
  {
    slug: "mega-symphonia-booster-box",
    name: "Mega Symphonia",
    nameJa: "メガシンフォニア",
    setCode: "M1S",
    releasesOn: "2026-10-03",
    description: "Japanese booster box: 30 packs, 5 cards per pack.",
    variants: [
      { sku: "M1S-BOX", name: "Booster box", priceCents: 11995, stock: 14 },
      { sku: "M1S-CASE", name: "Case of 12 boxes", priceCents: 139900, stock: 1 },
    ],
  },
  {
    slug: "mega-brave-booster-box",
    name: "Mega Brave",
    nameJa: "メガブレイブ",
    setCode: "M1L",
    releasesOn: "2026-10-24",
    description: "Japanese booster box: 30 packs, 5 cards per pack.",
    variants: [
      { sku: "M1L-BOX", name: "Booster box", priceCents: 12495, stock: 40 },
    ],
  },
  {
    slug: "mega-30th-celebration-booster-box",
    name: "MEGA 30th Celebration",
    nameJa: null,
    setCode: "M6a",
    releasesOn: "2026-12-12",
    description: "Japanese booster box. Limit one per order.",
    variants: [
      { sku: "M6A-BOX", name: "Booster box", priceCents: 33999, stock: 20 },
    ],
  },
  {
    slug: "heat-wave-arena-booster-box",
    name: "Heat Wave Arena",
    nameJa: "熱風のアリーナ",
    setCode: "SV9a",
    releasesOn: "2025-03-14",
    description: "Japanese booster box: 30 packs, 5 cards per pack.",
    variants: [
      { sku: "SV9A-BOX", name: "Booster box", priceCents: 9995, stock: 2 },
    ],
  },
  {
    slug: "terastal-festival-ex-booster-box",
    name: "Terastal Festival ex",
    nameJa: "テラスタルフェスex",
    setCode: "SV8a",
    releasesOn: "2024-12-06",
    description: "Japanese high-class pack box: 10 packs, 10 cards per pack.",
    variants: [
      { sku: "SV8A-BOX", name: "Booster box", priceCents: 28995, stock: 0 },
    ],
  },
  {
    slug: "emperors-in-the-new-world-booster-box",
    name: "Emperors in the New World",
    nameJa: "新たなる皇帝",
    setCode: "OP-09",
    releasesOn: "2024-11-30",
    description: "One Piece Card Game Japanese booster box: 24 packs, 6 cards per pack.",
    variants: [
      { sku: "OP09-BOX", name: "Booster box", priceCents: 18995, stock: 6 },
    ],
  },
];

async function main() {
  // Imported after dotenv runs, because lib/db reads DATABASE_URL on load.
  const { db } = await import("@/lib/db");
  const { products, variants } = await import("@/lib/db/schema");

  for (const { variants: productVariants, ...product } of examples) {
    const [inserted] = await db
      .insert(products)
      .values({ ...product, status: "active" })
      .onConflictDoNothing({ target: products.slug })
      .returning({ id: products.id });

    if (!inserted) {
      console.log(`Skipped ${product.slug} (already exists)`);
      continue;
    }

    await db
      .insert(variants)
      .values(
        productVariants.map((v, position) => ({
          ...v,
          position,
          productId: inserted.id,
        })),
      )
      .onConflictDoNothing({ target: variants.sku });
    console.log(`Added ${product.slug}`);
  }

  await db.$client.end();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
