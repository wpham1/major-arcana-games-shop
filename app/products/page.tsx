import type { Metadata } from "next";
import Link from "next/link";
import { formatPrice } from "@/lib/format";
import { getActiveProducts } from "@/lib/products";

export const metadata: Metadata = {
  title: "All products",
};

export default async function ProductsPage() {
  const products = await getActiveProducts();

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-12">
      <h1 className="mb-8 text-3xl font-semibold tracking-tight">
        All products
      </h1>

      {products.length === 0 ? (
        <p className="text-zinc-600 dark:text-zinc-400">
          No products yet. Run <code>npm run db:seed</code> to add examples.
        </p>
      ) : (
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => {
            const prices = product.variants.map((v) => v.priceCents);
            const lowest = Math.min(...prices);
            const label =
              new Set(prices).size > 1
                ? `From ${formatPrice(lowest)}`
                : formatPrice(lowest);

            return (
              <li key={product.id}>
                <Link
                  href={`/products/${product.slug}`}
                  className="block rounded-lg border border-black/10 p-6 transition-colors hover:bg-black/[.03] dark:border-white/15 dark:hover:bg-white/[.05]"
                >
                  <h2 className="font-medium">{product.name}</h2>
                  {prices.length > 0 && (
                    <p className="mt-1 text-zinc-600 dark:text-zinc-400">
                      {label}
                    </p>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </main>
  );
}
