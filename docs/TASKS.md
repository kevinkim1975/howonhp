# 호원앤컴퍼니 홈페이지 개발 태스크

> **프로젝트:** 호원앤컴퍼니 홈페이지  
> **시작일:** 2026-01-04  
> **개발 환경:** GitHub + Vercel (로컬 npm 사용 안 함)  
> **UI 생성:** V0.dev MCP 연동

---

## 진행률 요약

| Phase | 완료 | 전체 | 진행률 |
|-------|------|------|--------|
| 1. 프로젝트 초기 설정 | 13 | 13 | 100% ✅ |
| 2. 공통 컴포넌트 & 레이아웃 | 23 | 23 | 100% ✅ |
| 3. 퍼블릭 페이지 | 0 | 22 | 0% |
| 4. API & 백엔드 | 0 | 15 | 0% |
| 5. 관리자 페이지 | 0 | 18 | 0% |
| 6. 외부 연동 & 통합 | 0 | 6 | 0% |
| 7. 테스트 & 배포 | 0 | 5 | 0% |
| **총계** | **36** | **102** | **35%** |

---

## Phase 1: 프로젝트 초기 설정 (13 tasks) ✅ 완료

### 1-A. 환경 구성
- [x] 1.1 GitHub 레포지토리 생성 (howonhp) `필수` ✅ 2026-01-04
  - 레포: `kevinkim1975/howonhp` (Public)
- [x] 1.2 Vercel 프로젝트 연결 및 자동 배포 설정 `필수` ✅ 2026-01-04
  - Production: https://howonhp.vercel.app
- [x] 1.3 Next.js 15 프로젝트 생성 (App Router) `필수` ✅ 2026-01-04
  - Next.js 15.1.9 (보안패치 CVE-2025-66478 적용)
  - React 19.0.1
- [x] 1.4 디렉토리 구조 설정 (TRD 기준) `필수` ✅ 2026-01-04
  - src/app, src/components, src/lib 구조
- [x] 1.5 Shadcn/ui 설치 및 설정 `필수` ✅ 2026-01-04
  - components.json, cn() 유틸리티
- [x] 1.6 Tailwind CSS 디자인 토큰 설정 (Design Guide 기준) `필수` ✅ 2026-01-04
  - Navy, CTA Blue, Grayscale, DV 토큰 적용
- [x] 1.7 ESLint 설정 `중요` ✅ 2026-01-04
  - eslint.config.mjs (Next.js flat config)
- [x] 1.8 Prettier 설정 `중요` ✅ 2026-01-04
  - .prettierrc.json, .prettierignore
  - prettier-plugin-tailwindcss 연동

### 1-B. 데이터베이스 & 인증
- [x] 1.9 Neon DB 가입 및 PostgreSQL 생성 `필수` ✅ 2026-01-04
  - Project: howonhp-db
  - Region: Singapore (ap-southeast-1)
  - PostgreSQL 17
- [x] 1.10 Prisma 설치 및 스키마 정의 (PRD 기준) `필수` ✅ 2026-01-04
  - Models: User, Consultation, Post, Portfolio, Setting
  - prisma/schema.prisma
  - src/lib/prisma.ts (싱글톤)
  - Commits: 4e6304d, ba4b475, bf4667c
- [x] 1.11 환경 변수 설정 (.env.local → Vercel) `필수` ✅ 2026-01-04
  - DATABASE_URL: Vercel 환경변수 설정 완료
  - Production/Preview/Development 모두 적용
- [x] 1.12 NextAuth.js 설정 (Credentials Provider) `필수` ✅ 2026-01-04
  - next-auth: ^4.24.11
  - @next-auth/prisma-adapter: ^1.0.7 (v4 호환)
  - bcryptjs: ^2.4.3
  - src/lib/auth.ts (Credentials Provider, JWT 전략)
  - src/app/api/auth/[...nextauth]/route.ts
  - src/types/next-auth.d.ts (타입 확장)
  - Commits: 6f5483ac, a746897, 4552a31, b64e415, f9dab8f
  - 배포 성공: dpl_J55LHpvANqNTmgNzwuEhrpRb1U9a (READY)

