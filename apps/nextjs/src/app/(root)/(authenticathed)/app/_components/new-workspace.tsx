"use client"

import Link from "next/link"
import { TRPCClientError } from "@trpc/client"
import { toDecimal } from "dinero.js"

import type { PurchaseOrg } from "@builderai/db/validators"
import { purchaseWorkspaceSchema } from "@builderai/db/validators"
import { Button } from "@builderai/ui/button"
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@builderai/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@builderai/ui/form"
import { Input } from "@builderai/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@builderai/ui/select"
import { useToast } from "@builderai/ui/use-toast"

import { currencySymbol } from "~/lib/currency"
import { useZodForm } from "~/lib/zod-form"
import { api } from "~/trpc/client"

export default function NewTeamDialog(props: { closeDialog: () => void }) {
  const { toast } = useToast()
  const plans = api.stripe.plans.useQuery(undefined, {
    refetchOnWindowFocus: false,
  })

  // TODO: plans should be fetch from the plan versions endpoint
  const form = useZodForm({
    schema: purchaseWorkspaceSchema,
    defaultValues: {
      planId: plans?.data?.[0]?.priceId,
      name: "",
    },
  })

  const stripePurchase = api.stripe.purchaseOrg.useMutation({
    onSettled: (data) => {
      if (window && data?.success) window.location.href = data.url
    },
    onError: (err) => {
      if (err instanceof TRPCClientError) {
        toast({
          title: err.message,
          variant: "destructive",
        })
      } else {
        toast({
          title: "Error",
          description:
            "There was an error setting up your workspace. Please try again.",
          variant: "destructive",
        })
      }
    },
  })

  return (
    <DialogContent>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data: PurchaseOrg) => {
            stripePurchase.mutate(data)
          })}
          className="space-y-4"
        >
          <DialogHeader>
            <DialogTitle>Create new team</DialogTitle>
            <DialogDescription>
              Add a new workspace to invite other people to collaborate.
            </DialogDescription>
          </DialogHeader>

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
                  <Link
                    href="/pricing"
                    className="text-xs text-muted-foreground hover:underline"
                  >
                    What&apos;s included in each plan?
                  </Link>
                </div>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a plan" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {plans?.data?.map((plan, index) => (
                      <SelectItem
                        key={plan.priceId + index}
                        value={plan.priceId}
                      >
                        <span className="font-medium">{plan.name}</span> -{" "}
                        <span className="text-muted-foreground">
                          {toDecimal(
                            plan.price,
                            ({ value, currency }) =>
                              `${currencySymbol(currency.code)}${value}`
                          )}{" "}
                          per month
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
