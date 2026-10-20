import Link from "next/link"
import { PenLine } from "lucide-react"

import { CompanyDirectory } from "@/components/company/company-directory"
import { SolidButton } from "@/components/ui/solid-button"

export default function CompaniesPage() {
  return (
    <section className="mx-auto w-full max-w-4xl px-4 py-6 sm:px-6 sm:py-10">
      <header className="mb-6 flex flex-col gap-4 border-b border-border pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground sm:text-3xl">公司</h1>
        </div>
        <SolidButton asChild variant="primary">
          <Link href="/submit/review">
            <PenLine className="size-4" />
            写评价
          </Link>
        </SolidButton>
      </header>

      <CompanyDirectory />
    </section>
  )
}
