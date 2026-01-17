# Vision Arena

Next.js 기반 모델 리더보드 및 평가 시스템

## 📋 프로젝트 정보

이 프로젝트는 AI 모델의 성능을 평가하고 리더보드를 제공하는 웹 애플리케이션입니다.

## 🚀 배포 (Cloudflare Pages)

### 배포 설정

Cloudflare Pages Dashboard에서 다음 설정을 사용하세요:

- **Framework preset**: Next.js
- **Build command**: `npm run build`
- **Deploy command**: (비워두기 - Cloudflare Pages가 자동으로 처리)
- **Build output directory**: (비워두기 또는 `.next`)
- **Root directory**: (비워두기)

### 중요 사항

⚠️ **Deploy command를 비워두세요!** Cloudflare Pages는 Next.js를 자동으로 감지하므로 `wrangler deploy` 같은 명령어는 필요 없습니다.

### 배포 프로세스

1. GitHub에 푸시하면 자동으로 배포됩니다
2. 빌드는 자동으로 실행됩니다 (`npm run build`)
3. `.next` 디렉토리가 자동으로 감지되어 배포됩니다

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
