import { date, pgTable, uuid, timestamp } from "drizzle-orm/pg-core";

export const accountsTable = pgTable("accounts", {
  id: uuid("id").primaryKey(),
  expiredAt: timestamp("expired_at"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});
