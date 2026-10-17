import Image from "next/image";
import Link from "next/link";
import logo from "@/public/brand/logo-white.svg";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-10 border-b border-rule bg-night">
      <div className="mx-auto flex w-full max-w-6xl items-center gap-6 px-4 py-3">
        <Link href="/" aria-label="Major Arcana Games home">
          <Image src={logo} alt="" priority className="h-10 w-auto sm:h-12" />
        </Link>
        <nav aria-label="Main" className="ml-auto flex gap-6">
          <Link
            href="/products"
            className="py-1 font-medium text-star-muted transition-colors hover:text-star"
          >
            Booster boxes
          </Link>
        </nav>
      </div>
    </header>
  );
}