### 1-C. 스토리지
- [x] 1.13 Cloudflare R2 버킷 생성 및 연결 `중요` ✅ 2026-01-04
  - 버킷: howonhp-storage (APAC)
  - Public URL: https://pub-de1aa78e3630460d81a2ad7e1a428737.r2.dev
  - @aws-sdk/client-s3 패키지 추가
  - src/lib/r2.ts (업로드/삭제 유틸리티)
  - Vercel 환경변수 5개 설정 완료
  - Commit: bdf15d0
  - 배포 성공: dpl_5qSssr2E9fDbfPqPQXVtuDLqCuKt (READY)

---

## Phase 2: 공통 컴포넌트 & 레이아웃 (23 tasks) ✅ 완료

### 2-A. 레이아웃 컴포넌트
- [x] 2.1 Header (GNB) - 로고, 메뉴, CTA 버튼 `필수` ✅ 2026-01-04
  - src/components/layout/header.tsx
  - 스크롤 감지 스티키 헤더
  - Commit: 283e74a
- [x] 2.2 서비스 드롭다운 메뉴 (7개 서비스) `필수` ✅ 2026-01-04
  - 7개 서비스 메뉴 + 설명
  - ChevronDown 아이콘 회전 애니메이션
- [x] 2.3 모바일 햄버거 메뉴 `필수` ✅ 2026-01-04
  - 우측 슬라이드 패널
  - 서비스 하위 메뉴 계층 구조
- [x] 2.4 Footer - 회사정보, 링크, SNS `필수` ✅ 2026-01-04
  - src/components/layout/footer.tsx
  - 4컬럼 그리드 레이아웃
- [x] 2.5 QuickMenu (PC: 우측 세로 4버튼) `필수` ✅ 2026-01-04
  - src/components/layout/quick-menu.tsx
  - Hover 시 텍스트 확장 애니메이션
- [x] 2.6 QuickMenu (Mobile: FAB 펼침) `필수` ✅ 2026-01-04
  - FAB (Floating Action Button)
  - 순차 애니메이션
- [x] 2.7 PublicLayout (Header + Footer + QuickMenu) `필수` ✅ 2026-01-04
  - src/components/layout/public-layout.tsx
  - page.tsx에 적용 완료
  - Commit: aa620e3
- [x] 2.8 AdminLayout (Sidebar + Topbar) `중요` ✅ 2026-01-04
  - src/components/layout/admin-layout.tsx
  - Navy 배경 사이드바 (6개 메뉴)
  - 모바일 반응형, 알림/사용자 정보 표시
  - Commit: 3aa2b40

### 2-B. 공통 UI 컴포넌트
- [x] 2.9 Button (Primary/Secondary/Ghost variants) `필수` ✅ 2026-01-04
  - src/components/ui/button.tsx
  - class-variance-authority 사용
  - Variants: primary, secondary, ghost, ghost-light, link, destructive
  - Sizes: sm, md, lg, xl, icon
- [x] 2.10 Card (서비스/포트폴리오/게시물용) `필수` ✅ 2026-01-04
  - src/components/ui/card.tsx
  - Base Card, ServiceCard, PortfolioCard, PostCard, StatCard
  - Commit: da3e289
- [x] 2.11 Tabs (공지/FAQ/칼럼 3탭용) `필수` ✅ 2026-01-04
  - src/components/ui/tabs.tsx
  - Context API 기반 상태 관리
- [x] 2.12 Accordion (FAQ용) `필수` ✅ 2026-01-04
  - src/components/ui/accordion.tsx
  - single/multiple 모드 지원
- [x] 2.13 ChipFilter (포트폴리오 카테고리) `중요` ✅ 2026-01-04
  - src/components/ui/chip-filter.tsx
  - 선택된 칩 하이라이트
- [x] 2.14 Breadcrumbs `중요` ✅ 2026-01-04
  - src/components/ui/breadcrumbs.tsx
  - 홈 아이콘 + 경로 표시
- [x] 2.15 Toast/Alert `중요` ✅ 2026-01-04
  - src/components/ui/toast.tsx
  - success/error/warning/info 타입
  - ToastProvider + useToast 훅
- [x] 2.16 Skeleton Loader `중요` ✅ 2026-01-04
  - src/components/ui/skeleton.tsx
  - Skeleton, CardSkeleton, PostSkeleton, TableSkeleton, TextSkeleton
- [x] 2.17 Modal `중요` ✅ 2026-01-04
  - src/components/ui/modal.tsx
  - ESC 키 닫기, 배경 클릭 닫기
  - sm/md/lg/xl/full 사이즈
