export default function ContactPage() {
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
        문의하기
      </h1>

      <p style={{
        fontSize: "1.125rem",
        color: "#4b5563",
        marginBottom: "3rem",
      }}>
        Vision Arena에 대한 문의사항, 제안사항, 또는 버그 리포트가 있으시면 언제든지 연락해 주세요. 
        빠른 시일 내에 답변드리겠습니다.
      </p>

      <section style={{
        marginBottom: "3rem",
        padding: "2rem",
        backgroundColor: "#f9fafb",
        borderRadius: "0.5rem",
        border: "1px solid #e5e7eb",
      }}>
        <h2 style={{
          fontSize: "1.5rem",
          fontWeight: "600",
          color: "#1f2937",
          marginBottom: "1.5rem",
        }}>
          연락 방법
        </h2>
        
        <div style={{ marginBottom: "2rem" }}>
          <h3 style={{
            fontSize: "1.25rem",
            fontWeight: "600",
            color: "#111827",
            marginBottom: "0.5rem",
          }}>
            이메일
          </h3>
          <p style={{
            fontSize: "1rem",
            color: "#4b5563",
            marginBottom: "0.5rem",
          }}>
            일반 문의 및 기술 지원:
          </p>
          <p style={{
            fontSize: "1.125rem",
            color: "#3b82f6",
            fontWeight: "500",
          }}>
            support@visionarena.dev
          </p>
        </div>

        <div style={{ marginBottom: "2rem" }}>
          <h3 style={{
            fontSize: "1.25rem",
            fontWeight: "600",
            color: "#111827",
            marginBottom: "0.5rem",
          }}>
            사업자 정보
          </h3>
          <p style={{
            fontSize: "1rem",
            color: "#4b5563",
            marginBottom: "0.5rem",
          }}>
            Vision Arena는 연구 및 교육 목적으로 운영되는 오픈소스 프로젝트입니다.
          </p>
        </div>
      </section>

      <section style={{
        marginBottom: "3rem",
        padding: "2rem",
        backgroundColor: "#eff6ff",
        borderRadius: "0.5rem",
        border: "1px solid #bfdbfe",
      }}>
        <h2 style={{
          fontSize: "1.5rem",
          fontWeight: "600",
          color: "#1f2937",
          marginBottom: "1.5rem",
        }}>
          자주 묻는 질문 (FAQ)
        </h2>
        
        <div style={{ marginBottom: "2rem" }}>
          <h3 style={{
            fontSize: "1.125rem",
            fontWeight: "600",
            color: "#111827",
            marginBottom: "0.5rem",
          }}>
            Q: 모델을 등록하려면 어떻게 해야 하나요?
          </h3>
          <p style={{
            fontSize: "1rem",
            color: "#4b5563",
          }}>
            A: 상단 메뉴의 "Model" → "Add" 페이지에서 모델 정보를 입력하고 등록할 수 있습니다. 
            자세한 내용은 <a href="/guide" style={{ color: "#3b82f6", textDecoration: "none" }}>Guide 페이지</a>를 참고해 주세요.
          </p>
        </div>

        <div style={{ marginBottom: "2rem" }}>
          <h3 style={{
            fontSize: "1.125rem",
            fontWeight: "600",
            color: "#111827",
            marginBottom: "0.5rem",
          }}>
            Q: 평가 결과는 언제 반영되나요?
          </h3>
          <p style={{
            fontSize: "1rem",
            color: "#4b5563",
          }}>
            A: 평가 작업이 완료되면 자동으로 리더보드에 반영됩니다. 평가 진행 상황은 "Run / Evaluate" 페이지에서 확인할 수 있습니다.
          </p>
        </div>

        <div style={{ marginBottom: "2rem" }}>
          <h3 style={{
            fontSize: "1.125rem",
            fontWeight: "600",
            color: "#111827",
            marginBottom: "0.5rem",
          }}>
            Q: 개인정보는 어떻게 보호되나요?
          </h3>
          <p style={{
            fontSize: "1rem",
            color: "#4b5563",
          }}>
            A: 개인정보 보호에 대한 자세한 내용은 <a href="/privacy" style={{ color: "#3b82f6", textDecoration: "none" }}>개인정보보호정책</a>을 참고해 주세요.
          </p>
        </div>
      </section>

      <section style={{
        padding: "2rem",
        backgroundColor: "#f0fdf4",
        borderRadius: "0.5rem",
        border: "1px solid #86efac",
      }}>
        <h2 style={{
          fontSize: "1.5rem",
          fontWeight: "600",
          color: "#1f2937",
          marginBottom: "1rem",
        }}>
          기여하기
        </h2>
        <p style={{
          fontSize: "1rem",
          color: "#166534",
          marginBottom: "1rem",
        }}>
          Vision Arena는 오픈소스 프로젝트입니다. 버그 리포트, 기능 제안, 코드 기여 등을 환영합니다. 
          GitHub 저장소를 통해 기여해 주세요.
        </p>
      </section>
    </div>
  );
}

