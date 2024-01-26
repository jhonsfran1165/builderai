"use client"

import { useState } from "react"
import type { UniqueIdentifier } from "@dnd-kit/core"

import { Search } from "@builderai/ui/icons"
import { Input } from "@builderai/ui/input"
import { ScrollArea, ScrollBar } from "@builderai/ui/scroll-area"
import { Separator } from "@builderai/ui/separator"
import { cn } from "@builderai/ui/utils"

import { useDebounce } from "~/lib/use-debounce"
import { api } from "~/trpc/client"
import { FeatureForm } from "./feature-form"
import { SortableFeature } from "./sortable-feature"

interface FeaturesProps extends React.HTMLAttributes<HTMLDivElement> {
  selectedFeaturesIds: UniqueIdentifier[]
  projectSlug: string
}

export function Features({
  className,
  selectedFeaturesIds,
  projectSlug,
}: FeaturesProps) {
  const [search, setSearch] = useState("")

  const debouncedSearch = useDebounce(search, 500)

  const { data, isLoading } = api.feature.searchBy.useQuery({
    projectSlug: projectSlug,
    search: debouncedSearch,
  })

  const dbFeatures = data?.feature ?? []

  const searchableFeatures = dbFeatures.filter((feature) => {
    return !selectedFeaturesIds.includes(feature.id)
  })

  return (
    <div className={cn("flex flex-1 flex-col overflow-y-auto", className)}>
      <div className="flex items-center px-4 py-2">
        <h1 className="text-xl font-bold">Features</h1>
      </div>
      <Separator />
      <div className="flex flex-row items-center space-x-1 p-4 backdrop-blur">
        <form className="w-full">
          <div className="relative">
            <Search className="absolute left-2 top-2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search"
              className="h-8 pl-8"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </form>
        <FeatureForm projectSlug={projectSlug} mode={"create"} />
      </div>
      <ScrollArea className="max-h-[750px] flex-1 overflow-y-auto">
        <div className="px-4 py-2">
          <div className="space-y-2">
            {searchableFeatures?.map((feature) => (
              <SortableFeature
                isFeature
                key={feature.id}
                feature={feature}
                projectSlug={projectSlug}
              />
            ))}
          </div>
        </div>
        <ScrollBar orientation="vertical" />
      </ScrollArea>
    </div>
  )
}