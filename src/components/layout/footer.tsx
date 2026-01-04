import Link from 'next/link';
import { Phone, Mail, MapPin } from 'lucide-react';

const footerNavigation = {
  services: [
    { name: '상담성공 X2', href: '/services/consulting-x2' },
    { name: '홈페이지 개발', href: '/services/website-development' },
    { name: '키워드 바이럴', href: '/services/keyword-viral' },
    { name: '영상 콘텐츠 마케팅', href: '/services/video-marketing' },
    { name: '웹디스플레이', href: '/services/web-display' },
    { name: '책쓰기 코칭', href: '/services/book-coaching' },
    { name: '컨설팅 솔루션', href: '/services/consulting-solution' },
  ],
  company: [
    { name: '회사 소개', href: '/about/company' },
    { name: '공지사항', href: '/about/notices' },
    { name: 'FAQ', href: '/about/faq' },
    { name: '칼럼', href: '/about/columns' },
    { name: '포트폴리오', href: '/portfolio' },
  ],
  legal: [
    { name: '이용약관', href: '/terms' },
    { name: '개인정보처리방침', href: '/privacy' },
  ],
};

export function Footer() {
  return (
    <footer className="bg-navy-900 text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* 회사 정보 */}
          <div className="lg:col-span-1">
            <Link href="/" className="text-xl font-bold">
              호원앤컴퍼니
            </Link>
            <p className="mt-4 text-sm text-gray-300">
              Since 2013, 의료기관 성장을 이끄는<br />
              컨설팅 & 마케팅 파트너
            </p>
            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-3 text-sm text-gray-300">
                <Phone className="h-4 w-4 text-cta-blue" />
                <a href="tel:02-000-0000" className="hover:text-white transition-colors">
                  02-000-0000
                </a>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-300">
                <Mail className="h-4 w-4 text-cta-blue" />
                <a href="mailto:contact@howoncompany.com" className="hover:text-white transition-colors">
                  contact@howoncompany.com
                </a>
              </div>
              <div className="flex items-start gap-3 text-sm text-gray-300">
                <MapPin className="h-4 w-4 text-cta-blue shrink-0 mt-0.5" />
                <span>서울특별시 강남구 테헤란로 123</span>
              </div>
            </div>
          </div>

          {/* 서비스 */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider uppercase">
              서비스
            </h3>
            <ul className="mt-4 space-y-2">
              {footerNavigation.services.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-300 hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 회사 */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider uppercase">
              회사
            </h3>
            <ul className="mt-4 space-y-2">
              {footerNavigation.company.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-300 hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 상담 CTA */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider uppercase">
              상담 문의
            </h3>
            <p className="mt-4 text-sm text-gray-300">
              의료기관 성장에 관한<br />
              무료 상담을 받아보세요.
            </p>
            <Link
              href="/consult"
              className="mt-4 inline-flex items-center justify-center rounded-lg bg-cta-blue px-5 py-3 text-sm font-semibold text-white hover:bg-cta-blue-hover transition-colors"
            >
              상담 신청하기
            </Link>
          </div>
        </div>

        {/* 하단 법적 정보 */}
        <div className="mt-12 border-t border-white/10 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-xs text-gray-400">
              © 2013-{new Date().getFullYear()} 호원앤컴퍼니. All rights reserved.
            </p>
            <div className="flex gap-4">
              {footerNavigation.legal.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-xs text-gray-400 hover:text-white transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
