import { Site } from "@/lib/types/supabase"
import MaxWidthWrapper from "@/components/shared/max-width-wrapper"
import { SiteCard } from "@/components/shared/sites/site-card"
import { SiteSkeleton } from "@/components/shared/sites/site-skeleton"
import NoSitesPlaceholder from "./no-sites-placeholder"

export function SitesContainer({
  isLoading,
  sites,
}: {
  isLoading?: boolean
  sites?: Site[]
}) {
  return (
    <MaxWidthWrapper className="pt-10">
      {isLoading ? (
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <SiteSkeleton isLoading={true} key={i} />
            ))}
          </div>
        </div>
      ) : sites && sites.length > 0 ? (
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {sites?.map((site) => (
              <SiteCard key={site.id} site={site} />
            ))}
          </div>
        </div>
      ) : (
        <NoSitesPlaceholder />
      )}
    </MaxWidthWrapper>
  )
}
