import { CardsStats } from "@/components/analytics/stats"
import { CardsMetric } from "@/components/analytics/test"
import { OrganizationContainer } from "@/components/organizations/organization-container"
import { Pricing } from "@/components/shared/pricing"

export default async function AppInitialPage({
  searchParams: { action },
}: {
  searchParams: {
    action?: string
  }
}) {
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
