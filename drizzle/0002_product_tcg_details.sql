CREATE TYPE "public"."product_language" AS ENUM('japanese', 'english');--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "name_ja" text;--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "set_code" text;--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "language" "product_language" DEFAULT 'japanese' NOT NULL;--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "contents" text;--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "is_preorder" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "release_date" date;