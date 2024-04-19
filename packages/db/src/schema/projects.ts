import { relations } from "drizzle-orm"
import { boolean, index, text, unique } from "drizzle-orm/pg-core"

import { pgTableProject } from "../utils/_table"
import { id, timestamps, workspaceID } from "../utils/sql"
import { projectTierEnum } from "./enums"
import { workspaces } from "./workspaces"

export const projects = pgTableProject(
  "projects",
  {
    ...id,
    ...workspaceID,
    ...timestamps,
    slug: text("slug").notNull(),
    name: text("name").notNull(),
    tier: projectTierEnum("tier").default("FREE").notNull(),
    url: text("url").default("").notNull(),
    stripeAccountId: text("stripe_account_id").default(""),
    stripeAccountVerified: boolean("stripe_account_verified").default(false),
  },
  (table) => ({
    slug: index("slug_index").on(table.slug),
    unique: unique("unique_slug").on(table.slug),
  })
)

export const projectsRelations = relations(projects, ({ one }) => ({
  workspace: one(workspaces, {
    fields: [projects.workspaceId],
    references: [workspaces.id],
  }),
}))
