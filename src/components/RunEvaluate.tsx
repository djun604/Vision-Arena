"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { VQGANModel } from "./ModelLeaderboard"
import { Play, CheckCircle2, XCircle, Loader2, Trash2 } from "lucide-react"

// Run 데이터 타입 정의
export type Run = {
  id: string
  modelId: string
  benchmarkId: string
  status: "pending" | "running" | "done" | "failed"
  startedAt: string
  finishedAt?: string
}

// Run Metric 데이터 타입 정의
export type RunMetric = {
  id: string
  runId: string
  metricName: string
  value: number
  split?: string
}

// 벤치마크용 데이터셋 정의
const BENCHMARK_DATASETS = [
  { id: "image_compression_kodak24", name: "Kodak24" },
  { id: "image_compression_cifar10", name: "CIFAR10" },
  { id: "image_compression_clic", name: "CLIC" },
]

export default function RunEvaluate() {
  const [models, setModels] = React.useState<VQGANModel[]>([])
  const [runs, setRuns] = React.useState<Run[]>([])
  const [runMetrics, setRunMetrics] = React.useState<RunMetric[]>([])
  const [selectedModelId, setSelectedModelId] = React.useState<string>("")
  const [selectedDatasetId, setSelectedDatasetId] = React.useState<string>("")
  const [isRunning, setIsRunning] = React.useState(false)

  // 모델 목록 로드
  const loadModels = React.useCallback(() => {
    if (typeof window !== "undefined") {
      // 샘플 데이터와 등록된 모델 합치기
      const sampleData: VQGANModel[] = [
        {
          id: "vqgan-1",
          modelName: "VQGAN-256",
          psnr: 32.5,
          ssim: 0.92,
          lpips: 0.08,
          fid: 15.2,
          compressionRatio: 12.5,
          bpp: 0.32,
          encodingTime: 45,
          decodingTime: 38,
          fps: 25,
          perplexity: 512,
        },
        {
          id: "vqgan-2",
          modelName: "VQGAN-512",
          psnr: 35.8,
          ssim: 0.95,
          lpips: 0.05,
          fid: 12.8,
          compressionRatio: 10.2,
          bpp: 0.39,
          encodingTime: 68,
          decodingTime: 52,
          fps: 18,
          perplexity: 768,
        },
        {
          id: "vqgan-3",
          modelName: "VQGAN-1024",
          psnr: 38.2,
          ssim: 0.97,
          lpips: 0.03,
          fid: 9.5,
          compressionRatio: 8.5,
          bpp: 0.47,
          encodingTime: 95,
          decodingTime: 78,
          fps: 12,
          perplexity: 1024,
        },
        {
          id: "vqgan-4",
          modelName: "VQGAN-Lite",
          psnr: 28.5,
          ssim: 0.88,
          lpips: 0.12,
          fid: 22.3,
          compressionRatio: 18.5,
          bpp: 0.22,
          encodingTime: 25,
          decodingTime: 20,
          fps: 40,
          perplexity: 256,
        },
        {
          id: "vqgan-5",
          modelName: "VQGAN-HQ",
          psnr: 40.1,
          ssim: 0.98,
          lpips: 0.02,
          fid: 7.2,
          compressionRatio: 6.8,
          bpp: 0.59,
          encodingTime: 120,
          decodingTime: 95,
          fps: 8,
          perplexity: 1536,
        },
      ]

      const storedModels = localStorage.getItem("vqganModels")
      let registeredModels: VQGANModel[] = []
      if (storedModels) {
        try {
          registeredModels = JSON.parse(storedModels)
        } catch (error) {
          console.error("Failed to parse stored models:", error)
        }
      }

      setModels([...sampleData, ...registeredModels])
    }
  }, [])

  // Runs 로드
  const loadRuns = React.useCallback(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("runs")
      if (stored) {
        try {
          setRuns(JSON.parse(stored))
        } catch (error) {
          console.error("Failed to parse runs:", error)
        }
      }
    }
  }, [])

  // Run Metrics 로드
  const loadRunMetrics = React.useCallback(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("runMetrics")
      if (stored) {
        try {
          setRunMetrics(JSON.parse(stored))
        } catch (error) {
          console.error("Failed to parse runMetrics:", error)
        }
      }
    }
  }, [])

  React.useEffect(() => {
    loadModels()
    loadRuns()
    loadRunMetrics()

    const handleModelUpdate = () => {
      loadModels()
    }
    window.addEventListener("modelRegistered", handleModelUpdate)

    return () => {
      window.removeEventListener("modelRegistered", handleModelUpdate)
    }
  }, [loadModels, loadRuns, loadRunMetrics])

  // 평가 실행 함수 (시뮬레이션)
  const handleRunEvaluation = async () => {
    if (!selectedModelId || !selectedDatasetId) {
      alert("모델과 벤치마크용 데이터셋을 선택해주세요.")
      return
    }

    const selectedModel = models.find((m) => m.id === selectedModelId)
    if (!selectedModel) {
      alert("선택한 모델을 찾을 수 없습니다.")
      return
    }

    // Run 생성
    const runId = `run_${Date.now()}`
    const newRun: Run = {
      id: runId,
      modelId: selectedModelId,
      benchmarkId: selectedDatasetId,
      status: "running",
      startedAt: new Date().toISOString(),
    }

    setIsRunning(true)
    setRuns((prev) => {
      const updated = [...prev, newRun]
      localStorage.setItem("runs", JSON.stringify(updated))
      return updated
    })

    // 시뮬레이션: 2-3초 대기 (실제로는 백엔드 API 호출)
    await new Promise((resolve) => setTimeout(resolve, 2000 + Math.random() * 1000))

    // 지표 계산 (실제로는 백엔드에서 계산하지만, 여기서는 모델의 기존 값에 약간의 변동 추가)
    const baseMetrics = {
      psnr: selectedModel.psnr + (Math.random() - 0.5) * 2,
      ssim: Math.min(1, selectedModel.ssim + (Math.random() - 0.5) * 0.1),
      lpips: Math.max(0, selectedModel.lpips + (Math.random() - 0.5) * 0.02),
      bpp: Math.max(0, selectedModel.bpp + (Math.random() - 0.5) * 0.05),
      compressionRatio: Math.max(0, selectedModel.compressionRatio + (Math.random() - 0.5) * 2),
    }

    // Run Metrics 저장
    const metrics: RunMetric[] = [
      { id: `${runId}_psnr`, runId, metricName: "psnr", value: baseMetrics.psnr },
      { id: `${runId}_ssim`, runId, metricName: "ssim", value: baseMetrics.ssim },
      { id: `${runId}_lpips`, runId, metricName: "lpips", value: baseMetrics.lpips },
      { id: `${runId}_bpp`, runId, metricName: "bpp", value: baseMetrics.bpp },
      { id: `${runId}_compressionRatio`, runId, metricName: "compressionRatio", value: baseMetrics.compressionRatio },
    ]

    setRunMetrics((prev) => {
      const updated = [...prev, ...metrics]
      localStorage.setItem("runMetrics", JSON.stringify(updated))
      return updated
    })

    // Run 상태 업데이트
    setRuns((prev) => {
      const updated = prev.map((r) =>
        r.id === runId
          ? { ...r, status: "done" as const, finishedAt: new Date().toISOString() }
          : r
      )
      localStorage.setItem("runs", JSON.stringify(updated))
      return updated
    })

    setIsRunning(false)

    // 모델 데이터 업데이트 (최신 run 결과로)
    const updatedModels = models.map((m) => {
      if (m.id === selectedModelId) {
        return {
          ...m,
          psnr: baseMetrics.psnr,
          ssim: baseMetrics.ssim,
          lpips: baseMetrics.lpips,
          bpp: baseMetrics.bpp,
          compressionRatio: baseMetrics.compressionRatio,
        }
      }
      return m
    })

    // 로컬 스토리지의 모델도 업데이트 (등록된 모델인 경우)
    const storedModels = localStorage.getItem("vqganModels")
    if (storedModels) {
      try {
        const registeredModels: VQGANModel[] = JSON.parse(storedModels)
        const updatedRegistered = registeredModels.map((m) => {
          if (m.id === selectedModelId) {
            return {
              ...m,
              psnr: baseMetrics.psnr,
              ssim: baseMetrics.ssim,
              lpips: baseMetrics.lpips,
              bpp: baseMetrics.bpp,
              compressionRatio: baseMetrics.compressionRatio,
            }
          }
          return m
        })
        localStorage.setItem("vqganModels", JSON.stringify(updatedRegistered))
      } catch (error) {
        console.error("Failed to update registered models:", error)
      }
    }

    // 리더보드 업데이트 이벤트 발생
    window.dispatchEvent(new Event("modelRegistered"))
  }

  // Run 삭제 함수
  const handleDeleteRun = (runId: string) => {
    if (!confirm("정말 이 실행 이력을 삭제하시겠습니까?")) {
      return
    }

    // Run 삭제
    setRuns((prev) => {
      const updated = prev.filter((r) => r.id !== runId)
      localStorage.setItem("runs", JSON.stringify(updated))
      return updated
    })

    // 관련 Run Metrics 삭제
    setRunMetrics((prev) => {
      const updated = prev.filter((rm) => rm.runId !== runId)
      localStorage.setItem("runMetrics", JSON.stringify(updated))
      return updated
    })
  }

  // Run 상태 아이콘
  const getStatusIcon = (status: Run["status"]) => {
    switch (status) {
      case "done":
        return <CheckCircle2 style={{ width: "1rem", height: "1rem", color: "#10b981" }} />
      case "failed":
        return <XCircle style={{ width: "1rem", height: "1rem", color: "#ef4444" }} />
      case "running":
        return <Loader2 style={{ width: "1rem", height: "1rem", color: "#3b82f6", animation: "spin 1s linear infinite" }} />
      default:
        return null
    }
  }

  // 최근 실행 결과 가져오기
  const getLatestRunResults = () => {
    const doneRuns = runs.filter((r) => r.status === "done").sort((a, b) => {
      const timeA = a.finishedAt ? new Date(a.finishedAt).getTime() : 0
      const timeB = b.finishedAt ? new Date(b.finishedAt).getTime() : 0
      return timeB - timeA
    })

    return doneRuns.slice(0, 10).map((run) => {
      const model = models.find((m) => m.id === run.modelId)
      const dataset = BENCHMARK_DATASETS.find((b) => b.id === run.benchmarkId)
      const metrics = runMetrics.filter((rm) => rm.runId === run.id)

      return {
        run,
        model,
        dataset,
        metrics: metrics.reduce((acc, m) => {
          acc[m.metricName] = m.value
          return acc
        }, {} as Record<string, number>),
      }
    })
  }

  const latestResults = getLatestRunResults()

  return (
    <div style={{ width: "100%" }}>
      {/* 실행 설정 영역 */}
      <div
        style={{
          backgroundColor: "#ffffff",
          padding: "2rem",
          borderRadius: "0.5rem",
          border: "1px solid #e5e7eb",
          marginBottom: "2rem",
        }}
      >
        <h2
          style={{
            fontSize: "1.25rem",
            fontWeight: "600",
            color: "#111827",
            marginBottom: "1.5rem",
          }}
        >
          평가 실행
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <div>
            <label
              style={{
                display: "block",
                fontSize: "0.875rem",
                fontWeight: "500",
                color: "#374151",
                marginBottom: "0.5rem",
              }}
            >
              모델 선택 <span style={{ color: "#ef4444" }}>*</span>
            </label>
            <select
              value={selectedModelId}
              onChange={(e) => setSelectedModelId(e.target.value)}
              disabled={isRunning}
              style={{
                width: "100%",
                height: "2.5rem",
                padding: "0 0.75rem",
                fontSize: "0.875rem",
                borderRadius: "0.375rem",
                border: "1px solid #e5e7eb",
                backgroundColor: isRunning ? "#f9fafb" : "#ffffff",
                cursor: isRunning ? "not-allowed" : "pointer",
                boxSizing: "border-box",
              }}
            >
              <option value="">모델을 선택하세요</option>
              {models.map((model) => (
                <option key={model.id} value={model.id}>
                  {model.modelName}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              style={{
                display: "block",
                fontSize: "0.875rem",
                fontWeight: "500",
                color: "#374151",
                marginBottom: "0.5rem",
              }}
            >
              벤치마크용 데이터셋 선택 <span style={{ color: "#ef4444" }}>*</span>
            </label>
            <select
              value={selectedDatasetId}
              onChange={(e) => setSelectedDatasetId(e.target.value)}
              disabled={isRunning}
              style={{
                width: "100%",
                height: "2.5rem",
                padding: "0 0.75rem",
                fontSize: "0.875rem",
                borderRadius: "0.375rem",
                border: "1px solid #e5e7eb",
                backgroundColor: isRunning ? "#f9fafb" : "#ffffff",
                cursor: isRunning ? "not-allowed" : "pointer",
                boxSizing: "border-box",
              }}
            >
              <option value="">벤치마크용 데이터셋을 선택하세요</option>
              {BENCHMARK_DATASETS.map((dataset) => (
                <option key={dataset.id} value={dataset.id}>
                  {dataset.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <Button
              onClick={handleRunEvaluation}
              disabled={!selectedModelId || !selectedDatasetId || isRunning}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                backgroundColor: "#000000",
                color: "#ffffff",
              }}
            >
              {isRunning ? (
                <>
                  <Loader2 style={{ width: "1rem", height: "1rem", animation: "spin 1s linear infinite" }} />
                  실행 중...
                </>
              ) : (
                <>
                  <Play style={{ width: "1rem", height: "1rem" }} />
                  평가 실행
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* 실행 이력 영역 */}
      <div
        style={{
          backgroundColor: "#ffffff",
          padding: "2rem",
          borderRadius: "0.5rem",
          border: "1px solid #e5e7eb",
          marginBottom: "2rem",
        }}
      >
        <h2
          style={{
            fontSize: "1.25rem",
            fontWeight: "600",
            color: "#111827",
            marginBottom: "1.5rem",
          }}
        >
          실행 이력
        </h2>
        {runs.length === 0 ? (
          <p style={{ fontSize: "0.875rem", color: "#6b7280", textAlign: "center", padding: "2rem" }}>
            실행된 평가가 없습니다.
          </p>
        ) : (
          <div
            style={{
              overflow: "hidden",
              borderRadius: "0.375rem",
              border: "1px solid #e5e7eb",
            }}
          >
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>모델</TableHead>
                  <TableHead>벤치마크용 데이터셋</TableHead>
                  <TableHead>상태</TableHead>
                  <TableHead>시작 시간</TableHead>
                  <TableHead>완료 시간</TableHead>
                  <TableHead style={{ textAlign: "center", width: "80px" }}>작업</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {runs
                  .sort((a, b) => new Date(b.startedAt).getTime() - new Date(a.startedAt).getTime())
                  .map((run) => {
                    const model = models.find((m) => m.id === run.modelId)
                    const dataset = BENCHMARK_DATASETS.find((b) => b.id === run.benchmarkId)
                    return (
                      <TableRow key={run.id}>
                        <TableCell style={{ fontWeight: "500" }}>
                          {model?.modelName || run.modelId}
                        </TableCell>
                        <TableCell>{dataset?.name || run.benchmarkId}</TableCell>
                        <TableCell>
                          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                            {getStatusIcon(run.status)}
                            <span
                              style={{
                                fontSize: "0.875rem",
                                color:
                                  run.status === "done"
                                    ? "#10b981"
                                    : run.status === "failed"
                                    ? "#ef4444"
                                    : run.status === "running"
                                    ? "#3b82f6"
                                    : "#6b7280",
                              }}
                            >
                              {run.status === "done"
                                ? "완료"
                                : run.status === "failed"
                                ? "실패"
                                : run.status === "running"
                                ? "실행 중"
                                : "대기 중"}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell style={{ fontSize: "0.875rem", color: "#6b7280" }}>
                          {new Date(run.startedAt).toLocaleString("ko-KR")}
                        </TableCell>
                        <TableCell style={{ fontSize: "0.875rem", color: "#6b7280" }}>
                          {run.finishedAt ? new Date(run.finishedAt).toLocaleString("ko-KR") : "-"}
                        </TableCell>
                        <TableCell style={{ textAlign: "center" }}>
                          <button
                            onClick={() => handleDeleteRun(run.id)}
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              justifyContent: "center",
                              width: "2rem",
                              height: "2rem",
                              padding: 0,
                              border: "none",
                              backgroundColor: "transparent",
                              color: "#ef4444",
                              cursor: "pointer",
                              borderRadius: "0.375rem",
                              transition: "all 0.15s ease-in-out",
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor = "#fef2f2"
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor = "transparent"
                            }}
                            title="삭제"
                          >
                            <Trash2 style={{ width: "1rem", height: "1rem" }} />
                          </button>
                        </TableCell>
                      </TableRow>
                    )
                  })}
              </TableBody>
            </Table>
          </div>
        )}
      </div>

      {/* 최근 결과 영역 */}
      {latestResults.length > 0 && (
        <div
          style={{
            backgroundColor: "#ffffff",
            padding: "2rem",
            borderRadius: "0.5rem",
            border: "1px solid #e5e7eb",
          }}
        >
          <h2
            style={{
              fontSize: "1.25rem",
              fontWeight: "600",
              color: "#111827",
              marginBottom: "1.5rem",
            }}
          >
            최근 평가 결과
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {latestResults.map((result) => (
              <div
                key={result.run.id}
                style={{
                  padding: "1.5rem",
                  borderRadius: "0.5rem",
                  border: "1px solid #e5e7eb",
                  backgroundColor: "#f9fafb",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: "1rem", fontWeight: "600", color: "#111827", margin: 0 }}>
                      {result.model?.modelName || result.run.modelId}
                    </h3>
                    <p style={{ fontSize: "0.875rem", color: "#6b7280", margin: "0.25rem 0 0 0" }}>
                      {result.dataset?.name || result.run.benchmarkId}
                    </p>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                    <div style={{ fontSize: "0.875rem", color: "#6b7280" }}>
                      {result.run.finishedAt
                        ? new Date(result.run.finishedAt).toLocaleString("ko-KR")
                        : ""}
                    </div>
                    <button
                      onClick={() => handleDeleteRun(result.run.id)}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "2rem",
                        height: "2rem",
                        padding: 0,
                        border: "none",
                        backgroundColor: "transparent",
                        color: "#ef4444",
                        cursor: "pointer",
                        borderRadius: "0.375rem",
                        transition: "all 0.15s ease-in-out",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = "#fef2f2"
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "transparent"
                      }}
                      title="삭제"
                    >
                      <Trash2 style={{ width: "1rem", height: "1rem" }} />
                    </button>
                  </div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: "1rem" }}>
                  {result.metrics.psnr !== undefined && (
                    <div>
                      <div style={{ fontSize: "0.75rem", color: "#6b7280", marginBottom: "0.25rem" }}>PSNR</div>
                      <div style={{ fontSize: "1rem", fontWeight: "600", color: "#111827" }}>
                        {result.metrics.psnr.toFixed(2)} dB
                      </div>
                    </div>
                  )}
                  {result.metrics.ssim !== undefined && (
                    <div>
                      <div style={{ fontSize: "0.75rem", color: "#6b7280", marginBottom: "0.25rem" }}>SSIM</div>
                      <div style={{ fontSize: "1rem", fontWeight: "600", color: "#111827" }}>
                        {result.metrics.ssim.toFixed(3)}
                      </div>
                    </div>
                  )}
                  {result.metrics.lpips !== undefined && (
                    <div>
                      <div style={{ fontSize: "0.75rem", color: "#6b7280", marginBottom: "0.25rem" }}>LPIPS</div>
                      <div style={{ fontSize: "1rem", fontWeight: "600", color: "#111827" }}>
                        {result.metrics.lpips.toFixed(3)}
                      </div>
                    </div>
                  )}
                  {result.metrics.bpp !== undefined && (
                    <div>
                      <div style={{ fontSize: "0.75rem", color: "#6b7280", marginBottom: "0.25rem" }}>bpp</div>
                      <div style={{ fontSize: "1rem", fontWeight: "600", color: "#111827" }}>
                        {result.metrics.bpp.toFixed(3)}
                      </div>
                    </div>
                  )}
                  {result.metrics.compressionRatio !== undefined && (
                    <div>
                      <div style={{ fontSize: "0.75rem", color: "#6b7280", marginBottom: "0.25rem" }}>압축률</div>
                      <div style={{ fontSize: "1rem", fontWeight: "600", color: "#111827" }}>
                        {result.metrics.compressionRatio.toFixed(2)}x
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

