import { Logo as LogoIcon } from "@unprice/ui/icons"
import { cn } from "@unprice/ui/utils"

export function Logo({ className = "" }) {
  return (
    <div className="flex items-center justify-start space-x-4 text-primary-text">
      <LogoIcon className={cn("size-6", className)} />
      <span
        className={cn("inline-block whitespace-nowrap font-bold text-lg tracking-tight", className)}
      >
        Unprice
      </span>
    </div>
  )
}
