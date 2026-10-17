import Image from "next/image";
import Link from "next/link";
import logo from "@/public/brand/logo-black.svg";

const links = [
  { href: "/products", label: "Shop" },
  { href: "/artists", label: "Artists" },
  { href: "/condition-guide", label: "Condition guide" },
  { href: "/about", label: "About us" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-10 border-b border-line bg-paper">
      <div className="mx-auto flex w-full max-w-[1160px] flex-wrap items-center gap-x-6 gap-y-2 px-4 py-3">
        <Link href="/" aria-label="Major Arcana Games home">
          <Image src={logo} alt="" priority className="h-9 w-auto sm:h-11" />
        </Link>
        <nav
          aria-label="Main"
          className="order-3 flex w-full gap-6 overflow-x-auto sm:order-none sm:ml-auto sm:w-auto"
        >
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="py-1 font-medium whitespace-nowrap transition-colors hover:text-blue"
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
