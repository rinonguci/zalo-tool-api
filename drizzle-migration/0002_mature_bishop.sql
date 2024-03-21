ALTER TABLE "accounts" ADD COLUMN "short_id" text;--> statement-breakpoint
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_short_id_unique" UNIQUE("short_id");