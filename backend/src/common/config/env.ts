import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  PORT: z.string(),
  NODE_ENV: z.enum(["develop", "production", "test"]),
  API_URL: z.string().url(),
  DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),
  JWT_SECRET: z.string().min(1, "JWT_SECRET is required"),
});

const parseEnv = () => {
  try {
    return envSchema.parse(process.env);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("Invalid environment variables:");
      error.issues.forEach((err) => {
        console.error(`  - ${err.path.join(".")}: ${err.message}`);
      });
      process.exit(1);
    }
    throw error;
  }
};

export const env = parseEnv();
