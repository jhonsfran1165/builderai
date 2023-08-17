import useSWR from "swr"

import { DataProjectsView } from "@/lib/types/db"
import { fetcher } from "@/lib/utils"

export default function useProject({
  revalidateOnFocus = true,
  orgSlug,
  projectSlug,
}: {
  revalidateOnFocus?: boolean
  orgSlug: string
  projectSlug: string
}) {
  const { data: project, error } = useSWR<DataProjectsView>(
    !!orgSlug && !!projectSlug
      ? `/api/org/${orgSlug}/project/${projectSlug}`
      : null,
    fetcher,
    {
      dedupingInterval: 30000,
      revalidateOnFocus,
    }
  )

  return {
    project,
    error,
    isLoading: !error && !project,
  }
}
