import Balancer from "react-wrap-balancer"

import { Button } from "@unprice/ui/button"
import { Plus } from "@unprice/ui/icons"
import { Fragment } from "react"
import { DashboardShell } from "~/components/layout/dashboard-shell"
import HeaderTab from "~/components/layout/header-tab"
import { api } from "~/trpc/server"
import { PageCard, PageCardSkeleton } from "../_components/page-card"
import { PageDialog } from "../_components/page-dialog"

export default async function PageOverviewPage(props: {
  params: { workspaceSlug: string; projectSlug: string }
  searchParams: Record<string, string | string[] | undefined>
}) {
  const { projectSlug, workspaceSlug } = props.params

  const { pages } = await api.pages.listByActiveProject({})

  return (
    <DashboardShell
      header={
        <HeaderTab
          title="Pages"
          description="Create and manage your pages"
          action={
            <PageDialog>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Page
              </Button>
            </PageDialog>
          }
        />
      }
    >
      <Fragment>
        <ul className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {pages.map((page) => (
            <li key={page.id}>
              <PageCard page={page} workspaceSlug={workspaceSlug} projectSlug={projectSlug} />
            </li>
          ))}
        </ul>

        {pages.length === 0 && (
          <div className="relative">
            <ul className="grid select-none grid-cols-1 gap-4 opacity-40 lg:grid-cols-3">
              <PageCardSkeleton pulse={false} />
              <PageCardSkeleton pulse={false} />
              <PageCardSkeleton pulse={false} />
            </ul>
            <div className="-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 w-full text-center">
              <Balancer>
                <h2 className="font-bold text-2xl">This project has no pages yet</h2>
                <p className="text-lg text-muted-foreground">
                  Create your first plan to get started
                </p>
              </Balancer>
            </div>
          </div>
        )}
      </Fragment>
    </DashboardShell>
  )
}
