/** @type {import('next').NextConfig} */
const nextConfig = {
  // Cloudflare Pages는 Next.js를 자동으로 감지하므로 기본 설정 사용
  // 정적 이미지 최적화 비활성화 (Cloudflare Pages 호환성)
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
