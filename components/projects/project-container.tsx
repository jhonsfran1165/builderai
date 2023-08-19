
"use client"

import { ProjectCard } from "@/components/projects/project-card"
import MaxWidthWrapper from "@/components/shared/max-width-wrapper"
import type { DataProjectsView } from "@/lib/types/db"
import { use } from "react"

import NoProjectsPlaceholder from "@/components/projects/no-projects-placeholder"
import { api } from "@/lib/trpc/client"

export function ProjectsContainer({ projectsPromise }: { projectsPromise: Promise<DataProjectsView[]> }) {
  if (!projectsPromise) return null

  // TODO: better to use react query here
  const projects = use(projectsPromise)
  const trpc = use(api.userById.query({ slug: "eqwewqe" }))
  console.log(trpc)

  return (
    <MaxWidthWrapper className="pt-10">
      <ul className="grid grid-cols-1 gap-3 lg:grid-cols-3">
        {projects &&
          projects.length > 0 &&
          projects.map((project) => (
            <ProjectCard key={project.project_id} project={project} />
          ))}
      </ul>
      {projects.length === 0 && <NoProjectsPlaceholder />}
    </MaxWidthWrapper>
  )
}
