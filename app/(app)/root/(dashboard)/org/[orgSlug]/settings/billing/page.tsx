import { BillingProjects } from "@/components/organizations/billing-projects"
import { db } from "@/lib/db/server"
import { AppClaims } from "@/lib/types"

export default async function IndexPage({
  params: { orgSlug },
}: {
  params: {
    orgSlug: string
  }
}) {
  const {
    data: { session },
  } = await db().auth.getSession()

  const appClaims = session?.user.app_metadata as AppClaims
  const orgClaims = appClaims?.organizations
  let orgId = ""

  for (const key in orgClaims) {
    if (Object.prototype.hasOwnProperty.call(orgClaims, key)) {
      if (orgClaims[key].slug === orgSlug) {
        orgId = key
      }
    }
  }

  // We use orgId just to ensure we filter the right projects but even if we don't
  // use it, there is RLS in the database that will check that for us
  const { data: projects, error } = await db()
    .from("data_projects")
    .select("*")
    .eq("org_slug", orgSlug)
    .eq("org_id", orgId)

  // TODO: handle error and not found

  return <BillingProjects projects={projects || []} />
}
