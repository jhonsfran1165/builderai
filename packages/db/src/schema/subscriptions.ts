import { eq, relations } from "drizzle-orm"
import { foreignKey, primaryKey, uniqueIndex } from "drizzle-orm/pg-core"

import { pgTableProject } from "../utils/_table"
import { cuid, projectID, timestamps } from "../utils/sql"
import { customers } from "./customers"
import { subscriptionStatusEnum } from "./enums"
import { plans, versions } from "./prices"
import { projects } from "./projects"

export const subscriptions = pgTableProject(
  "subscriptions",
  {
    ...projectID,
    ...timestamps,
    planVersionId: cuid("plan_version_id").notNull(),
    planId: cuid("plan_id").notNull(),
    customerId: cuid("customers_id").notNull(),
    status: subscriptionStatusEnum("subscription_status").default("active"),
    // TODO: add fields for handling the subscription like date of start and end, stripe info
  },
  (table) => ({
    primary: primaryKey({
      columns: [table.id, table.projectId],
      name: "subscriptions_pkey",
    }),
    customerfk: foreignKey({
      columns: [table.customerId, table.projectId],
      foreignColumns: [customers.id, customers.projectId],
      name: "subscriptions_customer_id_fkey",
    }),
    versionfk: foreignKey({
      columns: [table.planVersionId, table.projectId],
      foreignColumns: [versions.id, versions.projectId],
      name: "subscriptions_plan_version_id_fkey",
    }),
    planfk: foreignKey({
      columns: [table.planId, table.projectId],
      foreignColumns: [plans.id, plans.projectId],
      name: "subscriptions_plan_id_fkey",
    }),
    unique: uniqueIndex("unique_active_subscription")
      .on(table.customerId)
      .where(eq(table.status, "active")),
  })
)

export const subscriptionRelations = relations(subscriptions, ({ one }) => ({
  project: one(projects, {
    fields: [subscriptions.projectId],
    references: [projects.id],
  }),
  customer: one(customers, {
    fields: [subscriptions.customerId],
    references: [customers.id],
  }),
  version: one(versions, {
    fields: [subscriptions.planVersionId],
    references: [versions.id],
  }),
  plan: one(plans, {
    fields: [subscriptions.planId],
    references: [plans.id],
  }),
}))
