import { MembersList } from "@/components/organizations/members"
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

  const { data: profiles, error } = await db
    .from("organization_profiles")
    .select("*, profile!inner(*)")
    .eq("org_id", orgId)

  return <MembersList profiles={profiles || []} />
}
