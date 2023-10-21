import { redirect } from "next/navigation"

// TODO: activate later. It is  hitting limits on vercel
// export const runtime = "edge"export const runtime = "edge"

/**
 * Suboptimal, would be better off doing this in middleware
 */
export default function ProjectPage(props: {
  params: { workspaceSlug: string; projectSlug: string }
}) {
  redirect(
    `/${props.params.workspaceSlug}/${props.params.projectSlug}/overview`
  )
}