import "dotenv/config"
// TODO: https://github.com/ploskovytskyy/next-app-router-trpc-drizzle-planetscale-edge/blob/main/src/env.mjs
import { drizzle } from "drizzle-orm/postgres-js"
import { migrate } from "drizzle-orm/postgres-js/migrator"
import postgres from "postgres"

const migrationConnection = postgres(process.env.DATABASE_URL!, { max: 1 })
const queryConnection = postgres(process.env.DATABASE_URL!)

export const db = drizzle(queryConnection)
export const dbMigration = drizzle(migrationConnection)

const main = async () => {
  await migrate(dbMigration, {
    migrationsFolder: "lib/db/migrations",
    migrationsTable: "drizzle_migrations",
  })
  await migrationConnection.end()

  process.exit(0)
}

main()
