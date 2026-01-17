"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Shield, UserX, UserCheck, Mail, Calendar } from "lucide-react"

// 사용자 타입 정의
interface User {
  id: string
  email: string
  name: string
  role: "admin" | "user" | "moderator"
  status: "active" | "inactive" | "suspended"
  createdAt: string
  lastLogin?: string
  modelCount: number
}

export default function AdminUserManagement() {
  const [users, setUsers] = React.useState<User[]>([
    {
      id: "1",
      email: "admin@example.com",
      name: "관리자",
      role: "admin",
      status: "active",
      createdAt: "2024-01-15T00:00:00Z",
      lastLogin: "2024-01-20T10:30:00Z",
      modelCount: 5,
    },
    {
      id: "2",
      email: "user1@example.com",
      name: "사용자1",
      role: "user",
      status: "active",
      createdAt: "2024-01-16T00:00:00Z",
      lastLogin: "2024-01-19T15:20:00Z",
      modelCount: 2,
    },
    {
      id: "3",
      email: "user2@example.com",
      name: "사용자2",
      role: "user",
      status: "inactive",
      createdAt: "2024-01-17T00:00:00Z",
      modelCount: 0,
    },
    {
      id: "4",
      email: "moderator@example.com",
      name: "모더레이터",
      role: "moderator",
      status: "active",
      createdAt: "2024-01-18T00:00:00Z",
      lastLogin: "2024-01-20T09:15:00Z",
      modelCount: 3,
    },
  ])

  const [filterRole, setFilterRole] = React.useState<"all" | User["role"]>("all")
  const [filterStatus, setFilterStatus] = React.useState<"all" | User["status"]>("all")

  const filteredUsers = users.filter(user => {
    const roleMatch = filterRole === "all" || user.role === filterRole
    const statusMatch = filterStatus === "all" || user.status === filterStatus
    return roleMatch && statusMatch
  })

  const handleStatusChange = (userId: string, newStatus: User["status"]) => {
    setUsers(prev => prev.map(user => 
      user.id === userId ? { ...user, status: newStatus } : user
    ))
    // 실제로는 API 호출 필요
  }

  const handleRoleChange = (userId: string, newRole: User["role"]) => {
    setUsers(prev => prev.map(user => 
      user.id === userId ? { ...user, role: newRole } : user
    ))
    // 실제로는 API 호출 필요
  }

  const getRoleBadge = (role: User["role"]) => {
    const styles = {
      admin: { bg: "#fee2e2", color: "#991b1b", text: "관리자" },
      moderator: { bg: "#dbeafe", color: "#1e40af", text: "모더레이터" },
      user: { bg: "#f3f4f6", color: "#374151", text: "사용자" },
    }
    const style = styles[role]
    
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

  const getStatusBadge = (status: User["status"]) => {
    const styles = {
      active: { bg: "#d1fae5", color: "#065f46", text: "활성" },
      inactive: { bg: "#f3f4f6", color: "#6b7280", text: "비활성" },
      suspended: { bg: "#fee2e2", color: "#991b1b", text: "정지" },
    }
    const style = styles[status]
    
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
          사용자 관리
        </h1>
        <p style={{
          fontSize: "1rem",
          color: "#6b7280",
          margin: "0.5rem 0 0 0",
          lineHeight: "1.5",
        }}>
          사용자 권한, 상태 및 역할을 관리할 수 있습니다.
        </p>
      </div>

      {/* 필터 버튼 */}
      <div style={{ 
        display: "flex", 
        gap: "0.5rem", 
        marginBottom: "1.5rem",
        flexWrap: "wrap",
      }}>
        <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
          <span style={{ fontSize: "0.875rem", color: "#6b7280", fontWeight: "500" }}>역할:</span>
          <Button
            variant={filterRole === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterRole("all")}
          >
            전체
          </Button>
          <Button
            variant={filterRole === "admin" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterRole("admin")}
          >
            관리자
          </Button>
          <Button
            variant={filterRole === "moderator" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterRole("moderator")}
          >
            모더레이터
          </Button>
          <Button
            variant={filterRole === "user" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterRole("user")}
          >
            사용자
          </Button>
        </div>
        <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", marginLeft: "1rem" }}>
          <span style={{ fontSize: "0.875rem", color: "#6b7280", fontWeight: "500" }}>상태:</span>
          <Button
            variant={filterStatus === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterStatus("all")}
          >
            전체
          </Button>
          <Button
            variant={filterStatus === "active" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterStatus("active")}
          >
            활성
          </Button>
          <Button
            variant={filterStatus === "inactive" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterStatus("inactive")}
          >
            비활성
          </Button>
          <Button
            variant={filterStatus === "suspended" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterStatus("suspended")}
          >
            정지
          </Button>
        </div>
      </div>

      {/* 사용자 목록 테이블 */}
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
              <TableHead>이름</TableHead>
              <TableHead>이메일</TableHead>
              <TableHead>역할</TableHead>
              <TableHead>상태</TableHead>
              <TableHead>모델 수</TableHead>
              <TableHead>가입일</TableHead>
              <TableHead>마지막 로그인</TableHead>
              <TableHead style={{ textAlign: "center" }}>작업</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell style={{ fontWeight: "500" }}>{user.name}</TableCell>
                <TableCell style={{ fontSize: "0.875rem", color: "#6b7280" }}>
                  {user.email}
                </TableCell>
                <TableCell>{getRoleBadge(user.role)}</TableCell>
                <TableCell>{getStatusBadge(user.status)}</TableCell>
                <TableCell>{user.modelCount}</TableCell>
                <TableCell style={{ fontSize: "0.875rem", color: "#6b7280" }}>
                  {new Date(user.createdAt).toLocaleDateString("ko-KR")}
                </TableCell>
                <TableCell style={{ fontSize: "0.875rem", color: "#6b7280" }}>
                  {user.lastLogin 
                    ? new Date(user.lastLogin).toLocaleDateString("ko-KR")
                    : "-"}
                </TableCell>
                <TableCell style={{ textAlign: "center" }}>
                  <div style={{ display: "flex", gap: "0.5rem", justifyContent: "center" }}>
                    {user.status === "active" ? (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleStatusChange(user.id, "inactive")}
                        style={{
                          color: "#6b7280",
                          padding: "0.25rem 0.5rem",
                        }}
                        title="비활성화"
                      >
                        <UserX style={{ width: "1rem", height: "1rem" }} />
                      </Button>
                    ) : (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleStatusChange(user.id, "active")}
                        style={{
                          color: "#10b981",
                          padding: "0.25rem 0.5rem",
                        }}
                        title="활성화"
                      >
                        <UserCheck style={{ width: "1rem", height: "1rem" }} />
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        const newRole = user.role === "admin" ? "user" : 
                                      user.role === "moderator" ? "admin" : "moderator"
                        handleRoleChange(user.id, newRole)
                      }}
                      style={{
                        color: "#3b82f6",
                        padding: "0.25rem 0.5rem",
                      }}
                      title="역할 변경"
                    >
                      <Shield style={{ width: "1rem", height: "1rem" }} />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

