import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Condition guide",
};

// Add example photos of what passes as Near Mint here once they exist.
// Keep every statement on this page to policy the shop has confirmed.
export default function ConditionGuidePage() {
  return (
    <main className="mx-auto grid w-full max-w-[760px] gap-6 px-4 py-12 sm:py-16">
      <h1 className="font-display text-[clamp(2rem,4.5vw,3rem)] leading-[1.12]">
        Near Mint, or we tell you.
      </h1>
      <p className="text-lg">
        We only sell cards and product we&apos;d grade Near Mint or better.
      </p>
      <p>
        If we ever list something below Near Mint, the listing itself will say
        so clearly, before you buy. That&apos;s very rare: so far, we never
        have.
      </p>
      <h2 className="mt-4 font-display text-2xl">Questions about a card?</h2>
      <p>
        If you&apos;d like a closer look at something before you buy, email us
        at <span className="font-bold select-all">{site.email}</span>.
      </p>
    </main>
  );
}
