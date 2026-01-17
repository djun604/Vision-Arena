# AX 바로가기 보라색 버튼 디자인

## 🎯 디자인 개요

AX 바로가기 보라색 버튼은 접근성을 최우선으로 하는 특별한 바로가기 기능을 위한 UI 컴포넌트입니다. 보라색 계열의 색상을 사용하여 일반 버튼과 구별되며, 사용자가 쉽게 인식할 수 있도록 설계되었습니다.

## 🎨 디자인 스펙

### 색상 시스템
```css
/* 기본 상태 */
--ax-shortcut-primary: #A855F7; /* 보라색 500 */

/* 호버 상태 */
--ax-shortcut-hover: #9333EA; /* 보라색 600 */

/* 텍스트 색상 */
--ax-shortcut-text: #FFFFFF; /* 흰색 */
```

### 크기 및 간격
```css
/* 버튼 크기 */
--ax-shortcut-width: 120px;
--ax-shortcut-height: 40px;

/* 모서리 반경 */
--ax-shortcut-radius: 8px;

/* 패딩 */
--ax-shortcut-padding: 12px 16px;
```

### 타이포그래피
```css
/* 폰트 */
--ax-shortcut-font-family: 'Inter', system-ui, sans-serif;
--ax-shortcut-font-size: 14px;
--ax-shortcut-font-weight: 500;
--ax-shortcut-line-height: 1.4;
```

## 🧩 컴포넌트 구조

### 베이스 컴포넌트
- **이름**: AX 바로가기 버튼
- **타입**: 컴포넌트 (Component)
- **상태**: 2가지 (기본, 호버)

### 상태 정의
1. **기본 (Default)**
   - 배경색: #A855F7
   - 텍스트: 흰색
   - 그림자: 없음

2. **호버 (Hover)**
   - 배경색: #9333EA (더 어두운 보라색)
   - 텍스트: 흰색
   - 그림자: 미묘한 그림자 효과

## ♿ 접근성 가이드라인

### WCAG 2.1 AA 준수
- **색상 대비**: 4.5:1 이상 (보라색 배경 + 흰색 텍스트)
- **터치 타겟**: 44px × 44px (120px × 40px로 충족)
- **키보드 네비게이션**: Tab 키로 접근 가능
- **포커스 표시**: 명확한 포커스 링 표시

### 스크린 리더 지원
- **ARIA 레이블**: "AX 바로가기 버튼"
- **역할**: button
- **상태**: aria-pressed (필요시)

## 🎨 시각적 특징

### 디자인 원칙
1. **구별성**: 일반 버튼과 명확히 구분되는 보라색 사용
2. **일관성**: AX UI 디자인 시스템의 일부로 통일된 스타일
3. **직관성**: 바로가기 기능임을 한눈에 알 수 있는 디자인
4. **접근성**: 모든 사용자가 쉽게 사용할 수 있는 설계

### 시각적 계층
- **1차**: 보라색 배경으로 주목도 확보
- **2차**: 흰색 텍스트로 가독성 확보
- **3차**: 호버 상태로 상호작용 피드백

## 🔧 사용 가이드

### 사용 시나리오
1. **주요 바로가기**: 자주 사용하는 기능에 대한 빠른 접근
2. **특별한 액션**: 일반적인 버튼과 구별되는 특별한 기능
3. **프리미엄 기능**: 고급 사용자를 위한 특별한 기능

### 사용하지 말아야 할 경우
1. **일반적인 액션**: 일반적인 버튼으로 충분한 경우
2. **위험한 액션**: 삭제나 취소 등 위험한 작업
3. **보조 액션**: 보조적인 기능이나 정보 표시

## 📱 반응형 디자인

### 모바일 대응
```css
/* 모바일 (768px 이하) */
@media (max-width: 768px) {
  --ax-shortcut-width: 100px;
  --ax-shortcut-height: 36px;
  --ax-shortcut-font-size: 13px;
}
```

### 터치 최적화
- 최소 터치 타겟: 44px × 44px
- 터치 간격: 8px 이상
- 터치 피드백: 시각적 + 햅틱 피드백

## 🎯 개발 가이드

### CSS 구현 예시
```css
.ax-shortcut-button {
  /* 기본 스타일 */
  background-color: var(--ax-shortcut-primary);
  color: var(--ax-shortcut-text);
  border: none;
  border-radius: var(--ax-shortcut-radius);
  padding: var(--ax-shortcut-padding);
  font-family: var(--ax-shortcut-font-family);
  font-size: var(--ax-shortcut-font-size);
  font-weight: var(--ax-shortcut-font-weight);
  line-height: var(--ax-shortcut-line-height);
  cursor: pointer;
  transition: all 0.2s ease;
  
  /* 접근성 */
  min-width: 44px;
  min-height: 44px;
}

.ax-shortcut-button:hover {
  background-color: var(--ax-shortcut-hover);
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(168, 85, 247, 0.3);
}

.ax-shortcut-button:focus {
  outline: 2px solid var(--ax-shortcut-primary);
  outline-offset: 2px;
}

.ax-shortcut-button:active {
  transform: translateY(0);
  box-shadow: 0 2px 4px rgba(168, 85, 247, 0.2);
}
```

### React 컴포넌트 예시
```tsx
interface AXShortcutButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  'aria-label'?: string;
}

const AXShortcutButton: React.FC<AXShortcutButtonProps> = ({
  children,
  onClick,
  disabled = false,
  'aria-label': ariaLabel = 'AX 바로가기 버튼'
}) => {
  return (
    <button
      className="ax-shortcut-button"
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      role="button"
    >
      {children}
    </button>
  );
};
```

## 📊 테스트 체크리스트

### 접근성 테스트
- [ ] 키보드로 접근 가능
- [ ] 스크린 리더로 읽기 가능
- [ ] 색상 대비 4.5:1 이상
- [ ] 터치 타겟 44px 이상

### 기능 테스트
- [ ] 클릭 시 정상 동작
- [ ] 호버 상태 정상 표시
- [ ] 포커스 상태 정상 표시
- [ ] 비활성화 상태 정상 표시

### 시각적 테스트
- [ ] 디자인 스펙과 일치
- [ ] 다양한 화면 크기에서 정상 표시
- [ ] 다크/라이트 모드에서 적절한 대비

이 AX 바로가기 보라색 버튼은 사용자 경험을 향상시키고 접근성을 보장하는 현대적인 UI 컴포넌트입니다.
