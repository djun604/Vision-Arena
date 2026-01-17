#!/bin/bash

# 프로젝트 초기 설정 스크립트
# 사용법: ./setup.sh 또는 bash setup.sh

set -e

echo "⚙️  프로젝트 초기 설정을 시작합니다..."

# Node.js 확인
if ! command -v node &> /dev/null; then
  echo "❌ Node.js가 설치되어 있지 않습니다."
  echo "Node.js를 먼저 설치해주세요: https://nodejs.org/"
  exit 1
fi

echo "✅ Node.js 버전: $(node --version)"
echo "✅ npm 버전: $(npm --version)"

# 의존성 설치
echo "📦 의존성을 설치합니다..."
npm install

# 스크립트 파일에 실행 권한 부여
echo "🔐 스크립트 파일에 실행 권한을 부여합니다..."
chmod +x dev.sh build.sh start.sh setup.sh

echo "✅ 설정이 완료되었습니다!"
echo ""
echo "다음 명령어를 사용할 수 있습니다:"
echo "  ./dev.sh    - 개발 서버 실행"
echo "  ./build.sh  - 프로덕션 빌드"
echo "  ./start.sh  - 프로덕션 서버 실행"

