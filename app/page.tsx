import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center gap-6 px-4 py-24">
      <h1 className="text-4xl font-semibold tracking-tight">
        Major Arcana Games
      </h1>
      <Link
        href="/products"
        className="w-fit rounded-full bg-foreground px-5 py-3 font-medium text-background transition-opacity hover:opacity-85"
      >
        Shop all products
      </Link>
    </main>
  );
}
