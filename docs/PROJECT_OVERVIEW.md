# Vision Arena 프로젝트 개요

## 3. 해결하고자 했던 문제 (Problem Definition)

AI 기술 트렌드가 웨어러블, 스마트글래스 등으로 이동하면서 멀티모달의 중요성이 강조되며 LLM 모델 등 AI 모델의 양자화(Quantization)가 예상되었습니다. 이에 따라 SCQ(고속 압축 기반 실시간 AI 비전 엔진), VQGAN(생성형 텍스처 압축 플랫폼), Soft-to-Hard(경량화된 온디바이스 임베딩 압축 기술), VQ Clustering(위성 영상 기반 변화 탐지 시스템), Progressive Quantization(검색엔진용 이미지 임베딩 최적화 기술), LVQAC(공간적 디테일 보존형 이미지 압축 솔루션) 등의 양자화 및 압축 기술을 연구하였고, 동시에 이러한 모델들의 성능을 비교하고 평가할 수 있는 표준화된 벤치마크 플랫폼의 필요성을 예상했습니다. Vision Arena는 이러한 문제를 해결하기 위해 MVP로 가장 접근하기 쉬운 VQGAN 모델부터 시작하여, 연구자와 개발자들이 양자화 모델의 성능을 쉽고 정확하게 비교할 수 있는 통합 평가 플랫폼을 제공합니다.

## 4. 서비스 소개 및 주요 기능 (Solution)

Vision Arena는 VQGAN 모델의 성능을 평가하고 비교할 수 있는 웹 기반 통합 플랫폼입니다. 사용자는 다양한 카테고리(Text, Vision, Text-to-Image 등)별로 모델 리더보드를 확인하고, 등록된 모델들의 성능 지표를 다각도로 분석할 수 있습니다.

**핵심 사용자 흐름:**

1. **리더보드 탐색**: 메인 페이지에서 전체 또는 카테고리별 리더보드를 확인하며 모델들의 성능 순위와 지표를 비교합니다.

2. **성능 시각화**: 레이더 차트와 다중 성능 차트(Overall Performance Score, Performance Distribution, Model Comparison Matrix, Metric Correlation)를 통해 모델의 강점과 약점을 직관적으로 파악합니다.

3. **모델 등록 및 평가**: 새 모델을 등록하고 벤치마크 데이터셋(Kodak24, CIFAR10, CLIC)을 선택하여 평가 작업을 실행합니다. 평가 결과는 화질 지표(PSNR, SSIM, LPIPS, FID), 압축 지표(압축률, bpp), 속도 지표(인코딩/디코딩 시간, FPS), 내부 지표(Perplexity)로 구성됩니다.

4. **관리자 기능**: 관리자는 사용자와 모델을 관리하고, 시스템 설정을 조정하며, 평가 로그를 모니터링할 수 있습니다.

플랫폼은 클라이언트 측 상태 관리와 로컬 스토리지를 활용하여 빠른 성능과 사용자 친화적인 경험을 제공합니다.

## 5. 활용한 핵심 기술 및 AI 모델 (Tech Stack)

### 프론트엔드
- **Next.js 14.2.3**: App Router 기반 서버 사이드 렌더링 및 정적 사이트 생성
- **React 18**: 사용자 인터페이스 구축
- **TypeScript 5**: 타입 안전성 보장

### 데이터 시각화
- **Plotly.js 3.3.0**: 고급 인터랙티브 차트(3D 시각화, 상관관계 분석 등)
- **React-Plotly.js 2.6.0**: React와 Plotly.js 통합
- **Recharts 3.5.1**: 성능 최적화된 React 차트 라이브러리(레이더 차트, 바 차트 등)

### 데이터 테이블 및 UI
- **TanStack Table (React Table) 8.21.3**: 고성능 테이블 컴포넌트(정렬, 필터링, 페이지네이션, 컬럼 표시/숨김)
- **Lucide React 0.555.0**: 아이콘 라이브러리

### 배포 및 호스팅
- **Cloudflare Pages**: 정적 사이트 호스팅 및 글로벌 CDN 배포
- **Wrangler 4.59.2**: Cloudflare Pages 배포 도구

### 평가 대상 AI 모델
- **VQGAN (Vector Quantized Generative Adversarial Network)**: 이미지 생성 및 압축 모델
- 평가 카테고리: Text, WebDev, Vision, Text-to-Image, Image Edit, Search, Text-to-Video, Image-to-Video

### 평가 지표
- **화질 지표**: PSNR (Peak Signal-to-Noise Ratio), SSIM (Structural Similarity Index), LPIPS (Learned Perceptual Image Patch Similarity), FID (Fréchet Inception Distance)
- **압축 지표**: 압축률, bpp (bits per pixel)
- **속도 지표**: 인코딩 시간, 디코딩 시간, FPS (Frames Per Second)
- **내부 지표**: Perplexity

### 벤치마크 데이터셋
- Kodak24
- CIFAR10
- CLIC

## 6. 기술적 챌린지 및 해결 과정

### 주요 기술적 난관: 다차원 성능 지표의 통합 시각화 및 정규화

Vision Arena 개발 과정에서 가장 큰 기술적 도전은 서로 다른 스케일과 특성을 가진 다차원 성능 지표(화질, 압축률, 속도, 내부 지표)를 일관되게 비교하고 시각화하는 것이었습니다. 예를 들어, PSNR은 값이 클수록 좋지만(0-50 범위), LPIPS와 FID는 값이 작을수록 좋고(0-1, 0-100 범위), FPS는 완전히 다른 스케일을 가집니다.

**해결 과정:**

1. **지표별 정규화 알고리즘 개발**: 각 지표의 특성(최대값이 좋은지, 최소값이 좋은지)을 고려한 역방향 정규화 함수를 구현했습니다. Recharts 기반 레이더 차트에서 0-100 스케일로 정규화하여 모든 지표를 동등한 기준으로 비교할 수 있도록 했습니다.

2. **다중 시각화 전략**: 단일 차트만으로는 부족하다고 판단하여, 레이더 차트(다차원 비교), 바 차트(지표별 분포), 히트맵(모델 간 상관관계), 상관관계 산점도(지표 간 관계) 등 다양한 시각화 방식을 구현했습니다. Plotly.js를 활용해 인터랙티브한 3D 시각화와 드릴다운 기능을 추가하여 사용자가 원하는 관점에서 데이터를 분석할 수 있도록 했습니다.

3. **동적 정규화 범위 계산**: 전체 데이터셋의 최솟값과 최댓값을 기반으로 동적으로 정규화 범위를 계산하여, 새로운 모델이 추가되어도 자동으로 적절한 스케일로 표시되도록 구현했습니다.

4. **성능 최적화**: TanStack Table의 가상화 기능과 React.memo를 활용하여 대량의 모델 데이터를 처리할 때도 부드러운 사용자 경험을 제공하도록 최적화했습니다.

이러한 기술적 접근을 통해 단순한 API 연동을 넘어선, 사용자가 복잡한 다차원 데이터를 직관적으로 이해하고 의사결정을 내릴 수 있는 고도의 데이터 시각화 플랫폼을 구축했습니다.

