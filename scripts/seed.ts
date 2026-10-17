// Adds placeholder products for local development. Safe to run more than
// once: rows that already exist (same slug or SKU) are skipped.
// Replace these with the real catalog when importing from Shopify.
import { config } from "dotenv";

config({ path: [".env.local", ".env"], quiet: true });

const examples = [
  {
    slug: "example-card-game",
    name: "Example Card Game",
    description: "A placeholder product with two editions.",
    variants: [
      { sku: "ECG-STD", name: "Standard edition", priceCents: 2999, stock: 12 },
      { sku: "ECG-DLX", name: "Deluxe edition", priceCents: 5499, stock: 3 },
    ],
  },
  {
    slug: "example-tarot-deck",
    name: "Example Tarot Deck",
    description: "A placeholder product with a single variant.",
    variants: [
      { sku: "ETD-STD", name: "Standard", priceCents: 3500, stock: 0 },
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
