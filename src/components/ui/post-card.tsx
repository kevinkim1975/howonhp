"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { Calendar, User } from "lucide-react"
import { cn } from "@/lib/utils"
import { Card } from "./card"

export interface PostCardProps {
  image: string
  category: string
  title: string
  excerpt: string
  date: string
  author: string
  href: string
  className?: string
}

const PostCard = React.forwardRef<HTMLDivElement, PostCardProps>(
  ({ image, category, title, excerpt, date, author, href, className }, ref) => {
    return (
      <Link href={href}>
        <Card ref={ref} variant="elevated" hoverable className={cn("group overflow-hidden", className)}>
          {/* Image Container */}
          <div className="relative h-48 w-full overflow-hidden">
            <Image
              src={image || "/placeholder.svg"}
              alt={title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            {/* Category Badge */}
            <div className="absolute left-4 top-4 rounded-full bg-[#4A90D9] px-3 py-1 text-xs font-semibold text-white shadow-lg">
              {category}
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Title */}
            <h3 className="mb-3 text-xl font-bold leading-tight text-[#1E3A5F] transition-colors duration-200 group-hover:text-[#4A90D9] line-clamp-2">
              {title}
            </h3>

            {/* Excerpt */}
            <p className="mb-4 text-sm leading-relaxed text-[#64748B] line-clamp-3">{excerpt}</p>

            {/* Meta Information */}
            <div className="flex items-center gap-4 text-xs text-[#94A3B8]">
              <div className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" />
                <span>{date}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <User className="h-3.5 w-3.5" />
                <span>{author}</span>
              </div>
            </div>
          </div>
        </Card>
      </Link>
    )
  },
)
PostCard.displayName = "PostCard"

export { PostCard }
