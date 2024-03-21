import { date, pgTable, uuid, timestamp, text } from "drizzle-orm/pg-core";

export const accountsTable = pgTable("accounts", {
  id: uuid("id").primaryKey(),
  shortId: text("short_id").unique(),
  expiredAt: timestamp("expired_at"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});
