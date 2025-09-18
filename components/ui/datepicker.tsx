"use client"

import * as React from "react"
import { ChevronDownIcon } from "lucide-react"
import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface DatePickerProps {
  label?: string
  placeholder?: string
  value?: Date
  onChange?: (date: Date | undefined) => void
  className?: string
  disabled?: boolean
  minDate?: Date
  maxDate?: Date
  id?: string
  name?: string
  required?: boolean
  locale?: string
  buttonClassName?: string
  calendarClassName?: string
  isError?: boolean
}

export function DatePicker({
  label,
  placeholder = "Select date",
  value,
  onChange,
  className,
  disabled = false,
  minDate,
  maxDate,
  id = "date",
  name,
  required = false,
  locale = "tr-TR",
  buttonClassName,
  calendarClassName,
  isError = false
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false)
  const [date, setDate] = React.useState<Date | undefined>(value)

  React.useEffect(() => {
    setDate(value)
  }, [value])

  const handleSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate)
    onChange?.(selectedDate)
    setOpen(false)
  }

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {label && (
        <Label htmlFor={id} className="px-1">
          {label} {required && <span className="text-red-500">*</span>}
        </Label>
      )}
      <input 
        type="hidden" 
        name={name} 
        value={date?.toISOString() || ''} 
      />
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger className="w-full" asChild>
          <Button
            variant="outline"
            id={id}
            name={name}
            disabled={disabled}
            className={cn(
              "justify-between font-normal w-full",
              isError && "border-red-500",
              buttonClassName
            )}
          >
            {date ? date.toLocaleDateString(locale) : placeholder}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className={cn("w-auto overflow-hidden p-0", calendarClassName)} align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleSelect}
            disabled={(date) => {
              if (!date) return false
              
              const isBeforeMin = minDate ? date < minDate : false
              const isAfterMax = maxDate ? date > maxDate : false
              return isBeforeMin || isAfterMax
            }}
            captionLayout="dropdown"
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
