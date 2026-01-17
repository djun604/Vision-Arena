# Vision Arena

Next.js 기반 모델 리더보드 및 평가 시스템

## 📋 프로젝트 정보

이 프로젝트는 AI 모델의 성능을 평가하고 리더보드를 제공하는 웹 애플리케이션입니다.

## 🚀 배포 (Cloudflare Pages)

### 배포 설정

Cloudflare Pages Dashboard에서 다음 설정을 사용하세요:

1. **https://dash.cloudflare.com** 접속
2. **Workers & Pages** → **Pages** 섹션
3. 프로젝트 선택 (또는 새 프로젝트 생성)
4. **Settings** → **Builds & deployments** 섹션

#### 필수 설정

- **Framework preset**: `Next.js` (또는 자동 감지)
- **Build command**: `npm run build`
- **Deploy command**: `true` 또는 **비워두기** ⚠️ **중요!**
- **Build output directory**: `out` (Next.js `output: 'export'` 모드 사용 중)
- **Root directory**: (비워두기)

### ⚠️ 중요: Deploy Command 설정

**현재 오류 원인**: Deploy command에 `npx wrangler deploy`가 설정되어 있음

**해결 방법**:
1. Cloudflare Pages Dashboard → 프로젝트 → **Settings** → **Builds & deployments**
2. **Deploy command** 필드를 다음 중 하나로 변경:
   - `true` (권장)
   - 또는 완전히 **비워두기** (빈 문자열)
3. **Save** 클릭
4. **Deployments** 탭에서 새 배포 트리거

**이유**: 
- `npx wrangler deploy`는 **Workers** 배포 명령입니다
- **Pages**는 Git 연동 시 자동 배포되므로 Deploy command가 필요 없습니다
- `out` 디렉토리가 자동으로 감지되어 배포됩니다

### 배포 프로세스

1. GitHub에 푸시하면 자동으로 배포됩니다
2. 빌드는 자동으로 실행됩니다 (`npm run build`)
3. `out` 디렉토리가 자동으로 감지되어 배포됩니다

## 🛠️ 로컬 개발

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm start
```

## 📁 프로젝트 구조

```
.
├── src/              # 소스 코드
│   ├── app/         # Next.js App Router
│   └── components/  # React 컴포넌트
├── public/          # 정적 파일
├── docs/            # 문서
└── rules/           # 프로젝트 규칙 및 설정
```

## 🔧 설정 파일

- `next.config.mjs` - Next.js 설정
- `.wranglerignore` - Cloudflare Pages 배포 제외 목록
- `.gitignore` - Git 제외 목록

## 📝 라이선스

MIT
