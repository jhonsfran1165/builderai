"use client"
import Link from "next/link"

import type { PurchaseOrg } from "@unprice/db/validators"
import { purchaseWorkspaceSchema } from "@unprice/db/validators"
import { Button } from "@unprice/ui/button"
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@unprice/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@unprice/ui/form"
import { Input } from "@unprice/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@unprice/ui/select"

import { useZodForm } from "~/lib/zod-form"
import { api } from "~/trpc/client"

export default function NewTeamDialog(props: { closeDialog: () => void; isOpen: boolean }) {
  const plans = api.stripe.plans.useQuery(undefined, {
    refetchOnWindowFocus: false,
    enabled: props.isOpen, // only fetch plans when dialog is open
  })

  // TODO: plans should be fetch from the plan versions endpoint
  const form = useZodForm({
    schema: purchaseWorkspaceSchema,
    defaultValues: {
      planId: "",
      name: "",
    },
  })

  const stripePurchase = api.stripe.purchaseOrg.useMutation({})

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Create new team</DialogTitle>
        <DialogDescription>
          Add a new workspace to invite other people to collaborate.
        </DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data: PurchaseOrg) => {
            stripePurchase.mutate(data)
          })}
          className="space-y-4"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Workspace name *</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Acme Inc." />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="planId"
            render={({ field }) => (
              <FormItem>
                <div className="flex justify-between">
                  <FormLabel>Subscription plan *</FormLabel>
                  <Link href="/pricing" className="text-muted-foreground text-xs hover:underline">
                    What&apos;s included in each plan?
                  </Link>
                </div>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a plan" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {plans?.data?.map((plan) => (
                      <SelectItem key={plan.planId} value={plan.planId}>
                        <span className="font-medium">{plan.planName}</span> -{" "}
                        <span className="text-muted-foreground">
                          {plan.displayAmount} per month
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <DialogFooter>
            <Button variant="outline" onClick={() => props.closeDialog()}>
              Cancel
            </Button>
            <Button type="submit">Continue</Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  )
}
