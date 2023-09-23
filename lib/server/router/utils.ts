import { eq } from "@/lib/db"
import { organizationProfiles, organizations, profiles } from "@/lib/db/schemas"

// TODO: use a package for this

import { Context } from "../trpc"

/**
 * Check if the user has access to the workspace, and return the workspace  and user  otherwise undefined
 * @param  workspaceSlug
 * @param  tenantId
 * @param  ctx - trpc context
 * @returns {Promise<{ workspaceId: string; userId: string }> | undefined} - workspaceId and userId
 */
export const hasUserAccessToWorkspace = async ({
  workspaceSlug,
  ctx,
}: {
  workspaceSlug: string
  ctx: Context
}) => {
  if (!ctx.auth?.userId) return
  const currentUser = ctx.db
    .select()
    .from(profiles)
    .where(eq(profiles.id, ctx.auth?.userId))
    .as("currentUser")

  const currentWorkspace = await ctx.db.query.organizations.findFirst({
    where: eq(organizations.slug, workspaceSlug),
  })

  if (!currentWorkspace) return
  const result = await ctx.db.query.organizations.findFirst({
    where: eq(organizationProfiles.orgId, currentWorkspace.id),
    with: {
      organizationProfiles: {
        where: eq(organizationProfiles.profileId, currentUser.id),
      },
    },
  })
  // the user doesn't have access to this workspace
  if (!result || !result.organizationProfiles) return

  // const plan = (currentWorkspace.plan || "free") as "free" | "pro" // FIXME: that is a hotfix

  return {
    workspace: currentWorkspace,
    user: currentUser,
    // plan: allPlans[plan],
  }
}
