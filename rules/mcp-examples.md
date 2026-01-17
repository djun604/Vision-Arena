# MCP 활용 실전 예시

## 🚀 실제 사용 시나리오

### 1. 웹 애플리케이션 개발 및 테스트

#### 시나리오: 로그인 기능 개발 및 테스트
```
"로그인 페이지를 개발하고 테스트해줘"

MCP 활용 순서:
1. filesystem → 현재 로그인 관련 파일들 확인
2. figma → 로그인 UI 디자인 참고
3. filesystem → 로그인 코드 구현/수정
4. playwright → 로그인 기능 자동화 테스트
5. chrome-devtools → 로그인 성능 및 네트워크 분석
6. memory → 테스트 결과 및 개선사항 저장
```

#### 호출 예시:
- "filesystem으로 로그인 관련 컴포넌트 파일들을 확인해줘"
- "playwright로 로그인 폼 자동화 테스트를 실행해줘"
- "chrome-devtools로 로그인 API 응답 시간을 측정해줘"

### 2. 데이터베이스 설계 및 관리

#### 시나리오: 사용자 관리 시스템 구축
```
"사용자 관리 시스템을 구축해줘"

MCP 활용 순서:
1. sequential-thinking-tools → 사용자 시스템 요구사항 분석
2. supabase → 데이터베이스 스키마 설계
3. task-master-ai → 개발 작업 계획 수립
4. filesystem → 백엔드 API 코드 구현
5. supabase → 데이터베이스 마이그레이션 실행
6. memory → 설계 문서 및 개발 가이드 저장
```

#### 호출 예시:
- "sequential-thinking-tools로 사용자 관리 시스템 요구사항을 단계별로 분석해줘"
- "supabase로 users 테이블 스키마를 생성해줘"
- "task-master-ai로 사용자 관리 기능 개발 계획을 세워줘"

### 3. UI/UX 디자인 및 구현

#### 시나리오: 대시보드 디자인 및 개발
```
"관리자 대시보드를 디자인하고 구현해줘"

MCP 활용 순서:
1. figma → 대시보드 와이어프레임 및 디자인
2. sequential-thinking-tools → 사용자 경험 분석
3. filesystem → 대시보드 컴포넌트 구현
4. playwright → 대시보드 사용성 테스트
5. chrome-devtools → 대시보드 성능 최적화
6. memory → 디자인 시스템 및 컴포넌트 가이드 저장
```

#### 호출 예시:
- "figma로 관리자 대시보드 와이어프레임을 만들어줘"
- "sequential-thinking-tools로 대시보드 사용자 경험을 분석해줘"
- "playwright로 대시보드 주요 기능들을 자동화 테스트해줘"

### 4. 프로젝트 관리 및 협업

#### 시나리오: 새 프로젝트 시작 및 팀 협업
```
"새로운 프로젝트를 시작하고 팀과 협업해줘"

MCP 활용 순서:
1. sequential-thinking-tools → 프로젝트 목표 및 범위 정의
2. task-master-ai → 프로젝트 작업 계획 및 일정 수립
3. github → 프로젝트 리포지토리 생성 및 초기 설정
4. figma → 프로젝트 디자인 시스템 구축
5. memory → 프로젝트 지식 베이스 구축
6. filesystem → 프로젝트 구조 및 초기 코드 생성
```

#### 호출 예시:
- "sequential-thinking-tools로 이 프로젝트의 목표와 범위를 정의해줘"
- "task-master-ai로 프로젝트 개발 일정을 계획해줘"
- "github로 새 리포지토리를 생성하고 초기 설정해줘"

## 🎯 도메인별 MCP 활용 패턴

### 프론트엔드 개발
```
디자인(figma) → 구현(filesystem) → 테스트(playwright) → 성능분석(chrome-devtools) → 저장(memory)
```

### 백엔드 개발
```
분석(sequential-thinking-tools) → DB설계(supabase) → 구현(filesystem) → 테스트(playwright) → 저장(memory)
```

### 품질 보증
```
코드검토(filesystem) → 자동화테스트(playwright) → 성능테스트(chrome-devtools) → 결과저장(memory)
```

### 프로젝트 관리
```
계획수립(sequential-thinking-tools) → 작업관리(task-master-ai) → 협업(github) → 문서화(memory)
```

## 🔧 문제 해결 시나리오

### 1. 웹사이트 성능 문제
```
"웹사이트가 느려요. 성능을 개선해줘"

해결 과정:
1. chrome-devtools → 성능 병목 지점 분석
2. playwright → 페이지 로딩 시간 측정
3. filesystem → 코드 최적화
4. chrome-devtools → 최적화 후 성능 재측정
5. memory → 성능 개선 가이드 저장
```

### 2. 데이터베이스 오류
```
"데이터베이스에서 오류가 발생해요"

해결 과정:
1. supabase → 데이터베이스 상태 및 로그 확인
2. sequential-thinking-tools → 오류 원인 분석
3. supabase → 데이터베이스 수정/복구
4. memory → 오류 해결 과정 및 예방책 저장
```

### 3. UI/UX 개선
```
"사용자가 UI를 이해하기 어려워해요"

해결 과정:
1. figma → 현재 UI 분석 및 개선안 디자인
2. sequential-thinking-tools → 사용자 경험 문제점 분석
3. filesystem → UI 코드 개선
4. playwright → 사용성 테스트
5. memory → UI/UX 개선 가이드 저장
```

## 📈 MCP 활용 효과 극대화 팁

### 1. 연속성 있는 워크플로우 구축
- 각 MCP 서버의 결과를 다음 단계의 입력으로 활용
- 중간 결과를 memory에 저장하여 컨텍스트 유지

### 2. 반복 작업 자동화
- 자주 사용하는 MCP 조합을 패턴으로 정리
- 표준 워크플로우를 문서화하여 재사용

### 3. 지식 축적 및 활용
- 모든 중요한 결과를 memory에 저장
- 이전 경험을 바탕으로 더 나은 의사결정

### 4. 품질 보증 체계
- 개발 → 테스트 → 분석 → 개선의 사이클 구축
- 각 단계에서 적절한 MCP 서버 활용

이 예시들을 참고하여 MCP를 효과적으로 활용하세요!
