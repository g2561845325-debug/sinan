import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { CompanyRating, companyDisplayScore } from "./company-rating"

import type { CompanyListItem } from "@/lib/api/types"
import type { Company } from "@/lib/types"

type CompanyCardCompany = Company | CompanyListItem

export function CompanyCard({ company }: { company: CompanyCardCompany }) {
  const displayName = (company as CompanyListItem).shortName ?? company.name
  const reviewCount = company.reviewCount ?? 0
  const score = companyDisplayScore(company.directionScore, reviewCount)

  return (
    <Link
      href={`/company/${company.id}`}
      className="group flex min-w-0 items-start gap-4 border-b border-border py-6 transition-colors duration-150 hover:bg-muted-hover focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-ring sm:px-4"
      aria-label={`查看${displayName}，${score === null ? "暂无评分" : `方向评分 ${score.toFixed(1)} 分（满分 5 分）`}，${reviewCount} 条评价`}
    >
      <span className="grid size-12 shrink-0 place-items-center rounded-full border border-border bg-muted text-lg font-semibold text-foreground" aria-hidden="true">
        {displayName.slice(0, 1)}
      </span>
      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        <div className="flex min-w-0 items-start justify-between gap-3">
          <h3 className="min-w-0 text-lg font-semibold leading-snug text-foreground">{displayName}</h3>
          <ArrowUpRight className="mt-1 size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-foreground sm:hidden" aria-hidden="true" />
        </div>
        <span className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-sm text-muted-foreground">
          <span>{company.industry}</span>
          <span aria-hidden="true">·</span>
          <span>{company.city}</span>
        </span>
        <span className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
          <CompanyRating score={score} />
          <span className="text-border" aria-hidden="true">·</span>
          <span className="text-muted-foreground">{reviewCount.toLocaleString()} 条评价</span>
        </span>
      </div>
      <ArrowUpRight className="mt-1 hidden size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-foreground sm:block" aria-hidden="true" />
    </Link>
  )
}
