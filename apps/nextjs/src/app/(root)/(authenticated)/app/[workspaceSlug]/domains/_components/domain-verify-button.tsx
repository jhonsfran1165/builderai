"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"

import { Button } from "@unprice/ui/button"
import { LoadingAnimation } from "@unprice/ui/loading-animation"

import { api } from "~/trpc/client"

export const VerifyDomainButton = ({ domain }: { domain: string }) => {
  const router = useRouter()
  const { data, isLoading, refetch, isRefetching } = api.domains.verify.useQuery(
    { domain },
    {
      refetchInterval: (query) =>
        query.state.data?.status === "Valid Configuration" ? false : 5000,
    }
  )

  useEffect(() => {
    if (data?.status === "Valid Configuration") {
      // update server-side cache
      router.refresh()
    }
  }, [data?.status])

  if (isLoading || isRefetching) {
    return (
      <Button variant="ghost">
        <LoadingAnimation />
      </Button>
    )
  }

  return (
    <Button
      variant="ghost"
      onClick={async (e) => {
        e.preventDefault()
        await refetch()
        router.refresh()
      }}
    >
      Refresh
    </Button>
  )
}
