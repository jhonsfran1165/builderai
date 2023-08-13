"use client"

import { useRouter } from "next/navigation"
import { useCallback, useEffect } from "react"

import { useSupabase } from "@/components/auth/supabase-provider"
import { refreshJWT } from "@/lib/utils/jwt-refresher"

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
  const { supabase } = useSupabase()
  const router = useRouter()

  const filterOrgIds = orgIdsBelongToUser.join(", ")

  const handleRefreshToken = useCallback(async (_payload: any) => {
    await refreshJWT(supabase)
  }, [supabase])

  // hacky approach to refresh JWT token from the server
  // TODO: evaluate the performance impact of this approach
  useEffect(() => {
    const channel = supabase
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
      supabase.removeChannel(channel)
    }
  }, [handleRefreshToken, filterOrgIds, profileId, supabase])

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      console.log(event)
      if (session?.access_token !== serverAccessToken) {
        router.refresh()
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [serverAccessToken, router, supabase])

  return null
}
