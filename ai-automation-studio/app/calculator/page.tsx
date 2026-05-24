import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { ROICalculator } from "@/components/sections/roi-calculator"

export const metadata: Metadata = {
  title: "ROI-калькулятор — AIAutomation Studio",
  description:
    "Рассчитайте, сколько ваш сервисный центр теряет без AI-автоматизации. Калькулятор операционных потерь.",
}

export default function CalculatorPage() {
  return (
    <>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-8">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-text-muted text-sm hover:text-text-secondary transition-colors"
        >
          <ArrowLeft size={14} /> Главная
        </Link>
      </div>
      <ROICalculator />
    </>
  )
}