- [x] 2.18 Pagination `중요` ✅ 2026-01-04
  - src/components/ui/pagination.tsx
  - 이전/다음 + 페이지 번호 + 생략 표시

### 2-C. 폼 컴포넌트
- [x] 2.19 TextInput (이름/이메일용) `필수` ✅ 2026-01-04
  - src/components/ui/input.tsx
  - label, error, helperText 지원
  - Commit: 88fd031
- [x] 2.20 PhoneInput (자동 하이픈) `필수` ✅ 2026-01-04
  - src/components/ui/phone-input.tsx
  - 010-0000-0000 자동 포맷팅
- [x] 2.21 CheckboxGroup (서비스 선택용) `필수` ✅ 2026-01-04
  - src/components/ui/checkbox.tsx
  - Checkbox, CheckboxGroup 컴포넌트
  - 1~4 컬럼 그리드 지원
- [x] 2.22 Textarea (메시지용) `중요` ✅ 2026-01-04
  - src/components/ui/textarea.tsx
  - 글자수 카운터 (showCount)
- [x] 2.23 ConsentCheckbox (개인정보 동의) `필수` ✅ 2026-01-04
  - src/components/ui/checkbox.tsx
  - 개인정보처리방침 링크 포함

---

## Phase 3: 퍼블릭 페이지 (22 tasks)

### 3-A. 메인 & 핵심 페이지
- [ ] 3.1 메인 페이지 (/) - Hero 섹션 `필수`
- [ ] 3.2 메인 페이지 - Since 2013 섹션 `필수`
- [ ] 3.3 메인 페이지 - Service Sectors 섹션 `필수`
- [ ] 3.4 메인 페이지 - 7개 서비스 그리드 섹션 `필수`
- [ ] 3.5 메인 페이지 - 공지/FAQ/칼럼 3탭 섹션 `필수`
- [ ] 3.6 메인 페이지 - Contact 섹션 (네이버 지도) `필수`
- [ ] 3.7 상담 신청 페이지 (/consult) `필수`

### 3-B. 회사소개 섹션
- [ ] 3.8 회사 소개 (/about/company) `중요`
- [ ] 3.9 공지사항 목록 (/about/notices) `중요`
- [ ] 3.10 공지사항 상세 (/about/notices/[slug]) `중요`
- [ ] 3.11 FAQ (/about/faq) `중요`
- [ ] 3.12 칼럼 목록 (/about/columns) `중요`
- [ ] 3.13 칼럼 상세 (/about/columns/[slug]) `중요`

### 3-C. 서비스 페이지 (7개)
- [ ] 3.14 상담성공 X2 (/services/consulting-x2) `필수`
- [ ] 3.15 홈페이지 개발 (/services/website-development) `필수`
- [ ] 3.16 키워드 바이럴 (/services/keyword-viral) `필수`
- [ ] 3.17 영상 콘텐츠 마케팅 (/services/video-marketing) `필수`
- [ ] 3.18 웹디스플레이 (/services/web-display) `필수`
- [ ] 3.19 책쓰기 코칭 (/services/book-coaching) `필수`
- [ ] 3.20 컨설팅 솔루션 (/services/consulting-solution) `필수`

### 3-D. 포트폴리오 & 기타
- [ ] 3.21 포트폴리오 목록 (/portfolio) `선택`
- [ ] 3.22 포트폴리오 상세 (/portfolio/[slug]) `선택`

---

## Phase 4: API & 백엔드 (15 tasks)

### 4-A. 상담/회원 API
- [ ] 4.1 POST /api/consultations - 상담 접수 `필수`
- [ ] 4.2 자동 회원 등록 로직 `필수`
- [ ] 4.3 reCAPTCHA v2 검증 `필수`

### 4-B. 게시물 API
- [ ] 4.4 GET /api/posts/notices - 공지사항 목록 `필수`
- [ ] 4.5 GET /api/posts/notices/[slug] - 공지 상세 `필수`
- [ ] 4.6 GET /api/posts/faq - FAQ 목록 `필수`
- [ ] 4.7 GET /api/posts/columns - 칼럼 목록 `필수`
- [ ] 4.8 GET /api/posts/columns/[slug] - 칼럼 상세 `필수`

