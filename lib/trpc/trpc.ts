import { NextRequest } from "next/server"
import { initTRPC } from "@trpc/server"
import { eq } from "drizzle-orm"
import superjson from "superjson"
import { ZodError, z } from "zod"

import { authTxn } from "../db"
import { projects } from "../db/schemas/projects"

type CreateContextOptions = {
  req?: NextRequest
}

export const createInnerTRPCContext = (opts: CreateContextOptions) => {
  return {
    ...opts,
    db: authTxn,
  }
}

export const createTRPCContext = (opts: { req: NextRequest }) => {
  return createInnerTRPCContext({
    req: opts.req,
  })
}

export const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    }
  },
})

// this is our data store, used to respond to incoming RPCs from the client

interface User {
  id: string
  name: string
}
const userList: User[] = [
  {
    id: "1",
    name: "KATT",
  },
  {
    id: "2",
    name: "Foo",
  },
]

// this is our RPC API
export const appRouter = t.router({
  userById: t.procedure
    .input(
      z.object({
        slug: z.string(),
      })
    )
    .query(async (opts) => {
      const { slug } = opts.input
      const db = opts.ctx.db
      return await db((txn) =>
        txn.select().from(projects).where(eq(projects.slug, slug))
      )
    }),
})

export type AppRouter = typeof appRouter
