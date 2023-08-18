import { pgEnum } from "drizzle-orm/pg-core"

import { ORGANIZATION_ROLES, ORGANIZATION_TYPES } from "@/lib/config/layout"
import { SUBSCRIPTIONS } from "@/lib/config/subscriptions"

const ORG_TYPES = Object.keys(ORGANIZATION_TYPES) as unknown as readonly [
  string,
  ...string[]
]

const SUBSCRIPTIONS_PLANS = SUBSCRIPTIONS.map(
  (subscription) => subscription.plan
) as unknown as readonly [string, ...string[]]

const ORG_ROLES = Object.keys(ORGANIZATION_ROLES) as unknown as readonly [
  string,
  ...string[]
]

export const organizationRoles = pgEnum("organization_roles", ORG_ROLES)
export const organizationType = pgEnum("organization_types", ORG_TYPES)
export const organizationTiers = pgEnum(
  "organization_tiers",
  SUBSCRIPTIONS_PLANS
)

export const subscriptionStatus = pgEnum("subscription_status", [
  "unpaid",
  "past_due",
  "incomplete_expired",
  "incomplete",
  "canceled",
  "active",
  "trialing",
])

export const subscriptionInterval = pgEnum("subscription_interval", [
  "year",
  "month",
  "week",
  "day",
])
