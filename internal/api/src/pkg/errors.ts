import { z } from "zod"

import { BaseError } from "@unprice/error"

export const apiCustomerErrorSchema = z.enum([
  "SUBSCRIPTION_EXPIRED",
  "SUBSCRIPTION_NOT_ACTIVE",
  "FEATURE_NOT_FOUND_IN_SUBSCRIPTION",
  "CUSTOMER_HAS_NO_SUBSCRIPTIONS",
  "CUSTOMER_NOT_FOUND",
  "FEATURE_TYPE_NOT_SUPPORTED",
  "FEATURE_IS_NOT_USAGE_TYPE",
  "FEATURE_HAS_NO_USAGE_RECORD",
  "FEATURE_NOT_SUPPORT_USAGE",
  "UNHANDLED_ERROR",
])

export const apiKeyErrorSchema = z.enum([
  "NOT_FOUND",
  "REVOKED",
  "EXPIRED",
  "PROJECT_DISABLED",
  "WORKSPACE_DISABLED",
  "UNHANDLED_ERROR",
])

export const deniedReasonSchema = z.enum([
  "RATE_LIMITED",
  "USAGE_EXCEEDED",
  "FEATURE_NOT_FOUND_IN_SUBSCRIPTION",
  "FEATURE_HAS_NO_USAGE_RECORD",
])

export type ApiCustomerError = z.infer<typeof apiCustomerErrorSchema>
export type ApiKeyError = z.infer<typeof apiKeyErrorSchema>
export type DenyReason = z.infer<typeof deniedReasonSchema>

export class UnPriceCustomerError extends BaseError<{ customerId: string }> {
  public readonly retry = false
  public readonly name = UnPriceCustomerError.name
  public readonly code: ApiCustomerError

  constructor({
    code,
    customerId,
  }: {
    code: ApiCustomerError
    customerId: string
  }) {
    super({
      message: "Customer API error",
      context: {
        customerId,
      },
    })
    this.code = code
  }
}

export class UnPriceApiKeyError extends BaseError<{ customerId: string }> {
  public readonly retry = false
  public readonly name = UnPriceApiKeyError.name
  public readonly code: ApiKeyError

  constructor({
    code,
  }: {
    code: ApiKeyError
  }) {
    super({
      message: "Apikey API error",
    })
    this.code = code
  }
}
