"use client"

import { useEffect } from "react"
import {
  useParams,
  usePathname,
  useSelectedLayoutSegments,
} from "next/navigation"
import { enableReactComponents } from "@legendapp/state/config/enableReactComponents"
import { enableReactUse } from "@legendapp/state/config/enableReactUse"

import { layoutState } from "~/stores/layout"

enableReactComponents()
enableReactUse() // This adds the use() function to observables

export function LegendStateHandler() {
  // const canRender = useCanRender()
  // const initialized = useRef(false)
  const path = usePathname()

  const { workspaceSlug, projectSlug } = useParams() as {
    workspaceSlug: string
    projectSlug: string
  }

  // just need the path of the current module
  const ignoredRoutes = [
    "(dashboard)",
    "(auth)",
    "root",
    workspaceSlug,
    projectSlug,
  ]

  const segments = useSelectedLayoutSegments()

  const cleanSegments = segments.filter(
    (segment) => !ignoredRoutes.includes(segment)
  )

  useEffect(() => {
    layoutState.workspaceSlug.set(workspaceSlug)
    layoutState.projectSlug.set(projectSlug)
    layoutState.activeSegments.set(cleanSegments)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path])

  // // configure persistance only once
  // if (!initialized.current && canRender) {
  //   // Persist this observable
  //   persistObservable(layoutState, {
  //     local: "layoutState", // Unique name
  //   })
  //   initialized.current = true
  // }

  return null
}
