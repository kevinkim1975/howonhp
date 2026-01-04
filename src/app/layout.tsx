import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "호원앤컴퍼니 | 의료기관 성장 파트너",
  description: "의료기관 컨설팅, 마케팅, 홈페이지 개발 전문 기업. Since 2013.",
  keywords: "의료기관 컨설팅, 병원 마케팅, 의료 홈페이지, 키워드 광고, 바이럴 마케팅",
  openGraph: {
    title: "호원앤컴퍼니 | 의료기관 성장 파트너",
    description: "의료기관 컨설팅, 마케팅, 홈페이지 개발 전문 기업. Since 2013.",
    type: "website",
    locale: "ko_KR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
