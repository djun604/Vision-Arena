'use client';

import AdSense from "@/components/AdSense";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
      {/* Hero Section */}
      <section style={{
        position: 'relative',
        marginBottom: "4rem",
        padding: "4rem 2rem",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        borderRadius: "1rem",
        overflow: "hidden",
        color: "#ffffff",
      }}>
        <div style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: "1000px",
          margin: "0 auto",
        }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "2rem",
            flexWrap: "wrap",
          }}>
            <div style={{ flex: "1", minWidth: "300px" }}>
              <h1 style={{
                fontSize: "3.5rem",
                fontWeight: "800",
                color: "#ffffff",
                marginBottom: "1.5rem",
                lineHeight: "1.1",
                letterSpacing: "-0.02em",
              }}>
                Vision Arena
              </h1>
              <h2 style={{
                fontSize: "2rem",
                fontWeight: "600",
                color: "#f3f4f6",
                marginBottom: "1.5rem",
                lineHeight: "1.3",
              }}>
                AI 비전 모델 벤치마크 플랫폼
              </h2>
              <p style={{
                fontSize: "1.25rem",
                color: "#e5e7eb",
                lineHeight: "1.8",
                marginBottom: "2rem",
              }}>
                다양한 양자화 및 압축 기술을 가진 AI 비전 모델들의 성능을 체계적으로 분석하고 비교하는 통합 벤치마크 플랫폼입니다.
              </p>
              <div style={{
                display: "flex",
                gap: "1rem",
                flexWrap: "wrap",
              }}>
                <Link
                  href="/leaderboard"
                  style={{
                    display: "inline-block",
                    padding: "1rem 2rem",
                    backgroundColor: "#ffffff",
                    color: "#667eea",
                    textDecoration: "none",
                    borderRadius: "0.75rem",
                    fontWeight: "600",
                    fontSize: "1.125rem",
                    transition: "all 0.3s ease",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow = "0 8px 12px rgba(0, 0, 0, 0.15)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
                  }}
                >
                  리더보드 탐색하기 →
                </Link>
                <Link
                  href="/guide"
                  style={{
                    display: "inline-block",
                    padding: "1rem 2rem",
                    backgroundColor: "transparent",
                    color: "#ffffff",
                    textDecoration: "none",
                    borderRadius: "0.75rem",
                    fontWeight: "600",
                    fontSize: "1.125rem",
                    border: "2px solid #ffffff",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#ffffff";
                    e.currentTarget.style.color = "#667eea";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.color = "#ffffff";
                  }}
                >
                  사용 가이드
                </Link>
              </div>
            </div>
            <div style={{
              flex: "1",
              minWidth: "300px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}>
              <div style={{
                width: "100%",
                maxWidth: "500px",
                height: "400px",
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                borderRadius: "1rem",
                backdropFilter: "blur(10px)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "1px solid rgba(255, 255, 255, 0.2)",
              }}>
                <svg width="300" height="300" viewBox="0 0 200 200" style={{ opacity: 0.9 }}>
                  <defs>
                    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{ stopColor: "#ffffff", stopOpacity: 0.8 }} />
                      <stop offset="100%" style={{ stopColor: "#ffffff", stopOpacity: 0.4 }} />
                    </linearGradient>
                  </defs>
                  <circle cx="100" cy="100" r="80" fill="none" stroke="url(#grad1)" strokeWidth="3" opacity="0.5" />
                  <circle cx="100" cy="100" r="60" fill="none" stroke="url(#grad1)" strokeWidth="2" opacity="0.5" />
                  <circle cx="100" cy="100" r="40" fill="url(#grad1)" opacity="0.3" />
                  <path d="M 100 20 L 120 80 L 180 80 L 130 120 L 150 180 L 100 140 L 50 180 L 70 120 L 20 80 L 80 80 Z" 
                        fill="url(#grad1)" opacity="0.6" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)",
          pointerEvents: 'none',
        }} />
      </section>

      {/* 상단 광고 */}
      <AdSense 
        format="display" 
        responsive 
        style={{ margin: '30px auto', maxWidth: '728px' }}
        position="상단 배너 광고"
      />

      {/* 주요 기능 섹션 */}
      <section style={{
        marginTop: "4rem",
        marginBottom: "4rem",
      }}>
        <div style={{
          textAlign: "center",
          marginBottom: "3rem",
        }}>
          <h2 style={{
            fontSize: "2.5rem",
            fontWeight: "700",
            color: "#111827",
            marginBottom: "1rem",
          }}>
            주요 기능
          </h2>
          <p style={{
            fontSize: "1.125rem",
            color: "#6b7280",
            maxWidth: "600px",
            margin: "0 auto",
          }}>
            AI 비전 모델의 성능을 체계적으로 평가하고 비교할 수 있는 강력한 도구들을 제공합니다
          </p>
        </div>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "2rem",
        }}>
          <div style={{
            padding: "2.5rem",
            backgroundColor: "#ffffff",
            borderRadius: "1rem",
            border: "1px solid #e5e7eb",
            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
            transition: "all 0.3s ease",
            position: "relative",
            overflow: "hidden",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-8px)";
            e.currentTarget.style.boxShadow = "0 12px 24px rgba(0, 0, 0, 0.15)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 1px 3px rgba(0, 0, 0, 0.1)";
          }}
          >
            <div style={{
              width: "80px",
              height: "80px",
              backgroundColor: "#eff6ff",
              borderRadius: "1rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "1.5rem",
            }}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2">
                <path d="M3 3v18h18"></path>
                <path d="M7 16l4-4 4 4 6-6"></path>
                <path d="M21 12h-4"></path>
              </svg>
            </div>
            <h3 style={{
              fontSize: "1.5rem",
              fontWeight: "600",
              color: "#111827",
              marginBottom: "0.75rem",
            }}>
              통합 리더보드
            </h3>
            <p style={{
              fontSize: "1rem",
              color: "#6b7280",
              lineHeight: "1.7",
            }}>
              카테고리별 모델 성능 비교 및 순위 확인. 실시간 업데이트되는 성능 지표와 상세한 통계를 제공합니다.
            </p>
          </div>
          <div style={{
            padding: "2.5rem",
            backgroundColor: "#ffffff",
            borderRadius: "1rem",
            border: "1px solid #e5e7eb",
            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-8px)";
            e.currentTarget.style.boxShadow = "0 12px 24px rgba(0, 0, 0, 0.15)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 1px 3px rgba(0, 0, 0, 0.1)";
          }}
          >
            <div style={{
              width: "80px",
              height: "80px",
              backgroundColor: "#f0fdf4",
              borderRadius: "1rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "1.5rem",
            }}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2">
                <path d="M3 3v18h18"></path>
                <path d="M18.7 8l-5.1 5.2-2.8-2.7L6 14.3"></path>
              </svg>
            </div>
            <h3 style={{
              fontSize: "1.5rem",
              fontWeight: "600",
              color: "#111827",
              marginBottom: "0.75rem",
            }}>
              성능 시각화
            </h3>
            <p style={{
              fontSize: "1rem",
              color: "#6b7280",
              lineHeight: "1.7",
            }}>
              레이더 차트 및 다중 성능 차트 제공. 직관적인 그래프와 차트로 모델의 강점과 약점을 한눈에 파악할 수 있습니다.
            </p>
          </div>
          <div style={{
            padding: "2.5rem",
            backgroundColor: "#ffffff",
            borderRadius: "1rem",
            border: "1px solid #e5e7eb",
            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-8px)";
            e.currentTarget.style.boxShadow = "0 12px 24px rgba(0, 0, 0, 0.15)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 1px 3px rgba(0, 0, 0, 0.1)";
          }}
          >
            <div style={{
              width: "80px",
              height: "80px",
              backgroundColor: "#fef3c7",
              borderRadius: "1rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "1.5rem",
            }}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M12 6v6l4 2"></path>
              </svg>
            </div>
            <h3 style={{
              fontSize: "1.5rem",
              fontWeight: "600",
              color: "#111827",
              marginBottom: "0.75rem",
            }}>
              모델 평가
            </h3>
            <p style={{
              fontSize: "1rem",
              color: "#6b7280",
              lineHeight: "1.7",
            }}>
              벤치마크 데이터셋을 활용한 자동 평가. 표준화된 테스트 환경에서 모델의 성능을 객관적으로 측정합니다.
            </p>
          </div>
        </div>
      </section>

      {/* 통계 섹션 */}
      <section style={{
        marginTop: "4rem",
        marginBottom: "4rem",
        padding: "3rem 2rem",
        background: "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)",
        borderRadius: "1rem",
      }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "2rem",
          textAlign: "center",
        }}>
          <div>
            <div style={{
              fontSize: "3rem",
              fontWeight: "700",
              color: "#3b82f6",
              marginBottom: "0.5rem",
            }}>
              100+
            </div>
            <div style={{
              fontSize: "1.125rem",
              color: "#6b7280",
              fontWeight: "500",
            }}>
              평가된 모델
            </div>
          </div>
          <div>
            <div style={{
              fontSize: "3rem",
              fontWeight: "700",
              color: "#3b82f6",
              marginBottom: "0.5rem",
            }}>
              8
            </div>
            <div style={{
              fontSize: "1.125rem",
              color: "#6b7280",
              fontWeight: "500",
            }}>
              평가 카테고리
            </div>
          </div>
          <div>
            <div style={{
              fontSize: "3rem",
              fontWeight: "700",
              color: "#3b82f6",
              marginBottom: "0.5rem",
            }}>
              24/7
            </div>
            <div style={{
              fontSize: "1.125rem",
              color: "#6b7280",
              fontWeight: "500",
            }}>
              자동 평가
            </div>
          </div>
          <div>
            <div style={{
              fontSize: "3rem",
              fontWeight: "700",
              color: "#3b82f6",
              marginBottom: "0.5rem",
            }}>
              실시간
            </div>
            <div style={{
              fontSize: "1.125rem",
              color: "#6b7280",
              fontWeight: "500",
            }}>
              업데이트
            </div>
          </div>
        </div>
      </section>

      {/* 시작하기 섹션 */}
      <section style={{
        marginTop: "4rem",
        marginBottom: "4rem",
        textAlign: "center",
      }}>
        <h2 style={{
          fontSize: "2.5rem",
          fontWeight: "700",
          color: "#111827",
          marginBottom: "1rem",
        }}>
          지금 시작하세요
        </h2>
        <p style={{
          fontSize: "1.125rem",
          color: "#6b7280",
          marginBottom: "2.5rem",
          maxWidth: "600px",
          margin: "0 auto 2.5rem",
        }}>
          Vision Arena에서 AI 비전 모델의 성능을 평가하고 비교해보세요
        </p>
        <div style={{
          display: "flex",
          gap: "1rem",
          justifyContent: "center",
          flexWrap: "wrap",
        }}>
          <Link
            href="/leaderboard"
            style={{
              display: "inline-block",
              padding: "1rem 2.5rem",
              backgroundColor: "#3b82f6",
              color: "#ffffff",
              textDecoration: "none",
              borderRadius: "0.75rem",
              fontWeight: "600",
              fontSize: "1.125rem",
              transition: "all 0.3s ease",
              boxShadow: "0 4px 6px rgba(59, 130, 246, 0.3)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#2563eb";
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 8px 12px rgba(59, 130, 246, 0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#3b82f6";
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 6px rgba(59, 130, 246, 0.3)";
            }}
          >
            리더보드 보기
          </Link>
          <Link
            href="/guide"
            style={{
              display: "inline-block",
              padding: "1rem 2.5rem",
              backgroundColor: "#ffffff",
              color: "#3b82f6",
              textDecoration: "none",
              borderRadius: "0.75rem",
              fontWeight: "600",
              fontSize: "1.125rem",
              border: "2px solid #3b82f6",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#eff6ff";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#ffffff";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            사용 가이드
          </Link>
          <Link
            href="/model/add"
            style={{
              display: "inline-block",
              padding: "1rem 2.5rem",
              backgroundColor: "#ffffff",
              color: "#3b82f6",
              textDecoration: "none",
              borderRadius: "0.75rem",
              fontWeight: "600",
              fontSize: "1.125rem",
              border: "2px solid #3b82f6",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#eff6ff";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#ffffff";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            모델 등록
          </Link>
        </div>
      </section>

      {/* 하단 광고 */}
      <AdSense 
        format="display" 
        responsive 
        style={{ margin: '40px auto', maxWidth: '728px' }}
        position="하단 배너 광고"
      />
    </div>
  );
}
