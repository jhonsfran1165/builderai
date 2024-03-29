import { cn } from "@builderai/ui"
import { Logo as LogoIcon } from "@builderai/ui/icons"

export function Logo({ className = "" }) {
  return (
    <div className="flex items-center justify-center space-x-8 text-primary-text">
      <LogoIcon className={cn("h-6 w-6", className)} />
      <span
        className={cn(
          "hidden whitespace-nowrap text-lg font-bold tracking-tight sm:inline-block md:block",
          className
        )}
      >
        BuilderAI
      </span>
    </div>
  )
}
