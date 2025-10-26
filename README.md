# AI Chatbot Frontend Template

현대적인 AI 챗봇 인터페이스를 위한 Next.js 기반 프론트엔드 템플릿입니다.

![Next.js](https://img.shields.io/badge/Next.js-15.x-black?logo=next.js)
![React](https://img.shields.io/badge/React-19.x-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.x-38B2AC?logo=tailwind-css)

## 주요 기능

- **현대적인 UI/UX**: ChatGPT, Claude와 같은 AI 챗봇 서비스의 인터페이스 디자인
- **다크/라이트 모드**: 시스템 설정 기반 자동 테마 전환
- **반응형 디자인**: 모바일, 태블릿, 데스크톱 완벽 지원
- **채팅 관리**: 새 채팅 생성, 기록 저장, 편집/삭제 기능
- **마크다운 지원**: 코드 하이라이팅 포함 마크다운 렌더링
- **상태 관리**: Zustand를 활용한 효율적인 상태 관리
- **로컬 저장소**: 채팅 기록 자동 저장 (localStorage)

## 기술 스택

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Markdown**: [react-markdown](https://github.com/remarkjs/react-markdown)
- **Code Highlighting**: [react-syntax-highlighter](https://github.com/react-syntax-highlighter/react-syntax-highlighter)

## 시작하기

### 필수 요구사항

- Node.js 18.x 이상
- npm 또는 yarn

### 설치

```bash
# 저장소 클론
git clone <repository-url>
cd chatbot-frontend-template

# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

개발 서버가 [http://localhost:3000](http://localhost:3000)에서 실행됩니다.

### 빌드

```bash
# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm start
```

## 프로젝트 구조

```
.
├── app/                    # Next.js App Router
│   ├── layout.tsx         # 루트 레이아웃
│   ├── page.tsx           # 메인 페이지
│   └── globals.css        # 전역 스타일
├── components/            # React 컴포넌트
│   ├── Chat/             # 채팅 관련 컴포넌트
│   │   ├── ChatContainer.tsx
│   │   ├── ChatHeader.tsx
│   │   ├── ChatInput.tsx
│   │   ├── Message.tsx
│   │   └── MessageList.tsx
│   ├── Sidebar/          # 사이드바 컴포넌트
│   │   ├── Sidebar.tsx
│   │   ├── NewChatButton.tsx
│   │   ├── ChatHistory.tsx
│   │   └── ChatHistoryItem.tsx
│   ├── EmptyState.tsx    # 초기 화면
│   ├── ThemeProvider.tsx # 테마 관리
│   └── ThemeToggle.tsx   # 테마 토글 버튼
└── lib/                   # 유틸리티 및 설정
    ├── store.ts          # Zustand 스토어
    └── utils.ts          # 유틸리티 함수
```

## 백엔드 API 연결

이 템플릿은 프론트엔드 UI만 제공합니다. 실제 AI 기능을 사용하려면 백엔드 API를 연결해야 합니다.

### API 연결 방법

1. `components/Chat/ChatContainer.tsx` 파일을 수정합니다.
2. `handleSendMessage` 함수에서 mock 응답 대신 실제 API 호출을 구현합니다.

```typescript
const handleSendMessage = async (content: string) => {
  if (!currentChatId) return;

  // 사용자 메시지 추가
  addMessage(currentChatId, {
    role: "user",
    content,
  });

  setIsLoading(true);

  try {
    // 실제 API 호출
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: content }),
    });

    const data = await response.json();

    // AI 응답 추가
    addMessage(currentChatId, {
      role: "assistant",
      content: data.response,
    });
  } catch (error) {
    console.error('API Error:', error);
  } finally {
    setIsLoading(false);
  }
};
```

## 커스터마이징

### 색상 테마 변경

`tailwind.config.ts`와 `app/globals.css` 파일에서 CSS 변수를 수정하여 색상 테마를 변경할 수 있습니다.

### 프롬프트 예시 수정

`components/EmptyState.tsx`에서 초기 화면의 예시 프롬프트를 수정할 수 있습니다.

## 기여

이슈 및 풀 리퀘스트를 환영합니다!

## 라이선스

MIT License
