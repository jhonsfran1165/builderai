"use client"

import { useRouter } from "next/navigation"
import { use, useCallback, useEffect } from "react"

import { db } from "@/lib/db/browser"
import { refreshJWT } from "@/lib/db/jwt-refresher"
import { AppClaims } from "@/lib/types"
import { getOrgsFromClaims } from "@/lib/utils"

// this component handles refreshing server data when the user logs in or out
// this method avoids the need to pass a session down to child components
// in order to re-render when the user's session changes
export function DataBaseClientListener() {
  const router = useRouter()
  const database = db() // TODO: all calls to the db has to be like this

  const { data: { session } } = use(database.auth.getSession())
  const profileId = session?.user.id
  const appClaims = session?.user.app_metadata as AppClaims

  const { allOrgIds } = getOrgsFromClaims({ appClaims })
  const filterOrgIds = allOrgIds.join(", ")

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

  // useEffect(() => {
  //   const {
  //     data: { subscription },
  //   } = database.auth.onAuthStateChange((event, session) => {
  //     console.log(event)
  //     if (session?.access_token !== serverAccessToken) {
  //       router.refresh()
  //     }
  //   })

  //   return () => {
  //     subscription.unsubscribe()
  //   }
  // }, [serverAccessToken, router, database])

  return null
}
