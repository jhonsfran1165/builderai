"use client"

import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import * as React from "react"
import type { DateRange } from "react-day-picker"

import { Button } from "@unprice/ui/button"
import { Calendar } from "@unprice/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@unprice/ui/popover"
import { cn } from "@unprice/ui/utils"

import useUpdateSearchParams from "~/hooks/use-update-search-params"
import { manipulateDate } from "~/lib/dates"

type DataTableDateRangePicker = React.HTMLAttributes<HTMLDivElement>

export function DataTableDateRangePicker({ className }: DataTableDateRangePicker) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const updateSearchParams = useUpdateSearchParams()
  const [date, setDate] = React.useState<DateRange | undefined>()

  React.useEffect(() => {
    if (searchParams) {
      const from = (searchParams.has("fromDate") && searchParams.get("fromDate")) ?? undefined
      const to = (searchParams.has("toDate") && searchParams.get("toDate")) ?? undefined
      setDate({
        from: from ? new Date(Number(from)) : undefined,
        to: to ? new Date(Number(to)) : undefined,
      })
    }
  }, [searchParams])

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant="outline"
            size="sm"
            className={cn(
              "ml-auto hidden h-8 justify-start text-left font-normal lg:flex",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} - {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={(value) => {
              setDate(value)
              const { fromDate, toDate } = manipulateDate(value)

              const searchParams = updateSearchParams({
                fromDate,
                toDate,
              })
              router.replace(`${pathname}?${searchParams}`)
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
