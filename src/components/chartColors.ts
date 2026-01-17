// 통일된 차트 색상 팔레트 (세련된 모노크롬 + 액센트)
// 모든 차트 컴포넌트에서 공통으로 사용

// 모델별 색상 (차분한 블루/그레이 계열)
export const modelColorPalette = [
  "#4b5563",  // 슬레이트 그레이
  "#6366f1",  // 인디고 (액센트)
  "#64748b",  // 슬레이트
  "#475569",  // 슬레이트 다크
  "#334155",  // 슬레이트 다커
  "#1e293b",  // 슬레이트 다크스트
  "#3b82f6",  // 블루 (액센트)
  "#52525b",  // 네츄럴
]

// 모델별 그라데이션 색상 (primary, secondary)
export const modelGradientColors = [
  { primary: "#4b5563", secondary: "#6b7280" },  // 그레이
  { primary: "#6366f1", secondary: "#818cf8" },  // 인디고
  { primary: "#64748b", secondary: "#94a3b8" },  // 슬레이트
  { primary: "#475569", secondary: "#64748b" },  // 슬레이트 다크
  { primary: "#334155", secondary: "#475569" },  // 슬레이트 다커
  { primary: "#1e293b", secondary: "#334155" },  // 슬레이트 다크스트
  { primary: "#3b82f6", secondary: "#60a5fa" },  // 블루
  { primary: "#52525b", secondary: "#71717a" },  // 네츄럴
]

// 지표별 색상 (차분한 톤)
export const metricColors = {
  psnr: { from: "#6366f1", to: "#818cf8" },        // 인디고 (차분한 블루)
  ssim: { from: "#10b981", to: "#34d399" },        // 에메랄드 (차분한 그린)
  lpips: { from: "#64748b", to: "#94a3b8" },       // 슬레이트 (차분한 그레이)
  compression: { from: "#475569", to: "#64748b" }, // 슬레이트 다크
  fps: { from: "#3b82f6", to: "#60a5fa" },         // 블루
  encoding: { from: "#52525b", to: "#71717a" },    // 네츄럴 (차분한 그레이)
  decoding: { from: "#334155", to: "#475569" },    // 슬레이트 다커
}
