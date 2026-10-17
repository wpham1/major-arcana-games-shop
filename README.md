# Major Arcana Games — Website Rebuild

A custom Next.js storefront replacing the existing Shopify site for [Major Arcana Games](https://majorarcanagames.com).

## Overview

This project moves the Major Arcana Games store off Shopify entirely: products, inventory, and orders live in our own Postgres database, and payments will go through Stripe.

## Tech Stack

- **Framework**: Next.js 16 (App Router, Cache Components)
- **Language**: TypeScript
- **Database**: Postgres on [Neon](https://neon.tech), queried with [Drizzle ORM](https://orm.drizzle.team)
- **Payments**: Stripe Checkout (planned)
- **Styling**: Tailwind CSS
- **Deployment**: Vercel

## Getting Started

1. Create a free project on [Neon](https://neon.tech) and copy its **pooled** connection string.
2. Set up your environment:

   ```bash
   npm install
   cp .env.example .env.local   # then paste your connection string
   ```

3. Create the tables and add example products:

   ```bash
   npm run db:migrate
   npm run db:seed
   ```

4. Start the dev server:

   ```bash
   npm run dev
   ```

Open [http://localhost:3000/products](http://localhost:3000/products) to see the catalog.

Any Postgres works for local development, for example `DATABASE_URL="postgresql://postgres:postgres@localhost:5432/shop"`.

## Scripts

| Script | What it does |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Production build (needs `DATABASE_URL`, since catalog pages are prerendered) |
| `npm run lint` / `npm run typecheck` | ESLint / TypeScript checks |
| `npm run db:generate` | Create a migration in `drizzle/` after editing `lib/db/schema.ts` |
| `npm run db:migrate` | Apply pending migrations to the database |
| `npm run db:studio` | Browse and edit data in Drizzle Studio |
| `npm run db:seed` | Add placeholder products (safe to run repeatedly) |

## Project Structure

```
/
├── app/                # Pages and layouts
│   └── products/       # /products and /products/[slug] (same URLs as Shopify)
├── lib/
│   ├── db/schema.ts    # Tables: products, variants, orders, order_items
│   ├── db/index.ts     # Drizzle client
│   ├── products.ts     # Cached catalog reads
│   └── inventory.ts    # Stock reads and atomic reserve/release
├── drizzle/            # Generated SQL migrations (commit these)
├── scripts/seed.ts     # Example data
└── public/             # Static assets
```

## How data and inventory work

- **Products** have one or more **variants** (editions, bundles). Price and stock live on the variant. Products also carry the TCG details from DESIGN.md: Japanese title (`nameJa`), set code, language, box contents, and pre-order status with a release date.
- **Stock state** (in stock, low stock, pre-order, sold out) comes from `getStockState` in `lib/stock-state.ts`. A pre-order sells against its variant's stock as the allocation.
- **Catalog data** (names, descriptions, prices) is cached with `'use cache'` and tagged `products`. Call `updateTag("products")` after editing a product to refresh it.
- **Stock is never cached.** Product pages stream it in fresh on every request.
- **Overselling is prevented in the database.** `reserveStock` checks and decrements in a single SQL statement, and a check constraint keeps stock from going below zero. Wrap several reservations in `db.transaction` to make a whole cart succeed or fail together.

## Deployment

Deployed to Vercel. Add `DATABASE_URL` in the Vercel project's environment variables (or connect Neon through the Vercel integration). Push to `main` triggers a production deploy. Run `npm run db:migrate` against production before deploying schema changes.
