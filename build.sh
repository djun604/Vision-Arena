#!/bin/bash

# Next.js 프로덕션 빌드 스크립트
# 사용법: ./build.sh 또는 bash build.sh

set -e

echo "🔨 프로덕션 빌드를 시작합니다..."

# node_modules 확인 및 설치
if [ ! -d "node_modules" ]; then
  echo "📦 node_modules가 없습니다. 의존성을 설치합니다..."
  npm install
fi

# 빌드 실행
npm run build

echo "✅ 빌드가 완료되었습니다!"
echo "프로덕션 서버를 실행하려면: ./start.sh"

