import { NextRequest } from "next/server"
import { fetchRequestHandler } from "@trpc/server/adapters/fetch"

import { appRouter, createTRPCContext } from "@/lib/trpc/trpc"

// this is the server RPC API handler

const handler = (req: NextRequest) => {
  console.log(`incoming request ${req.url}`)
  return fetchRequestHandler({
    endpoint: "/api/trpc",
    req: req,
    router: appRouter,
    createContext: () => createTRPCContext({ req }),
    onError: ({ error }) => {
      console.log("Error in tRPC handler (edge)")
      console.error(error)
    },
  })
}

export const GET = handler
export const POST = handler
