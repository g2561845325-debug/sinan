"use client"

import { useMemo, useState } from "react"
import { Building2 } from "lucide-react"

import { CompanyCard } from "@/components/company/company-card"
import { SolidSearchInput } from "@/components/ui/solid-search-input"
import { useCompanySearch } from "@/lib/queries/company-search"

type SortMode = "reviews" | "score"

export function CompanyDirectory() {
  const [query, setQuery] = useState("")
  const [city, setCity] = useState("全部")
  const [sort, setSort] = useState<SortMode>("reviews")
  const { data: companies = [], isPending: loading, error } = useCompanySearch()
  const cities = ["全部", ...Array.from(new Set(companies.map((company) => company.city)))]

  const filteredCompanies = useMemo(() => {
    const keyword = query.trim().toLowerCase()
    return companies
      .filter((company) => city === "全部" || company.city === city)
      .filter((company) => {
        if (!keyword) return true
        return [company.name, company.shortName, company.industry, company.city]
          .filter(Boolean)
          .some((value) => String(value).toLowerCase().includes(keyword))
      })
      .sort((a, b) => {
        if (sort === "score") return (b.directionScore ?? 0) - (a.directionScore ?? 0)
        return (b.reviewCount ?? 0) - (a.reviewCount ?? 0)
      })
  }, [city, companies, query, sort])

  if (loading) {
    return <div className="h-48 animate-pulse bg-muted" aria-label="正在加载公司" />
  }

  if (error && !companies.length) {
    return <p className="border-y border-border py-8 text-sm text-muted-foreground" role="status">公司数据暂时不可用，请稍后再试。</p>
  }

  return (
    <div data-testid="company-directory">
      <SolidSearchInput value={query} onChange={setQuery} />

      <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-3 border-b border-border pb-4 text-sm">
        <label className="flex items-center gap-2 text-muted-foreground">
          城市
          <select
            value={city}
            onChange={(event) => setCity(event.target.value)}
            className="h-10 max-w-36 bg-transparent px-1 font-medium text-foreground outline-none focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-ring"
          >
            {cities.map((item) => <option key={item} value={item}>{item}</option>)}
          </select>
        </label>
        <label className="flex items-center gap-2 text-muted-foreground">
          排序
          <select
            value={sort}
            onChange={(event) => setSort(event.target.value as SortMode)}
            className="h-10 bg-transparent px-1 font-medium text-foreground outline-none focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-ring"
          >
            <option value="reviews">评价最多</option>
            <option value="score">评分最高</option>
          </select>
        </label>
      </div>

      <p className="py-4 text-sm text-muted-foreground">找到 {filteredCompanies.length} 家公司</p>
      {filteredCompanies.length ? (
        <div className="border-t border-border">
          {filteredCompanies.map((company) => (
            <CompanyCard key={company.id} company={company} />
          ))}
        </div>
      ) : (
        <div className="border-y border-border py-12 text-center">
          <Building2 className="mx-auto size-8 text-muted-foreground" />
          <p className="mt-3 font-semibold text-foreground">没有匹配的公司</p>
          <p className="mt-1 text-sm text-muted-foreground">换个名称或城市试试。</p>
        </div>
      )}
    </div>
  )
}
