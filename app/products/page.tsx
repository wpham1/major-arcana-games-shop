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
      <h1 className="mb-8 font-display text-3xl font-bold">Booster boxes</h1>

      {products.length === 0 ? (
        <p className="text-star-muted">
          Nothing in stock right now. New releases are listed here as soon as
          pre-orders open.
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
