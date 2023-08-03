// Generated by ts-to-zod
import { z } from "zod"

import { Json } from "./database.types"

export const jsonSchema: z.ZodSchema<Json> = z.lazy(() =>
  z
    .union([
      z.string(),
      z.number(),
      z.boolean(),
      z.record(jsonSchema),
      z.array(jsonSchema),
    ])
    .nullable()
)

export const pageRowSchema = z.object({
  content: jsonSchema.nullable(),
  created_at: z.string(),
  description: z.string(),
  id: z.string(),
  image_url: z.string().nullable(),
  org_id: z.string().nullable(),
  project_id: z.string().nullable(),
  published: z.boolean(),
  slug: z.string(),
  title: z.string(),
})

export const pageInsertSchema = z.object({
  content: jsonSchema.optional().nullable(),
  created_at: z.string().optional(),
  description: z.string(),
  id: z.string().optional(),
  image_url: z.string().optional().nullable(),
  org_id: z.string().optional().nullable(),
  project_id: z.string().optional().nullable(),
  published: z.boolean().optional(),
  slug: z.string().optional(),
  title: z.string(),
})

export const pageUpdateSchema = z.object({
  content: jsonSchema.optional().nullable(),
  created_at: z.string().optional(),
  description: z.string().optional(),
  id: z.string().optional(),
  image_url: z.string().optional().nullable(),
  org_id: z.string().optional().nullable(),
  project_id: z.string().optional().nullable(),
  published: z.boolean().optional(),
  slug: z.string().optional(),
  title: z.string().optional(),
})

export const profileRowSchema = z.object({
  avatar_url: z.string().nullable(),
  created_at: z.string(),
  full_name: z.string(),
  id: z.string(),
  updated_at: z.string(),
  username: z.string(),
})

export const profileInsertSchema = z.object({
  avatar_url: z.string().optional().nullable(),
  created_at: z.string().optional(),
  full_name: z.string(),
  id: z.string(),
  updated_at: z.string().optional(),
  username: z.string(),
})

export const profileUpdateSchema = z.object({
  avatar_url: z.string().optional().nullable(),
  created_at: z.string().optional(),
  full_name: z.string().optional(),
  id: z.string().optional(),
  updated_at: z.string().optional(),
  username: z.string().optional(),
})

export const projectRowSchema = z.object({
  created_at: z.string(),
  custom_domain: z.string().nullable(),
  description: z.string().nullable(),
  id: z.string(),
  logo: z.string().nullable(),
  name: z.string(),
  org_id: z.string().nullable(),
  slug: z.string(),
  subdomain: z.string(),
  updated_at: z.string(),
})

export const projectInsertSchema = z.object({
  created_at: z.string().optional(),
  custom_domain: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  id: z.string().optional(),
  logo: z.string().optional().nullable(),
  name: z.string(),
  org_id: z.string().optional().nullable(),
  slug: z.string().optional(),
  subdomain: z.string(),
  updated_at: z.string().optional(),
})

export const projectUpdateSchema = z.object({
  created_at: z.string().optional(),
  custom_domain: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  id: z.string().optional(),
  logo: z.string().optional().nullable(),
  name: z.string().optional(),
  org_id: z.string().optional().nullable(),
  slug: z.string().optional(),
  subdomain: z.string().optional(),
  updated_at: z.string().optional(),
})

export const getClaimReturnsSchema = jsonSchema

export const getClaimsReturnsSchema = jsonSchema

export const getMyJwtClaimReturnsSchema = jsonSchema

export const getMyJwtClaimsReturnsSchema = jsonSchema

export const organizationRolesSchema = z.union([
  z.literal("OWNER"),
  z.literal("MEMBER"),
])

export const organizationTiersSchema = z.union([
  z.literal("FREE"),
  z.literal("PRO"),
  z.literal("CUSTOM"),
])

export const organizationTypeSchema = z.union([
  z.literal("STARTUP"),
  z.literal("PERSONAL"),
  z.literal("BUSSINESS"),
])

export const subscriptionIntervalSchema = z.union([
  z.literal("day"),
  z.literal("week"),
  z.literal("month"),
  z.literal("year"),
])

export const subscriptionStatusSchema = z.union([
  z.literal("trialing"),
  z.literal("active"),
  z.literal("canceled"),
  z.literal("incomplete"),
  z.literal("incomplete_expired"),
  z.literal("past_due"),
  z.literal("unpaid"),
])

export const organizationRowSchema = z.object({
  created_at: z.string(),
  description: z.string().nullable(),
  id: z.string(),
  image: z.string().nullable(),
  name: z.string(),
  slug: z.string(),
  stripe_id: z.string().nullable(),
  type: organizationTypeSchema.nullable(),
  updated_at: z.string(),
})

export const organizationInsertSchema = z.object({
  created_at: z.string().optional(),
  description: z.string().optional().nullable(),
  id: z.string().optional(),
  image: z.string().optional().nullable(),
  name: z.string(),
  slug: z.string().optional(),
  stripe_id: z.string().optional().nullable(),
  type: organizationTypeSchema.optional().nullable(),
  updated_at: z.string().optional(),
})

