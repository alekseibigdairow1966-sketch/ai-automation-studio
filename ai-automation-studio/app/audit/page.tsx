import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { AuditFunnel } from "@/components/audit/audit-funnel"
import { getServerLocale, getTranslations } from "@/lib/i18n-server"

export const metadata: Metadata = {
  title: "AI-аудит автоматизации — AIAutomation Studio",
  description:
    "Пройдите экспресс-аудит вашего бизнеса и получите персональные рекомендации по AI-автоматизации за 2 минуты.",
}

export default async function AuditPage() {
  const locale = await getServerLocale()
  const t = getTranslations(locale)

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-text-muted text-sm hover:text-text-secondary transition-colors mb-8"
      >
        <ArrowLeft size={14} /> {t.audit.backHome}
      </Link>

      <div className="text-center mb-12">
        <p className="text-accent text-xs font-medium uppercase tracking-widest mb-3">
          {t.audit.badge}
        </p>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary mb-4">
          {t.audit.title}
        </h1>
        <p className="text-text-muted text-lg max-w-xl mx-auto">
          {t.audit.subtitle}
        </p>
      </div>

      <AuditFunnel />
    </div>
  )
}
