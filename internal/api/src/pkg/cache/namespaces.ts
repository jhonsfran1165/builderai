import type {
  AggregationMethod,
  ApiKeyExtended,
  FeatureType,
  Month,
  SubscriptionItem,
  Year,
} from "@unprice/db/validators"

export type CurrentUsageCached = {
  usage: number
  limit: number | null
  month: Month
  year: Year
  updatedAt: number
}

export type SubscriptionItemCached = Omit<SubscriptionItem, "createdAt" | "updatedAt"> & {
  featureType: FeatureType
  aggregationMethod: AggregationMethod
}

export type CacheNamespaces = {
  apiKeyByHash: ApiKeyExtended | null
  customerFeatureCurrentUsage: CurrentUsageCached | null
  featureByCustomerId: SubscriptionItemCached | null
  subscriptionsByCustomerId: Array<string>
  entitlementsByCustomerId: Array<string>
  idempotentRequestUsageByHash: boolean
}

export type CacheNamespace = keyof CacheNamespaces
