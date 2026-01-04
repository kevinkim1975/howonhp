export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-navy-800 text-white py-20">
        <div className="max-w-container mx-auto px-4">
          <h1 className="text-h1 mb-4">
            의료기관 성장을 이끄는
            <br />
            컨설팅 & 마케팅 파트너
          </h1>
          <p className="text-body-lg text-gray-300 mb-8 max-w-2xl">
            Since 2013. 호원앤컴퍼니는 의료기관의 지속 가능한 성장을 위한
            전문 컨설팅과 마케팅 솔루션을 제공합니다.
          </p>
          <div className="flex gap-4">
            <button className="bg-cta hover:bg-cta-hover active:bg-cta-active text-white px-8 py-3 rounded-lg font-semibold transition-colors">
              상담 신청
            </button>
            <button className="border border-white/30 hover:bg-white/10 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
              사례 보기
            </button>
          </div>
        </div>
      </section>

      {/* Placeholder for other sections */}
      <section className="py-20">
        <div className="max-w-container mx-auto px-4 text-center">
          <p className="text-gray-500">🚧 개발 진행 중...</p>
          <p className="text-caption text-gray-400 mt-2">
            Task 1.3, 1.4, 1.5, 1.6 완료 - Next.js 15 + Tailwind CSS 초기 설정
          </p>
        </div>
      </section>
    </main>
  );
}
