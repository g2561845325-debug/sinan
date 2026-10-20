import { Star } from "lucide-react"

// The stored direction score remains on its original 0-10 scale.
export function companyDisplayScore(score: number | null | undefined, reviewCount: number) {
  return reviewCount > 0 && typeof score === "number" && Number.isFinite(score)
    ? Math.min(5, Math.max(0, score / 2))
    : null
}

export function CompanyRating({ score, prominent = false }: { score: number | null; prominent?: boolean }) {
  if (score === null) return <span className="text-sm text-muted-foreground">暂无评分</span>

  return (
    <span className="inline-flex items-center gap-1.5 text-foreground" aria-label={`方向评分 ${score.toFixed(1)} 分，满分 5 分`}>
      <Star className="size-4 fill-current" aria-hidden="true" />
      <span className={`${prominent ? "text-2xl" : "text-sm"} font-semibold tabular-nums`}>{score.toFixed(1)}</span>
      <span className="text-sm font-normal text-muted-foreground">/ 5</span>
    </span>
  )
}
