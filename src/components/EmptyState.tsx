"use client"

import * as React from "react"

interface EmptyStateProps {
  categoryName?: string
}

export default function EmptyState({ categoryName }: EmptyStateProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "60vh",
        padding: "3rem 2rem",
        textAlign: "center",
      }}
    >
      {/* 이미지 영역 */}
      <div
        style={{
          width: "72px",
          height: "72px",
          marginBottom: "1rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f9fafb",
          borderRadius: "1rem",
          border: "1px solid #e5e7eb",
        }}
      >
        <svg
          width="42"
          height="42"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ opacity: 0.5 }}
        >
          <path
            d="M9 12h6M9 16h6M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7.586a1 1 0 0 1 .707.293l4.414 4.414a1 1 0 0 1 .293.707V19a2 2 0 0 1-2 2z"
            stroke="#9ca3af"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="12" cy="8" r="2" fill="#9ca3af" />
        </svg>
      </div>

      {/* 텍스트 영역 */}
      <h2
        style={{
          fontSize: "1.5rem",
          fontWeight: "600",
          color: "#111827",
          marginBottom: "0.5rem",
        }}
      >
        모델이 없습니다
      </h2>
      <p
        style={{
          fontSize: "1rem",
          color: "#6b7280",
          margin: 0,
          maxWidth: "32rem",
          lineHeight: "1.5",
        }}
      >
        {categoryName
          ? `${categoryName} 카테고리에 등록된 모델이 없습니다.`
          : "등록된 모델이 없습니다."}
        <br />
        곧 추가될 예정입니다.
      </p>
    </div>
  )
}

