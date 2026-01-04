"use client"

import * as React from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Card } from "./card"

export interface ServiceCardProps {
  icon: React.ReactNode
  title: string
  description: string
  href: string
  className?: string
}

const ServiceCard = React.forwardRef<HTMLDivElement, ServiceCardProps>(
  ({ icon, title, description, href, className }, ref) => {
    const [isHovered, setIsHovered] = React.useState(false)

    return (
      <Link href={href}>
        <Card
          ref={ref}
          variant="elevated"
          hoverable
          className={cn("group overflow-hidden p-6", className)}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Icon Container */}
          <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-[12px] bg-gradient-to-br from-[#4A90D9]/10 to-[#4A90D9]/5 text-[#4A90D9] transition-all duration-200 group-hover:scale-110 group-hover:shadow-md">
            {icon}
          </div>

          {/* Title */}
          <h3 className="mb-2 text-xl font-bold text-[#1E3A5F] transition-colors duration-200 group-hover:text-[#4A90D9]">
            {title}
          </h3>

          {/* Description */}
          <p className="mb-4 text-sm leading-relaxed text-[#64748B]">{description}</p>

          {/* Arrow Indicator */}
          <div className="flex items-center gap-2 text-sm font-semibold text-[#4A90D9]">
            <span>자세히 보기</span>
            <ArrowRight className={cn("h-4 w-4 transition-transform duration-200", isHovered && "translate-x-1")} />
          </div>
        </Card>
      </Link>
    )
  },
)
ServiceCard.displayName = "ServiceCard"

export { ServiceCard }
