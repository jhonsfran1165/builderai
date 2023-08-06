import { getPageHits, getPageVisits } from "@/lib/tinybird"
import Dashboard from "@/components/analytics/dashboard"

export default async function AppInitialPage({
  searchParams: { action },
}: {
  searchParams: {
    action?: string
  }
}) {
  return <Dashboard fetchData={getPageVisits({})} />
}
