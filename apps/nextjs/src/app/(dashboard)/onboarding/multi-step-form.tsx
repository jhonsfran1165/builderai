"use client"

import { useSearchParams } from "next/navigation"
import { AnimatePresence } from "framer-motion"

import { CreateApiKey } from "./create-api-key"
import { CreateProject } from "./create-project"
import { Done } from "./done"
import Intro from "./intro"

export function Onboarding(props: { workspaceSlug: string }) {
  const search = useSearchParams()
  const step = search.get("step")

  return (
    <div className="mx-auto flex h-[calc(100vh-14rem)] w-full max-w-screen-sm flex-col items-center">
      <AnimatePresence mode="wait">
        {!step && <Intro key="intro" />}
        {step === "create-project" && (
          <CreateProject workspaceSlug={props.workspaceSlug} />
        )}
        {step === "create-api-key" && <CreateApiKey />}
        {step === "done" && <Done workspaceSlug={props.workspaceSlug} />}
      </AnimatePresence>
    </div>
  )
}
