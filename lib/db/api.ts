import { cookies } from "next/headers"
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"

import { Database } from "@/lib/types/database.types"

export const db = () => createRouteHandlerClient<Database>({ cookies })
