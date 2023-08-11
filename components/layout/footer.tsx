import Link from "next/link"

import { Logo } from "@/components/layout/logo"
import { ThemeToggle } from "@/components/layout/theme-toggle"
import { Icons } from "@/components/shared/icons"
import MaxWidthWrapper from "@/components/shared/max-width-wrapper"
import { Button } from "@/components/ui/button"
import { layoutConfig } from "@/lib/config/layout"

export function Footer() {
  return (
    <footer>
      <div className="bg-background-bgSubtle z-30 mt-10 flex min-w-full flex-col items-center justify-between gap-4 border-t py-4 md:h-16 md:flex-row md:py-0">
        <MaxWidthWrapper className="max-w-screen-2xl">
          <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
            <div className="text-primary-text flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
              <Logo />
            </div>

            <div className="flex flex-1 items-center justify-end">
              <nav className="flex items-center">
                <Link
                  href={layoutConfig.links.twitter}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Button variant="ghost" size="sm" className="button-ghost">
                    <Icons.twitter className="hover:text-background-textContrast h-5 w-5 fill-current" />
                    <span className="sr-only">User</span>
                  </Button>
                </Link>
                <Link
                  href={layoutConfig.links.github}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Button variant="ghost" size="sm" className="button-ghost">
                    <Icons.gitHub className="hover:text-background-textContrast h-5 w-5 fill-current" />
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
