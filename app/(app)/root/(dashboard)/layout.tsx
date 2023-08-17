import { DataBaseClientListener } from "@/components/auth/db-listener"
import { Footer } from "@/components/layout/footer"
import StoreHandler from "@/components/layout/store-handler"
import { AppModules } from "@/lib/config/dashboard"

import { MainNav } from "@/components/layout/main-nav"
import { TabsNav } from "@/components/layout/tabs-nav"
import MaxWidthWrapper from "@/components/shared/max-width-wrapper"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode,
}) {
  return (
    <>
      <DataBaseClientListener />
      <StoreHandler
        modulesApp={AppModules}
      />
      <header className="sticky top-0 z-50 w-full border-b bg-background-bgSubtle bg-clip-padding backdrop-blur-xl">
        <MaxWidthWrapper className="max-w-screen-2xl">
          <MainNav />
          <TabsNav />
        </MaxWidthWrapper>
      </header>
      <main className="flex grow flex-col">{children}</main>
      <Footer />
    </>
  )
}
