import { searchDataParamsSchema } from "@builderai/db/validators"

import { DataTable } from "~/components/data-table/data-table"
import { userCanAccessProject } from "~/lib/project-guard"
import { api } from "~/trpc/server"
import { columns } from "./_components/table/columns"

export default async function ApiKeysPage(props: {
  params: { projectSlug: string; workspaceSlug: string }
  searchParams: Record<string, string | string[] | undefined>
}) {
  await userCanAccessProject({
    projectSlug: props.params.projectSlug,
  })

  const parsed = searchDataParamsSchema.safeParse(props.searchParams)

  const filter = {
    projectSlug: props.params.projectSlug,
    fromDate: undefined as number | undefined,
    toDate: undefined as number | undefined,
  }

  if (parsed?.success) {
    ;(filter.fromDate = parsed.data.fromDate),
      (filter.toDate = parsed.data.toDate)
  }

  const { apikeys } = await api.apikeys.listApiKeys(filter)

  return (
    <DataTable
      columns={columns}
      data={apikeys}
      filterOptions={{
        filterBy: "name",
        filterColumns: true,
        filterDateRange: true,
      }}
    />
  )
}
