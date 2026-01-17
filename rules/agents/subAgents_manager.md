# SubAgents Manager

## 개요
서브에이전트 매니저는 프로젝트의 다양한 작업 요구사항에 따라 적절한 전문 에이전트를 자동으로 선택하고 조율하는 중앙 관리 시스템입니다.

## 핵심 역할
- **에이전트 선택**: 작업 유형과 복잡도에 따라 최적의 에이전트 자동 선택
- **작업 분배**: 복합 작업을 여러 에이전트로 분할하여 효율적 처리
- **품질 관리**: 각 에이전트의 출력을 검증하고 통합
- **워크플로우 최적화**: 에이전트 간 협업을 통한 최적의 결과 도출

## 에이전트 선택 매트릭스

### 📋 **분석 및 설계 단계**

| 작업 유형 | 1차 에이전트 | 2차 에이전트 | MCP 도구 | 트리거 키워드 |
|-----------|-------------|-------------|----------|---------------|
| 요구사항 분석 | `requirements-analyst` | `system-architect` | `memory`, `sequential-thinking-tools` | "요구사항", "분석", "명세서", "PRD" |
| 시스템 설계 | `system-architect` | `database-architect` | `memory`, `task-master-ai` | "아키텍처", "설계", "구조", "시스템" |
| 데이터베이스 설계 | `database-architect` | `system-architect` | `supabase`, `memory` | "데이터베이스", "스키마", "ERD", "테이블" |

### 💻 **개발 및 구현 단계**

