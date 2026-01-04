"use client"

import * as React from "react"
import { Input, type InputProps } from "./input"

export interface PhoneInputProps extends Omit<InputProps, "value" | "onChange" | "inputMode" | "maxLength"> {
  value?: string
  onChange?: (value: string) => void
}

const PhoneInput = React.forwardRef<HTMLInputElement, PhoneInputProps>(({ value = "", onChange, ...props }, ref) => {
  const formatPhoneNumber = (input: string): string => {
    // Remove all non-numeric characters
    const numbers = input.replace(/\D/g, "")

    // Limit to 11 digits
    const limited = numbers.slice(0, 11)

    // Format: 010-0000-0000
    if (limited.length <= 3) {
      return limited
    } else if (limited.length <= 7) {
      return `${limited.slice(0, 3)}-${limited.slice(3)}`
    } else {
      return `${limited.slice(0, 3)}-${limited.slice(3, 7)}-${limited.slice(7)}`
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value)
    onChange?.(formatted)
  }

  return (
    <Input
      ref={ref}
      type="tel"
      inputMode="numeric"
      value={value}
      onChange={handleChange}
      maxLength={13}
      placeholder="010-0000-0000"
      {...props}
    />
  )
})

PhoneInput.displayName = "PhoneInput"

export { PhoneInput }
