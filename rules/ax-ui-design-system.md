# AX UI 컴포넌트 디자인 시스템

## 🎯 디자인 시스템 개요

AX UI 컴포넌트 디자인 시스템은 접근성(Accessibility)을 최우선으로 하는 현대적인 UI 컴포넌트 라이브러리입니다. 모든 사용자가 쉽게 사용할 수 있도록 설계되었습니다.

## 🎨 디자인 토큰

### 색상 시스템 (Color System)

#### Primary Colors
```css
--primary-50: #eff6ff;
--primary-100: #dbeafe;
--primary-200: #bfdbfe;
--primary-300: #93c5fd;
--primary-400: #60a5fa;
--primary-500: #3b82f6; /* 메인 프라이머리 */
--primary-600: #2563eb;
--primary-700: #1d4ed8;
--primary-800: #1e40af;
--primary-900: #1e3a8a;
```

#### Gray Scale
```css
--gray-50: #f9fafb;
--gray-100: #f3f4f6;
--gray-200: #e5e7eb;
--gray-300: #d1d5db;
--gray-400: #9ca3af;
--gray-500: #6b7280;
--gray-600: #4b5563;
--gray-700: #374151;
--gray-800: #1f2937;
--gray-900: #111827;
```

#### Semantic Colors
```css
--success: #10b981;
--warning: #f59e0b;
--error: #ef4444;
--info: #3b82f6;
```

### 타이포그래피 (Typography)

#### Font Families
```css
--font-sans: 'Inter', system-ui, sans-serif;
--font-mono: 'JetBrains Mono', monospace;
```

#### Font Sizes
```css
--text-xs: 12px;
--text-sm: 14px;
--text-base: 16px;
--text-lg: 18px;
--text-xl: 20px;
--text-2xl: 24px;
--text-3xl: 30px;
--text-4xl: 36px;
```

#### Font Weights
```css
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
```

### 간격 시스템 (Spacing)

```css
--space-0: 0px;
--space-1: 4px;
--space-2: 8px;
--space-3: 12px;
--space-4: 16px;
--space-5: 20px;
--space-6: 24px;
--space-8: 32px;
--space-10: 40px;
--space-12: 48px;
--space-16: 64px;
--space-20: 80px;
--space-24: 96px;
```

### Border Radius

```css
--radius-none: 0px;
--radius-sm: 2px;
--radius-base: 4px;
--radius-md: 6px;
--radius-lg: 8px;
--radius-xl: 12px;
--radius-2xl: 16px;
--radius-full: 9999px;
```

### 그림자 (Shadows)

```css
--shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
--shadow-base: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
--shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
```

## 🧩 컴포넌트 라이브러리

### 1. Button 컴포넌트

#### 변형 (Variants)
- **Primary**: 주요 액션용
- **Secondary**: 보조 액션용
- **Danger**: 위험한 액션용
- **Ghost**: 투명한 배경

#### 크기 (Sizes)
- **Small**: 32px 높이
- **Medium**: 40px 높이 (기본)
- **Large**: 48px 높이

#### 상태 (States)
- **Default**: 기본 상태
- **Hover**: 마우스 오버
- **Active**: 클릭/활성화
- **Disabled**: 비활성화
- **Loading**: 로딩 중

#### 접근성 요구사항
- 최소 44px 터치 타겟 크기
- 키보드 네비게이션 지원
- 스크린 리더 지원
- 충분한 색상 대비 (4.5:1 이상)

### 2. Card 컴포넌트

#### 변형 (Variants)
- **Default**: 기본 카드
- **Elevated**: 그림자 강화
- **Outlined**: 테두리 강조

#### 구성 요소
- **Header**: 제목 영역
- **Content**: 내용 영역
- **Footer**: 하단 액션 영역

### 3. Modal 컴포넌트

#### 크기 (Sizes)
- **Small**: 400px 너비
- **Medium**: 600px 너비 (기본)
- **Large**: 800px 너비
- **Full**: 전체 화면

#### 접근성 요구사항
- ESC 키로 닫기
- 포커스 트랩
- 스크린 리더 지원
- 배경 오버레이 클릭으로 닫기

### 4. Input 컴포넌트

#### 타입 (Types)
- **Text**: 일반 텍스트
- **Email**: 이메일 입력
- **Password**: 비밀번호
- **Number**: 숫자 입력
- **Search**: 검색 입력

#### 상태 (States)
- **Default**: 기본 상태
- **Focus**: 포커스 상태
- **Error**: 오류 상태
- **Success**: 성공 상태
- **Disabled**: 비활성화

### 5. Spinner 컴포넌트

#### 크기 (Sizes)
- **Small**: 16px
- **Medium**: 24px (기본)
- **Large**: 32px

#### 변형 (Variants)
- **Primary**: 프라이머리 색상
- **Secondary**: 세컨더리 색상
- **White**: 흰색

## ♿ 접근성 가이드라인

### WCAG 2.1 AA 준수

#### 색상 대비
- 일반 텍스트: 4.5:1 이상
- 큰 텍스트: 3:1 이상
- UI 컴포넌트: 3:1 이상

#### 키보드 네비게이션
- Tab 순서 논리적 구성
- 모든 인터랙티브 요소 접근 가능
- 포커스 표시기 명확

#### 스크린 리더 지원
- 의미있는 ARIA 레이블
- 적절한 역할(role) 지정
- 상태 변경 알림

#### 터치 타겟
- 최소 44px × 44px 크기
- 충분한 간격 (8px 이상)

## 📱 반응형 디자인

### 브레이크포인트
```css
--breakpoint-sm: 640px;
--breakpoint-md: 768px;
--breakpoint-lg: 1024px;
--breakpoint-xl: 1280px;
--breakpoint-2xl: 1536px;
```

### 모바일 우선 접근
- 모바일 디자인을 기본으로 시작
- 점진적 향상(Progressive Enhancement)
- 터치 친화적 인터페이스

## 🎯 사용 가이드

### 컴포넌트 선택 기준
1. **Button**: 사용자 액션 유도
2. **Card**: 정보 그룹화
3. **Modal**: 중요 정보 표시
4. **Input**: 데이터 입력
5. **Spinner**: 로딩 상태 표시

### 일관성 유지
- 동일한 패턴 반복 사용
- 일관된 간격과 크기
- 통일된 색상 사용

### 성능 고려사항
- 최소한의 DOM 노드
- 효율적인 CSS 선택자
- 적절한 이미지 최적화

## 🔧 개발 가이드

### CSS 변수 사용
```css
.button-primary {
  background-color: var(--primary-500);
  color: var(--gray-50);
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-md);
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
}
```

### 컴포넌트 구조
```
components/
├── Button/
│   ├── Button.tsx
│   ├── Button.module.css
│   └── Button.stories.tsx
├── Card/
│   ├── Card.tsx
│   ├── Card.module.css
│   └── Card.stories.tsx
└── ...
```

### 테스트 요구사항
- 단위 테스트 (Jest)
- 접근성 테스트 (axe-core)
- 시각적 회귀 테스트 (Chromatic)

이 디자인 시스템을 통해 일관되고 접근 가능한 사용자 인터페이스를 구축할 수 있습니다.
