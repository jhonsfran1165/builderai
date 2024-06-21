import { formatRelative } from "date-fns"
import Link from "next/link"
import { Fragment, Suspense } from "react"

import type { RouterOutputs } from "@builderai/api"
import { Button } from "@builderai/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@builderai/ui/card"
import { Activity, ChevronRight, CreditCard, DollarSign, Users } from "@builderai/ui/icons"
import { cn } from "@builderai/ui/utils"
import { userCanAccessProject } from "~/lib/project-guard"
import { api } from "~/trpc/server"
import { LoadingCard } from "../_components/loading-card"

export const runtime = "edge"
export const preferredRegion = ["fra1"]

export default async function DashboardPage(props: {
  params: { workspaceSlug: string; projectSlug: string }
}) {
  const { projectSlug, workspaceSlug } = props.params

  await userCanAccessProject({
    projectSlug,
  })

  return (
    <Fragment>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231.89</div>
            <p className="text-muted-foreground text-xs">+20.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Subscriptions</CardTitle>
            <Users className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+2350</div>
            <p className="text-muted-foreground text-xs">+180.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sales</CardTitle>
            <CreditCard className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+12,234</div>
            <p className="text-muted-foreground text-xs">+19% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Now</CardTitle>
            <Activity className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+573</div>
            <p className="text-muted-foreground text-xs">+201 since last hour</p>
          </CardContent>
        </Card>
      </div>
      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-7 md:col-span-2 lg:col-span-4">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            {/* <Suspense>
              <Overview />
            </Suspense> */}
          </CardContent>
        </Card>

        <Suspense
          fallback={
            <LoadingCard
              title="Recent Ingestions"
              description="Loading recent ingestions..."
              className="col-span-7 md:col-span-2 lg:col-span-3"
            />
          }
        >
          <RecentIngestions projectSlug={projectSlug} workspaceSlug={workspaceSlug} />
        </Suspense>
      </div>
    </Fragment>
  )
}

function IngestionCard(props: {
  projectSlug: string
  workspaceSlug: string
  ingestion: RouterOutputs["ingestions"]["list"][number]
}) {
  const { ingestion } = props
  const { adds, subs } = ingestion

  const N_SQUARES = 5
  const addSquares = Math.round((adds / (adds + subs)) * N_SQUARES)

  const truncatedHash = ingestion.hash.slice(0, 15)

  return (
    <Link href={`/${props.workspaceSlug}/${props.projectSlug}/ingestions/${ingestion.id}`}>
      <div className="hover:bg-muted flex items-center rounded p-1">
        <div className="space-y-1">
          <p className="text-sm font-medium leading-none">{truncatedHash}</p>
          <p className="text-muted-foreground text-sm">
            {formatRelative(new Date(ingestion.createdAt), new Date())}
          </p>
        </div>
        <div className="ml-auto flex flex-col items-center text-sm">
          <div>
            +{adds} -{subs}
          </div>
          <div className="flex gap-[2px]">
            {new Array(N_SQUARES).fill(null).map((_, i) => (
              <span
                key={Math.random()}
                className={cn(
                  "inline-block h-2 w-2",
                  i < addSquares ? "bg-green-500" : "bg-red-500",
                  adds + subs === 0 && "bg-gray-200"
                )}
              />
            ))}
          </div>
        </div>

        <ChevronRight className="ml-2 h-4 w-4" />
      </div>
    </Link>
  )
}

async function RecentIngestions(props: {
  projectSlug: string
  workspaceSlug: string
}) {
  const ingestions = await api.ingestions.list({
    projectSlug: props.projectSlug,
    limit: 5,
  })

  return (
    <Card className="col-span-7 md:col-span-2 lg:col-span-3">
      <CardHeader>
        <CardTitle>Recent Ingestions</CardTitle>
        <CardDescription>
          {ingestions.length} ingestion{ingestions.length > 1 ? "s" : null} recorded this period.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {ingestions.map((ingestion) => (
          <IngestionCard
            key={ingestion.id}
            ingestion={ingestion}
            projectSlug={props.projectSlug}
            workspaceSlug={props.workspaceSlug}
          />
        ))}
      </CardContent>
      <CardFooter>
        <Button size="sm" className="ml-auto">
          View all
          <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  )
}