'use client';

import AdSense from "@/components/AdSense";
import Link from "next/link";

export default function Home() {
  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
      <div style={{ marginBottom: "3rem" }}>
        <h1 style={{
          fontSize: "2.5rem",
          fontWeight: "700",
          color: "#111827",
          marginBottom: "1rem",
          lineHeight: "1.2",
        }}>
          Vision Arena Leaderboard
        </h1>
        <p style={{
          fontSize: "1.125rem",
          color: "#4b5563",
          lineHeight: "1.8",
          marginBottom: "1.5rem",
        }}>
          AI 비전 모델의 성능을 평가하고 비교할 수 있는 통합 벤치마크 플랫폼입니다. 
          다양한 양자화 및 압축 기술을 가진 모델들의 성능을 체계적으로 분석하고 비교해보세요.
        </p>
        <p style={{
          fontSize: "1rem",
          color: "#6b7280",
          lineHeight: "1.8",
        }}>
          각 카테고리별 리더보드를 통해 모델들의 성능 순위와 지표를 확인하고, 
          상세한 성능 분석 차트를 통해 모델의 강점과 약점을 파악할 수 있습니다.
        </p>
      </div>

      {/* 상단 광고 - 콘텐츠 이후 배치 */}
      <AdSense 
        format="display" 
        responsive 
        style={{ margin: '30px auto', maxWidth: '728px' }}
        position="상단 배너 광고"
      />

      <section style={{
        marginTop: "3rem",
        marginBottom: "3rem",
        padding: "2rem",
        backgroundColor: "#f9fafb",
        borderRadius: "0.5rem",
        border: "1px solid #e5e7eb",
      }}>
        <h2 style={{
          fontSize: "1.875rem",
          fontWeight: "600",
          color: "#1f2937",
          marginBottom: "1.5rem",
        }}>
          주요 기능
        </h2>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "1.5rem",
        }}>
          <div style={{
            padding: "1.5rem",
            backgroundColor: "#ffffff",
            borderRadius: "0.5rem",
            border: "1px solid #e5e7eb",
          }}>
            <h3 style={{
              fontSize: "1.25rem",
              fontWeight: "600",
              color: "#111827",
              marginBottom: "0.5rem",
            }}>
              📊 통합 리더보드
            </h3>
            <p style={{
              fontSize: "0.875rem",
              color: "#6b7280",
              lineHeight: "1.6",
            }}>
              카테고리별 모델 성능 비교 및 순위 확인
            </p>
          </div>
          <div style={{
            padding: "1.5rem",
            backgroundColor: "#ffffff",
            borderRadius: "0.5rem",
            border: "1px solid #e5e7eb",
          }}>
            <h3 style={{
              fontSize: "1.25rem",
              fontWeight: "600",
              color: "#111827",
              marginBottom: "0.5rem",
            }}>
              📈 성능 시각화
            </h3>
            <p style={{
              fontSize: "0.875rem",
              color: "#6b7280",
              lineHeight: "1.6",
            }}>
              레이더 차트 및 다중 성능 차트 제공
            </p>
          </div>
          <div style={{
            padding: "1.5rem",
            backgroundColor: "#ffffff",
            borderRadius: "0.5rem",
            border: "1px solid #e5e7eb",
          }}>
            <h3 style={{
              fontSize: "1.25rem",
              fontWeight: "600",
              color: "#111827",
              marginBottom: "0.5rem",
            }}>
              🔬 모델 평가
            </h3>
            <p style={{
              fontSize: "0.875rem",
              color: "#6b7280",
              lineHeight: "1.6",
            }}>
              벤치마크 데이터셋을 활용한 자동 평가
            </p>
          </div>
        </div>
      </section>

      <section style={{
        marginTop: "3rem",
        marginBottom: "3rem",
      }}>
        <h2 style={{
          fontSize: "1.875rem",
          fontWeight: "600",
          color: "#1f2937",
          marginBottom: "1.5rem",
        }}>
          시작하기
        </h2>
        <div style={{
          display: "flex",
          gap: "1rem",
          flexWrap: "wrap",
        }}>
          <Link
            href="/leaderboard"
            style={{
              display: "inline-block",
              padding: "0.75rem 1.5rem",
              backgroundColor: "#3b82f6",
              color: "#ffffff",
              textDecoration: "none",
              borderRadius: "0.5rem",
              fontWeight: "500",
              transition: "background-color 0.2s",
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#2563eb"}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#3b82f6"}
          >
            리더보드 보기
          </Link>
          <Link
            href="/guide"
            style={{
              display: "inline-block",
              padding: "0.75rem 1.5rem",
              backgroundColor: "#ffffff",
              color: "#3b82f6",
              textDecoration: "none",
              borderRadius: "0.5rem",
              fontWeight: "500",
              border: "1px solid #3b82f6",
              transition: "background-color 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#eff6ff";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#ffffff";
            }}
          >
            사용 가이드
          </Link>
          <Link
            href="/model/add"
            style={{
              display: "inline-block",
              padding: "0.75rem 1.5rem",
              backgroundColor: "#ffffff",
              color: "#3b82f6",
              textDecoration: "none",
              borderRadius: "0.5rem",
              fontWeight: "500",
              border: "1px solid #3b82f6",
              transition: "background-color 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#eff6ff";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#ffffff";
            }}
          >
            모델 등록
          </Link>
        </div>
      </section>

      {/* 하단 광고 - 충분한 콘텐츠 이후 배치 */}
      <AdSense 
        format="display" 
        responsive 
        style={{ margin: '40px auto', maxWidth: '728px' }}
        position="하단 배너 광고"
      />
    </div>
  );
}