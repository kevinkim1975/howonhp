'use client';

import * as React from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown, Phone } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

// 네비게이션 메뉴 구조
const navigation = {
  main: [
    { name: '회사소개', href: '/about/company' },
    {
      name: '서비스',
      href: '/services',
      children: [
        { name: '상담성공 X2', href: '/services/consulting-x2', desc: '상담 전환율 2배 향상' },
        { name: '홈페이지 개발', href: '/services/website-development', desc: '의료기관 맞춤 웹사이트' },
        { name: '키워드 바이럴', href: '/services/keyword-viral', desc: '검색 노출 최적화' },
        { name: '영상 콘텐츠 마케팅', href: '/services/video-marketing', desc: '브랜드 영상 제작' },
        { name: '웹디스플레이', href: '/services/web-display', desc: '타겟 광고 캠페인' },
        { name: '책쓰기 코칭', href: '/services/book-coaching', desc: '전문가 브랜딩' },
        { name: '컨설팅 솔루션', href: '/services/consulting-solution', desc: '경영 자문 서비스' },
      ],
    },
    { name: '포트폴리오', href: '/portfolio' },
    { name: '공지사항', href: '/about/notices' },
  ],
};

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [serviceMenuOpen, setServiceMenuOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  // 스크롤 감지
  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm'
          : 'bg-white'
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 lg:px-8">
        {/* 로고 */}
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="text-xl font-bold text-navy-800">
              호원앤컴퍼니
            </span>
          </Link>
        </div>

        {/* 모바일 메뉴 버튼 */}
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">메뉴 열기</span>
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        {/* 데스크톱 메뉴 */}
        <div className="hidden lg:flex lg:gap-x-8">
          {navigation.main.map((item) =>
            item.children ? (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => setServiceMenuOpen(true)}
                onMouseLeave={() => setServiceMenuOpen(false)}
              >
                <button
                  className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-700 hover:text-cta-blue transition-colors"
                >
                  {item.name}
                  <ChevronDown
                    className={cn(
                      'h-4 w-4 transition-transform duration-200',
                      serviceMenuOpen && 'rotate-180'
                    )}
                  />
                </button>

                {/* 서비스 드롭다운 */}
                <div
                  className={cn(
                    'absolute left-1/2 -translate-x-1/2 top-full pt-3 transition-all duration-200',
                    serviceMenuOpen
                      ? 'opacity-100 translate-y-0 pointer-events-auto'
                      : 'opacity-0 -translate-y-2 pointer-events-none'
                  )}
                >
                  <div className="w-72 rounded-xl bg-white p-3 shadow-lg ring-1 ring-gray-200">
                    {item.children.map((child) => (
                      <Link
                        key={child.name}
                        href={child.href}
                        className="group flex items-start gap-x-3 rounded-lg p-3 hover:bg-gray-50 transition-colors"
                      >
                        <div>
                          <p className="font-semibold text-gray-900 group-hover:text-cta-blue">
                            {child.name}
                          </p>
                          <p className="mt-0.5 text-sm text-gray-500">
                            {child.desc}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-semibold leading-6 text-gray-700 hover:text-cta-blue transition-colors"
              >
                {item.name}
              </Link>
            )
          )}
        </div>

        {/* CTA 버튼 */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-3">
          <Button variant="secondary" size="sm" asChild>
            <Link href="tel:02-000-0000">
              <Phone className="h-4 w-4" />
              전화 상담
            </Link>
          </Button>
          <Button variant="primary" size="sm" asChild>
            <Link href="/consult">상담 신청</Link>
          </Button>
        </div>
      </nav>

      {/* 모바일 메뉴 패널 */}
      <div
        className={cn(
          'lg:hidden fixed inset-0 z-50 transition-opacity duration-300',
          mobileMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        )}
      >
        {/* 오버레이 */}
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}
        />

        {/* 메뉴 패널 */}
        <div
          className={cn(
            'fixed inset-y-0 right-0 w-full max-w-sm bg-white px-6 py-6 shadow-xl transition-transform duration-300',
            mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          )}
        >
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="-m-1.5 p-1.5"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="text-xl font-bold text-navy-800">
                호원앤컴퍼니
              </span>
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">메뉴 닫기</span>
              <X className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-200">
              <div className="space-y-2 py-6">
                {navigation.main.map((item) =>
                  item.children ? (
                    <div key={item.name}>
                      <p className="block px-3 py-2 text-base font-semibold text-gray-900">
                        {item.name}
                      </p>
                      <div className="ml-4 space-y-1">
                        {item.children.map((child) => (
                          <Link
                            key={child.name}
                            href={child.href}
                            className="block px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-cta-blue rounded-lg"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="block px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50 hover:text-cta-blue rounded-lg"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )
                )}
              </div>
              <div className="py-6 space-y-3">
                <Button variant="secondary" size="md" className="w-full" asChild>
                  <Link href="tel:02-000-0000">
                    <Phone className="h-4 w-4" />
                    전화 상담
                  </Link>
                </Button>
                <Button variant="primary" size="md" className="w-full" asChild>
                  <Link href="/consult">상담 신청</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
