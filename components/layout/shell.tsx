"use client"

import { usePathname } from "next/navigation"
import { ReactNode } from "react"

import { DashboardSideBarNav } from "@/components/layout/sidebar-nav"
import MaxWidthWrapper from "@/components/shared/max-width-wrapper"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useStore } from "@/lib/stores/layout"

export function DashboardShell({
  children,
}: {
  children?: ReactNode
}) {
  const { activeTab, activePathPrefix } = useStore()
  const pathName = usePathname()
  const items = activeTab?.sidebarNav || []

  return (
    <ScrollArea>
      <MaxWidthWrapper className="max-w-screen-2xl pt-10">
        {items ? (
          <div className="grid gap-5 md:grid-cols-[250px_1fr]">
            <aside className="min-w-full flex-col md:flex md:w-[250px]">
              <DashboardSideBarNav
                pathName={pathName ?? ""}
                items={items}
                pathPrefix={activePathPrefix}
              />
            </aside>
            <div className="flex w-full flex-1 flex-col">{children}</div>
          </div>
        ) : (
          <div className="flex w-full flex-1 flex-col">{children}</div>
        )}
      </MaxWidthWrapper>
    </ScrollArea>
  )
}
