import "dotenv/config";
import { defineConfig } from "drizzle-kit";
export default defineConfig({
  out: "./src/common/infrastructure/database/drizzle/migrations",
  schema: "./src/common/infrastructure/database/drizzle/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
