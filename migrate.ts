import "dotenv/config";

import { migrate } from "drizzle-orm/postgres-js/migrator";

import postgres from "postgres";

import { drizzle } from "drizzle-orm/postgres-js";

const databaseUrl = drizzle(
  postgres(process.env.DRIZZLE_DATABASE_URL!, { ssl: "require", max: 1 })
);

const main = async () => {
  try {
    await migrate(databaseUrl, { migrationsFolder: "./drizzle-migration" });

    console.log("Migration complete");
  } catch (error) {
    console.log(error);
  }

  process.exit(0);
};

main();