| 작업 유형 | 1차 에이전트 | 2차 에이전트 | MCP 도구 | 트리거 키워드 |
|-----------|-------------|-------------|----------|---------------|
| 프론트엔드 개발 | `frontend-scaffold-generator` | `senior-code-reviewer` | `playwright`, `chrome-devtools`, `figma-api` | "React", "Next.js", "UI", "컴포넌트", "프론트엔드" |
| 백엔드 개발 | `backend-code-generator` | `database-architect` | `supabase`, `memory` | "API", "서버", "백엔드", "REST", "GraphQL" |
| Python 개발 | `python-expert` | `verification-agent` | `memory`, `sequential-thinking-tools` | "Python", "Django", "FastAPI", "Flask" |
| GitHub 코드 검색 | `github-search-apply` | `senior-code-reviewer` | `github`, `memory` | "GitHub", "검색", "참고", "라이브러리" |
| 외부 라이브러리 검색 | `library-search-agent` | `senior-code-reviewer` | `web_search`, `memory` | "라이브러리", "패키지", "의존성", "NPM", "PyPI" |
| UI 컴포넌트 검색 | `component-finder-agent` | `frontend-scaffold-generator` | `web_search`, `memory` | "컴포넌트", "UI", "템플릿", "디자인시스템" |
| 종합 솔루션 연구 | `solution-research-agent` | `system-architect` | `web_search`, `memory` | "아키텍처", "패턴", "베스트프랙티스", "솔루션" |
| UI/UX 검증 및 개선 | `ui-ux-validator-agent` | `frontend-scaffold-generator` | `playwright`, `chrome-devtools`, `figma-api` | "UI", "UX", "가독성", "접근성", "디자인", "사용성" |
| 서버 관리 및 모니터링 | `server-management-agent` | `environment-setup-agent` | `memory`, `filesystem` | "서버", "포트", "프로세스", "모니터링", "성능" |
| 데이터베이스 연결 체크 | `database-connection-agent` | `database-architect` | `supabase`, `memory` | "데이터베이스", "연결", "데이터", "쿼리", "성능" |
| 프롬프트 추천 및 최적화 | `prompt-recommendation-agent` | `general-purpose` | `memory`, `sequential-thinking-tools` | "프롬프트", "추천", "최적화", "에이전트선택" |
| 자동 학습 및 지식 관리 | `learning-coordinator-agent` | `memory` | `memory`, `task-master-ai` | "학습", "지식", "패턴", "개선", "최적화" |
| 머신러닝 모델 추천 | `machine-learning-agent` | `python-expert` | `memory`, `sequential-thinking-tools` | "머신러닝", "ML", "모델", "알고리즘", "데이터분석" |
| 딥러닝 모델 추천 | `deep-learning-agent` | `python-expert` | `memory`, `sequential-thinking-tools` | "딥러닝", "DL", "신경망", "AI", "컴퓨터비전", "NLP" |
| 데이터 분석 및 통계 | `data-analysis-agent` | `python-expert` | `memory`, `sequential-thinking-tools` | "데이터분석", "통계", "시각화", "인사이트", "패턴" |
| 논문 분석 및 기술전환 | `research-paper-agent` | `python-expert` | `memory`, `sequential-thinking-tools` | "논문", "연구", "기술전환", "특허", "상용화" |
| 로컬 웹뷰 EXE 생성 | `local-webview-exe-agent` | `python-expert` | `memory`, `sequential-thinking-tools` | "EXE", "웹뷰", "로컬", "패키징", "데스크톱" |
| Unity/Unreal 게임 개발 | `unity-unreal-agent` | `python-expert` | `memory`, `sequential-thinking-tools` | "Unity", "Unreal", "게임", "3D", "시뮬레이션" |
| VR/AR 소프트웨어 개발 | `vr-ar-development-agent` | `python-expert` | `memory`, `sequential-thinking-tools` | "VR", "AR", "가상현실", "증강현실", "몰입형" |
| WebXR AI 통합 개발 | `webxr-ai-integration-agent` | `python-expert` | `memory`, `sequential-thinking-tools` | "WebXR", "AI", "시선추적", "AR오버레이", "Quest", "HoloLens" |
| API 개발 및 연동 | `api-development-integration-agent` | `backend-code-generator` | `memory`, `sequential-thinking-tools` | "API", "RESTful", "GraphQL", "연동", "인증", "외부서비스" |
| RAG 시스템 개발 | `rag-development-agent` | `python-expert` | `memory`, `sequential-thinking-tools` | "RAG", "벡터DB", "임베딩", "검색", "지식베이스" |
| 청킹 시스템 개발 | `chunk-development-agent` | `python-expert` | `memory`, `sequential-thinking-tools` | "청킹", "문서분할", "텍스트분할", "의미적분할" |
| 시뮬레이션 개발 | `simulation-development-agent` | `python-expert` | `memory`, `sequential-thinking-tools` | "시뮬레이션", "모델링", "물리엔진", "가상테스트" |
| MLOps 개발 | `mlops-development-agent` | `python-expert` | `memory`, `sequential-thinking-tools` | "MLOps", "ML파이프라인", "모델배포", "ML인프라" |
| LLMOps 개발 | `llmops-development-agent` | `python-expert` | `memory`, `sequential-thinking-tools` | "LLMOps", "LLM배포", "프롬프트엔지니어링", "AI모델관리" |
| 브라우저 화면 분석 | `browser-analysis-agent` | `ui-ux-validator-agent` | `chrome-devtools`, `memory` | "브라우저", "화면분석", "UI분석", "웹성능" |
| 이미지 분석 | `image-analysis-agent` | `ui-ux-validator-agent` | `memory`, `sequential-thinking-tools` | "이미지분석", "스크린샷", "OCR", "시각적분석" |
| 개발 히스토리 관리 | `development-history-agent` | `learning-coordinator-agent` | `memory`, `sequential-thinking-tools` | "개발히스토리", "코드변경", "프로젝트진화", "개발패턴" |
| 버그 학습 시스템 | `bug-learning-agent` | `learning-coordinator-agent` | `memory`, `sequential-thinking-tools` | "버그학습", "오류분석", "자기반성", "품질개선" |
| OCR 분석 및 인식 | `ocr-analysis-agent` | `python-expert` | `memory`, `sequential-thinking-tools` | "OCR", "문자인식", "PDF분석", "텍스트추출" |
| 레이아웃 분석 및 구조 | `layout-analytics-agent` | `python-expert` | `memory`, `sequential-thinking-tools` | "레이아웃", "구조분석", "문서구조", "요소분석" |
| 임베디드 벡터화 | `embedded-vectorization-agent` | `python-expert` | `memory`, `sequential-thinking-tools` | "벡터화", "임베딩", "벡터DB", "의미적표현" |
| 지식 관리 및 활용 | `knowledge-management-agent` | `memory` | `memory`, `task-master-ai` | "지식관리", "KMS", "지식베이스", "정보활용" |
| 맥락 인식 처리 | `context-aware-agent` | `python-expert` | `memory`, `sequential-thinking-tools` | "맥락인식", "컨텍스트", "상황인식", "의미이해" |
| 이미지 생성 모델 | `image-generation-agent` | `python-expert` | `memory`, `sequential-thinking-tools` | "이미지생성", "AI이미지", "생성모델", "Diffusion" |
| 코드 안전 번역 | `code-safe-translation-agent` | `general-purpose` | `memory`, `sequential-thinking-tools` | "번역", "한글화", "로컬라이제이션", "UI번역" |
| PRD/ERD/DRD 관리 | `prd-erd-drd-management-agent` | `system-architect` | `memory`, `task-master-ai` | "PRD", "ERD", "DRD", "문서관리", "설계문서" |
| TASK 관리 및 순차개발 | `task-management-agent` | `learning-coordinator-agent` | `memory`, `task-master-ai` | "TASK", "작업관리", "순차개발", "계획", "메모리" |
| 관리자 시스템 구축 | `admin-management-agent` | `backend-code-generator` | `memory`, `supabase` | "관리자", "어드민", "권한관리", "시스템관리" |
| 회원관리 시스템 구축 | `member-management-agent` | `backend-code-generator` | `memory`, `supabase` | "회원관리", "사용자관리", "멤버십", "인증" |
| LLM API KEY 관리 | `llm-api-key-management-agent` | `tool-configuration-agent` | `memory`, `filesystem` | "API키", "LLM", "인증", "연결", "활성화" |
| 개발형상유지 | `development-maintenance-agent` | `senior-code-reviewer` | `memory`, `filesystem` | "형상유지", "코드재사용", "파일최소화", "유지보수" |
| 의존성 설치 및 환경통일 | `dependency-install-agent` | `environment-setup-agent` | `memory`, `filesystem` | "의존성", "설치", "환경통일", "패키지관리" |
| 로그저장 및 관리 | `log-storage-agent` | `debugging-agent` | `memory`, `filesystem` | "로그", "저장", "버그추적", "문제해결" |
| 시계열 예측분석 | `time-series-prediction-agent` | `python-expert` | `memory`, `sequential-thinking-tools` | "시계열", "예측", "분석", "모델", "트렌드" |
| NLP 자연어처리 | `nlp-agent` | `python-expert` | `memory`, `sequential-thinking-tools` | "NLP", "자연어처리", "텍스트분석", "언어모델" |
| 토크나이저 | `tokenizer-agent` | `python-expert` | `memory`, `sequential-thinking-tools` | "토크나이저", "토큰화", "텍스트분할", "전처리" |
| 데이터메시 아키텍처 | `data-mesh-agent` | `system-architect` | `memory`, `task-master-ai` | "데이터메시", "분산데이터", "마이크로서비스", "데이터거버넌스" |
| SDK 분석 및 연결 | `sdk-analysis-agent` | `python-expert` | `memory`, `sequential-thinking-tools` | "SDK", "분석", "연결", "통합", "라이브러리" |
| 허깅페이스 모델 벤치마킹 | `huggingface-benchmark-agent` | `python-expert` | `memory`, `sequential-thinking-tools` | "허깅페이스", "모델", "벤치마킹", "성능비교" |
| GAN 생성모델 | `gan-agent` | `python-expert` | `memory`, `sequential-thinking-tools` | "GAN", "생성모델", "이미지생성", "적대신경망" |
| 강화학습 | `reinforcement-learning-agent` | `python-expert` | `memory`, `sequential-thinking-tools` | "강화학습", "RL", "에이전트", "정책학습" |
| 개발 카피라이터 | `dev-copywriter-agent` | `general-purpose` | `memory`, `sequential-thinking-tools` | "카피라이터", "기술문서", "마케팅", "콘텐츠" |
| 교안저작 | `curriculum-authoring-agent` | `general-purpose` | `memory`, `sequential-thinking-tools` | "교안", "교육과정", "학습자료", "RAG지식" |
| 코드리팩토리 | `code-refactoring-agent` | `senior-code-reviewer` | `memory`, `filesystem` | "리팩토리", "코드개선", "최적화", "품질향상" |
| 포트충돌 해결 | `port-conflict-resolution-agent` | `server-management-agent` | `memory`, `filesystem` | "포트충돌", "포트관리", "환경정리", "서비스관리" |

### 🔍 **검증 및 품질 관리**

