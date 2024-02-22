// TODO: export like this https://github.com/drizzle-team/drizzle-orm/issues/468
import { neonConfig, Pool } from "@neondatabase/serverless"
import { and, eq, getTableColumns, or, sql } from "drizzle-orm"
import { drizzle as drizzleNeon } from "drizzle-orm/neon-serverless"

import * as dbSchemas from "./schema"
import * as utils from "./utils"

// activate connection caching
neonConfig.fetchConnectionCache = true

const pool = new Pool({
  connectionString: process.env.DATABASE_URL!,
  // idleTimeoutMillis: 0,
  // connectionTimeoutMillis: 0,
})

export const db = drizzleNeon(pool, {
  schema: dbSchemas,
  logger: process.env.DRIZZLE_LOG === "true",
})

export const projectGuardPrepared = db
  .select({
    project: getTableColumns(dbSchemas.projects),
    member: {
      ...getTableColumns(dbSchemas.users),
      role: dbSchemas.members.role,
    },
    workspace: getTableColumns(dbSchemas.workspaces),
  })
  .from(dbSchemas.projects)
  .limit(1)
  .where(
    and(
      eq(dbSchemas.projects.workspaceId, sql.placeholder("workspaceId")),
      eq(dbSchemas.users.id, sql.placeholder("userId")),
      or(
        eq(dbSchemas.projects.id, sql.placeholder("projectId")),
        eq(dbSchemas.projects.slug, sql.placeholder("projectSlug"))
      )
    )
  )
  .innerJoin(
    dbSchemas.workspaces,
    eq(dbSchemas.projects.workspaceId, dbSchemas.workspaces.id)
  )
  .innerJoin(
    dbSchemas.members,
    eq(dbSchemas.members.workspaceId, dbSchemas.workspaces.id)
  )
  .innerJoin(dbSchemas.users, eq(dbSchemas.members.userId, dbSchemas.users.id))
  .prepare("project_guard")

export const workspaceGuardPrepared = db
  .select({
    member: {
      ...getTableColumns(dbSchemas.users),
      role: dbSchemas.members.role,
    },
    workspace: getTableColumns(dbSchemas.workspaces),
  })
  .from(dbSchemas.workspaces)
  .limit(1)
  .where(
    and(
      or(
        eq(dbSchemas.workspaces.id, sql.placeholder("workspaceId")),
        eq(dbSchemas.workspaces.slug, sql.placeholder("workspaceSlug"))
      ),
      eq(dbSchemas.users.id, sql.placeholder("userId"))
    )
  )
  .innerJoin(
    dbSchemas.members,
    eq(dbSchemas.members.workspaceId, dbSchemas.workspaces.id)
  )
  .innerJoin(dbSchemas.users, eq(dbSchemas.members.userId, dbSchemas.users.id))
  .prepare("workspace_guard")

export const workspacesByUserPrepared = db.query.users
  .findFirst({
    with: {
      members: {
        columns: {
          role: true,
        },
        with: {
          workspace: {
            columns: {
              id: true,
              slug: true,
              isPersonal: true,
              name: true,
              plan: true,
            },
          },
        },
      },
    },
    where: (user, operators) =>
      operators.eq(user.id, sql.placeholder("userId")),
  })
  .prepare("workspaces_by_user")

export * from "drizzle-orm"
export { utils }
export const prepared = {
  workspacesByUserPrepared,
  projectGuardPrepared,
  workspaceGuardPrepared,
}
export const schema = { ...dbSchemas }
export { pgTableProject as tableCreator } from "./utils"
