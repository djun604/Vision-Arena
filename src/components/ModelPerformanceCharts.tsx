"use client"

import * as React from "react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  ErrorBar,
  Cell,
  ReferenceLine,
} from "recharts"
import { VQGANModel } from "./ModelLeaderboard"
import { modelGradientColors, metricColors } from "./chartColors"

interface ModelPerformanceChartsProps {
  data: VQGANModel[]
  allData?: VQGANModel[]
}

// 종합 점수 계산 함수
const calculateOverallScore = (model: VQGANModel, allData: VQGANModel[]) => {
  // 각 지표를 0-100으로 정규화
  const normalize = (value: number, min: number, max: number, reverse: boolean = false) => {
    if (max === min) return 50
    const normalized = ((value - min) / (max - min)) * 100
    return reverse ? 100 - normalized : normalized
  }

  const psnrValues = allData.map((d) => d.psnr)
  const ssimValues = allData.map((d) => d.ssim)
  const lpipsValues = allData.map((d) => d.lpips)
  const compressionValues = allData.map((d) => d.compressionRatio)
  const fpsValues = allData.map((d) => d.fps)
  const encodingValues = allData.map((d) => d.encodingTime)
  const decodingValues = allData.map((d) => d.decodingTime)

  const psnrScore = normalize(model.psnr, Math.min(...psnrValues), Math.max(...psnrValues))
  const ssimScore = normalize(model.ssim, Math.min(...ssimValues), Math.max(...ssimValues))
  const lpipsScore = normalize(model.lpips, Math.min(...lpipsValues), Math.max(...lpipsValues), true)
  const compressionScore = normalize(model.compressionRatio, Math.min(...compressionValues), Math.max(...compressionValues))
  const fpsScore = normalize(model.fps, Math.min(...fpsValues), Math.max(...fpsValues))
  const encodingScore = normalize(model.encodingTime, Math.min(...encodingValues), Math.max(...encodingValues), true)
  const decodingScore = normalize(model.decodingTime, Math.min(...decodingValues), Math.max(...decodingValues), true)

  // 가중 평균 (화질 40%, 압축 20%, 속도 40%)
  return (
    psnrScore * 0.15 +
    ssimScore * 0.15 +
    lpipsScore * 0.10 +
    compressionScore * 0.20 +
    fpsScore * 0.20 +
    encodingScore * 0.10 +
    decodingScore * 0.10
  )
}

