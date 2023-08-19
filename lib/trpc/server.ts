import "server-only"
import { headers } from "next/headers"
import { loggerLink } from "@trpc/client"
import { experimental_createTRPCNextAppDirServer } from "@trpc/next/app-dir/server"
import superjson from "superjson"

import { endingLink } from "@/lib/trpc/client"
import type { AppRouter } from "@/lib/trpc/trpc"

export const api = experimental_createTRPCNextAppDirServer<AppRouter>({
  config() {
    return {
      transformer: superjson,
      links: [
        loggerLink({
          enabled: (opts) =>
            process.env.NODE_ENV === "development" ||
            (opts.direction === "down" && opts.result instanceof Error),
        }),
        endingLink({
          headers: Object.fromEntries(headers().entries()),
        }),
      ],
    }
  },
})
