"use client"

import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, Info, BarChart3 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogBody,
  DialogTrigger,
} from "@/components/ui/dialog"
import ModelRadarChart from "@/components/ModelRadarChart"
import ModelPerformanceCharts from "@/components/ModelPerformanceCharts"

// VQGAN 모델 데이터 타입 정의
export type VQGANModel = {
  id: string
  modelName: string
  modelCategory?: string // 모델 카테고리
  // 화질 지표
  psnr: number // dB, 값이 클수록 좋음
  ssim: number // 0-1, 값이 클수록 좋음
  lpips: number // 값이 작을수록 좋음
  fid?: number // 값이 작을수록 좋음
  // 압축 지표
  compressionRatio: number // 값이 클수록 좋음
  bpp: number // bits per pixel, 값이 작을수록 좋음
  // 속도 지표
  encodingTime: number // ms, 값이 작을수록 좋음
  decodingTime: number // ms, 값이 작을수록 좋음
  fps: number // Frames Per Second, 값이 클수록 좋음
  // 내부 지표
  perplexity?: number // 코드북 활용도
}

// 샘플 데이터
const data: VQGANModel[] = [
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

// 숫자 포맷팅 헬퍼 함수
const formatNumber = (value: number, decimals: number = 2): string => {
  return value.toFixed(decimals)
}

const formatTime = (ms: number): string => {
  return `${formatNumber(ms)}ms`
}

// 정규화 함수 (0-100 스케일)
const normalizeScore = (
  value: number,
  min: number,
  max: number,
  higherIsBetter: boolean = true
): number => {
  if (max === min) return 50 // 모든 값이 같으면 중간값 반환
  
  if (higherIsBetter) {
    // 높을수록 좋은 지표: (value - min) / (max - min) * 100
    return ((value - min) / (max - min)) * 100
  } else {
    // 낮을수록 좋은 지표: (max - value) / (max - min) * 100
    return ((max - value) / (max - min)) * 100
  }
}

// 데이터에서 각 지표의 최소/최대값 계산
const calculateMinMax = (
  data: VQGANModel[],
  key: keyof VQGANModel
): { min: number; max: number } => {
  const values = data
    .map((item) => item[key])
    .filter((val): val is number => typeof val === "number" && !isNaN(val))
  
  if (values.length === 0) {
    return { min: 0, max: 100 }
  }
  
  return {
    min: Math.min(...values),
    max: Math.max(...values),
  }
}

// 컬럼 정의 생성 함수 (토글 상태와 데이터를 받아서 동적으로 생성)
const createColumns = (
  isNormalized: boolean,
  allData: VQGANModel[]
): ColumnDef<VQGANModel>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "rank",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          onFocus={(e) => {
            e.currentTarget.style.outline = "none"
            e.currentTarget.style.border = "none"
            e.currentTarget.style.boxShadow = "none"
          }}
          style={{ 
            padding: 0, 
            height: "auto",
            fontWeight: "inherit",
            backgroundColor: "transparent",
            borderRadius: 0,
            outline: "none",
            border: "none",
            boxShadow: "none",
          }}
        >
          Rank
          <ArrowUpDown style={{ width: "1rem", height: "1rem", marginLeft: "0.5rem" }} />
        </Button>
      )
    },
    cell: ({ row, table }) => {
      const pageIndex = table.getState().pagination.pageIndex
      const pageSize = table.getState().pagination.pageSize
      const rank = pageIndex * pageSize + row.index + 1
      return (
        <div style={{ fontWeight: "500", textAlign: "center" }}>{rank}</div>
      )
    },
  },
  {
    accessorKey: "modelName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          onFocus={(e) => {
            e.currentTarget.style.outline = "none"
            e.currentTarget.style.border = "none"
            e.currentTarget.style.boxShadow = "none"
          }}
          style={{ 
            padding: 0, 
            height: "auto",
            fontWeight: "inherit",
            backgroundColor: "transparent",
            borderRadius: 0,
            outline: "none",
            border: "none",
            boxShadow: "none",
          }}
        >
          Model Name
          <ArrowUpDown style={{ width: "1rem", height: "1rem", marginLeft: "0.5rem" }} />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div style={{ fontWeight: "500" }}>{row.getValue("modelName")}</div>
    ),
  },
  {
    accessorKey: "psnr",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          onFocus={(e) => {
            e.currentTarget.style.outline = "none"
            e.currentTarget.style.border = "none"
            e.currentTarget.style.boxShadow = "none"
          }}
          style={{ 
            padding: 0, 
            height: "auto",
            fontWeight: "inherit",
            borderRadius: 0,
            outline: "none",
            border: "none",
            boxShadow: "none",
          }}
        >
          PSNR (dB)
          <ArrowUpDown style={{ width: "1rem", height: "1rem", marginLeft: "0.5rem" }} />
        </Button>
      )
    },
    cell: ({ row }) => {
      const psnr = parseFloat(row.getValue("psnr"))
      if (isNormalized) {
        const { min, max } = calculateMinMax(allData, "psnr")
        const normalized = normalizeScore(psnr, min, max, true)
        return <div>{formatNumber(normalized, 1)}점</div>
      }
      return <div>{formatNumber(psnr)}</div>
    },
  },
  {
    accessorKey: "ssim",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          onFocus={(e) => {
            e.currentTarget.style.outline = "none"
            e.currentTarget.style.border = "none"
            e.currentTarget.style.boxShadow = "none"
          }}
          style={{ 
            padding: 0, 
            height: "auto",
            fontWeight: "inherit",
            borderRadius: 0,
            outline: "none",
            border: "none",
            boxShadow: "none",
          }}
        >
          SSIM
          <ArrowUpDown style={{ width: "1rem", height: "1rem", marginLeft: "0.5rem" }} />
        </Button>
      )
    },
    cell: ({ row }) => {
      const ssim = parseFloat(row.getValue("ssim"))
      if (isNormalized) {
        const { min, max } = calculateMinMax(allData, "ssim")
        const normalized = normalizeScore(ssim, min, max, true)
        return <div>{formatNumber(normalized, 1)}점</div>
      }
      return <div>{formatNumber(ssim)}</div>
    },
  },
  {
    accessorKey: "lpips",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          onFocus={(e) => {
            e.currentTarget.style.outline = "none"
            e.currentTarget.style.border = "none"
            e.currentTarget.style.boxShadow = "none"
          }}
          style={{ 
            padding: 0, 
            height: "auto",
            fontWeight: "inherit",
            borderRadius: 0,
            outline: "none",
            border: "none",
            boxShadow: "none",
          }}
        >
          LPIPS
          <ArrowUpDown style={{ width: "1rem", height: "1rem", marginLeft: "0.5rem" }} />
        </Button>
      )
    },
    cell: ({ row }) => {
      const lpips = parseFloat(row.getValue("lpips"))
      if (isNormalized) {
        const { min, max } = calculateMinMax(allData, "lpips")
        const normalized = normalizeScore(lpips, min, max, false)
        return <div>{formatNumber(normalized, 1)}점</div>
      }
      return <div>{formatNumber(lpips)}</div>
    },
  },
  {
    accessorKey: "compressionRatio",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          onFocus={(e) => {
            e.currentTarget.style.outline = "none"
            e.currentTarget.style.border = "none"
            e.currentTarget.style.boxShadow = "none"
          }}
          style={{ 
            padding: 0, 
            height: "auto",
            fontWeight: "inherit",
            borderRadius: 0,
            outline: "none",
            border: "none",
            boxShadow: "none",
          }}
        >
          압축률
          <ArrowUpDown style={{ width: "1rem", height: "1rem", marginLeft: "0.5rem" }} />
        </Button>
      )
    },
    cell: ({ row }) => {
      const ratio = parseFloat(row.getValue("compressionRatio"))
      if (isNormalized) {
        const { min, max } = calculateMinMax(allData, "compressionRatio")
        const normalized = normalizeScore(ratio, min, max, true)
        return <div>{formatNumber(normalized, 1)}점</div>
      }
      return <div>{formatNumber(ratio)}x</div>
    },
  },
  {
    accessorKey: "bpp",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          onFocus={(e) => {
            e.currentTarget.style.outline = "none"
            e.currentTarget.style.border = "none"
            e.currentTarget.style.boxShadow = "none"
          }}
          style={{ 
            padding: 0, 
            height: "auto",
            fontWeight: "inherit",
            borderRadius: 0,
            outline: "none",
            border: "none",
            boxShadow: "none",
          }}
        >
          bpp
          <ArrowUpDown style={{ width: "1rem", height: "1rem", marginLeft: "0.5rem" }} />
        </Button>
      )
    },
    cell: ({ row }) => {
      const bpp = parseFloat(row.getValue("bpp"))
      if (isNormalized) {
        const { min, max } = calculateMinMax(allData, "bpp")
        const normalized = normalizeScore(bpp, min, max, false)
        return <div>{formatNumber(normalized, 1)}점</div>
      }
      return <div>{formatNumber(bpp)}</div>
    },
  },
  {
    accessorKey: "encodingTime",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          onFocus={(e) => {
            e.currentTarget.style.outline = "none"
            e.currentTarget.style.border = "none"
            e.currentTarget.style.boxShadow = "none"
          }}
          style={{ 
            padding: 0, 
            height: "auto",
            fontWeight: "inherit",
            borderRadius: 0,
            outline: "none",
            border: "none",
            boxShadow: "none",
          }}
        >
          인코딩 시간
          <ArrowUpDown style={{ width: "1rem", height: "1rem", marginLeft: "0.5rem" }} />
        </Button>
      )
    },
    cell: ({ row }) => {
      const time = parseFloat(row.getValue("encodingTime"))
      if (isNormalized) {
        const { min, max } = calculateMinMax(allData, "encodingTime")
        const normalized = normalizeScore(time, min, max, false)
        return <div>{formatNumber(normalized, 1)}점</div>
      }
      return <div>{formatTime(time)}</div>
    },
  },
  {
    accessorKey: "decodingTime",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          onFocus={(e) => {
            e.currentTarget.style.outline = "none"
            e.currentTarget.style.border = "none"
            e.currentTarget.style.boxShadow = "none"
          }}
          style={{ 
            padding: 0, 
            height: "auto",
            fontWeight: "inherit",
            borderRadius: 0,
            outline: "none",
            border: "none",
            boxShadow: "none",
          }}
        >
          디코딩 시간
          <ArrowUpDown style={{ width: "1rem", height: "1rem", marginLeft: "0.5rem" }} />
        </Button>
      )
    },
    cell: ({ row }) => {
      const time = parseFloat(row.getValue("decodingTime"))
      if (isNormalized) {
        const { min, max } = calculateMinMax(allData, "decodingTime")
        const normalized = normalizeScore(time, min, max, false)
        return <div>{formatNumber(normalized, 1)}점</div>
      }
      return <div>{formatTime(time)}</div>
    },
  },
  {
    accessorKey: "fps",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          onFocus={(e) => {
            e.currentTarget.style.outline = "none"
            e.currentTarget.style.border = "none"
            e.currentTarget.style.boxShadow = "none"
          }}
          style={{ 
            padding: 0, 
            height: "auto",
            fontWeight: "inherit",
            borderRadius: 0,
            outline: "none",
            border: "none",
            boxShadow: "none",
          }}
        >
          FPS
          <ArrowUpDown style={{ width: "1rem", height: "1rem", marginLeft: "0.5rem" }} />
        </Button>
      )
    },
    cell: ({ row }) => {
      const fps = parseFloat(row.getValue("fps"))
      if (isNormalized) {
        const { min, max } = calculateMinMax(allData, "fps")
        const normalized = normalizeScore(fps, min, max, true)
        return <div>{formatNumber(normalized, 1)}점</div>
      }
      return <div>{formatNumber(fps)}</div>
    },
  },
]

