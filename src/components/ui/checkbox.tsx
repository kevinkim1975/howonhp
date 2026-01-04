"use client"

import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { CheckIcon } from "lucide-react"
import { cn } from "@/lib/utils"

export interface CheckboxProps extends Omit<React.ComponentProps<typeof CheckboxPrimitive.Root>, "children"> {
  label?: string
}

const Checkbox = React.forwardRef<React.ElementRef<typeof CheckboxPrimitive.Root>, CheckboxProps>(
  ({ className, label, id, ...props }, ref) => {
    const checkboxId = React.useId()

    return (
      <div className="flex items-center gap-2">
        <CheckboxPrimitive.Root
          ref={ref}
          id={id || checkboxId}
          className={cn(
            "peer size-5 shrink-0 rounded-md border-2 transition-all duration-200 outline-none",
            "border-[#E2E8F0] bg-white",
            "focus-visible:ring-4 focus-visible:ring-[rgba(74,144,217,0.35)]",
            "data-[state=checked]:border-[#4A90D9] data-[state=checked]:bg-[#4A90D9]",
            "data-[state=checked]:scale-[1.05]",
            "disabled:cursor-not-allowed disabled:opacity-50",
            className,
          )}
          {...props}
        >
          <CheckboxPrimitive.Indicator className="flex items-center justify-center text-white">
            <CheckIcon className="size-4 animate-in zoom-in-50 duration-200" strokeWidth={3} />
          </CheckboxPrimitive.Indicator>
        </CheckboxPrimitive.Root>
        {label && (
          <label
            htmlFor={id || checkboxId}
            className="text-sm text-[#1E3A5F] cursor-pointer select-none peer-disabled:cursor-not-allowed peer-disabled:opacity-50"
          >
            {label}
          </label>
        )}
      </div>
    )
  },
)

Checkbox.displayName = "Checkbox"

interface CheckboxGroupProps {
  label?: string
  required?: boolean
  children: React.ReactNode
  className?: string
}

const CheckboxGroup = React.forwardRef<HTMLDivElement, CheckboxGroupProps>(
  ({ label, required, children, className }, ref) => {
    return (
      <div ref={ref} className={cn("w-full", className)}>
        {label && (
          <div className="mb-3 text-sm font-medium text-[#1E3A5F]">
            {label}
            {required && <span className="ml-1 text-[#EF4444]">*</span>}
          </div>
        )}
        <div className="space-y-3">{children}</div>
      </div>
    )
  },
)

CheckboxGroup.displayName = "CheckboxGroup"

export { Checkbox, CheckboxGroup }
