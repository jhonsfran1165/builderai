import { notFound } from "next/navigation"

import { db } from "@/lib/db/server"


export const revalidate = 0

// TODO: validate from client and redirect to not found if project does not exist
export default async function DashboardLayout({
  children,
  params: { projectSlug },
}: {
  children: React.ReactNode
  params: {
    projectSlug: string
  }
}) {

  const { data: project, error } = await db
    .from("project")
    .select("id")
    .eq("slug", projectSlug)
    .single()

  if (!project) {
    notFound()
  }

  return <>{children}</>
}
