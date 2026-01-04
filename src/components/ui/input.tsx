"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string
  error?: string
  helperText?: string
  type?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, required, disabled, id, type = "text", ...props }, ref) => {
    const generatedId = React.useId()
    const inputId = id || generatedId
    const errorId = `${inputId}-error`
    const helperId = `${inputId}-helper`

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={inputId} className="mb-2 block text-sm font-medium text-[#1E3A5F]">
            {label}
            {required && <span className="ml-1 text-[#EF4444]">*</span>}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          type={type}
          disabled={disabled}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? errorId : helperText ? helperId : undefined}
          className={cn(
            "h-11 w-full rounded-xl border px-4 text-sm transition-all duration-200 outline-none",
            "bg-white text-[#1E3A5F] placeholder:text-slate-400",
            "border-[#E2E8F0]",
            "focus:border-[#4A90D9] focus:ring-4 focus:ring-[rgba(74,144,217,0.35)]",
            "disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400",
            error && "border-[#EF4444] focus:border-[#EF4444] focus:ring-[rgba(239,68,68,0.2)]",
            className,
          )}
          {...props}
        />
        {error && (
          <p id={errorId} className="mt-1.5 text-xs text-[#EF4444]">
            {error}
          </p>
        )}
        {helperText && !error && (
          <p id={helperId} className="mt-1.5 text-xs text-slate-500">
            {helperText}
          </p>
        )}
      </div>
    )
  },
)

Input.displayName = "Input"

export { Input }
