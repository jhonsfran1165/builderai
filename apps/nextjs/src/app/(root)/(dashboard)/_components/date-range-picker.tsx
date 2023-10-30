"use client"

import * as React from "react"
import { addDays, format } from "date-fns"

import { Button } from "@builderai/ui/button"
import type { DateRange } from "@builderai/ui/calendar"
import { Calendar } from "@builderai/ui/calendar"
import { Calendar as CalendarIcon } from "@builderai/ui/icons"
import { Popover, PopoverContent, PopoverTrigger } from "@builderai/ui/popover"
import { cn } from "@builderai/ui/utils"

export function CalendarDateRangePicker({
  className,
  align = "end",
}: React.HTMLAttributes<HTMLDivElement> & {
  align?: "center" | "end" | "start"
}) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(2023, 0, 20),
    to: addDays(new Date(2023, 0, 20), 20),
  })

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            size="sm"
            className={cn(
              "w-[240px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align={align}>
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
