import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { HomeCompanyFeed } from "@/components/company/home-company-feed"
import { HomeCompanySearch } from "@/components/company/home-company-search"

export default function HomePage() {
  return (
    <section className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-8 sm:py-12" data-testid="home-recommend-feed">
      <header className="border-b border-border pb-6">
        <h1 className="text-3xl font-semibold leading-[1.15] text-foreground sm:text-4xl">找公司</h1>
        <HomeCompanySearch />
        <div className="mt-3 flex gap-6 text-sm font-medium text-muted-foreground">
          <Link href="/companies" className="inline-flex min-h-11 items-center gap-2 hover:text-foreground">全部公司 <ArrowUpRight className="size-4" aria-hidden="true" /></Link>
          <Link href="/research" className="inline-flex min-h-11 items-center gap-2 hover:text-foreground">公司研究 <ArrowUpRight className="size-4" aria-hidden="true" /></Link>
        </div>
      </header>

      <div className="mt-8 flex items-center justify-between gap-4">
        <h2 className="text-xl font-semibold text-foreground">最新公司</h2>
        <Link href="/companies" className="inline-flex min-h-11 items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground">查看全部 <ArrowUpRight className="size-4" aria-hidden="true" /></Link>
      </div>
      <div className="mt-3"><HomeCompanyFeed /></div>
    </section>
  )
}
