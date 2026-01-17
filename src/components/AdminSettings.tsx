"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Save, RefreshCw } from "lucide-react"

export default function AdminSettings() {
  const [settings, setSettings] = React.useState({
    siteName: "BMP Leaderboard",
    maxModelsPerUser: 10,
    autoApproveModels: false,
    maintenanceMode: false,
    emailNotifications: true,
    apiRateLimit: 100,
  })

  const [isSaving, setIsSaving] = React.useState(false)

  const handleSave = async () => {
    setIsSaving(true)
    // 실제로는 API 호출 필요
    setTimeout(() => {
      setIsSaving(false)
      alert("설정이 저장되었습니다.")
    }, 1000)
  }

  const handleReset = () => {
    if (confirm("모든 설정을 기본값으로 되돌리시겠습니까?")) {
      setSettings({
        siteName: "BMP Leaderboard",
        maxModelsPerUser: 10,
        autoApproveModels: false,
        maintenanceMode: false,
        emailNotifications: true,
        apiRateLimit: 100,
      })
    }
  }

  return (
    <div style={{ width: "100%", maxWidth: "800px" }}>
      {/* 제목 영역 */}
      <div style={{ marginBottom: "0.5rem" }}>
        <h1 style={{ 
          fontSize: "1.875rem",
          fontWeight: "600",
          color: "#111827",
          margin: 0,
          lineHeight: "1.2",
        }}>
          시스템 설정
        </h1>
        <p style={{
          fontSize: "1rem",
          color: "#6b7280",
          margin: "0.5rem 0 0 0",
          lineHeight: "1.5",
        }}>
          시스템 구성 및 환경 설정을 관리할 수 있습니다.
        </p>
      </div>

      {/* 설정 섹션 */}
      <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
        {/* 일반 설정 */}
        <div style={{
          backgroundColor: "#ffffff",
          borderRadius: "0.5rem",
          border: "1px solid #e5e7eb",
          padding: "1.5rem",
        }}>
          <h2 style={{ 
            fontSize: "1.25rem",
            fontWeight: "600",
            color: "#111827",
            margin: "0 0 1.5rem 0",
          }}>
            일반 설정
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <div>
              <label style={{ 
                display: "block",
                fontSize: "0.875rem",
                fontWeight: "500",
                color: "#374151",
                marginBottom: "0.5rem",
              }}>
                사이트 이름
              </label>
              <Input
                value={settings.siteName}
                onChange={(e) => setSettings(prev => ({ ...prev, siteName: e.target.value }))}
                style={{ maxWidth: "400px" }}
              />
            </div>
            <div>
              <label style={{ 
                display: "block",
                fontSize: "0.875rem",
                fontWeight: "500",
                color: "#374151",
                marginBottom: "0.5rem",
              }}>
                사용자당 최대 모델 수
              </label>
              <Input
                type="number"
                value={settings.maxModelsPerUser}
                onChange={(e) => setSettings(prev => ({ 
                  ...prev, 
                  maxModelsPerUser: parseInt(e.target.value) || 0 
                }))}
                style={{ maxWidth: "200px" }}
              />
            </div>
            <div>
              <label style={{ 
                display: "block",
                fontSize: "0.875rem",
                fontWeight: "500",
                color: "#374151",
                marginBottom: "0.5rem",
              }}>
                API Rate Limit (요청/시간)
              </label>
              <Input
                type="number"
                value={settings.apiRateLimit}
                onChange={(e) => setSettings(prev => ({ 
                  ...prev, 
                  apiRateLimit: parseInt(e.target.value) || 0 
                }))}
                style={{ maxWidth: "200px" }}
              />
            </div>
          </div>
        </div>

        {/* 모델 관리 설정 */}
        <div style={{
          backgroundColor: "#ffffff",
          borderRadius: "0.5rem",
          border: "1px solid #e5e7eb",
          padding: "1.5rem",
        }}>
          <h2 style={{ 
            fontSize: "1.25rem",
            fontWeight: "600",
            color: "#111827",
            margin: "0 0 1.5rem 0",
          }}>
            모델 관리 설정
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <label style={{ 
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              cursor: "pointer",
            }}>
              <input
                type="checkbox"
                checked={settings.autoApproveModels}
                onChange={(e) => setSettings(prev => ({ 
                  ...prev, 
                  autoApproveModels: e.target.checked 
                }))}
                style={{ width: "1rem", height: "1rem" }}
              />
              <span style={{ fontSize: "0.875rem", color: "#374151" }}>
                모델 자동 승인 활성화
              </span>
            </label>
          </div>
        </div>

        {/* 시스템 상태 */}
        <div style={{
          backgroundColor: "#ffffff",
          borderRadius: "0.5rem",
          border: "1px solid #e5e7eb",
          padding: "1.5rem",
        }}>
          <h2 style={{ 
            fontSize: "1.25rem",
            fontWeight: "600",
            color: "#111827",
            margin: "0 0 1.5rem 0",
          }}>
            시스템 상태
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <label style={{ 
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              cursor: "pointer",
            }}>
              <input
                type="checkbox"
                checked={settings.maintenanceMode}
                onChange={(e) => setSettings(prev => ({ 
                  ...prev, 
                  maintenanceMode: e.target.checked 
                }))}
                style={{ width: "1rem", height: "1rem" }}
              />
              <span style={{ fontSize: "0.875rem", color: "#374151" }}>
                유지보수 모드 활성화
              </span>
            </label>
            <label style={{ 
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              cursor: "pointer",
            }}>
              <input
                type="checkbox"
                checked={settings.emailNotifications}
                onChange={(e) => setSettings(prev => ({ 
                  ...prev, 
                  emailNotifications: e.target.checked 
                }))}
                style={{ width: "1rem", height: "1rem" }}
              />
              <span style={{ fontSize: "0.875rem", color: "#374151" }}>
                이메일 알림 활성화
              </span>
            </label>
          </div>
        </div>

        {/* 액션 버튼 */}
        <div style={{ 
          display: "flex", 
          gap: "0.75rem",
          justifyContent: "flex-end",
        }}>
          <Button
            variant="outline"
            onClick={handleReset}
            disabled={isSaving}
          >
            <RefreshCw style={{ width: "1rem", height: "1rem", marginRight: "0.5rem" }} />
            기본값으로 재설정
          </Button>
          <Button
            variant="default"
            onClick={handleSave}
            disabled={isSaving}
          >
            <Save style={{ width: "1rem", height: "1rem", marginRight: "0.5rem" }} />
            {isSaving ? "저장 중..." : "설정 저장"}
          </Button>
        </div>
      </div>
    </div>
  )
}

