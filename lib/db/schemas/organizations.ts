import { pgTable, text, uniqueIndex, varchar } from "drizzle-orm/pg-core"
import { createSelectSchema } from "drizzle-zod"

// TODO: use path alias
import { organizationType } from "./enums"
import { commonColumns } from "./shared"

export const organizations = pgTable(
  "organizations",
  {
    ...commonColumns,
    name: varchar("name").notNull(),
    slug: text("slug").notNull().unique(),
    image: varchar("image"),
    type: organizationType("type"),
    description: text("description"),
    stripeId: text("stripe_id").unique(),
  },
  (table) => {
    return {
      organizationSlugIdx: uniqueIndex("organization_slug_idx").on(table.slug),
    }
  }
)

// add plan to organization
export const selectOrganizationSchema = createSelectSchema(
  organizations
).extend({
  // plan: z
  //   .enum(plan)
  //   .nullable()
  //   .default("free")
  //   .transform((val) => val ?? "free"),
})
