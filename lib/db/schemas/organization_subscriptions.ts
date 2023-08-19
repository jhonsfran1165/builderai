import {
  boolean,
  integer,
  jsonb,
  numeric,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core"

import {
  organizationTiers,
  subscriptionInterval,
  subscriptionStatus,
} from "./enums"
import { organizations } from "./organizations"
import { projects } from "./projects"
// TODO: use path alias
import { commonColumns } from "./utils"

export const organizationSubscriptions = pgTable("organization_subscriptions", {
  ...commonColumns,
  status: subscriptionStatus("status"),
  metadata: jsonb("metadata"),
  priceId: text("price_id"),
  quantity: integer("quantity"),
  cancelAtPeriodEnd: boolean("cancel_at_period_end"),
  currency: text("currency"),
  created: timestamp("created", { withTimezone: true, mode: "string" })
    .defaultNow()
    .notNull(),
  currentPeriodStart: timestamp("current_period_start", {
    withTimezone: true,
    mode: "string",
  })
    .defaultNow()
    .notNull(),
  currentPeriodEnd: timestamp("current_period_end", {
    withTimezone: true,
    mode: "string",
  })
    .defaultNow()
    .notNull(),
  endedAt: timestamp("ended_at", { withTimezone: true, mode: "string" })
    .defaultNow()
    .notNull(),
  cancelAt: timestamp("cancel_at", { withTimezone: true, mode: "string" })
    .defaultNow()
    .notNull(),
  canceledAt: timestamp("canceled_at", { withTimezone: true, mode: "string" })
    .defaultNow()
    .notNull(),
  trialStart: timestamp("trial_start", { withTimezone: true, mode: "string" })
    .defaultNow()
    .notNull(),
  trialEnd: timestamp("trial_end", { withTimezone: true, mode: "string" })
    .defaultNow()
    .notNull(),
  orgId: uuid("org_id")
    .notNull()
    .references(() => organizations.id, {
      onDelete: "cascade",
    }),
  interval: subscriptionInterval("interval"),
  intervalCount: numeric("interval_count"),
  tier: organizationTiers("tier").default("FREE"),
  projectId: uuid("project_id")
    .notNull()
    .references(() => projects.id, {
      onDelete: "cascade",
    }),
  stripeSubscriptionId: text("stripe_subscription_id").unique(),
})