export const organizationUpdateSchema = z.object({
  created_at: z.string().optional(),
  description: z.string().optional().nullable(),
  id: z.string().optional(),
  image: z.string().optional().nullable(),
  name: z.string().optional(),
  slug: z.string().optional(),
  stripe_id: z.string().optional().nullable(),
  type: organizationTypeSchema.optional().nullable(),
  updated_at: z.string().optional(),
})

export const organizationProfilesRowSchema = z.object({
  created_at: z.string(),
  id: z.string(),
  is_default: z.boolean(),
  org_id: z.string(),
  profile_id: z.string(),
  role: organizationRolesSchema.nullable(),
  updated_at: z.string(),
})

export const organizationProfilesInsertSchema = z.object({
  created_at: z.string().optional(),
  id: z.string().optional(),
  is_default: z.boolean().optional(),
  org_id: z.string(),
  profile_id: z.string(),
  role: organizationRolesSchema.optional().nullable(),
  updated_at: z.string().optional(),
})

export const organizationProfilesUpdateSchema = z.object({
  created_at: z.string().optional(),
  id: z.string().optional(),
  is_default: z.boolean().optional(),
  org_id: z.string().optional(),
  profile_id: z.string().optional(),
  role: organizationRolesSchema.optional().nullable(),
  updated_at: z.string().optional(),
})

export const organizationSubscriptionsRowSchema = z.object({
  cancel_at: z.string().nullable(),
  cancel_at_period_end: z.boolean().nullable(),
  canceled_at: z.string().nullable(),
  created: z.string(),
  currency: z.string().nullable(),
  current_period_end: z.string(),
  current_period_start: z.string(),
  ended_at: z.string().nullable(),
  id: z.string(),
  interval: subscriptionIntervalSchema.nullable(),
  interval_count: z.number().nullable(),
  metadata: jsonSchema.nullable(),
  org_id: z.string().nullable(),
  price_id: z.string().nullable(),
  quantity: z.number().nullable(),
  status: subscriptionStatusSchema.nullable(),
  tier: organizationTiersSchema.nullable(),
  trial_end: z.string().nullable(),
  trial_start: z.string().nullable(),
})

export const organizationSubscriptionsInsertSchema = z.object({
  cancel_at: z.string().optional().nullable(),
  cancel_at_period_end: z.boolean().optional().nullable(),
  canceled_at: z.string().optional().nullable(),
  created: z.string().optional(),
  currency: z.string().optional().nullable(),
  current_period_end: z.string().optional(),
  current_period_start: z.string().optional(),
  ended_at: z.string().optional().nullable(),
  id: z.string().optional(),
  interval: subscriptionIntervalSchema.optional().nullable(),
  interval_count: z.number().optional().nullable(),
  metadata: jsonSchema.optional().nullable(),
  org_id: z.string().optional().nullable(),
  price_id: z.string().optional().nullable(),
  quantity: z.number().optional().nullable(),
  status: subscriptionStatusSchema.optional().nullable(),
  tier: organizationTiersSchema.optional().nullable(),
  trial_end: z.string().optional().nullable(),
  trial_start: z.string().optional().nullable(),
})

export const organizationSubscriptionsUpdateSchema = z.object({
  cancel_at: z.string().optional().nullable(),
  cancel_at_period_end: z.boolean().optional().nullable(),
  canceled_at: z.string().optional().nullable(),
  created: z.string().optional(),
  currency: z.string().optional().nullable(),
  current_period_end: z.string().optional(),
  current_period_start: z.string().optional(),
  ended_at: z.string().optional().nullable(),
  id: z.string().optional(),
  interval: subscriptionIntervalSchema.optional().nullable(),
  interval_count: z.number().optional().nullable(),
  metadata: jsonSchema.optional().nullable(),
  org_id: z.string().optional().nullable(),
  price_id: z.string().optional().nullable(),
  quantity: z.number().optional().nullable(),
  status: subscriptionStatusSchema.optional().nullable(),
  tier: organizationTiersSchema.optional().nullable(),
  trial_end: z.string().optional().nullable(),
  trial_start: z.string().optional().nullable(),
})

export const dataOrgsRowSchema = z.object({
  is_default: z.boolean().nullable(),
  org_id: z.string().nullable(),
  org_image: z.string().nullable(),
  org_slug: z.string().nullable(),
  org_stripe_id: z.string().nullable(),
  org_type: organizationTypeSchema.nullable(),
  profile_id: z.string().nullable(),
  profiles_org_id: z.string().nullable(),
  role: organizationRolesSchema.nullable(),
  status_subscription: subscriptionStatusSchema.nullable(),
  subscription_canceled_at: z.string().nullable(),
  subscription_ended_at: z.string().nullable(),
  subscription_interval: subscriptionIntervalSchema.nullable(),
  subscription_interval_count: z.number().nullable(),
  subscription_metadata: jsonSchema.nullable(),
  subscription_period_ends: z.string().nullable(),
  subscription_period_starts: z.string().nullable(),
  subscription_trial_ends: z.string().nullable(),
  subscription_trial_starts: z.string().nullable(),
  tier: z.string().nullable(),
})