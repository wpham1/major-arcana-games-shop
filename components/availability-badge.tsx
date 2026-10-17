import type { Availability } from "@/lib/availability";
import { formatReleaseDate } from "@/lib/format";

// Each state has its own colour AND shape (filled dot, hollow dot, diamond),
// so it still reads for colour-blind shoppers. See DESIGN.md > Colors.
const styles = {
  "in-stock": "text-green before:rounded-full before:bg-current",
  "low-stock": "text-rust before:rounded-full before:bg-current",
  "pre-order": "text-blue before:rotate-45 before:rounded-[1px] before:bg-current",
  "sold-out": "text-ink-muted before:rounded-full before:border-[1.5px] before:border-current",
  checking: "text-ink-muted before:rounded-full before:bg-current before:opacity-40",
} as const;

function label(availability: Availability) {
  switch (availability.kind) {
    case "in-stock":
      return "In stock";
    case "low-stock":
      return `${availability.stock} left`;
    case "pre-order":
      return `Pre-order · ${formatReleaseDate(availability.releasesOn)}`;
    case "sold-out":
      return "Sold out";
  }
}

/** Pass null while stock is still loading. */
export function AvailabilityBadge({
  availability,
}: {
  availability: Availability | null;
}) {
  const kind = availability?.kind ?? "checking";
  return (
    <span
      className={`inline-flex items-center gap-1.5 text-[0.8125rem] font-bold whitespace-nowrap before:size-[7px] before:flex-none before:content-[''] ${styles[kind]}`}
    >
      {availability ? label(availability) : "Checking stock"}
    </span>
  );
}
