import {
  httpBatchLink,
  loggerLink,
  type HTTPBatchLinkOptions,
  type HTTPHeaders,
  type TRPCLink,
} from "@trpc/client"
import { experimental_createTRPCNextAppDirClient } from "@trpc/next/app-dir/client"
import superjson from "superjson"

import type { AppRouter } from "@/lib/trpc/trpc"

function getBaseUrl() {
  if (typeof window !== "undefined")
    // browser should use relative path
    return ""

  if (process.env.VERCEL_URL)
    // reference for vercel.com
    return `https://${process.env.VERCEL_URL}`

  if (process.env.RENDER_INTERNAL_HOSTNAME)
    // reference for render.com
    return `http://${process.env.RENDER_INTERNAL_HOSTNAME}:${process.env.PORT}`

  // assume localhost
  return `http://localhost:${process.env.PORT ?? 3000}`
}

export const endingLink = (opts?: { headers?: HTTPHeaders }) =>
  ((runtime) => {
    const sharedOpts = {
      headers: opts?.headers,
    } satisfies Partial<HTTPBatchLinkOptions>

    const apiLink = httpBatchLink({
      ...sharedOpts,
      url: `${getBaseUrl()}/api/trpc`,
    })(runtime)

    return (ctx) => {
      const path = ctx.op.path.split(".") as [string, ...string[]]

      const newCtx = {
        ...ctx,
        op: { ...ctx.op, path: path.join(".") },
      }
      return apiLink(newCtx)
    }
  }) satisfies TRPCLink<AppRouter>

export const api = experimental_createTRPCNextAppDirClient<AppRouter>({
  config() {
    return {
      transformer: superjson,
      links: [
        loggerLink({
          enabled: (opts) =>
            process.env.NODE_ENV === "development" ||
            (opts.direction === "down" && opts.result instanceof Error),
        }),
        endingLink(),
      ],
    }
  },
})