| 작업 유형 | 1차 에이전트 | 2차 에이전트 | MCP 도구 | 트리거 키워드 |
|-----------|-------------|-------------|----------|---------------|
| 코드 리뷰 | `senior-code-reviewer` | `verification-agent` | `chrome-devtools`, `playwright` | "리뷰", "검토", "버그", "성능" |
| UI/UX 검증 | `ui-ux-validator-agent` | `frontend-scaffold-generator` | `playwright`, `chrome-devtools`, `figma-api` | "UI", "UX", "가독성", "접근성", "디자인" |
| 서버 상태 체크 | `server-management-agent` | `environment-setup-agent` | `memory`, `filesystem` | "서버", "포트", "프로세스", "상태" |
| DB 연결 검증 | `database-connection-agent` | `database-architect` | `supabase`, `memory` | "데이터베이스", "연결", "데이터", "쿼리" |
| 프롬프트 최적화 | `prompt-recommendation-agent` | `general-purpose` | `memory`, `sequential-thinking-tools` | "프롬프트", "최적화", "추천", "에이전트" |
| 자동 학습 | `learning-coordinator-agent` | `memory` | `memory`, `task-master-ai` | "학습", "지식", "패턴", "개선" |
| ML 모델 추천 | `machine-learning-agent` | `python-expert` | `memory`, `sequential-thinking-tools` | "머신러닝", "ML", "모델", "알고리즘" |
| DL 모델 추천 | `deep-learning-agent` | `python-expert` | `memory`, `sequential-thinking-tools` | "딥러닝", "DL", "신경망", "AI" |
| 데이터 분석 | `data-analysis-agent` | `python-expert` | `memory`, `sequential-thinking-tools` | "데이터분석", "통계", "시각화", "인사이트" |
| 논문 분석 | `research-paper-agent` | `python-expert` | `memory`, `sequential-thinking-tools` | "논문", "연구", "기술전환", "특허" |
| EXE 패키징 | `local-webview-exe-agent` | `python-expert` | `memory`, `sequential-thinking-tools` | "EXE", "웹뷰", "로컬", "패키징" |
| 게임 개발 | `unity-unreal-agent` | `python-expert` | `memory`, `sequential-thinking-tools` | "Unity", "Unreal", "게임", "3D" |
| VR/AR 개발 | `vr-ar-development-agent` | `python-expert` | `memory`, `sequential-thinking-tools` | "VR", "AR", "가상현실", "증강현실" |
| WebXR AI 통합 | `webxr-ai-integration-agent` | `python-expert` | `memory`, `sequential-thinking-tools` | "WebXR", "AI", "시선추적", "AR오버레이" |
| API 개발 연동 | `api-development-integration-agent` | `backend-code-generator` | `memory`, `sequential-thinking-tools` | "API", "RESTful", "GraphQL", "연동" |
| RAG 시스템 | `rag-development-agent` | `python-expert` | `memory`, `sequential-thinking-tools` | "RAG", "벡터DB", "임베딩", "검색" |
| 청킹 시스템 | `chunk-development-agent` | `python-expert` | `memory`, `sequential-thinking-tools` | "청킹", "문서분할", "텍스트분할" |
| 시뮬레이션 | `simulation-development-agent` | `python-expert` | `memory`, `sequential-thinking-tools` | "시뮬레이션", "모델링", "물리엔진" |
| MLOps | `mlops-development-agent` | `python-expert` | `memory`, `sequential-thinking-tools` | "MLOps", "ML파이프라인", "모델배포" |
| LLMOps | `llmops-development-agent` | `python-expert` | `memory`, `sequential-thinking-tools` | "LLMOps", "LLM배포", "프롬프트" |
| 브라우저 분석 | `browser-analysis-agent` | `ui-ux-validator-agent` | `chrome-devtools`, `memory` | "브라우저", "화면분석", "UI분석" |
| 이미지 분석 | `image-analysis-agent` | `ui-ux-validator-agent` | `memory`, `sequential-thinking-tools` | "이미지분석", "스크린샷", "OCR" |
| 개발 히스토리 | `development-history-agent` | `learning-coordinator-agent` | `memory`, `sequential-thinking-tools` | "개발히스토리", "코드변경", "프로젝트진화" |
| 버그 학습 | `bug-learning-agent` | `learning-coordinator-agent` | `memory`, `sequential-thinking-tools` | "버그학습", "오류분석", "자기반성" |
| 테스트 및 검증 | `verification-agent` | `test-automation-agent` | `playwright`, `chrome-devtools` | "테스트", "검증", "배포", "품질" |
| 자동화 테스트 | `test-automation-agent` | `verification-agent` | `playwright`, `chrome-devtools` | "자동화", "E2E", "테스트 케이스" |
| 디버깅 | `debugging-agent` | `senior-code-reviewer` | `chrome-devtools`, `memory` | "디버깅", "오류", "문제", "분석" |
| 환경 설정 | `environment-setup-agent` | `tool-configuration-agent` | `filesystem`, `memory` | "환경", "설정", "초기화", "설치" |
| 도구 구성 | `tool-configuration-agent` | `environment-setup-agent` | `memory`, `filesystem` | "도구", "구성", "API키", "서비스" |
| 일반 작업 | `general-purpose` | - | `memory`, `task-master-ai` | "일반", "기본", "도움" |

### 🛠️ **MCP 도구 활용 매트릭스**

