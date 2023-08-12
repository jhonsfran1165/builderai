import { WrapperLink } from "@/components/shared/wrapper-link"
import type { DashboardNavItem } from "@/lib/types/index"
import { cn } from "@/lib/utils"

export const Tab = ({
  tab,
  pathPrefix,
  activeTab,
}: {
  tab: DashboardNavItem
  activeTab: DashboardNavItem | null
  pathPrefix?: string
}) => {
  const tabPath = pathPrefix + tab.href
  const active = activeTab?.href === tab.href || false

  if (!tab) {
    return null
  }

  return (
    <WrapperLink
      href={tab?.disabled ? "#" : tabPath}
      className={cn("border-b-2 p-1", {
        "border-primary-solid": active,
        "border-transparent": !active,
        "cursor-not-allowed ": tab.disabled,
      })}
    >
      <div className="button-ghost rounded-md px-3 py-2 transition-all duration-75">
        <p
          className={cn(" text-sm", {
            "text-background-textContrast hover:text-background-textContrast": active,
            "text-muted hover:text-muted": tab.disabled,
          })}
        >
          {tab.title}
        </p>
      </div>
    </WrapperLink>
  )
}
