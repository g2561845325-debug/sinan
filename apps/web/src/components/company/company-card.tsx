import Link from "next/link"
import { ArrowUpRight, Star } from "lucide-react"

import type { CompanyListItem } from "@/lib/api/types"
import type { Company } from "@/lib/types"

type CompanyCardCompany = Company | CompanyListItem

export function CompanyCard({ company }: { company: CompanyCardCompany }) {
  const displayName = (company as CompanyListItem).shortName ?? company.name
  const reviewCount = company.reviewCount ?? 0
  const score = reviewCount > 0 && Number.isFinite(company.directionScore)
    ? Math.min(5, Math.max(0, (company.directionScore ?? 0) / 2))
    : null

  return (
    <Link
      href={`/company/${company.id}`}
      className="group flex min-w-0 items-start gap-3 border-b border-border px-1 py-5 transition-colors hover:bg-muted/50 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-ring sm:gap-4 sm:px-3"
      aria-label={`查看${displayName}，${score === null ? "暂无评分" : `方向评分 ${score.toFixed(1)} 分（满分 5 分）`}，${reviewCount} 条评价`}
    >
      <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-muted text-base font-semibold text-foreground sm:size-12" aria-hidden="true">
        {displayName.slice(0, 1)}
      </span>
      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        <div className="flex min-w-0 items-start justify-between gap-3">
          <h3 className="min-w-0 truncate text-base font-semibold text-foreground sm:text-lg">{displayName}</h3>
          <ArrowUpRight className="mt-1 size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-foreground sm:hidden" aria-hidden="true" />
        </div>
        <span className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-sm text-muted-foreground">
          <span>{company.industry}</span>
          <span aria-hidden="true">·</span>
          <span>{company.city}</span>
        </span>
        <span className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
          {score === null ? (
            <span className="text-muted-foreground">暂无评分</span>
          ) : (
            <span className="inline-flex items-center gap-1 font-semibold text-foreground" aria-label={`方向评分 ${score.toFixed(1)} 分，满分 5 分`}>
              <Star className="size-4 fill-amber-500 text-amber-500" aria-hidden="true" />
              <span className="tabular-nums">{score.toFixed(1)}</span>
              <span className="font-normal text-muted-foreground">/ 5</span>
            </span>
          )}
          <span className="text-border" aria-hidden="true">·</span>
          <span className="text-muted-foreground">{reviewCount.toLocaleString()} 条评价</span>
        </span>
      </div>
      <ArrowUpRight className="mt-1 hidden size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-foreground sm:block" aria-hidden="true" />
    </Link>
  )
}
