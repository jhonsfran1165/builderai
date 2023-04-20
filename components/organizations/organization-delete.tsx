"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { mutate } from "swr"

import { fetchAPI } from "@/lib/utils"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { toast } from "@/components/ui/use-toast"
import LoadingDots from "@/components/shared/loading/loading-dots"

// TODO: move this to a component
export function ConfirmAction({ confirmAction, trigger }) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription className="font-light">
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="button-default">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction onClick={confirmAction} className="button-danger">
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

// TODO: confirm dialog
export function OrganizationDelete({
  orgSlug,
  id,
  isDefault = false,
}: {
  orgSlug: string
  id: number
  isDefault?: boolean
}) {
  const router = useRouter()
  const [loading, setlLoading] = useState(false)

  const deleteOrg = async () => {
    try {
      setlLoading(true)

      if (isDefault) {
        toast({
          title: "Error deleting org",
          description:
            "This organization is the default one. Please check another organization as default before perform this action.",
          className: "button-warning",
        })
        return null
      }

      const org = await fetchAPI({
        url: `/api/org/${orgSlug}`,
        method: "DELETE",
        data: { orgSlug, id },
      })

      if (org) {
        // mutate swr endpoints for org
        mutate(`/api/org`)
        mutate(`/api/org/${orgSlug}`)

        router.push("/")
        router.refresh()
      }
    } catch (error) {
      toast({
        title: "Error deleting org",
        description: error.message,
        className: "danger",
      })
    } finally {
      setlLoading(false)
    }
  }

  const trigger = (
    <div className="flex justify-end">
      <Button title="Delete" className="button-danger w-28">
        {loading ? <LoadingDots color="#808080" /> : "Delete"}
      </Button>
    </div>
  )

  return (
    <Card className="mb-10 border-danger-solid">
      <CardHeader>
        <CardTitle className="text-xl">Delete Organization</CardTitle>
        <CardDescription>
          The project will be permanently deleted, including its deployments and
          domains. This action is irreversible and can not be undone.
        </CardDescription>
      </CardHeader>
      <div className="flex items-center justify-center px-6 pb-6">
        <Separator />
      </div>
      <CardFooter>
        <ConfirmAction confirmAction={deleteOrg} trigger={trigger} />
      </CardFooter>
    </Card>
  )
}