import type { SupabaseClient } from "@supabase/auth-helpers-nextjs"

import type { Database } from "@/lib/types/database.types"

export const refreshJWT = async (db: SupabaseClient<Database>) => {
  // refreshing JWT
  const { error } = await db.auth.refreshSession()
  // if refresh token is expired or something else then logout
  error && console.error(error)

  if (error) await db.auth.signOut()
}
