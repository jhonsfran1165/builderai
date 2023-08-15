import { redirect } from "next/navigation"

import { db } from "@/lib/db/server"
import { AppClaims } from "@/lib/types"
import { getOrgsFromClaims } from "@/lib/utils"

export const revalidate = 0

export default async function RootPage() {
  const {
    data: { session },
  } = await db().auth.getSession()

  const appClaims = session?.user.app_metadata as AppClaims
  const { currentOrg, defaultOrgSlug } = getOrgsFromClaims({ appClaims })

  if (currentOrg?.slug) {
    redirect(`/org/${currentOrg?.slug}`)
  }

  if (defaultOrgSlug) {
    redirect(`/org/${defaultOrgSlug}`)
  } else {
    redirect(`/org`)
  }
}
