import { and, asc, eq } from "drizzle-orm";
import { cacheLife, cacheTag } from "next/cache";
import { db } from "@/lib/db";
import { products, variants } from "@/lib/db/schema";

// Catalog reads are cached: names, descriptions, and prices rarely change.
// After editing a product, call updateTag("products") to refresh them.
// Stock is deliberately NOT read here. It must be fresh, so it comes from
// lib/inventory.ts instead.

const variantColumns = {
  id: true,
  name: true,
  priceCents: true,
} as const;

export async function getActiveProducts() {
  "use cache";
  cacheLife("hours");
  cacheTag("products");

  return db.query.products.findMany({
    columns: {
      id: true,
      slug: true,
      name: true,
      nameJa: true,
      setCode: true,
      releasesOn: true,
      imageUrl: true,
    },
    where: eq(products.status, "active"),
    orderBy: asc(products.name),
    with: {
      variants: { columns: variantColumns, orderBy: asc(variants.position) },
    },
  });
}

export async function getProductBySlug(slug: string) {
  "use cache";
  cacheLife("hours");
  cacheTag("products", `product:${slug}`);

  const product = await db.query.products.findFirst({
    columns: {
      id: true,
      slug: true,
      name: true,
      nameJa: true,
      setCode: true,
      releasesOn: true,
      imageUrl: true,
      description: true,
    },
    where: and(eq(products.slug, slug), eq(products.status, "active")),
    with: {
      variants: { columns: variantColumns, orderBy: asc(variants.position) },
    },
  });
  return product ?? null;
}

export type CatalogProduct = Awaited<
  ReturnType<typeof getActiveProducts>
>[number];
