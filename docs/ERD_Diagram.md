# ERD 시각화 다이어그램

## 1. 전체 ERD 다이어그램

```mermaid
erDiagram
    User ||--o{ Model : "등록"
    User ||--o{ Run : "실행"
    User ||--o{ Log : "생성"
    User ||--o{ SystemSetting : "수정"
    Model ||--o{ ModelMetric : "포함"
    Model ||--o{ Run : "평가"
    Model }o--|| Category : "분류"
    Run ||--o{ RunMetric : "포함"

    User {
        string id PK "UUID"
        string email UK "이메일"
        string username "사용자명"
        string password_hash "비밀번호 해시"
        string role "역할 (user/admin)"
        boolean is_active "활성화 여부"
        datetime created_at "생성일시"
        datetime updated_at "수정일시"
        datetime last_login "마지막 로그인"
    }

    Model {
        string id PK "UUID"
        string user_id FK "등록자"
        string category_id FK "카테고리"
        string model_name UK "모델명"
        string model_version "모델 버전"
        string description "설명"
        string status "상태 (pending/approved/rejected)"
        string model_path "모델 파일 경로"
        datetime created_at "생성일시"
        datetime updated_at "수정일시"
        datetime approved_at "승인일시"
        string approved_by FK "승인자"
    }

    ModelMetric {
        string id PK "UUID"
        string model_id FK "모델 ID"
        float psnr "PSNR (dB)"
        float ssim "SSIM (0-1)"
        float lpips "LPIPS"
        float fid "FID"
        float compression_ratio "압축률"
        float bpp "bits per pixel"
        float encoding_time "인코딩 시간 (ms)"
        float decoding_time "디코딩 시간 (ms)"
        float fps "FPS"
        float perplexity "Perplexity"
        datetime measured_at "측정일시"
        string test_dataset "테스트 데이터셋"
    }

    Category {
        string id PK "UUID"
        string name UK "카테고리명"
        string description "설명"
        int display_order "표시 순서"
        datetime created_at "생성일시"
    }

    Run {
        string id PK "UUID"
        string user_id FK "실행자"
        string model_id FK "평가 모델"
        string status "상태 (pending/running/completed/failed)"
        json config_json "실행 설정"
        datetime started_at "시작일시"
        datetime completed_at "완료일시"
        float duration "실행 시간 (초)"
        string error_message "에러 메시지"
    }

    RunMetric {
        string id PK "UUID"
        string run_id FK "실행 ID"
        string metric_name "지표명"
        float metric_value "지표 값"
        string unit "단위"
        datetime measured_at "측정일시"
    }

    Log {
        string id PK "UUID"
        string user_id FK "사용자"
        string action_type "액션 타입"
        string resource_type "리소스 타입"
        string resource_id "리소스 ID"
        json details_json "상세 정보"
        string ip_address "IP 주소"
        datetime created_at "생성일시"
    }

    SystemSetting {
        string id PK "UUID"
        string key UK "설정 키"
        string value "설정 값"
        string type "값 타입"
        string description "설명"
        datetime updated_at "수정일시"
        string updated_by FK "수정자"
    }
```

## 2. 핵심 엔티티 관계도

```mermaid
graph TB
    User[User<br/>사용자]
    Model[Model<br/>모델]
    ModelMetric[ModelMetric<br/>모델 성능 지표]
    Category[Category<br/>카테고리]
    Run[Run<br/>평가 실행]
    RunMetric[RunMetric<br/>실행 지표]
    Log[Log<br/>시스템 로그]
    SystemSetting[SystemSetting<br/>시스템 설정]

    User -->|등록| Model
    User -->|실행| Run
    User -->|생성| Log
    User -->|수정| SystemSetting
    
    Model -->|포함| ModelMetric
    Model -->|평가| Run
    Category -->|분류| Model
    
    Run -->|포함| RunMetric
```

## 3. 데이터 흐름도

```mermaid
flowchart LR
    A[사용자 등록] --> B[모델 등록]
    B --> C[성능 지표 입력]
    C --> D[모델 승인]
    D --> E[리더보드 표시]
    
    F[사용자 로그인] --> G[평가 실행]
    G --> H[실행 지표 생성]
    H --> I[결과 저장]
    
    J[관리자] --> K[모델 관리]
    J --> L[사용자 관리]
    J --> M[시스템 설정]
    
    N[시스템 활동] --> O[로그 기록]
```

## 4. 주요 관계 상세

### 4.1 User - Model 관계
```
User (1) ──────< 등록 >────── (N) Model
```
- 한 사용자는 여러 모델을 등록할 수 있음
- 모델은 반드시 한 사용자에 속함

### 4.2 Model - ModelMetric 관계
```
Model (1) ──────< 포함 >────── (N) ModelMetric
```
- 한 모델은 여러 성능 지표를 가질 수 있음
- 버전별, 데이터셋별로 다른 지표 저장 가능

### 4.3 Model - Run 관계
```
Model (1) ──────< 평가 >────── (N) Run
```
- 한 모델은 여러 평가 실행을 가질 수 있음
- 평가 실행은 반드시 한 모델에 속함

### 4.4 Run - RunMetric 관계
```
Run (1) ──────< 포함 >────── (N) RunMetric
```
- 한 평가 실행은 여러 지표를 생성할 수 있음
- 실행 결과 지표 저장

## 5. 엔티티 카디널리티

| 관계 | 카디널리티 | 설명 |
|------|-----------|------|
| User - Model | 1:N | 한 사용자당 여러 모델 |
| User - Run | 1:N | 한 사용자당 여러 평가 실행 |
| User - Log | 1:N | 한 사용자당 여러 로그 |
| Model - ModelMetric | 1:N | 한 모델당 여러 성능 지표 |
| Model - Run | 1:N | 한 모델당 여러 평가 실행 |
| Category - Model | 1:N | 한 카테고리당 여러 모델 |
| Run - RunMetric | 1:N | 한 실행당 여러 지표 |

## 6. 샘플 데이터 예시

### User
```json
{
  "id": "user-001",
  "email": "researcher@example.com",
  "username": "researcher",
  "role": "user",
  "is_active": true,
  "created_at": "2024-01-01T00:00:00Z"
}
```

### Model
```json
{
  "id": "model-001",
  "user_id": "user-001",
  "category_id": "cat-001",
  "model_name": "VQGAN-256",
  "status": "approved",
  "created_at": "2024-01-02T00:00:00Z"
}
```

### ModelMetric
```json
{
  "id": "metric-001",
  "model_id": "model-001",
  "psnr": 32.5,
  "ssim": 0.92,
  "lpips": 0.08,
  "compression_ratio": 12.5,
  "fps": 25,
  "measured_at": "2024-01-02T10:00:00Z"
}
```




