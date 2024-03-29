"use server"

import { cache } from "react"
import { cookies, headers } from "next/headers"

import { createCaller, createTRPCContext } from "@builderai/api"
import { auth } from "@builderai/auth/server"

import { COOKIE_NAME_PROJECT, COOKIE_NAME_WORKSPACE } from "~/constants"

/**
 * This wraps the `createTRPCContext` helper and provides the required context for the tRPC API when
 * handling a tRPC call from a React Server Component.
 */
const createContext = cache(async () => {
  const heads = new Headers(headers())
  const activeWorkspaceSlug = cookies().get(COOKIE_NAME_WORKSPACE)?.value ?? ""
  const activeProjectSlug = cookies().get(COOKIE_NAME_PROJECT)?.value ?? ""

  heads.set("x-trpc-source", "rsc")
  heads.set(COOKIE_NAME_WORKSPACE, activeWorkspaceSlug)
  heads.set(COOKIE_NAME_PROJECT, activeProjectSlug)

  return createTRPCContext({
    session: await auth(),
    headers: heads,
  })
})

export const api = createCaller(createContext)
