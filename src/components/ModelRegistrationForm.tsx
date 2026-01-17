"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { useRouter } from "next/navigation"

interface ModelFormData {
  // Basic Info
  modelCategory: string
  modelName: string
  modelId: string
  taskType: string
  framework: string
  
  // Code & Checkpoint
  repositoryType: string
  repositoryUrl: string
  checkpointSource: string
  checkpointPath: string
  modelClassPath: string
  
  // IO & Interface
  inputSizeType: string
  inputWidth: number
  inputHeight: number
  inputRange: string
  outputRange: string
  supportedReconstruct: boolean
  supportedEncode: boolean
  supportedDecode: boolean
  supportedCompress: boolean
  
  // Evaluation Defaults
  defaultBenchmarks: string[]
  defaultMetrics: string[]
  
  // Ownership & Visibility
  owner: string
  visibility: string
  license: string
  citation: string
  tags: string
}

export default function ModelRegistrationForm() {
  const router = useRouter()
  const [formData, setFormData] = React.useState<ModelFormData>({
    modelCategory: "",
    modelName: "",
    modelId: "",
    taskType: "",
    framework: "",
    repositoryType: "",
    repositoryUrl: "",
    checkpointSource: "",
    checkpointPath: "",
    modelClassPath: "",
    inputSizeType: "Fixed",
    inputWidth: 256,
    inputHeight: 256,
    inputRange: "[0, 1]",
    outputRange: "[0, 1]",
    supportedReconstruct: true,
    supportedEncode: false,
    supportedDecode: false,
    supportedCompress: false,
    defaultBenchmarks: [],
    defaultMetrics: [],
    owner: "current_user", // 실제로는 현재 로그인한 유저
    visibility: "Private",
    license: "",
    citation: "",
    tags: "",
  })

  const [errors, setErrors] = React.useState<Record<string, string>>({})

  // Model Name에서 Model ID 자동 생성
  React.useEffect(() => {
    if (formData.modelName && !formData.modelId) {
      const generatedId = formData.modelName
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "_")
        .replace(/^_+|_+$/g, "")
      setFormData((prev) => ({ ...prev, modelId: generatedId }))
    }
  }, [formData.modelName])

  // 필수 필드 검증
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.modelName || formData.modelName.trim() === "") {
      newErrors.modelName = "Model Name을 입력해주세요."
    }

    if (!formData.modelId || formData.modelId.trim() === "") {
      newErrors.modelId = "Model ID를 입력해주세요."
    }

    if (!formData.taskType) {
      newErrors.taskType = "Task Type을 선택해주세요."
    }

    if (!formData.framework) {
      newErrors.framework = "Framework를 선택해주세요."
    }

    if (!formData.repositoryType) {
      newErrors.repositoryType = "Repository Type을 선택해주세요."
    }

    if (!formData.repositoryUrl || formData.repositoryUrl.trim() === "") {
      newErrors.repositoryUrl = "Repository URL을 입력해주세요."
    }

    if (!formData.checkpointSource) {
      newErrors.checkpointSource = "Checkpoint Source를 선택해주세요."
    }

    if (!formData.checkpointPath || formData.checkpointPath.trim() === "") {
      newErrors.checkpointPath = "Checkpoint Path를 입력해주세요."
    }

    if (!formData.modelClassPath || formData.modelClassPath.trim() === "") {
      newErrors.modelClassPath = "Model Class Path를 입력해주세요."
    }

    if (!formData.supportedReconstruct && !formData.supportedEncode && !formData.supportedDecode && !formData.supportedCompress) {
      newErrors.supportedInterface = "최소 하나의 Interface를 선택해주세요."
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (field: keyof ModelFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
  }

  const handleMultiSelect = (field: "defaultBenchmarks" | "defaultMetrics", value: string) => {
    setFormData((prev) => {
      const current = prev[field]
      const index = current.indexOf(value)
      if (index > -1) {
        return { ...prev, [field]: current.filter((v) => v !== value) }
      } else {
        return { ...prev, [field]: [...current, value] }
      }
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    // 로컬 스토리지에 저장
    const existingModels = JSON.parse(localStorage.getItem("vqganModels") || "[]")
    const newModel = {
      id: `model-${Date.now()}`,
      ...formData,
      // 기존 VQGANModel 형식과 호환성을 위해 성능 지표는 기본값으로 설정
      modelName: formData.modelName,
      psnr: 0,
      ssim: 0,
      lpips: 0,
      compressionRatio: 0,
      bpp: 0,
      encodingTime: 0,
      decodingTime: 0,
      fps: 0,
    }

    const updatedModels = [...existingModels, newModel]
    localStorage.setItem("vqganModels", JSON.stringify(updatedModels))
    window.dispatchEvent(new Event("modelRegistered"))

    alert("모델이 성공적으로 등록되었습니다!")
    router.push("/model")
  }

  return (
    <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
      <h1
        style={{
          fontSize: "1.875rem",
          fontWeight: "600",
          color: "#111827",
          marginBottom: "0.5rem",
        }}
      >
        Add Model
      </h1>
      <p
        style={{
          fontSize: "1rem",
          color: "#6b7280",
          marginBottom: "2rem",
        }}
      >
        새로운 모델을 등록하고 리더보드에 추가하세요.
      </p>

      <form onSubmit={handleSubmit}>
        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          {/* 섹션 1: Basic Info */}
          <div
            style={{
              backgroundColor: "#ffffff",
              padding: "2rem",
              borderRadius: "0.5rem",
              border: "1px solid #e5e7eb",
            }}
          >
            <h2
              style={{
                fontSize: "1.25rem",
                fontWeight: "600",
                color: "#111827",
                marginBottom: "1.5rem",
                paddingBottom: "0.75rem",
                borderBottom: "1px solid #e5e7eb",
              }}
            >
              Basic Info
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "0.875rem",
                    fontWeight: "500",
                    color: "#374151",
                    marginBottom: "0.5rem",
                  }}
                >
                  Model Category
                </label>
                <select
                  value={formData.modelCategory}
                  onChange={(e) => handleInputChange("modelCategory", e.target.value)}
                  style={{
                    width: "100%",
                    height: "2.5rem",
                    padding: "0 0.75rem",
                    fontSize: "0.875rem",
                    borderRadius: "0.375rem",
                    border: "1px solid #e5e7eb",
                    backgroundColor: "#ffffff",
                  }}
                >
                  <option value="">선택하세요</option>
                  <option value="Text">Text</option>
                  <option value="WebDev">WebDev</option>
                  <option value="Vision">Vision</option>
                  <option value="Text-to-Image">Text-to-Image</option>
                  <option value="Image Edit">Image Edit</option>
                  <option value="Search">Search</option>
                  <option value="Text-to-Video">Text-to-Video</option>
                  <option value="Image-to-Video">Image-to-Video</option>
                </select>
              </div>

              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "0.875rem",
                    fontWeight: "500",
                    color: "#374151",
                    marginBottom: "0.5rem",
                  }}
                >
                  Model Name <span style={{ color: "#ef4444" }}>*</span>
                </label>
                <Input
                  value={formData.modelName}
                  onChange={(e) => handleInputChange("modelName", e.target.value)}
                  placeholder="예: VQGAN ImageNet f=16, 1024"
                  style={{ width: "100%" }}
                />
                {errors.modelName && (
                  <p style={{ fontSize: "0.875rem", color: "#ef4444", marginTop: "0.25rem" }}>
                    {errors.modelName}
                  </p>
                )}
              </div>

              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "0.875rem",
                    fontWeight: "500",
                    color: "#374151",
                    marginBottom: "0.5rem",
                  }}
                >
                  Model ID <span style={{ color: "#ef4444" }}>*</span>
                </label>
                <Input
                  value={formData.modelId}
                  onChange={(e) => handleInputChange("modelId", e.target.value)}
                  placeholder="예: vqgan_imagenet_f16_1024"
                  style={{ width: "100%" }}
                />
                <p style={{ fontSize: "0.75rem", color: "#6b7280", marginTop: "0.25rem" }}>
                  영문, 숫자, 밑줄만 사용 가능합니다.
                </p>
                {errors.modelId && (
                  <p style={{ fontSize: "0.875rem", color: "#ef4444", marginTop: "0.25rem" }}>
                    {errors.modelId}
                  </p>
                )}
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", alignItems: "start", width: "100%", boxSizing: "border-box" }}>
                <div style={{ minWidth: 0, overflow: "hidden" }}>
                  <label
                    style={{
                      display: "block",
                      fontSize: "0.875rem",
                      fontWeight: "500",
                      color: "#374151",
                      marginBottom: "0.5rem",
                    }}
                  >
                    Task Type <span style={{ color: "#ef4444" }}>*</span>
                  </label>
                  <select
                    value={formData.taskType}
                    onChange={(e) => handleInputChange("taskType", e.target.value)}
                    style={{
                      width: "100%",
                      height: "2.5rem",
                      padding: "0 0.75rem",
                      fontSize: "0.875rem",
                      borderRadius: "0.375rem",
                      border: "1px solid #e5e7eb",
                      backgroundColor: "#ffffff",
                      boxSizing: "border-box",
                    }}
                  >
                    <option value="">선택하세요</option>
                    <option value="Image Compression">Image Compression</option>
                    <option value="Generative Reconstruction">Generative Reconstruction</option>
                    <option value="Retrieval / Embedding">Retrieval / Embedding</option>
                  </select>
                  {errors.taskType && (
                    <p style={{ fontSize: "0.875rem", color: "#ef4444", marginTop: "0.25rem" }}>
                      {errors.taskType}
                    </p>
                  )}
                </div>

                <div style={{ paddingLeft: "32px", minWidth: 0, overflow: "hidden", boxSizing: "border-box" }}>
                  <label
                    style={{
                      display: "block",
                      fontSize: "0.875rem",
                      fontWeight: "500",
                      color: "#374151",
                      marginBottom: "0.5rem",
                    }}
                  >
                    Framework <span style={{ color: "#ef4444" }}>*</span>
                  </label>
                  <select
                    value={formData.framework}
                    onChange={(e) => handleInputChange("framework", e.target.value)}
                    style={{
                      width: "100%",
                      height: "2.5rem",
                      padding: "0 0.75rem",
                      fontSize: "0.875rem",
                      borderRadius: "0.375rem",
                      border: "1px solid #e5e7eb",
                      backgroundColor: "#ffffff",
                      boxSizing: "border-box",
                    }}
                  >
                    <option value="">선택하세요</option>
                    <option value="PyTorch">PyTorch</option>
                    <option value="TensorFlow">TensorFlow</option>
                    <option value="JAX">JAX</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.framework && (
                    <p style={{ fontSize: "0.875rem", color: "#ef4444", marginTop: "0.25rem" }}>
                      {errors.framework}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* 섹션 2: Code & Checkpoint */}
          <div
            style={{
              backgroundColor: "#ffffff",
              padding: "2rem",
              borderRadius: "0.5rem",
              border: "1px solid #e5e7eb",
            }}
          >
            <h2
              style={{
                fontSize: "1.25rem",
                fontWeight: "600",
                color: "#111827",
                marginBottom: "1.5rem",
                paddingBottom: "0.75rem",
                borderBottom: "1px solid #e5e7eb",
              }}
            >
              Code & Checkpoint
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "0.875rem",
                    fontWeight: "500",
                    color: "#374151",
                    marginBottom: "0.5rem",
                  }}
                >
                  Repository Type <span style={{ color: "#ef4444" }}>*</span>
                </label>
                <select
                  value={formData.repositoryType}
                  onChange={(e) => handleInputChange("repositoryType", e.target.value)}
                  style={{
                    width: "100%",
                    height: "2.5rem",
                    padding: "0 0.75rem",
                    fontSize: "0.875rem",
                    borderRadius: "0.375rem",
                    border: "1px solid #e5e7eb",
                    backgroundColor: "#ffffff",
                  }}
                >
                  <option value="">선택하세요</option>
                  <option value="GitHub">GitHub</option>
                  <option value="Hugging Face">Hugging Face</option>
                  <option value="Local / Custom">Local / Custom</option>
                </select>
                {errors.repositoryType && (
                  <p style={{ fontSize: "0.875rem", color: "#ef4444", marginTop: "0.25rem" }}>
                    {errors.repositoryType}
                  </p>
                )}
              </div>

              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "0.875rem",
                    fontWeight: "500",
                    color: "#374151",
                    marginBottom: "0.5rem",
                  }}
                >
                  Repository URL (or HF ID) <span style={{ color: "#ef4444" }}>*</span>
                </label>
                <Input
                  value={formData.repositoryUrl}
                  onChange={(e) => handleInputChange("repositoryUrl", e.target.value)}
                  placeholder={
                    formData.repositoryType === "GitHub"
                      ? "https://github.com/CompVis/taming-transformers"
                      : formData.repositoryType === "Hugging Face"
                      ? "CompVis/vqgan-imagenet-f16-1024"
                      : "Repository URL을 입력하세요"
                  }
                  style={{ width: "100%" }}
                />
                {errors.repositoryUrl && (
                  <p style={{ fontSize: "0.875rem", color: "#ef4444", marginTop: "0.25rem" }}>
                    {errors.repositoryUrl}
                  </p>
                )}
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", alignItems: "start", width: "100%", boxSizing: "border-box" }}>
                <div style={{ minWidth: 0, overflow: "hidden" }}>
                  <label
                    style={{
                      display: "block",
                      fontSize: "0.875rem",
                      fontWeight: "500",
                      color: "#374151",
                      marginBottom: "0.5rem",
                    }}
                  >
                    Checkpoint Source <span style={{ color: "#ef4444" }}>*</span>
                  </label>
                  <select
                    value={formData.checkpointSource}
                    onChange={(e) => handleInputChange("checkpointSource", e.target.value)}
                    style={{
                      width: "100%",
                      height: "2.5rem",
                      padding: "0 0.75rem",
                      fontSize: "0.875rem",
                      borderRadius: "0.375rem",
                      border: "1px solid #e5e7eb",
                      backgroundColor: "#ffffff",
                      boxSizing: "border-box",
                    }}
                  >
                    <option value="">선택하세요</option>
                    <option value="Upload file">Upload file</option>
                    <option value="Path on server">Path on server</option>
                    <option value="Hugging Face file">Hugging Face file</option>
                  </select>
                  {errors.checkpointSource && (
                    <p style={{ fontSize: "0.875rem", color: "#ef4444", marginTop: "0.25rem" }}>
                      {errors.checkpointSource}
                    </p>
                  )}
                </div>

                <div style={{ paddingLeft: "32px", minWidth: 0, overflow: "hidden", boxSizing: "border-box" }}>
                  <label
                    style={{
                      display: "block",
                      fontSize: "0.875rem",
                      fontWeight: "500",
                      color: "#374151",
                      marginBottom: "0.5rem",
                    }}
                  >
                    Checkpoint Path or File <span style={{ color: "#ef4444" }}>*</span>
                  </label>
                  <Input
                    value={formData.checkpointPath}
                    onChange={(e) => handleInputChange("checkpointPath", e.target.value)}
                    placeholder="/models/vqgan_imagenet_f16_1024.ckpt"
                    style={{ width: "100%", boxSizing: "border-box" }}
                  />
                  {errors.checkpointPath && (
                    <p style={{ fontSize: "0.875rem", color: "#ef4444", marginTop: "0.25rem" }}>
                      {errors.checkpointPath}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "0.875rem",
                    fontWeight: "500",
                    color: "#374151",
                    marginBottom: "0.5rem",
                  }}
                >
                  Model Class Path <span style={{ color: "#ef4444" }}>*</span>
                </label>
                <Input
                  value={formData.modelClassPath}
                  onChange={(e) => handleInputChange("modelClassPath", e.target.value)}
                  placeholder="예: benchmark.models.vqgan_imagenet_f16_1024.VQGANImagenetF16"
                  style={{ width: "100%" }}
                />
                {errors.modelClassPath && (
                  <p style={{ fontSize: "0.875rem", color: "#ef4444", marginTop: "0.25rem" }}>
                    {errors.modelClassPath}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* 섹션 3: IO & Interface */}
          <div
            style={{
              backgroundColor: "#ffffff",
              padding: "2rem",
              borderRadius: "0.5rem",
              border: "1px solid #e5e7eb",
            }}
          >
            <h2
              style={{
                fontSize: "1.25rem",
                fontWeight: "600",
                color: "#111827",
                marginBottom: "1.5rem",
                paddingBottom: "0.75rem",
                borderBottom: "1px solid #e5e7eb",
              }}
            >
              IO & Interface
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "0.875rem",
                    fontWeight: "500",
                    color: "#374151",
                    marginBottom: "0.5rem",
                  }}
                >
                  Input Resolution
                </label>
                <div style={{ display: "flex", gap: "0.75rem", alignItems: "center", flexWrap: "wrap" }}>
                  <select
                    value={formData.inputSizeType}
                    onChange={(e) => handleInputChange("inputSizeType", e.target.value)}
                    style={{
                      height: "2.5rem",
                      padding: "0 0.75rem",
                      fontSize: "0.875rem",
                      borderRadius: "0.375rem",
                      border: "1px solid #e5e7eb",
                      backgroundColor: "#ffffff",
                      minWidth: "120px",
                    }}
                  >
                    <option value="Fixed">Fixed</option>
                    <option value="Variable">Variable</option>
                  </select>
                  {formData.inputSizeType === "Fixed" && (
                    <>
                      <Input
                        type="number"
                        value={formData.inputWidth}
                        onChange={(e) => handleInputChange("inputWidth", parseInt(e.target.value) || 0)}
                        placeholder="Width"
                        style={{ width: "120px", flexShrink: 0 }}
                      />
                      <span style={{ color: "#6b7280", margin: "0 0.25rem" }}>×</span>
                      <Input
                        type="number"
                        value={formData.inputHeight}
                        onChange={(e) => handleInputChange("inputHeight", parseInt(e.target.value) || 0)}
                        placeholder="Height"
                        style={{ width: "120px", flexShrink: 0 }}
                      />
                    </>
                  )}
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", alignItems: "start", width: "100%", boxSizing: "border-box" }}>
                <div style={{ minWidth: 0, overflow: "hidden" }}>
                  <label
                    style={{
                      display: "block",
                      fontSize: "0.875rem",
                      fontWeight: "500",
                      color: "#374151",
                      marginBottom: "0.5rem",
                    }}
                  >
                    Input Range
                  </label>
                  <Input
                    value={formData.inputRange}
                    onChange={(e) => handleInputChange("inputRange", e.target.value)}
                    placeholder="[0, 1]"
                    style={{ width: "100%", boxSizing: "border-box" }}
                  />
                </div>

                <div style={{ paddingLeft: "32px", minWidth: 0, overflow: "hidden", boxSizing: "border-box" }}>
                  <label
                    style={{
                      display: "block",
                      fontSize: "0.875rem",
                      fontWeight: "500",
                      color: "#374151",
                      marginBottom: "0.5rem",
                    }}
                  >
                    Output Range
                  </label>
                  <Input
                    value={formData.outputRange}
                    onChange={(e) => handleInputChange("outputRange", e.target.value)}
                    placeholder="[0, 1]"
                    style={{ width: "100%", boxSizing: "border-box" }}
                  />
                </div>
              </div>

              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "0.875rem",
                    fontWeight: "500",
                    color: "#374151",
                    marginBottom: "0.75rem",
                  }}
                >
                  Supported Interface <span style={{ color: "#ef4444" }}>*</span>
                </label>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <Checkbox
                      checked={formData.supportedReconstruct}
                      onCheckedChange={(checked) =>
                        handleInputChange("supportedReconstruct", checked)
                      }
                    />
                    <label style={{ fontSize: "0.875rem", color: "#374151" }}>
                      reconstruct(x) <span style={{ color: "#6b7280" }}># 필수</span>
                    </label>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <Checkbox
                      checked={formData.supportedEncode}
                      onCheckedChange={(checked) => handleInputChange("supportedEncode", checked)}
                    />
                    <label style={{ fontSize: "0.875rem", color: "#374151" }}>encode(x)</label>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <Checkbox
                      checked={formData.supportedDecode}
                      onCheckedChange={(checked) => handleInputChange("supportedDecode", checked)}
                    />
                    <label style={{ fontSize: "0.875rem", color: "#374151" }}>decode(z)</label>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <Checkbox
                      checked={formData.supportedCompress}
                      onCheckedChange={(checked) =>
                        handleInputChange("supportedCompress", checked)
                      }
                    />
                    <label style={{ fontSize: "0.875rem", color: "#374151" }}>
                      compress(x) / decompress(...)
                    </label>
                  </div>
                </div>
                {errors.supportedInterface && (
                  <p style={{ fontSize: "0.875rem", color: "#ef4444", marginTop: "0.25rem" }}>
                    {errors.supportedInterface}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* 섹션 4: Evaluation Defaults */}
          <div
            style={{
              backgroundColor: "#ffffff",
              padding: "2rem",
              borderRadius: "0.5rem",
              border: "1px solid #e5e7eb",
            }}
          >
            <h2
              style={{
                fontSize: "1.25rem",
                fontWeight: "600",
                color: "#111827",
                marginBottom: "1.5rem",
                paddingBottom: "0.75rem",
                borderBottom: "1px solid #e5e7eb",
              }}
            >
              Evaluation Defaults
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "0.875rem",
                    fontWeight: "500",
                    color: "#374151",
                    marginBottom: "0.75rem",
                  }}
                >
                  기본 벤치마크용 데이터셋
                </label>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  {[
                    "Image Compression - Kodak24",
                    "Image Compression - CIFAR10",
                    "Image Compression - CLIC",
                  ].map((benchmark) => (
                    <div key={benchmark} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <Checkbox
                        checked={formData.defaultBenchmarks.includes(benchmark)}
                        onCheckedChange={() => handleMultiSelect("defaultBenchmarks", benchmark)}
                      />
                      <label style={{ fontSize: "0.875rem", color: "#374151" }}>{benchmark}</label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "0.875rem",
                    fontWeight: "500",
                    color: "#374151",
                    marginBottom: "0.75rem",
                  }}
                >
                  Default Metrics
                </label>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  {["PSNR", "SSIM", "LPIPS", "bpp", "FID"].map((metric) => (
                    <div key={metric} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <Checkbox
                        checked={formData.defaultMetrics.includes(metric)}
                        onCheckedChange={() => handleMultiSelect("defaultMetrics", metric)}
                      />
                      <label style={{ fontSize: "0.875rem", color: "#374151" }}>{metric}</label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 섹션 5: Ownership & Visibility */}
          <div
            style={{
              backgroundColor: "#ffffff",
              padding: "2rem",
              borderRadius: "0.5rem",
              border: "1px solid #e5e7eb",
            }}
          >
            <h2
              style={{
                fontSize: "1.25rem",
                fontWeight: "600",
                color: "#111827",
                marginBottom: "1.5rem",
                paddingBottom: "0.75rem",
                borderBottom: "1px solid #e5e7eb",
              }}
            >
              Ownership & Visibility
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "0.875rem",
                    fontWeight: "500",
                    color: "#374151",
                    marginBottom: "0.5rem",
                  }}
                >
                  Owner
                </label>
                <Input
                  value={formData.owner}
                  disabled
                  style={{ width: "100%", backgroundColor: "#f9fafb", color: "#6b7280" }}
                />
                <p style={{ fontSize: "0.75rem", color: "#6b7280", marginTop: "0.25rem" }}>
                  현재 로그인한 유저로 자동 설정됩니다.
                </p>
              </div>

              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "0.875rem",
                    fontWeight: "500",
                    color: "#374151",
                    marginBottom: "0.5rem",
                  }}
                >
                  Visibility
                </label>
                <select
                  value={formData.visibility}
                  onChange={(e) => handleInputChange("visibility", e.target.value)}
                  style={{
                    width: "100%",
                    height: "2.5rem",
                    padding: "0 0.75rem",
                    fontSize: "0.875rem",
                    borderRadius: "0.375rem",
                    border: "1px solid #e5e7eb",
                    backgroundColor: "#ffffff",
                  }}
                >
                  <option value="Private">Private (나만 보기)</option>
                  <option value="Organization">Organization</option>
                  <option value="Public (Leaderboard 노출)">Public (Leaderboard 노출)</option>
                </select>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", alignItems: "start", width: "100%", boxSizing: "border-box" }}>
                <div style={{ minWidth: 0, overflow: "hidden" }}>
                  <label
                    style={{
                      display: "block",
                      fontSize: "0.875rem",
                      fontWeight: "500",
                      color: "#374151",
                      marginBottom: "0.5rem",
                    }}
                  >
                    License
                  </label>
                  <Input
                    value={formData.license}
                    onChange={(e) => handleInputChange("license", e.target.value)}
                    placeholder="MIT, Apache-2.0, CC-BY-4.0 등"
                    style={{ width: "100%", boxSizing: "border-box" }}
                  />
                </div>

                <div style={{ paddingLeft: "32px", minWidth: 0, overflow: "hidden", boxSizing: "border-box" }}>
                  <label
                    style={{
                      display: "block",
                      fontSize: "0.875rem",
                      fontWeight: "500",
                      color: "#374151",
                      marginBottom: "0.5rem",
                    }}
                  >
                    Tags
                  </label>
                  <Input
                    value={formData.tags}
                    onChange={(e) => handleInputChange("tags", e.target.value)}
                    placeholder="VQGAN, ImageNet, High-Quality"
                    style={{ width: "100%", boxSizing: "border-box" }}
                  />
                </div>
              </div>

              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "0.875rem",
                    fontWeight: "500",
                    color: "#374151",
                    marginBottom: "0.5rem",
                  }}
                >
                  Citation / Paper Link
                </label>
                <textarea
                  value={formData.citation}
                  onChange={(e) => handleInputChange("citation", e.target.value)}
                  placeholder="논문 BibTex나 arXiv 링크를 입력하세요"
                  rows={4}
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    fontSize: "0.875rem",
                    borderRadius: "0.375rem",
                    border: "1px solid #e5e7eb",
                    backgroundColor: "#ffffff",
                    fontFamily: "inherit",
                    resize: "vertical",
                    boxSizing: "border-box",
                  }}
                />
              </div>
            </div>
          </div>

          {/* 제출 버튼 */}
          <div style={{ display: "flex", gap: "1rem", justifyContent: "flex-end" }}>
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/model")}
            >
              취소
            </Button>
            <Button type="submit" variant="default">
              모델 등록
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}
