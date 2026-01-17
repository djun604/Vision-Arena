"use client"

import * as React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { 
  BarChart3, 
  Users, 
  Settings, 
  FileText, 
  CheckCircle, 
  XCircle,
  TrendingUp,
  Activity
} from "lucide-react"

// 통계 카드 컴포넌트
const StatCard = ({ 
  title, 
  value, 
  change, 
  icon: Icon,
  color = "#3b82f6" 
}: { 
  title: string
  value: string | number
  change?: string
  icon: React.ElementType
  color?: string
}) => (
  <div style={{
    backgroundColor: "#ffffff",
    borderRadius: "0.5rem",
    border: "1px solid #e5e7eb",
    padding: "1.5rem",
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem",
  }}>
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <span style={{ fontSize: "0.875rem", color: "#6b7280", fontWeight: "500" }}>
        {title}
      </span>
      <div style={{
        width: "2.5rem",
        height: "2.5rem",
        borderRadius: "0.5rem",
        backgroundColor: `${color}15`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
        <Icon style={{ width: "1.25rem", height: "1.25rem", color }} />
      </div>
    </div>
    <div>
      <div style={{ fontSize: "2rem", fontWeight: "600", color: "#111827", lineHeight: "1.2" }}>
        {value}
      </div>
      {change && (
        <div style={{ fontSize: "0.875rem", color: "#10b981", marginTop: "0.25rem" }}>
          {change}
        </div>
      )}
    </div>
  </div>
)

// 빠른 액션 카드 컴포넌트
const QuickActionCard = ({ 
  title, 
  description, 
  href, 
  icon: Icon,
  color = "#3b82f6" 
}: { 
  title: string
  description: string
  href: string
  icon: React.ElementType
  color?: string
}) => (
  <Link href={href} style={{ textDecoration: "none" }}>
    <div style={{
      backgroundColor: "#ffffff",
      borderRadius: "0.5rem",
      border: "1px solid #e5e7eb",
      padding: "1.5rem",
      display: "flex",
      flexDirection: "column",
      gap: "0.75rem",
      transition: "all 0.15s ease-in-out",
      cursor: "pointer",
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.borderColor = color
      e.currentTarget.style.boxShadow = `0 4px 6px -1px ${color}20`
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.borderColor = "#e5e7eb"
      e.currentTarget.style.boxShadow = "none"
    }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
        <div style={{
          width: "2.5rem",
          height: "2.5rem",
          borderRadius: "0.5rem",
          backgroundColor: `${color}15`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
          <Icon style={{ width: "1.25rem", height: "1.25rem", color }} />
        </div>
        <div style={{ flex: 1 }}>
          <h3 style={{ 
            fontSize: "1rem", 
            fontWeight: "600", 
            color: "#111827", 
            margin: 0,
            marginBottom: "0.25rem",
          }}>
            {title}
          </h3>
          <p style={{ 
            fontSize: "0.875rem", 
            color: "#6b7280", 
            margin: 0,
            lineHeight: "1.5",
          }}>
            {description}
          </p>
        </div>
        <svg 
          width="20" 
          height="20" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2"
          style={{ color: "#9ca3af" }}
        >
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </div>
    </div>
  </Link>
)

export default function AdminDashboard() {
  // 로컬 스토리지에서 데이터 로드
  const [stats, setStats] = React.useState({
    totalModels: 0,
    pendingModels: 0,
    approvedModels: 0,
    totalUsers: 0,
    activeUsers: 0,
  })

  React.useEffect(() => {
    // 모델 통계 계산
    const stored = localStorage.getItem("vqganModels")
    if (stored) {
      try {
        const models = JSON.parse(stored)
        setStats(prev => ({
          ...prev,
          totalModels: models.length,
          approvedModels: models.length, // 현재는 모두 승인된 것으로 간주
        }))
      } catch (error) {
        console.error("Failed to parse stored models:", error)
      }
    }

    // 사용자 통계 (향후 실제 데이터로 대체)
    setStats(prev => ({
      ...prev,
      totalUsers: 12,
      activeUsers: 8,
    }))
  }, [])

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
          Admin Dashboard
        </h1>
        <p style={{
          fontSize: "1rem",
          color: "#6b7280",
          margin: "0.5rem 0 0 0",
          lineHeight: "1.5",
        }}>
          시스템 관리 및 모니터링을 위한 대시보드입니다.
        </p>
      </div>

      {/* 통계 카드 그리드 */}
      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: "1rem",
        marginBottom: "2rem",
      }}>
        <StatCard
          title="전체 모델"
          value={stats.totalModels}
          change="+2 이번 주"
          icon={BarChart3}
          color="#3b82f6"
        />
        <StatCard
          title="승인 대기"
          value={stats.pendingModels}
          change="처리 필요"
          icon={Activity}
          color="#f59e0b"
        />
        <StatCard
          title="승인된 모델"
          value={stats.approvedModels}
          change="+1 이번 주"
          icon={CheckCircle}
          color="#10b981"
        />
        <StatCard
          title="전체 사용자"
          value={stats.totalUsers}
          change={`${stats.activeUsers}명 활성`}
          icon={Users}
          color="#8b5cf6"
        />
      </div>

      {/* 빠른 액션 */}
      <div style={{ marginBottom: "2rem" }}>
        <h2 style={{ 
          fontSize: "1.25rem",
          fontWeight: "600",
          color: "#111827",
          margin: "0 0 1rem 0",
        }}>
          빠른 액션
        </h2>
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "1rem",
        }}>
          <QuickActionCard
            title="모델 관리"
            description="모델 승인, 거부, 수정 및 삭제 관리"
            href="/admin/models"
            icon={BarChart3}
            color="#3b82f6"
          />
          <QuickActionCard
            title="사용자 관리"
            description="사용자 권한, 상태 및 역할 관리"
            href="/admin/users"
            icon={Users}
            color="#8b5cf6"
          />
          <QuickActionCard
            title="시스템 설정"
            description="시스템 구성 및 환경 설정 관리"
            href="/admin/settings"
            icon={Settings}
            color="#6b7280"
          />
          <QuickActionCard
            title="로그 관리"
            description="시스템 로그 및 활동 내역 조회"
            href="/admin/logs"
            icon={FileText}
            color="#f59e0b"
          />
        </div>
      </div>

      {/* 최근 활동 */}
      <div>
        <h2 style={{ 
          fontSize: "1.25rem",
          fontWeight: "600",
          color: "#111827",
          margin: "0 0 1rem 0",
        }}>
          최근 활동
        </h2>
        <div style={{
          backgroundColor: "#ffffff",
          borderRadius: "0.5rem",
          border: "1px solid #e5e7eb",
          padding: "1.5rem",
        }}>
          <div style={{ 
            display: "flex", 
            flexDirection: "column", 
            gap: "1rem",
            color: "#6b7280",
            fontSize: "0.875rem",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <CheckCircle style={{ width: "1rem", height: "1rem", color: "#10b981" }} />
              <span>새 모델 "VQGAN-256"이 승인되었습니다.</span>
              <span style={{ marginLeft: "auto", color: "#9ca3af" }}>2시간 전</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <Users style={{ width: "1rem", height: "1rem", color: "#8b5cf6" }} />
              <span>새 사용자 "admin@example.com"이 등록되었습니다.</span>
              <span style={{ marginLeft: "auto", color: "#9ca3af" }}>5시간 전</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <Settings style={{ width: "1rem", height: "1rem", color: "#6b7280" }} />
              <span>시스템 설정이 업데이트되었습니다.</span>
              <span style={{ marginLeft: "auto", color: "#9ca3af" }}>1일 전</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

