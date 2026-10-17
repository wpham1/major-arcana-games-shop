import { connection } from "next/server";
import { ProductCard } from "@/components/product-card";
import { getProductAvailability, todayInJapan } from "@/lib/availability";
import { getStock } from "@/lib/inventory";
import type { CatalogProduct } from "@/lib/products";

export function ProductGrid({
  products,
  stock,
  today,
}: {
  products: CatalogProduct[];
  /** null while live stock is still loading. */
  stock: Map<number, number> | null;
  today: string | null;
}) {
  return (
    <ul className="grid grid-cols-2 gap-x-3 gap-y-4 sm:grid-cols-[repeat(auto-fill,minmax(220px,1fr))] sm:gap-x-6 sm:gap-y-8">
      {products.map((product) => (
        <li key={product.id}>
          <ProductCard
            product={product}
            availability={
              stock && today
                ? getProductAvailability(product, stock, today)
                : null
            }
          />
        </li>
      ))}
    </ul>
  );
}

/**
 * The same grid with live stock. Render it inside <Suspense> with a stockless
 * <ProductGrid> as the fallback: the cached catalog shows instantly and the
 * stock badges fill in when this resolves.
 */
export async function ProductGridWithStock({
  products,
}: {
  products: CatalogProduct[];
}) {
  await connection();
  const stock = await getStock(
    products.flatMap((p) => p.variants.map((v) => v.id)),
  );
  return (
    <ProductGrid
      products={products}
      stock={stock}
      today={todayInJapan(new Date())}
    />
  );
}