| MCP 도구 | 주요 기능 | 활용 시나리오 | 연계 에이전트 |
|----------|-----------|---------------|---------------|
| `playwright` | 브라우저 자동화, E2E 테스트 | 웹 애플리케이션 테스트, UI 검증 | `verification-agent`, `frontend-scaffold-generator` |
| `memory` | 지식 그래프, 메모리 관리 | 컨텍스트 유지, 학습 기록 | 모든 에이전트 |
| `supabase` | 데이터베이스, 인증, 스토리지 | 백엔드 서비스, DB 관리 | `backend-code-generator`, `database-architect` |
| `chrome-devtools` | 브라우저 디버깅, 성능 분석 | 성능 최적화, 디버깅 | `senior-code-reviewer`, `verification-agent` |
| `filesystem` | 파일 시스템 접근 | 파일 관리, 프로젝트 구조 | `frontend-scaffold-generator`, `backend-code-generator` |
| `github` | GitHub API, 코드 검색 | 코드 검색, 리포지토리 관리 | `github-search-apply` |
| `web_search` | 웹 검색, 정보 수집 | 라이브러리 검색, 솔루션 연구 | `library-search-agent`, `component-finder-agent`, `solution-research-agent` |
| `ui-ux-validator-agent` | UI/UX 검증, 접근성 분석 | 디자인 검증, 사용성 개선 | `playwright`, `chrome-devtools`, `figma-api` |
| `server-management-agent` | 서버 관리, 프로세스 모니터링 | 서버 상태 체크, 성능 최적화 | `memory`, `filesystem` |
| `database-connection-agent` | DB 연결 체크, 데이터 무결성 | 데이터베이스 검증, 쿼리 최적화 | `supabase`, `memory` |
| `prompt-recommendation-agent` | 프롬프트 추천, 에이전트 선택 | 프롬프트 최적화, 컨텍스트 분석 | `memory`, `sequential-thinking-tools` |
| `learning-coordinator-agent` | 자동 학습, 지식 관리 | 패턴 분석, 에이전트 개선 | `memory`, `task-master-ai` |
| `machine-learning-agent` | 머신러닝 모델 추천 | 알고리즘 선택, 성능 최적화 | `memory`, `sequential-thinking-tools` |
| `deep-learning-agent` | 딥러닝 모델 추천 | 신경망 설계, AI 솔루션 | `memory`, `sequential-thinking-tools` |
| `data-analysis-agent` | 데이터 분석 및 통계 | 인사이트 추출, 시각화 | `memory`, `sequential-thinking-tools` |
| `research-paper-agent` | 논문 분석 및 기술전환 | 연구 분석, 상용화 가이드 | `memory`, `sequential-thinking-tools` |
| `local-webview-exe-agent` | 로컬 웹뷰 EXE 생성 | 데스크톱 앱, 패키징 | `memory`, `sequential-thinking-tools` |
| `unity-unreal-agent` | Unity/Unreal 게임 개발 | 게임 엔진, 3D 그래픽스 | `memory`, `sequential-thinking-tools` |
| `vr-ar-development-agent` | VR/AR 소프트웨어 개발 | 몰입형 경험, 공간 컴퓨팅 | `memory`, `sequential-thinking-tools` |
| `webxr-ai-integration-agent` | WebXR AI 통합 개발 | 웹XR, AI 통합, 시선추적 | `memory`, `sequential-thinking-tools` |
| `api-development-integration-agent` | API 개발 및 연동 | RESTful, GraphQL, 외부연동 | `memory`, `sequential-thinking-tools` |
| `rag-development-agent` | RAG 시스템 개발 | 벡터DB, 임베딩, 검색 | `memory`, `sequential-thinking-tools` |
| `chunk-development-agent` | 청킹 시스템 개발 | 문서분할, 텍스트분할, 의미적분할 | `memory`, `sequential-thinking-tools` |
| `simulation-development-agent` | 시뮬레이션 개발 | 모델링, 물리엔진, 가상테스트 | `memory`, `sequential-thinking-tools` |
| `mlops-development-agent` | MLOps 개발 | ML파이프라인, 모델배포, ML인프라 | `memory`, `sequential-thinking-tools` |
| `llmops-development-agent` | LLMOps 개발 | LLM배포, 프롬프트엔지니어링, AI모델관리 | `memory`, `sequential-thinking-tools` |
| `browser-analysis-agent` | 브라우저 화면 분석 | 화면분석, UI분석, 웹성능 | `chrome-devtools`, `memory` |
| `image-analysis-agent` | 이미지 분석 | 스크린샷, OCR, 시각적분석 | `memory`, `sequential-thinking-tools` |
| `development-history-agent` | 개발 히스토리 관리 | 코드변경, 프로젝트진화, 개발패턴 | `memory`, `sequential-thinking-tools` |
| `bug-learning-agent` | 버그 학습 시스템 | 오류분석, 자기반성, 품질개선 | `memory`, `sequential-thinking-tools` |
| `ocr-analysis-agent` | OCR 분석 및 인식 | 문자인식, PDF분석, 텍스트추출 | `memory`, `sequential-thinking-tools` |
| `layout-analytics-agent` | 레이아웃 분석 및 구조 | 구조분석, 문서구조, 요소분석 | `memory`, `sequential-thinking-tools` |
| `embedded-vectorization-agent` | 임베디드 벡터화 | 벡터화, 임베딩, 벡터DB, 의미적표현 | `memory`, `sequential-thinking-tools` |
| `knowledge-management-agent` | 지식 관리 및 활용 | 지식관리, KMS, 지식베이스, 정보활용 | `memory`, `task-master-ai` |
| `context-aware-agent` | 맥락 인식 처리 | 맥락인식, 컨텍스트, 상황인식, 의미이해 | `memory`, `sequential-thinking-tools` |
| `image-generation-agent` | 이미지 생성 모델 | 이미지생성, AI이미지, 생성모델, Diffusion | `memory`, `sequential-thinking-tools` |
| `code-safe-translation-agent` | 코드 안전 번역 | 번역, 한글화, 로컬라이제이션, UI번역 | `memory`, `sequential-thinking-tools` |
| `sequential-thinking-tools` | 순차적 사고, 문제 해결 | 복잡한 문제 분석 | `requirements-analyst`, `python-expert` |
| `task-master-ai` | 작업 관리, 프로젝트 계획 | 프로젝트 관리, 작업 분배 | `system-architect`, `general-purpose` |
| `figma-api` | 디자인 시스템, UI/UX | 디자인 작업, UI 프로토타이핑 | `frontend-scaffold-generator` |

## 워크플로우 규칙

### 🎯 **단일 에이전트 호출**
```yaml
조건: 명확한 단일 작업 유형
절차:
  1. 매트릭스에서 1차 에이전트 선택
  2. 관련 MCP 도구 활성화
  3. 에이전트에게 작업 위임
  4. MCP 도구로 결과 검증
  5. 사용자에게 전달
```

### 🔄 **다중 에이전트 협업**
```yaml
조건: 복합 작업 또는 연속적 처리 필요
절차:
  1. 작업을 단계별로 분해
  2. 각 단계에 적합한 에이전트 선택
  3. 필요한 MCP 도구들 활성화
  4. 에이전트 간 결과 전달 및 연계
  5. MCP 도구로 중간 검증
  6. 최종 결과 통합 및 검증
```

### 🚨 **긴급 상황 처리**
```yaml
조건: 버그, 오류, 성능 문제
절차:
  1. `chrome-devtools`로 문제 진단
  2. `senior-code-reviewer`로 코드 분석
  3. `playwright`로 자동화 테스트 실행
  4. 필요시 `verification-agent`로 추가 검증
  5. 해결책 제시 및 구현 에이전트 호출
  6. MCP 도구로 수정사항 재검증
```

### 🛠️ **MCP 도구 통합 워크플로우**

#### **웹 개발 프로젝트**
```yaml
1. requirements-analyst + memory + sequential-thinking-tools
   → 요구사항 분석 및 지식 그래프 구축

2. system-architect + task-master-ai + memory
   → 아키텍처 설계 및 작업 계획 수립

3. database-architect + supabase + memory
   → 데이터베이스 설계 및 Supabase 설정

4. frontend-scaffold-generator + figma-api + filesystem
   → UI 컴포넌트 생성 및 파일 구조 설정

5. backend-code-generator + supabase + memory
   → API 구현 및 데이터베이스 연동

6. verification-agent + playwright + chrome-devtools
   → E2E 테스트 및 성능 검증
```

#### **버그 수정 워크플로우**
```yaml
1. chrome-devtools + senior-code-reviewer
   → 브라우저 디버깅 및 코드 분석

2. playwright + verification-agent
   → 자동화 테스트로 문제 재현

3. github + github-search-apply
   → 유사한 문제 해결 사례 검색

4. [해당 기술]-expert + memory
   → 수정 구현 및 지식 업데이트

5. verification-agent + playwright
   → 수정사항 검증 및 회귀 테스트
```

## 에이전트 호출 패턴

### 📝 **요구사항 → 설계 → 구현**
```
requirements-analyst + memory + sequential-thinking-tools
→ system-architect + task-master-ai + memory
→ [frontend/backend]-code-generator + [관련 MCP 도구]
→ verification-agent + playwright + chrome-devtools
```

### 🐛 **버그 수정 워크플로우**
```
chrome-devtools + senior-code-reviewer
→ playwright + verification-agent
→ github + github-search-apply
→ [해당 기술]-expert + memory
→ verification-agent + playwright
```

