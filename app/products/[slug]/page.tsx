import Link from "next/link";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import { Suspense } from "react";
import { formatDate, formatPrice } from "@/lib/format";
import { getStock } from "@/lib/inventory";
import { getProductBySlug } from "@/lib/products";
import { getStockState } from "@/lib/stock-state";

export default function ProductPage({ params }: PageProps<"/products/[slug]">) {
  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-12">
      <Link
        href="/products"
        className="text-sm text-zinc-600 hover:underline dark:text-zinc-400"
      >
        &larr; All products
      </Link>
      <Suspense fallback={<p className="mt-6">Loading…</p>}>
        <ProductDetails params={params} />
      </Suspense>
    </main>
  );
}

async function ProductDetails({
  params,
}: Pick<PageProps<"/products/[slug]">, "params">) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  return (
    <article className="mt-6">
      <h1 className="text-3xl font-semibold tracking-tight">{product.name}</h1>
      {product.description && (
        <p className="mt-4 leading-7 text-zinc-700 dark:text-zinc-300">
          {product.description}
        </p>
      )}
      {/* Name and prices above are cached; stock below is read fresh on
          every request and streams in. */}
      <Suspense
        fallback={<p className="mt-8 text-zinc-500">Checking stock…</p>}
      >
        <VariantList
          variants={product.variants}
          isPreorder={product.isPreorder}
          releaseDate={product.releaseDate}
        />
      </Suspense>
    </article>
  );
}

async function VariantList({
  variants,
  isPreorder,
  releaseDate,
}: {
  variants: { id: number; name: string; priceCents: number }[];
  isPreorder: boolean;
  releaseDate: string | null;
}) {
  await connection();
  const stock = await getStock(variants.map((v) => v.id));

  return (
    <ul className="mt-8 divide-y divide-black/10 border-y border-black/10 dark:divide-white/15 dark:border-white/15">
      {variants.map((variant) => {
        const available = stock.get(variant.id) ?? 0;
        const state = getStockState(available, isPreorder);
        const label = {
          in_stock: "In stock",
          low_stock: `Only ${available} left`,
          preorder: releaseDate
            ? `Pre-order, ships ${formatDate(releaseDate)}`
            : "Pre-order",
          sold_out: "Sold out",
        }[state];
        return (
          <li
            key={variant.id}
            className="flex items-center justify-between gap-4 py-4"
          >
            <div>
              <p className="font-medium">{variant.name}</p>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                {label}
              </p>
            </div>
            <p className="font-medium">{formatPrice(variant.priceCents)}</p>
          </li>
        );
      })}
    </ul>
  );
}
