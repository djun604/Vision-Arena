# Cloudflare Pages 빌드 명령어 설정 가이드

## 🔴 현재 문제

```
No build command specified. Skipping build step.
Error: Output directory "out" not found.
```

**원인**: Cloudflare Pages Dashboard에 **Build command**가 설정되지 않음

## ✅ 해결 방법

### 1단계: Cloudflare Pages Dashboard 접속

1. **https://dash.cloudflare.com** 접속
2. **Workers & Pages** 메뉴 클릭
3. 상단 탭에서 **Pages** 선택
4. 프로젝트 선택 (예: `vision-arena`)

### 2단계: Build Command 설정

1. 프로젝트 페이지에서 **Settings** 탭 클릭
2. **Builds & deployments** 섹션 찾기
3. 다음 설정 확인 및 수정:

#### 필수 설정:

| 항목 | 설정 값 |
|------|---------|
| **Framework preset** | `Next.js` |
| **Build command** | `npm run build` ⚠️ **필수!** |
| **Build output directory** | `out` |
| **Root directory** | `/` (또는 비워두기) |
| **Deploy command** | `true` 또는 **비워두기** |

4. **Save** 버튼 클릭

### 3단계: 재배포

**방법 1: 자동 재배포**
- 설정 저장 후 자동으로 재배포가 시작됩니다
- 또는 GitHub에 새 커밋 푸시 → 자동으로 재배포됩니다

**방법 2: 수동 재배포**
1. **Deployments** 탭 클릭
2. 최신 배포 우측의 **⋯** 메뉴 클릭
3. **Retry deployment** 선택

## 📋 설정 스크린샷 가이드

### Builds & deployments 섹션 예시:

```
Framework preset: Next.js
Build command: npm run build
Build output directory: out
Root directory: (비워두기)
Deploy command: true (또는 비워두기)
Node.js version: 18.x (또는 20.x)
```

## 🔍 빌드 로그 확인

배포 성공 시 빌드 로그에는 다음과 같이 표시됩니다:

```
Installing dependencies...
Running build command: npm run build
✓ Compiled successfully
✓ Generating static pages (22/22)
Success: Build command completed
✓ Output directory "out" found
```

## ⚠️ 주의사항

1. **Build command는 반드시 설정해야 합니다**
   - 없으면 빌드가 실행되지 않아 `out` 디렉토리가 생성되지 않습니다

2. **Deploy command는 비워두거나 `true`로 설정**
   - `npx wrangler deploy` 같은 명령어는 사용하지 마세요

3. **Node.js 버전 확인**
   - Next.js 14는 Node.js 18.x 이상 필요
   - Cloudflare Pages에서 Node.js 버전도 설정 가능

## 🚀 다음 단계

설정 완료 후:
1. 배포가 자동으로 시작됩니다
2. Deployments 탭에서 진행 상황 확인
3. 배포 완료 후 사이트 확인

