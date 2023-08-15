import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

import { Database } from "@/lib/types/database.types"

// It creates a singleton instance of the client
export const db = () => createClientComponentClient<Database>()
