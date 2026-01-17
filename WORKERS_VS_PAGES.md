# Cloudflare Workers vs Pages 차이점

## 📋 요약

| 항목 | Cloudflare Workers | Cloudflare Pages |
|------|-------------------|------------------|
| **용도** | 서버리스 함수 (JavaScript/WebAssembly) | 정적 사이트 및 JAMstack 애플리케이션 |
| **URL 형식** | `*.workers.dev` | `*.pages.dev` |
| **배포 방식** | `npx wrangler deploy` | Git 연동 자동 배포 (또는 `wrangler pages deploy`) |
| **Next.js 지원** | ❌ 제한적 (일부 기능만) | ✅ 완전 지원 (정적 출력) |
| **서버 사이드 렌더링** | ✅ 가능 | ✅ 가능 (Pages Functions) |
| **정적 파일 서빙** | ❌ 어려움 | ✅ 자동 지원 |
| **사용 사례** | API, 미들웨어, 엣지 컴퓨팅 | 블로그, 문서, React/Vue 등 SPA, Next.js |

## 🔍 상세 비교

### 1. Cloudflare Workers

**목적**: 엣지에서 실행되는 서버리스 함수

**특징**:
- JavaScript, TypeScript, Rust (WebAssembly) 지원
- 글로벌 엣지 네트워크에서 실행
- Request/Response를 직접 처리
- 0ms 콜드 스타트
- KV, Durable Objects, R2 스토리지 통합

**배포 방법**:
```bash
# wrangler.toml 파일 필요
npx wrangler deploy
```

**예시 사용 사례**:
- API 엔드포인트
- A/B 테스트
- 요청 변환/미들웨어
- 인증/권한 처리
- 실시간 데이터 처리

**예시 코드**:
```javascript
// worker.js
export default {
  async fetch(request) {
    return new Response('Hello from Workers!', {
      headers: { 'content-type': 'text/plain' },
    });
  },
};
```

**URL 예시**:
```
https://my-worker.djun604.workers.dev
```

---

### 2. Cloudflare Pages

**목적**: 정적 사이트와 JAMstack 애플리케이션 호스팅

**특징**:
- Git 연동 자동 배포
- Next.js, React, Vue, Angular 등 프레임워크 지원
- 정적 파일 자동 서빙
- Pages Functions (서버리스 함수) 지원
- Custom domains (커스텀 도메인) 쉬운 설정
- 무료 플랜 제공

**배포 방법**:
1. **자동 배포 (Git 연동)** - 권장
   - GitHub/GitLab 연결
   - 자동 빌드 및 배포

2. **CLI 배포**:
   ```bash
   npx wrangler pages deploy ./out --project-name=my-project
   ```

**예시 사용 사례**:
- 블로그 (Gatsby, Hugo 등)
- 문서 사이트 (Docusaurus, MkDocs 등)
- 포트폴리오 웹사이트
- Next.js 정적 사이트 (현재 프로젝트)
- React/Vue SPA

**Next.js 설정**:
```javascript
// next.config.mjs
export default {
  output: 'export', // 정적 출력 모드
  images: {
    unoptimized: true, // 정적 이미지
  },
};
```

**URL 예시**:
```
https://vision-arena.pages.dev
https://vision-arena-djun604.pages.dev
```

---

## 🔄 Workers + Pages 통합

### Pages Functions (Pages에서 Workers 사용)

Pages 프로젝트 내에서도 Workers 기능을 사용할 수 있습니다:

```
functions/
  api/
    hello.js          // /api/hello 엔드포인트
  auth/
    login.js          // /auth/login 엔드포인트
```

**예시**:
```javascript
// functions/api/hello.js
export async function onRequest(request) {
  return new Response(JSON.stringify({ message: 'Hello from Pages Functions!' }), {
    headers: { 'content-type': 'application/json' },
  });
}
```

이렇게 하면 `https://your-site.pages.dev/api/hello`로 접근 가능합니다.

---

## 🎯 현재 프로젝트에 맞는 선택

### ✅ **Cloudflare Pages 선택 이유**

현재 프로젝트는 **Next.js 정적 사이트**이므로 **Pages**가 정답입니다:

1. **Next.js 완전 지원**
   - `output: 'export'` 모드로 정적 사이트 생성
   - 모든 페이지가 HTML로 사전 렌더링

2. **Git 자동 배포**
   - GitHub 푸시 시 자동 빌드/배포
   - 별도 배포 명령 불필요

3. **정적 파일 최적화**
   - 자동 CDN 배포
   - 이미지, CSS, JS 자동 최적화

4. **간편한 설정**
   - Dashboard에서 쉽게 설정
   - 커스텀 도메인 쉽게 연결

### ❌ Workers를 사용하지 않는 이유

1. **Next.js 제한**
   - Workers는 Next.js를 직접 실행할 수 없음
   - API Routes 등 일부 기능 미지원

2. **복잡한 설정**
   - `wrangler.toml` 설정 필요
   - 정적 파일 서빙을 위한 추가 작업 필요

3. **용도 부적합**
   - Workers는 API/함수용
   - Pages는 웹사이트용

---

## 📊 선택 가이드

### Pages를 선택해야 할 때

✅ 정적 사이트 (HTML, CSS, JS)  
✅ Next.js, Gatsby, Vue, React SPA  
✅ 블로그, 문서 사이트  
✅ Git 연동 자동 배포 원함  
✅ 커스텀 도메인 쉬운 설정 원함  

### Workers를 선택해야 할 때

✅ API 엔드포인트가 필요  
✅ Request/Response 변환 미들웨어  
✅ 엣지에서 데이터 처리  
✅ 서버리스 함수만 필요  
✅ KV, Durable Objects 등 Workers 기능 필요  

### 둘 다 사용해야 할 때

✅ Pages + Pages Functions
- Pages로 웹사이트 호스팅
- Pages Functions로 API 엔드포인트 추가

예시:
```
프로젝트/
  out/              # Next.js 빌드 결과 (Pages로 배포)
  functions/        # API 엔드포인트 (Pages Functions)
    api/
      data.js
```

---

## 🔧 현재 배포 오류 원인

### 문제 상황

```
✘ [ERROR] It looks like you've run a Workers-specific command in a Pages project.
For Pages, please run `wrangler pages deploy` instead.
```

### 원인

- **Workers 명령어 사용**: `npx wrangler deploy` (Workers용)
- **Pages 프로젝트**: 실제로는 Pages 프로젝트이므로 Workers 명령어 사용 불가

### 해결

1. **Dashboard에서 Deploy command 제거**:
   - Settings → Builds & deployments
   - Deploy command: `true` 또는 비워두기

2. **또는 Pages 명령어 사용**:
   ```bash
   npx wrangler pages deploy ./out --project-name=vision-arena
   ```

---

## 💡 요약

| 질문 | 답변 |
|------|------|
| **현재 프로젝트는?** | Next.js 정적 사이트 |
| **어떤 서비스 사용?** | **Cloudflare Pages** ✅ |
| **URL 형식?** | `*.pages.dev` |
| **배포 방법?** | Git 연동 자동 배포 (권장) |
| **Workers는 언제?** | API나 서버리스 함수가 필요할 때 |

**결론**: 현재 프로젝트는 **Cloudflare Pages**를 사용하는 것이 정답입니다!

