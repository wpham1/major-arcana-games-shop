import type { Metadata } from "next";
import { Suspense } from "react";
import {
  ProductGrid,
  ProductGridWithStock,
} from "@/components/product-grid";
import { getActiveProducts } from "@/lib/products";

export const metadata: Metadata = {
  title: "Booster boxes",
};

export default async function ProductsPage() {
  const products = await getActiveProducts();

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-12 sm:py-20">
      <div className="mb-8 flex flex-wrap items-baseline justify-between gap-4">
        <h1 className="font-display text-3xl font-bold">Booster boxes</h1>
        <p className="max-w-[60ch] text-star-muted">
          Japanese booster boxes, factory sealed, with the Japanese title on
          every box so you know it&apos;s the real thing.
        </p>
      </div>

      {products.length === 0 ? (
        <p className="text-star-muted">
          No products yet. Run <code className="font-mono">npm run db:seed</code>{" "}
          to add examples.
        </p>
      ) : (
        <Suspense
          fallback={<ProductGrid products={products} stock={null} today={null} />}
        >
          <ProductGridWithStock products={products} />
        </Suspense>
      )}
    </main>
  );
}
