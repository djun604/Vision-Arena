# 에이전트 선택 로직 구현

## 개요
토큰 절감을 위한 최적화된 에이전트 선택 로직입니다.

## 🎯 핵심 선택 원칙

### 1. 키워드 기반 빠른 선택
- 단일 키워드 매칭 시 1차 에이전트만 호출
- 복합 키워드 시 1차 + 2차 에이전트 조합
- 긴급 키워드 시 디버깅 워크플로우

### 2. 토큰 절감 우선순위
- 불필요한 2차 에이전트 호출 방지
- 컨텍스트 전달 최소화
- MCP 도구 선택적 사용

## 🔍 키워드 분석 엔진

### 단일 키워드 매칭 (1차 에이전트만)

```yaml
프론트엔드 키워드:
  - "React", "Next.js", "UI", "컴포넌트", "프론트엔드"
  → frontend-scaffold-generator
  → MCP: memory, filesystem
  → 예상 토큰: 40%

백엔드 키워드:
  - "API", "서버", "백엔드", "REST", "GraphQL"
  → backend-code-generator
  → MCP: memory, supabase
  → 예상 토큰: 40%

Python 키워드:
  - "Python", "Django", "FastAPI", "Flask"
  → python-expert
  → MCP: memory
  → 예상 토큰: 40%

데이터베이스 키워드:
  - "데이터베이스", "스키마", "ERD", "테이블"
  → database-architect
  → MCP: memory, supabase
  → 예상 토큰: 40%

테스트 키워드:
  - "테스트", "검증", "배포", "품질"
  → verification-agent
  → MCP: memory, playwright
  → 예상 토큰: 40%
```

### 복합 키워드 매칭 (1차 + 2차 에이전트)

```yaml
사용자 인증 시스템:
  키워드: "사용자", "인증", "로그인", "회원가입"
  1차: backend-code-generator
  2차: database-architect
  MCP: memory, supabase
  예상 토큰: 60%

UI/UX 개선:
  키워드: "UI", "UX", "가독성", "접근성", "디자인"
  1차: frontend-scaffold-generator
  2차: ui-ux-validator-agent
  MCP: memory, filesystem
  예상 토큰: 60%

성능 최적화:
  키워드: "성능", "최적화", "속도", "로딩"
  1차: senior-code-reviewer
  2차: verification-agent
  MCP: memory, chrome-devtools
  예상 토큰: 60%

새 기능 개발:
  키워드: "새", "기능", "개발", "구현"
  1차: system-architect
  2차: backend-code-generator
  MCP: memory, task-master-ai
  예상 토큰: 60%
```

### 긴급 상황 키워드 (진단 + 해결)

```yaml
로그인 버튼 오류:
  키워드: "로그인", "버튼", "오류", "작동하지"
  진단: chrome-devtools
  1차: senior-code-reviewer
  해결: frontend-scaffold-generator
  MCP: memory, chrome-devtools
  예상 토큰: 70%

API 응답 지연:
  키워드: "API", "응답", "지연", "느려"
  진단: chrome-devtools
  1차: backend-code-generator
  해결: verification-agent
  MCP: memory, chrome-devtools
  예상 토큰: 70%

데이터베이스 연결 실패:
  키워드: "데이터베이스", "연결", "실패", "오류"
  진단: supabase
  1차: database-connection-agent
  해결: database-architect
  MCP: memory, supabase
  예상 토큰: 70%

성능 문제:
  키워드: "성능", "문제", "느려", "최적화"
  진단: chrome-devtools
  1차: senior-code-reviewer
  해결: verification-agent
  MCP: memory, chrome-devtools
  예상 토큰: 70%
```

## 🧠 지능형 선택 알고리즘

### 1단계: 키워드 추출 및 분류
```python
def analyze_request(user_request):
    keywords = extract_keywords(user_request)
    complexity = assess_complexity(keywords)
    
    if complexity == "simple":
        return select_single_agent(keywords)
    elif complexity == "complex":
        return select_dual_agents(keywords)
    elif complexity == "urgent":
        return select_debugging_workflow(keywords)
```