### 🔍 **코드 검색 및 적용**
```
github + github-search-apply + memory
→ senior-code-reviewer + chrome-devtools
→ [적용할 기술]-expert + filesystem
→ verification-agent + playwright
```

### 🧪 **새 기능 개발**
```
requirements-analyst + memory + sequential-thinking-tools
→ system-architect + task-master-ai + memory
→ database-architect + supabase + memory
→ [기술별]-expert + [관련 MCP 도구]
→ verification-agent + playwright + chrome-devtools
```

### 🎨 **UI/UX 개발**
```
requirements-analyst + memory
→ figma-api + frontend-scaffold-generator
→ filesystem + memory
→ verification-agent + playwright + chrome-devtools
```

### 🗄️ **데이터베이스 작업**
```
database-architect + supabase + memory
→ backend-code-generator + supabase
→ verification-agent + memory
```

## 의사결정 기준

### 🎯 **에이전트 선택 우선순위**
1. **정확성**: 작업 유형과 에이전트 전문성의 정확한 매칭
2. **효율성**: 가장 적은 단계로 목표 달성
3. **품질**: 검증 가능한 고품질 결과 보장
4. **속도**: 빠른 응답 시간 유지

### ⚖️ **트레이드오프 고려사항**
- **복잡도 vs 속도**: 복잡한 작업은 여러 에이전트로 분할
- **전문성 vs 범용성**: 특화된 작업은 전문 에이전트, 일반 작업은 범용 에이전트
- **품질 vs 효율성**: 중요한 작업은 검증 단계 추가

## 에이전트 간 통신 규칙

### 📤 **결과 전달 형식**
```yaml
from_agent: "에이전트명"
to_agent: "다음 에이전트명"
context: "작업 컨텍스트"
data: "전달할 데이터"
next_action: "다음 단계 작업"
```

### 🔄 **피드백 루프**
- 각 에이전트는 이전 단계 결과를 검토
- 문제 발견 시 이전 에이전트에게 피드백
- 필요시 워크플로우 재조정

## 품질 보장 메커니즘

### ✅ **출력 검증**
- 각 에이전트 출력의 완성도 확인
- 요구사항 충족 여부 검증
- 기술적 정확성 검토

### 🔍 **연속성 검증**
- 에이전트 간 작업 연속성 확인
- 데이터 일관성 유지
- 누락된 단계 보완

## 사용자 인터페이스

### 💬 **사용자와의 소통**
- 에이전트 선택 이유 설명
- 진행 상황 실시간 업데이트
- 결과 요약 및 다음 단계 안내

### 📊 **진행 상황 보고**
```
🎯 작업: [작업명]
👥 활성 에이전트: [에이전트명]
📈 진행률: [퍼센트]
⏱️ 예상 완료: [시간]
```

## 확장성 고려사항

### 🔧 **새 에이전트 추가**
- 매트릭스에 새 에이전트 등록
- 트리거 키워드 업데이트
- 워크플로우 규칙 확장

### 📈 **성능 모니터링**
- 에이전트별 성공률 추적
- 응답 시간 모니터링
- 사용자 만족도 측정

---

## 실행 예시

### 예시 1: 새 기능 개발
```
사용자: "사용자 인증 시스템을 만들어줘"
매니저: 
1. requirements-analyst + memory + sequential-thinking-tools
   → 요구사항 분석 및 지식 그래프 구축

2. system-architect + task-master-ai + memory
   → 아키텍처 설계 및 작업 계획 수립

3. database-architect + supabase + memory
   → DB 스키마 설계 및 Supabase 설정

4. backend-code-generator + supabase + memory
   → API 구현 및 데이터베이스 연동

5. frontend-scaffold-generator + figma-api + filesystem
   → UI 구현 및 파일 구조 설정

6. verification-agent + playwright + chrome-devtools
   → E2E 테스트 및 성능 검증
```

### 예시 2: 버그 수정
```
사용자: "로그인 버튼이 작동하지 않아"
매니저:
1. chrome-devtools + senior-code-reviewer
   → 브라우저 디버깅 및 코드 분석

2. playwright + verification-agent
   → 자동화 테스트로 문제 재현

3. github + github-search-apply + memory
   → 유사한 문제 해결 사례 검색

4. frontend-scaffold-generator + memory
   → 수정 구현 및 지식 업데이트

5. verification-agent + playwright
   → 수정사항 검증 및 회귀 테스트
```

### 예시 3: 성능 최적화
```
사용자: "웹사이트가 느려요"
매니저:
1. chrome-devtools + senior-code-reviewer
   → 성능 프로파일링 및 병목 지점 분석

2. playwright + verification-agent
   → 성능 테스트 자동화

3. memory + sequential-thinking-tools
   → 최적화 전략 수립

4. [해당 기술]-expert + memory
   → 최적화 구현

5. verification-agent + playwright + chrome-devtools
   → 성능 개선 검증
```

### 예시 4: UI/UX 개선
```
사용자: "사용자 인터페이스를 개선해줘"
매니저:
1. requirements-analyst + memory
   → 사용자 요구사항 분석

2. figma-api + frontend-scaffold-generator
   → 디자인 시스템 및 컴포넌트 생성

3. filesystem + memory
   → 파일 구조 최적화

4. verification-agent + playwright + chrome-devtools
   → 접근성 및 사용성 검증
```

## MCP 도구 활용 가이드

### 🔧 **MCP 도구별 상세 활용법**

#### **playwright**
- **활용**: E2E 테스트, 브라우저 자동화, UI 검증
- **연계 에이전트**: `verification-agent`, `frontend-scaffold-generator`
- **사용 시점**: 웹 애플리케이션 테스트, 사용자 플로우 검증

#### **memory**
- **활용**: 지식 그래프 구축, 컨텍스트 유지, 학습 기록
- **연계 에이전트**: 모든 에이전트
- **사용 시점**: 모든 작업에서 컨텍스트 유지 및 지식 축적

#### **supabase**
- **활용**: 데이터베이스 관리, 인증, 스토리지
- **연계 에이전트**: `backend-code-generator`, `database-architect`
- **사용 시점**: 백엔드 서비스 개발, 데이터베이스 작업

#### **chrome-devtools**
- **활용**: 브라우저 디버깅, 성능 분석, 네트워크 모니터링
- **연계 에이전트**: `senior-code-reviewer`, `verification-agent`
- **사용 시점**: 성능 최적화, 디버깅, 문제 진단

#### **filesystem**
- **활용**: 파일 시스템 접근, 프로젝트 구조 관리
- **연계 에이전트**: `frontend-scaffold-generator`, `backend-code-generator`
- **사용 시점**: 프로젝트 초기 설정, 파일 구조 생성

#### **github**
- **활용**: GitHub API, 코드 검색, 리포지토리 관리
- **연계 에이전트**: `github-search-apply`
- **사용 시점**: 코드 검색, 오픈소스 활용, 리포지토리 관리

