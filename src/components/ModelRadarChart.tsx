"use client"

import * as React from "react"
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Legend,
  ResponsiveContainer,
  Tooltip,
} from "recharts"
import { VQGANModel } from "./ModelLeaderboard"

interface ModelRadarChartProps {
  data: VQGANModel[] // 차트에 표시할 모델들
  allData?: VQGANModel[] // 전체 데이터셋 (min/max 계산용)
}

// 지표를 0-100 스케일로 정규화하는 함수
const normalizeValue = (
  value: number,
  min: number,
  max: number,
  reverse: boolean = false // true면 값이 작을수록 좋은 지표 (LPIPS, FID, bpp, 시간 등)
): number => {
  if (max === min) return 50 // 모든 값이 같으면 중간값 반환
  
  const normalized = ((value - min) / (max - min)) * 100
  
  // reverse가 true면 반전 (값이 작을수록 좋은 지표)
  return reverse ? 100 - normalized : normalized
}

// 커스텀 툴팁 컴포넌트
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload
    return (
      <div style={{
        backgroundColor: "rgba(35, 36, 74, 0.95)",
        border: `1px solid ${payload[0].color}`,
        borderRadius: "0.375rem",
        padding: "0.75rem",
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
      }}>
        <p style={{ 
          margin: 0, 
          marginBottom: "0.5rem",
          color: "#f5f6f7",
          fontWeight: "600",
          fontSize: "0.875rem",
        }}>
          {data.subject}
        </p>
        {payload.map((entry: any, index: number) => (
          <p key={index} style={{ 
            margin: "0.25rem 0",
            color: "#f5f6f7",
            fontSize: "0.8125rem",
          }}>
            <span style={{ fontWeight: "600" }}>{entry.name}:</span>{" "}
            <span style={{ color: entry.color }}>{entry.value.toFixed(1)}점</span>
          </p>
        ))}
      </div>
    )
  }
  return null
}

