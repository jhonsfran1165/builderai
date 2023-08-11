"use client"

import MaxWidthWrapper from "@/components/shared/max-width-wrapper"
import { useStore } from "@/lib/stores/layout"

export default function HeaderContext() {
  const { contextHeader, orgSlug } = useStore()

  if (!orgSlug) return null

  return (
    <section>
      <div className="bg-background-bg text-background-textContrast z-30 flex h-36 items-center border-b">
        <MaxWidthWrapper className="max-w-screen-2xl">
          <div className="flex items-center justify-between">
            <h1 className="pl-5 text-2xl">{contextHeader}</h1>
          </div>
        </MaxWidthWrapper>
      </div>
    </section>
  )
}