#### **sequential-thinking-tools**
- **활용**: 순차적 사고, 복잡한 문제 해결
- **연계 에이전트**: `requirements-analyst`, `python-expert`
- **사용 시점**: 복잡한 문제 분석, 논리적 사고 과정

#### **task-master-ai**
- **활용**: 작업 관리, 프로젝트 계획, 일정 관리
- **연계 에이전트**: `system-architect`, `general-purpose`
- **사용 시점**: 프로젝트 계획 수립, 작업 분배

#### **figma-api**
- **활용**: 디자인 시스템, UI/UX 프로토타이핑
- **연계 에이전트**: `frontend-scaffold-generator`
- **사용 시점**: UI/UX 디자인, 컴포넌트 생성

#### **web_search**
- **활용**: 웹 검색, 정보 수집, 라이브러리 연구
- **연계 에이전트**: `library-search-agent`, `component-finder-agent`, `solution-research-agent`
- **사용 시점**: 외부 정보 검색, 라이브러리 조사, 솔루션 연구

### 🎯 **MCP 도구 선택 기준**

1. **작업 유형별 우선순위**
   - 웹 개발: `playwright` + `chrome-devtools` + `memory`
   - 백엔드 개발: `supabase` + `memory` + `filesystem`
   - UI/UX: `figma-api` + `playwright` + `chrome-devtools`
   - 디버깅: `chrome-devtools` + `playwright` + `memory`

2. **복잡도별 도구 조합**
   - 단순 작업: `memory` + 해당 기술 에이전트
   - 중간 복잡도: `memory` + `filesystem` + 기술 에이전트
   - 복잡한 작업: `memory` + `sequential-thinking-tools` + `task-master-ai` + 기술 에이전트

3. **품질 보장을 위한 필수 도구**
   - 모든 작업: `memory` (컨텍스트 유지)
   - 웹 관련: `playwright` (테스트)
   - 성능 관련: `chrome-devtools` (분석)

## 🆕 **새로운 워크플로우**

### 🔍 **라이브러리 검색 워크플로우**
```yaml
조건: 외부 라이브러리, 패키지, 의존성 검색 필요
절차:
  1. `library-search-agent` 호출
  2. `web_search`로 라이브러리 정보 수집
  3. `memory`로 검색 결과 저장
  4. `senior-code-reviewer`로 품질 검증
  5. 사용자에게 추천 및 가이드 제공
```

### 🎨 **컴포넌트 검색 워크플로우**
```yaml
조건: UI 컴포넌트, 템플릿, 디자인 시스템 검색 필요
절차:
  1. `component-finder-agent` 호출
  2. `web_search`로 컴포넌트 정보 수집
  3. `memory`로 검색 결과 저장
  4. `frontend-scaffold-generator`로 구현 지원
  5. 사용자에게 컴포넌트 추천 및 사용법 제공
```

### 🏗️ **솔루션 연구 워크플로우**
```yaml
조건: 복잡한 문제, 아키텍처 패턴, 베스트 프랙티스 연구 필요
절차:
  1. `solution-research-agent` 호출
  2. `web_search`로 종합 솔루션 연구
  3. `memory`로 연구 결과 저장
  4. `system-architect`로 아키텍처 검증
  5. 사용자에게 종합 솔루션 및 구현 가이드 제공
```

### 🎨 **UI/UX 검증 워크플로우**
```yaml
조건: UI/UX 디자인 검증, 가독성 개선, 접근성 분석 필요
절차:
  1. `ui-ux-validator-agent` 호출
  2. `playwright`로 화면 캡처 및 분석
  3. `chrome-devtools`로 접근성 및 성능 분석
  4. `figma-api`로 디자인 시스템 검증
  5. 사용자에게 UI/UX 개선 권장사항 제공
```

### 🖥️ **서버 관리 워크플로우**
```yaml
조건: 서버 상태 체크, 프로세스 관리, 성능 모니터링 필요
절차:
  1. `server-management-agent` 호출
  2. `memory`로 서버 상태 정보 저장
  3. `filesystem`으로 로그 및 설정 파일 분석
  4. 서버 프로세스 및 포트 상태 확인
  5. 사용자에게 서버 상태 및 개선 권장사항 제공
```

### 🗄️ **데이터베이스 연결 체크 워크플로우**
```yaml
조건: DB 연결 검증, 데이터 무결성 체크, 프론트엔드-백엔드 통합 검증 필요
절차:
  1. `database-connection-agent` 호출
  2. `supabase`로 데이터베이스 연결 상태 확인
  3. `memory`로 연결 정보 및 성능 메트릭 저장
  4. 프론트엔드-백엔드-데이터베이스 데이터 플로우 검증
  5. 사용자에게 DB 연결 상태 및 최적화 권장사항 제공
```

### 🎯 **프롬프트 추천 워크플로우**
```yaml
조건: 사용자 요청 분석, 프롬프트 최적화, 에이전트 선택 필요
절차:
  1. `prompt-recommendation-agent` 호출
  2. `memory`로 사용자 요청 및 컨텍스트 분석
  3. `sequential-thinking-tools`로 최적 프롬프트 생성
  4. 적절한 에이전트 선택 및 워크플로우 설계
  5. 사용자에게 최적화된 프롬프트 및 에이전트 추천 제공
```

### 🧠 **자동 학습 워크플로우**
```yaml
조건: 문제 해결 완료, 학습 내용 추출, 에이전트 개선 필요
절차:
  1. `learning-coordinator-agent` 호출
  2. `memory`로 해결된 문제 및 솔루션 분석
  3. `task-master-ai`로 학습 내용 계획 및 분배
  4. 각 에이전트에게 관련 학습 내용 전파
  5. 에이전트 성능 개선 및 지식 그래프 업데이트
```

### 🤖 **머신러닝 모델 추천 워크플로우**
```yaml
조건: 데이터 분석, ML 모델 선택, 알고리즘 추천 필요
절차:
  1. `machine-learning-agent` 호출
  2. `memory`로 데이터 특성 및 요구사항 분석
  3. `sequential-thinking-tools`로 최적 알고리즘 선택
  4. 특성 엔지니어링 및 전처리 가이드 제공
  5. 사용자에게 ML 모델 및 구현 가이드 제공
```

### 🧠 **딥러닝 모델 추천 워크플로우**
```yaml
조건: 복잡한 AI 작업, 신경망 설계, 딥러닝 솔루션 필요
절차:
  1. `deep-learning-agent` 호출
  2. `memory`로 작업 특성 및 데이터 분석
  3. `sequential-thinking-tools`로 최적 아키텍처 설계
  4. 전이학습 및 사전 훈련된 모델 활용 방안 제시
  5. 사용자에게 딥러닝 모델 및 구현 가이드 제공
```

