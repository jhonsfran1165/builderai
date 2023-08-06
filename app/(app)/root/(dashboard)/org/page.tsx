import Dashboard from "@/components/analytics/dashboard"
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
  } else if (action === "tremor") {
    return <Dashboard />
  } else {
    return <OrganizationContainer />
  }
}