export default function ModelLeaderboard() {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
  const [isNormalized, setIsNormalized] = React.useState<boolean>(false) // 정규화 토글 상태

  // 로컬 스토리지에서 등록된 모델 가져오기
  const [registeredModels, setRegisteredModels] = React.useState<VQGANModel[]>([])
  const [deletedDefaultModels, setDeletedDefaultModels] = React.useState<string[]>([])

  // 로컬 스토리지에서 모델 데이터 읽기 함수
  const loadRegisteredModels = React.useCallback(() => {
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

    // 삭제된 기본 모델 목록 로드
    const deleted = JSON.parse(localStorage.getItem("deletedDefaultModels") || "[]")
    setDeletedDefaultModels(deleted)
  }, [])

  React.useEffect(() => {
    // 초기 로드
    loadRegisteredModels()

    // 커스텀 이벤트 리스너 등록 (모델 등록 시 리더보드 업데이트)
    const handleModelUpdate = () => {
      loadRegisteredModels()
    }
    window.addEventListener("modelRegistered", handleModelUpdate)

    // storage 이벤트 리스너 (다른 탭에서 변경된 경우)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "vqganModels" || e.key === "deletedDefaultModels") {
        loadRegisteredModels()
      }
    }
    window.addEventListener("storage", handleStorageChange)

    return () => {
      window.removeEventListener("modelRegistered", handleModelUpdate)
      window.removeEventListener("storage", handleStorageChange)
    }
  }, [loadRegisteredModels])

  // 기존 샘플 데이터와 등록된 모델 합치기 (삭제된 기본 모델 제외)
  const allData = React.useMemo(() => {
    const activeDefaultModels = data.filter((m) => !deletedDefaultModels.includes(m.id))
    return [...activeDefaultModels, ...registeredModels]
  }, [registeredModels, deletedDefaultModels])

  // 토글 상태에 따라 동적으로 컬럼 생성
  const columns = React.useMemo(() => {
    return createColumns(isNormalized, allData)
  }, [isNormalized, allData])

  const table = useReactTable({
    data: allData,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  // 디폴트로 상위 3개 모델 선택 (초기 로드 시 한 번만 실행)
  const hasInitializedSelection = React.useRef(false)
  
  React.useEffect(() => {
    // 데이터가 있고, 아직 초기화되지 않았을 때만 초기 선택 수행
    if (allData.length > 0 && !hasInitializedSelection.current) {
      // 테이블이 준비될 때까지 약간의 지연
      const timer = setTimeout(() => {
        const filteredRows = table.getFilteredRowModel().rows
        const top3Rows = filteredRows.slice(0, 3)
        
        if (top3Rows.length > 0) {
          const initialSelection: Record<string, boolean> = {}
          top3Rows.forEach((row) => {
            initialSelection[row.id] = true
          })
          setRowSelection(initialSelection)
          hasInitializedSelection.current = true
        }
      }, 0)
      
      return () => clearTimeout(timer)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allData.length])

  return (
    <div style={{ width: "100%" }}>
      {/* 제목 및 설명 영역 */}
      <div style={{ marginBottom: "0.5rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
          <h1 style={{ 
            fontSize: "1.875rem",
            fontWeight: "600",
            color: "#111827",
            margin: 0,
            lineHeight: "1.2",
          }}>
            Leaderboard Overview
          </h1>
          <Dialog>
            <DialogTrigger asChild>
              <button
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "1.25rem",
                  height: "1.25rem",
                  borderRadius: "50%",
                  border: "none",
                  backgroundColor: "transparent",
                  color: "#6b7280",
                  cursor: "pointer",
                  padding: 0,
                  marginTop: "0.125rem",
                  transition: "color 0.15s ease-in-out",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#3b82f6"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "#6b7280"
                }}
                aria-label="지표 및 용어 설명 보기"
              >
                <Info style={{ width: "1.25rem", height: "1.25rem" }} />
              </button>
            </DialogTrigger>
            <DialogContent style={{ maxWidth: "50rem" }}>
              <DialogHeader>
                <DialogTitle>지표 및 용어 설명</DialogTitle>
              </DialogHeader>
              <DialogBody>
                <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                  {/* 화질 지표 */}
                  <div>
                    <h3 style={{ 
                      fontSize: "1.25rem", 
                      fontWeight: "700", 
                      color: "#111827", 
                      margin: "0 0 0.75rem 0" 
                    }}>
                      🎨 화질 지표
                    </h3>
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                      <div style={{ paddingLeft: "1rem" }}>
                        <strong style={{ color: "#374151" }}>• PSNR (Peak Signal-to-Noise Ratio)</strong>
                        <p style={{ fontSize: "0.875rem", color: "#6b7280", margin: "0.25rem 0 0 0", paddingLeft: "1rem" }}>
                          이미지 품질을 측정하는 지표입니다. 값이 클수록 원본과 유사한 고품질 이미지를 의미합니다. 단위는 dB입니다.
                        </p>
                      </div>
                      <div style={{ paddingLeft: "1rem" }}>
                        <strong style={{ color: "#374151" }}>• SSIM (Structural Similarity Index)</strong>
                        <p style={{ fontSize: "0.875rem", color: "#6b7280", margin: "0.25rem 0 0 0", paddingLeft: "1rem" }}>
                          이미지의 구조적 유사성을 측정하는 지표입니다. 0-1 사이의 값을 가지며, 값이 클수록 원본과 구조적으로 유사합니다.
                        </p>
                      </div>
                      <div style={{ paddingLeft: "1rem" }}>
                        <strong style={{ color: "#374151" }}>• LPIPS (Learned Perceptual Image Patch Similarity)</strong>
                        <p style={{ fontSize: "0.875rem", color: "#6b7280", margin: "0.25rem 0 0 0", paddingLeft: "1rem" }}>
                          인간의 시각적 지각을 기반으로 한 이미지 유사도 지표입니다. 값이 작을수록 인간이 인지하는 품질이 높습니다.
                        </p>
                      </div>
                      <div style={{ paddingLeft: "1rem" }}>
                        <strong style={{ color: "#374151" }}>• FID (Fréchet Inception Distance)</strong>
                        <p style={{ fontSize: "0.875rem", color: "#6b7280", margin: "0.25rem 0 0 0", paddingLeft: "1rem" }}>
                          생성된 이미지와 실제 이미지 간의 분포 차이를 측정하는 지표입니다. 값이 작을수록 더 현실적인 이미지를 생성합니다.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* 압축 지표 */}
                  <div>
                    <h3 style={{ 
                      fontSize: "1.25rem", 
                      fontWeight: "700", 
                      color: "#111827", 
                      margin: "0 0 0.75rem 0" 
                    }}>
                      📦 압축 지표
                    </h3>
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                      <div style={{ paddingLeft: "1rem" }}>
                        <strong style={{ color: "#374151" }}>• 압축률 (Compression Ratio)</strong>
                        <p style={{ fontSize: "0.875rem", color: "#6b7280", margin: "0.25rem 0 0 0", paddingLeft: "1rem" }}>
                          원본 데이터 대비 압축된 데이터의 크기 비율입니다. 값이 클수록 더 높은 압축률을 의미합니다.
                        </p>
                      </div>
                      <div style={{ paddingLeft: "1rem" }}>
                        <strong style={{ color: "#374151" }}>• bpp (bits per pixel)</strong>
                        <p style={{ fontSize: "0.875rem", color: "#6b7280", margin: "0.25rem 0 0 0", paddingLeft: "1rem" }}>
                          픽셀당 사용되는 비트 수를 나타냅니다. 값이 작을수록 더 효율적인 압축을 의미합니다.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* 속도 지표 */}
                  <div>
                    <h3 style={{ 
                      fontSize: "1.25rem", 
                      fontWeight: "700", 
                      color: "#111827", 
                      margin: "0 0 0.75rem 0" 
                    }}>
                      ⚡ 속도 지표
                    </h3>
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                      <div style={{ paddingLeft: "1rem" }}>
                        <strong style={{ color: "#374151" }}>• 인코딩 시간 (Encoding Time)</strong>
                        <p style={{ fontSize: "0.875rem", color: "#6b7280", margin: "0.25rem 0 0 0", paddingLeft: "1rem" }}>
                          이미지를 압축하는데 소요되는 시간입니다. 단위는 밀리초(ms)이며, 값이 작을수록 빠른 처리 속도를 의미합니다.
                        </p>
                      </div>
                      <div style={{ paddingLeft: "1rem" }}>
                        <strong style={{ color: "#374151" }}>• 디코딩 시간 (Decoding Time)</strong>
                        <p style={{ fontSize: "0.875rem", color: "#6b7280", margin: "0.25rem 0 0 0", paddingLeft: "1rem" }}>
                          압축된 이미지를 복원하는데 소요되는 시간입니다. 단위는 밀리초(ms)이며, 값이 작을수록 빠른 처리 속도를 의미합니다.
                        </p>
                      </div>
                      <div style={{ paddingLeft: "1rem" }}>
                        <strong style={{ color: "#374151" }}>• FPS (Frames Per Second)</strong>
                        <p style={{ fontSize: "0.875rem", color: "#6b7280", margin: "0.25rem 0 0 0", paddingLeft: "1rem" }}>
                          초당 처리할 수 있는 프레임 수를 나타냅니다. 값이 클수록 더 빠른 실시간 처리가 가능합니다.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* 내부 지표 */}
                  <div>
                    <h3 style={{ 
                      fontSize: "1.25rem", 
                      fontWeight: "700", 
                      color: "#111827", 
                      margin: "0 0 0.75rem 0" 
                    }}>
                      🔬 내부 지표
                    </h3>
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                      <div style={{ paddingLeft: "1rem" }}>
                        <strong style={{ color: "#374151" }}>• Perplexity</strong>
                        <p style={{ fontSize: "0.875rem", color: "#6b7280", margin: "0.25rem 0 0 0", paddingLeft: "1rem" }}>
                          코드북(codebook)의 활용도를 나타내는 지표입니다. 값이 클수록 더 다양한 코드를 활용하여 더 풍부한 표현이 가능합니다.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </DialogBody>
            </DialogContent>
          </Dialog>
        </div>
        <p style={{
          fontSize: "1rem",
          color: "#6b7280",
          margin: 0,
          lineHeight: "1.5",
        }}>
          See how leading models stack up across text, image, vision, and beyond.
        </p>
      </div>
      
      {/* 필터 및 컬럼 표시 영역 */}
      <div style={{ display: "flex", alignItems: "center", padding: "1rem 0", gap: "1rem" }}>
        <Input
          placeholder="모델명으로 검색..."
          value={(table.getColumn("modelName")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("modelName")?.setFilterValue(event.target.value)
          }
          style={{ maxWidth: "24rem" }}
        />
        {/* 정규화 점수 토글 버튼 */}
        <Button
          variant={isNormalized ? "default" : "outline"}
          onClick={() => setIsNormalized(!isNormalized)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            backgroundColor: isNormalized ? "#3b82f6" : "transparent",
            color: isNormalized ? "#ffffff" : undefined,
          }}
        >
          <BarChart3 style={{ width: "1rem", height: "1rem" }} />
          {isNormalized ? "정규화 점수 (0-100)" : "원본 값"}
        </Button>
        <div style={{ marginLeft: "auto" }}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                컬럼 표시 <ChevronDown style={{ width: "1rem", height: "1rem", opacity: 0.5 }} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" style={{ minWidth: "10rem" }}>
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) => {
                      column.toggleVisibility(!!value)
                    }}
                  >
                    {column.id === "rank" ? "Rank" :
                     column.id === "modelName" ? "모델명" :
                     column.id === "psnr" ? "PSNR" :
                     column.id === "ssim" ? "SSIM" :
                     column.id === "lpips" ? "LPIPS" :
                     column.id === "compressionRatio" ? "압축률" :
                     column.id === "bpp" ? "bpp" :
                     column.id === "encodingTime" ? "인코딩 시간" :
                     column.id === "decodingTime" ? "디코딩 시간" :
                     column.id === "fps" ? "FPS" : column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div style={{ 
        overflow: "hidden", 
        borderRadius: "0.375rem", 
        border: "1px solid #e5e7eb", 
        backgroundColor: "#ffffff",
        width: "100%",
      }}>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  style={{ height: "6rem", textAlign: "center" }}
                >
                  결과가 없습니다.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1rem 0" }}>
        <div style={{ fontSize: "0.875rem", color: "#6b7280", flex: 1 }}>
          {table.getFilteredSelectedRowModel().rows.length}개 /{" "}
          {table.getFilteredRowModel().rows.length}개 모델 선택됨
        </div>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            이전
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            다음
          </Button>
        </div>
      </div>

      {/* 모델별 성과지표 레이더 차트 */}
      {(() => {
        // 선택된 행의 모델 데이터 추출
        const selectedModels = table.getSelectedRowModel().rows.map((row) => row.original)
        
        // 선택된 모델이 없으면 빈 배열 전달 (차트가 빈 상태 표시)
        // 전체 데이터셋(allData)을 전달하여 단일 모델 선택 시에도 정확한 정규화 점수 계산
        return <ModelRadarChart data={selectedModels} allData={allData} />
      })()}

      {/* 추가 성과지표 시각화 차트 */}
      {(() => {
        // 선택된 행의 모델 데이터 추출
        const selectedModels = table.getSelectedRowModel().rows.map((row) => row.original)
        
        if (selectedModels.length === 0) {
          return (
            <div style={{
              marginTop: "3rem",
              padding: "2rem",
              textAlign: "center",
              backgroundColor: "#ffffff",
              borderRadius: "0.5rem",
              border: "1px solid #e5e7eb",
            }}>
              <p style={{ color: "#6b7280", margin: 0 }}>
                성과지표 차트를 보려면 위 테이블에서 모델을 선택해주세요.
              </p>
            </div>
          )
        }
        
        return <ModelPerformanceCharts data={selectedModels} allData={allData} />
      })()}
    </div>
  )
}