### 📊 **데이터 분석 워크플로우**
```yaml
조건: 데이터 분석, 통계 분석, 인사이트 추출 필요
절차:
  1. `data-analysis-agent` 호출
  2. `memory`로 데이터 특성 및 분석 요구사항 파악
  3. `sequential-thinking-tools`로 분석 방법론 설계
  4. 통계 분석 및 시각화 수행
  5. 사용자에게 데이터 인사이트 및 추천사항 제공
```

### 📚 **논문 분석 및 기술전환 워크플로우**
```yaml
조건: 연구 논문 분석, 기술 전환, 상용화 가이드 필요
절차:
  1. `research-paper-agent` 호출
  2. `memory`로 논문 내용 및 기술적 특성 분석
  3. `sequential-thinking-tools`로 기술 전환 전략 수립
  4. 상용화 가능성 및 구현 로드맵 제시
  5. 사용자에게 기술 전환 및 구현 가이드 제공
```

### 🖥️ **로컬 웹뷰 EXE 생성 워크플로우**
```yaml
조건: 로컬 기반 웹뷰 EXE 애플리케이션 생성 필요
절차:
  1. `local-webview-exe-agent` 호출
  2. `memory`로 애플리케이션 요구사항 및 아키텍처 분석
  3. `sequential-thinking-tools`로 EXE 생성 전략 수립
  4. FastAPI 서버 내장 및 WebView 통합 설계
  5. 사용자에게 로컬 웹뷰 EXE 생성 가이드 제공
```

### 🎮 **Unity/Unreal 게임 개발 워크플로우**
```yaml
조건: Unity/Unreal Engine 게임 또는 시뮬레이션 개발 필요
절차:
  1. `unity-unreal-agent` 호출
  2. `memory`로 게임 요구사항 및 플랫폼 분석
  3. `sequential-thinking-tools`로 게임 아키텍처 설계
  4. 게임플레이 시스템 및 그래픽스 최적화 구현
  5. 사용자에게 Unity/Unreal 게임 개발 가이드 제공
```

### 🥽 **VR/AR 소프트웨어 개발 워크플로우**
```yaml
조건: VR/AR 애플리케이션 및 몰입형 경험 개발 필요
절차:
  1. `vr-ar-development-agent` 호출
  2. `memory`로 VR/AR 요구사항 및 하드웨어 분석
  3. `sequential-thinking-tools`로 공간 컴퓨팅 전략 수립
  4. 3D 인터랙션 및 성능 최적화 구현
  5. 사용자에게 VR/AR 소프트웨어 개발 가이드 제공
```

### 🌐 **WebXR AI 통합 개발 워크플로우**
```yaml
조건: WebXR 애플리케이션에 AI 통합 및 시선 추적, AR 오버레이 필요
절차:
  1. `webxr-ai-integration-agent` 호출
  2. `memory`로 WebXR 요구사항 및 AI 통합 분석
  3. `sequential-thinking-tools`로 WebXR AI 통합 전략 수립
  4. HTML/CSS/JavaScript, WebGL/Three.js, WebXR Device API 구현
  5. Quest/HoloLens 디바이스 연결 및 AI 기능 통합
  6. 사용자에게 WebXR AI 통합 개발 가이드 제공
```

### 🔌 **API 개발 및 연동 워크플로우**
```yaml
조건: RESTful/GraphQL API 개발 및 외부 서비스 연동 필요
절차:
  1. `api-development-integration-agent` 호출
  2. `memory`로 API 요구사항 및 외부 서비스 분석
  3. `sequential-thinking-tools`로 API 아키텍처 및 연동 전략 수립
  4. RESTful/GraphQL API 엔드포인트 구현
  5. 인증/보안, 외부 API 연동, 문서화 구현
  6. 사용자에게 API 개발 및 연동 가이드 제공
```

### 🔍 **RAG 시스템 개발 워크플로우**
```yaml
조건: RAG 시스템 개발 및 벡터 데이터베이스 구축 필요
절차:
  1. `rag-development-agent` 호출
  2. `memory`로 RAG 요구사항 및 벡터DB 분석
  3. `sequential-thinking-tools`로 RAG 아키텍처 및 검색 전략 수립
  4. 벡터DB 구축, 임베딩 모델 선택, 검색 알고리즘 구현
  5. RAG 파이프라인 개발, 성능 최적화, 모니터링 구현
  6. 사용자에게 RAG 시스템 개발 가이드 제공
```

### 📄 **청킹 시스템 개발 워크플로우**
```yaml
조건: 문서 청킹 시스템 개발 및 텍스트 분할 최적화 필요
절차:
  1. `chunk-development-agent` 호출
  2. `memory`로 청킹 요구사항 및 문서 유형 분석
  3. `sequential-thinking-tools`로 청킹 전략 및 분할 알고리즘 수립
  4. 의미적 청킹, 텍스트 분할, 메타데이터 추출 구현
  5. 청킹 품질 평가, 성능 최적화, 실시간 처리 구현
  6. 사용자에게 청킹 시스템 개발 가이드 제공
```

### 🎮 **시뮬레이션 개발 워크플로우**
```yaml
조건: 시뮬레이션 시스템 개발 및 모델링 환경 구축 필요
절차:
  1. `simulation-development-agent` 호출
  2. `memory`로 시뮬레이션 요구사항 및 물리 모델 분석
  3. `sequential-thinking-tools`로 시뮬레이션 아키텍처 및 알고리즘 수립
  4. 물리 엔진 구현, 모델링 환경 구축, 성능 최적화
  5. 시각화 시스템, 데이터 분석, 검증 시스템 구현
  6. 사용자에게 시뮬레이션 개발 가이드 제공
```

### 🤖 **MLOps 개발 워크플로우**
```yaml
조건: MLOps 파이프라인 개발 및 ML 모델 배포 시스템 구축 필요
절차:
  1. `mlops-development-agent` 호출
  2. `memory`로 MLOps 요구사항 및 ML 모델 분석
  3. `sequential-thinking-tools`로 MLOps 아키텍처 및 배포 전략 수립
  4. ML 파이프라인 구현, 모델 배포, 모니터링 시스템 구축
  5. 자동화 워크플로우, A/B 테스트, 성능 최적화 구현
  6. 사용자에게 MLOps 개발 가이드 제공
```

### 🧠 **LLMOps 개발 워크플로우**
```yaml
조건: LLMOps 시스템 개발 및 LLM 모델 배포 최적화 필요
절차:
  1. `llmops-development-agent` 호출
  2. `memory`로 LLMOps 요구사항 및 LLM 모델 분석
  3. `sequential-thinking-tools`로 LLMOps 아키텍처 및 배포 전략 수립
  4. LLM 배포 시스템, 프롬프트 엔지니어링, 성능 최적화 구현
  5. 모니터링 시스템, 비용 최적화, 품질 관리 구현
  6. 사용자에게 LLMOps 개발 가이드 제공
```

