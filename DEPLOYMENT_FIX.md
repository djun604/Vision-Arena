# 배포 문제 해결 가이드

## 🔴 현재 문제

**증상:** `https://vision-arena.djun604.workers.dev/` 에서 "Hello world"만 표시됨

**원인:**
- `wrangler.toml` 파일이 Workers 배포를 유발
- Next.js 앱이 Workers가 아닌 **Pages**로 배포되어야 함

## ✅ 해결 방법

### 1. wrangler.toml 삭제 완료 ✅
- `wrangler.toml` 파일이 삭제되었습니다
- 이제 Pages로 배포됩니다

### 2. Cloudflare Pages Dashboard 확인

#### 프로젝트 타입 확인
1. https://dash.cloudflare.com 접속
2. **Workers & Pages** → 프로젝트 확인
3. **Pages** 섹션에 있는지 확인 (Workers가 아님!)

#### 올바른 배포 설정
- **Framework preset**: `Next.js`
- **Build command**: `npm run build`
- **Deploy command**: `true` (또는 비워두기)
- **Build output directory**: (비워두기)
- **Root directory**: (비워두기)

### 3. 배포 URL 확인

**올바른 Pages URL 형식:**
```
https://vision-arena.pages.dev
```
또는
```
https://vision-arena-djun604.pages.dev
```

❌ **Workers URL (잘못됨):**
```
https://vision-arena.djun604.workers.dev  ← 이것은 Workers URL!
```

### 4. 새 배포 트리거

1. GitHub에 푸시하면 자동 재배포
2. 또는 Cloudflare Pages Dashboard → **Deployments** → **Retry deployment**

## 📋 차이점 정리

| 항목 | Cloudflare Workers | Cloudflare Pages |
|------|-------------------|------------------|
| URL 형식 | `*.workers.dev` | `*.pages.dev` |
| 용도 | 서버리스 함수 | 정적 사이트/Next.js |
| 설정 파일 | `wrangler.toml` | 자동 감지 또는 Dashboard 설정 |
| Next.js 지원 | ❌ | ✅ |

## 🎯 다음 단계

1. ✅ `wrangler.toml` 삭제 완료
2. Cloudflare Pages Dashboard에서 프로젝트가 **Pages** 섹션에 있는지 확인
3. 배포 설정 확인 (위 설정 참고)
4. Pages URL (`*.pages.dev`) 확인

