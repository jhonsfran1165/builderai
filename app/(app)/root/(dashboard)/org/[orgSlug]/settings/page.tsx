import { notFound } from "next/navigation"

import { OrganizationDelete } from "@/components/organizations/organization-delete"
import { OrganizationForm } from "@/components/organizations/organization-form"
import { OrganizationMakeDefault } from "@/components/organizations/organization-make-default"
import { db } from "@/lib/db/server"
import { AppClaims } from "@/lib/types"

export const revalidate = 0

export default async function OrgSettingsIndexPage({
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

  const { data: organization, error } = await db()
    .from("organization")
    .select("*")
    .eq("slug", orgSlug)
    .single()

  if (!organization) notFound()
  // TODO: handle the error properly
  if (error) notFound()

  let defaultOrgSlug = ""

  for (const key in orgClaims) {
    if (Object.prototype.hasOwnProperty.call(orgClaims, key)) {
      const org = orgClaims[key]

      if (org.is_default) {
        defaultOrgSlug = org.slug
      }
    }
  }

  return (
    <div className="space-y-10 md:px-0">
      <OrganizationForm org={organization} />

      <OrganizationMakeDefault
        orgSlug={organization.slug}
        id={organization.id}
        isDefault={defaultOrgSlug === organization.slug}
      />

      <OrganizationDelete
        orgSlug={organization.slug}
        id={organization.id}
        isDefault={defaultOrgSlug === organization.slug}
      />
    </div>
  )
}
