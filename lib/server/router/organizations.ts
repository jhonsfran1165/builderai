import { generateSlug } from "random-word-slugs"
import { z } from "zod"

import { eq } from "@/lib/db"
import { organizations, selectOrganizationSchema } from "@/lib/db/schemas"

import { createTRPCRouter, protectedProcedure } from "../trpc"
import { hasUserAccessToWorkspace } from "./utils"

export const organizationRouter = createTRPCRouter({
  getWorkspace: protectedProcedure
    .input(z.object({ slug: z.string() }))
    .query(async (opts) => {
      // TODO: validate from here or from database?
      const data = await hasUserAccessToWorkspace({
        workspaceSlug: opts.input.slug,
        ctx: opts.ctx,
      })
      if (!data) return

      const result = await opts.ctx.db.query.organizations.findFirst({
        // where: eq(organizations.id, data.workspace.id),
        where: eq(organizations.id, opts.input.slug),
      })

      return selectOrganizationSchema.parse(result)
    }),

  createWorkspace: protectedProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async (opts) => {
      const slug = generateSlug(2)

      const org = await opts.ctx.db
        .insert(organizations)
        .values({ slug: slug, name: opts.input.name })
        .returning()

      return org
    }),
})
