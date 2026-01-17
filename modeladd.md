좋아, 이제 **“Model 추가(Add Model) 페이지에 뭘 입력하게 만들지”**를 딱 정리해볼게.
VQGAN 같은 이미지 압축/복원 모델 기준으로, **MVP 필수 항목 + 있으면 좋은 고급 항목**으로 나눠줄게.

---

## 1. MVP 기준 “필수” 입력 항목

### 🔹 (섹션 1) 기본 정보

1. **Model Name (표시 이름)**

   * 예: `VQGAN ImageNet f=16, 1024`
   * UI 라벨: `Model Name`
   * 용도: 리더보드/리스트에서 사람 눈에 보이는 이름.

2. **Model ID (Slug / Unique ID)**

   * 예: `vqgan_imagenet_f16_1024`
   * UI 라벨: `Model ID`
   * 특징: 영문+숫자+밑줄, 공백 없이.
   * 용도: 내부 식별자, API/DB key.
   * 💡 UX 팁: Model Name 입력하면 자동 추천으로 생성되게 해두고, 원하면 수정 가능하게.

3. **Task Type (모델 타입 / 태스크)**

   * UI 라벨: `Task Type`
   * 예시 옵션:

     * `Image Compression`
     * `Generative Reconstruction`
     * `Retrieval / Embedding` (나중 확장용)
   * 용도: 어떤 벤치마크/지표 세트를 붙일지 결정.

4. **Framework**

   * UI 라벨: `Framework`
   * 옵션: `PyTorch`, `TensorFlow`, `JAX`, `Other`
   * 용도: 실행 환경/런타임 선택할 때 필요.

---

### 🔹 (섹션 2) 코드 & 체크포인트 정보

5. **Repository Type**

   * UI 라벨: `Repository Type`
   * 옵션:

     * `GitHub`
     * `Hugging Face`
     * `Local / Custom`
   * 선택에 따라 아래 입력 필드가 조금 달라짐.

6. **Repository URL / ID**

   * UI 라벨: `Repository URL (or HF ID)`
   * 예:

     * GitHub: `https://github.com/CompVis/taming-transformers`
     * Hugging Face: `CompVis/vqgan-imagenet-f16-1024`
   * 용도: 코드 어디 있는지.

7. **Checkpoint Path / Upload**

   * UI 라벨:

     * `Checkpoint Source`

       * 옵션: `Upload file` / `Path on server` / `Hugging Face file`
     * `Checkpoint Path or File`
   * 예:

     * `/models/vqgan_imagenet_f16_1024.ckpt`
   * 용도: 학습된 weight 로딩.

8. **Python Class Path (Wrapper Class)**

   * UI 라벨: `Model Class Path`
   * 예:

     * `benchmark.models.vqgan_imagenet_f16_1024.VQGANImagenetF16`
   * 용도: 백엔드가 `import` 해서 인스턴스 생성할 때 사용.
   * 👉 이걸로 플랫폼이 `BaseCompressionModel` 상속한 래퍼를 찾아 감.

---

### 🔹 (섹션 3) 입·출력/인터페이스 설정

9. **Input Resolution**

   * UI 라벨: `Input Resolution`
   * 형식:

     * `Size Type`: `Fixed` / `Variable`
     * `Default Size`: `256 x 256`
   * 용도: 벤치마크 데이터셋 리사이즈 기준.

10. **Input / Output Range**

* UI 라벨:

  * `Input Range` (예: `[0, 1]`, `[-1, 1]`)
  * `Output Range` (예: `[0, 1]`)
* 용도: 평가 파이프라인에서 정규화/복원 처리 맞추기.

11. **Interface Type (지원 메서드)**

* UI 라벨: `Supported Interface`
* 체크박스:

  * `[x] reconstruct(x)  # 필수`
  * `[ ] encode(x)`
  * `[ ] decode(z)`
  * `[ ] compress(x) / decompress(...)` (있으면)
* 용도: 벤치마크가 어떤 메서드를 써야 할지 결정.

---

### 🔹 (섹션 4) 기본 평가 설정

12. **Default Benchmarks**

* UI 라벨: `Default Benchmarks`
* 타입: 멀티 셀렉트
* 예:

  * `Image Compression - Kodak24`
  * `Image Compression - CIFAR10`
* 용도: “이 모델 평가하기” 눌렀을 때 기본으로 묶어둘 벤치마크.

13. **Default Metrics (옵션이지만 추천)**

* UI 라벨: `Default Metrics`
* 멀티 셀렉트:

  * `PSNR`
  * `SSIM`
  * `LPIPS`
  * `bpp`
* 용도: 리더보드/리포트에서 어떤 지표를 기본으로 보여줄지.

---

### 🔹 (섹션 5) 소유 / 노출 설정

14. **Owner**

* UI 라벨: `Owner`
* 값: 현재 로그인 유저 (자동)
* 용도: My Models 필터, 권한 관리.

15. **Visibility (공개 범위)**

* UI 라벨: `Visibility`
* 옵션:

  * `Private` (나만 보기)
  * `Organization`
  * `Public (Leaderboard 노출)`
* 용도: 리더보드/공개 페이지 노출 여부.

16. **License & Citation**

* UI 라벨:

  * `License`
  * `Citation / Paper Link`
* 예:

  * License: `MIT`, `Apache-2.0`, `CC-BY-4.0` 등
  * Citation: 논문 BibTex나 arXiv 링크
* 용도: 법적/레퍼런스 표기.

---

## 2. “있으면 좋은” 고급 옵션들

이건 MVP에서 안 만들어도 되지만, 나중에 확장용으로 설계해두기 좋은 항목들.

### 💡 고급 옵션 예시

* **Max Batch Size**

  * UI: `Max Batch Size`
  * 예: `8`
  * 용도: Job 스케줄링할 때 OOM 방지.

* **Codebook Size / Latent Dim / Downsample Factor**

  * UI: `Model Attributes`
  * 예:

    * `Codebook Size: 1024`
    * `Downsample Factor: 16`
  * 용도: 리더보드/툴팁에서 “이 모델 구조” 설명용.

* **Runtime Device Preference**

  * UI: `Preferred Device`
  * 옵션:

    * `GPU only`
    * `CPU allowed`
  * 용도: 워커 스케줄링 정책.

* **Tags**

  * UI: `Tags`
  * 예: `VQGAN`, `ImageNet`, `High-Quality`, `Fast`
  * 용도: 모델 리스트에서 검색/필터.

---

## 3. 한 번에 보는 “모델 추가 폼 구조” 요약

폼 레이아웃을 이렇게 잡으면 좋아:

1. **섹션: Basic Info**

   * Model Name
   * Model ID
   * Task Type
   * Framework

2. **섹션: Code & Checkpoint**

   * Repository Type
   * Repository URL / ID
   * Checkpoint Source + Path/File
   * Model Class Path

3. **섹션: IO & Interface**

   * Input Resolution
   * Input Range / Output Range
   * Supported Interface (reconstruct / encode / decode)

4. **섹션: Evaluation Defaults**

   * Default Benchmarks
   * Default Metrics

5. **섹션: Ownership & Visibility**

   * Owner (readonly)
   * Visibility
   * License / Citation
   * Tags (옵션)

---

원하면 다음 단계로는:

* **실제 Next.js + React 폼 컴포넌트 구조 (예: `ModelCreateForm.tsx`)**
* 또는 **백엔드에서 받는 JSON 스키마 예시** (예: `/api/models` POST payload)

까지 바로 코드로 풀어줄게.
