"use client"

import { use, useState } from "react"
import { FileStack, Search } from "lucide-react"

import type { RouterOutputs } from "@builderai/api"
import type { PlanVersionFeature } from "@builderai/db/validators"
import { Button } from "@builderai/ui/button"
import { Input } from "@builderai/ui/input"
import { ScrollArea } from "@builderai/ui/scroll-area"

import { EmptyPlaceholder } from "~/components/empty-placeholder"
import { useDebounce } from "~/lib/use-debounce"
import { api } from "~/trpc/client"
import { FeatureDialog } from "../../_components/feature-dialog"
import { SortableFeature } from "../../_components/sortable-feature"
import { usePlanFeaturesList } from "../../_components/use-features"

interface FeatureListProps {
  featuresPromise: Promise<RouterOutputs["features"]["searchBy"]>
}

export function FeatureList({ featuresPromise }: FeatureListProps) {
  const initialFeatures = use(featuresPromise)
  const [filter, setFilter] = useState("")
  const filterDebounce = useDebounce(filter, 500)

  const [planFeatures] = usePlanFeaturesList()

  const activeFeatures = [...planFeatures.planFeatures]

  const { data, isFetching } = api.features.searchBy.useQuery(
    {
      search: filterDebounce,
    },
    {
      staleTime: 0,
      initialData: initialFeatures,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    }
  )

  const planFeatureIds = activeFeatures.map((feature) => feature.id)

  const searchableFeatures = data.features.filter(
    (feature) => !planFeatureIds.includes(feature.id)
  )

  return (
    <>
      <div className="bg-background/95 supports-[backdrop-filter]:bg-background/60 p-4 backdrop-blur">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search feature"
            className="pl-8"
            onChange={(e) => {
              setFilter(e.target.value)
            }}
          />
        </div>
      </div>
      <ScrollArea className="h-[750px] pb-4">
        <div className="flex h-[730px] flex-col gap-2 px-4 pt-0">
          {isFetching && (
            <div className="flex h-full items-center justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-primary"></div>
            </div>
          )}
          {!isFetching && searchableFeatures.length === 0 ? (
            <EmptyPlaceholder>
              <EmptyPlaceholder.Icon>
                <FileStack className="h-8 w-8" />
              </EmptyPlaceholder.Icon>
              <EmptyPlaceholder.Title>No features found</EmptyPlaceholder.Title>
              <EmptyPlaceholder.Description>
                Create feature
              </EmptyPlaceholder.Description>
              <EmptyPlaceholder.Action>
                <FeatureDialog
                  defaultValues={{
                    title: filterDebounce,
                    slug: filterDebounce,
                    description: "",
                  }}
                >
                  <Button size={"sm"}>Create feature</Button>
                </FeatureDialog>
              </EmptyPlaceholder.Action>
            </EmptyPlaceholder>
          ) : (
            !isFetching &&
            searchableFeatures.map((feature, index) => (
              <SortableFeature
                key={index}
                mode={"Feature"}
                // TODO: default all features to flat type free?
                feature={
                  {
                    id: feature.id,
                    title: feature.title,
                    description: feature.description,
                    slug: feature.slug,
                    type: "flat",
                    config: {
                      price: 0,
                    },
                  } as PlanVersionFeature
                }
                variant={"feature"}
              />
            ))
          )}
        </div>
      </ScrollArea>
    </>
  )
}