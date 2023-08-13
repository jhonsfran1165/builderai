
"use client"

import { ProjectCard } from "@/components/projects/project-card"
import MaxWidthWrapper from "@/components/shared/max-width-wrapper"
import type { DataProjectsView } from "@/lib/types/supabase"
import { use } from "react"

import NoProjectsPlaceholder from "@/components/projects/no-projects-placeholder"

export function ProjectsContainer({ projectsPromise }: { projectsPromise: Promise<DataProjectsView[]> }) {
  if (!projectsPromise) return null

  const projects = use(projectsPromise)

  return (
    <MaxWidthWrapper className="pt-10">
      <ul className="grid grid-cols-1 gap-3 lg:grid-cols-3">
        {projects &&
          projects.length > 0 &&
          projects.map((project) => (
            <ProjectCard key={project.project_id} project={project} />
          ))}
      </ul>
      {!projects && <NoProjectsPlaceholder />}
    </MaxWidthWrapper>
  )
}
