import type { Metadata } from "next"
import { CasesListClient } from "./cases-list-client"

export const metadata: Metadata = {
  title: "Кейсы AI-автоматизации",
  description: "Реализованные проекты AI-автоматизации: WhatsApp AI, CRM, n8n workflows, AI-ресепшн. Результаты и архитектура решений.",
}

export default function CasesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
      <div className="text-center mb-16">
        <p className="text-accent text-xs font-medium uppercase tracking-widest mb-3">Портфолио</p>
        <h1 className="text-4xl sm:text-5xl font-bold text-text-primary mb-4">Кейсы</h1>
        <p className="text-text-muted text-lg max-w-xl mx-auto">
          Реализованные проекты AI-автоматизации с измеримыми результатами
        </p>
      </div>
      <CasesListClient />
    </div>
  )
}
