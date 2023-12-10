import { sql } from "drizzle-orm"
import { timestamp, uuid } from "drizzle-orm/pg-core"

import { project } from "../schema/project"
import { workspace } from "../schema/workspace"

export const cuid = (id: string) => uuid(id)

export const id = {
  get id() {
    return cuid("id").primaryKey().notNull()
  },
}

export const workspaceID = {
  get id() {
    return cuid("id").notNull()
  },
  get workspaceId() {
    return cuid("workspace_id")
      .notNull()
      .references(() => workspace.id, {
        onDelete: "cascade",
      })
  },
}

export const projectID = {
  get id() {
    return cuid("id").notNull()
  },
  get projectId() {
    return cuid("project_id")
      .notNull()
      .notNull()
      .references(() => project.id, {
        onDelete: "cascade",
      })
  },
}

export const tenantID = {
  tenantId: cuid("tenant_id").notNull(),
}

export const timestamps = {
  createdAt: timestamp("created_at", {
    mode: "string",
  })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp("updated_at", {
    mode: "string",
  })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
}