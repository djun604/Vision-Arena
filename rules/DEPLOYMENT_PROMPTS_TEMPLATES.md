# 배포 에이전트 AI 프롬프트 템플릿 모음
## Claude Code 및 AI 에이전트 활용 완전 가이드

> **목적**: 배포 가이드의 각 단계를 AI 에이전트(Claude Code)에게 효과적으로 주문하기 위한 실전 프롬프트 모음

---

## 📋 목차

1. [빠른 시작 가이드](#빠른-시작-가이드)
2. [프로젝트 초기 평가 프롬프트](#프로젝트-초기-평가-프롬프트)
3. [환경 설정 프롬프트](#환경-설정-프롬프트)
4. [데이터베이스 설계 프롬프트](#데이터베이스-설계-프롬프트)
5. [Docker 컨테이너화 프롬프트](#docker-컨테이너화-프롬프트)
6. [CI/CD 구축 프롬프트](#cicd-구축-프롬프트)
7. [모니터링 설정 프롬프트](#모니터링-설정-프롬프트)
8. [트러블슈팅 프롬프트](#트러블슈팅-프롬프트)
9. [단계별 체크리스트](#단계별-체크리스트)

---

## 빠른 시작 가이드

### 🚀 5분 안에 시작하기

```markdown
### Claude에게 전체 프로젝트 분석 요청

당신은 시니어 DevOps 엔지니어입니다. 
다음 프로젝트를 프로덕션 배포하기 위한 종합 분석을 수행하고, 
실행 가능한 로드맵을 제공해주세요.

**프로젝트 정보:**
- 이름: [프로젝트명]
- 스택: [예: Node.js + React + PostgreSQL]
- 현재 상태: [예: 로컬 개발 완료]
- 목표: [예: AWS 프로덕션 배포]

**요청사항:**
1. 프로젝트 구조 분석 및 개선 제안
2. 배포 전 체크리스트 (우선순위 포함)
3. 예상 일정 및 리소스 (팀 2명 기준)
4. 잠재적 위험 요소 3가지
5. 첫 번째 실행할 명령어/스크립트

**출력 형식:**
- 결론 요약 (2-3문장)
- 우선순위별 작업 목록 (P0/P1/P2)
- 다음 액션 아이템 Top 3
- 예상 비용 (월 기준)

**제약사항:**
- 다운타임 < 10분
- 예산: 월 $500 이하
- 팀 역량: 중급 개발자 수준
```

---

## 프로젝트 초기 평가 프롬프트

### 템플릿 1: 코드베이스 감사

```markdown
[역할] 당신은 코드 품질 감사 전문가이자 배포 아키텍트입니다.

[목표] 다음 프로젝트를 프로덕션 배포하기 전 필수적으로 수정해야 할 
항목을 식별하고, 자동화된 감사 스크립트를 작성하세요.

[프로젝트 경로]
프론트엔드: ./frontend
백엔드: ./backend
데이터베이스: ./database

[요청사항]
1. **보안 취약점 스캔**
   - 하드코딩된 시크릿 검색
   - 의존성 취약점 확인 (npm audit)
   - 민감 정보 노출 여부
   
2. **코드 품질 검사**
   - ESLint 설정 및 실행
   - 테스트 커버리지 측정
   - 사용하지 않는 의존성 식별
   
3. **환경 설정 검증**
   - .env 파일 구조 확인
   - 환경변수 검증 스크립트 생성
   - .gitignore 점검

4. **감사 스크립트 생성**
   다음 파일들을 생성하세요:
   - `scripts/code-audit.sh`: 전체 감사 실행
   - `scripts/security-check.sh`: 보안 스캔
   - `scripts/env-validate.js`: 환경변수 검증
   
[출력 형식]
1. **감사 결과 요약**
   - Critical: X건 (즉시 수정 필요)
   - High: X건 (배포 전 수정)
   - Medium: X건 (배포 후 개선)
   
2. **수정 우선순위 목록**
   각 항목에 대해:
   - 문제 설명
   - 위험도 (1-10)
   - 예상 수정 시간
   - 수정 방법 (구체적 코드 또는 명령어)
   
3. **생성된 스크립트**
   - 전체 코드
   - 실행 방법
   - 예상 소요 시간

[제약사항]
- 스크립트는 CI/CD에서 자동 실행 가능해야 함
- 실패 시 명확한 에러 메시지 제공
- 실행 시간 < 5분
- 크로스 플랫폼 호환 (Linux/macOS)

[성공 기준]
- Critical 이슈 0건
- High 이슈 < 3건
- 모든 스크립트 정상 동작 검증
```

### 템플릿 2: 인프라 비용 추정

```markdown
[역할] 당신은 클라우드 비용 최적화 전문가입니다.

[목표] 
다음 프로젝트의 AWS 프로덕션 배포 시 예상 비용을 계산하고,
비용 절감 방안을 제시하세요.

[프로젝트 규모]
- 예상 일일 트래픽: [예: 10,000 req/day]
- 데이터베이스 크기: [예: 5GB]
- 이미지/파일 스토리지: [예: 50GB]
- 동시 접속자: [예: 100명]

[현재 아키텍처]
- 프론트엔드: React SPA
- 백엔드: Node.js Express
- 데이터베이스: PostgreSQL
- 캐시: Redis
- 파일 스토리지: S3

[요청사항]
1. **비용 계산기 생성**
   ```javascript
   // cost-calculator.js
   // - 각 AWS 서비스별 월 비용
   // - 트래픽 증가 시나리오 (2x, 5x, 10x)
   // - 총 비용 및 주요 비용 항목 시각화
   ```

2. **3가지 배포 옵션 비교**
   - Option A: 완전 서버리스 (Lambda + DynamoDB)
   - Option B: 컨테이너 (ECS Fargate)
   - Option C: 관리형 PaaS (Heroku/Render)
   
   각 옵션에 대해:
   - 월 비용 추정
   - 장단점
   - 확장성
   - 운영 복잡도 (1-10)

3. **비용 최적화 체크리스트**
   - Reserved Instance 활용
   - Spot Instance 가능 영역
   - Auto Scaling 정책
   - S3 Lifecycle 정책
   - CloudWatch 로그 보존 기간

[출력 형식]
## 비용 추정 보고서

### 월간 비용 요약
| 서비스 | 사양 | 월 비용 | 비율 |
|--------|------|---------|------|
| EC2/ECS | ... | $XXX | XX% |
| RDS | ... | $XXX | XX% |
| ... | ... | ... | ... |
| **총계** | | **$XXX** | 100% |

### 트래픽 증가 시나리오
- 현재: $XXX/월
- 2배 증가: $XXX/월 (+XX%)
- 5배 증가: $XXX/월 (+XX%)

### 권장 배포 옵션
**Option X를 추천합니다.**
이유: [3가지]

### 즉시 적용 가능한 비용 절감 (월 $XXX 절감)
1. [항목] - 절감액: $XX
2. [항목] - 절감액: $XX
3. [항목] - 절감액: $XX

[제약사항]
- 비용 계산은 us-east-1 리전 기준
- 예비비 20% 포함
- 1년 약정 고려
```

---

## 환경 설정 프롬프트

### 템플릿 3: 환경변수 자동 설정

```markdown
[역할] 시니어 DevOps 엔지니어이자 보안 전문가

[목표] 
로컬, 스테이징, 프로덕션 환경을 위한 완벽한 환경변수 시스템을 구축하세요.

[현재 상황]
- .env 파일에 하드코딩된 값들 존재
- 환경별 분리 안 됨
- 검증 로직 없음

[요청사항]

1. **환경변수 파일 구조 생성**
   ```
   config/
   ├── env/
   │   ├── .env.local
   │   ├── .env.staging
   │   ├── .env.production
   │   └── .env.example
   ├── validate-env.js
   └── index.js (중앙 설정 관리)
   ```

2. **각 환경별 필수 변수 정의**
   다음 카테고리별로:
   - 데이터베이스 연결
   - 외부 API 키
   - JWT/암호화
   - 스토리지 (S3/로컬)
   - 로그/모니터링
   - Feature Flags

3. **환경변수 검증 스크립트**
   - 타입 체크 (string/number/boolean/url)
   - 필수 변수 누락 검사
   - 포맷 검증 (URL, email, 포트 번호)
   - 환경별 차이 검증

4. **보안 강화**
   - .gitignore 자동 업데이트
   - pre-commit hook 생성 (환경변수 유출 방지)
   - 시크릿 마스킹 함수

5. **AWS Secrets Manager 통합**
   - 프로덕션 시크릿 로더
   - 로컬 개발용 폴백

[출력 형식]

## 생성된 파일

### 1. config/env/.env.example
```bash
# [전체 내용을 여기에 작성]
```

### 2. config/validate-env.js
```javascript
// [완전한 검증 로직]
```

### 3. config/index.js
```javascript
// [중앙 설정 관리 코드]
```

### 4. scripts/setup-secrets.sh
```bash
# AWS Secrets Manager 설정 스크립트
```

### 5. .github/hooks/pre-commit
```bash
# Git pre-commit hook
```

## 사용 방법

### 로컬 개발
\`\`\`bash
cp config/env/.env.example .env.local
npm run validate:env
npm run dev
\`\`\`

### 프로덕션 배포
\`\`\`bash
./scripts/setup-secrets.sh production
npm run validate:env
npm start
\`\`\`

## 검증 테스트
```bash
# 테스트 명령어와 예상 결과
```

[제약사항]
- 환경변수는 절대 코드에 하드코딩 금지
- 민감 정보는 반드시 Secrets Manager 사용
- 검증 실패 시 앱 시작 중단
- 개발자 친화적인 에러 메시지

[성공 기준]
- 모든 환경에서 검증 스크립트 통과
- .env 파일이 git에 커밋되지 않음
- 환경변수 누락 시 즉시 감지
```

---

## 데이터베이스 설계 프롬프트

### 템플릿 4: ERD 자동 생성 및 DDL 작성

```markdown
[역할] 데이터베이스 아키텍트 및 마이그레이션 전문가

[목표]
기존 애플리케이션 코드를 분석하여 ERD를 생성하고,
프로덕션 배포 가능한 DDL과 마이그레이션 스크립트를 작성하세요.

[프로젝트 정보]
- ORM: [예: Prisma / TypeORM / Sequelize]
- 데이터베이스: PostgreSQL 15
- 스키마 파일: [경로 지정]

[요청사항]

1. **ERD 문서 생성** (`database/ERD.md`)
   - Mermaid 다이어그램
   - 테이블 설명
   - 관계 설명 (1:1, 1:N, N:M)
   - 인덱스 전략
   - 예상 데이터 볼륨

2. **DDL 스크립트 생성** (`database/schemas/`)
   ```
   database/
   ├── schemas/
   │   ├── init.sql          # 초기 설정
   │   ├── schema.sql        # 전체 스키마
   │   └── indexes.sql       # 인덱스
   ├── migrations/
   │   ├── V001__create_users.sql
   │   ├── V002__create_posts.sql
   │   └── ...
   ├── seeds/
   │   ├── 01-users.sql
   │   └── 02-posts.sql
   └── ERD.md
   ```

3. **최적화 및 검증**
   - 정규화 검증 (3NF)
   - 인덱스 추천
   - 파티셔닝 필요 여부 (100만 레코드 이상)
   - 외래키 제약조건
   - 트리거/함수 (updated_at 자동 갱신)

4. **마이그레이션 전략**
   - Flyway 또는 Liquibase 설정
   - 롤백 스크립트 (`down/`)
   - 데이터 무결성 검증 쿼리

5. **백업 및 복원 스크립트**
   ```bash
   scripts/
   ├── backup-db.sh
   ├── restore-db.sh
   └── verify-backup.sh
   ```

[출력 형식]

## 데이터베이스 설계 완료 패키지

### ERD (Mermaid)
```mermaid
erDiagram
    [완전한 ERD 다이어그램]
```

### 테이블 상세

#### users
- **목적**: 사용자 계정 관리
- **예상 레코드**: 100K
- **파티셔닝**: 불필요
- **인덱스**: [목록]

[모든 테이블 반복]

### DDL 스크립트

#### 1. init.sql
```sql
[완전한 코드]
```

#### 2. schema.sql
```sql
[완전한 코드]
```

[모든 스크립트 포함]

### 마이그레이션 실행 가이드

```bash
# 1. 마이그레이션 실행
flyway -url=jdbc:postgresql://localhost:5432/myapp migrate

# 2. 검증
psql -f database/verify-integrity.sql

# 3. 시드 데이터
psql -f database/seeds/01-users.sql
```

### 성능 검증 쿼리

```sql
-- 느린 쿼리 식별
SELECT ...

-- 인덱스 사용률
SELECT ...
```

[제약사항]
- 모든 테이블에 created_at, updated_at 필수
- 소프트 삭제 (deleted_at)
- UUID 기본키 또는 BIGSERIAL
- 외래키는 CASCADE 설정 신중하게

[성공 기준]
- ERD와 실제 스키마 100% 일치
- 모든 마이그레이션 에러 없이 실행
- 무결성 검증 쿼리 통과
- 백업/복원 정상 동작
```

### 템플릿 5: 데이터 마이그레이션 플랜

```markdown
[역할] 데이터 마이그레이션 전문가

[목표]
로컬 개발 DB → 프로덕션 DB로의 무중단 마이그레이션 전략을 수립하고
실행 스크립트를 작성하세요.

[현재 상황]
- 로컬 DB: [예: SQLite / PostgreSQL localhost]
- 로컬 데이터 크기: [예: 2GB]
- 프로덕션 DB: [예: AWS RDS PostgreSQL]
- 다운타임 허용: [예: 10분]

[요청사항]

1. **마이그레이션 전략 선택**
   다음 중 최적 방법 선택 및 이유:
   - 직접 전환 (Cutover)
   - 읽기 복제본 (Replica)
   - 이중 쓰기 (Dual Write)
   - 블루-그린 배포

2. **마이그레이션 스크립트 세트**
   ```bash
   scripts/
   ├── migrate-production.sh      # 메인 스크립트
   ├── backup-local.sh            # 로컬 백업
   ├── anonymize-data.sql         # 개인정보 익명화
   ├── verify-migration.sql       # 데이터 무결성 검증
   └── rollback.sh                # 롤백
   ```

3. **단계별 실행 계획** (타임라인 포함)
   - T-24h: 최종 백업 및 리허설
   - T-1h: 사용자 공지
   - T-0: 점검 모드 활성화
   - T+5min: 데이터 복원
   - T+10min: 검증 및 서비스 재개

4. **리스크 관리**
   - 각 단계별 롤백 조건
   - 긴급 연락 체계
   - 모니터링 메트릭

5. **개인정보 익명화**
   - 프로덕션에 넣을 수 없는 테스트 데이터 처리
   - GDPR/개인정보보호법 준수

[출력 형식]

## 마이그레이션 실행 계획서

### 전략: [선택된 방법]
**선택 이유**: [3가지]
**예상 다운타임**: X분
**롤백 소요 시간**: Y분

### 타임라인
```
T-24h: [작업 내용]
T-1h:  [작업 내용]
T-0:   [작업 내용]
T+5m:  [작업 내용]
T+10m: [작업 내용]
```

### 메인 스크립트
```bash
#!/bin/bash
# scripts/migrate-production.sh

[완전한 코드 - 최소 200줄]
```

### 검증 쿼리
```sql
-- 데이터 무결성 검증
[완전한 SQL]
```

### 롤백 스크립트
```bash
#!/bin/bash
# scripts/rollback.sh

[완전한 코드]
```

### 체크리스트
- [ ] D-7: 스테이징 리허설
- [ ] D-1: 최종 백업
- [ ] D-Day: [상세 항목들]
- [ ] D+1: 안정성 모니터링

### 긴급 연락망
- 리드: [이름/번호]
- DBA: [이름/번호]
- 온콜: [이름/번호]

[제약사항]
- 사용자 데이터 손실 0건
- 개인정보 익명화 100% 완료
- 스크립트는 재실행 가능 (idempotent)

[성공 기준]
- 데이터 무결성 100%
- 다운타임 목표 달성
- 롤백 테스트 성공
```

---

## Docker 컨테이너화 프롬프트

### 템플릿 6: Dockerfile 최적화

```markdown
[역할] Docker 전문가 및 컨테이너 보안 전문가

[목표]
프로덕션급 Dockerfile과 docker-compose 설정을 생성하세요.

[프로젝트 구조]
```
project/
├── frontend/  (React)
├── backend/   (Node.js)
└── database/  (PostgreSQL)
```

[요청사항]

1. **Multi-stage Dockerfile**
   - 백엔드: Node.js Alpine 기반
   - 프론트엔드: Nginx로 정적 서빙
   - 이미지 크기 최소화 (<500MB)
   - 보안 스캔 통과 (Trivy)

2. **docker-compose 3개 버전**
   - `docker-compose.yml` (로컬 개발)
   - `docker-compose.staging.yml`
   - `docker-compose.prod.yml`

3. **.dockerignore 최적화**
   - 빌드 속도 향상
   - 불필요한 파일 제외

4. **헬스체크 및 재시작 정책**
   - 각 컨테이너별 헬스체크
   - 자동 재시작 설정
   - 리소스 제한

5. **보안 강화**
   - 비루트 사용자로 실행
   - 읽기 전용 파일시스템
   - 불필요한 권한 제거

[출력 형식]

## 컨테이너 설정 완료 패키지

### 1. backend/Dockerfile
```dockerfile
[완전한 코드 - 최소 50줄]
```

### 2. frontend/Dockerfile
```dockerfile
[완전한 코드 - 최소 40줄]
```

### 3. docker-compose.yml
```yaml
[완전한 코드 - 최소 100줄]
```

### 4. .dockerignore
```
[완전한 내용]
```

### 5. nginx.conf (프론트엔드용)
```nginx
[완전한 설정]
```

### 빌드 및 실행 가이드

```bash
# 로컬 개발
docker-compose up -d

# 이미지 빌드 및 푸시
./scripts/docker-build.sh v1.0.0

# 프로덕션 배포
docker-compose -f docker-compose.prod.yml up -d
```

### 최적화 결과
- 백엔드 이미지: XXX MB
- 프론트엔드 이미지: XXX MB
- 빌드 시간: X분
- 보안 스캔: 0 Critical

### 트러블슈팅 가이드
**문제**: 컨테이너가 시작 후 즉시 종료
**해결**: [방법]

[모든 일반적인 문제 포함]

[제약사항]
- Alpine Linux 기반
- 이미지 레이어 < 10개
- 빌드 캐시 활용
- 시크릿은 빌드 아티팩트에 포함 금지

[성공 기준]
- 모든 컨테이너 정상 시작
- 헬스체크 통과
- 보안 스캔 Critical 0건
- 네트워크 통신 정상
```

---

## CI/CD 구축 프롬프트

### 템플릿 7: GitHub Actions 파이프라인

```markdown
[역할] CI/CD 파이프라인 설계자

[목표]
GitHub Actions를 사용한 완전 자동화된 배포 파이프라인을 구축하세요.

[요구사항]
- 플랫폼: GitHub Actions
- 배포 대상: AWS ECS
- 환경: Staging + Production
- 승인: Production 배포는 수동 승인 필요

[요청사항]

1. **CI/CD Workflow 3개**
   ```
   .github/workflows/
   ├── ci.yml           # PR 시 테스트
   ├── cd-staging.yml   # develop 브랜치 → 스테이징
   └── cd-prod.yml      # main 브랜치 → 프로덕션
   ```

2. **각 워크플로우 포함 사항**
   - 코드 품질 검사 (ESLint)
   - 단위 테스트
   - 보안 스캔 (npm audit, Trivy)
   - Docker 이미지 빌드
   - ECR 푸시
   - ECS 배포
   - 배포 후 헬스체크
   - Slack 알림

3. **롤백 워크플로우**
   ```
   .github/workflows/rollback.yml
   ```
   - 수동 트리거
   - 특정 버전 선택
   - 자동 검증

4. **재사용 가능한 액션**
   ```
   .github/actions/
   ├── docker-build/
   ├── security-scan/
   └── deploy-ecs/
   ```

5. **시크릿 관리**
   - GitHub Secrets 활용
   - AWS IAM 역할
   - 환경별 시크릿

[출력 형식]

## CI/CD 파이프라인 완료 패키지

### 1. .github/workflows/ci.yml
```yaml
[완전한 코드 - 최소 100줄]
```

### 2. .github/workflows/cd-staging.yml
```yaml
[완전한 코드 - 최소 150줄]
```

### 3. .github/workflows/cd-prod.yml
```yaml
[완전한 코드 - 최소 200줄]
```

### 4. .github/workflows/rollback.yml
```yaml
[완전한 코드 - 최소 80줄]
```

### 5. .github/actions/docker-build/action.yml
```yaml
[재사용 가능한 액션]
```

### 파이프라인 흐름도

```
PR 생성
  ↓
[CI] 테스트 & 린트
  ↓
코드 리뷰
  ↓
merge to develop
  ↓
[CD-Staging] 자동 배포
  ↓
스테이징 테스트 (수동)
  ↓
merge to main
  ↓
[CD-Prod] 수동 승인 대기
  ↓
승인
  ↓
프로덕션 배포
```

### GitHub Secrets 설정 가이드

```bash
# 필수 시크릿 목록
gh secret set AWS_ACCESS_KEY_ID --body "..."
gh secret set AWS_SECRET_ACCESS_KEY --body "..."
gh secret set SLACK_WEBHOOK_URL --body "..."
[전체 목록]
```

### 첫 배포 가이드

```bash
# 1. 시크릿 설정 확인
gh secret list

# 2. 스테이징 배포
git checkout develop
git commit -m "feat: initial deploy"
git push origin develop

# 3. GitHub Actions 모니터링
# https://github.com/[org]/[repo]/actions

# 4. 배포 확인
curl https://staging.myapp.com/health
```

### 트러블슈팅

**문제**: Docker 빌드 실패
**로그**: [예시]
**해결**: [방법]

[모든 일반적인 문제 포함]

[제약사항]
- 배포 시간 < 10분
- 테스트 실패 시 배포 중단
- 롤백 시간 < 5분

[성공 기준]
- 모든 워크플로우 성공
- 스테이징 자동 배포 동작
- 프로덕션 수동 승인 동작
- 롤백 테스트 성공
```

---

## 모니터링 설정 프롬프트

### 템플릿 8: 종합 모니터링 구축

```markdown
[역할] SRE(Site Reliability Engineer) 및 모니터링 전문가

[목표]
Datadog, CloudWatch, Sentry를 통합한 종합 모니터링 시스템을 구축하세요.

[현재 상황]
- 모니터링 없음
- 장애 감지 수동
- 로그 산재

[요청사항]

1. **Datadog 모니터 20개**
   - 애플리케이션 에러율
   - 응답 시간 (P50, P95, P99)
   - 인프라 리소스 (CPU, 메모리, 디스크)
   - 데이터베이스 연결 풀
   - 외부 API 응답 시간
   [각 모니터별 상세 설정]

2. **커스텀 메트릭 전송**
   ```javascript
   // backend/src/utils/metrics.js
   [완전한 코드]
   ```

3. **로그 집계 (ELK Stack)**
   ```yaml
   # monitoring/logstash.conf
   [완전한 설정]
   ```

4. **알림 라우팅 전략**
   ```yaml
   # monitoring/alert-routing.yaml
   [완전한 설정]
   ```
   - Critical → PagerDuty + Slack
   - Warning → Slack
   - Info → Datadog 대시보드만

5. **Grafana 대시보드**
   ```json
   // monitoring/grafana-dashboard.json
   [완전한 대시보드 정의]
   ```

[출력 형식]

## 모니터링 시스템 완료 패키지

### 아키텍처
```
애플리케이션
  ↓ (메트릭)
Datadog Agent
  ↓
Datadog SaaS
  ↓ (알림)
PagerDuty / Slack

애플리케이션
  ↓ (로그)
CloudWatch Logs
  ↓
Logstash
  ↓
Elasticsearch
  ↓
Kibana
```

### 1. Datadog 모니터 설정

#### 모니터 1: High Error Rate
```yaml
[완전한 설정]
```

[20개 모니터 모두 포함]

### 2. backend/src/utils/metrics.js
```javascript
[완전한 코드 - 최소 200줄]
```

### 3. monitoring/logstash.conf
```
[완전한 설정]
```

### 4. monitoring/alert-routing.yaml
```yaml
[완전한 설정]
```

### 5. monitoring/grafana-dashboard.json
```json
[완전한 대시보드]
```

### 설치 및 설정 가이드

```bash
# 1. Datadog Agent 설치
DD_API_KEY=xxx DD_SITE="datadoghq.com" bash -c "$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_script.sh)"

# 2. 모니터 생성
./scripts/setup-datadog-monitors.sh

# 3. Grafana 대시보드 임포트
./scripts/import-grafana-dashboard.sh
```

### 대시보드 URL
- Datadog: https://app.datadoghq.com/dashboard/xxx
- Grafana: https://grafana.myapp.com/d/xxx
- Kibana: https://kibana.myapp.com

### 알림 테스트

```bash
# 에러 발생 시뮬레이션
./scripts/trigger-error.sh

# 예상 알림:
# 1. Slack #alerts 채널에 메시지
# 2. PagerDuty 온콜 담당자에게 전화
# 3. Datadog 이벤트 생성
```

[제약사항]
- 알림 피로도 방지 (중복 알림 < 5분 간격)
- False positive < 5%
- Alert response time < 1분

[성공 기준]
- 모든 모니터 정상 동작
- 테스트 알림 수신 확인
- 대시보드에서 실시간 메트릭 확인
```

---

## 트러블슈팅 프롬프트

### 템플릿 9: 장애 대응 자동화

```markdown
[역할] 장애 대응 전문가 및 SRE

[목표]
일반적인 프로덕션 장애를 자동 진단하고 해결하는 
트러블슈팅 스크립트 세트를 작성하세요.

[요청사항]

1. **증상별 진단 스크립트 5개**
   ```bash
   troubleshooting/
   ├── diagnose-503.sh         # 503 Service Unavailable
   ├── diagnose-slow-response.sh   # 응답 느림
   ├── diagnose-memory-leak.sh     # 메모리 누수
   ├── diagnose-db-connection.sh   # DB 연결 문제
   └── diagnose-high-cpu.sh        # CPU 사용률 높음
   ```

2. **각 스크립트 포함 사항**
   - 증상 자동 감지
   - 로그 수집
   - 메트릭 분석
   - 원인 추정 (Top 3)
   - 자동 수정 (가능한 경우)
   - 수동 조치 가이드

3. **통합 트러블슈팅 CLI**
   ```bash
   ./troubleshoot.sh [증상]
   
   # 예:
   ./troubleshoot.sh 503
   ./troubleshoot.sh slow
   ./troubleshoot.sh memory
   ```

4. **장애 대응 플레이북**
   ```markdown
   troubleshooting/PLAYBOOK.md
   ```
   - 증상별 대응 절차
   - 롤백 기준
   - 에스컬레이션 기준

5. **포스트모텀 템플릿**
   ```markdown
   troubleshooting/postmortem-template.md
   ```

[출력 형식]

## 트러블슈팅 도구 완료 패키지

### 1. troubleshooting/diagnose-503.sh
```bash
#!/bin/bash
# [완전한 코드 - 최소 200줄]
```

[5개 스크립트 모두 포함]

### 2. troubleshooting/troubleshoot.sh
```bash
#!/bin/bash
# 통합 CLI

[완전한 코드]
```

### 3. troubleshooting/PLAYBOOK.md

#### 증상 1: 503 Service Unavailable

**1단계: 즉시 확인** (1분)
- [ ] ALB 타겟 헬스체크
- [ ] ECS 태스크 상태
- [ ] CloudWatch 로그

**2단계: 원인 진단** (5분)
- [ ] [체크리스트]

**3단계: 해결** (10분)
- [ ] [조치사항]

**롤백 기준**
- 5분 내 원인 파악 안 됨
- 에러율 > 10%

[모든 증상 포함]

### 4. troubleshooting/postmortem-template.md
```markdown
# 장애 보고서

## 요약
- 발생 시각: 
- 종료 시각:
- 지속 시간:
- 영향 범위:

## 타임라인
- [시각] [이벤트]

## 근본 원인

## 해결 방법

## 재발 방지책
```

### 사용 가이드

```bash
# 장애 감지 시
cd /path/to/project

# 1. 자동 진단 실행
./troubleshooting/troubleshoot.sh auto

# 2. 결과 확인
cat troubleshooting/diagnosis-report.txt

# 3. 권장 조치 실행
./troubleshooting/fix-suggested.sh

# 4. 검증
./troubleshooting/verify-fix.sh
```

[제약사항]
- 스크립트 실행 시간 < 1분
- 자동 수정은 안전한 것만
- 모든 변경사항 로그 기록

[성공 기준]
- 증상 자동 감지율 > 90%
- 원인 정확도 > 80%
- 평균 복구 시간 < 30분
```

---

## 단계별 체크리스트

### 빠른 참조용 체크리스트

```markdown
# 배포 전체 체크리스트

## Phase 1: 준비 (1-2주)
- [ ] 코드 감사 완료 (Critical 0건)
- [ ] 환경변수 분리 완료
- [ ] 테스트 커버리지 > 70%
- [ ] ERD 문서화 완료
- [ ] Docker 이미지 빌드 성공

## Phase 2: 스테이징 (1주)
- [ ] 스테이징 환경 구축
- [ ] 데이터 마이그레이션 리허설
- [ ] 72시간 안정성 테스트 통과
- [ ] 부하 테스트 통과
- [ ] 보안 스캔 통과

## Phase 3: 프로덕션 (1주)
- [ ] 프로덕션 인프라 구축
- [ ] CI/CD 파이프라인 구축
- [ ] 모니터링 설정 완료
- [ ] 백업 설정 및 검증
- [ ] 롤백 스크립트 테스트

## Phase 4: 배포 (D-Day)
- [ ] 최종 백업
- [ ] 사용자 공지
- [ ] 프로덕션 배포
- [ ] 헬스체크 통과
- [ ] 스모크 테스트 통과

## Phase 5: 모니터링 (D+7일)
- [ ] 일일 점검 (7일)
- [ ] 성능 모니터링
- [ ] 사용자 피드백 수집
- [ ] 포스트모텀 작성 (장애 발생 시)
```

---

## 실전 사용 예시

### 시나리오 1: 신규 프로젝트 배포

```markdown
**상황**: Node.js + React 프로젝트를 AWS에 처음 배포

**Claude에게 요청**:

---

당신은 시니어 DevOps 엔지니어입니다.
다음 프로젝트를 AWS ECS에 배포하기 위한 완전한 작업을 수행하세요.

**프로젝트 정보:**
- 백엔드: Node.js 18 + Express + PostgreSQL
- 프론트엔드: React 18 + Vite
- 현재 위치: GitHub 저장소
- 목표: 1주일 내 프로덕션 배포

**작업 순서:**
1. 프로젝트 구조 분석 및 개선 제안
2. 환경변수 시스템 구축
3. Docker 컨테이너화
4. AWS 인프라 구성 (Terraform)
5. CI/CD 파이프라인 (GitHub Actions)
6. 모니터링 설정 (Datadog)

**각 단계마다:**
- 완전한 코드/스크립트 제공
- 실행 방법 설명
- 검증 방법 제시
- 트러블슈팅 가이드

**제약사항:**
- 월 예산: $300
- 다운타임: < 5분
- 팀 역량: 주니어 개발자 2명

지금 1단계부터 시작하세요.

---
```

### 시나리오 2: 기존 프로젝트 마이그레이션

```markdown
**상황**: Heroku에서 AWS로 마이그레이션

**Claude에게 요청**:

---

당신은 클라우드 마이그레이션 전문가입니다.
Heroku에서 AWS로 무중단 마이그레이션을 수행하세요.

**현재 환경:**
- Heroku: 2 Dynos + Heroku Postgres + Redis
- 일일 트래픽: 50K requests
- 데이터베이스: 10GB
- 다운타임 허용: 0분

**목표 환경:**
- AWS ECS Fargate
- RDS PostgreSQL
- ElastiCache Redis

**작업:**
1. 현재 Heroku 설정 분석
2. AWS 동등 인프라 설계
3. 마이그레이션 계획 (블루-그린)
4. 데이터 동기화 전략
5. DNS 전환 계획
6. 롤백 계획

**출력:**
- 단계별 실행 스크립트
- 타임라인 (시간 단위)
- 리스크 및 완화책
- 예상 비용 비교

지금 시작하세요.

---
```

---

## 마무리

### 이 프롬프트 템플릿을 사용하는 방법

1. **프로젝트 상황에 맞는 템플릿 선택**
2. **[대괄호] 안의 내용을 실제 값으로 교체**
3. **Claude Code 또는 Claude에게 복사-붙여넣기**
4. **생성된 결과를 검토 및 실행**
5. **문제 발생 시 트러블슈팅 프롬프트 사용**

### 핵심 원칙

- ✅ **명확한 역할 부여**: "당신은 X 전문가입니다"
- ✅ **구체적인 출력 형식**: 코드, 스크립트, 문서 형식 지정
- ✅ **제약사항 명시**: 시간, 예산, 팀 역량
- ✅ **검증 방법 요구**: 테스트, 체크리스트
- ✅ **완전한 코드 요구**: "완전한 코드 - 최소 X줄"

### 다음 단계

이제 이 프롬프트 템플릿과 배포 가이드를 활용해서:
1. 프로젝트를 분석하고
2. 단계별로 작업을 진행하고
3. 안전하게 프로덕션에 배포하세요!

**Happy Deploying! 🚀**
