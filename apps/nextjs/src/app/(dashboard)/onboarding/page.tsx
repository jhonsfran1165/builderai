import { notFound } from "next/navigation"

import { auth } from "@builderai/auth"

import { Onboarding } from "./multi-step-form"

export const runtime = "edge"

export default function OnboardingPage() {
  const { orgSlug, sessionClaims } = auth()

  const workspaceSlug = orgSlug ?? (sessionClaims?.username as string) ?? ""

  if (!workspaceSlug) {
    notFound()
  }

  return (
    <>
      <Onboarding workspaceSlug={workspaceSlug} />

      <div className="absolute inset-0 top-12 -z-10 bg-cover bg-center" />
    </>
  )
}
