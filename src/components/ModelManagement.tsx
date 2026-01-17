"use client"

import * as React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { VQGANModel } from "./ModelLeaderboard"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Plus, Trash2 } from "lucide-react"

// Leaderboard Overview의 기본 샘플 데이터 (ModelLeaderboard와 동일)
const defaultModels: VQGANModel[] = [
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
  {
    id: "vqgan-test",
    modelName: "VQGAN_test",
    modelCategory: "Vision",
    psnr: 35.0,
    ssim: 0.93,
    lpips: 0.06,
    fid: 14.5,
    compressionRatio: 11.0,
    bpp: 0.35,
    encodingTime: 55,
    decodingTime: 45,
    fps: 20,
    perplexity: 600,
  },
]

export default function ModelManagement() {
  const [registeredModels, setRegisteredModels] = React.useState<VQGANModel[]>([])

  // 로컬 스토리지에서 등록된 모델 목록 로드
  const loadModels = React.useCallback(() => {
    const stored = localStorage.getItem("vqganModels")
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        setRegisteredModels(parsed)
      } catch (error) {
        console.error("Failed to parse stored models:", error)
      }
    } else {
      setRegisteredModels([])
    }
  }, [])

  // 삭제된 기본 모델 목록 로드
  const [deletedDefaultModels, setDeletedDefaultModels] = React.useState<string[]>([])

  React.useEffect(() => {
    const deleted = JSON.parse(localStorage.getItem("deletedDefaultModels") || "[]")
    setDeletedDefaultModels(deleted)
  }, [])

  // 모델 업데이트 이벤트 리스너에서도 삭제된 기본 모델 목록 갱신
  React.useEffect(() => {
    const handleModelUpdate = () => {
      const deleted = JSON.parse(localStorage.getItem("deletedDefaultModels") || "[]")
      setDeletedDefaultModels(deleted)
    }
    window.addEventListener("modelRegistered", handleModelUpdate)
    return () => {
      window.removeEventListener("modelRegistered", handleModelUpdate)
    }
  }, [])

  // 기본 모델과 등록된 모델 합치기 (삭제된 기본 모델 제외)
  const models = React.useMemo(() => {
    const activeDefaultModels = defaultModels.filter((m) => !deletedDefaultModels.includes(m.id))
    return [...activeDefaultModels, ...registeredModels]
  }, [registeredModels, deletedDefaultModels])

  React.useEffect(() => {
    loadModels()

    // 모델 등록 이벤트 리스너
    const handleModelUpdate = () => {
      loadModels()
    }
    window.addEventListener("modelRegistered", handleModelUpdate)

    return () => {
      window.removeEventListener("modelRegistered", handleModelUpdate)
    }
  }, [loadModels])

  const handleDeleteModel = (modelId: string) => {
    if (confirm("정말 이 모델을 삭제하시겠습니까?")) {
      // 기본 모델인 경우, 로컬 스토리지에 삭제된 기본 모델 목록 저장
      const isDefaultModel = defaultModels.some((m) => m.id === modelId)
      
      if (isDefaultModel) {
        // 삭제된 기본 모델 목록 가져오기
        const deletedDefaults = JSON.parse(localStorage.getItem("deletedDefaultModels") || "[]")
        if (!deletedDefaults.includes(modelId)) {
          deletedDefaults.push(modelId)
          localStorage.setItem("deletedDefaultModels", JSON.stringify(deletedDefaults))
        }
      } else {
        // 사용자가 등록한 모델인 경우
        const updatedModels = registeredModels.filter((m) => m.id !== modelId)
        localStorage.setItem("vqganModels", JSON.stringify(updatedModels))
      }
      
      window.dispatchEvent(new Event("modelRegistered"))
    }
  }

  const formatNumber = (value: number, decimals: number = 2): string => {
    return value.toFixed(decimals)
  }

  return (
    <div style={{ width: "100%" }}>
      {/* 제목 및 설명 영역 */}
      <div style={{ marginBottom: "2rem" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.5rem" }}>
          <h1 style={{ 
            fontSize: "1.875rem",
            fontWeight: "600",
            color: "#111827",
            margin: 0,
            lineHeight: "1.2",
          }}>
            Model Management
          </h1>
          <Link href="/model/add">
            <Button variant="default" style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <Plus style={{ width: "1rem", height: "1rem" }} />
              모델 추가
            </Button>
          </Link>
        </div>
        <p style={{
          fontSize: "1rem",
          color: "#6b7280",
          margin: 0,
          lineHeight: "1.5",
        }}>
          등록된 모델을 관리하고 리더보드에 배포할 수 있습니다.
        </p>
      </div>

      {/* 모델 목록 테이블 */}
      {models.length === 0 ? (
        <div
          style={{
            padding: "3rem",
            textAlign: "center",
            backgroundColor: "#ffffff",
            borderRadius: "0.5rem",
            border: "1px solid #e5e7eb",
          }}
        >
          <p style={{ fontSize: "1rem", color: "#6b7280", marginBottom: "1rem" }}>
            모델이 없습니다.
          </p>
          <p style={{ fontSize: "0.875rem", color: "#9ca3af" }}>
            "모델 추가" 버튼을 클릭하여 새 모델을 등록하세요.
          </p>
        </div>
      ) : (
        <div
          style={{
            overflow: "hidden",
            borderRadius: "0.375rem",
            border: "1px solid #e5e7eb",
            backgroundColor: "#ffffff",
          }}
        >
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>모델명</TableHead>
                <TableHead>카테고리</TableHead>
                <TableHead>PSNR (dB)</TableHead>
                <TableHead>SSIM</TableHead>
                <TableHead>LPIPS</TableHead>
                <TableHead>압축률</TableHead>
                <TableHead>bpp</TableHead>
                <TableHead>인코딩 시간</TableHead>
                <TableHead>디코딩 시간</TableHead>
                <TableHead>FPS</TableHead>
                <TableHead style={{ textAlign: "center" }}>작업</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {models.map((model) => {
                const isDefaultModel = defaultModels.some((m) => m.id === model.id)
                return (
                  <TableRow key={model.id}>
                    <TableCell style={{ fontWeight: "500" }}>
                      {model.modelName}
                      {isDefaultModel && (
                        <span style={{
                          marginLeft: "0.5rem",
                          fontSize: "0.75rem",
                          color: "#6b7280",
                          fontStyle: "italic",
                        }}>
                          (기본)
                        </span>
                      )}
                    </TableCell>
                    <TableCell>{model.modelCategory || "-"}</TableCell>
                    <TableCell>{formatNumber(model.psnr)}</TableCell>
                    <TableCell>{formatNumber(model.ssim)}</TableCell>
                    <TableCell>{formatNumber(model.lpips)}</TableCell>
                    <TableCell>{formatNumber(model.compressionRatio)}x</TableCell>
                    <TableCell>{formatNumber(model.bpp)}</TableCell>
                    <TableCell>{formatNumber(model.encodingTime)}ms</TableCell>
                    <TableCell>{formatNumber(model.decodingTime)}ms</TableCell>
                    <TableCell>{formatNumber(model.fps)}</TableCell>
                    <TableCell style={{ textAlign: "center" }}>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteModel(model.id)}
                        style={{
                          color: "#ef4444",
                          padding: "0.25rem 0.5rem",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = "#fee2e2"
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = "transparent"
                        }}
                      >
                        <Trash2 style={{ width: "1rem", height: "1rem" }} />
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  )
}

