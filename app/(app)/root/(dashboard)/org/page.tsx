import { CardsStats } from "@/components/analytics/stats"
import { CardsMetric } from "@/components/analytics/test"
import { OrganizationContainer } from "@/components/organizations/organization-container"
import { Pricing } from "@/components/shared/pricing"
import { authTxn } from "@/lib/db"
import { organization_profiles } from "@/lib/db/schemas/organization_profiles"
import { db } from "@/lib/db/server"
// import { cookies } from 'next/headers'
import { api } from "lib/trpc/server"

export default async function AppInitialPage({
  searchParams: { action },
}: {
  searchParams: {
    action?: string
  }
}) {

  console.log(await api.userById.query(1))
  // const cookieStore = cookies()
  // const supabaseJWT = cookieStore.get("sb-localhost-auth-token")
  // console.log(JSON.parse(supabaseJWT?.value || "{}")[0])

  const {
    data: { session },
  } = await db().auth.getSession()

  if (session) {
    const data = await authTxn((tx) => {
      return tx.select().from(organization_profiles)
    })

    console.log("data")
    console.log(data)
  }

  if (action === "pricing") {
    // TODO: delete - just testing some components
    return <Pricing />
  } else if (action === "metrics") {
    return <CardsMetric />
  } else if (action === "stats") {
    return <CardsStats />
  } else {
    return <OrganizationContainer />
  }
}
