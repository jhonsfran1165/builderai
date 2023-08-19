import { pgTable, text, uniqueIndex, uuid } from "drizzle-orm/pg-core"

import { organizations } from "./organizations"
// TODO: use path alias
import { commonColumns } from "./shared"

export const projects = pgTable(
  "projects",
  {
    ...commonColumns,
    logo: text("logo"),
    name: text("name").notNull(),
    customDomain: text("custom_domain"),
    subdomain: text("subdomain").notNull(),
    orgId: uuid("org_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    slug: text("slug").notNull().unique(),
    description: text("description"),
  },
  (table) => {
    return {
      projectSlugIdx: uniqueIndex("project_slug_idx").on(table.slug),
    }
  }
)
