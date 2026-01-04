"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"
import { cn } from "@/lib/utils"

interface TabsContextValue {
  variant: "underline" | "pills" | "boxed"
}

const TabsContext = React.createContext<TabsContextValue | undefined>(undefined)

interface TabsProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root> {
  variant?: "underline" | "pills" | "boxed"
}

const Tabs = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Root>,
  TabsProps
>(({ className, variant = "underline", ...props }, ref) => (
  <TabsContext.Provider value={{ variant }}>
    <TabsPrimitive.Root
      ref={ref}
      className={cn("w-full", className)}
      {...props}
    />
  </TabsContext.Provider>
))
Tabs.displayName = TabsPrimitive.Root.displayName

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => {
  const context = React.useContext(TabsContext)
  const variant = context?.variant ?? "underline"

  const variantClasses = {
    underline: "border-b border-[#E2E8F0] gap-6",
    pills: "bg-gray-100 p-1 gap-1 rounded-lg",
    boxed: "border border-[#E2E8F0] bg-white gap-0 rounded-t-xl",
  }

  return (
    <TabsPrimitive.List
      ref={ref}
      className={cn(
        "relative inline-flex items-center justify-start w-full",
        variantClasses[variant],
        className
      )}
      {...props}
    />
  )
})
TabsList.displayName = TabsPrimitive.List.displayName

interface TabsTriggerProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> {
  icon?: React.ReactNode
}

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  TabsTriggerProps
>(({ className, children, icon, ...props }, ref) => {
  const context = React.useContext(TabsContext)
  const variant = context?.variant ?? "underline"

  const variantClasses = {
    underline: cn(
      "relative px-4 py-3 text-sm font-medium text-gray-600",
      "hover:text-[#1E3A5F] transition-colors duration-200",
      "data-[state=active]:text-[#1E3A5F]",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(74,144,217,0.35)] rounded-t",
      "after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5",
      "data-[state=active]:after:bg-[#4A90D9]",
      "after:transition-all after:duration-200"
    ),
    pills: cn(
      "px-4 py-2 text-sm font-medium text-gray-600 rounded-md",
      "hover:text-[#1E3A5F] transition-all duration-200",
      "data-[state=active]:bg-white data-[state=active]:text-[#1E3A5F] data-[state=active]:shadow-sm",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(74,144,217,0.35)]"
    ),
    boxed: cn(
      "flex-1 px-4 py-3 text-sm font-medium text-gray-600 border-r border-[#E2E8F0] last:border-r-0",
      "hover:bg-gray-50 transition-colors duration-200",
      "data-[state=active]:bg-[#1E3A5F] data-[state=active]:text-white",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[rgba(74,144,217,0.35)]",
      "first:rounded-tl-xl last:rounded-tr-xl"
    ),
  }

  return (
    <TabsPrimitive.Trigger
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center gap-2 whitespace-nowrap",
        "disabled:pointer-events-none disabled:opacity-50",
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </TabsPrimitive.Trigger>
  )
})
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(74,144,217,0.35)] rounded",
      "data-[state=active]:animate-in data-[state=active]:fade-in-0",
      className
    )}
    {...props}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent }
