import type { Config } from "drizzle-kit"

export default {
  schema: "./lib/db/schemas/*",
  out: "./lib/db/migrations",
  driver: "pg",
  dbCredentials: {
    connectionString:
      process.env.DATABASE_URL ||
      "postgresql://postgres:postgres@localhost:54322/postgres",
  },
  // Print all statements
  verbose: true,
  // Always ask for my confirmation
  strict: true,
} satisfies Config
