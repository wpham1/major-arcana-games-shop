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
    <main className="mx-auto w-full max-w-[1160px] px-4 py-10 sm:py-14">
      <Link
        href="/products"
        className="text-sm font-bold text-blue hover:underline"
      >
        &larr; Back to the shop
      </Link>
      <Suspense fallback={<p className="mt-6 text-ink-muted">Loading…</p>}>
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
    <article className="mt-8 grid items-start gap-10 md:grid-cols-[1.1fr_1fr] md:gap-14">
      <div className="relative grid aspect-[5/4] place-items-center overflow-hidden rounded-md border border-line bg-image-well">
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
            // No photo yet: the set code stands in.
            product.setCode && (
              <span className="font-mono text-4xl text-ink-muted">
                {product.setCode}
              </span>
            )
          )}
      </div>

      <div className="grid gap-6">
        <div>
          {product.nameJa && (
            <p className="text-lg text-ink-muted">{product.nameJa}</p>
          )}
          <h1 className="font-display text-[clamp(2rem,4.5vw,3rem)] leading-[1.12]">
            {product.name}
          </h1>
        </div>

        {product.description && (
          <p className="max-w-[65ch] text-ink-muted">{product.description}</p>
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

        <p className="rounded-md bg-card px-4 py-3 text-[0.9375rem]">
          <b>Near Mint or better.</b> We&apos;d say so clearly in this listing
          if it weren&apos;t.{" "}
          <Link href="/condition-guide" className="text-blue underline">
            Condition guide
          </Link>
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
                <tr key={label} className="border-b border-line">
                  <th
                    scope="row"
                    className="w-2/5 py-2.5 text-left font-medium text-ink-muted"
                  >
                    {label}
                  </th>
                  <td className="py-2.5">{value}</td>
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
    <ul className="divide-y divide-line border-y border-line">
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
          <p className="text-xl font-bold tabular-nums">
            {formatPrice(variant.priceCents)}
          </p>
        </li>
      ))}
    </ul>
  );
}
