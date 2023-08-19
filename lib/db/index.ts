import { cookies } from "next/headers"
import { sql } from "drizzle-orm"
// TODO: https://github.com/ploskovytskyy/next-app-router-trpc-drizzle-planetscale-edge/blob/main/src/env.mjs
import { PostgresJsDatabase, drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"

const isServer = typeof window === "undefined"

const queryConnection = postgres(process.env.DATABASE_URL!, {
  connection: {},
})

const dbDrizzel = drizzle(queryConnection)

/**
 * Execute transaction in an authenticated context.
 * This will set JWT and user ID for the duration of a single transaction to
 * enable RLS (Row Level Security).
 *
 * this is a temporary solution until drizzle implements RLS
 *
 * Thanks to https://github.com/prisma/prisma/issues/5128#issuecomment-1378541576
 */
export function authTxn<T>(
  cb: (sql: PostgresJsDatabase) => T | Promise<T>
): Promise<T> {
  // pass this to a helper function, also validate that token
  const cookieStore = cookies()
  const supabaseJWT = cookieStore.get("sb-localhost-auth-token")
  const rawJWT = JSON.parse(supabaseJWT?.value || "{}")[0]

  // You can add a validation here for the accessToken - we rely on supabase for now
  // const jwtClaim = decodeJwt(session.access_token)
  const jwtClaim = decodeJwt(rawJWT)
  const role = JSON.parse(jwtClaim).role

  return dbDrizzel.transaction(async (tx) => {
    // Set JWT to enable RLS. supabase adds the role and the userId (sub) to the jwt claims
    await tx.execute(
      sql`SELECT set_config('request.jwt.claims', '${sql.raw(jwtClaim)}', TRUE)`
    )

    // do not use postgres because it will skip the RLS set role to authenticated
    await tx.execute(sql`set SESSION role '${sql.raw(role)}'`)

    // This will be executed in an authenticated context.
    return cb(tx)
  }) as Promise<T>
}

/** Parse JWT into string without verifying it */
function decodeJwt(token: string): string {
  return atob(token.split(".")[1])
}