export default function ModelPerformanceCharts({ data, allData }: ModelPerformanceChartsProps) {
  const dataset = allData && allData.length > 0 ? allData : data

  if (data.length === 0) {
    return null
  }

  // 종합 점수 데이터
  const overallScoreData = React.useMemo(() => {
    return data
      .map((model) => ({
        name: model.modelName,
        score: calculateOverallScore(model, dataset),
        color: modelGradientColors[data.indexOf(model) % modelGradientColors.length],
      }))
      .sort((a, b) => b.score - a.score)
  }, [data, dataset])

  // 지표별 평균 및 표준편차 (정규화된 값과 원본 값 모두 포함)
  const metricStats = React.useMemo(() => {
    const metrics = ["PSNR", "SSIM", "LPIPS", "압축률", "FPS"] as const
    const allDataValues = dataset.map((m) => ({
      psnr: m.psnr,
      ssim: m.ssim * 100,
      lpips: m.lpips * 100,
      compressionRatio: m.compressionRatio,
      fps: m.fps,
    }))

    return metrics.map((metric) => {
      let values: number[] = []
      let allValues: number[] = []
      
      switch (metric) {
        case "PSNR":
          values = data.map((m) => m.psnr)
          allValues = allDataValues.map((v) => v.psnr)
          break
        case "SSIM":
          values = data.map((m) => m.ssim * 100)
          allValues = allDataValues.map((v) => v.ssim)
          break
        case "LPIPS":
          values = data.map((m) => m.lpips * 100)
          allValues = allDataValues.map((v) => v.lpips)
          break
        case "압축률":
          values = data.map((m) => m.compressionRatio)
          allValues = allDataValues.map((v) => v.compressionRatio)
          break
        case "FPS":
          values = data.map((m) => m.fps)
          allValues = allDataValues.map((v) => v.fps)
          break
      }

      const min = Math.min(...allValues)
      const max = Math.max(...allValues)
      const mean = values.reduce((a, b) => a + b, 0) / values.length
      const variance = values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / values.length
      const stdDev = Math.sqrt(variance)

      // 정규화 함수 (0-100 스케일)
      const normalize = (value: number) => {
        if (max === min) return 50
        return ((value - min) / (max - min)) * 100
      }

      return {
        metric,
        mean,
        stdDev,
        min,
        max,
        normalizedMean: normalize(mean),
        values: data.map((model, index) => ({
          name: model.modelName,
          value: values[index], // 원본 값
          normalizedValue: normalize(values[index]), // 정규화된 값 (0-100)
          color: modelGradientColors[index % modelGradientColors.length],
        })),
      }
    })
  }, [data, dataset])

  // 모델 간 비교 매트릭스 데이터 (각 지표별로 모델 A가 모델 B보다 우수한지)
  const comparisonMatrix = React.useMemo(() => {
    const metrics = [
      { key: "PSNR", getValue: (m: VQGANModel) => m.psnr, higher: true },
      { key: "SSIM", getValue: (m: VQGANModel) => m.ssim, higher: true },
      { key: "LPIPS", getValue: (m: VQGANModel) => m.lpips, higher: false },
      { key: "FPS", getValue: (m: VQGANModel) => m.fps, higher: true },
    ]

    return data.map((modelA, indexA) => {
      const row: any = { modelName: modelA.modelName }
      data.forEach((modelB, indexB) => {
        if (indexA === indexB) {
          row[modelB.modelName] = 0.5 // 자기 자신
        } else {
          let wins = 0
          metrics.forEach((metric) => {
            const valueA = metric.getValue(modelA)
            const valueB = metric.getValue(modelB)
            if (metric.higher) {
              if (valueA > valueB) wins++
              else if (valueA < valueB) wins--
            } else {
              if (valueA < valueB) wins++
              else if (valueA > valueB) wins--
            }
          })
          row[modelB.modelName] = (wins + metrics.length) / (metrics.length * 2) // 0-1로 정규화
        }
      })
      return row
    })
  }, [data])

  // 커스텀 툴팁
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div style={{
          backgroundColor: "rgba(255, 255, 255, 0.98)",
          border: "1px solid #e5e7eb",
          borderRadius: "0.5rem",
          padding: "0.75rem",
          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
        }}>
          <p style={{
            margin: "0 0 0.5rem 0",
            fontWeight: "600",
            fontSize: "0.875rem",
            color: "#111827",
          }}>
            {label}
          </p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{
              margin: "0.25rem 0",
              fontSize: "0.8125rem",
              color: "#6b7280",
            }}>
              <span style={{ color: entry.color, fontWeight: "600" }}>
                {entry.name}: {typeof entry.value === "number" ? entry.value.toFixed(2) : entry.value}
              </span>
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  return (
    <div style={{ marginTop: "3rem", display: "flex", flexDirection: "column", gap: "2.5rem" }}>
      {/* 종합 점수 비교 (lmarena 스타일) */}
      <div style={{
        backgroundColor: "#ffffff",
        borderRadius: "0.75rem",
        border: "1px solid #e5e7eb",
        padding: "2rem",
        boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
      }}>
        <div style={{ marginBottom: "1.5rem" }}>
          <h3 style={{
            fontSize: "1.5rem",
            fontWeight: "600",
            color: "#111827",
            margin: "0 0 0.5rem 0",
            letterSpacing: "-0.025em",
          }}>
            Overall Performance Score
          </h3>
          <p style={{
            fontSize: "0.875rem",
            color: "#6b7280",
            margin: "0 0 0.5rem 0",
          }}>
            종합 성능 점수 (화질 40%, 압축 20%, 속도 40% 가중 평균)
          </p>
          <p style={{
            fontSize: "0.875rem",
            color: "#6b7280",
            margin: 0,
            fontStyle: "italic",
            lineHeight: "1.6",
          }}>
            💡 이 차트를 보면: 여러 지표를 한눈에 비교해 어떤 모델이 전반적으로 가장 우수한지 빠르게 파악할 수 있습니다. 
            단일 지표가 아닌 종합적인 관점에서 모델을 평가하고 싶을 때 유용합니다.
          </p>
        </div>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={overallScoreData} layout="vertical" margin={{ top: 5, right: 30, left: 100, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" horizontal={true} vertical={false} />
            <XAxis
              type="number"
              domain={[0, 100]}
              tick={{ fontSize: 12, fill: "#6b7280" }}
              axisLine={{ stroke: "#e5e7eb" }}
            />
            <YAxis
              type="category"
              dataKey="name"
              tick={{ fontSize: 12, fill: "#374151", fontWeight: "500" }}
              axisLine={{ stroke: "#e5e7eb" }}
              width={90}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="score" radius={[0, 4, 4, 0]} barSize={90}>
              {overallScoreData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color.primary} />
              ))}
            </Bar>
            <ReferenceLine x={50} stroke="#d1d5db" strokeDasharray="3 3" strokeOpacity={0.5} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* 지표별 분포 및 신뢰 구간 */}
      <div style={{
        backgroundColor: "#ffffff",
        borderRadius: "0.75rem",
        border: "1px solid #e5e7eb",
        padding: "2rem",
        boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
      }}>
        <div style={{ marginBottom: "1.5rem" }}>
          <h3 style={{
            fontSize: "1.5rem",
            fontWeight: "600",
            color: "#111827",
            margin: "0 0 0.5rem 0",
            letterSpacing: "-0.025em",
          }}>
            Performance Distribution by Metric
          </h3>
          <p style={{
            fontSize: "0.875rem",
            color: "#6b7280",
            margin: "0 0 0.5rem 0",
          }}>
            각 지표별 모델 성능 분포 및 평균값
          </p>
          <p style={{
            fontSize: "0.875rem",
            color: "#6b7280",
            margin: 0,
            fontStyle: "italic",
            lineHeight: "1.6",
          }}>
            💡 이 차트를 보면: 특정 지표(예: 화질, 속도)에 집중해서 모델을 비교하고 싶을 때 유용합니다. 
            각 지표에서 어떤 모델이 우수한지, 모델 간 차이가 얼마나 큰지 한눈에 확인할 수 있습니다.
          </p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
          {metricStats.map((stat) => (
            <div key={stat.metric} style={{
              padding: "1.5rem",
              backgroundColor: "#f9fafb",
              borderRadius: "0.5rem",
              border: "1px solid #e5e7eb",
            }}>
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: "1rem",
                flexWrap: "wrap",
                gap: "1rem",
              }}>
                <div>
                  <h4 style={{
                    fontSize: "1.125rem",
                    fontWeight: "600",
                    color: "#111827",
                    margin: "0 0 0.5rem 0",
                  }}>
                    {stat.metric}
                  </h4>
                  <div style={{ display: "flex", gap: "1rem", fontSize: "0.8125rem", color: "#6b7280", flexWrap: "wrap" }}>
                    <span>범위: <strong>{stat.min.toFixed(2)} ~ {stat.max.toFixed(2)}</strong></span>
                    <span>평균: <strong>{stat.mean.toFixed(2)}</strong></span>
                    <span>표준편차: <strong>±{stat.stdDev.toFixed(2)}</strong></span>
                  </div>
                </div>
                <div style={{
                  padding: "0.5rem 0.75rem",
                  backgroundColor: "#ffffff",
                  borderRadius: "0.375rem",
                  border: "1px solid #e5e7eb",
                  fontSize: "0.75rem",
                  color: "#6b7280",
                }}>
                  <div>정규화 점수 (0-100)</div>
                  <div style={{ fontWeight: "600", color: "#111827", marginTop: "0.25rem" }}>
                    평균: {stat.normalizedMean.toFixed(1)}점
                  </div>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={stat.values} margin={{ top: 10, right: 30, left: 20, bottom: 60 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                  <XAxis
                    dataKey="name"
                    angle={-45}
                    textAnchor="end"
                    height={80}
                    tick={{ fontSize: 12, fill: "#6b7280", fontWeight: "500" }}
                    axisLine={{ stroke: "#d1d5db" }}
                  />
                  <YAxis
                    domain={[0, 100]}
                    tick={{ fontSize: 12, fill: "#6b7280", fontWeight: "500" }}
                    axisLine={{ stroke: "#d1d5db" }}
                    label={{ value: "정규화 점수 (0-100)", angle: -90, position: "insideLeft", style: { fill: "#6b7280", fontSize: 12 } }}
                  />
                  <Tooltip
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        const entry = payload[0].payload
                        return (
                          <div style={{
                            backgroundColor: "rgba(255, 255, 255, 0.98)",
                            border: "1px solid #e5e7eb",
                            borderRadius: "0.5rem",
                            padding: "0.75rem",
                            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                          }}>
                            <p style={{
                              margin: "0 0 0.5rem 0",
                              fontWeight: "600",
                              fontSize: "0.875rem",
                              color: "#111827",
                            }}>
                              {label}
                            </p>
                            <p style={{
                              margin: "0.25rem 0",
                              fontSize: "0.8125rem",
                              color: "#6b7280",
                            }}>
                              <span style={{ fontWeight: "600" }}>정규화 점수:</span>{" "}
                              <span style={{ color: entry.color.primary, fontWeight: "600" }}>
                                {entry.normalizedValue.toFixed(1)}점
                              </span>
                            </p>
                            <p style={{
                              margin: "0.25rem 0",
                              fontSize: "0.8125rem",
                              color: "#6b7280",
                            }}>
                              <span style={{ fontWeight: "600" }}>원본 값:</span>{" "}
                              <span style={{ fontWeight: "600", color: "#111827" }}>
                                {entry.value.toFixed(2)}
                                {stat.metric === "SSIM" || stat.metric === "LPIPS" ? "" : 
                                 stat.metric === "PSNR" ? " dB" :
                                 stat.metric === "압축률" ? "x" :
                                 stat.metric === "FPS" ? "" : ""}
                              </span>
                            </p>
                          </div>
                        )
                      }
                      return null
                    }}
                  />
                  <Bar dataKey="normalizedValue" radius={[4, 4, 0, 0]} barSize={75}>
                    {stat.values.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color.primary} />
                    ))}
                  </Bar>
                  <ReferenceLine
                    y={stat.normalizedMean}
                    stroke="#6366f1"
                    strokeDasharray="3 3"
                    strokeWidth={2}
                    label={{ value: `평균 ${stat.normalizedMean.toFixed(1)}`, position: "right", fill: "#6366f1", fontSize: 11, fontWeight: "600" }}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          ))}
        </div>
      </div>

      {/* 모델 간 비교 매트릭스 (Win Rate 스타일) */}
      <div style={{
        backgroundColor: "#ffffff",
        borderRadius: "0.75rem",
        border: "1px solid #e5e7eb",
        padding: "2rem",
        boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
      }}>
        <div style={{ marginBottom: "1.5rem" }}>
          <h3 style={{
            fontSize: "1.5rem",
            fontWeight: "600",
            color: "#111827",
            margin: "0 0 0.5rem 0",
            letterSpacing: "-0.025em",
          }}>
            Model Comparison Matrix
          </h3>
          <p style={{
            fontSize: "0.875rem",
            color: "#6b7280",
            margin: "0 0 0.5rem 0",
          }}>
            각 모델이 다른 모델 대비 우수한 정도 (1.0 = 완전 우수, 0.5 = 동등, 0.0 = 열등)
          </p>
          <p style={{
            fontSize: "0.875rem",
            color: "#6b7280",
            margin: 0,
            fontStyle: "italic",
            lineHeight: "1.6",
          }}>
            💡 이 차트를 보면: 모델 A와 모델 B를 직접 비교하고 싶을 때 유용합니다. 
            어떤 모델이 다른 모델들보다 전반적으로 우수한지, 또는 특정 모델 조합에서 어떤 모델이 더 나은지 확인할 수 있습니다.
          </p>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: "0" }}>
            <thead>
              <tr>
                <th style={{
                  padding: "0.75rem",
                  textAlign: "left",
                  backgroundColor: "#f9fafb",
                  borderBottom: "2px solid #e5e7eb",
                  fontSize: "0.875rem",
                  fontWeight: "600",
                  color: "#374151",
                  position: "sticky",
                  left: 0,
                  zIndex: 10,
                }}>
                  Model
                </th>
                {data.map((model) => (
                  <th key={model.id} style={{
                    padding: "0.75rem",
                    textAlign: "center",
                    backgroundColor: "#f9fafb",
                    borderBottom: "2px solid #e5e7eb",
                    fontSize: "0.75rem",
                    fontWeight: "600",
                    color: "#374151",
                    minWidth: "80px",
                  }}>
                    {model.modelName.length > 15 ? model.modelName.substring(0, 15) + "..." : model.modelName}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparisonMatrix.map((row, rowIndex) => (
                <tr key={row.modelName}>
                  <td style={{
                    padding: "0.75rem",
                    fontWeight: "600",
                    borderBottom: "1px solid #f3f4f6",
                    position: "sticky",
                    left: 0,
                    backgroundColor: "inherit",
                    zIndex: 5,
                    fontSize: "0.875rem",
                    color: "#374151",
                  }}>
                    {row.modelName}
                  </td>
                  {data.map((model, colIndex) => {
                    const value = row[model.modelName] as number
                    const intensity = Math.abs(value - 0.5) * 2 // 0-1로 정규화
                    const isWin = value > 0.5
                    const bgColor = isWin
                      ? `rgba(16, 185, 129, ${0.1 + intensity * 0.3})` // 초록 (우수)
                      : value < 0.5
                      ? `rgba(239, 68, 68, ${0.1 + intensity * 0.3})` // 빨강 (열등)
                      : "rgba(156, 163, 175, 0.1)" // 회색 (동등)

                    return (
                      <td
                        key={model.id}
                        style={{
                          padding: "0.75rem",
                          textAlign: "center",
                          borderBottom: "1px solid #f3f4f6",
                          backgroundColor: bgColor,
                          color: value === 0.5 ? "#9ca3af" : "#111827",
                          fontWeight: "600",
                          fontSize: "0.8125rem",
                        }}
                      >
                        {value === 0.5 ? "-" : value.toFixed(2)}
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{
          marginTop: "1.5rem",
          padding: "1rem",
          backgroundColor: "#f9fafb",
          borderRadius: "0.5rem",
          fontSize: "0.875rem",
          color: "#6b7280",
        }}>
          <p style={{ margin: 0 }}>
            <strong>설명:</strong> 각 셀의 값은 행 모델이 열 모델보다 우수한 정도를 나타냅니다. 
            1.0에 가까울수록 행 모델이 우수하고, 0.0에 가까울수록 열 모델이 우수합니다.
          </p>
        </div>
      </div>

      {/* 지표별 상관관계 */}
      <div style={{
        backgroundColor: "#ffffff",
        borderRadius: "0.75rem",
        border: "1px solid #e5e7eb",
        padding: "2rem",
        boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
      }}>
        <div style={{ marginBottom: "1.5rem" }}>
          <h3 style={{
            fontSize: "1.5rem",
            fontWeight: "600",
            color: "#111827",
            margin: "0 0 0.5rem 0",
            letterSpacing: "-0.025em",
          }}>
            Metric Correlation Analysis
          </h3>
          <p style={{
            fontSize: "0.875rem",
            color: "#6b7280",
            margin: "0 0 0.5rem 0",
          }}>
            주요 지표 간의 상관관계를 분석합니다
          </p>
          <p style={{
            fontSize: "0.875rem",
            color: "#6b7280",
            margin: 0,
            fontStyle: "italic",
            lineHeight: "1.6",
          }}>
            💡 이 차트를 보면: 지표들 간의 관계를 이해하고 싶을 때 유용합니다. 
            예를 들어, 화질이 좋으면 속도가 느려지는지, 압축률과 품질이 어떤 관계인지 등을 파악할 수 있어 모델 선택 전략을 세우는 데 도움이 됩니다.
          </p>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: "0" }}>
            <thead>
              <tr>
                <th style={{
                  padding: "0.75rem",
                  textAlign: "left",
                  backgroundColor: "#f9fafb",
                  borderBottom: "2px solid #e5e7eb",
                  fontSize: "0.875rem",
                  fontWeight: "600",
                  color: "#374151",
                }}>
                  지표
                </th>
                {["PSNR", "SSIM", "LPIPS", "압축률", "FPS"].map((metric) => (
                  <th key={metric} style={{
                    padding: "0.75rem",
                    textAlign: "center",
                    backgroundColor: "#f9fafb",
                    borderBottom: "2px solid #e5e7eb",
                    fontSize: "0.875rem",
                    fontWeight: "600",
                    color: "#374151",
                  }}>
                    {metric}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {["PSNR", "SSIM", "LPIPS", "압축률", "FPS"].map((metricA, indexA) => {
                const getValue = (m: VQGANModel, metric: string) => {
                  switch (metric) {
                    case "PSNR": return m.psnr
                    case "SSIM": return m.ssim * 100
                    case "LPIPS": return m.lpips * 100
                    case "압축률": return m.compressionRatio
                    case "FPS": return m.fps
                    default: return 0
                  }
                }

                const valuesA = data.map((m) => getValue(m, metricA))
                const meanA = valuesA.reduce((a, b) => a + b, 0) / valuesA.length

                return (
                  <tr key={metricA}>
                    <td style={{
                      padding: "0.75rem",
                      fontWeight: "600",
                      borderBottom: "1px solid #f3f4f6",
                      fontSize: "0.875rem",
                      color: "#374151",
                    }}>
                      {metricA}
                    </td>
                    {["PSNR", "SSIM", "LPIPS", "압축률", "FPS"].map((metricB, indexB) => {
                      if (indexA === indexB) {
                        return (
                          <td key={metricB} style={{
                            padding: "0.75rem",
                            textAlign: "center",
                            borderBottom: "1px solid #f3f4f6",
                            backgroundColor: "#f9fafb",
                            color: "#9ca3af",
                            fontWeight: "600",
                            fontSize: "0.875rem",
                          }}>
                            -
                          </td>
                        )
                      }

                      const valuesB = data.map((m) => getValue(m, metricB))
                      const meanB = valuesB.reduce((a, b) => a + b, 0) / valuesB.length

                      // 피어슨 상관계수 계산
                      const numerator = data.reduce((sum, m, i) => {
                        return sum + (valuesA[i] - meanA) * (valuesB[i] - meanB)
                      }, 0)
                      const denomA = Math.sqrt(data.reduce((sum, m, i) => sum + Math.pow(valuesA[i] - meanA, 2), 0))
                      const denomB = Math.sqrt(data.reduce((sum, m, i) => sum + Math.pow(valuesB[i] - meanB, 2), 0))
                      const correlation = denomA * denomB === 0 ? 0 : numerator / (denomA * denomB)

                      const intensity = Math.abs(correlation)
                      const bgColor = correlation > 0
                        ? `rgba(16, 185, 129, ${0.1 + intensity * 0.4})` // 양의 상관관계 (초록)
                        : `rgba(239, 68, 68, ${0.1 + intensity * 0.4})` // 음의 상관관계 (빨강)

                      return (
                        <td key={metricB} style={{
                          padding: "0.75rem",
                          textAlign: "center",
                          borderBottom: "1px solid #f3f4f6",
                          backgroundColor: bgColor,
                          color: "#111827",
                          fontWeight: "600",
                          fontSize: "0.875rem",
                        }}>
                          {correlation.toFixed(2)}
                        </td>
                      )
                    })}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        <div style={{
          marginTop: "1.5rem",
          padding: "1rem",
          backgroundColor: "#f9fafb",
          borderRadius: "0.5rem",
          fontSize: "0.875rem",
          color: "#6b7280",
        }}>
          <p style={{ margin: 0 }}>
            <strong>설명:</strong> 피어슨 상관계수 (-1 ~ 1). 1에 가까울수록 양의 상관관계, -1에 가까울수록 음의 상관관계를 나타냅니다.
          </p>
        </div>
      </div>
    </div>
  )
}
