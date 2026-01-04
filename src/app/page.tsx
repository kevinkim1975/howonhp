import Link from 'next/link';
import { PublicLayout } from '@/components/layout';
import { Button } from '@/components/ui';

export default function Home() {
  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="bg-navy-800 text-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4 leading-tight">
            의료기관 성장을 이끄는
            <br />
            컨설팅 &amp; 마케팅 파트너
          </h1>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl">
            Since 2013. 호원앤컴퍼니는 의료기관의 지속 가능한 성장을 위한
            전문 컨설팅과 마케팅 솔루션을 제공합니다.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="primary" size="lg" asChild>
              <Link href="/consult">상담 신청</Link>
            </Button>
            <Button variant="ghost" size="lg" asChild>
              <Link href="/portfolio">사례 보기</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Placeholder for other sections */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-500">🚧 개발 진행 중...</p>
          <p className="text-sm text-gray-400 mt-2">
            Phase 2 진행 중 - Header, Footer, QuickMenu 완료
          </p>
        </div>
      </section>
    </PublicLayout>
  );
}