### 4-C. 관리자 API
- [ ] 4.9 POST /api/auth/signin - 관리자 로그인 `중요`
- [ ] 4.10 CRUD /api/admin/consultations `중요`
- [ ] 4.11 CRUD /api/admin/posts `중요`
- [ ] 4.12 CRUD /api/admin/users `중요`

### 4-D. 파일 업로드
- [ ] 4.13 POST /api/upload - R2 업로드 `중요`
- [ ] 4.14 썸네일 자동 생성 `선택`
- [ ] 4.15 이미지 최적화 처리 `선택`

---

## Phase 5: 관리자 페이지 (18 tasks)

### 5-A. 인증
- [ ] 5.1 관리자 로그인 페이지 (/admin/login) `필수`
- [ ] 5.2 세션 관리 및 보호 라우트 `필수`

### 5-B. 대시보드
- [ ] 5.3 대시보드 (/admin) - 통계 카드 `중요`
- [ ] 5.4 대시보드 - 최근 상담 목록 `중요`
- [ ] 5.5 대시보드 - 최근 게시물 목록 `중요`

### 5-C. 상담 관리
- [ ] 5.6 상담 목록 (/admin/consultations) `필수`
- [ ] 5.7 상담 상세 (/admin/consultations/[id]) `필수`
- [ ] 5.8 상담 상태 변경 (신규→완료) `필수`
- [ ] 5.9 상담 CSV 내보내기 `선택`

### 5-D. 게시물 관리
- [ ] 5.10 공지사항 CRUD (/admin/posts/notices) `필수`
- [ ] 5.11 FAQ CRUD (/admin/posts/faq) `필수`
- [ ] 5.12 칼럼 CRUD (/admin/posts/columns) `필수`
- [ ] 5.13 에디터 통합 (Tiptap or Toast UI) `중요`

### 5-E. 포트폴리오 관리
- [ ] 5.14 포트폴리오 CRUD (/admin/portfolio) `선택`
- [ ] 5.15 포트폴리오 이미지 업로드 `선택`

### 5-F. 회원 관리
- [ ] 5.16 회원 목록 (/admin/users) `중요`
- [ ] 5.17 회원 상세 및 상담 이력 `중요`
- [ ] 5.18 회원 검색 및 필터 `선택`

---

## Phase 6: 외부 연동 & 통합 (6 tasks)

- [ ] 6.1 네이버 지도 통합 (회사 위치) `필수`
- [ ] 6.2 Google reCAPTCHA v2 설정 `필수`
- [ ] 6.3 Google Analytics 4 연동 `중요`
- [ ] 6.4 메타 태그 SEO 최적화 `중요`
- [ ] 6.5 Open Graph 이미지 생성 `선택`
- [ ] 6.6 사이트맵 생성 (/sitemap.xml) `중요`

---

## Phase 7: 테스트 & 배포 (5 tasks)

- [ ] 7.1 모바일 반응형 테스트 `필수`
- [ ] 7.2 크로스 브라우저 테스트 `중요`
- [ ] 7.3 Lighthouse 성능 최적화 (90점+) `중요`
- [ ] 7.4 Production 환경 변수 확인 `필수`
- [ ] 7.5 도메인 연결 (howoncompany.com) `필수`

---

## 변경 이력

| 날짜 | 변경 내용 |
|------|-----------|
| 2026-01-04 | Task 1.1~1.8 완료 (환경 구성) |
| 2026-01-04 | Task 1.9 완료 (Neon DB 생성) |
| 2026-01-04 | Task 1.10 완료 (Prisma 스키마) |
| 2026-01-04 | Task 1.11 완료 (환경 변수 설정) |
| 2026-01-04 | Task 1.12 완료 (NextAuth.js 설정 - 배포 성공) |
| 2026-01-04 | Task 1.13 완료 (Cloudflare R2 스토리지 - Phase 1 완료!) |
| 2026-01-04 | Task 2.1~2.7, 2.9 완료 (Header, Footer, QuickMenu, PublicLayout, Button) |
| 2026-01-04 | Task 2.10~2.18 완료 (Card, Tabs, Accordion, ChipFilter, Breadcrumbs, Toast, Skeleton, Modal, Pagination) |
| 2026-01-04 | Task 2.19~2.23 완료 (Input, PhoneInput, Textarea, Checkbox, ConsentCheckbox) |
| 2026-01-04 | Task 2.8 완료 (AdminLayout - Phase 2 완료!) |