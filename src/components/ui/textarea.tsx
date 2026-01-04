"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  helperText?: string
  autoResize?: boolean
  showCount?: boolean
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    { className, label, error, helperText, required, disabled, id, autoResize, showCount, maxLength, value, ...props },
    ref,
  ) => {
    const textareaRef = React.useRef<HTMLTextAreaElement | null>(null)
    const generatedId = React.useId()
    const textareaId = id || generatedId
    const errorId = `${textareaId}-error`
    const helperId = `${textareaId}-helper`

    const currentLength = typeof value === "string" ? value.length : 0
    const isNearLimit = maxLength ? currentLength / maxLength > 0.8 : false

    React.useEffect(() => {
      if (autoResize && textareaRef.current) {
        textareaRef.current.style.height = "auto"
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
      }
    }, [value, autoResize])

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={textareaId} className="mb-2 block text-sm font-medium text-[#1E3A5F]">
            {label}
            {required && <span className="ml-1 text-[#EF4444]">*</span>}
          </label>
        )}
        <div className="relative">
          <textarea
            ref={(node) => {
              textareaRef.current = node
              if (typeof ref === "function") {
                ref(node)
              } else if (ref) {
                ref.current = node
              }
            }}
            id={textareaId}
            disabled={disabled}
            maxLength={maxLength}
            value={value}
            aria-invalid={error ? "true" : "false"}
            aria-describedby={error ? errorId : helperText ? helperId : undefined}
            className={cn(
              "w-full rounded-xl border px-4 py-3 text-sm transition-all duration-200 outline-none resize-none",
              "bg-white text-[#1E3A5F] placeholder:text-slate-400",
              "border-[#E2E8F0]",
              "focus:border-[#4A90D9] focus:ring-4 focus:ring-[rgba(74,144,217,0.35)]",
              "disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400",
              error && "border-[#EF4444] focus:border-[#EF4444] focus:ring-[rgba(239,68,68,0.2)]",
              autoResize ? "min-h-[88px]" : "min-h-[120px]",
              className,
            )}
            {...props}
          />
          {showCount && maxLength && (
            <div
              className={cn(
                "absolute bottom-3 right-4 text-xs transition-colors",
                isNearLimit ? "text-[#EF4444]" : "text-slate-400",
              )}
            >
              {currentLength}/{maxLength}
            </div>
          )}
        </div>
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

Textarea.displayName = "Textarea"

export { Textarea }
