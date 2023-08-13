"use client"

import { Tab } from "@/components/layout/tab"
import { useStore } from "@/lib/stores/layout"
import { ScrollArea, ScrollBar } from "../ui/scroll-area"

export const TabsNav = () => {
  const { activeTabs: tabs, activePathPrefix, activeTab, orgSlug } = useStore()

  if (!orgSlug) return null

  return (
    <div className="flex h-12 items-center justify-start bg-background-bgSubtle">
      <ScrollArea className="h-13 -mb-1 max-w-[600px] lg:max-w-none">
        <nav className="flex items-center gap-2">
          {tabs.length > 0 &&
            tabs.map((tab, index) => (
              <Tab
                key={tab.slug + index}
                tab={tab}
                pathPrefix={activePathPrefix}
                activeTab={activeTab}
              />
            ))}
        </nav>
        <ScrollBar orientation="horizontal" className="invisible" />
      </ScrollArea>
    </div>
  )
}
