# Cloudflare Pages 배포 오류 해결 가이드

## 🔴 현재 오류

```
✘ [ERROR] It looks like you've run a Workers-specific command in a Pages project.
For Pages, please run `wrangler pages deploy` instead.
```

**원인**: Cloudflare Pages Dashboard의 **Deploy command**에 `npx wrangler deploy`가 설정되어 있음

## ✅ 해결 방법

### 1단계: Cloudflare Pages Dashboard 접속

1. **https://dash.cloudflare.com** 접속
2. **Workers & Pages** 메뉴 클릭
3. 상단 탭에서 **Pages** 선택
4. 프로젝트 선택 (예: `vision-arena`)

### 2단계: Deploy Command 설정 변경

1. 프로젝트 페이지에서 **Settings** 탭 클릭
2. **Builds & deployments** 섹션 찾기
3. **Deploy command** 필드 확인

**현재 설정** (잘못됨):
```
npx wrangler deploy
```

**올바른 설정** (다음 중 하나):
- `true` ← **권장**
- 또는 **비워두기** (빈 문자열)

4. **Save** 버튼 클릭

### 3단계: 재배포

**방법 1: 자동 재배포**
- GitHub에 새 커밋 푸시 → 자동으로 재배포됩니다

**방법 2: 수동 재배포**
1. **Deployments** 탭 클릭
2. 최신 배포 우측의 **⋯** 메뉴 클릭
3. **Retry deployment** 선택

## 📋 설정 요약

| 항목 | 올바른 설정 | 잘못된 설정 |
|------|------------|------------|
| Framework preset | `Next.js` | - |
| Build command | `npm run build` | - |
| **Deploy command** | `true` 또는 비워두기 ⚠️ | `npx wrangler deploy` ❌ |
| Build output directory | `out` | - |

## 🔍 확인 사항

### 빌드 로그에서 확인

배포 성공 시 빌드 로그에는 다음과 같이 표시됩니다:

```
Success: Build command completed
✓ out 디렉토리가 생성됨
✓ 정적 파일들이 준비됨
```

**Deploy command 없이 자동으로 배포됨** (별도의 deploy 단계 없음)

### Pages URL 확인

배포 성공 후 다음 형식의 URL로 접근 가능:

```
https://vision-arena.pages.dev
또는
https://vision-arena-[계정ID].pages.dev
```

**주의**: `*.workers.dev` URL은 Workers 프로젝트용이므로 무시하세요.

## 🆚 Workers vs Pages

| 항목 | Cloudflare Workers | Cloudflare Pages |
|------|-------------------|------------------|
| URL 형식 | `*.workers.dev` | `*.pages.dev` |
| 배포 명령 | `npx wrangler deploy` | 자동 (Git 연동) |
| Deploy command | 필요 없음 | `true` 또는 비워두기 |
| Next.js 지원 | ❌ | ✅ |
| 정적 사이트 | ❌ | ✅ |

## 📝 참고

- `wrangler.jsonc` 파일은 빌드 설정에 사용되며, 배포 설정과는 별개입니다
- Cloudflare Pages는 Git 저장소와 연동하면 자동으로 빌드하고 배포합니다
- Deploy command는 Pages에서 일반적으로 필요하지 않습니다

