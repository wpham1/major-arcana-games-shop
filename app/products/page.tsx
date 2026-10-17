import type { Metadata } from "next";
import { Suspense } from "react";
import {
  ProductGrid,
  ProductGridWithStock,
} from "@/components/product-grid";
import { getActiveProducts } from "@/lib/products";

export const metadata: Metadata = {
  title: "Shop",
};

export default async function ProductsPage() {
  const products = await getActiveProducts();

  return (
    <main className="mx-auto w-full max-w-[1160px] px-4 py-12 sm:py-16">
      <h1 className="mb-2 font-display text-[clamp(1.75rem,4vw,2.5rem)]">
        Shop
      </h1>
      <p className="mb-8 text-ink-muted">
        Japanese Pokémon and One Piece. Near Mint or better, every time.
      </p>

      {products.length === 0 ? (
        <p className="text-ink-muted">
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
