//TYPES MODULES
import type { Config } from "drizzle-kit";

export default {
  schema: "./drizzle/_schema.ts",
  out: "./drizzle-migration",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.DRIZZLE_DATABASE_URL!,
  },
} satisfies Config;
