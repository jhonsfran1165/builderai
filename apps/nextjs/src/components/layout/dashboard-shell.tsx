import type React from "react"

import { cn } from "@unprice/ui/utils"
import MaxWidthWrapper from "./max-width-wrapper"

export function DashboardShell(props: {
  children: React.ReactNode
  className?: string
  header?: React.ReactNode
  aside?: React.ReactNode
}) {
  return (
    <MaxWidthWrapper className="overflow-x-hidden">
      <div className={cn("flex flex-col gap-8", props.className)}>
        <div className="flex flex-1 flex-col space-y-6 px-0 md:space-y-8 md:py-4">
          {props.header && props.header}

          <div className="flex flex-1 flex-col space-y-8">{props.children}</div>
        </div>
        {props.aside && <div className="flex flex-col">{props.aside}</div>}
      </div>
    </MaxWidthWrapper>
  )
}
