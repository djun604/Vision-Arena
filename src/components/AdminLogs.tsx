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
import { Search, Download, Filter } from "lucide-react"

// 로그 타입 정의
interface LogEntry {
  id: string
  timestamp: string
  level: "info" | "warning" | "error" | "success"
  category: string
  message: string
  user?: string
  ip?: string
}

export default function AdminLogs() {
  const [logs, setLogs] = React.useState<LogEntry[]>([
    {
      id: "1",
      timestamp: "2024-01-20T10:30:00Z",
      level: "success",
      category: "모델 관리",
      message: "모델 'VQGAN-256'이 승인되었습니다.",
      user: "admin@example.com",
      ip: "192.168.1.100",
    },
    {
      id: "2",
      timestamp: "2024-01-20T09:15:00Z",
      level: "info",
      category: "사용자 관리",
      message: "새 사용자 'user@example.com'이 등록되었습니다.",
      user: "system",
      ip: "192.168.1.101",
    },
    {
      id: "3",
      timestamp: "2024-01-20T08:45:00Z",
      level: "warning",
      category: "API",
      message: "API Rate Limit 경고: user@example.com",
      user: "user@example.com",
      ip: "192.168.1.102",
    },
    {
      id: "4",
      timestamp: "2024-01-20T08:30:00Z",
      level: "error",
      category: "시스템",
      message: "데이터베이스 연결 오류 발생",
      user: "system",
      ip: "192.168.1.1",
    },
    {
      id: "5",
      timestamp: "2024-01-20T07:20:00Z",
      level: "info",
      category: "모델 관리",
      message: "모델 'VQGAN-512'이 제출되었습니다.",
      user: "user@example.com",
      ip: "192.168.1.103",
    },
  ])

  const [searchQuery, setSearchQuery] = React.useState("")
  const [filterLevel, setFilterLevel] = React.useState<"all" | LogEntry["level"]>("all")
  const [filterCategory, setFilterCategory] = React.useState<"all" | string>("all")

  const filteredLogs = logs.filter(log => {
    const matchesSearch = searchQuery === "" || 
      log.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.user?.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesLevel = filterLevel === "all" || log.level === filterLevel
    const matchesCategory = filterCategory === "all" || log.category === filterCategory
    return matchesSearch && matchesLevel && matchesCategory
  })

  const categories = Array.from(new Set(logs.map(log => log.category)))

  const getLevelBadge = (level: LogEntry["level"]) => {
    const styles = {
      success: { bg: "#d1fae5", color: "#065f46", text: "성공" },
      info: { bg: "#dbeafe", color: "#1e40af", text: "정보" },
      warning: { bg: "#fef3c7", color: "#92400e", text: "경고" },
      error: { bg: "#fee2e2", color: "#991b1b", text: "오류" },
    }
    const style = styles[level]
    
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

  const handleExport = () => {
    const csv = [
      ["타임스탬프", "레벨", "카테고리", "메시지", "사용자", "IP"].join(","),
      ...filteredLogs.map(log => [
        log.timestamp,
        log.level,
        log.category,
        `"${log.message}"`,
        log.user || "",
        log.ip || "",
      ].join(","))
    ].join("\n")

    const blob = new Blob([csv], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `logs-${new Date().toISOString().split("T")[0]}.csv`
    a.click()
    URL.revokeObjectURL(url)
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
          로그 관리
        </h1>
        <p style={{
          fontSize: "1rem",
          color: "#6b7280",
          margin: "0.5rem 0 0 0",
          lineHeight: "1.5",
        }}>
          시스템 로그 및 활동 내역을 조회할 수 있습니다.
        </p>
      </div>

      {/* 검색 및 필터 */}
      <div style={{ 
        display: "flex", 
        gap: "1rem", 
        marginBottom: "1.5rem",
        flexWrap: "wrap",
        alignItems: "center",
      }}>
        <div style={{ position: "relative", flex: 1, minWidth: "300px" }}>
          <Search style={{ 
            position: "absolute", 
            left: "0.75rem", 
            top: "50%", 
            transform: "translateY(-50%)",
            width: "1rem",
            height: "1rem",
            color: "#9ca3af",
          }} />
          <Input
            placeholder="메시지 또는 사용자 검색..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ paddingLeft: "2.5rem" }}
          />
        </div>
        <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
          <Filter style={{ width: "1rem", height: "1rem", color: "#6b7280" }} />
          <Button
            variant={filterLevel === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterLevel("all")}
          >
            전체
          </Button>
          <Button
            variant={filterLevel === "success" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterLevel("success")}
          >
            성공
          </Button>
          <Button
            variant={filterLevel === "info" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterLevel("info")}
          >
            정보
          </Button>
          <Button
            variant={filterLevel === "warning" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterLevel("warning")}
          >
            경고
          </Button>
          <Button
            variant={filterLevel === "error" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterLevel("error")}
          >
            오류
          </Button>
        </div>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            style={{
              padding: "0.5rem 0.75rem",
              borderRadius: "0.375rem",
              border: "1px solid #e5e7eb",
              fontSize: "0.875rem",
              backgroundColor: "#ffffff",
            }}
          >
            <option value="all">모든 카테고리</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <Button
            variant="outline"
            onClick={handleExport}
          >
            <Download style={{ width: "1rem", height: "1rem", marginRight: "0.5rem" }} />
            내보내기
          </Button>
        </div>
      </div>

      {/* 로그 테이블 */}
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
              <TableHead>타임스탬프</TableHead>
              <TableHead>레벨</TableHead>
              <TableHead>카테고리</TableHead>
              <TableHead>메시지</TableHead>
              <TableHead>사용자</TableHead>
              <TableHead>IP</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLogs.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} style={{ textAlign: "center", padding: "3rem" }}>
                  <p style={{ color: "#6b7280" }}>로그가 없습니다.</p>
                </TableCell>
              </TableRow>
            ) : (
              filteredLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell style={{ fontSize: "0.875rem", color: "#6b7280" }}>
                    {new Date(log.timestamp).toLocaleString("ko-KR")}
                  </TableCell>
                  <TableCell>{getLevelBadge(log.level)}</TableCell>
                  <TableCell style={{ fontSize: "0.875rem", color: "#6b7280" }}>
                    {log.category}
                  </TableCell>
                  <TableCell>{log.message}</TableCell>
                  <TableCell style={{ fontSize: "0.875rem", color: "#6b7280" }}>
                    {log.user || "-"}
                  </TableCell>
                  <TableCell style={{ fontSize: "0.875rem", color: "#6b7280" }}>
                    {log.ip || "-"}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

