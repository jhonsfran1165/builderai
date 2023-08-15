import { notFound } from "next/navigation"

import { db } from "@/lib/db/server"
import { AppClaims } from "@/lib/types"

export const revalidate = 0

// validate claims and redirect to org if it exists
// from resources perspective, this is only checking the cookie, no db calls
export default async function DashboardLayout({
  children,
  params: { orgSlug },
}: {
  children: React.ReactNode
  params: {
    orgSlug: string
  }
}) {

  const {
    data: { session },
  } = await db().auth.getSession()

  const appClaims = session?.user.app_metadata as AppClaims
  const orgClaims = appClaims?.organizations
  let orgExist = false

  for (const key in orgClaims) {
    if (Object.prototype.hasOwnProperty.call(orgClaims, key)) {
      if (orgClaims[key].slug === orgSlug) {
        orgExist = true
      }
    }
  }

  if (!orgExist) {
    notFound()
  }

  return <>{children}</>
}
