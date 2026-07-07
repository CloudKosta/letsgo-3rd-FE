# LetsGo ✈️ — 프론트엔드 (React SPA)

> 여행 일정 계획·공유 플랫폼 **LetsGo**의 React 프론트엔드입니다.
> 3차 스프린트에서 기존 **Thymeleaf(SSR)** 화면을 **React 19 기반 SPA**로 재구축하여 **프론트엔드/백엔드를 분리**하고,
> Spring Boot REST API 및 FastAPI 챗봇 서버와 **JWT 인증**으로 통신합니다.

<p>
  <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black">
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white">
  <img src="https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white">
  <img src="https://img.shields.io/badge/React%20Router-7-CA4245?logo=reactrouter&logoColor=white">
  <img src="https://img.shields.io/badge/Zustand-state-764ABC">
  <img src="https://img.shields.io/badge/Axios-HTTP-5A29E4?logo=axios&logoColor=white">
  <img src="https://img.shields.io/badge/TailwindCSS-4-06B6D4?logo=tailwindcss&logoColor=white">
  <img src="https://img.shields.io/badge/Tiptap-editor-000000">
</p>

---

## 📌 개요

| 항목 | 내용 |
|------|------|
| **개발 기간** | 3차 스프린트 · **2026.06.23 ~ 2026.07.03** (약 2주) |
| **역할** | LetsGo 서비스의 **클라이언트(SPA)** — REST API 소비 · JWT 인증 · 화면 렌더링 |
| **UI 컨셉** | **모바일 우선(Phone Layout)** — 상단 헤더 + 하단 탭 네비게이션 구조 |
| **백엔드(Spring Boot)** | https://github.com/sinee0601/letsgo-3rd-sprint-springboot |
| **AI 챗봇(FastAPI)** | https://github.com/sinee0601/letsgo-chatbot |

---

## 🏗️ 아키텍처 개요

```
[React SPA : 5432]
   │  Axios (JWT Bearer 헤더)
   ├──────────────▶ [Spring Boot REST API : 5531]  ──▶ MariaDB
   └──────────────▶ [FastAPI 챗봇 서버]            (Gemini)
```

- **인증**: 로그인/소셜 로그인으로 발급받은 **JWT를 로컬에 저장**하고, Axios 요청 인터셉터가 모든 API 호출에 `Authorization: Bearer <token>` 헤더를 자동 주입합니다.
- **세션 만료 처리**: 토큰 만료 또는 `401` 응답 시 자동 로그아웃 후 로그인 화면으로 이동하고 만료 토스트를 표시합니다.
- **소셜 로그인**: 백엔드 Google OAuth2 성공 후 `/oauth/callback?token=...`로 리다이렉트되며, `OAuthCallback` 화면에서 토큰을 저장하고 로그인 상태로 전환합니다.
- **챗봇**: 별도 Axios 인스턴스(`VITE_CHATBOT_API_BASE_URL`)로 FastAPI 서버와 통신하며, `sessionStorage`의 UUID로 대화 세션을 유지합니다.

---

## 🧩 주요 화면 (Routes)

| 경로 | 화면 | 설명 |
|------|------|------|
| `/` | **Place** | 장소 조회 (관광/숙박/음식점) · 검색 · 네이버 지도 |
| `/cart` | **Cart** | 담은 장소로 일정 생성 (장바구니) |
| `/mySchedule/*` | **MySchedule** | 나의 일정 목록 · 상세(동선/예산/할일/공유 탭) |
| `/postSchedule/*` | **PostSchedule** | 일정 공유 게시판 · 상세 보기 |
| `/chat` | **ChatBot** | AI 여행 챗봇 (FastAPI/Gemini) |
| `/user/*` | **User** | 로그인 · 회원가입 · 아이디/비밀번호 찾기 |
| `/oauth/callback` | **OAuthCallback** | Google 소셜 로그인 토큰 수신·저장 |

---

## 🛠️ 기술 스택

| 구분 | 기술 |
|------|------|
| **Language** | TypeScript |
| **Framework** | React 19 |
| **Build / Dev** | Vite 8 (dev 포트 `5432`) |
| **Routing** | React Router 7 |
| **State** | Zustand (`authStore` · `cartStore` · `toastStore`) |
| **HTTP** | Axios (요청/응답 인터셉터로 JWT·세션 만료 처리) |
| **Styling** | TailwindCSS 4, CSS Modules |
| **Editor** | Tiptap (리치 텍스트) |
| **Icons** | lucide-react |
| **Date** | react-day-picker |
| **Map** | NaverMap API |

---

## 📂 프로젝트 구조

```
letsgo-react-app
├─ src
│  ├─ api                 # Axios 인스턴스 · 도메인별 API · JWT/토큰 유틸
│  │  ├─ axiosInstance.ts #   백엔드 API 인스턴스 (JWT 인터셉터)
│  │  ├─ chatbotApi.ts    #   FastAPI 챗봇 인스턴스
│  │  ├─ tokenStorage.ts  #   토큰 저장/조회
│  │  └─ decodeToken.ts   #   JWT 디코드·만료 검사
│  ├─ components
│  │  ├─ common           # Input · Tabs · Toast · SearchInput 등 공통 UI
│  │  ├─ layout           # Header · NavBar · PhoneLayout(라우팅)
│  │  └─ shared           # PlaceCard · NaverRouteMap · Toaster 등
│  ├─ screens
│  │  ├─ User             # 로그인·회원가입·찾기·OAuth 콜백
│  │  ├─ place            # 장소 조회
│  │  ├─ cart             # 장바구니 → 일정 생성
│  │  ├─ mySchedule       # 나의 일정 목록·상세(예산/할일/공유/동선)
│  │  ├─ postSchedule     # 공유 게시판·상세
│  │  └─ chatBot          # AI 챗봇
│  ├─ store               # Zustand 전역 상태
│  ├─ hooks               # useNaverMaps · usePlaceSearch · useClickOutside 등
│  ├─ types               # 공통 타입 · naver.d.ts
│  ├─ utils               # geo 등 유틸
│  └─ main.tsx            # 엔트리포인트
├─ public
├─ index.html
└─ vite.config.ts         # Vite + React + Tailwind 설정
```

---

## 🚀 실행 방법

```bash
# 1. 저장소 클론
git clone https://github.com/CloudKosta/letsgo-react-app.git
cd letsgo-react-app

# 2. 의존성 설치
npm install

# 3. 환경 변수 설정 (.env)
#    VITE_API_BASE_URL          : Spring Boot REST API 주소 (예: http://localhost:5531)
#    VITE_CHATBOT_API_BASE_URL  : FastAPI 챗봇 서버 주소
#    VITE_NAVER_MAP_CLIENT_ID   : NaverMap API 클라이언트 ID

# 4. 개발 서버 실행 (http://127.0.0.1:5432)
npm run dev

# 5. 프로덕션 빌드 / 미리보기
npm run build
npm run preview
```

> ⚠️ 정상 동작을 위해 **백엔드(Spring Boot, 5531)** 와 **챗봇(FastAPI)** 서버가 함께 실행되어 있어야 합니다.
> 백엔드 OAuth2 `redirect-uri`는 이 앱의 `http://127.0.0.1:5432/oauth/callback`로 설정되어 있습니다.

---

## 🔑 환경 변수

| 변수 | 설명 |
|------|------|
| `VITE_API_BASE_URL` | Spring Boot REST API 베이스 URL |
| `VITE_CHATBOT_API_BASE_URL` | FastAPI 챗봇 서버 베이스 URL |
| `VITE_NAVER_MAP_CLIENT_ID` | NaverMap API 클라이언트 ID |
