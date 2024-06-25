import type { ProjectExtended } from "@builderai/db/validators"

import { TRPCError } from "@trpc/server"
import type { Context } from "../trpc"
import { verifyFeature } from "./shared"

export const featureGuard = async ({
  project,
  featureSlug,
  ctx,
}: {
  project: ProjectExtended
  featureSlug: string
  ctx: Context
}) => {
  const unpriceCustomerId = project.workspace.unPriceCustomerId

  const result = await verifyFeature({
    customerId: unpriceCustomerId,
    featureSlug: featureSlug,
    projectId: project.id,
    ctx: ctx,
  })

  if (!result.access) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: `You don't have access to this feature ${result.deniedReason}`,
    })
  }

  return result
}