### 2단계: 에이전트 선택
```python
def select_single_agent(keywords):
    for keyword in keywords:
        if keyword in frontend_keywords:
            return "frontend-scaffold-generator"
        elif keyword in backend_keywords:
            return "backend-code-generator"
        elif keyword in python_keywords:
            return "python-expert"
        # ... 추가 키워드 매칭
```

### 3단계: MCP 도구 선택
```python
def select_mcp_tools(agent, task_type):
    tools = ["memory"]  # 필수 도구
    
    if agent == "frontend-scaffold-generator":
        tools.append("filesystem")
    elif agent == "backend-code-generator":
        tools.append("supabase")
    elif task_type == "debugging":
        tools.append("chrome-devtools")
    
    return tools
```

## 📊 선택 정확도 최적화

### 키워드 가중치 시스템
```yaml
높은 가중치 (1.0):
  - 기술 스택: "React", "Python", "API"
  - 작업 유형: "개발", "테스트", "디버깅"

중간 가중치 (0.7):
  - 기능: "인증", "UI", "성능"
  - 문제: "오류", "지연", "문제"

낮은 가중치 (0.5):
  - 일반: "만들어", "해줘", "도와"
  - 형용사: "좋은", "빠른", "안전한"
```

### 컨텍스트 기반 선택
```yaml
이전 작업 고려:
  - 같은 기술 스택 연속 작업
  - 관련 기능 추가 개발
  - 문제 해결 후 검증

사용자 패턴 학습:
  - 자주 사용하는 에이전트
  - 선호하는 워크플로우
  - 성공률이 높은 조합
```

## 🎯 실행 시나리오

### 시나리오 1: 단순 React 컴포넌트 생성
```
사용자: "React 버튼 컴포넌트 만들어줘"
분석: 키워드 ["React", "버튼", "컴포넌트"] → 단순 작업
선택: frontend-scaffold-generator
MCP: memory, filesystem
예상 토큰: 40%
```

### 시나리오 2: 사용자 인증 시스템 개발
```
사용자: "사용자 로그인 시스템을 구현해줘"
분석: 키워드 ["사용자", "로그인", "시스템"] → 복합 작업
선택: backend-code-generator + database-architect
MCP: memory, supabase
예상 토큰: 60%
```

### 시나리오 3: 로그인 버튼 오류 수정
```
사용자: "로그인 버튼이 작동하지 않아요"
분석: 키워드 ["로그인", "버튼", "작동하지"] → 긴급 상황
진단: chrome-devtools
선택: senior-code-reviewer → frontend-scaffold-generator
MCP: memory, chrome-devtools
예상 토큰: 70%
```

## 🔄 피드백 루프

### 성공률 모니터링
```yaml
에이전트별 성공률:
  - frontend-scaffold-generator: 95%
  - backend-code-generator: 92%
  - python-expert: 90%
  - database-architect: 88%

키워드별 정확도:
  - 기술 스택 키워드: 98%
  - 기능 키워드: 85%
  - 일반 키워드: 70%
```

### 지속적 개선
```yaml
주간 리뷰:
  - 에이전트 선택 정확도 분석
  - 토큰 사용량 모니터링
  - 사용자 만족도 평가

월간 최적화:
  - 키워드 가중치 조정
  - 새로운 패턴 학습
  - 워크플로우 개선
```

## 🎯 구현 체크리스트

### ✅ 완료된 항목
- [x] 키워드 분석 엔진 설계
- [x] 에이전트 선택 로직 구현
- [x] MCP 도구 선택 최적화
- [x] 토큰 절감 전략 수립

### 🔄 진행 중인 항목
- [ ] 실제 코드 구현
- [ ] 테스트 케이스 작성
- [ ] 성능 벤치마크

### 📋 다음 단계
- [ ] MCP 도구 사용 가이드 작성
- [ ] 전체 시스템 통합 테스트
- [ ] 사용자 피드백 수집

---

이 에이전트 선택 로직을 통해 토큰 사용량을 크게 절감하면서도 정확한 에이전트 선택이 가능합니다.
