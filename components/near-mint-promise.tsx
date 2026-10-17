import Link from "next/link";

/** The shop's confirmed condition policy, as a full-bleed brand-blue band. */
export function NearMintPromise() {
  return (
    <section className="bg-blue text-white" aria-labelledby="promise-title">
      <div className="mx-auto grid w-full max-w-[1160px] items-start gap-4 px-4 py-[72px] md:grid-cols-[1fr_1.3fr] md:gap-12">
        <h2
          id="promise-title"
          className="font-display text-[clamp(2.25rem,5vw,3.5rem)] leading-[1.12]"
        >
          Near Mint, or we tell you.
        </h2>
        <div className="grid gap-4">
          <p className="max-w-[52ch] text-lg">
            We only sell cards and product we&apos;d grade Near Mint or better.
            If we ever list something below that, the listing will say so
            clearly. So far, we never have.
          </p>
          <p className="opacity-85">
            Not sure what Near Mint means at our shop?{" "}
            <Link href="/condition-guide" className="text-gold underline">
              Read our condition guide
            </Link>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
