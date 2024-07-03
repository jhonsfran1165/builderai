import { createInsertSchema, createSelectSchema } from "drizzle-zod"
import { z } from "zod"
import { pages } from "../schema/pages"

export const pageContentSchema = z.object({
  planVersions: z.array(z.string()),
})

export const pageSelectBaseSchema = createSelectSchema(pages, {
  content: pageContentSchema,
})

export const pageInsertBaseSchema = createInsertSchema(pages, {
  content: pageContentSchema,
})
  .omit({
    createdAt: true,
    updatedAt: true,
  })
  .partial({
    id: true,
    projectId: true,
  })

export type InsertPage = z.infer<typeof pageInsertBaseSchema>
export type Page = z.infer<typeof pageSelectBaseSchema>