### 🌐 **브라우저 화면 분석 워크플로우**
```yaml
조건: 브라우저 화면 분석 및 UI/UX 문제 진단 필요
절차:
  1. `browser-analysis-agent` 호출
  2. `chrome-devtools`로 브라우저 화면 및 성능 분석
  3. `memory`로 분석 결과 저장 및 패턴 인식
  4. UI/UX 문제 진단, 성능 분석, 접근성 검사 수행
  5. 개선 방안 제시, 최적화 권장사항 제공
  6. 사용자에게 브라우저 분석 결과 및 개선 가이드 제공
```

### 🖼️ **이미지 분석 워크플로우**
```yaml
조건: 이미지 분석 및 시각적 문제 진단 필요
절차:
  1. `image-analysis-agent` 호출
  2. `memory`로 이미지 분석 요구사항 및 컨텍스트 분석
  3. `sequential-thinking-tools`로 분석 전략 및 진단 방법 수립
  4. 이미지 분석, OCR, 객체 인식, 문제 진단 수행
  5. 분석 결과 해석, 개선 방안 제시, 권장사항 제공
  6. 사용자에게 이미지 분석 결과 및 개선 가이드 제공
```

### 📚 **개발 히스토리 관리 워크플로우**
```yaml
조건: 개발 히스토리 추적 및 프로젝트 진화 분석 필요
절차:
  1. `development-history-agent` 호출
  2. `memory`로 개발 히스토리 및 코드 변경사항 분석
  3. `sequential-thinking-tools`로 개발 패턴 및 트렌드 분석
  4. 코드 진화 분석, 팀 협업 패턴, 성능 개선 히스토리 추적
  5. 학습 과정 분석, 성장 패턴 식별, 개선 기회 도출
  6. 사용자에게 개발 히스토리 분석 결과 및 개선 가이드 제공
```

### 🐛 **버그 학습 시스템 워크플로우**
```yaml
조건: 버그 추적 및 학습 시스템 구축 필요
절차:
  1. `bug-learning-agent` 호출
  2. `memory`로 버그 히스토리 및 오류 패턴 분석
  3. `sequential-thinking-tools`로 버그 학습 전략 및 예방 방법 수립
  4. 버그 분석, 패턴 인식, 자기반성 프로세스 구현
  5. 학습 시스템 구축, 지식 전파, 품질 개선 구현
  6. 사용자에게 버그 학습 시스템 및 개선 가이드 제공
```

### 🔍 **OCR 분석 워크플로우**
```yaml
조건: OCR 분석 및 PDF 인식 시스템 구축 필요
절차:
  1. `ocr-analysis-agent` 호출
  2. `memory`로 OCR 모델 및 텍스트 인식 분석
  3. `sequential-thinking-tools`로 OCR 파이프라인 및 정확도 최적화
  4. PDF 분석, 텍스트 추출, 문자 인식 시스템 구현
  5. 다국어 지원, 정확도 향상, 후처리 최적화 구현
  6. 사용자에게 OCR 분석 시스템 및 성능 최적화 가이드 제공
```

### 📐 **레이아웃 분석 워크플로우**
```yaml
조건: 레이아웃 분석 및 문서 구조 분석 필요
절차:
  1. `layout-analytics-agent` 호출
  2. `memory`로 레이아웃 분석 모델 및 구조 인식 분석
  3. `sequential-thinking-tools`로 레이아웃 분석 전략 및 요소 분류 수립
  4. 문서 구조 분석, 요소 분류, 레이아웃 인식 시스템 구현
  5. 시각적 분석, 구조화, 메타데이터 추출 구현
  6. 사용자에게 레이아웃 분석 시스템 및 구조화 가이드 제공
```

### 🧮 **임베디드 벡터화 워크플로우**
```yaml
조건: 임베디드 벡터화 및 의미적 표현 시스템 구축 필요
절차:
  1. `embedded-vectorization-agent` 호출
  2. `memory`로 벡터화 모델 및 임베딩 분석
  3. `sequential-thinking-tools`로 벡터화 전략 및 의미적 표현 최적화
  4. 텍스트 벡터화, 의미적 임베딩, 벡터 데이터베이스 구현
  5. 유사도 검색, 클러스터링, 차원 축소 구현
  6. 사용자에게 임베디드 벡터화 시스템 및 검색 최적화 가이드 제공
```

### 🧠 **지식 관리 워크플로우**
```yaml
조건: 지식 관리 시스템(KMS) 및 정보 활용 시스템 구축 필요
절차:
  1. `knowledge-management-agent` 호출
  2. `memory`로 지식 베이스 및 정보 관리 분석
  3. `task-master-ai`로 지식 관리 전략 및 활용 방법 수립
  4. 지식 베이스 구축, 정보 분류, 검색 시스템 구현
  5. 지식 추출, 활용, 공유 시스템 구현
  6. 사용자에게 지식 관리 시스템 및 정보 활용 가이드 제공
```

### 🎯 **맥락 인식 워크플로우**
```yaml
조건: 맥락 인식 처리 및 상황 인식 시스템 구축 필요
절차:
  1. `context-aware-agent` 호출
  2. `memory`로 맥락 인식 모델 및 상황 분석
  3. `sequential-thinking-tools`로 맥락 인식 전략 및 의미 이해 최적화
  4. 상황 인식, 맥락 분석, 의미 이해 시스템 구현
  5. 동적 적응, 개인화, 지능형 응답 구현
  6. 사용자에게 맥락 인식 시스템 및 지능형 처리 가이드 제공
```

### 🎨 **이미지 생성 워크플로우**
```yaml
조건: 이미지 생성 모델 및 AI 이미지 생성 시스템 구축 필요
절차:
  1. `image-generation-agent` 호출
  2. `memory`로 이미지 생성 모델 및 AI 아트 분석
  3. `sequential-thinking-tools`로 이미지 생성 전략 및 품질 최적화
  4. 텍스트-이미지 생성, 스타일 변환, 이미지 편집 시스템 구현
  5. 고품질 생성, 실시간 처리, 창의적 표현 구현
  6. 사용자에게 이미지 생성 시스템 및 AI 아트 가이드 제공
```

### 🌐 **코드 안전 번역 워크플로우**
```yaml
조건: 코드 안전 번역 및 한글화 시스템 구축 필요
절차:
  1. `code-safe-translation-agent` 호출
  2. `memory`로 번역 품질 및 코드 안전성 분석
  3. `sequential-thinking-tools`로 번역 전략 및 코드 보존 방법 수립
  4. UI 텍스트 번역, 에러 메시지 번역, 문서 번역 시스템 구현
  5. 코드 안전성 보장, 번역 품질 향상, 일관성 유지 구현
  6. 사용자에게 코드 안전 번역 시스템 및 한글화 가이드 제공
```

이 지침을 따라 서브에이전트 매니저가 각 상황에 맞는 최적의 에이전트와 MCP 도구를 선택하고 효율적으로 작업을 조율할 수 있습니다.