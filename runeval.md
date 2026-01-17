지금 상태는 **“모델은 등록됐는데, 아직 아무 벤치마크도 안 돌린 상태”**라서
당연히 성과지표(PSNR/SSIM/LPIPS 등)가 없어요.

> 👉 정리하면
> **1) 모델을 등록**하고
> **2) 벤치마크를 실행해서 결과를 DB에 저장**한 다음
> **3) 그 DB값을 Model 페이지/Leaderboard에서 읽어서 보여줘야** 해요.

아래를 그대로 구현하면 “등록한 모델 성과지표 나오는” 흐름이 생깁니다.

---

## 1. 데이터 구조부터 간단히 잡기

최소한 이 3개 테이블(또는 컬렉션)이 있어야 해요:

1. **models**

   * `id` (예: `vqgan_imagenet_f16_1024`)
   * `name`
   * 기타 메타데이터…

2. **runs** (실험/평가 1회)

   * `id`
   * `model_id`
   * `benchmark_id`  (예: `image_compression_kodak24`)
   * `status` (`pending | running | done | failed`)
   * `started_at`, `finished_at`

3. **run_metrics**

   * `id`
   * `run_id`
   * `metric_name`  (예: `psnr`, `ssim`, `lpips`)
   * `value`        (float)
   * `split` (옵션: `val`, `test` 등)

> 나중에 Leaderboard는
> `run_metrics`에서 최신/베스트 값을 뽑아서 정렬하면 됩니다.

---

## 2. “평가 실행” 파이프라인 한 번만 만들면 됨

모델 등록만으로는 지표가 생기지 않으니까,
**Run/Evaluate API**를 하나 만들고 거기서:

1. 모델 wrapper 로드
2. 데이터셋 로드
3. 전체 이미지에 대해 `reconstruct(x)` 호출
4. PSNR/SSIM/LPIPS 계산
5. `run_metrics`에 저장

같이 돌리면 돼요.

### 예시: Python pseudo-code

```python
def evaluate_model_on_benchmark(model_id: str, benchmark_id: str, run_id: str):
    # 1) 모델/벤치마크 설정 로드
    model_cfg = load_model_config(model_id)         # models 테이블 or yaml
    bm_cfg    = load_benchmark_config(benchmark_id) # 어떤 데이터셋, 어떤 지표 쓸지

    # 2) 모델 인스턴스 생성
    ModelCls = import_string(model_cfg["class_path"])
    model = ModelCls(ckpt_path=model_cfg["ckpt_path"], device="cuda")

    # 3) 데이터셋 로드
    dataset = load_dataset(bm_cfg["dataset_id"])   # 예: Kodak24

    all_psnr, all_ssim, all_lpips = [], [], []

    for x in dataset:  # x: (1, 3, H, W) tensor라고 가정
        x_hat = model.reconstruct(x)  # VQGAN wrapper에서 구현

        all_psnr.append(psnr(x, x_hat))
        all_ssim.append(ssim(x, x_hat))
        all_lpips.append(lpips(x, x_hat))

    # 4) 평균 지표 계산
    mean_psnr  = float(np.mean(all_psnr))
    mean_ssim  = float(np.mean(all_ssim))
    mean_lpips = float(np.mean(all_lpips))

    # 5) run_metrics 테이블에 저장
    save_metric(run_id, "psnr",  mean_psnr)
    save_metric(run_id, "ssim",  mean_ssim)
    save_metric(run_id, "lpips", mean_lpips)
```

이 함수가 한 번만 제대로 돌아가면,
**어떤 모델이든/어떤 벤치마크든** 같은 방식으로 지표만 쌓을 수 있어요.

---

## 3. Model 상세 페이지에서 어떻게 보여주나?

`/models/{model_id}` 페이지를 열 때 백엔드에서:

1. `models`에서 해당 모델 찾고
2. `runs` 중에서 `status="done"`이고 `benchmark_id in 기본_벤치마크_리스트` 인 것들 중

   * 가장 최근 run 하나(또는 여러 개)를 가져오고
3. 그 run의 `run_metrics`를 조회해서 반환

### 예시 API

```ts
// GET /api/models/{model_id}/summary
{
  "model": { "id": "vqgan_imagenet_f16_1024", "name": "VQGAN ImageNet f=16,1024" },
  "latest_runs": [
    {
      "benchmark_id": "image_compression_kodak24",
      "metrics": {
        "psnr": 37.8,
        "ssim": 0.972,
        "lpips": 0.115,
        "bpp": 0.35
      }
    }
  ]
}
```

프론트에서는 이걸 받아서:

* 카드 UI로

  * **Kodak24**

    * PSNR: 37.8 dB
    * SSIM: 0.972
    * LPIPS: 0.115
    * bpp: 0.35

이런 식으로 그려주면 됩니다.

---

## 4. Leaderboard와 연결

Leaderboard 페이지는 단순히:

* 특정 `benchmark_id` 지정 후
* `runs` + `run_metrics`에서
  `benchmark_id = X` 이고, metric_name = `psnr` (또는 선택한 기준)인 값들을
* 모델별로 묶어서 정렬

하면 돼요.

예시 쿼리 느낌:

```sql
SELECT
  m.id as model_id,
  m.name as model_name,
  rm.value as psnr
FROM run_metrics rm
JOIN runs r   ON rm.run_id = r.id
JOIN models m ON r.model_id = m.id
WHERE r.benchmark_id = 'image_compression_kodak24'
  AND rm.metric_name = 'psnr'
ORDER BY rm.value DESC;
```

그 결과를 테이블/레이더 차트에 매핑하면 바로 리더보드가 됩니다.

---

## 5. 한 줄 요약

> **모델 등록만으로는 지표가 안 생기고,
> “Run(평가)”를 돌리고 → DB에 지표를 저장하고 → 그걸 Model/Leaderboard 화면에서 조회해서 뿌려야 한다.**

그래서 해야 할 것:

1. `runs`, `run_metrics` 같은 결과 저장 구조 만들기
2. `evaluate_model_on_benchmark(model_id, benchmark_id)` 같은 공통 평가 함수 만들기
3. Model 상세 / Leaderboard 페이지에서 이 결과를 불러와서 표시하기

원하면 다음으로

* **실제 DB 스키마(SQL) 예시**나
* **Next.js API 라우트 (`POST /api/runs`, `GET /api/models/{id}/summary`) 코드**
  까지 그대로 쓸 수 있게 짜줄게.
