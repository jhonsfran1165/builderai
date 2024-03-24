import { Suspense } from "react"
import { cookies } from "next/headers"
import { notFound } from "next/navigation"
import { PlusIcon } from "lucide-react"

import { cn } from "@builderai/ui"
import { Button } from "@builderai/ui/button"
import { Separator } from "@builderai/ui/separator"

import { api } from "~/trpc/server"
import { FeatureConfig } from "./feature-config"
import { FeatureDialog } from "./feature-dialog"
import { FeatureList } from "./feature-list"
import { PlanFeatureTabs } from "./plan-feature-tabs"
import { ResizablePanelConfig } from "./resizable"
import type { PlanFeaturesList } from "./use-features"

interface PlanVersionConfiguratorProps {
  isCreatingNewVersion?: boolean
  planSlug: string
  planVersionId: string
}

export async function PlanVersionConfigurator({
  isCreatingNewVersion,
  planSlug,
  planVersionId,
}: PlanVersionConfiguratorProps) {
  // TODOS:
  // - activeFeature
  // - planFeatures
  // - config layout resizable
  const layout = cookies().get("react-resizable-panels:layout")

  let initialFeatures = {} as PlanFeaturesList

  if (!isCreatingNewVersion) {
    const { planVersion } = await api.plans.getVersionById({
      versionId: Number(planVersionId),
      planSlug,
    })

    if (!planVersion) {
      notFound()
    }

    initialFeatures = {
      planFeatures: planVersion.featuresConfig ?? [],
      planAddons: planVersion.addonsConfig ?? [],
      validConfig: true,
    }
  } else {
    initialFeatures = {
      planFeatures: [],
      planAddons: [],
      validConfig: false,
    }
  }

  console.log("initialFeatures", initialFeatures)

  // TODO: fix this
  const defaultLayout = layout ? JSON.parse(layout.value ?? 0) : [265, 440, 655]

  return (
    <ResizablePanelConfig
      defaultLayout={defaultLayout}
      featureList={
        <>
          <div
            className={cn("flex h-[52px] items-center justify-between px-4")}
          >
            <h1 className="truncate text-xl font-bold">All features</h1>
            <FeatureDialog>
              <Button variant="ghost" size="icon">
                <PlusIcon className="h-4 w-4" />
              </Button>
            </FeatureDialog>
          </div>

          <Separator />

          <Suspense fallback={null}>
            <FeatureList featuresPromise={api.features.listByActiveProject()} />
          </Suspense>
        </>
      }
      planFeatureList={<PlanFeatureTabs initialFeatures={initialFeatures} />}
      featureConfig={<FeatureConfig feature={null} />}
    />
  )
}
