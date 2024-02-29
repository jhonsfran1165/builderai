import React from "react"
import Link from "next/link"
import { notFound } from "next/navigation"

import { Badge } from "@builderai/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@builderai/ui/card"
import { ChevronLeft } from "@builderai/ui/icons"

import { DashboardShell } from "~/components/layout/dashboard-shell"
import MaxWidthWrapper from "~/components/layout/max-width-wrapper"
import { api } from "~/trpc/server"
import CreateNewVersion from "../../_components/create-new-version"
import { VersionActions } from "../../_components/version-actions"
import { Versions } from "../../_components/versions"

export default async function PriceLayout(props: {
  children: React.ReactNode
  params: {
    workspaceSlug: string
    projectSlug: string
    planSlug: string
    planVersionId: string
  }
}) {
  const { projectSlug, workspaceSlug, planSlug, planVersionId } = props.params
  const { plan } = await api.plans.getBySlug({
    slug: planSlug,
  })

  if (!plan) {
    notFound()
  }

  return (
    <>
      <DashboardShell
        tabs={
          <Versions
            versions={plan?.versions || []}
            selectedVersion={Number(planVersionId)}
            basePath={`/${workspaceSlug}/${projectSlug}/plans/${planSlug}`}
          />
        }
        header={
          <MaxWidthWrapper className="max-w-screen-2xl">
            <div className="mb-6 flex justify-between align-middle">
              <Link
                className="flex items-center justify-start align-middle text-sm"
                prefetch={false}
                href={`/${workspaceSlug}/${projectSlug}/plans`}
              >
                <Badge variant={"outline"} className="py-1">
                  <ChevronLeft className="h-4 w-4" />
                  back
                </Badge>
              </Link>
              <div className="flex items-center justify-end space-x-2">
                <CreateNewVersion plan={plan} projectSlug={projectSlug} />
                <VersionActions
                  planId={plan.id}
                  versionId={Number(planVersionId)}
                />
              </div>
            </div>

            <Card className="mb-10">
              <CardHeader className="flex flex-row items-center justify-between space-y-4 pb-2">
                <CardTitle className="flex text-2xl font-medium">
                  {`${plan?.title?.toUpperCase()}:${planVersionId.toUpperCase()}`}
                </CardTitle>

                <div className="flex space-x-2">
                  <Badge variant={"outline"}>{plan?.currency}</Badge>
                  <Badge variant={"outline"}>monthly</Badge>
                </div>
              </CardHeader>

              <CardContent>
                <div className="text-2xl font-bold">Base price: $0</div>
                <p className="my-4 text-muted-foreground">
                  Manage your account settings and set e-mail preferences.
                </p>
              </CardContent>
            </Card>
          </MaxWidthWrapper>
        }
      >
        {props.children}
      </DashboardShell>
    </>
  )
}
