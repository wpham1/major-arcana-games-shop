import { and, eq, gte, inArray, sql } from "drizzle-orm";
import { db, type Db, type Tx } from "@/lib/db";
import { variants } from "@/lib/db/schema";

// Never read stock, check it in JS, then write it back: two shoppers can
// both read "1 left" and both buy it. Each function below does the check and
// the change in a single SQL statement, so Postgres handles the race.

export async function getStock(variantIds: number[]) {
  if (variantIds.length === 0) return new Map<number, number>();

  const rows = await db
    .select({ id: variants.id, stock: variants.stock })
    .from(variants)
    .where(inArray(variants.id, variantIds));
  return new Map(rows.map((row) => [row.id, row.stock]));
}

/**
 * Takes `quantity` units out of stock. Returns false, changing nothing, if
 * there aren't enough. Pass a transaction to reserve several variants at once
 * and roll back if any of them fails.
 */
export async function reserveStock(
  variantId: number,
  quantity: number,
  executor: Db | Tx = db,
) {
  const updated = await executor
    .update(variants)
    .set({ stock: sql`${variants.stock} - ${quantity}` })
    .where(and(eq(variants.id, variantId), gte(variants.stock, quantity)))
    .returning({ stock: variants.stock });
  return updated.length > 0;
}

/** Puts units back, e.g. when a checkout expires or an order is cancelled. */
export async function releaseStock(
  variantId: number,
  quantity: number,
  executor: Db | Tx = db,
) {
  await executor
    .update(variants)
    .set({ stock: sql`${variants.stock} + ${quantity}` })
    .where(eq(variants.id, variantId));
}
