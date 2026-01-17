# Pages 도메인 얻는 방법

## 🔴 현재 상황

- ✅ Workers URL 존재: `https://vision-arena.djun604.workers.dev/`
- ❌ Pages URL 없음: `*.pages.dev` 도메인을 찾을 수 없음

**원인**: Pages 프로젝트가 아직 생성되지 않았습니다.

## ✅ 해결 방법: Pages 프로젝트 생성

### 방법 1: Cloudflare Dashboard에서 생성 (권장)

#### 1단계: Pages 프로젝트 생성 페이지 접근

다음 URL로 직접 접근:

```
https://dash.cloudflare.com/pages/new
```

또는 계정 ID 포함:

```
https://dash.cloudflare.com/dbb4a5393772857cd04a2a936102ce82/pages/new
```

#### 2단계: GitHub 저장소 연결

1. **"Connect to Git"** 선택
2. **GitHub** 선택 (또는 GitLab, Bitbucket)
3. Cloudflare에서 GitHub 인증 요청 → **승인**
4. 저장소 선택: `djun604/Vision-Arena`

#### 3단계: 프로젝트 설정

**기본 설정:**
- **Project name**: `vision-arena` (또는 원하는 이름)

**Build settings:**
- **Framework preset**: `Next.js` (자동 감지될 수 있음)
- **Build command**: `npm run build`
- **Build output directory**: `out` ⚠️ **중요!**
- **Root directory**: (비워두기)

**Deploy settings:**
- **Deploy command**: `true` 또는 **비워두기** ⚠️ **중요!**

#### 4단계: 저장 및 배포

1. **"Save and Deploy"** 클릭
2. 빌드가 시작됩니다 (몇 분 소요)
3. 빌드 완료 후 **Pages URL 확인**

#### 5단계: Pages URL 확인

배포 완료 후 다음 위치에서 URL 확인:

1. **프로젝트 페이지**:
   - 프로젝트 이름 옆에 표시됨
   - 형식: `https://vision-arena.pages.dev`

2. **Deployments 탭**:
   - 최신 배포 클릭
   - "View deployment" → URL 확인

3. **Settings 탭**:
   - Custom domains 섹션
   - 기본 Pages URL 표시

**예상 Pages URL:**
```
https://vision-arena.pages.dev
또는
https://vision-arena-djun604.pages.dev
```

### 방법 2: Wrangler CLI로 생성 (대안)

Dashboard 접근이 어렵다면 CLI 사용:

```bash
# 1. Wrangler 로그인
npx wrangler login

# 2. Pages 프로젝트 생성
npx wrangler pages project create vision-arena

# 3. 빌드
npm run build

# 4. Pages에 배포 (자동으로 URL 표시됨)
npx wrangler pages deploy ./out --project-name=vision-arena
```

배포 후 CLI에서 Pages URL이 표시됩니다:
```
✨ Deployment complete! Take a sneak peek at your Workers for Pages application:
   https://vision-arena.pages.dev
```

## 🔍 Pages 프로젝트 확인 방법

### Dashboard에서 확인

1. **Pages 섹션 접근**:
   ```
   https://dash.cloudflare.com/pages
   ```

2. **프로젝트 목록 확인**:
   - "vision-arena" 프로젝트가 있는지 확인
   - 프로젝트 클릭 → Deployments 탭

3. **URL 확인**:
   - 프로젝트 이름 옆에 Pages URL 표시
   - 형식: `*.pages.dev`

### Workers vs Pages 구분

| 항목 | Workers 프로젝트 | Pages 프로젝트 |
|------|-----------------|----------------|
| URL 형식 | `*.workers.dev` | `*.pages.dev` |
| 메뉴 위치 | Workers & Pages → Workers 탭 | Workers & Pages → Pages 탭 |
| 프로젝트 타입 | "Worker" | "Pages project" |

## 📋 체크리스트

Pages URL을 얻기 위한 단계:

- [ ] **Pages 프로젝트 생성**: `https://dash.cloudflare.com/pages/new`
- [ ] **GitHub 저장소 연결**: `djun604/Vision-Arena`
- [ ] **설정 완료**:
  - Build command: `npm run build`
  - Build output directory: `out`
  - Deploy command: `true` 또는 비워두기
- [ ] **배포 완료 확인**: Deployments 탭에서 성공 확인
- [ ] **Pages URL 확인**: `https://vision-arena.pages.dev` 형식

## ⚠️ 주의사항

### Workers 프로젝트는 그대로 두세요

- Workers 프로젝트 (`*.workers.dev`)는 삭제하지 마세요
- Pages 프로젝트와 Workers 프로젝트는 **별도로 존재**할 수 있습니다
- 필요하면 두 개 다 사용할 수 있습니다

### Deploy Command 설정 중요!

Pages 프로젝트를 생성할 때:

- ✅ **Deploy command**: `true` 또는 비워두기
- ❌ **Deploy command**: `npx wrangler deploy` (Workers 명령어)

잘못된 설정 시 배포 오류가 발생합니다!

## 🎯 요약

**Pages URL을 얻으려면:**

1. Pages 프로젝트 생성 필요
2. GitHub 저장소 연결
3. 빌드 설정 완료 (`out` 디렉토리)
4. 배포 후 `*.pages.dev` URL 자동 생성

**빠른 링크:**
- 프로젝트 생성: `https://dash.cloudflare.com/pages/new`
- Pages 목록: `https://dash.cloudflare.com/pages`

## 💡 추가 팁

### 커스텀 도메인 연결 (선택사항)

Pages URL을 얻은 후, 자신의 도메인을 연결할 수 있습니다:

1. Pages 프로젝트 → **Settings** → **Custom domains**
2. **"Set up a custom domain"** 클릭
3. 도메인 입력 (예: `vision-arena.com`)
4. DNS 설정 안내에 따라 도메인 설정

### 두 URL 비교

- **Workers URL**: `https://vision-arena.djun604.workers.dev/`
  - 현재: "Hello world"만 표시 (Workers 함수)
  - 용도: API 엔드포인트

- **Pages URL**: `https://vision-arena.pages.dev` (생성 후)
  - Next.js 앱이 정상적으로 표시됨
  - 용도: 웹사이트 호스팅

**현재 프로젝트는 Pages URL이 필요합니다!**

