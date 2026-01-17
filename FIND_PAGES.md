# Cloudflare Pages 찾기 가이드

## 🔍 Pages 섹션이 안 보일 때

### 방법 1: 직접 URL로 접근

Cloudflare Pages는 다음 URL로 직접 접근할 수 있습니다:

**대시보드 URL:**
```
https://dash.cloudflare.com/pages
```

또는

```
https://dash.cloudflare.com/?to=/:account/pages
```

### 방법 2: 왼쪽 메뉴에서 찾기

Cloudflare Dashboard 왼쪽 메뉴에서:

1. **"Workers & Pages"** 클릭
   - 이 안에 두 개의 탭/섹션이 있을 수 있습니다:
     - **Workers** 탭
     - **Pages** 탭

2. 또는 상단 탭에서:
   - Workers 탭
   - Pages 탭

### 방법 3: 검색 기능 사용

1. Dashboard 상단의 **검색 창** 사용
2. "Pages" 또는 "vision-arena" 검색
3. 결과에서 Pages 프로젝트 선택

### 방법 4: 프로젝트 목록에서 확인

1. Dashboard 홈에서
2. 최근 프로젝트 목록 확인
3. "vision-arena" 프로젝트가 있는지 확인

## 🆕 새로 만들기

Pages 섹션이 없거나 프로젝트가 없다면:

### 직접 Pages 프로젝트 생성 URL

```
https://dash.cloudflare.com/pages/new
```

### 생성 단계

1. 위 URL로 접근
2. **"Connect to Git"** 선택
3. GitHub 선택
4. 저장소: `djun604/Vision-Arena` 선택
5. 프로젝트 설정:
   - Project name: `vision-arena`
   - Framework preset: `Next.js`
   - Build command: `npm run build`
   - Deploy command: `true`
6. **Save and Deploy** 클릭

## 🔄 대안: 수동 배포 (Wrangler CLI 사용)

Pages 섹션이 정말 없다면, Wrangler CLI로 직접 배포할 수도 있습니다:

```bash
# 로컬에서 빌드
npm run build

# Pages에 배포 (CLI 사용)
npx wrangler pages deploy .next --project-name=vision-arena
```

하지만 Dashboard를 통한 Git 연동이 더 편리합니다.

## ⚠️ 확인 사항

1. **Cloudflare 계정 타입 확인**
   - Free 플랜에서도 Pages 사용 가능
   - 계정이 활성화되어 있는지 확인

2. **브라우저 캐시 문제**
   - 브라우저 새로고침 (Ctrl+Shift+R 또는 Cmd+Shift+R)
   - 다른 브라우저로 시도

3. **권한 문제**
   - 계정의 Owner 또는 Admin 권한이 있는지 확인

## 📞 추가 도움

여전히 Pages를 찾을 수 없다면:
- Cloudflare 지원팀에 문의
- 또는 직접 URL로 접근: `https://dash.cloudflare.com/pages`

