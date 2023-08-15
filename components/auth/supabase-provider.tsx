"use client"

import type { Session, SupabaseClient } from "@supabase/auth-helpers-nextjs"
import { createContext, useContext, useState } from "react"

import { db } from "@/lib/db/browser"
import type { Database } from "@/lib/types/database.types"

type MaybeSession = Session | null

type SupabaseContext = {
  supabase: SupabaseClient<Database>
  session: MaybeSession
}

// @ts-ignore
const Context = createContext<SupabaseContext>()

export default function SupabaseProvider({
  children,
  session,
}: {
  children: React.ReactNode
  session: MaybeSession
}) {
  const [supabase] = useState(() => db)

  return (
    <Context.Provider value={{ supabase, session }}>
      {children}
    </Context.Provider>
  )
}

export const useSupabase = () => useContext(Context)
