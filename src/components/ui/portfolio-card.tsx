"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { Eye } from "lucide-react"
import { cn } from "@/lib/utils"
import { Card } from "./card"
import { Button } from "./button"

export interface PortfolioCardProps {
  image: string
  title: string
  client: string
  category: string
  href: string
  className?: string
}

const PortfolioCard = React.forwardRef<HTMLDivElement, PortfolioCardProps>(
  ({ image, title, client, category, href, className }, ref) => {
    const [isHovered, setIsHovered] = React.useState(false)

    return (
      <Link href={href}>
        <Card
          ref={ref}
          variant="elevated"
          hoverable
          className={cn("group relative overflow-hidden", className)}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Image */}
          <div className="relative aspect-[4/3] w-full overflow-hidden">
            <Image
              src={image || "/placeholder.svg"}
              alt={title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />

            {/* Overlay */}
            <div
              className={cn(
                "absolute inset-0 bg-gradient-to-t from-[#1E3A5F]/95 via-[#1E3A5F]/60 to-transparent transition-opacity duration-300",
                isHovered ? "opacity-100" : "opacity-0",
              )}
            >
              {/* Content Container */}
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                {/* Category Badge */}
                <div
                  className={cn(
                    "mb-3 inline-flex w-fit rounded-full bg-[#4A90D9] px-3 py-1 text-xs font-semibold text-white transition-all duration-300",
                    isHovered ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0",
                  )}
                >
                  {category}
                </div>

                {/* Title */}
                <h3
                  className={cn(
                    "mb-1 text-2xl font-bold text-white transition-all duration-300 delay-75",
                    isHovered ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0",
                  )}
                >
                  {title}
                </h3>

                {/* Client */}
                <p
                  className={cn(
                    "mb-4 text-sm text-white/80 transition-all duration-300 delay-100",
                    isHovered ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0",
                  )}
                >
                  {client}
                </p>

                {/* View Button */}
                <div
                  className={cn(
                    "transition-all duration-300 delay-150",
                    isHovered ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0",
                  )}
                >
                  <Button
                    variant="primary"
                    size="sm"
                    leftIcon={<Eye className="h-4 w-4" />}
                    className="pointer-events-none"
                  >
                    프로젝트 보기
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </Link>
    )
  },
)
PortfolioCard.displayName = "PortfolioCard"

export { PortfolioCard }
