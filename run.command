#!/bin/bash

# 맥에서 더블클릭으로 실행 가능한 개발 서버 스크립트
# 사용법: run.command 파일을 더블클릭하거나 터미널에서 ./run.command 실행

# 스크립트가 있는 디렉토리로 이동
cd "$(dirname "$0")"

# 터미널 창 열기 (더블클릭 실행 시)
if [ -z "$TERM_PROGRAM" ]; then
    osascript -e 'tell application "Terminal" to do script "cd \"'"$(pwd)"'\" && npm run dev"'
    exit 0
fi

# 터미널에서 직접 실행 시
echo "🚀 개발 서버를 시작합니다..."
echo "📍 프로젝트 경로: $(pwd)"
echo ""
echo "서버를 중지하려면 Ctrl+C를 누르세요."
echo ""

npm run dev


