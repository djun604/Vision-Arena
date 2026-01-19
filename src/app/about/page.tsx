export default function AboutPage() {
  return (
    <div style={{ 
      maxWidth: "900px", 
      margin: "0 auto", 
      padding: "2rem 1rem",
      lineHeight: "1.8",
    }}>
      <h1 style={{
        fontSize: "2.5rem",
        fontWeight: "700",
        color: "#111827",
        marginBottom: "1.5rem",
        lineHeight: "1.2",
      }}>
        About Vision Arena
      </h1>

      <section style={{ marginBottom: "3rem" }}>
        <h2 style={{
          fontSize: "1.875rem",
          fontWeight: "600",
          color: "#1f2937",
          marginBottom: "1rem",
          marginTop: "2rem",
        }}>
          우리의 미션
        </h2>
        <p style={{
          fontSize: "1.125rem",
          color: "#4b5563",
          marginBottom: "1rem",
        }}>
          Vision Arena는 AI 비전 모델의 성능을 평가하고 비교할 수 있는 통합 벤치마크 플랫폼입니다. 
          연구자와 개발자들이 다양한 양자화 및 압축 기술을 가진 모델들의 성능을 체계적으로 분석하고 
          비교할 수 있도록 지원합니다.
        </p>
        <p style={{
          fontSize: "1.125rem",
          color: "#4b5563",
          marginBottom: "1rem",
        }}>
          우리는 AI 기술의 발전과 함께 양자화(Quantization) 기술의 중요성이 커지고 있음을 인식하고, 
          이러한 모델들의 성능을 표준화된 방식으로 평가할 수 있는 플랫폼의 필요성을 느꼈습니다.
        </p>
      </section>

      <section style={{ marginBottom: "3rem" }}>
        <h2 style={{
          fontSize: "1.875rem",
          fontWeight: "600",
          color: "#1f2937",
          marginBottom: "1rem",
          marginTop: "2rem",
        }}>
          주요 기능
        </h2>
        <ul style={{
          listStyle: "none",
          padding: 0,
          margin: 0,
        }}>
          <li style={{
            marginBottom: "1.5rem",
            paddingLeft: "1.5rem",
            position: "relative",
          }}>
            <span style={{
              position: "absolute",
              left: 0,
              color: "#3b82f6",
              fontSize: "1.5rem",
            }}>✓</span>
            <h3 style={{
              fontSize: "1.25rem",
              fontWeight: "600",
              color: "#111827",
              marginBottom: "0.5rem",
            }}>
              통합 리더보드
            </h3>
            <p style={{
              fontSize: "1rem",
              color: "#6b7280",
            }}>
              다양한 카테고리(Text, Vision, Text-to-Image 등)별로 모델의 성능을 비교하고 순위를 확인할 수 있습니다. 
              레이더 차트와 다중 성능 차트를 통해 모델의 강점과 약점을 직관적으로 파악할 수 있습니다.
            </p>
          </li>
          <li style={{
            marginBottom: "1.5rem",
            paddingLeft: "1.5rem",
            position: "relative",
          }}>
            <span style={{
              position: "absolute",
              left: 0,
              color: "#3b82f6",
              fontSize: "1.5rem",
            }}>✓</span>
            <h3 style={{
              fontSize: "1.25rem",
              fontWeight: "600",
              color: "#111827",
              marginBottom: "0.5rem",
            }}>
              종합 성능 평가
            </h3>
            <p style={{
              fontSize: "1rem",
              color: "#6b7280",
            }}>
              화질 지표(PSNR, SSIM, LPIPS, FID), 압축 지표(압축률, bpp), 속도 지표(인코딩/디코딩 시간, FPS), 
              내부 지표(Perplexity)를 종합적으로 평가하여 모델의 전반적인 성능을 분석합니다.
            </p>
          </li>
          <li style={{
            marginBottom: "1.5rem",
            paddingLeft: "1.5rem",
            position: "relative",
          }}>
            <span style={{
              position: "absolute",
              left: 0,
              color: "#3b82f6",
              fontSize: "1.5rem",
            }}>✓</span>
            <h3 style={{
              fontSize: "1.25rem",
              fontWeight: "600",
              color: "#111827",
              marginBottom: "0.5rem",
            }}>
              벤치마크 데이터셋
            </h3>
            <p style={{
              fontSize: "1rem",
              color: "#6b7280",
            }}>
              Kodak24, CIFAR10, CLIC 등 표준 벤치마크 데이터셋을 활용하여 일관된 평가 기준을 제공합니다.
            </p>
          </li>
          <li style={{
            marginBottom: "1.5rem",
            paddingLeft: "1.5rem",
            position: "relative",
          }}>
            <span style={{
              position: "absolute",
              left: 0,
              color: "#3b82f6",
              fontSize: "1.5rem",
            }}>✓</span>
            <h3 style={{
              fontSize: "1.25rem",
              fontWeight: "600",
              color: "#111827",
              marginBottom: "0.5rem",
            }}>
              모델 등록 및 평가
            </h3>
            <p style={{
              fontSize: "1rem",
              color: "#6b7280",
            }}>
              새로운 모델을 등록하고 벤치마크 데이터셋을 선택하여 평가 작업을 실행할 수 있습니다. 
              평가 결과는 자동으로 리더보드에 반영됩니다.
            </p>
          </li>
        </ul>
      </section>

      <section style={{ marginBottom: "3rem" }}>
        <h2 style={{
          fontSize: "1.875rem",
          fontWeight: "600",
          color: "#1f2937",
          marginBottom: "1rem",
          marginTop: "2rem",
        }}>
          기술 스택
        </h2>
        <p style={{
          fontSize: "1rem",
          color: "#4b5563",
          marginBottom: "1rem",
        }}>
          Vision Arena는 Next.js 14, React 18, TypeScript를 기반으로 구축되었으며, 
          Plotly.js와 Recharts를 활용한 고급 데이터 시각화 기능을 제공합니다. 
          Cloudflare Pages를 통해 글로벌 CDN으로 빠르고 안정적인 서비스를 제공합니다.
        </p>
      </section>

      <section style={{
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
          marginBottom: "1rem",
        }}>
          문의하기
        </h2>
        <p style={{
          fontSize: "1rem",
          color: "#4b5563",
          marginBottom: "1rem",
        }}>
          Vision Arena에 대한 문의사항이나 제안사항이 있으시면 언제든지 연락해 주세요.
        </p>
        <p style={{
          fontSize: "1rem",
          color: "#4b5563",
        }}>
          <a 
            href="/contact" 
            style={{
              color: "#3b82f6",
              textDecoration: "none",
              fontWeight: "500",
            }}
          >
            연락처 페이지로 이동 →
          </a>
        </p>
      </section>
    </div>
  );
}

