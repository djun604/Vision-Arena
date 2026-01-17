import RunEvaluate from "@/components/RunEvaluate"

export default function RunEvaluatePage() {
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
          Run / Evaluate
        </h1>
        <p style={{
          fontSize: "1rem",
          color: "#6b7280",
          margin: 0,
        }}>
          모델을 실행하고 평가할 수 있습니다.
        </p>
      </div>
      <RunEvaluate />
    </div>
  )
}

