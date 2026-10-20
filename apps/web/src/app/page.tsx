import Link from "next/link"
import { HomeCompanyFeed } from "@/components/company/home-company-feed"
import { HomeCompanySearch } from "@/components/company/home-company-search"

export default function HomePage() {
  return (
    <section className="mx-auto w-full max-w-4xl px-4 py-6 sm:px-6 sm:py-10" data-testid="home-recommend-feed">
      <header className="border-b border-border pb-7">
        <h1 className="text-2xl font-semibold text-foreground sm:text-3xl">找公司</h1>
        <HomeCompanySearch />
        <div className="mt-3 flex gap-6 text-sm font-medium text-muted-foreground">
          <Link href="/companies" className="inline-flex min-h-11 items-center hover:text-foreground">全部公司</Link>
          <Link href="/research" className="inline-flex min-h-11 items-center hover:text-foreground">公司研究</Link>
        </div>
      </header>

      <div className="mt-7 flex items-end justify-between gap-4">
        <h2 className="text-lg font-semibold text-foreground">最新公司</h2>
        <Link href="/companies" className="text-sm font-medium text-muted-foreground hover:text-foreground">查看全部</Link>
      </div>
      <div className="mt-3"><HomeCompanyFeed /></div>
    </section>
  )
}
