import { Avatar, AvatarFallback } from "@builderai/ui/avatar"
import { Button } from "@builderai/ui/button"
import { Skeleton } from "@builderai/ui/skeleton"

export function WorkspaceSwitcherSkeleton() {
  return (
    <Button
      variant="ghost"
      size="sm"
      role="combobox"
      aria-label="Select a workspace"
      className="w-44 justify-between"
    >
      <Avatar className="mr-2 h-5 w-5">
        <AvatarFallback>
          <Skeleton className="aspect-square h-full w-full bg-background-bgHover" />
        </AvatarFallback>
      </Avatar>
      <Skeleton className="h-[20px] w-full bg-background-bgHover" />
      <Skeleton className="ml-2 h-4 w-4 shrink-0 bg-background-bgHover" />
    </Button>
  )
}
