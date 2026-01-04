"use client"

import * as React from "react"
import { CheckCircle, XCircle, AlertTriangle, Info, X } from "lucide-react"
import { cn } from "@/lib/utils"

export interface Toast {
  id: string
  title?: string
  description?: string
  variant?: "default" | "success" | "error" | "warning" | "info"
  duration?: number
  action?: {
    label: string
    onClick: () => void
  }
}

interface ToastContextValue {
  toasts: Toast[]
  toast: (toast: Omit<Toast, "id">) => void
  dismiss: (id: string) => void
}

const ToastContext = React.createContext<ToastContextValue | undefined>(
  undefined
)

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<Toast[]>([])

  const toast = React.useCallback((newToast: Omit<Toast, "id">) => {
    const id = Math.random().toString(36).substring(2, 9)
    const duration = newToast.duration ?? 5000

    setToasts((prev) => [...prev, { ...newToast, id }])

    if (duration > 0) {
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id))
      }, duration)
    }
  }, [])

  const dismiss = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ toasts, toast, dismiss }}>
      {children}
      <div className="fixed top-4 right-4 z-50 flex flex-col gap-3 pointer-events-none">
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onDismiss={dismiss} />
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = React.useContext(ToastContext)
  if (!context) {
    throw new Error("useToast must be used within ToastProvider")
  }
  return context
}

interface ToastItemProps {
  toast: Toast
  onDismiss: (id: string) => void
}

function ToastItem({ toast, onDismiss }: ToastItemProps) {
  const [progress, setProgress] = React.useState(100)
  const duration = toast.duration ?? 5000

  React.useEffect(() => {
    if (duration <= 0) return

    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev - (100 / duration) * 50
        return newProgress <= 0 ? 0 : newProgress
      })
    }, 50)

    return () => clearInterval(interval)
  }, [duration])

  const variantConfig = {
    default: {
      bg: "bg-white",
      border: "border-[#E2E8F0]",
      icon: null,
      iconColor: "",
      progressColor: "bg-gray-400",
    },
    success: {
      bg: "bg-white",
      border: "border-[#10B981]",
      icon: CheckCircle,
      iconColor: "text-[#10B981]",
      progressColor: "bg-[#10B981]",
    },
    error: {
      bg: "bg-white",
      border: "border-[#EF4444]",
      icon: XCircle,
      iconColor: "text-[#EF4444]",
      progressColor: "bg-[#EF4444]",
    },
    warning: {
      bg: "bg-white",
      border: "border-[#F59E0B]",
      icon: AlertTriangle,
      iconColor: "text-[#F59E0B]",
      progressColor: "bg-[#F59E0B]",
    },
    info: {
      bg: "bg-white",
      border: "border-[#3B82F6]",
      icon: Info,
      iconColor: "text-[#3B82F6]",
      progressColor: "bg-[#3B82F6]",
    },
  }

  const config = variantConfig[toast.variant ?? "default"]
  const Icon = config.icon

  return (
    <div
      className={cn(
        "pointer-events-auto w-[380px] shadow-lg border-l-4 overflow-hidden rounded-xl",
        "animate-in slide-in-from-right-full duration-300",
        config.bg,
        config.border
      )}
    >
      <div className="flex items-start gap-3 p-4">
        {Icon && (
          <Icon className={cn("h-5 w-5 flex-shrink-0 mt-0.5", config.iconColor)} />
        )}
        <div className="flex-1 min-w-0">
          {toast.title && (
            <div className="font-semibold text-[#1E3A5F] text-sm mb-1">
              {toast.title}
            </div>
          )}
          {toast.description && (
            <div className="text-sm text-gray-600 leading-relaxed">
              {toast.description}
            </div>
          )}
          {toast.action && (
            <button
              onClick={toast.action.onClick}
              className="mt-2 text-sm font-medium text-[#4A90D9] hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(74,144,217,0.35)] rounded"
            >
              {toast.action.label}
            </button>
          )}
        </div>
        <button
          onClick={() => onDismiss(toast.id)}
          className="text-gray-400 hover:text-gray-600 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(74,144,217,0.35)] rounded p-1"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
      {duration > 0 && (
        <div className="h-1 bg-gray-100">
          <div
            className={cn("h-full transition-all", config.progressColor)}
            style={{
              width: `${progress}%`,
              transition: "width 50ms linear",
            }}
          />
        </div>
      )}
    </div>
  )
}
