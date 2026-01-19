import ModelLeaderboard from "@/components/ModelLeaderboard"
import AdSense from "@/components/AdSense"

export default function LeaderboardPage() {
  return (
    <div style={{ 
      maxWidth: "100%", 
      margin: "0 auto", 
      padding: "0.75rem 1rem",
    }}>
      {/* 상단 광고 */}
      <AdSense 
        format="display" 
        responsive 
        style={{ margin: '20px auto', maxWidth: '728px' }}
        position="리더보드 상단 광고"
      />
      
      <ModelLeaderboard />
      
      {/* 하단 광고 */}
      <AdSense 
        format="display" 
        responsive 
        style={{ margin: '40px auto', maxWidth: '728px' }}
        position="리더보드 하단 광고"
      />
    </div>
  )
}

