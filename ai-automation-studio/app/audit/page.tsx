import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { AuditFunnel } from "@/components/audit/audit-funnel"

export const metadata: Metadata = {
  title: "AI-аудит автоматизации — AIAutomation Studio",
  description:
    "Пройдите экспресс-аудит вашего бизнеса и получите персональные рекомендации по AI-автоматизации за 2 минуты.",
}

export default function AuditPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-text-muted text-sm hover:text-text-secondary transition-colors mb-8"
      >
        <ArrowLeft size={14} /> Главная
      </Link>

      <div className="text-center mb-12">
        <p className="text-accent text-xs font-medium uppercase tracking-widest mb-3">
          Экспресс-аудит
        </p>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary mb-4">
          AI-аудит вашего бизнеса
        </h1>
        <p className="text-text-muted text-lg max-w-xl mx-auto">
          Ответьте на 7 вопросов — AI сгенерирует персональные рекомендации по
          автоматизации
        </p>
      </div>

      <AuditFunnel />
    </div>
  )
}
