"use client"

import MaxWidthWrapper from "@/components/shared/max-width-wrapper"
import { Skeleton } from "@/components/ui/skeleton"
import { useStore } from "@/lib/stores/layout"

export default function HeaderContext() {
  const { contextHeader, activeTab } = useStore()

  if (activeTab?.headerDisabled) {
    return null
  }

  return (
    <section>
      <div className="z-30 flex h-36 items-center border-b bg-background-bg text-background-textContrast">
        <MaxWidthWrapper className="max-w-screen-2xl">
          <div className="flex items-center justify-between">
            <h1 className="pl-5 text-2xl">{contextHeader || <Skeleton className="h-[25px] w-[90px]" />}</h1>
          </div>
        </MaxWidthWrapper>
      </div>
    </section>
  )
}
