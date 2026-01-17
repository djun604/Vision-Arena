import Guide from "@/components/Guide"

export default function GuidePage() {
  return (
    <div style={{ 
      maxWidth: "100%", 
      margin: "0 auto", 
      padding: "0.75rem 1rem",
    }}>
      <div style={{ marginBottom: "0.5rem" }}>
        <h1 style={{
          fontSize: "1.875rem",
          fontWeight: "600",
          color: "#111827",
          margin: 0,
          marginBottom: "0.5rem",
          lineHeight: "1.2",
        }}>
          Guide
        </h1>
        <p style={{
          fontSize: "1rem",
          color: "#6b7280",
          margin: 0,
        }}>
          모델 평가 워크플로우를 쉽게 따라해보세요.
        </p>
      </div>
      <Guide />
    </div>
  )
}

