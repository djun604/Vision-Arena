import EmptyState from "@/components/EmptyState"

interface CategoryPageProps {
  params: {
    category: string
  }
}

// 카테고리 이름 매핑
const categoryNames: Record<string, string> = {
  text: "Text",
  webdev: "WebDev",
  vision: "Vision",
  "text-to-image": "Text-to-Image",
  "image-edit": "Image Edit",
  search: "Search",
  "text-to-video": "Text-to-Video",
  "image-to-video": "Image-to-Video",
}

// 정적 사이트 생성을 위한 카테고리 목록 생성
export function generateStaticParams() {
  return Object.keys(categoryNames).map((category) => ({
    category: category,
  }))
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const categoryName = categoryNames[params.category] || params.category

  return (
    <div
      style={{
        maxWidth: "100%",
        margin: "0 auto",
        padding: "0.75rem 1rem",
      }}
    >
      <EmptyState categoryName={categoryName} />
    </div>
  )
}

