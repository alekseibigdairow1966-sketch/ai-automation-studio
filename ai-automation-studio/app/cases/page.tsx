import type { Metadata } from "next"
import { CasesListClient } from "./cases-list-client"
import { MotionWrapper } from "@/components/motion-wrapper"

export const metadata: Metadata = {
  title: "Кейсы AI-автоматизации сервисных центров — AIAutomation Studio",
  description: "Реализованные проекты: автоматизация сервисных центров, WhatsApp AI, CRM-системы, AI-приёмка. Архитектура и результаты.",
}

export default function CasesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
      <MotionWrapper className="text-center mb-16">
        <p className="text-accent text-xs font-medium uppercase tracking-widest mb-3">Кейсы</p>
        <h1 className="text-4xl sm:text-5xl font-bold text-text-primary mb-4">
          Реализованные проекты
        </h1>
        <p className="text-text-muted text-lg max-w-2xl mx-auto">
          Операционная автоматизация сервисных центров, клиник и бизнесов с измеримыми результатами
        </p>
      </MotionWrapper>
      <CasesListClient />
    </div>
  )
}
