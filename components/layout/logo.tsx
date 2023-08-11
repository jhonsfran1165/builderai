import { Icons } from "@/components/shared/icons"
import { layoutConfig } from "@/lib/config/layout"
import { cn } from "@/lib/utils"

export function Logo({ className = "" }) {
  return (
    <div className="text-primary-text hidden items-center justify-center space-x-2 md:flex">
      <Icons.logo className={cn("h-6 w-6", className)} />
      <span
        className={cn(
          "font-satoshi hidden font-bold sm:inline-block",
          className
        )}
      >
        {layoutConfig.name}
      </span>
    </div>
  )
}
