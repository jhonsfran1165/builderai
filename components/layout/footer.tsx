import Link from "next/link"

import { layoutConfig } from "@/lib/config/layout"
import { Logo } from "@/components/layout/logo"
import { ThemeToggle } from "@/components/layout/theme-toggle"
import { Icons } from "@/components/shared/icons"
import MaxWidthWrapper from "@/components/shared/max-width-wrapper"
import { Button } from "@/components/ui/button"

export function Footer() {
  return (
    <footer>
      <div className="min-w-full flex flex-col items-center justify-between gap-4 border-t bg-background-bgSubtle py-4 z-30 mt-10 md:h-16 md:flex-row md:py-0">
        <MaxWidthWrapper className="max-w-screen-2xl">
          <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
            <div className="flex flex-col items-center text-primary-text gap-4 px-8 md:flex-row md:gap-2 md:px-0">
              <Logo />
            </div>

            <div className="flex flex-1 items-center justify-end space-x-4">
              <nav className="flex items-center space-x-1">
                <Link
                  href={layoutConfig.links.twitter}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Button
                    variant="ghost"
                    size="sm"
                    className="active:bg-background-bgActive hover:bg-background-bgHover"
                  >
                    <Icons.twitter className="h-5 w-5 fill-current hover:text-background-textContrast" />
                    <span className="sr-only">User</span>
                  </Button>
                </Link>
                <Link
                  href={layoutConfig.links.github}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Button
                    variant="ghost"
                    size="sm"
                    className="active:bg-background-bgActive hover:bg-background-bgHover"
                  >
                    <Icons.gitHub className="h-5 w-5 fill-current hover:text-background-textContrast" />
                    <span className="sr-only">User</span>
                  </Button>
                </Link>

                <ThemeToggle />
              </nav>
            </div>
          </div>
        </MaxWidthWrapper>
      </div>
    </footer>
  )
}