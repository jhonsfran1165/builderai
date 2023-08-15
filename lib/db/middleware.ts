import { NextRequest, NextResponse } from "next/server"
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"

import { Database } from "@/lib/types/database.types"

// just creating a layer of abstraction between bd implementation and provider
export const db = ({ req, res }: { req: NextRequest; res: NextResponse }) =>
  createMiddlewareClient<Database>({ req, res })
