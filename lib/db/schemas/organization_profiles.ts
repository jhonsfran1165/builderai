import { boolean, pgTable, uuid } from "drizzle-orm/pg-core"

// TODO: use path alias
import { organizationRoles } from "./enums"
import { organizations } from "./organizations"
import { profiles } from "./profiles"
import { commonColumns } from "./shared"

export const organization_profiles = pgTable("organization_profiles", {
  ...commonColumns,
  role: organizationRoles("role").notNull(),
  orgId: uuid("org_id")
    .references(() => organizations.id)
    .notNull(),
  profileId: uuid("profile_id")
    .references(() => profiles.id)
    .notNull(),
  isDefault: boolean("is_default").default(false).notNull(),
})
