"use client"

import { useState } from "react"
import dynamic from "next/dynamic"

import { Button } from "@builderai/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@builderai/ui/dialog"

import { apiRQ } from "~/trpc/client"

const CreateApiKeyForm = dynamic(
  () => import("../../_components/create-api-key-form")
)

export default function NewApiKeyDialog(props: { projectSlug: string }) {
  const [dialogOpen, setDialogOpen] = useState(false)
  const apiUtils = apiRQ.useUtils()

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button className="button-primary">Create API Key</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create API Key</DialogTitle>
          <DialogDescription>
            Fill out the form to create an API key.
          </DialogDescription>
        </DialogHeader>
        <CreateApiKeyForm
          projectSlug={props.projectSlug}
          onSuccess={async () => {
            setDialogOpen(false)
            await apiUtils.apikey.listApiKeys.invalidate({
              projectSlug: props.projectSlug,
            })
          }}
        />
      </DialogContent>
    </Dialog>
  )
}
