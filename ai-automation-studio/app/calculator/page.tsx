import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { ROICalculator } from "@/components/sections/roi-calculator"
import { getServerLocale, getTranslations } from "@/lib/i18n-server"

export const metadata: Metadata = {
  title: "ROI-калькулятор — ServiceLayer",
  description:
    "Рассчитайте, сколько ваш сервисный центр теряет без AI-автоматизации. Калькулятор операционных потерь.",
}

export default async function CalculatorPage() {
  const locale = await getServerLocale()
  const t = getTranslations(locale)

  return (
    <>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-8">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-text-muted text-sm hover:text-text-secondary transition-colors"
        >
          <ArrowLeft size={14} /> {t.calculator.backHome}
        </Link>
      </div>
      <ROICalculator />
    </>
  )
}
