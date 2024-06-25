import { DataTableSkeleton } from "~/components/data-table/data-table-skeleton"
import { DashboardShell } from "~/components/layout/dashboard-shell"
import HeaderTab from "~/components/layout/header-tab"
import NewApiKeyDialog from "./_components/new-api-key-dialog"

export default function Loading() {
  return (
    <DashboardShell
      header={
        <HeaderTab
          title="Api Keys"
          description="All the apis of the system"
          action={<NewApiKeyDialog />}
        />
      }
    >
      <DataTableSkeleton />
    </DashboardShell>
  )
}
