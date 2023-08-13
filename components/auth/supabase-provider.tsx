"use client"

import type { Session, SupabaseClient } from "@supabase/auth-helpers-nextjs"
import { createContext, useContext, useState } from "react"

import { createBrowserClient } from "@/lib/supabase/supabase-browser"
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
  const [supabase] = useState(() => createBrowserClient())

  return (
    <Context.Provider value={{ supabase, session }}>
      {children}
    </Context.Provider>
  )
}

export const useSupabase = () => useContext(Context)
