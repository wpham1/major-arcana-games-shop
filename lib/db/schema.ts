import { relations, sql } from "drizzle-orm";
import {
  boolean,
  check,
  date,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

const timestamps = {
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
};

export const productStatus = pgEnum("product_status", [
  "draft",
  "active",
  "archived",
]);

export const productLanguage = pgEnum("product_language", [
  "japanese",
  "english",
]);

export const orderStatus = pgEnum("order_status", [
  "pending", // checkout started, stock reserved
  "paid",
  "fulfilled",
  "cancelled",
  "expired", // checkout abandoned, stock released
]);

export const products = pgTable("products", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  // Matches Shopify's /products/<handle> URLs so old links keep working.
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  // Shown above the English name as proof of the real Japanese product.
  // Null shows "Japanese title to come".
  nameJa: text("name_ja"),
  // How collectors search, e.g. "SV9a" or "OP-09".
  setCode: text("set_code"),
  language: productLanguage("language").notNull().default("japanese"),
  // Free text, e.g. "30 packs, 5 cards per pack".
  contents: text("contents"),
  description: text("description").notNull().default(""),
  status: productStatus("status").notNull().default("draft"),
  // Pre-orders sell against `variants.stock` as their allocation, and ship
  // from the release date.
  isPreorder: boolean("is_preorder").notNull().default(false),
  releaseDate: date("release_date", { mode: "string" }),
  ...timestamps,
});

// What a customer actually buys: an edition, bundle, or size of a product.
// Stock lives here, and the check constraint makes overselling impossible
// at the database level.
export const variants = pgTable(
  "variants",
  {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    productId: integer("product_id")
      .notNull()
      .references(() => products.id, { onDelete: "cascade" }),
    sku: text("sku").notNull().unique(),
    name: text("name").notNull(),
    priceCents: integer("price_cents").notNull(),
    stock: integer("stock").notNull().default(0),
    position: integer("position").notNull().default(0),
    ...timestamps,
  },
  (t) => [
    check("variants_stock_non_negative", sql`${t.stock} >= 0`),
    check("variants_price_non_negative", sql`${t.priceCents} >= 0`),
  ],
);

export const orders = pgTable("orders", {
  id: uuid("id").primaryKey().defaultRandom(),
  status: orderStatus("status").notNull().default("pending"),
  email: text("email"),
  stripeCheckoutSessionId: text("stripe_checkout_session_id").unique(),
  subtotalCents: integer("subtotal_cents").notNull(),
  currency: text("currency").notNull().default("aud"),
  paidAt: timestamp("paid_at", { withTimezone: true }),
  ...timestamps,
});

export const orderItems = pgTable(
  "order_items",
  {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    orderId: uuid("order_id")
      .notNull()
      .references(() => orders.id, { onDelete: "cascade" }),
    variantId: integer("variant_id")
      .notNull()
      .references(() => variants.id, { onDelete: "restrict" }),
    // Snapshots, so past orders still read correctly after a product is
    // renamed or repriced.
    productName: text("product_name").notNull(),
    variantName: text("variant_name").notNull(),
    unitPriceCents: integer("unit_price_cents").notNull(),
    quantity: integer("quantity").notNull(),
  },
  (t) => [check("order_items_quantity_positive", sql`${t.quantity} > 0`)],
);

export const productsRelations = relations(products, ({ many }) => ({
  variants: many(variants),
}));

export const variantsRelations = relations(variants, ({ one }) => ({
  product: one(products, {
    fields: [variants.productId],
    references: [products.id],
  }),
}));

export const ordersRelations = relations(orders, ({ many }) => ({
  items: many(orderItems),
}));

export const orderItemsRelations = relations(orderItems, ({ one }) => ({
  order: one(orders, { fields: [orderItems.orderId], references: [orders.id] }),
  variant: one(variants, {
    fields: [orderItems.variantId],
    references: [variants.id],
  }),
}));
