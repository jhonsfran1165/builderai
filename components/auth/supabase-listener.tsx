"use client"

import { useRouter } from "next/navigation"
import { useCallback, useEffect } from "react"

import { db } from "@/lib/db/browser"
import { refreshJWT } from "@/lib/db/jwt-refresher"

// this component handles refreshing server data when the user logs in or out
// this method avoids the need to pass a session down to child components
// in order to re-render when the user's session changes
export default function SupabaseListener({
  serverAccessToken,
  orgIdsBelongToUser,
  profileId,
}: {
  serverAccessToken?: string
  orgIdsBelongToUser: Array<string>
  profileId?: string
}) {
  const router = useRouter()
  const filterOrgIds = orgIdsBelongToUser.join(", ")
  const database = db()

  const handleRefreshToken = useCallback(async (_payload: any) => {
    await refreshJWT(database)
  }, [database])

  // hacky approach to refresh JWT token from the server
  // TODO: evaluate the performance impact of this approach
  useEffect(() => {
    const channel = database
      .channel("org-db-changes")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "organization_subscriptions",
          filter: `org_id=in.(${filterOrgIds})`,
        },
        handleRefreshToken
      )
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "organization_subscriptions",
          filter: `org_id=in.(${filterOrgIds})`,
        },
        handleRefreshToken
      )
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "organization_profiles",
          filter: profileId ? `profile_id=eq.${profileId}` : "",
        },
        handleRefreshToken
      )
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "organization",
          filter: `id=in.(${filterOrgIds})`,
        },
        handleRefreshToken
      )
      .subscribe()

    return () => {
      database.removeChannel(channel)
    }
  }, [handleRefreshToken, filterOrgIds, profileId, database])

  useEffect(() => {
    const {
      data: { subscription },
    } = database.auth.onAuthStateChange((event, session) => {
      console.log(event)
      if (session?.access_token !== serverAccessToken) {
        router.refresh()
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [serverAccessToken, router, database])

  return null
}
