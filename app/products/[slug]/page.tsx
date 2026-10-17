import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import { Suspense } from "react";
import { AvailabilityBadge } from "@/components/availability-badge";
import { getAvailability, todayInJapan } from "@/lib/availability";
import { formatPrice, formatReleaseDate } from "@/lib/format";
import { getStock } from "@/lib/inventory";
import { getProductBySlug } from "@/lib/products";

export default function ProductPage({ params }: PageProps<"/products/[slug]">) {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-12">
      <Link
        href="/products"
        className="text-sm text-star-muted transition-colors hover:text-star"
      >
        &larr; All booster boxes
      </Link>
      <Suspense fallback={<p className="mt-6 text-star-muted">Loading…</p>}>
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
    <article className="mt-8 grid items-start gap-12 md:grid-cols-[0.9fr_1.1fr]">
      {/* Card-framed photo well. */}
      <div className="card-face relative! aspect-[63/88] max-w-[340px] md:max-w-none">
        <div className="relative grid flex-1 place-items-center overflow-hidden rounded-sm bg-night-sunk">
          {product.imageUrl ? (
            <Image
              src={product.imageUrl}
              alt={`${product.name} booster box`}
              fill
              priority
              sizes="(max-width: 768px) 340px, 45vw"
              className="object-contain p-4"
            />
          ) : (
            // No photo yet: the set code stands in, in display type.
            product.setCode && (
              <span className="font-display text-5xl font-extrabold text-gold/60">
                {product.setCode}
              </span>
            )
          )}
        </div>
      </div>

      <div className="grid gap-6">
        <div>
          {product.nameJa && (
            <p className="font-display text-xl text-star-muted">
              {product.nameJa}
            </p>
          )}
          <h1 className="font-display text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.15] font-extrabold">
            {product.name}
          </h1>
        </div>

        {product.description && (
          <p className="max-w-[65ch] text-star-muted">{product.description}</p>
        )}

        {/* Name and prices above are cached; stock below is read fresh on
            every request and streams in. */}
        <Suspense
          fallback={
            <VariantList
              variants={product.variants}
              releasesOn={product.releasesOn}
              stock={null}
              today={null}
            />
          }
        >
          <VariantListWithStock
            variants={product.variants}
            releasesOn={product.releasesOn}
          />
        </Suspense>

        <p className="text-[0.9375rem] text-star-muted">
          Near Mint or better. We&apos;d say so clearly in this listing if it
          weren&apos;t.
        </p>

        <table className="w-full border-collapse text-[0.9375rem]">
          <tbody>
            {[
              ["Set code", product.setCode],
              ["Release", product.releasesOn && formatReleaseDate(product.releasesOn)],
              ["Language", "Japanese"],
            ]
              .filter(([, value]) => value)
              .map(([label, value]) => (
                <tr key={label} className="border-b border-rule">
                  <th
                    scope="row"
                    className="w-2/5 py-2.5 text-left font-medium text-star-muted"
                  >
                    {label}
                  </th>
                  <td className="py-2.5 font-mono tabular-nums">{value}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </article>
  );
}

type Variant = { id: number; name: string; priceCents: number };

async function VariantListWithStock({
  variants,
  releasesOn,
}: {
  variants: Variant[];
  releasesOn: string | null;
}) {
  await connection();
  const stock = await getStock(variants.map((v) => v.id));
  return (
    <VariantList
      variants={variants}
      releasesOn={releasesOn}
      stock={stock}
      today={todayInJapan(new Date())}
    />
  );
}

function VariantList({
  variants,
  releasesOn,
  stock,
  today,
}: {
  variants: Variant[];
  releasesOn: string | null;
  /** null while live stock is still loading. */
  stock: Map<number, number> | null;
  today: string | null;
}) {
  return (
    <ul className="divide-y divide-rule border-y border-rule">
      {variants.map((variant) => (
        <li
          key={variant.id}
          className="flex items-center justify-between gap-4 py-4"
        >
          <div className="grid gap-1">
            <p className="font-medium">{variant.name}</p>
            <AvailabilityBadge
              availability={
                stock && today
                  ? getAvailability(releasesOn, stock.get(variant.id) ?? 0, today)
                  : null
              }
            />
          </div>
          <p className="font-mono text-xl font-medium tabular-nums">
            {formatPrice(variant.priceCents)}
          </p>
        </li>
      ))}
    </ul>
  );
}
