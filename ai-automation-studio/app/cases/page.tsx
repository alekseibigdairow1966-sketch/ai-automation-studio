import type { Metadata } from "next"
import { CasesListClient } from "./cases-list-client"
import { MotionWrapper } from "@/components/motion-wrapper"
import { readStore } from "@/lib/content-store"
import { cases as defaultCases } from "@/data/cases"
import { getServerLocale, getTranslations } from "@/lib/i18n-server"

export const metadata: Metadata = {
  title: "Сценарии автоматизации — ServiceLayer",
  description: "Операционные AI-системы для сервисного бизнеса: CRM-автоматизация, WhatsApp AI, AI-маршрутизация, автоуведомления.",
}

export default async function CasesPage() {
  const cases = await readStore("cases", defaultCases)
  const locale = await getServerLocale()
  const t = getTranslations(locale)
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
      <MotionWrapper className="text-center mb-16">
        <p className="text-accent text-xs font-medium uppercase tracking-widest mb-3">{t.casesPage.badge}</p>
        <h1 className="text-4xl sm:text-5xl font-bold text-text-primary mb-4">
          {t.casesPage.title}
        </h1>
        <p className="text-text-muted text-lg max-w-2xl mx-auto">
          {t.casesPage.subtitle}
        </p>
      </MotionWrapper>
      <CasesListClient cases={cases} />
    </div>
  )
}
