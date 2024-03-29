import { Suspense } from "react"
import { ExternalLink, Globe } from "lucide-react"

import type { RouterOutputs } from "@builderai/api"
import { Badge } from "@builderai/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@builderai/ui/card"

import { EmptyPlaceholder } from "~/components/empty-placeholder"
import { api } from "~/trpc/server"
import DomainConfiguration from "./_components/domain-configuration"
import { DomainDialog } from "./_components/domain-dialog"
import { VerifyDomainButton } from "./_components/domain-verify-button"

export const runtime = "edge"

export default async function PageDomains() {
  const domains = await api.domains.getAllByActiveWorkspace()

  return (
    <>
      {domains.length === 0 ? (
        <Card>
          <CardContent className="my-0 p-6">
            <EmptyPlaceholder>
              <EmptyPlaceholder.Icon>
                <Globe className="h-8 w-8" />
              </EmptyPlaceholder.Icon>
              <EmptyPlaceholder.Title>No domains</EmptyPlaceholder.Title>
              <EmptyPlaceholder.Description>
                There are no domains for the workspace.
              </EmptyPlaceholder.Description>
              <EmptyPlaceholder.Action>
                <DomainDialog />
              </EmptyPlaceholder.Action>
            </EmptyPlaceholder>
          </CardContent>
        </Card>
      ) : (
        <ul className="grid grid-cols-1 gap-4">
          {domains.map((domain) => (
            <li key={domain.name}>
              <DomainCard key={domain.name} domain={domain} />
            </li>
          ))}
        </ul>
      )}
    </>
  )
}

const DomainCard = ({
  domain,
}: {
  domain: RouterOutputs["domains"]["getAllByActiveWorkspace"][number]
}) => {
  const domainVerified = !!domain.verified

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex flex-row items-center">
            <CardTitle className="text-2xl font-semibold">
              {domain.name}
            </CardTitle>

            <a href={`https://${domain.name}`} target="_blank" rel="noreferrer">
              <ExternalLink className="ml-2 h-5 w-5" />
            </a>
            <Badge
              className="ml-2"
              variant={domainVerified ? "outline" : "secondary"}
            >
              {domainVerified ? "verified" : "pending verification"}
            </Badge>
          </div>

          <div className="flex flex-row items-center justify-between space-x-2">
            <VerifyDomainButton domain={domain.name} />
            <DomainDialog defaultValues={domain} label="Edit" />
          </div>
        </div>
      </CardHeader>

      <CardContent className="border-t py-4">
        <Suspense fallback={<DomainConfiguration.Skeleton />}>
          <DomainConfiguration
            domainPromise={api.domains.verify({ domain: domain.name })}
          />
        </Suspense>
      </CardContent>
    </Card>
  )
}
