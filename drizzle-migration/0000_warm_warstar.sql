CREATE TABLE IF NOT EXISTS "accounts" (
	"id" uuid PRIMARY KEY NOT NULL,
	"expired_at" date,
	"created_at" date DEFAULT now(),
	"updated_at" date DEFAULT now()
);
