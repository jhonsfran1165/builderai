import { ProjectsContainer } from "@/components/projects/project-container";
import { ProjectSkeleton } from "@/components/projects/project-skeleton";
import MaxWidthWrapper from "@/components/shared/max-width-wrapper";
import { cookies } from "next/headers";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

export default async function OrgIndexPage({ params: { orgSlug } }: {
  params: {
    orgSlug: string
  }
}) {
  // This is a pretty nice way to run component to simply data fetching with use
  const projects = fetch(`http://localhost:3000/api/org/${orgSlug}/project`, {
    method: "GET",
    cache: "no-cache",
    headers: { Cookie: cookies().toString() }
  }).then(res => res.json())

  return (
    // TODO: add a better error boundary component
    // TODO: check this out https://www.youtube.com/watch?v=ViVa5JPGrf4
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <Suspense fallback={
        <MaxWidthWrapper className="pt-10">
          <ul className="grid grid-cols-1 gap-3 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => <ProjectSkeleton key={i} />)}
          </ul>
        </MaxWidthWrapper>
      }>
        <ProjectsContainer projectsPromise={projects} />
      </Suspense>
    </ErrorBoundary>

  )
}
