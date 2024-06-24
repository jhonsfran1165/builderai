import Link from "next/link"

import type { Session } from "@builderai/auth/server"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@builderai/ui/dropdown-menu"
import { CreditCard, LogOut, Settings, User } from "@builderai/ui/icons"

import { ExternalLink } from "lucide-react"
import { AUTH_ROUTES } from "~/constants"
import { SuperLink } from "../super-link"
import { ThemeToggleItems } from "./theme-toggle"

export default async function UserProfile({
  children,
  align = "center",
  session,
}: {
  children: React.ReactNode
  align?: "center" | "start" | "end"
  session: Session
}) {
  if (!session?.user) {
    return null
  }

  const personalWorkspace = session.user.workspaces.find((wk) => wk.isPersonal)
  const user = session.user

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>

      <DropdownMenuContent
        className="max-h-[--radix-dropdown-menu-content-available-height] w-[--radix-dropdown-menu-content-width]"
        align={align}
      >
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="truncate text-sm font-medium leading-none">{user.name ?? user.email}</p>
            <p className="text-muted-foreground truncate text-xs leading-none">{user.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <ThemeToggleItems />
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            {/* // TODO: this should redirect to the user's profile */}
            <SuperLink href={`/${personalWorkspace?.slug}/settings`}>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </SuperLink>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <SuperLink href={`/${personalWorkspace?.slug}/billing`}>
              <CreditCard className="mr-2 h-4 w-4" />
              <span>Billing</span>
              <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
            </SuperLink>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <SuperLink href={`/${personalWorkspace?.slug}/settings`}>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
              <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
            </SuperLink>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            Changelog
            <ExternalLink className="mb-1 ml-1 size-2.5 shrink-0" aria-hidden="true" />
          </DropdownMenuItem>
          <DropdownMenuItem>
            Documentation
            <ExternalLink className="mb-1 ml-1 size-2.5 shrink-0" aria-hidden="true" />
          </DropdownMenuItem>
          <DropdownMenuItem>
            Join Slack community
            <ExternalLink className="mb-1 ml-1 size-2.5 shrink-0" aria-hidden="true" />
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href={`${AUTH_ROUTES.SIGNOUT}`}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
