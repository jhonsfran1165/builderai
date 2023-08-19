"use client"

import { Tab } from "@/components/layout/tab"
import { useStore } from "@/lib/stores/layout"
import { useSelectedLayoutSegments } from "next/navigation"
import { ScrollArea, ScrollBar } from "../ui/scroll-area"
import { Skeleton } from "../ui/skeleton"

export const TabsNav = () => {
  const { activeTabs: tabs, activePathPrefix, activeTab } = useStore()
  const segments = useSelectedLayoutSegments()

  // no tabs if there is only one segment
  if (segments.length <= 1) {
    return null
  }

  return (
    <div className="flex h-12 items-center justify-start bg-background-bgSubtle">
      <ScrollArea className="h-13 -mb-1 max-w-[600px] lg:max-w-none">
        <nav className="flex items-center gap-2">
          {tabs.length > 0 ?
            tabs.map((tab, index) => (
              <Tab
                key={tab.slug + index + tab.title}
                tab={tab}
                pathPrefix={activePathPrefix}
                activeTab={activeTab}
              />
            )) : Array.from({ length: 4 }).map((_, i) =>
              <Skeleton className="mx-2 h-[21px] w-[54px]" />)}
        </nav>
        <ScrollBar orientation="horizontal" className="invisible" />
      </ScrollArea>
    </div>
  )
}
