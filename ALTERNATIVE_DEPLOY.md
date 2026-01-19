# Cloudflare Pages 404 에러 해결 방법

## 🔴 문제 상황

`https://dash.cloudflare.com/pages` 접속 시 404 에러 발생

## 🔍 가능한 원인

1. **Pages 기능이 계정에 활성화되지 않음**
2. **메뉴 구조가 다름**
3. **권한 문제**

## ✅ 해결 방법

### 방법 1: Workers & Pages 메뉴에서 찾기

1. Dashboard 홈으로 이동: `https://dash.cloudflare.com`
2. 왼쪽 메뉴에서 **"Workers & Pages"** 클릭
3. 페이지가 열리면:
   - 상단에 탭이 있을 수 있습니다: **"Workers"**, **"Pages"**
   - 또는 왼쪽 사이드바에 **"Pages"** 메뉴가 있을 수 있습니다
   - 또는 **"Create"** 버튼 클릭 → **"Pages project"** 선택

### 방법 2: 계정 설정 확인

1. Dashboard 오른쪽 상단 **프로필 아이콘** 클릭
2. **"My Profile"** 또는 **"Account"** 선택
3. 기능 활성화 여부 확인

### 방법 3: 새 프로젝트 생성 버튼 찾기

1. Dashboard 홈에서
2. **"Create"** 또는 **"Add a site"** 버튼 찾기
3. **"Pages project"** 또는 **"Pages"** 선택

### 방법 4: URL 구조 확인

다음 URL들을 시도해보세요:

```
https://dash.cloudflare.com/[계정ID]/workers/pages
```

또는

```
https://dash.cloudflare.com/[계정ID]/pages
```

(계정ID는 Dashboard URL에 표시됩니다)

### 방법 5: 지원팀 문의

위 방법이 모두 실패하면:
- Cloudflare 지원팀에 문의하여 Pages 기능 활성화 요청
- 또는 Free 플랜에서 Pages 사용 가능 여부 확인

## 🛠️ 임시 해결책: Wrangler CLI로 배포

Dashboard 접근이 어렵다면, Wrangler CLI로 직접 배포할 수 있습니다:

```bash
# 1. Wrangler 설치 (이미 있다면 생략)
npm install -g wrangler

# 2. 로그인
wrangler login

# 3. Pages 프로젝트 생성 및 배포
npx wrangler pages project create vision-arena

# 4. 빌드
npm run build

# 5. 배포
npx wrangler pages deploy .next --project-name=vision-arena
```

## 📋 체크리스트

- [ ] Dashboard → Workers & Pages 메뉴 확인
- [ ] 상단 탭에서 "Pages" 찾기
- [ ] "Create" 버튼에서 "Pages project" 찾기
- [ ] 프로필에서 계정 설정 확인
- [ ] Wrangler CLI로 직접 배포 시도

## 💡 참고

Workers와 Pages는 Cloudflare의 다른 서비스입니다:
- **Workers**: 서버리스 함수 (`*.workers.dev`)
- **Pages**: 정적 사이트 및 Next.js (`*.pages.dev`)

두 서비스 모두 "Workers & Pages" 섹션에서 관리됩니다.

