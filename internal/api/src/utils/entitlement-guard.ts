import { TRPCError } from "@trpc/server"

import type { ProjectExtended } from "@unprice/db/validators"

import type { Context } from "../trpc"
import { getEntitlements } from "./shared"

export const entitlementGuard = async ({
  project,
  ctx,
  featureSlug,
}: {
  project: ProjectExtended
  ctx: Context
  featureSlug: string
}) => {
  const unpriceCustomerId = project.workspace.unPriceCustomerId

  // TODO: check this later
  if (!unpriceCustomerId) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "This feature is not available for free plans",
    })
  }

  const entitlements = await getEntitlements({
    customerId: unpriceCustomerId,
    projectId: project.id,
    ctx: ctx,
  })

  const access = entitlements.includes(featureSlug)

  if (!access) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "You don't have access to this feature, please upgrade your plan",
    })
  }

  return entitlements
}
