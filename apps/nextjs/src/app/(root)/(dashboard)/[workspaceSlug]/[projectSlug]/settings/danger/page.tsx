import { userCanAccess } from "~/lib/project-guard"
import { DeleteProject } from "./delete-project"
import { TransferProjectToPersonal } from "./transfer-to-personal"

export default async function DangerZonePage(props: {
  params: { projectSlug: string; workspaceSlug: string }
}) {
  await userCanAccess({
    projectSlug: props.params.projectSlug,
    workspaceSlug: props.params.workspaceSlug,
  })

  return (
    // <DashboardShell
    //   title="Danger Zone"
    //   description="Do dangerous stuff here"
    //   className="space-y-4"
    //   submodule="settings"
    //   module="project"
    //   routeSlug="danger"
    // >
    //   <Suspense
    //     fallback={
    //       <Card>
    //         <CardHeader>
    //           <CardTitle>Transfer to Organization</CardTitle>
    //           <CardDescription className="flex items-center">
    //             Transfer this project to an organization
    //           </CardDescription>
    //         </CardHeader>
    //         <CardFooter className="flex justify-between">
    //           <Button variant="destructive">Transfer to Organization</Button>
    //         </CardFooter>
    //       </Card>
    //     }
    //   >
    //   <TransferProjectToOrganization
    //     orgsPromise={api.auth.listOrganizations.query()}
    //   />
    // </Suspense>
    <>
      <TransferProjectToPersonal />
      <DeleteProject />
    </>
    // </DashboardShell>
  )
}