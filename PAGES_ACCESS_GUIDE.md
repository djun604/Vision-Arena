# Cloudflare Pages 접근 가이드

## 🔍 현재 상황

**현재 URL**: `https://dash.cloudflare.com/dbb4a5393772857cd04a2a936102ce82/workers-and-pages`

**문제**: Pages 탭이 보이지 않음

## ✅ 해결 방법

### 방법 1: 직접 Pages URL로 접근 (가장 확실한 방법)

계정 ID를 사용하여 직접 Pages 섹션으로 접근:

```
https://dash.cloudflare.com/dbb4a5393772857cd04a2a936102ce82/pages
```

또는

```
https://dash.cloudflare.com/pages
```

### 방법 2: Workers & Pages 페이지에서 필터 사용

현재 페이지(`workers-and-pages`)에서:

1. 상단에 **"Filter by"** 또는 **"Type"** 드롭다운 메뉴 확인
2. **"Pages"** 선택
3. 또는 URL에 쿼리 파라미터 추가:
   ```
   https://dash.cloudflare.com/dbb4a5393772857cd04a2a936102ce82/workers-and-pages?type=pages
   ```

### 방법 3: 새 Pages 프로젝트 생성 (프로젝트가 없는 경우)

직접 Pages 프로젝트 생성 페이지로 이동:

```
https://dash.cloudflare.com/pages/new
```

또는 계정 ID 포함:

```
https://dash.cloudflare.com/dbb4a5393772857cd04a2a936102ce82/pages/new
```

#### 프로젝트 생성 단계

1. 위 URL로 접근
2. **"Connect to Git"** 선택
3. GitHub 선택 및 인증
4. 저장소 선택: `djun604/Vision-Arena`
5. 프로젝트 설정:
   - **Project name**: `vision-arena`
   - **Framework preset**: `Next.js`
   - **Build command**: `npm run build`
   - **Deploy command**: `true` (또는 비워두기) ⚠️ **중요!**
   - **Build output directory**: `out`
   - **Root directory**: (비워두기)
6. **Save and Deploy** 클릭

### 방법 4: Wrangler CLI로 직접 배포 (대안)

Dashboard 접근이 어렵다면, Wrangler CLI로 직접 배포:

```bash
# 1. Wrangler 로그인 (처음 한 번만)
npx wrangler login

# 2. Pages 프로젝트 생성 (없는 경우)
npx wrangler pages project create vision-arena

# 3. 빌드 (이미 했지만 확인)
npm run build

# 4. Pages에 배포
npx wrangler pages deploy ./out --project-name=vision-arena
```

**참고**: CLI로 배포하면 Dashboard에도 프로젝트가 나타납니다.

## 📋 단계별 체크리스트

- [ ] **직접 URL 시도**: `https://dash.cloudflare.com/pages`
- [ ] **필터 확인**: `workers-and-pages` 페이지에서 "Filter by" 또는 "Type" 드롭다운
- [ ] **새 프로젝트 생성**: `https://dash.cloudflare.com/pages/new`
- [ ] **CLI 배포**: Wrangler CLI로 직접 배포 시도

## 💡 추가 팁

### Workers & Pages 통합 UI

최근 Cloudflare가 Workers와 Pages를 통합하고 있어:

- 왼쪽 사이드바의 **"Workers & Pages"** 메뉴 안에 두 서비스가 함께 표시될 수 있습니다
- 상단에 탭(Workers / Pages)이나 필터 옵션이 있을 수 있습니다
- 프로젝트 목록에서 타입을 구분할 수 있습니다 (Workers / Pages)

### Pages 프로젝트 확인 방법

1. **Dashboard 검색 기능** 사용:
   - 상단 검색창에 "Pages" 또는 "vision-arena" 입력

2. **프로젝트 목록 확인**:
   - Workers & Pages 페이지에서 프로젝트 목록 확인
   - 아이콘이나 타입 표시로 Pages 프로젝트 식별

## 🚨 여전히 접근 불가 시

1. **브라우저 캐시 지우기**: Ctrl+Shift+R (Windows) 또는 Cmd+Shift+R (Mac)
2. **다른 브라우저로 시도**
3. **시크릿/프라이빗 모드에서 접근**
4. **Cloudflare 지원팀 문의**: Pages 기능 활성화 요청

