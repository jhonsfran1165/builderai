import { createInsertSchema, createSelectSchema } from "drizzle-zod"
import { z } from "zod"

import * as schema from "../schema"
import { customerSelectSchema } from "./customer"

export const subscriptionSelectSchema = createSelectSchema(schema.subscriptions)
export const subscriptionInsertSchema = createInsertSchema(schema.subscriptions)

export const createSubscriptionSchema = subscriptionSelectSchema
  .pick({
    planVersionId: true,
    customerId: true,
    planId: true,
  })
  .extend({
    projectSlug: z.string(),
  })

export const subscriptionWithCustomerSchema = subscriptionSelectSchema.extend({
  customer: customerSelectSchema,
})

export type Subscription = z.infer<typeof subscriptionSelectSchema>
export type CreateSubscription = z.infer<typeof createSubscriptionSchema>
