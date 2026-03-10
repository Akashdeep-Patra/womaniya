"use client"

import * as React from "react"
import { format, setHours, setMinutes } from "date-fns"
import { CalendarIcon, XIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

type DateTimePickerProps = {
  value?: string | Date | null
  onChange?: (isoString: string) => void
  placeholder?: string
  className?: string
  disabled?: boolean
}

function parseValue(value?: string | Date | null): Date | undefined {
  if (!value) return undefined
  if (value instanceof Date) return isNaN(value.getTime()) ? undefined : value
  const d = new Date(value)
  return isNaN(d.getTime()) ? undefined : d
}

function DateTimePicker({
  value,
  onChange,
  placeholder = "Pick date & time",
  className,
  disabled,
}: DateTimePickerProps) {
  const [open, setOpen] = React.useState(false)
  const date = parseValue(value)

  const hours24 = date ? date.getHours() : 12
  const minutes = date ? date.getMinutes() : 0
  const isPM = hours24 >= 12
  const hours12 = hours24 === 0 ? 12 : hours24 > 12 ? hours24 - 12 : hours24

  const updateDateTime = React.useCallback(
    (newDate: Date) => {
      onChange?.(newDate.toISOString())
    },
    [onChange]
  )

  const handleDateSelect = React.useCallback(
    (selectedDay: Date | undefined) => {
      if (!selectedDay) return
      // Preserve existing time or default to 12:00 PM
      const h = date ? date.getHours() : 12
      const m = date ? date.getMinutes() : 0
      const combined = setMinutes(setHours(selectedDay, h), m)
      updateDateTime(combined)
    },
    [date, updateDateTime]
  )

  const handleHourChange = React.useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      if (!date) return
      const h12 = parseInt(e.target.value, 10)
      const h24 = isPM ? (h12 === 12 ? 12 : h12 + 12) : h12 === 12 ? 0 : h12
      updateDateTime(setHours(date, h24))
    },
    [date, isPM, updateDateTime]
  )

  const handleMinuteChange = React.useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      if (!date) return
      updateDateTime(setMinutes(date, parseInt(e.target.value, 10)))
    },
    [date, updateDateTime]
  )

  const handlePeriodToggle = React.useCallback(
    (period: "AM" | "PM") => {
      if (!date) return
      const currentIsPM = date.getHours() >= 12
      if ((period === "PM") === currentIsPM) return
      const newHours = period === "PM" ? date.getHours() + 12 : date.getHours() - 12
      updateDateTime(setHours(date, newHours))
    },
    [date, updateDateTime]
  )

  const handleClear = React.useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation()
      onChange?.("")
    },
    [onChange]
  )

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          disabled={disabled}
          className={cn(
            "h-12 w-full justify-start rounded-xl border-input px-3 text-left text-sm font-normal",
            !date && "text-muted-foreground",
            className
          )}
        >
          <CalendarIcon className="mr-2 size-4 shrink-0 text-muted-foreground" />
          <span className="flex-1 truncate">
            {date ? format(date, "MMM d, yyyy  h:mm a") : placeholder}
          </span>
          {date && (
            <span
              role="button"
              tabIndex={-1}
              onClick={handleClear}
              className="ml-1 shrink-0 rounded-full p-0.5 text-muted-foreground hover:bg-accent hover:text-foreground"
            >
              <XIcon className="size-3.5" />
            </span>
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent
        align="start"
        className="w-auto max-w-[calc(100vw-2rem)] p-0"
      >
        <div className="p-3">
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleDateSelect}
            initialFocus
          />
        </div>

        {/* Time picker */}
        <div className="border-t border-border px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Time
            </span>
            <div className="ml-auto flex items-center gap-1.5">
              {/* Hour */}
              <select
                value={date ? hours12 : ""}
                onChange={handleHourChange}
                disabled={!date}
                className="h-9 w-14 rounded-lg border border-input bg-background px-1.5 text-center text-sm outline-none focus:border-ring focus:ring-[3px] focus:ring-ring/50 disabled:opacity-50"
              >
                {!date && <option value="">--</option>}
                {Array.from({ length: 12 }, (_, i) => i + 1).map((h) => (
                  <option key={h} value={h}>
                    {String(h).padStart(2, "0")}
                  </option>
                ))}
              </select>

              <span className="text-sm font-medium text-muted-foreground">:</span>

              {/* Minute */}
              <select
                value={date ? minutes : ""}
                onChange={handleMinuteChange}
                disabled={!date}
                className="h-9 w-14 rounded-lg border border-input bg-background px-1.5 text-center text-sm outline-none focus:border-ring focus:ring-[3px] focus:ring-ring/50 disabled:opacity-50"
              >
                {!date && <option value="">--</option>}
                {Array.from({ length: 60 }, (_, i) => i).map((m) => (
                  <option key={m} value={m}>
                    {String(m).padStart(2, "0")}
                  </option>
                ))}
              </select>

              {/* AM/PM toggle */}
              <div className="ml-1 flex h-9 overflow-hidden rounded-lg border border-input">
                <button
                  type="button"
                  disabled={!date}
                  onClick={() => handlePeriodToggle("AM")}
                  className={cn(
                    "px-2 text-xs font-medium transition-colors disabled:opacity-50",
                    date && !isPM
                      ? "bg-primary text-primary-foreground"
                      : "bg-background text-muted-foreground hover:bg-accent"
                  )}
                >
                  AM
                </button>
                <button
                  type="button"
                  disabled={!date}
                  onClick={() => handlePeriodToggle("PM")}
                  className={cn(
                    "px-2 text-xs font-medium transition-colors disabled:opacity-50",
                    date && isPM
                      ? "bg-primary text-primary-foreground"
                      : "bg-background text-muted-foreground hover:bg-accent"
                  )}
                >
                  PM
                </button>
              </div>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export { DateTimePicker }
