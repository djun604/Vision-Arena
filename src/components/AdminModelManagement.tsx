"use client"

import * as React from "react"
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
import { CheckCircle, XCircle, Edit, Trash2, Eye } from "lucide-react"

// 모델 상태 타입
type ModelStatus = "pending" | "approved" | "rejected"

interface AdminModel extends VQGANModel {
  status?: ModelStatus
  submittedAt?: string
  submittedBy?: string
}

export default function AdminModelManagement() {
  const [models, setModels] = React.useState<AdminModel[]>([])
  const [filterStatus, setFilterStatus] = React.useState<ModelStatus | "all">("all")

  // 로컬 스토리지에서 모델 목록 로드
  const loadModels = React.useCallback(() => {
    const stored = localStorage.getItem("vqganModels")
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        // 관리자용으로 상태 정보 추가 (실제로는 서버에서 가져와야 함)
        const adminModels: AdminModel[] = parsed.map((model: VQGANModel) => ({
          ...model,
          status: "approved" as ModelStatus,
          submittedAt: new Date().toISOString(),
          submittedBy: "user@example.com",
        }))
        setModels(adminModels)
      } catch (error) {
        console.error("Failed to parse stored models:", error)
      }
    }
  }, [])

  React.useEffect(() => {
    loadModels()

    const handleModelUpdate = () => {
      loadModels()
    }
    window.addEventListener("modelRegistered", handleModelUpdate)

    return () => {
      window.removeEventListener("modelRegistered", handleModelUpdate)
    }
  }, [loadModels])

  const handleApprove = (modelId: string) => {
    setModels(prev => prev.map(model => 
      model.id === modelId ? { ...model, status: "approved" as ModelStatus } : model
    ))
    // 실제로는 API 호출 필요
  }

  const handleReject = (modelId: string) => {
    if (confirm("정말 이 모델을 거부하시겠습니까?")) {
      setModels(prev => prev.map(model => 
        model.id === modelId ? { ...model, status: "rejected" as ModelStatus } : model
      ))
      // 실제로는 API 호출 필요
    }
  }

  const handleDelete = (modelId: string) => {
    if (confirm("정말 이 모델을 삭제하시겠습니까?")) {
      const updatedModels = models.filter((m) => m.id !== modelId)
      localStorage.setItem("vqganModels", JSON.stringify(updatedModels))
      window.dispatchEvent(new Event("modelRegistered"))
    }
  }

  const filteredModels = filterStatus === "all" 
    ? models 
    : models.filter(m => m.status === filterStatus)

  const formatNumber = (value: number, decimals: number = 2): string => {
    return value.toFixed(decimals)
  }

  const getStatusBadge = (status?: ModelStatus) => {
    const styles = {
      pending: { bg: "#fef3c7", color: "#92400e", text: "대기" },
      approved: { bg: "#d1fae5", color: "#065f46", text: "승인" },
      rejected: { bg: "#fee2e2", color: "#991b1b", text: "거부" },
    }
    const style = styles[status || "pending"]
    
    return (
      <span style={{
        padding: "0.25rem 0.75rem",
        borderRadius: "9999px",
        fontSize: "0.75rem",
        fontWeight: "500",
        backgroundColor: style.bg,
        color: style.color,
      }}>
        {style.text}
      </span>
    )
  }

  return (
    <div style={{ width: "100%" }}>
      {/* 제목 영역 */}
      <div style={{ marginBottom: "0.5rem" }}>
        <h1 style={{ 
          fontSize: "1.875rem",
          fontWeight: "600",
          color: "#111827",
          margin: 0,
          lineHeight: "1.2",
        }}>
          모델 관리
        </h1>
        <p style={{
          fontSize: "1rem",
          color: "#6b7280",
          margin: "0.5rem 0 0 0",
          lineHeight: "1.5",
        }}>
          모델 승인, 거부, 수정 및 삭제를 관리할 수 있습니다.
        </p>
      </div>

      {/* 필터 버튼 */}
      <div style={{ 
        display: "flex", 
        gap: "0.5rem", 
        marginBottom: "1.5rem",
        flexWrap: "wrap",
      }}>
        <Button
          variant={filterStatus === "all" ? "default" : "outline"}
          size="sm"
          onClick={() => setFilterStatus("all")}
        >
          전체 ({models.length})
        </Button>
        <Button
          variant={filterStatus === "pending" ? "default" : "outline"}
          size="sm"
          onClick={() => setFilterStatus("pending")}
        >
          대기 ({models.filter(m => m.status === "pending").length})
        </Button>
        <Button
          variant={filterStatus === "approved" ? "default" : "outline"}
          size="sm"
          onClick={() => setFilterStatus("approved")}
        >
          승인 ({models.filter(m => m.status === "approved").length})
        </Button>
        <Button
          variant={filterStatus === "rejected" ? "default" : "outline"}
          size="sm"
          onClick={() => setFilterStatus("rejected")}
        >
          거부 ({models.filter(m => m.status === "rejected").length})
        </Button>
      </div>

      {/* 모델 목록 테이블 */}
      {filteredModels.length === 0 ? (
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
            {filterStatus === "all" ? "등록된 모델이 없습니다." : "해당 상태의 모델이 없습니다."}
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
                <TableHead>상태</TableHead>
                <TableHead>모델명</TableHead>
                <TableHead>카테고리</TableHead>
                <TableHead>제출자</TableHead>
                <TableHead>제출일</TableHead>
                <TableHead>PSNR</TableHead>
                <TableHead>SSIM</TableHead>
                <TableHead style={{ textAlign: "center" }}>작업</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredModels.map((model) => (
                <TableRow key={model.id}>
                  <TableCell>{getStatusBadge(model.status)}</TableCell>
                  <TableCell style={{ fontWeight: "500" }}>{model.modelName}</TableCell>
                  <TableCell>{model.modelCategory || "-"}</TableCell>
                  <TableCell style={{ fontSize: "0.875rem", color: "#6b7280" }}>
                    {model.submittedBy || "-"}
                  </TableCell>
                  <TableCell style={{ fontSize: "0.875rem", color: "#6b7280" }}>
                    {model.submittedAt 
                      ? new Date(model.submittedAt).toLocaleDateString("ko-KR")
                      : "-"}
                  </TableCell>
                  <TableCell>{formatNumber(model.psnr)}</TableCell>
                  <TableCell>{formatNumber(model.ssim)}</TableCell>
                  <TableCell style={{ textAlign: "center" }}>
                    <div style={{ display: "flex", gap: "0.5rem", justifyContent: "center" }}>
                      {model.status === "pending" && (
                        <>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleApprove(model.id)}
                            style={{
                              color: "#10b981",
                              padding: "0.25rem 0.5rem",
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor = "#d1fae5"
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor = "transparent"
                            }}
                          >
                            <CheckCircle style={{ width: "1rem", height: "1rem" }} />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleReject(model.id)}
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
                            <XCircle style={{ width: "1rem", height: "1rem" }} />
                          </Button>
                        </>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        style={{
                          color: "#3b82f6",
                          padding: "0.25rem 0.5rem",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = "#dbeafe"
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = "transparent"
                        }}
                      >
                        <Eye style={{ width: "1rem", height: "1rem" }} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(model.id)}
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
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  )
}

