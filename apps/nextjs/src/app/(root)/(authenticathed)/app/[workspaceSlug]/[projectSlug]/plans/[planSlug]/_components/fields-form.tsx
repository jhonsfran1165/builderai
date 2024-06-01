"use client"

import { DollarSignIcon, HelpCircle, Plus, XCircle } from "lucide-react"
import type { UseFormReturn } from "react-hook-form"
import { useFieldArray } from "react-hook-form"

import {
  AGGREGATION_METHODS,
  AGGREGATION_METHODS_MAP,
} from "@builderai/db/utils"
import type { Currency, PlanVersionFeature } from "@builderai/db/validators"
import { cn } from "@builderai/ui"
import { Button } from "@builderai/ui/button"
import {
  FormControl,
  FormDescription,
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
import {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipTrigger,
} from "@builderai/ui/tooltip"

import { InputWithAddons } from "~/components/test"
import { currencySymbol } from "~/lib/currency"

export function QuantityFormField({
  form,
}: {
  form: UseFormReturn<PlanVersionFeature>
}) {
  return (
    <div className="w-full">
      <FormField
        control={form.control}
        name="defaultQuantity"
        render={({ field }) => (
          <FormItem className="">
            <FormLabel>Quantity</FormLabel>
            <FormDescription>
              Default quantity of the feature when the subscription is created.
            </FormDescription>
            <div className="text-xs font-normal leading-snug">
              If the quantity is not provided, it must be set at the time of the
              subscription.
            </div>

            <div className="flex flex-col items-center space-y-1 px-2">
              <FormControl className="w-full">
                <InputWithAddons
                  {...field}
                  trailing={"units"}
                  value={field.value ?? ""}
                />
              </FormControl>

              <FormMessage className="self-start px-2" />
            </div>
          </FormItem>
        )}
      />
    </div>
  )
}

export function LimitFormField({
  form,
}: {
  form: UseFormReturn<PlanVersionFeature>
}) {
  return (
    <div className="w-full">
      <FormField
        control={form.control}
        name="limit"
        render={({ field }) => (
          <FormItem className="">
            <FormLabel>Limit</FormLabel>
            <FormDescription>
              Set a limit for the feature when the subscription is created.
            </FormDescription>
            <div className="text-xs font-normal leading-snug">
              If you set a limit, the feature will be disabled when the limit is
              reached. Otherwise the feature will be unlimited.
            </div>

            <div className="flex flex-col items-center space-y-1 px-2">
              <FormControl className="w-full">
                <InputWithAddons
                  {...field}
                  trailing={"units"}
                  value={field.value ?? ""}
                />
              </FormControl>

              <FormMessage className="self-start px-2" />
            </div>
          </FormItem>
        )}
      />
    </div>
  )
}

export function PriceFormField({
  form,
  currency,
}: {
  form: UseFormReturn<PlanVersionFeature>
  currency: Currency
}) {
  return (
    <div className="w-full">
      <FormField
        control={form.control}
        name="config.price.displayAmount"
        render={({ field }) => (
          <FormItem className="">
            <FormLabel>Price</FormLabel>
            <FormDescription>
              Price of the feature in the selected currency of the plan.
            </FormDescription>
            <div className="text-xs font-normal leading-snug">
              Prices can be set as decimal values. For example, $1.99.
            </div>

            <div className="flex flex-col items-center space-y-1 px-2">
              <FormControl className="w-full">
                <InputWithAddons
                  {...field}
                  leading={currencySymbol(currency)}
                  trailing={currency}
                  value={field.value ?? ""}
                />
              </FormControl>

              <FormMessage className="self-start px-2" />
            </div>
          </FormItem>
        )}
      />
    </div>
  )
}

export function UnitsFormField({
  form,
}: {
  form: UseFormReturn<PlanVersionFeature>
}) {
  return (
    <div className="w-full">
      <FormField
        control={form.control}
        name="config.units"
        render={({ field }) => (
          <FormItem className="">
            <div className="flex flex-col items-center space-y-1 px-2">
              <FormControl className="w-full">
                <InputWithAddons
                  {...field}
                  leading={"per"}
                  trailing={"units"}
                  value={field.value ?? ""}
                />
              </FormControl>

              <FormMessage className="self-start px-2" />
            </div>
          </FormItem>
        )}
      />
    </div>
  )
}

export function AggregationMethodFormField({
  form,
}: {
  form: UseFormReturn<PlanVersionFeature>
}) {
  return (
    <div className="w-full">
      <FormField
        control={form.control}
        name="config.aggregationMethod"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <div className="">
              <FormLabel>Aggregation Method</FormLabel>
              <FormDescription>Charge for metered usage by</FormDescription>
              <div className="text-xs font-normal leading-snug">
                Usage based features meters usage over a period of time. Select
                the aggregation method for the feature.
              </div>
            </div>
            <div className="px-2">
              <Select onValueChange={field.onChange} value={field.value ?? ""}>
                <FormControl className="truncate">
                  <SelectTrigger className="items-start [&_[data-description]]:hidden">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {AGGREGATION_METHODS.map((mode, index) => (
                    <SelectItem value={mode} key={index}>
                      <div className="text-muted-foreground flex items-start gap-3">
                        <div className="grid gap-0.5">
                          <p>{AGGREGATION_METHODS_MAP[mode].label}</p>
                          <p className="text-xs" data-description>
                            {AGGREGATION_METHODS_MAP[mode].description}
                          </p>
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </FormItem>
        )}
      />
    </div>
  )
}

export function TierFormField({
  form,
  currency,
}: {
  form: UseFormReturn<PlanVersionFeature>
  currency: Currency
}) {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "config.tiers",
  })

  return (
    <div className="flex w-full flex-col">
      <div className="mb-4 flex flex-col">
        <h4 className="my-auto block font-semibold">Tier Configuration</h4>
        <div className="text-xs font-normal leading-snug">
          {form.getValues("featureType") === "usage"
            ? "Configure the tiers for the feature, the price will be calculated with the reported usage"
            : "Configure the tiers for the feature, the price will be calculated when the subscription is created."}
        </div>
      </div>

      {fields.length > 0 ? (
        <div className="px-2 py-2">
          {fields.map((field, index) => (
            <div
              key={index}
              className="flex items-end justify-between gap-2 space-y-2"
            >
              <div className="flex items-center justify-start">
                <span className="h-8 text-sm font-light leading-8">
                  {index + 1}
                </span>
              </div>
              <div className="w-full">
                <FormField
                  control={form.control}
                  key={field.id}
                  name={`config.tiers.${index}.firstUnit`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={cn(index !== 0 && "sr-only")}>
                        <Tooltip>
                          <div className="flex items-center justify-center gap-2 text-xs font-normal">
                            First Unit
                            <span>
                              <TooltipTrigger asChild>
                                <HelpCircle className="h-4 w-4 font-light" />
                              </TooltipTrigger>
                            </span>
                          </div>

                          <TooltipContent
                            className="bg-background-bg w-32 text-xs font-normal"
                            align="center"
                            side="right"
                          >
                            First unit for the tier range. For the first tier,
                            this should be 0.
                            <TooltipArrow className="fill-background-bg" />
                          </TooltipContent>
                        </Tooltip>
                      </FormLabel>

                      <FormMessage className="text-xs font-light" />
                      <FormControl>
                        <Input
                          {...field}
                          className="h-8"
                          disabled={index === 0}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <div className="w-full">
                <FormField
                  control={form.control}
                  key={field.id}
                  name={`config.tiers.${index}.lastUnit`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={cn(index !== 0 && "sr-only")}>
                        <Tooltip>
                          <div className="flex items-center justify-center gap-2 text-xs font-normal">
                            Last Unit
                            <span>
                              <TooltipTrigger asChild>
                                <HelpCircle className="h-4 w-4 font-light" />
                              </TooltipTrigger>
                            </span>
                          </div>

                          <TooltipContent
                            className="bg-background-bg w-48 text-xs font-normal"
                            align="center"
                            side="right"
                          >
                            If the usage is less than the tier up to value, then
                            the flat price is charged. For infinite usage, use
                            9999999.
                            <TooltipArrow className="fill-background-bg" />
                          </TooltipContent>
                        </Tooltip>
                      </FormLabel>

                      <FormMessage className="text-xs font-light" />

                      <FormControl>
                        <Input
                          {...field}
                          className="h-8"
                          value={field.value ?? "∞"}
                          disabled={
                            (index !== 0 && index === fields.length - 1) ||
                            fields.length === 1
                          }
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-full">
                <FormField
                  control={form.control}
                  key={field.id}
                  name={`config.tiers.${index}.flatPrice.displayAmount`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={cn(index !== 0 && "sr-only")}>
                        <Tooltip>
                          <div className="flex items-center justify-center gap-2 text-xs font-normal">
                            Flat price
                            <span>
                              <TooltipTrigger asChild>
                                <HelpCircle className="h-4 w-4 font-light" />
                              </TooltipTrigger>
                            </span>
                          </div>

                          <TooltipContent
                            className="bg-background-bg w-32 text-xs font-normal"
                            align="center"
                            side="right"
                          >
                            Flat price of the tier, it will be sum to usage
                            price.
                            <TooltipArrow className="fill-background-bg" />
                          </TooltipContent>
                        </Tooltip>
                      </FormLabel>

                      <FormMessage className="text-xs font-light" />

                      <FormControl>
                        <div className="relative">
                          <DollarSignIcon className="text-muted-foreground absolute left-2 top-2 h-4 w-4" />
                          <Input
                            {...field}
                            value={field.value ?? ""}
                            onChange={(e) => {
                              field.onChange(e.target.value)

                              // if the value is empty, set the flatPrice to null
                              if (e.target.value === "") {
                                form.setValue(
                                  `config.tiers.${index}.flatPrice.displayAmount`,
                                  "0.00"
                                )
                              }
                            }}
                            className="h-8 pl-8"
                          />
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-full">
                <FormField
                  control={form.control}
                  key={field.id}
                  name={`config.tiers.${index}.unitPrice.displayAmount`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={cn(index !== 0 && "sr-only")}>
                        <Tooltip>
                          <div className="flex items-center justify-center gap-2 text-xs font-normal">
                            Unit price
                            <span>
                              <TooltipTrigger asChild>
                                <HelpCircle className="h-4 w-4 font-light" />
                              </TooltipTrigger>
                            </span>
                          </div>

                          <TooltipContent
                            className="bg-background-bg w-32 text-xs font-normal"
                            align="center"
                            side="right"
                          >
                            Price per unit
                            <TooltipArrow className="fill-background-bg" />
                          </TooltipContent>
                        </Tooltip>
                      </FormLabel>

                      <FormMessage className="text-xs font-light" />

                      <FormControl>
                        <div className="relative">
                          <DollarSignIcon className="text-muted-foreground absolute left-2 top-2 h-4 w-4" />
                          <Input {...field} className="h-8 pl-8" />
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <Button
                  variant="link"
                  size={"icon"}
                  className="h-8 w-8 rounded-full"
                  onClick={(e) => {
                    e.stopPropagation()
                    e.preventDefault()
                    if (fields.length === 1) return

                    // change last unit of the previous tier to the last unit of the current tier
                    form.setValue(
                      `config.tiers.${index - 1}.lastUnit`,
                      form.getValues(`config.tiers.${index}.lastUnit`)
                    )

                    remove(index)
                  }}
                >
                  <XCircle className="h-5 w-5" />
                  <span className="sr-only">delete tier</span>
                </Button>
              </div>
            </div>
          ))}
          <div className="w-full px-2 py-4">
            <div className="flex justify-end">
              <Button
                variant="default"
                size={"sm"}
                onClick={(e) => {
                  e.stopPropagation()
                  e.preventDefault()

                  const firstUnitValue = Number(
                    form.getValues(
                      `config.tiers.${fields.length - 1}.firstUnit`
                    )
                  )

                  const lastUnitValue = form.getValues(
                    `config.tiers.${fields.length - 1}.lastUnit`
                  )

                  form.setValue(
                    `config.tiers.${fields.length - 1}.lastUnit`,
                    lastUnitValue ?? firstUnitValue + 1
                  )

                  append({
                    firstUnit:
                      lastUnitValue === null
                        ? firstUnitValue + 2
                        : lastUnitValue + 1,
                    lastUnit: null,
                    unitPrice: {
                      displayAmount: "0.00",
                      dinero: {
                        amount: 0,
                        currency: {
                          code: currency,
                          base: 10,
                          exponent: 2,
                        },
                        scale: 2,
                      },
                    },
                    flatPrice: {
                      displayAmount: "0.00",
                      dinero: {
                        amount: 0,
                        currency: {
                          code: currency,
                          base: 10,
                          exponent: 2,
                        },
                        scale: 2,
                      },
                    },
                  })
                }}
              >
                <Plus className="h-3 w-3" />
                <span className="ml-2">add tier</span>
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center p-4">
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-2">
              <div className="grid gap-2">
                <p className="self-center text-sm font-semibold">No tiers</p>
                <p className="text-muted-foreground justify-center text-xs font-normal leading-snug">
                  Something went wrong, please add the first tier.
                </p>
                <Button
                  variant="default"
                  size={"sm"}
                  className="py-2"
                  onClick={(e) => {
                    e.stopPropagation()
                    e.preventDefault()
                    append({
                      firstUnit: 1,
                      lastUnit: null,
                      unitPrice: {
                        displayAmount: "0.00",
                        dinero: {
                          amount: 0,
                          currency: {
                            code: currency,
                            base: 10,
                            exponent: 2,
                          },
                          scale: 2,
                        },
                      },
                      flatPrice: {
                        displayAmount: "0.00",
                        dinero: {
                          amount: 0,
                          currency: {
                            code: currency,
                            base: 10,
                            exponent: 2,
                          },
                          scale: 2,
                        },
                      },
                    })
                  }}
                >
                  Add first tier
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
