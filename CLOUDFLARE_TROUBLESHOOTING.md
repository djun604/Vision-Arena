# Cloudflare Pages 배포 문제 해결 가이드

## 🔍 배포 URL이 안 나올 때 체크리스트

### 1. 배포 상태 확인
Cloudflare Pages Dashboard → Deployments 탭에서:
- 최신 배포의 상태 확인 (✅ Success / ❌ Failed)
- Failed 상태라면 Build log 확인

### 2. Deploy Command 설정 확인 (중요!)

**현재 문제:**
- Deploy command에 `npx wrangler deploy` 설정되어 있음
- 이로 인해 배포가 실패하고 URL이 생성되지 않음

**해결 방법:**
1. Cloudflare Pages Dashboard 접속
2. Settings → Builds & deployments
3. **Deploy command** 필드에 다음 중 하나 입력:
   - `true` (권장 - 항상 성공)
   - 또는 `echo "Deploy handled by Cloudflare Pages"`
4. Save 클릭

### 3. 빌드 로그 확인
- Deployments → 최신 배포 → View details → Build log
- 에러 메시지 확인:
  - `Missing entry-point to Worker script` → Deploy command 문제
  - `Build failed` → 빌드 설정 문제

### 4. 기본 URL 확인
배포가 성공하면 자동으로 생성되는 URL:
- `https://vision-arena.pages.dev` (프로젝트 이름 기반)

### 5. 프로덕션 브랜치 확인
- Settings → Builds & deployments
- Production branch: `main` 확인

## ✅ 올바른 설정 예시

```
Framework preset: Next.js
Build command: npm run build
Deploy command: true  ← 중요!
Build output directory: (비워두기)
Root directory: (비워두기)
Production branch: main
```

## 🚨 현재 에러 원인

로그에서 확인된 에러:
```
✘ [ERROR] Missing entry-point to Worker script or to assets directory
```

이것은 Deploy command에 `npx wrangler deploy`가 설정되어 있어서 발생합니다.

**즉시 조치:**
Deploy command를 `true`로 변경하고 재배포하세요.

