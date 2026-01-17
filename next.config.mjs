/** @type {import('next').NextConfig} */
const nextConfig = {
  // Cloudflare Pages를 위한 정적 출력 모드
  output: 'export',
  // 정적 이미지 최적화 비활성화 (Cloudflare Pages 호환성)
  images: {
    unoptimized: true,
  },
  // trailingSlash는 선택사항이지만 Cloudflare Pages와 호환성 향상
  trailingSlash: false,
};

export default nextConfig;
