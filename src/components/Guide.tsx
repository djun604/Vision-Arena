"use client"

import * as React from "react"
import Link from "next/link"
import { Trophy, Plus, Play, BarChart3, ArrowRight, CheckCircle2 } from "lucide-react"

export default function Guide() {
  const steps = [
    {
      number: 1,
      title: "모델 등록",
      description: "새로운 모델을 시스템에 등록합니다.",
      icon: <Plus style={{ width: "2rem", height: "2rem" }} />,
      details: [
        "Model 메뉴에서 'Add Model' 버튼 클릭",
        "모델 이름, 프레임워크, 체크포인트 경로 등 정보 입력",
        "기본 벤치마크용 데이터셋과 평가 지표 선택",
        "모델 등록 완료",
      ],
      link: "/model/add",
      linkText: "모델 등록하러 가기",
    },
    {
      number: 2,
      title: "평가 실행",
      description: "등록한 모델을 벤치마크용 데이터셋으로 평가합니다.",
      icon: <Play style={{ width: "2rem", height: "2rem" }} />,
      details: [
        "Run / Evaluate 메뉴에서 모델 선택",
        "평가할 벤치마크용 데이터셋 선택 (Kodak24, CIFAR10, CLIC 등)",
        "'평가 실행' 버튼 클릭",
        "평가 완료 후 결과 자동 저장",
      ],
      link: "/run-evaluate",
      linkText: "평가 실행하러 가기",
    },
    {
      number: 3,
      title: "결과 확인",
      description: "리더보드에서 모델 성능을 비교합니다.",
      icon: <BarChart3 style={{ width: "2rem", height: "2rem" }} />,
      details: [
        "Leaderboard 메뉴에서 전체 모델 성능 확인",
        "PSNR, SSIM, LPIPS 등 지표 비교",
        "레이더 차트로 종합 성능 시각화",
        "모델별 상세 성능 분석",
      ],
      link: "/leaderboard",
      linkText: "리더보드 보러 가기",
    },
  ]

  return (
    <div style={{ width: "100%" }}>
      {/* 헤더 섹션 */}
      <div
        style={{
          backgroundColor: "#ffffff",
          padding: "3rem 2rem",
          borderRadius: "0.5rem",
          border: "1px solid #e5e7eb",
          marginBottom: "3rem",
          textAlign: "center",
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: "4rem",
            height: "4rem",
            borderRadius: "50%",
            backgroundColor: "#f0f9ff",
            marginBottom: "1.5rem",
          }}
        >
          <Trophy style={{ width: "2rem", height: "2rem", color: "#3b82f6" }} />
        </div>
        <h1
          style={{
            fontSize: "2.25rem",
            fontWeight: "700",
            color: "#111827",
            marginBottom: "1rem",
            lineHeight: "1.2",
          }}
        >
          모델 평가 워크플로우 가이드
        </h1>
        <p
          style={{
            fontSize: "1.125rem",
            color: "#6b7280",
            maxWidth: "42rem",
            margin: "0 auto",
            lineHeight: "1.6",
          }}
        >
          모델을 등록하고 평가하여 리더보드에서 성능을 비교하는 전체 과정을
          <br />
          3단계로 쉽게 따라해보세요.
        </p>
      </div>

      {/* 워크플로우 단계 */}
      <div style={{ display: "flex", flexDirection: "column", gap: "2rem", marginBottom: "3rem" }}>
        {steps.map((step, index) => (
          <div key={step.number}>
            <div
              style={{
                backgroundColor: "#ffffff",
                padding: "2.5rem",
                borderRadius: "0.5rem",
                border: "1px solid #e5e7eb",
                position: "relative",
              }}
            >
              {/* 단계 번호 배지 */}
              <div
                style={{
                  position: "absolute",
                  top: "-1.5rem",
                  left: "2.5rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "3rem",
                  height: "3rem",
                  borderRadius: "50%",
                  backgroundColor: "#3b82f6",
                  color: "#ffffff",
                  fontSize: "1.25rem",
                  fontWeight: "700",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                }}
              >
                {step.number}
              </div>

              <div style={{ display: "flex", gap: "2rem", alignItems: "flex-start" }}>
                {/* 아이콘 영역 */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "5rem",
                    height: "5rem",
                    borderRadius: "0.75rem",
                    backgroundColor: "#f0f9ff",
                    color: "#3b82f6",
                    flexShrink: 0,
                  }}
                >
                  {step.icon}
                </div>

                {/* 내용 영역 */}
                <div style={{ flex: 1 }}>
                  <h2
                    style={{
                      fontSize: "1.5rem",
                      fontWeight: "600",
                      color: "#111827",
                      marginBottom: "0.5rem",
                    }}
                  >
                    {step.title}
                  </h2>
                  <p
                    style={{
                      fontSize: "1rem",
                      color: "#6b7280",
                      marginBottom: "1.5rem",
                      lineHeight: "1.6",
                    }}
                  >
                    {step.description}
                  </p>

                  {/* 상세 단계 */}
                  <div style={{ marginBottom: "1.5rem" }}>
                    {step.details.map((detail, detailIndex) => (
                      <div
                        key={detailIndex}
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: "0.75rem",
                          marginBottom: "0.75rem",
                        }}
                      >
                        <CheckCircle2
                          style={{
                            width: "1.25rem",
                            height: "1.25rem",
                            color: "#10b981",
                            marginTop: "0.125rem",
                            flexShrink: 0,
                          }}
                        />
                        <span style={{ fontSize: "0.9375rem", color: "#374151", lineHeight: "1.5" }}>
                          {detail}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* 링크 버튼 */}
                  <Link
                    href={step.link}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      padding: "0.625rem 1.25rem",
                      backgroundColor: "#000000",
                      color: "#ffffff",
                      borderRadius: "0.375rem",
                      fontSize: "0.875rem",
                      fontWeight: "500",
                      textDecoration: "none",
                      transition: "all 0.15s ease-in-out",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#374151"
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "#000000"
                    }}
                  >
                    {step.linkText}
                    <ArrowRight style={{ width: "1rem", height: "1rem" }} />
                  </Link>
                </div>
              </div>
            </div>

            {/* 화살표 (마지막 단계 제외) */}
            {index < steps.length - 1 && (
              <div style={{ display: "flex", justifyContent: "center", margin: "1rem 0" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "3rem",
                    height: "3rem",
                    borderRadius: "50%",
                    backgroundColor: "#f3f4f6",
                    color: "#6b7280",
                  }}
                >
                  <ArrowRight
                    style={{
                      width: "1.5rem",
                      height: "1.5rem",
                      transform: "rotate(90deg)",
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* 팁 섹션 */}
      <div
        style={{
          backgroundColor: "#f0f9ff",
          padding: "2rem",
          borderRadius: "0.5rem",
          border: "1px solid #bfdbfe",
        }}
      >
        <h3
          style={{
            fontSize: "1.25rem",
            fontWeight: "600",
            color: "#111827",
            marginBottom: "1rem",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          💡 유용한 팁
        </h3>
        <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          <li style={{ fontSize: "0.9375rem", color: "#374151", lineHeight: "1.6" }}>
            • 모델을 등록한 후에는 반드시 평가를 실행해야 리더보드에 성능 지표가 표시됩니다.
          </li>
          <li style={{ fontSize: "0.9375rem", color: "#374151", lineHeight: "1.6" }}>
            • 여러 벤치마크용 데이터셋으로 평가하면 더 정확한 성능 비교가 가능합니다.
          </li>
          <li style={{ fontSize: "0.9375rem", color: "#374151", lineHeight: "1.6" }}>
            • 리더보드에서 모델을 선택하면 레이더 차트로 종합 성능을 한눈에 볼 수 있습니다.
          </li>
          <li style={{ fontSize: "0.9375rem", color: "#374151", lineHeight: "1.6" }}>
            • 평가 실행 중에는 다른 작업을 할 수 있으며, 완료되면 자동으로 결과가 저장됩니다.
          </li>
        </ul>
      </div>
    </div>
  )
}