export default function ModelRadarChart({ data, allData }: ModelRadarChartProps) {
  // 각 지표의 최소값과 최대값 계산 (전체 데이터셋 기준)
  const metrics = React.useMemo(() => {
    // 전체 데이터셋이 제공되면 그것을 사용, 없으면 현재 데이터 사용
    const datasetForMetrics = allData && allData.length > 0 ? allData : data
    
    if (datasetForMetrics.length === 0) return null

    const psnrValues = datasetForMetrics.map((d) => d.psnr)
    const ssimValues = datasetForMetrics.map((d) => d.ssim)
    const lpipsValues = datasetForMetrics.map((d) => d.lpips)
    const fidValues = datasetForMetrics.map((d) => d.fid || 0).filter((v) => v > 0)
    const compressionRatioValues = datasetForMetrics.map((d) => d.compressionRatio)
    const bppValues = datasetForMetrics.map((d) => d.bpp)
    const encodingTimeValues = datasetForMetrics.map((d) => d.encodingTime)
    const decodingTimeValues = datasetForMetrics.map((d) => d.decodingTime)
    const fpsValues = datasetForMetrics.map((d) => d.fps)
    const perplexityValues = datasetForMetrics.map((d) => d.perplexity || 0).filter((v) => v > 0)

    const minMax = {
      psnr: { min: Math.min(...psnrValues), max: Math.max(...psnrValues) },
      ssim: { min: Math.min(...ssimValues), max: Math.max(...ssimValues) },
      lpips: { min: Math.min(...lpipsValues), max: Math.max(...lpipsValues) },
      fid: fidValues.length > 0 ? { min: Math.min(...fidValues), max: Math.max(...fidValues) } : null,
      compressionRatio: { min: Math.min(...compressionRatioValues), max: Math.max(...compressionRatioValues) },
      bpp: { min: Math.min(...bppValues), max: Math.max(...bppValues) },
      encodingTime: { min: Math.min(...encodingTimeValues), max: Math.max(...encodingTimeValues) },
      decodingTime: { min: Math.min(...decodingTimeValues), max: Math.max(...decodingTimeValues) },
      fps: { min: Math.min(...fpsValues), max: Math.max(...fpsValues) },
      perplexity: perplexityValues.length > 0 ? { min: Math.min(...perplexityValues), max: Math.max(...perplexityValues) } : null,
    }

    return minMax
  }, [data, allData])

  // 차트 데이터 생성 (Recharts 형식)
  const chartData = React.useMemo(() => {
    if (!metrics || data.length === 0) return []

    // 레이더 차트 전용 색상 팔레트 (원래 스타일)
    const colors = [
      "#4F8FC6",   // 파란색
      "#6DD5ED",   // 하늘색
      "#A259F7",   // 보라색
      "#43E97B",   // 초록색
      "#FFD700",   // 노란색
    ]

    // 지표 이름 배열 생성
    const metricNames: string[] = [
      "PSNR",
      "SSIM",
      "LPIPS",
      ...(metrics.fid ? ["FID"] : []),
      "압축률",
      "bpp",
      "인코딩 시간",
      "디코딩 시간",
      "FPS",
      ...(metrics.perplexity ? ["Perplexity"] : []),
    ]

    // 각 모델에 대한 데이터 생성
    return data.map((model, modelIndex) => {
      const psnrScore = normalizeValue(model.psnr, metrics.psnr.min, metrics.psnr.max)
      const ssimScore = normalizeValue(model.ssim, metrics.ssim.min, metrics.ssim.max)
      const lpipsScore = normalizeValue(model.lpips, metrics.lpips.min, metrics.lpips.max, true)
      const fidScore = metrics.fid ? normalizeValue(model.fid || 0, metrics.fid.min, metrics.fid.max, true) : null
      const compressionRatioScore = normalizeValue(model.compressionRatio, metrics.compressionRatio.min, metrics.compressionRatio.max)
      const bppScore = normalizeValue(model.bpp, metrics.bpp.min, metrics.bpp.max, true)
      const encodingTimeScore = normalizeValue(model.encodingTime, metrics.encodingTime.min, metrics.encodingTime.max, true)
      const decodingTimeScore = normalizeValue(model.decodingTime, metrics.decodingTime.min, metrics.decodingTime.max, true)
      const fpsScore = normalizeValue(model.fps, metrics.fps.min, metrics.fps.max)
      const perplexityScore = metrics.perplexity ? normalizeValue(model.perplexity || 0, metrics.perplexity.min, metrics.perplexity.max) : null

      // Recharts 형식으로 데이터 변환 (각 지표를 subject로)
      const dataPoints = metricNames.map((metricName) => {
        let value = 0
        switch (metricName) {
          case "PSNR":
            value = psnrScore
            break
          case "SSIM":
            value = ssimScore
            break
          case "LPIPS":
            value = lpipsScore
            break
          case "FID":
            value = fidScore || 0
            break
          case "압축률":
            value = compressionRatioScore
            break
          case "bpp":
            value = bppScore
            break
          case "인코딩 시간":
            value = encodingTimeScore
            break
          case "디코딩 시간":
            value = decodingTimeScore
            break
          case "FPS":
            value = fpsScore
            break
          case "Perplexity":
            value = perplexityScore || 0
            break
        }

        return {
          subject: metricName,
          [model.modelName]: value,
          fullMark: 100,
        }
      })

      return {
        modelName: model.modelName,
        color: colors[modelIndex % colors.length],
        data: dataPoints,
        isTRUEBench: model.modelName.toLowerCase().includes("truebench") || 
                     model.modelName.toLowerCase().includes("true bench"),
      }
    })
  }, [data, metrics])

  // 모든 모델의 데이터를 하나의 배열로 병합
  const mergedData = React.useMemo(() => {
    if (chartData.length === 0) return []
    
    const subjects = chartData[0].data.map((d: any) => d.subject)
    
    return subjects.map((subject: string) => {
      const dataPoint: any = { subject }
      chartData.forEach((modelData) => {
        const point = modelData.data.find((d: any) => d.subject === subject)
        if (point) {
          dataPoint[modelData.modelName] = point[modelData.modelName]
        }
      })
      dataPoint.fullMark = 100
      return dataPoint
    })
  }, [chartData])

  // 조건부 렌더링은 JSX에서 처리
  if (data.length === 0) {
    return (
      <div
        style={{
          padding: "2rem",
          textAlign: "center",
          color: "#6b7280",
          backgroundColor: "#ffffff",
          borderRadius: "0.375rem",
          border: "1px solid #e5e7eb",
        }}
      >
        데이터가 없습니다.
      </div>
    )
  }

  return (
    <div
      style={{
        marginTop: "3rem",
        padding: "1.5rem",
        backgroundColor: "#23244A",
        borderRadius: "0.375rem",
        border: "1px solid #e5e7eb",
      }}
    >
      <h3 style={{
        fontSize: "1.5rem",
        fontWeight: "700",
        color: "#f5f6f7",
        margin: "0 0 1.5rem 0",
        textAlign: "center",
        fontFamily: "Verdana, sans-serif",
      }}>
        Model Performance Radar Chart
      </h3>
      <ResponsiveContainer width="100%" height={600}>
        <RadarChart data={mergedData} margin={{ top: 20, right: 30, bottom: 20, left: 30 }}>
        <PolarGrid 
          stroke="#f5f6f7" 
          strokeOpacity={0.1}
          gridType="polygon"
        />
        <PolarAngleAxis
          dataKey="subject"
          tick={{
            fill: "#f5f6f7",
            fontSize: 14,
            fontWeight: 600,
            fontFamily: "Verdana, sans-serif",
          }}
        />
        <PolarRadiusAxis
          angle={90}
          domain={[0, 100]}
          tick={{
            fill: "#94a3b8",
            fontSize: 11,
            fontFamily: '"Geist Mono", monospace',
          }}
          axisLine={{ stroke: "#f5f6f7", strokeOpacity: 0.4, strokeWidth: 2 }}
          tickCount={6}
        />
          <Tooltip content={<CustomTooltip />} />
          {chartData.map((modelData) => (
            <Radar
              key={modelData.modelName}
              name={modelData.modelName}
              dataKey={modelData.modelName}
              stroke={modelData.color}
              fill={modelData.color}
                fillOpacity={0.25}
              strokeWidth={modelData.isTRUEBench ? 5 : 3}
              dot={{
                fill: modelData.color,
                strokeWidth: modelData.isTRUEBench ? 3 : 2,
                stroke: modelData.isTRUEBench ? "#f5f6f7" : "#01091a",
                r: modelData.isTRUEBench ? 7 : 5,
              }}
            />
          ))}
          <Legend
            wrapperStyle={{
              paddingTop: "1rem",
              color: "#f5f6f7",
              fontFamily: "Verdana, sans-serif",
            }}
            iconType="line"
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  )
}
