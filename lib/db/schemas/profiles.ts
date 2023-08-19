import { pgTable, varchar } from "drizzle-orm/pg-core"

// TODO: use path alias
import { commonColumns } from "./shared"

export const profiles = pgTable("profiles", {
  ...commonColumns,
  username: varchar("username").notNull().unique(),
  fullName: varchar("full_name").notNull(),
  avatarUrl: varchar("avatar_url"),
})
