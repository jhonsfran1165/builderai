import { notFound, redirect } from "next/navigation"

import { db } from "@builderai/db"

export async function userCanAccess({
  projectSlug,
  workspaceSlug,
}: {
  projectSlug: string
  workspaceSlug: string
}) {
  const projectData = await db.query.project.findFirst({
    with: {
      workspace: {
        columns: {
          slug: true,
        },
      },
    },
    where: (project, { eq }) => eq(project.slug, projectSlug),
  })

  if (!projectData) {
    notFound()
  }

  console.log(projectData.workspace.slug, workspaceSlug)

  // don't have access
  if (projectData.workspace.slug !== workspaceSlug) {
    redirect(`/${workspaceSlug}`)
  }
}
