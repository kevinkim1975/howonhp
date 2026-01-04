'use client';

import * as React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import {
  BarChart3,
  Video,
  BookOpen,
  Users,
  Plus,
  X,
  Phone,
} from 'lucide-react';

const quickMenuItems = [
  {
    name: '마케팅 분석',
    href: '/consult?service=marketing-analysis',
    icon: BarChart3,
    color: 'bg-cta-blue',
  },
  {
    name: '영상 마케팅',
    href: '/consult?service=video-marketing',
    icon: Video,
    color: 'bg-navy-700',
  },
  {
    name: '저서 안내',
    href: '/about/books',
    icon: BookOpen,
    color: 'bg-navy-700',
  },
  {
    name: '경영 자문',
    href: '/consult?service=consulting',
    icon: Users,
    color: 'bg-navy-700',
  },
];

export function QuickMenu() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      {/* PC: 우측 세로 버튼 */}
      <div className="fixed right-0 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col">
        {quickMenuItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="group flex items-center bg-navy-800 text-white hover:bg-cta-blue transition-all duration-200"
          >
            <span className="flex items-center justify-center w-12 h-12">
              <item.icon className="h-5 w-5" />
            </span>
            <span className="overflow-hidden whitespace-nowrap transition-all duration-200 w-0 group-hover:w-24 group-hover:pr-3 text-sm font-medium">
              {item.name}
            </span>
          </Link>
        ))}
        <Link
          href="tel:02-000-0000"
          className="flex items-center justify-center w-12 h-12 bg-cta-blue text-white hover:bg-cta-blue-hover transition-colors"
        >
          <Phone className="h-5 w-5" />
        </Link>
      </div>

      {/* Mobile: FAB 펼침 */}
      <div className="fixed bottom-5 right-5 z-40 lg:hidden">
        {/* 펼쳐진 메뉴 아이템들 */}
        <div
          className={cn(
            'absolute bottom-16 right-0 flex flex-col gap-3 transition-all duration-300',
            isOpen
              ? 'opacity-100 translate-y-0 pointer-events-auto'
              : 'opacity-0 translate-y-4 pointer-events-none'
          )}
        >
          {quickMenuItems.map((item, index) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-full px-4 py-3 text-white shadow-lg transition-all duration-200',
                item.color,
                'hover:scale-105'
              )}
              style={{
                transitionDelay: isOpen ? `${index * 50}ms` : '0ms',
              }}
              onClick={() => setIsOpen(false)}
            >
              <item.icon className="h-5 w-5" />
              <span className="text-sm font-medium whitespace-nowrap">
                {item.name}
              </span>
            </Link>
          ))}
          <a
            href="tel:02-000-0000"
            className="flex items-center gap-3 rounded-full bg-success px-4 py-3 text-white shadow-lg hover:scale-105 transition-transform"
            onClick={() => setIsOpen(false)}
          >
            <Phone className="h-5 w-5" />
            <span className="text-sm font-medium">전화 상담</span>
          </a>
        </div>

        {/* FAB 토글 버튼 */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            'flex items-center justify-center w-14 h-14 rounded-full shadow-lg transition-all duration-300',
            isOpen
              ? 'bg-gray-800 rotate-45'
              : 'bg-cta-blue hover:bg-cta-blue-hover'
          )}
        >
          {isOpen ? (
            <X className="h-6 w-6 text-white" />
          ) : (
            <Plus className="h-6 w-6 text-white" />
          )}
        </button>
      </div>
    </>
  );
}
