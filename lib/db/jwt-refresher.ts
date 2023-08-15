import type { SupabaseClient } from "@supabase/auth-helpers-nextjs"

import type { Database } from "@/lib/types/database.types"

export const refreshJWT = async (supabase: SupabaseClient<Database>) => {
  // refreshing supabase JWT
  const { error } = await supabase.auth.refreshSession()
  // if refresh token is expired or something else then logout
  error && console.error(error)

  if (error) await supabase.auth.signOut()
}
